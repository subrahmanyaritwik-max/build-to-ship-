const BASE_URL = '/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API Client] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  getStats: () => fetchJson('/stats'),
  getGuides: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/guides${query ? `?${query}` : ''}`);
  },
  getTasks: () => fetchJson('/tasks'),
  createTask: (task) => fetchJson('/tasks', { method: 'POST', body: JSON.stringify(task) }),
  updateTask: (id, updates) => fetchJson(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteTask: (id) => fetchJson(`/tasks/${id}`, { method: 'DELETE' }),
  getFlashcards: (deck) => fetchJson(`/flashcards${deck ? `?deck=${encodeURIComponent(deck)}` : ''}`),
  createFlashcard: (card) => fetchJson('/flashcards', { method: 'POST', body: JSON.stringify(card) }),
  getQuizzes: () => fetchJson('/quizzes'),
  getQuizById: (id) => fetchJson(`/quizzes/${id}`),
  submitQuiz: (id, userAnswers) => fetchJson(`/quizzes/${id}/submit`, { method: 'POST', body: JSON.stringify({ userAnswers }) }),
  getSessions: () => fetchJson('/sessions'),
  logSession: (session) => fetchJson('/sessions', { method: 'POST', body: JSON.stringify(session) }),
  calculateGpa: (payload) => fetchJson('/gpa/calculate', { method: 'POST', body: JSON.stringify(payload) })
};
