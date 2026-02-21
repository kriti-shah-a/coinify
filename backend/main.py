"""
Coinify backend: FastAPI app with auth, lessons, quiz, call simulator, gamification.
"""
from pathlib import Path

from fastapi import FastAPI, Request, Response, Depends, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from config import BASE_DIR, DEMO_USER, SESSION_COOKIE_NAME, STATIC_DIR
from auth import create_session, load_session, verify_login
from gemini_service import get_lessons, get_lesson_content, get_adaptive_quiz
from elevenlabs_service import get_voice_audio
from progress_store import (
    get_progress,
    add_xp,
    complete_lesson,
    set_call_simulator_done,
    award_badge,
)
from mock_data import CALL_SIMULATOR_SCRIPT

app = FastAPI(title="Coinify")

# Static files (HTML, JS, CSS)
static_dir = STATIC_DIR if STATIC_DIR.exists() else (BASE_DIR / "static")
if static_dir.exists():
    app.mount("/static", StaticFiles(directory=str(static_dir), html=True), name="static")


def get_current_user_id(request: Request) -> str | None:
    token = request.cookies.get(SESSION_COOKIE_NAME)
    if not token:
        return None
    return load_session(token)


def require_auth(request: Request) -> str:
    user_id = get_current_user_id(request)
    if not user_id:
        raise HTTPException(status_code=302, detail="Login required", headers={"Location": "/static/login.html"})
    return user_id


@app.get("/")
async def root():
    return RedirectResponse(url="/static/login.html", status_code=302)


@app.post("/api/login")
async def login(request: Request, response: Response):
    body = await request.json()
    username = (body.get("username") or "").strip()
    password = (body.get("password") or "").strip()
    user = verify_login(username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_session(user["id"])
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        max_age=7 * 24 * 3600,
        httponly=True,
        samesite="lax",
        path="/",
    )
    return {"user": user, "redirect": "/static/home.html"}


@app.post("/api/logout")
async def logout(response: Response):
    response.delete_cookie(SESSION_COOKIE_NAME, path="/")
    return {"redirect": "/static/login.html"}


@app.get("/api/me")
async def me(request: Request):
    user_id = get_current_user_id(request)
    if not user_id:
        return {"user": None}
    progress = get_progress(user_id)
    return {
        "user": {k: v for k, v in DEMO_USER.items() if k != "password"},
        "progress": progress,
    }


# Lessons
@app.get("/api/lessons")
async def api_lessons():
    return {"lessons": get_lessons()}


@app.get("/api/lessons/{lesson_id}")
async def api_lesson_detail(lesson_id: str):
    content = get_lesson_content(lesson_id)
    if not content:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return content


@app.get("/api/lessons/{lesson_id}/quiz")
async def api_quiz(lesson_id: str):
    content = get_lesson_content(lesson_id)
    topic = content.get("title", "financial literacy") if content else "financial literacy"
    quiz = get_adaptive_quiz(lesson_id, topic)
    return quiz


@app.post("/api/lessons/{lesson_id}/complete")
async def api_complete_lesson(lesson_id: str, request: Request):
    user_id = require_auth(request)
    body = await request.json() if request.headers.get("content-type", "").startswith("application/json") else {}
    xp = body.get("xp", 20)
    return {"progress": complete_lesson(user_id, lesson_id, xp)}


# Call simulator
@app.get("/api/call-simulator/script")
async def api_call_script():
    return {"script": CALL_SIMULATOR_SCRIPT}


@app.get("/api/call-simulator/audio")
async def api_call_audio():
    has_audio, b64 = get_voice_audio(CALL_SIMULATOR_SCRIPT, "call_sim")
    return {"has_elevenlabs": has_audio, "audio_base64": b64}


@app.post("/api/call-simulator/complete")
async def api_call_simulator_complete(request: Request):
    user_id = require_auth(request)
    return {"progress": set_call_simulator_done(user_id)}


# Progress / gamification
@app.get("/api/progress")
async def api_progress(request: Request):
    user_id = require_auth(request)
    return get_progress(user_id)


@app.post("/api/progress/xp")
async def api_add_xp(request: Request):
    user_id = require_auth(request)
    body = await request.json()
    amount = body.get("amount", 0)
    add_xp(user_id, amount)
    return get_progress(user_id)


# Serve SPA-style: any path under /app goes to index for client routing if needed
# We use direct static HTML files, so no catch-all needed. Just ensure static index is home.
@app.get("/app/{path:path}")
async def serve_app(path: str):
    """Redirect /app/* to static so frontend can use /static/* for pages."""
    return RedirectResponse(url=f"/static/{path}", status_code=302)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
