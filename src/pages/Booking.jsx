import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

export default function Booking() {
  const { token } = useAuth();
  const [counselors, setCounselors] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [slot, setSlot] = useState("");
  const [mode, setMode] = useState("chat");
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.getCounselors(token).then(setCounselors).catch(() => {});
    api.getMyBookings(token).then(setMyBookings).catch(() => {});
  }, [token]);

  async function book() {
    if (!selected || !slot) return;
    const booking = await api.createBooking({ counselorId: selected, slot, mode }, token);
    setMyBookings((b) => [...b, booking]);
    setStatus("Booking request sent. You'll be notified once confirmed.");
    setSelected(null);
    setSlot("");
  }

  return (
    <div className="page">
      <h2>Book a counselor</h2>
      <p style={{ color: "var(--text-muted)" }}>Choose someone who fits your comfort — language, specialization, mode.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 24 }}>
        {counselors.map((c) => (
          <div
            key={c._id}
            className="card"
            style={{ borderColor: selected === c._id ? "var(--primary)" : "var(--border)", cursor: "pointer" }}
            onClick={() => setSelected(c._id)}
          >
            <h3>{c.displayName}</h3>
            <p style={{ margin: "4px 0", color: "var(--text-muted)" }}>{c.specialization || "General counseling"}</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
              Speaks: {(c.languagesSpoken || []).join(", ") || "English"}
            </p>
          </div>
        ))}
        {counselors.length === 0 && <p style={{ color: "var(--text-muted)" }}>No counselors available right now.</p>}
      </div>

      {selected && (
        <div className="card" style={{ maxWidth: 420, marginBottom: 32 }}>
          <label>Preferred date & time</label>
          <input type="datetime-local" value={slot} onChange={(e) => setSlot(e.target.value)} />
          <label style={{ marginTop: 12 }}>Session mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="chat">Chat</option>
            <option value="audio">Audio call</option>
            <option value="video">Video call</option>
          </select>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={book}>
            Confirm booking
          </button>
          {status && <p style={{ color: "var(--primary)" }}>{status}</p>}
        </div>
      )}

      <h3>Your bookings</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {myBookings.map((b) => (
          <div key={b._id} className="card">
            <strong>{b.counselor?.displayName}</strong> — {new Date(b.slot).toLocaleString()} · {b.mode} ·{" "}
            <span style={{ color: "var(--primary)" }}>{b.status}</span>
          </div>
        ))}
        {myBookings.length === 0 && <p style={{ color: "var(--text-muted)" }}>No bookings yet.</p>}
      </div>
    </div>
  );
}
