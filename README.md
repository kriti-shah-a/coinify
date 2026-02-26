# Coinify

**Where money skills become superpowers.**

### What Inspired This Project

In American high schools, financial literacy is barely covered.

Students graduate knowing advanced math, but not how interest compounds, how loans work, or how to negotiate pay.

Finance today feels overwhelming and exclusive. And many people, especially women and first-generation students, were never invited into the conversation.

Coinify was built to lower the barrier to curiosity.

Not a textbook.  
Not a lecture.  
But an interactive, mobile-first experience.

---

This is a financial literacy app: lessons, mini-games, and a DEI-focused

**Financial Audit** simulation. Vellum-inspired design with Gemini and ElevenLabs; 

## Stack

- **Backend:** Python, FastAPI, session-based auth (cookies)
- **Frontend:** HTML, Tailwind (CDN), vanilla JS (no frameworks)
- Gemini API (lesson content + adaptive quiz), ElevenLabs (voice). 


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

| Page | Path | Description |
|------|------|-------------|
| Login | `/static/login.html` | Demo login (session cookie) |
| Home | `/static/home.html` | Greeting, XP/streak, Today’s Curations, Final Audit card, badges |
| Lessons | `/static/lessons.html` | List of lessons (modules) |
| Lesson detail | `/static/lesson.html?id=1` | Content + quiz; earn XP |
| **Financial Arcade** | `/static/financial-arcade.html` | 4 mini-games, player name, leaderboard (localStorage) |
| Mini-games | `/static/minigames/*.html` | Budget Blitz, Credit Quest, Scam Squad, Needs vs Wants |
| **Financial Audit** | `/static/financial-audit.html` | DEI-focused simulation: choose scenario (salary, credit, rent, medical, investment, boundary) |
| Audit chat | `/static/financial-audit-chat.html?scenario=salary` | Chat-based simulation with choices, confidence meter, key-questions checklist |
| Leaderboard | `/static/leaderboard.html` | Arcade high scores (localStorage) |
| Call Simulator | `/static/call-simulator.html` | Voice call assessment (ElevenLabs or browser TTS) |
| Account | `/static/account.html` | Stats, badges, logout |

## Gamification

- **XP** – From lessons, quiz, and Financial Audit; 100 XP per level.
- **Level** – Derived from total XP.
- **Badges** – First lesson, streaks, all lessons, Call Pro, Quiz master; **Audit badges** per completed scenario (localStorage).
- **Daily streak** – Consecutive days with activity (in-memory; resets on server restart).
- **Arcade leaderboard** – Mini-game scores stored in localStorage; optional player name.

## API keys (optional)

- **GEMINI_API_KEY** – AI-generated lesson content and adaptive quiz questions.
- **ELEVENLABS_API_KEY** – Realistic voice for Call Simulator and optional NPC voice in Financial Audit.


