import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="page" style={{ maxWidth: 440 }}>
      <h2>Profile & settings</h2>
      <div className="card" style={{ display: "grid", gap: 14 }}>
        <div>
          <label>Display name</label>
          <p>{user?.displayName}</p>
        </div>
        <div>
          <label>Role</label>
          <p style={{ textTransform: "capitalize" }}>{user?.role}</p>
        </div>
        <div>
          <label>Anonymous mode</label>
          <p>{user?.anonymousMode ? "On — your identity is hidden platform-wide" : "Off"}</p>
        </div>
        <button className="btn btn-outline" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
