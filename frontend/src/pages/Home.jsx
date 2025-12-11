import { useEffect, useState } from "react";
import { getArticles } from "../api/client";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown"; 

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getArticles();
      setArticles(data);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Articles</h1>

      {articles.map(article => (
        <div
          key={article.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "15px 0",
          }}
        >
          <Link to={`/article/${article.id}`} style={{ textDecoration: "none" }}>
            <h2>{article.title}</h2>
          </Link>

          <ReactMarkdown>
            {article.content.length > 150
              ? article.content.slice(0, 150) + "..."
              : article.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
