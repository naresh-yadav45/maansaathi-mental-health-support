import React, { useState } from "react";

const RESOURCES = [
  { title: "5-minute breathing exercise", type: "Audio", category: "Mindfulness" },
  { title: "Coping with exam anxiety", type: "Article", category: "Stress Management" },
  { title: "Building a sleep routine as a student", type: "Article", category: "Sleep" },
  { title: "Guided body-scan meditation", type: "Audio", category: "Mindfulness" },
  { title: "Balancing academics and personal life", type: "Video", category: "Study-Life Balance" },
];

const CATEGORIES = ["All", "Mindfulness", "Stress Management", "Sleep", "Study-Life Balance"];

export default function Resources() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === filter);

  return (
    <div className="page">
      <h2>Resource library</h2>
      <p style={{ color: "var(--text-muted)" }}>Downloadable content, usable even with a weak connection.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button key={c} className="btn btn-outline" onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {filtered.map((r) => (
          <div key={r.title} className="card">
            <p style={{ fontSize: 12, color: "var(--accent-amber)", fontWeight: 700, margin: "0 0 6px" }}>{r.type.toUpperCase()}</p>
            <h3 style={{ fontSize: 16 }}>{r.title}</h3>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>{r.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
