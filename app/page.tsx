"use client";
import React, { useEffect, useRef } from "react";

const N8N_FORM_URL = "https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4";
const STRIPE_URL = "https://buy.stripe.com/test_eVqcN52Hm58oa8y0Ir9R600";

export default function Home() {
  const [showSuccess, setShowSuccess] = React.useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    if (typeof window !== 'undefined' && window.location.search.includes('submitted=true')) {
      setShowSuccess(true);
      window.history.replaceState({}, '', '/');
    }
    return () => obs.disconnect();
  }, []);

  const go = () => { window.location.href = N8N_FORM_URL; };

  return (
    <main style={{ background: "#fff", fontFamily: "'Inter', sans-serif", color: "#111" }}>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 16, padding: "40px 36px", maxWidth: 440, width: "100%", textAlign: "center" as const }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, marginBottom: 10 }}>Report submitted!</h2>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>Your inspection is being analyzed. Check your inbox in under 60 seconds — every finding, repair cost, and negotiation tip.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" as const }}>
              <button onClick={() => setShowSuccess(false)} style={{ padding: "11px 22px", background: "#f0f0f0", color: "#111", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Back to site</button>
              <button onClick={() => { setShowSuccess(false); go(); }} style={{ padding: "11px 22px", background: "#ff6d5a", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Upload another →</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(10px)", borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#ff6d5a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: 13, fontWeight: 700, color: "white" }}>C</div>
          <span style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 700 }}>SmartListings</span>
        </div>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a href="#how-it-works" style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>How It Works</a>
          <a href="#example" style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>Example</a>
          <a href="#pricing" style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>Pricing</a>
        </div>
        <button onClick={go} style={{ background: "#ff6d5a", color: "white", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>Try Free →</button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", paddingTop: 58, display: "flex", alignItems: "center", background: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, #fff5f4 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 32px", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff5f4", border: "1px solid #ffd5d0", borderRadius: 100, padding: "4px 12px 4px 8px", fontSize: 12, fontWeight: 600, color: "#e55a47", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, background: "#ff6d5a", borderRadius: "50%", display: "inline-block" }} />
                AI-Powered · Results in 60 seconds
              </div>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(36px,5vw,58px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, marginBottom: 20 }}>
                Turn any inspection<br />report into a<br /><span style={{ color: "#ff6d5a", fontStyle: "italic" }}>negotiation weapon.</span>
              </h1>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.75, marginBottom: 32, maxWidth: 440 }}>
                Upload your inspection PDF. Our AI reads every finding, estimates repair costs, flags safety hazards, and delivers a clean report to your inbox — in under 60 seconds.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const, marginBottom: 28 }}>
                <button onClick={go} style={{ background: "#ff6d5a", color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,109,90,0.35)" }}>
                  Try 2 Free Reports →
                </button>
                <a href="#example" style={{ fontSize: 14, color: "#555", textDecoration: "none", fontWeight: 500 }}>See an example ↓</a>
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>✓ No credit card for free reports &nbsp;·&nbsp; ✓ $9/report after &nbsp;·&nbsp; ✓ Cancel anytime</div>
            </div>

            {/* MOCK REPORT CARD */}
            <div className="hero-card" style={{ position: "relative" }}>
              <div style={{ background: "white", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)", border: "1px solid #eee", overflow: "hidden" }}>
                {/* Card header */}
                <div style={{ background: "#ff6d5a", padding: "16px 20px", color: "white" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, opacity: 0.8, marginBottom: 4, fontFamily: "'DM Mono',monospace" }}>SmartListings Report Ready</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 700 }}>4821 Maple Creek Drive</div>
                  <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>Manassas, VA · Prepared for Sarah Chen</div>
                </div>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderBottom: "1px solid #eee" }}>
                  {[["Score", "68", "#d97706"], ["Urgent", "4", "#dc2626"], ["Est. Cost", "$12.4k", "#111"]].map(([label, val, color], i) => (
                    <div key={i} style={{ padding: "14px 12px", textAlign: "center" as const, borderRight: i < 2 ? "1px solid #eee" : "none" }}>
                      <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 4, fontFamily: "'DM Mono',monospace" }}>{label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color, fontFamily: "'Fraunces',serif" }}>{val}</div>
                    </div>
                  ))}
                </div>
                {/* Findings */}
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column" as const, gap: 6 }}>
                  {[
                    { dot: "#dc2626", title: "Main Panel Needs Replacement", meta: "Electrical · $2,800–$4,500", badge: "🔴 Urgent", badgeBg: "#FEE2E2", badgeColor: "#DC2626" },
                    { dot: "#dc2626", title: "HVAC Unit Failing — 2001", meta: "HVAC · $3,500–$6,000", badge: "🔴 Urgent", badgeBg: "#FEE2E2", badgeColor: "#DC2626" },
                    { dot: "#d97706", title: "Roof Flashing Separation", meta: "Roof · $400–$800", badge: "🟡 Monitor", badgeBg: "#FEF3C7", badgeColor: "#D97706" },
                    { dot: "#059669", title: "Foundation — No Issues Found", meta: "Foundation · No cost", badge: "✅ Good", badgeBg: "#DCFCE7", badgeColor: "#059669" },
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 7, border: "1px solid #f0f0f0", background: "#fafafa" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: f.dot, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{f.title}</div>
                        <div style={{ fontSize: 10, color: "#999" }}>{f.meta}</div>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: f.badgeBg, color: f.badgeColor, whiteSpace: "nowrap" as const }}>{f.badge}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: "#999", textAlign: "center" as const, paddingTop: 4 }}>+ 31 more findings</div>
                </div>
                {/* Tip */}
                <div style={{ margin: "0 16px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", marginBottom: 3, fontFamily: "'DM Mono',monospace" }}>💡 NEGOTIATION TIP</div>
                  <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.5 }}>Request $12,000 credit at closing for electrical panel + HVAC. Both are safety issues — seller is motivated to close.</div>
                </div>
              </div>
              {/* Badge */}
              <div style={{ position: "absolute", top: -10, right: -10, background: "#111", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 100, fontFamily: "'DM Mono',monospace" }}>Delivered in 47 sec</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: "#fafafa", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 32px" }} className="section-pad">
          <div className="reveal" style={{ marginBottom: 48, textAlign: "center" as const }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, color: "#ff6d5a", marginBottom: 12, fontFamily: "'DM Mono',monospace" }}>How It Works</div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, letterSpacing: -1.5, marginBottom: 12 }}>Three steps. 60 seconds.</h2>
            <p style={{ fontSize: 15, color: "#555", maxWidth: 460, margin: "0 auto" }}>No setup. No learning curve. Upload and you're done.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }} className="section-grid-3">
            {[
              { num: "01", icon: "📄", title: "Upload the PDF", desc: "Any inspector format — Spectora, HomeGauge, or any other. Just drag and drop." },
              { num: "02", icon: "🧠", title: "AI reads everything", desc: "Every finding analyzed. Urgency ranked. Repair costs estimated. Safety hazards flagged. Negotiation tips written." },
              { num: "03", icon: "📧", title: "Check your inbox", desc: "A clean, organized report arrives in under 60 seconds. Share it with your seller instantly." },
            ].map((step, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 56, fontWeight: 700, color: "#eee", lineHeight: 1, marginBottom: -4, letterSpacing: -3 }}>{step.num}</div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{step.icon}</div>
                <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET — EXAMPLE */}
      <section id="example" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 32px" }} className="section-pad">
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, color: "#ff6d5a", marginBottom: 12, fontFamily: "'DM Mono',monospace" }}>What You Get</div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, letterSpacing: -1.5, marginBottom: 12 }}>Every finding. Every cost.<br />Every negotiation tip.</h2>
            <p style={{ fontSize: 15, color: "#555", maxWidth: 500 }}>Here's exactly what lands in your inbox after every upload.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="section-grid-2">
            {/* Left — finding examples */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {[
                { severity: "urgent", color: "#dc2626", bg: "#FEE2E2", icon: "🔴", category: "Electrical", title: "Double-Tapped Circuit Breakers", location: "Main electrical panel, basement", desc: "Multiple circuits sharing a single breaker — a fire hazard and code violation. Requires licensed electrician to correct.", cost: "$800 – $1,500", tip: "Request as a condition of closing. Cite the fire hazard — sellers rarely push back on safety items." },
                { severity: "urgent", color: "#dc2626", bg: "#FEE2E2", icon: "🔴", category: "HVAC", title: "Air Handler Near End of Life", location: "Utility closet, 2nd floor", desc: "Unit is 21 years old. Average lifespan is 15-20 years. Inefficient and likely to fail within 1-2 years.", cost: "$3,500 – $6,000", tip: "Ask for $4,500 credit at closing. Frame it as a shared risk — they avoid a failed sale if it breaks before closing." },
                { severity: "monitor", color: "#d97706", bg: "#FEF3C7", icon: "🟡", category: "Plumbing", title: "Slow Drain — Master Bath", location: "Master bathroom, 2nd floor", desc: "Drain clears slowly. Likely minor buildup. Monitor and clear within 6 months.", cost: "$150 – $300", tip: "Bundle with other small items into a repair credit request. Not worth negotiating alone." },
                { severity: "good", color: "#059669", bg: "#DCFCE7", icon: "✅", category: "Foundation", title: "Foundation in Good Condition", location: "Full perimeter", desc: "No cracks, settling, or moisture intrusion observed. Foundation is sound.", cost: "No cost", tip: "Highlight this to your seller — a clean foundation is a strong selling point." },
              ].map((f, i) => (
                <div key={i} className="reveal" style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 10, padding: 16, transitionDelay: `${i * 0.05}s` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 14 }}>{f.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" as const }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{f.title}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 4, background: f.bg, color: f.color }}>{f.category}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#999", marginBottom: 6 }}>📍 {f.location}</div>
                      <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6, marginBottom: 8 }}>{f.desc}</div>
                      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" as const }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>💰 {f.cost}</span>
                        <div style={{ fontSize: 11, color: "#059669", background: "#f0fdf4", padding: "3px 8px", borderRadius: 5, border: "1px solid #bbf7d0", lineHeight: 1.5 }}>💡 {f.tip}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right — summary stats */}
            <div className="reveal" style={{ transitionDelay: "0.2s" }}>
              <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
                <div style={{ background: "#ff6d5a", padding: "20px 24px", color: "white" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, opacity: 0.8, marginBottom: 4, fontFamily: "'DM Mono',monospace" }}>Report Summary</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700 }}>4821 Maple Creek Drive</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>35 total findings analyzed</div>
                </div>
                <div style={{ padding: 20, display: "flex", flexDirection: "column" as const, gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 8, padding: 14, textAlign: "center" as const }}>
                      <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase" as const, letterSpacing: 1, fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>Score</div>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 800, color: "#d97706" }}>68</div>
                      <div style={{ fontSize: 10, color: "#999" }}>out of 100</div>
                    </div>
                    <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 8, padding: 14, textAlign: "center" as const }}>
                      <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase" as const, letterSpacing: 1, fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>Total Cost</div>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 800, color: "#111", lineHeight: 1.1 }}>$8k–$14k</div>
                      <div style={{ fontSize: 10, color: "#999" }}>estimated repairs</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["4 Urgent", "#dc2626", "#FEE2E2"], ["18 Monitor", "#d97706", "#FEF3C7"], ["13 Good", "#059669", "#DCFCE7"]].map(([l, c, bg]) => (
                      <div key={l} style={{ flex: 1, background: bg, borderRadius: 7, padding: "8px 6px", textAlign: "center" as const }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: c }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", marginBottom: 4, fontFamily: "'DM Mono',monospace" }}>AI SUMMARY</div>
                    <div style={{ fontSize: 12, color: "#166534", lineHeight: 1.6 }}>This property has significant deferred maintenance primarily in the electrical and HVAC systems. The foundation and structure are sound. Recommend requesting a $10,000–$12,000 credit at closing targeting the 4 urgent items.</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                    {["Urgency ranking (Urgent / Monitor / Good)", "Repair cost estimate for every finding", "Right contractor type for each repair", "Safety hazard flags", "DIY vs professional breakdown", "Negotiation tip per finding"].map((feat, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#444" }}>
                        <span style={{ color: "#ff6d5a", fontWeight: 700, fontSize: 14 }}>✓</span>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: "#fafafa", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px", textAlign: "center" as const }} className="section-pad">
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, color: "#ff6d5a", marginBottom: 12, fontFamily: "'DM Mono',monospace" }}>Pricing</div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, letterSpacing: -1.5, marginBottom: 12 }}>Simple. No surprises.</h2>
            <p style={{ fontSize: 15, color: "#555" }}>Start free. Pay only when you need more.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 600, margin: "0 auto 32px" }} className="section-grid-2">
            {/* Free */}
            <div className="reveal" style={{ background: "white", border: "1px solid #eee", borderRadius: 14, padding: 28, textAlign: "left" as const }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, color: "#999", fontFamily: "'DM Mono',monospace", marginBottom: 16 }}>Free</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 40, fontWeight: 800, color: "#111", lineHeight: 1, marginBottom: 4 }}>$0</div>
              <div style={{ fontSize: 13, color: "#999", marginBottom: 20 }}>No credit card required</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 24 }}>
                {["2 free reports", "Full AI analysis", "Email delivery", "All features included"].map((f, i) => (
                  <li key={i} style={{ fontSize: 13, color: "#444", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#ff6d5a", fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={go} style={{ width: "100%", padding: 12, background: "transparent", color: "#ff6d5a", border: "1.5px solid #ff6d5a", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Start Free →</button>
            </div>
            {/* Pay per report */}
            <div className="reveal" style={{ background: "#ff6d5a", border: "none", borderRadius: 14, padding: 28, textAlign: "left" as const, position: "relative" }} >
              <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#111", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase" as const, fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap" as const }}>Most Popular</div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Mono',monospace", marginBottom: 16 }}>Pay Per Report</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 40, fontWeight: 800, color: "white", lineHeight: 1, marginBottom: 4 }}>$9</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>per report · no subscription</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 24 }}>
                {["Pay only when you need it", "Full AI analysis every time", "Email delivery", "All features included"].map((f, i) => (
                  <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "white", fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = STRIPE_URL} style={{ width: "100%", padding: 12, background: "white", color: "#ff6d5a", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Get Started →</button>
            </div>
          </div>
          <p className="reveal" style={{ fontSize: 13, color: "#999" }}>Need unlimited reports for your whole office? <a href="mailto:hello@smartlistings.app" style={{ color: "#ff6d5a", textDecoration: "none", fontWeight: 600 }}>Contact us for team pricing →</a></p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#fff", borderTop: "1px solid #eee", padding: "80px 32px", textAlign: "center" as const }} className="section-pad">
        <div className="reveal" style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: -1.5, marginBottom: 14 }}>Ready to negotiate smarter?</h2>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 28 }}>Upload your first inspection report free. No credit card. Results in 60 seconds.</p>
          <button onClick={go} style={{ background: "#ff6d5a", color: "white", padding: "15px 36px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,109,90,0.3)" }}>Try 2 Free Reports →</button>
          <div style={{ marginTop: 14, fontSize: 12, color: "#aaa" }}>🔒 No credit card · First 2 reports free · $9/report after</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #eee", padding: "24px 32px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 12 }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 700 }}>SmartListings</span>
          <span style={{ fontSize: 12, color: "#aaa" }}>© 2026 SmartListings. Built for real estate professionals.</span>
          <a href="mailto:hello@smartlistings.app" style={{ fontSize: 12, color: "#aaa", textDecoration: "none" }}>hello@smartlistings.app</a>
        </div>
      </footer>
    </main>
  );
}
