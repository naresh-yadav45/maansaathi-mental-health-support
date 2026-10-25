import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

const MOODS = [
  { score: 1, label: "Very low", emoji: "😔" },
  { score: 2, label: "Low", emoji: "🙁" },
  { score: 3, label: "Okay", emoji: "😐" },
  { score: 4, label: "Good", emoji: "🙂" },
  { score: 5, label: "Great", emoji: "😄" },
];

export default function Dashboard() {
  const { user, token } = useAuth();
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getMoodHistory(token).then(setHistory).catch(() => {});
  }, [token]);

  async function checkIn(score) {
    const log = await api.logMood({ moodScore: score }, token);
    setHistory((h) => [log, ...h]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="page">
      <h2>Hi {user?.displayName || "there"}, how are you today?</h2>

      <div className="card" style={{ marginBottom: 24 }}>
        <label>Quick mood check-in</label>
        <div style={{ display: "flex", gap: 12 }}>
          {MOODS.map((m) => (
            <button
              key={m.score}
              className="btn btn-outline"
              style={{ flexDirection: "column", padding: "14px 18px" }}
              onClick={() => checkIn(m.score)}
            >
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              <span style={{ fontSize: 12 }}>{m.label}</span>
            </button>
          ))}
        </div>
        {saved && <p style={{ color: "var(--primary)", marginTop: 10 }}>Saved. Thanks for checking in.</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <Link to="/chatbot" className="card">
          <h3>Talk to us</h3>
          <p style={{ color: "var(--text-muted)", margin: 0 }}>Start a conversation, any time.</p>
        </Link>
        <Link to="/booking" className="card">
          <h3>Book a counselor</h3>
          <p style={{ color: "var(--text-muted)", margin: 0 }}>Get 1-on-1 professional support.</p>
        </Link>
        <Link to="/community" className="card">
          <h3>Community</h3>
          <p style={{ color: "var(--text-muted)", margin: 0 }}>You're not the only one feeling this.</p>
        </Link>
        <Link to="/self-assessment" className="card">
          <h3>Self-assessment</h3>
          <p style={{ color: "var(--text-muted)", margin: 0 }}>A short, private check-in questionnaire.</p>
        </Link>
      </div>

      {history.length > 0 && (
        <div className="card" style={{ marginTop: 24 }}>
          <h3>Your recent mood entries</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {history.slice(0, 14).reverse().map((h) => (
              <div key={h._id} title={new Date(h.createdAt).toLocaleDateString()}
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: `rgba(43,110,99,${h.moodScore / 5})`,
                }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
