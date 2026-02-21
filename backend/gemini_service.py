"""Lesson content and adaptive quiz via Gemini API; fallback to mock data."""

import json
import re

from config import GEMINI_API_KEY
from mock_data import LESSON_CONTENT, LESSONS, MOCK_QUIZ

if GEMINI_API_KEY:
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        _model = genai.GenerativeModel("gemini-1.5-flash")
    except Exception:
        _model = None
else:
    _model = None


def get_lessons() -> list[dict]:
    """Return list of lessons (from Gemini or mock)."""
    if _model:
        try:
            prompt = """You are a financial literacy educator. Return a JSON array of 5 short lessons for beginners. Each object: "id" (string 1-5), "title", "description" (one sentence), "icon" (single emoji), "xp" (number 20-35), "order" (1-5). Only valid JSON, no markdown."""
            r = _model.generate_content(prompt)
            text = r.text.strip()
            if "```" in text:
                text = re.sub(r"^```\w*\n?", "", text).replace("```", "").strip()
            data = json.loads(text)
            if isinstance(data, list) and len(data) >= 1:
                return data
        except Exception:
            pass
    return LESSONS


def get_lesson_content(lesson_id: str) -> dict | None:
    """Get full content for one lesson (from Gemini or mock)."""
    if _model:
        try:
            prompt = f"""You are a financial literacy educator. For a lesson with id "{lesson_id}", return a JSON object with "title" and "sections" (array of objects with "heading" and "body", 2-4 sections). Short, clear sentences. Only valid JSON, no markdown."""
            r = _model.generate_content(prompt)
            text = r.text.strip()
            if "```" in text:
                text = re.sub(r"^```\w*\n?", "", text).replace("```", "").strip()
            return json.loads(text)
        except Exception:
            pass
    return LESSON_CONTENT.get(lesson_id)


def get_adaptive_quiz(lesson_id: str, topic: str, num_questions: int = 3) -> dict:
    """Generate quiz questions for a lesson (from Gemini or mock)."""
    if _model:
        try:
            prompt = f"""For a financial literacy lesson (id={lesson_id}, topic: {topic}), return a JSON object with key "questions", value an array of {num_questions} multiple choice questions. Each question: "id" (e.g. "q1"), "text", "options" (array of 4 strings), "correct" (0-based index). Only valid JSON, no markdown."""
            r = _model.generate_content(prompt)
            text = r.text.strip()
            if "```" in text:
                text = re.sub(r"^```\w*\n?", "", text).replace("```", "").strip()
            data = json.loads(text)
            if "questions" in data and isinstance(data["questions"], list):
                return data
        except Exception:
            pass
    return MOCK_QUIZ
