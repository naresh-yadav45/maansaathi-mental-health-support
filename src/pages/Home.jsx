import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", paddingTop: 40 }}>
        <div style={{ flex: "1 1 420px" }}>
          <h1 style={{ fontSize: 42, lineHeight: 1.15 }}>
            A quiet space to check in with yourself.
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 17, maxWidth: 480 }}>
            MannSaathi is your college's confidential mental health companion — talk anonymously,
            track how you're feeling, and connect with real counselors when you need to.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Link to="/signup" className="btn btn-primary">Get support anonymously</Link>
            <Link to="/crisis" className="btn btn-outline">Feeling low right now?</Link>
          </div>
        </div>
        <div style={{ flex: "0 0 auto" }} className="breathing-circle" aria-hidden="true" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 60 }}>
        {[
          ["100% Confidential", "Use a pseudonym. Nobody at your college sees your identity unless you choose to share it."],
          ["24/7 First Response", "Our AI companion is always available for a first conversation, any time of day."],
          ["Real Counselors", "Book a session with a qualified counselor in your preferred language when you need more support."],
        ].map(([title, desc]) => (
          <div className="card" key={title}>
            <h3>{title}</h3>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
