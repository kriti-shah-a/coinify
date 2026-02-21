"""Mock lesson content and quiz when Gemini API key is not set."""

LESSONS = [
    {
        "id": "1",
        "title": "What is a budget?",
        "description": "Learn the basics of budgeting and why it matters.",
        "icon": "💰",
        "xp": 20,
        "order": 1,
    },
    {
        "id": "2",
        "title": "Needs vs wants",
        "description": "Tell the difference between needs and wants.",
        "icon": "🎯",
        "xp": 25,
        "order": 2,
    },
    {
        "id": "3",
        "title": "Saving for goals",
        "description": "How to save money for things you want.",
        "icon": "🐷",
        "xp": 30,
        "order": 3,
    },
    {
        "id": "4",
        "title": "Earning money",
        "description": "Ways to earn and manage your income.",
        "icon": "💵",
        "xp": 25,
        "order": 4,
    },
    {
        "id": "5",
        "title": "Avoiding scams",
        "description": "Spot and avoid common money scams.",
        "icon": "🛡️",
        "xp": 35,
        "order": 5,
    },
]

LESSON_CONTENT = {
    "1": {
        "title": "What is a budget?",
        "sections": [
            {"heading": "Definition", "body": "A budget is a plan for how you will spend and save your money. It helps you make sure you have enough for what you need and what you want."},
            {"heading": "Why it matters", "body": "Without a budget, it's easy to spend more than you have. A budget keeps you on track and helps you reach your goals."},
            {"heading": "Simple rule", "body": "Try the 50-30-20 rule: 50% needs, 30% wants, 20% savings."},
        ],
    },
    "2": {
        "title": "Needs vs wants",
        "sections": [
            {"heading": "Needs", "body": "Needs are things you must have to live: food, shelter, utilities, healthcare, and basic clothing."},
            {"heading": "Wants", "body": "Wants are things that are nice to have but you can live without: entertainment, eating out, new gadgets."},
            {"heading": "Tip", "body": "Always cover your needs first. Then use what's left for wants and savings."},
        ],
    },
    "3": {
        "title": "Saving for goals",
        "sections": [
            {"heading": "Set a goal", "body": "Decide what you're saving for and how much it costs. Write it down."},
            {"heading": "Pay yourself first", "body": "Put money into savings as soon as you get paid, before you spend on other things."},
            {"heading": "Small steps", "body": "Even a little each week adds up. Start with what you can."},
        ],
    },
    "4": {
        "title": "Earning money",
        "sections": [
            {"heading": "Income", "body": "Income is money you earn from a job, side gig, or allowance."},
            {"heading": "Track it", "body": "Know how much you earn and when. This is the first step to budgeting."},
            {"heading": "Growth", "body": "Look for ways to learn new skills that can help you earn more over time."},
        ],
    },
    "5": {
        "title": "Avoiding scams",
        "sections": [
            {"heading": "Red flags", "body": "Be wary of promises that sound too good to be true, pressure to act fast, or requests for payment by gift cards or wire."},
            {"heading": "Verify", "body": "If someone contacts you about money, verify who they are through an official website or phone number—not the one they gave you."},
            {"heading": "Protect yourself", "body": "Never share passwords, PINs, or one-time codes with anyone who asks for them."},
        ],
    },
}

MOCK_QUIZ = {
    "questions": [
        {"id": "q1", "text": "What is a budget?", "options": ["A plan for spending and saving", "A type of bank", "A kind of loan", "A savings account"], "correct": 0},
        {"id": "q2", "text": "Which is a need?", "options": ["Video games", "Restaurant meals", "Rent", "New shoes"], "correct": 2},
        {"id": "q3", "text": "What does 'pay yourself first' mean?", "options": ["Spend on fun first", "Put savings aside before other spending", "Only save at the end of the month", "Don't save at all"], "correct": 1},
    ]
}

CALL_SIMULATOR_SCRIPT = """Hello, this is a reminder about your account. We need you to verify some information. Can you confirm your full name and date of birth?

[If they ask why] This is a standard security check. We've had some unusual activity and want to make sure it's really you.

[If they're unsure] You can call us back on the number on the back of your card to verify this call is legitimate. We'll never ask for your full password or PIN over the phone."""
