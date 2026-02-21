import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
load_dotenv(BASE_DIR / ".env")

# Auth
SECRET_KEY = os.getenv("SECRET_KEY", "coinify-demo-secret-change-in-production")
SESSION_COOKIE_NAME = "coinify_session"

# Demo user (hardcoded)
DEMO_USER = {
    "id": "demo",
    "username": "demo",
    "password": "demo",
    "display_name": "Demo Learner",
}

# API keys (optional)
GEMINI_API_KEY = "AIzaSyAGgr8Lj8OYckpbqmONjUpN6kAXUdANN9E"
ELEVENLABS_API_KEY = os.getenv("189d17056bcb7061d0e8c1dd05e3f538b03b412951d59b30108338059db15308", "")
