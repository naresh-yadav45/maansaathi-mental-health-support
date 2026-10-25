import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

export default function Signup() {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    college: "",
    anonymousMode: false,
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await api.signup(form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page" style={{ maxWidth: 440 }}>
      <h2>Create your account</h2>
      <p style={{ color: "var(--text-muted)" }}>
        You can use a pseudonym below — you don't need to use your real name.
      </p>
      <form className="card" onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <div>
          <label>Display name / pseudonym</label>
          <input name="displayName" value={form.displayName} onChange={handleChange} required />
        </div>
        <div>
          <label>College email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
        </div>
        <div>
          <label>College name (optional)</label>
          <input name="college" value={form.college} onChange={handleChange} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 400 }}>
          <input
            type="checkbox"
            name="anonymousMode"
            checked={form.anonymousMode}
            onChange={handleChange}
            style={{ width: "auto" }}
          />
          Hide my name across the platform (anonymous mode)
        </label>
        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
        <button className="btn btn-primary" type="submit">Sign up</button>
      </form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Log in</Link>
      </p>
    </div>
  );
}
