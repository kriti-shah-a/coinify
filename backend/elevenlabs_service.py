"""Voice for call simulator via ElevenLabs; frontend falls back to speechSynthesis when no key."""

import base64
from pathlib import Path

from config import ELEVENLABS_API_KEY

# In-memory cache: script_id -> audio bytes (base64 or URL would be returned)
_audio_cache: dict[str, bytes] = {}

def get_voice_audio(script: str, script_id: str = "default") -> tuple[bool, str | None]:
    """
    If ElevenLabs key is set, generate audio and return (True, base64_audio).
    Otherwise return (False, None) so frontend uses speechSynthesis.
    """
    if not ELEVENLABS_API_KEY:
        return False, None
    if script_id in _audio_cache:
        return True, base64.b64encode(_audio_cache[script_id]).decode()
    try:
        import httpx
        # ElevenLabs text-to-speech (v1)
        voice_id = "21m00Tcm4TlvDq8ikWAM"  # Rachel - default
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY,
        }
        payload = {"text": script[:5000], "model_id": "eleven_monolingual_v1"}
        with httpx.Client(timeout=30) as client:
            r = client.post(url, json=payload, headers=headers)
            if r.status_code == 200:
                _audio_cache[script_id] = r.content
                return True, base64.b64encode(r.content).decode()
    except Exception:
        pass
    return False, None
