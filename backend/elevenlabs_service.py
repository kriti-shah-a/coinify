# """Voice via ElevenLabs – same implementation as coinifydupe (REST with xi-api-key)."""
# import base64
# import os

# from config import ELEVENLABS_API_KEY

# VOICE_ID = "21m00Tcm4TlvDq8ikWAM"  # Rachel – same as coinifydupe
# URL = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"

# _audio_cache: dict[str, bytes] = {}


# def _get_key() -> str:
#     return (ELEVENLABS_API_KEY or os.getenv("ELEVENLABS_API_KEY") or "").strip()


# def is_elevenlabs_available() -> bool:
#     return bool(_get_key())


# def get_voice_audio(script: str, script_id: str = "default") -> tuple[bool, str | None]:
#     """
#     Same REST call as coinifydupe server.ts. Returns (True, base64_mp3) or (False, None).
#     """
#     key = _get_key()
#     if not key:
#         return False, None
#     if script_id in _audio_cache:
#         return True, base64.b64encode(_audio_cache[script_id]).decode("ascii")
#     try:
#         import httpx
#         text = (script or "")[:5000]
#         payload = {
#             "text": text,
#             "model_id": "eleven_monolingual_v1",
#             "voice_settings": {
#                 "stability": 0.5,
#                 "similarity_boost": 0.5,
#             },
#         }
#         headers = {
#             "Content-Type": "application/json",
#             "xi-api-key": key,
#         }
#         with httpx.Client(timeout=60) as client:
#             r = client.post(URL, json=payload, headers=headers)
#         if r.status_code == 200 and r.content:
#             _audio_cache[script_id] = r.content
#             return True, base64.b64encode(r.content).decode("ascii")
#     except Exception:
#         pass
#     return False, None


# def get_voice_audio_bytes(script: str) -> bytes | None:
#     """Return raw MP3 bytes (for /api/elevenlabs/speech raw response like coinifydupe)."""
#     key = _get_key()
#     if not key:
#         return None
#     try:
#         import httpx
#         text = (script or "")[:5000]
#         payload = {
#             "text": text,
#             "model_id": "eleven_monolingual_v1",
#             "voice_settings": {
#                 "stability": 0.5,
#                 "similarity_boost": 0.5,
#             },
#         }
#         headers = {
#             "Content-Type": "application/json",
#             "xi-api-key": key,
#         }
#         with httpx.Client(timeout=60) as client:
#             r = client.post(URL, json=payload, headers=headers)
#         if r.status_code == 200 and r.content:
#             return r.content
#     except Exception:
#         pass
#     return None


# import os
# from elevenlabs.client import ElevenLabs
# from elevenlabs.types import VoiceSettings

# # The client will automatically read the API key from the ELEVENLABS_API_KEY environment variable
# client = ElevenLabs()

# # The article content (replace with actual article fetching logic)
# article_text = """
# ElevenLabs provides programmatic access to their AI models for voice, 
# music, and more. You can integrate these capabilities directly into your 
# applications and workflows using the API and official SDKs.
# """

# # Generate speech from the article text
# audio = client.text_to_speech.convert(
#     voice_id="<your-voice-id>", # Replace with the ID of your desired voice
#     text=article_text,
#     model="eleven_multilingual_v2", # Use a suitable model
#     voice_settings=VoiceSettings(stability=0.5, similarity_boost=0.5)
# )

# # Save the audio to a file
# with open("article_audio.mp3", "wb") as f:
#     for chunk in audio:
#         if chunk:
#             f.write(chunk)

# print("Article audio saved as article_audio.mp3")
