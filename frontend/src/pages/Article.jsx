import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../api/client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getArticleById(id);
      setArticle(data);
    }
    load();
  }, [id]);

  if (!article) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
        <Link 
        to="/" 
        style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 999,
            background: "#656dff",
            padding: "10px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            color: "#eee",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
        }}
        >
        ← Back
        </Link>
      <h1>{article.title}</h1>
      <ReactMarkdown style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.6" }}>
        {article.content}
      </ReactMarkdown>
    </div>
  );
}
