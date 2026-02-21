"""In-memory store for user progress: XP, level, badges, streak. Persists per session only."""

from datetime import date, timedelta
from typing import Any

# user_id -> progress dict
_store: dict[str, dict[str, Any]] = {}

# Default badges
BADGE_IDS = ["first_lesson", "streak_3", "streak_7", "all_lessons", "call_simulator", "quiz_master"]


def _ensure_user(user_id: str) -> dict[str, Any]:
    if user_id not in _store:
        _store[user_id] = {
            "xp": 0,
            "level": 1,
            "completed_lessons": [],
            "badges": [],
            "last_activity_date": None,
            "current_streak": 0,
            "max_streak": 0,
        }
    return _store[user_id]


def _level_from_xp(xp: int) -> int:
    return max(1, 1 + xp // 100)


def get_progress(user_id: str) -> dict[str, Any]:
    p = _ensure_user(user_id)
    return {
        "xp": p["xp"],
        "level": _level_from_xp(p["xp"]),
        "badges": p["badges"],
        "current_streak": p["current_streak"],
        "max_streak": p["max_streak"],
        "completed_lessons": p["completed_lessons"],
        "last_activity_date": p["last_activity_date"],
    }


def _update_streak(user_id: str) -> None:
    p = _store[user_id]
    today = date.today().isoformat()
    last = p["last_activity_date"]
    if last == today:
        return
    if last is None:
        p["current_streak"] = 1
    else:
        last_d = date.fromisoformat(last)
        if (date.today() - last_d).days == 1:
            p["current_streak"] = p.get("current_streak", 0) + 1
        else:
            p["current_streak"] = 1
    p["max_streak"] = max(p["max_streak"], p["current_streak"])
    p["last_activity_date"] = today


def add_xp(user_id: str, amount: int, reason: str = "") -> dict[str, Any]:
    _ensure_user(user_id)
    _store[user_id]["xp"] += amount
    _update_streak(user_id)
    _maybe_award_badges(user_id)
    return get_progress(user_id)


def complete_lesson(user_id: str, lesson_id: str, xp: int) -> dict[str, Any]:
    _ensure_user(user_id)
    if lesson_id not in _store[user_id]["completed_lessons"]:
        _store[user_id]["completed_lessons"].append(lesson_id)
    _store[user_id]["xp"] += xp
    _update_streak(user_id)
    _maybe_award_badges(user_id)
    return get_progress(user_id)


def _maybe_award_badges(user_id: str) -> None:
    p = _store[user_id]
    badges = set(p["badges"])
    completed = set(p["completed_lessons"])
    streak = p["current_streak"]

    if len(completed) >= 1 and "first_lesson" not in badges:
        badges.add("first_lesson")
    if streak >= 3 and "streak_3" not in badges:
        badges.add("streak_3")
    if streak >= 7 and "streak_7" not in badges:
        badges.add("streak_7")
    if len(completed) >= 5 and "all_lessons" not in badges:
        badges.add("all_lessons")
    if "quiz_master" not in badges and len(completed) >= 3:
        badges.add("quiz_master")

    p["badges"] = list(badges)


def award_badge(user_id: str, badge_id: str) -> dict[str, Any]:
    _ensure_user(user_id)
    if badge_id not in _store[user_id]["badges"]:
        _store[user_id]["badges"].append(badge_id)
    return get_progress(user_id)


def set_call_simulator_done(user_id: str) -> dict[str, Any]:
    _ensure_user(user_id)
    if "call_simulator" not in _store[user_id]["badges"]:
        _store[user_id]["badges"].append("call_simulator")
    _store[user_id]["xp"] += 50
    _update_streak(user_id)
    return get_progress(user_id)
