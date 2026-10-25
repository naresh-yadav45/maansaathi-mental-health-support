import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-card)",
      }}
    >
      <Link to="/" style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--deep-teal)" }}>
        MannSaathi
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/chatbot">Talk to us</Link>
            <Link to="/booking">Counselors</Link>
            <Link to="/community">Community</Link>
            <Link to="/resources">Resources</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}

        {/* Always-visible crisis support access */}
        <button
          className="btn btn-danger"
          onClick={() => navigate("/crisis")}
        >
          Need help now
        </button>

        {user && (
          <button className="btn btn-outline" onClick={() => { logout(); navigate("/"); }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
