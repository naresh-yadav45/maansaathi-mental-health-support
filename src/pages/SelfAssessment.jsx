import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling/staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Trouble concentrating on things like studying",
  "Feeling anxious or on edge",
];

const OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function SelfAssessment() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  function setAnswer(i, value) {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
  }

  function submit() {
    const total = answers.reduce((sum, a) => sum + (a ?? 0), 0);
    let level = "low";
    if (total >= 15) level = "high";
    else if (total >= 8) level = "medium";
    setResult({ total, level });
  }

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="page" style={{ maxWidth: 620 }}>
      <h2>Self-assessment</h2>
      <p style={{ color: "var(--text-muted)" }}>
        Over the last 2 weeks, how often have you been bothered by the following? This is private and not a diagnosis.
      </p>

      {!result ? (
        <div style={{ display: "grid", gap: 18 }}>
          {QUESTIONS.map((q, i) => (
            <div key={q} className="card">
              <label>{q}</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    className="btn"
                    style={{
                      background: answers[i] === o.value ? "var(--primary)" : "var(--primary-light)",
                      color: answers[i] === o.value ? "white" : "var(--text-main)",
                      fontSize: 13,
                    }}
                    onClick={() => setAnswer(i, o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-primary" disabled={!allAnswered} onClick={submit}>
            See my result
          </button>
        </div>
      ) : (
        <div className="card">
          <h3>Your result</h3>
          {result.level === "high" && (
            <>
              <p>Your responses suggest you might be going through a difficult time. We'd recommend talking to a counselor soon.</p>
              <button className="btn btn-primary" onClick={() => navigate("/booking")}>Book a counselor</button>
            </>
          )}
          {result.level === "medium" && (
            <>
              <p>It looks like things have been a bit heavy lately. Talking to someone — a counselor or our AI companion — could help.</p>
              <button className="btn btn-primary" onClick={() => navigate("/chatbot")}>Talk to us</button>
            </>
          )}
          {result.level === "low" && (
            <p>You seem to be doing okay overall. Keep checking in with yourself — the resource library has tools if you ever need them.</p>
          )}
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 16 }}>
            This is a screening tool, not a clinical diagnosis. If you're in crisis, use the "Need help now" button anytime.
          </p>
        </div>
      )}
    </div>
  );
}
