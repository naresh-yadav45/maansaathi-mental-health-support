import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

const CATEGORIES = ["general", "exam-stress", "relationships", "career-anxiety"];

export default function Community() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.getCommunityPosts(filter, token).then(setPosts).catch(() => {});
  }, [token, filter]);

  async function submitPost() {
    if (!content.trim()) return;
    const post = await api.createCommunityPost({ content, category, anonymous: true }, token);
    setPosts((p) => [{ ...post, author: { displayName: "Anonymous Student" } }, ...p]);
    setContent("");
  }

  async function support(id) {
    const updated = await api.supportPost(id, token);
    setPosts((p) => p.map((post) => (post._id === id ? { ...post, supportCount: updated.supportCount } : post)));
  }

  return (
    <div className="page">
      <h2>Community</h2>
      <p style={{ color: "var(--text-muted)" }}>A safe, moderated space. Posts are anonymous by default.</p>

      <div className="card" style={{ marginBottom: 20 }}>
        <label>Share what's on your mind</label>
        <textarea rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
        <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: 200 }}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("-", " ")}</option>)}
          </select>
          <button className="btn btn-primary" onClick={submitPost}>Post anonymously</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button className="btn btn-outline" onClick={() => setFilter("")}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c} className="btn btn-outline" onClick={() => setFilter(c)}>{c.replace("-", " ")}</button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {posts.map((p) => (
          <div key={p._id} className="card">
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 6px" }}>
              {p.author?.displayName} · {p.category.replace("-", " ")}
            </p>
            <p style={{ margin: "0 0 10px" }}>{p.content}</p>
            <button className="btn btn-outline" onClick={() => support(p._id)}>
              ❤️ I relate ({p.supportCount})
            </button>
          </div>
        ))}
        {posts.length === 0 && <p style={{ color: "var(--text-muted)" }}>No posts yet — be the first to share.</p>}
      </div>
    </div>
  );
}
