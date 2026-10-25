import React from "react";

export default function Crisis() {
  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <div className="breathing-circle" style={{ marginBottom: 20 }} aria-hidden="true" />
      <h2>You don't have to go through this alone</h2>
      <p style={{ color: "var(--text-muted)" }}>
        If you're in immediate distress or having thoughts of harming yourself, please reach out right now.
        Someone is available to help.
      </p>

      <div className="card" style={{ background: "var(--danger-bg)", borderColor: "var(--danger)", marginBottom: 16 }}>
        <h3 style={{ color: "var(--danger)" }}>National helplines (India)</h3>
        <p style={{ margin: "4px 0" }}><strong>Tele-MANAS:</strong> 14416 (24/7, toll-free, multilingual)</p>
        <p style={{ margin: "4px 0" }}><strong>KIRAN Mental Health Helpline:</strong> 1800-599-0019</p>
        <p style={{ margin: "4px 0" }}><strong>Emergency services:</strong> 112</p>
      </div>

      <div className="card">
        <h3>Right now, on campus</h3>
        <p>Contact your college's counseling cell directly, or use the button below to reach a counselor on this platform immediately.</p>
        <a href="/booking" className="btn btn-primary">Connect with a counselor</a>
      </div>
    </div>
  );
}
