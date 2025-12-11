export async function getArticles() {
  const res = await fetch("http://localhost:3000/articles");
  return res.json();
}

export async function getArticleById(id) {
  const res = await fetch(`http://localhost:3000/articles/${id}`);
  return res.json();
}
