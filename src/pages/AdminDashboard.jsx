import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [trend, setTrend] = useState([]);
  const [risk, setRisk] = useState([]);

  useEffect(() => {
    api.getMoodTrend(token).then(setTrend).catch(() => {});
    api.getRiskSummary(token).then(setRisk).catch(() => {});
  }, [token]);

  return (
    <div className="page">
      <h2>Institution dashboard</h2>
      <p style={{ color: "var(--text-muted)" }}>
        All data below is aggregated and anonymized — no individual student is identifiable here.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3>Average campus mood, by day</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
          {trend.map((t) => (
            <div key={t._id} title={`${t._id}: ${t.averageMood.toFixed(1)} avg (${t.entries} check-ins)`}
              style={{
                width: 20,
                height: `${(t.averageMood / 5) * 100}%`,
                background: "var(--primary)",
                borderRadius: 4,
              }} />
          ))}
          {trend.length === 0 && <p style={{ color: "var(--text-muted)" }}>No data yet.</p>}
        </div>
      </div>

      <div className="card">
        <h3>Chatbot risk-flag summary</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          Counts of conversations flagged medium/high risk — used to spot trends (e.g. exam season spikes), not to identify individuals.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {risk.map((r) => (
            <div key={r._id}>
              <div style={{ fontSize: 28, fontWeight: 700, color: r._id === "high" ? "var(--danger)" : "var(--accent-amber)" }}>
                {r.count}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "capitalize" }}>{r._id} risk</div>
            </div>
          ))}
          {risk.length === 0 && <p style={{ color: "var(--text-muted)" }}>No flags yet.</p>}
        </div>
      </div>
    </div>
  );
}
