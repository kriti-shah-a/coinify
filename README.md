# Coinify

A Duolingo-style financial literacy app: lessons, mini-game quizzes, and a “Call Simulator” final assessment. Built for hackathons with optional AI (Gemini) and voice (ElevenLabs); **runs fully locally with no API keys**.

## Stack

- **Backend:** Python, FastAPI, session-based auth (cookies)
- **Frontend:** HTML, Tailwind (CDN), minimal vanilla JS (no React)
- **Optional:** Gemini API (lesson content + adaptive quiz), ElevenLabs (call simulator voice). Fallbacks: mock content, browser `speechSynthesis`

## Colors & mascot

- Blue `#134F6B`, Orange `#FAA208`, Yellow `#FFD500`, Green `#19C319`, Purple `#8332ac`
- Simple coin mascot (CSS + emoji-style face)

## Setup

1. **Clone and go to project root**
   ```bash
   cd coinify
   ```

2. **Create a virtualenv (recommended)**
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Optional: API keys**  
   Copy `.env.example` to `.env` and add keys if you have them. The app works without any keys.
   ```bash
   copy .env.example .env   # Windows
   # cp .env.example .env   # macOS/Linux
   ```

## Run

From the **backend** directory:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or from project root (with `pip install` already run from `backend`):

```bash
cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Then open: **http://localhost:8000/static/login.html**

- **Login:** username `demo`, password `demo`

## Pages

| Page            | Path                      | Description                          |
|-----------------|---------------------------|--------------------------------------|
| Login           | `/static/login.html`      | Demo login (session cookie)          |
| Home            | `/static/home.html`       | XP, level, streak, shortcuts         |
| Lessons         | `/static/lessons.html`    | List of lessons                      |
| Lesson detail   | `/static/lesson.html?id=1`| Content + mini-game quiz             |
| Call Simulator  | `/static/call-simulator.html` | Final assessment, play script (voice) |
| Account         | `/static/account.html`    | Stats, badges, logout                |

## Gamification

- **XP** – Earned from lessons and quiz; 100 XP per level.
- **Level** – Derived from total XP.
- **Badges** – First lesson, 3-day streak, 7-day streak, all lessons, Call Simulator, Quiz master.
- **Daily streak** – Consecutive days with activity (in-memory; resets on server restart).

## API keys (optional)

- **No keys** – Mock lessons and quiz; Call Simulator uses browser text-to-speech.
- **GEMINI_API_KEY** – AI-generated lesson content and adaptive quiz questions.
- **ELEVENLABS_API_KEY** – Realistic voice for the Call Simulator script.

Everything runs locally without keys.

## License

MIT.
