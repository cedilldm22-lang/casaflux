"use client";
import { useEffect, useState } from "react";

const AIRTABLE_BASE = "appdnd2iQTxgFMFKC";
const AIRTABLE_PROPERTIES = "tbl0GygHGyyb027KQ";

interface Property {
  id: string;
  address: string;
  score: number;
  urgentCount: number;
  monitorCount: number;
  goodCount: number;
  totalCostLow: number;
  totalCostHigh: number;
  urgentCost: number;
  summary: string;
  date: string;
  shareToken: string;
}

function fmt(n: number | null) {
  if (!n) return "N/A";
  return "$" + Number(n).toLocaleString();
}

function formatDate(val: string) {
  if (!val) return "N/A";
  try {
    return new Date(val).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch { return val; }
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 75 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: "#555", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color }}>{score}/100</span>
      </div>
      <div style={{ height: 6, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 75 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
  const r = 28, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r={r} fill="none" stroke="#eee" strokeWidth="6" />
      <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ / 4}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 0.8s ease" }} />
      <text x="35" y="35" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="14" fontWeight="800">{score}</text>
    </svg>
  );
}

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") || "";
    const e = params.get("email") || "";
    setToken(t);
    setEmail(e);
    if (t && e) {
      loadProperties(e, t);
    } else {
      setLoading(false);
    }
  }, []);

  async function loadProperties(emailAddr: string, tok: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard?email=${encodeURIComponent(emailAddr)}&token=${encodeURIComponent(tok)}`);
      if (!res.ok) { setError("Access denied or link expired."); setLoading(false); return; }
      const data = await res.json();
      setProperties(data.properties || []);
      setAuthed(true);
    } catch {
      setError("Failed to load your reports. Please try again.");
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif" }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ width: 40, height: 40, border: "4px solid #ff6d5a", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 1s linear infinite" }} />
          <p style={{ color: "#555", fontSize: 14 }}>Loading your reports...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!authed || error) {
    return (
      <div style={{ minHeight: "100vh", background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", padding: 20 }}>
        <div style={{ background: "white", borderRadius: 16, padding: "40px 36px", maxWidth: 420, width: "100%", textAlign: "center" as const }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Link expired or invalid</h2>
          <p style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>{error || "Please request a new sign-in link."}</p>
          <a href="/login" style={{ display: "inline-block", background: "#ff6d5a", color: "white", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Go to Login →</a>
        </div>
      </div>
    );
  }

  const avgScore = properties.length ? Math.round(properties.reduce((s, p) => s + p.score, 0) / properties.length) : 0;
  const totalUrgent = properties.reduce((s, p) => s + p.urgentCount, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f2f2f2", fontFamily: "Arial, sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: "white", borderBottom: "1px solid #eee", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: "#ff6d5a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: 14 }}>S</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>SmartListings</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#666" }}>{email}</span>
          <a href={`https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4`} style={{ background: "#ff6d5a", color: "white", padding: "7px 16px", borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>+ New Report</a>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 4 }}>Your Reports</h1>
          <p style={{ fontSize: 14, color: "#666" }}>{properties.length} inspection{properties.length !== 1 ? "s" : ""} analyzed</p>
        </div>

        {properties.length === 0 ? (
          <div style={{ background: "white", borderRadius: 12, padding: "48px 24px", textAlign: "center" as const }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No reports yet</h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>Upload your first inspection PDF to get started.</p>
            <a href="https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4" style={{ display: "inline-block", background: "#ff6d5a", color: "white", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Upload Inspection PDF →</a>
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Reports Analyzed", value: properties.length.toString(), color: "#111" },
                { label: "Avg Property Score", value: avgScore + "/100", color: avgScore >= 75 ? "#16a34a" : avgScore >= 50 ? "#d97706" : "#dc2626" },
                { label: "Total Urgent Issues", value: totalUrgent.toString(), color: totalUrgent > 0 ? "#dc2626" : "#16a34a" },
              ].map((s, i) => (
                <div key={i} style={{ background: "white", border: "1px solid #eee", borderRadius: 10, padding: "16px" }}>
                  <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Score chart */}
            <div style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: 1 }}>Property Scores</div>
              {properties.map(p => (
                <ScoreBar key={p.id} score={p.score} label={p.address} />
              ))}
            </div>

            {/* Property list */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {properties.map(p => {
                const scoreColor = p.score >= 75 ? "#16a34a" : p.score >= 50 ? "#d97706" : "#dc2626";
                const reportUrl = `/report/${p.id}${p.shareToken ? `?token=${p.shareToken}` : ""}`;
                return (
                  <a key={p.id} href={reportUrl} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: "16px 20px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, alignItems: "center", cursor: "pointer", transition: "box-shadow 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}>
                      {/* Score circle */}
                      <ScoreCircle score={p.score} />
                      {/* Details */}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 3 }}>{p.address}</div>
                        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{formatDate(p.date)}</div>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
                          {p.urgentCount > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", background: "#fee2e2", padding: "2px 8px", borderRadius: 4 }}>{p.urgentCount} urgent</span>}
                          {p.monitorCount > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: "#d97706", background: "#fef3c7", padding: "2px 8px", borderRadius: 4 }}>{p.monitorCount} monitor</span>}
                          {p.goodCount > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 8px", borderRadius: 4 }}>{p.goodCount} good</span>}
                        </div>
                      </div>
                      {/* Cost + arrow */}
                      <div style={{ textAlign: "right" as const }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>{fmt(p.totalCostLow)} – {fmt(p.totalCostHigh)}</div>
                        <div style={{ fontSize: 10, color: "#aaa", marginBottom: 8 }}>est. repair range</div>
                        <div style={{ fontSize: 12, color: "#ff6d5a", fontWeight: 700 }}>View Report →</div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
