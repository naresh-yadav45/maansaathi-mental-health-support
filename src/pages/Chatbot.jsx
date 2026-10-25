import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

export default function Chatbot() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getChatHistory(token).then(setMessages).catch(() => {});
  }, [token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { sender: "user", message: input, _id: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);
    try {
      const res = await api.sendChatMessage(userMsg.message, token);
      setMessages((m) => [...m, { sender: "bot", message: res.reply, _id: Date.now() + 1 }]);
      if (res.riskFlag === "high") {
        setTimeout(() => navigate("/crisis"), 1200);
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page" style={{ maxWidth: 640 }}>
      <h2>Talk to us</h2>
      <p style={{ color: "var(--text-muted)" }}>This conversation is private. I'm here to listen.</p>

      <div className="card" style={{ height: 420, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 4 }}>
          {messages.map((m) => (
            <div
              key={m._id}
              style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                background: m.sender === "user" ? "var(--primary)" : "var(--primary-light)",
                color: m.sender === "user" ? "white" : "var(--text-main)",
                padding: "10px 14px",
                borderRadius: 14,
                maxWidth: "80%",
              }}
            >
              {m.message}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type how you're feeling..."
          />
          <button className="btn btn-primary" onClick={send} disabled={sending}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
