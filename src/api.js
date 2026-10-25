const BASE_URL = "/api"; // proxied to http://localhost:5000 in dev (see vite.config.js)

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const api = {
  signup: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),

  logMood: (payload, token) => request("/mood", { method: "POST", body: payload, token }),
  getMoodHistory: (token) => request("/mood", { token }),

  sendChatMessage: (message, token) =>
    request("/chatbot/message", { method: "POST", body: { message }, token }),
  getChatHistory: (token) => request("/chatbot/history", { token }),

  getCounselors: (token) => request("/booking/counselors", { token }),
  createBooking: (payload, token) => request("/booking", { method: "POST", body: payload, token }),
  getMyBookings: (token) => request("/booking/mine", { token }),

  getCommunityPosts: (category, token) =>
    request(`/community${category ? `?category=${category}` : ""}`, { token }),
  createCommunityPost: (payload, token) =>
    request("/community", { method: "POST", body: payload, token }),
  supportPost: (id, token) => request(`/community/${id}/support`, { method: "POST", token }),

  getMoodTrend: (token) => request("/admin/mood-trend", { token }),
  getRiskSummary: (token) => request("/admin/risk-summary", { token }),
};
