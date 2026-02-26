# 🟣 Coinify  
**Where money skills become superpowers.**

---

## What Inspired This Project

Financial literacy in American high schools is inconsistent and often minimal.

Many students graduate understanding advanced math but not how interest compounds, how loans work, how credit scores are calculated, or how to negotiate compensation.

Finance can feel overwhelming and exclusive. Women, first-generation students, immigrants, and underrepresented communities are often disproportionately affected by limited access to financial mentorship.

Coinify was built to lower the barrier to financial curiosity.

Not a textbook.  
Not a lecture.  
But an interactive, mobile-first experience focused on applied learning.

---

## What is Coinify?

Coinify is a financial literacy platform built around:

- Structured lessons with adaptive quizzes  
- A Financial Arcade with interactive mini-games
- A DEI-focused Financial Audit chat simulation  
- An Explore Diversity in Finance section with AI voice narration  

The goal is real-world financial fluency through practice and simulation.

---

## 🛠 Tech Stack

**Backend**
- Python
- FastAPI
- Gemini API (lesson content + adaptive quizzes)
- ElevenLabs API (voice narration for diversity articles)

**Frontend**
- HTML
- Tailwind CSS (CDN)
- Vanilla JavaScript (no frameworks)
---

## Setup

### 1. Clone the repository

```bash
cd coinify
```

### 2. Create a virtual environment (recommended)

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

## 🔑 Optional: Add API Keys

Copy the example environment file:

```bash
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux
```

Add the following if available:

- `GEMINI_API_KEY`
- `ELEVENLABS_API_KEY`

The app runs without keys, but AI features will be disabled.

---

## ▶️ Run the App

From the backend directory:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Open in browser:

```
http://localhost:8000/static/login.html
```

**Demo Login:**
- Username: `demo`
- Password: `demo`

---

## 🎮 Gamification System

- **XP** – Earned from lessons, quizzes, and Financial Audit simulations (100 XP per level)
- **Levels** – Derived from total XP
- **Badges** – Lesson milestones, streak achievements, audit completion
- **Daily Streak** – Consecutive activity days (in-memory)
- **Leaderboard** – Mini-game scores stored in localStorage

---

## 🤖 AI Integration

### Gemini API
Used to generate:
- Dynamic lesson content  
- Adaptive quiz questions  

### ElevenLabs API
Used in the **Explore Diversity in Finance** section to provide AI voice narration for articles, improving accessibility and engagement.

---

## 🎯 Vision

Coinify is designed to build financial confidence through structured exposure, simulation, and repetition.

The goal is simple:

Equip users with the clarity and practical skills needed to navigate real financial decisions independently.
