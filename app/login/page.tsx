"use client";
import { useState } from "react";

const N8N_MAGIC_LINK_WEBHOOK = "https://flux1.app.n8n.cloud/webhook/smartlistings-magic-link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch(N8N_MAGIC_LINK_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        mode: "no-cors",
      });
      setSent(true);
    } catch {
      setSent(true); // still show success — no-cors can't read response
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", padding: 20 }}>
      <div style={{ background: "white", borderRadius: 16, padding: "40px 36px", maxWidth: 420, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, background: "#ff6d5a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: 16 }}>S</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#111" }}>SmartListings</span>
        </div>

        {!sent ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 8 }}>Sign in to your dashboard</h1>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 24, lineHeight: 1.6 }}>Enter your email and we'll send you a secure link — no password needed.</p>

            <label style={{ fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="you@example.com"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 14, color: "#111", outline: "none", marginBottom: 8, boxSizing: "border-box" as const }}
            />
            {error && <p style={{ fontSize: 12, color: "#dc2626", marginBottom: 8 }}>{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: "100%", padding: "13px", background: loading ? "#ccc" : "#ff6d5a", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginBottom: 16 }}
            >
              {loading ? "Sending..." : "Send Magic Link →"}
            </button>
            <p style={{ fontSize: 12, color: "#999", textAlign: "center" as const }}>We'll send a link to your inbox — check spam if you don't see it.</p>
          </>
        ) : (
          <div style={{ textAlign: "center" as const }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>Check your inbox!</h2>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 20 }}>We sent a secure sign-in link to <strong>{email}</strong>. Click it to access your dashboard.</p>
            <p style={{ fontSize: 12, color: "#999" }}>Didn't get it? Check your spam folder or <button onClick={() => { setSent(false); }} style={{ background: "none", border: "none", color: "#ff6d5a", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>try again</button>.</p>
          </div>
        )}
      </div>
    </div>
  );
}
