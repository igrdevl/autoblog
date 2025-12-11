const API_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:3000";

export async function getArticles() {
  const res = await fetch(`${API_BASE_URL}/articles`);
  return res.json();
}

export async function getArticleById(id) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`);
  return res.json();
}
