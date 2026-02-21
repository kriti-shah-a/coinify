from itsdangerous import BadSignature, URLSafeTimedSerializer

from config import DEMO_USER, SECRET_KEY, SESSION_COOKIE_NAME

serializer = URLSafeTimedSerializer(SECRET_KEY)


def create_session(user_id: str) -> str:
    return serializer.dumps({"user_id": user_id})


def load_session(token: str) -> str | None:
    try:
        data = serializer.loads(token, max_age=7 * 24 * 3600)  # 7 days
        return data.get("user_id")
    except BadSignature:
        return None


def verify_login(username: str, password: str) -> dict | None:
    if username == DEMO_USER["username"] and password == DEMO_USER["password"]:
        return {k: v for k, v in DEMO_USER.items() if k != "password"}
    return None
