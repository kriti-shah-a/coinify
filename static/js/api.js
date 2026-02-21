const API_BASE = '';

async function api(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'same-origin',
  });
  if (res.status === 302) {
    const loc = res.headers.get('Location');
    if (loc) window.location.href = loc;
    return null;
  }
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const apiGet = (path) => api(path, { method: 'GET' });
const apiPost = (path, body) => api(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined });

async function getMe() {
  return apiGet('/api/me');
}

async function login(username, password) {
  return apiPost('/api/login', { username, password });
}

async function logout() {
  return apiPost('/api/logout');
}

async function getLessons() {
  return apiGet('/api/lessons');
}

async function getLesson(lessonId) {
  return apiGet(`/api/lessons/${lessonId}`);
}

async function getQuiz(lessonId) {
  return apiGet(`/api/lessons/${lessonId}/quiz`);
}

async function completeLesson(lessonId, xp = 20) {
  return apiPost(`/api/lessons/${lessonId}/complete`, { xp });
}

async function getCallSimulatorScript() {
  return apiGet('/api/call-simulator/script');
}

async function getCallSimulatorAudio() {
  return apiGet('/api/call-simulator/audio');
}

/** Same as coinifydupe: POST /api/elevenlabs/speech with { text }, returns Response (audio/mpeg blob). */
async function fetchElevenLabsSpeech(text) {
  const url = (typeof window !== 'undefined' && window.location && window.location.origin)
    ? window.location.origin + '/api/elevenlabs/speech'
    : '/api/elevenlabs/speech';
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: (text || '').substring(0, 5000) }),
    credentials: 'same-origin',
  });
}

async function completeCallSimulator() {
  return apiPost('/api/call-simulator/complete');
}

async function getProgress() {
  return apiGet('/api/progress');
}
