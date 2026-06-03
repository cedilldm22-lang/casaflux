"use client";
import React, { useEffect } from "react";

const N8N_FORM_URL = "https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [showSuccess, setShowSuccess] = React.useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('submitted=true')) {
      setShowSuccess(true);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const go = () => {
    window.location.href = N8N_FORM_URL;
  };

  const s = (base: React.CSSProperties): React.CSSProperties => base;

  return (
    <main style={{ background: "var(--white)" }}>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: 20, padding: 48, maxWidth: 480, width: "90%", textAlign: "center" as const, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ width: 64, height: 64, background: "#fff5f4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px" }}>✓</div>
            <h2 className="font-fraunces" style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Report submitted!</h2>
            <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 12 }}>Your inspection report is being analyzed by AI. You'll receive a detailed email with every finding, cost estimate, and negotiation tip within 60 seconds.</p>
            <p style={{ fontSize: 13, color: "var(--gray-400)", marginBottom: 28 }}>Check your inbox — including spam folder.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setShowSuccess(false)} style={{ padding: "12px 28px", background: "var(--orange)", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Got it</button>
              <button onClick={() => { setShowSuccess(false); go(); }} style={{ padding: "12px 28px", background: "transparent", color: "var(--orange)", border: "1.5px solid var(--orange)", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Upload another →</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "var(--orange)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 700, color: "white" }}>C</div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: "var(--text)" }}>CasaFlux</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[["How It Works","#how-it-works"],["Features","#features"],["Pricing","#pricing"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 14, fontWeight: 500, color: "var(--gray-600)", textDecoration: "none" }}>{label}</a>
          ))}
          <button onClick={go} style={{ background: "var(--orange)", color: "white", padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>Upload Report →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", paddingTop: 64, background: "var(--white)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--gray-100) 1px, transparent 1px), linear-gradient(90deg, var(--gray-100) 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.5, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2, width: "100%" }}>
          <div>
            <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--orange-light)", border: "1px solid var(--orange-mid)", borderRadius: 100, padding: "5px 12px 5px 8px", fontSize: 12, fontWeight: 600, color: "var(--orange-dark)", marginBottom: 28 }}>
              <span style={{ width: 18, height: 18, background: "var(--orange)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white" }}>✦</span>
              AI Inspection Intelligence
            </div>
            <h1 className="animate-fade-up-1 font-fraunces" style={{ fontSize: "clamp(42px, 5vw, 66px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "var(--text)", marginBottom: 24 }}>
              Every finding.<br />Every cost.<br /><em style={{ color: "var(--orange)", fontStyle: "italic" }}>Instantly clear.</em>
            </h1>
            <p className="animate-fade-up-2" style={{ fontSize: 17, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
              Upload any home inspection PDF. CasaFlux reads every finding, estimates repair costs, flags safety hazards, and delivers a clean report to your inbox in under 60 seconds.
            </p>
            <div className="animate-fade-up-3" style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 40 }}>
              <button onClick={go} style={{ background: "var(--orange)", color: "white", padding: "15px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,109,90,0.3)" }}>Upload Your Report →</button>
              <a href="#how-it-works" style={{ color: "var(--gray-600)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>See how it works ↓</a>
            </div>
            <div className="animate-fade-up-4" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex" }}>
                {["JR","ML","SK","DP"].map((init, i) => (
                  <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid white", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white", marginLeft: i === 0 ? 0 : -8, zIndex: 4 - i, position: "relative" }}>{init}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Trusted by Virginia realtors</div>
                <div style={{ fontSize: 12, color: "var(--gray-400)" }}>5 free reports — no credit card</div>
              </div>
            </div>
          </div>

          {/* Report Card */}
          <div className="animate-float" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -12, right: -12, zIndex: 10, background: "var(--orange)", color: "white", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 100, boxShadow: "0 4px 16px rgba(255,109,90,0.4)", fontFamily: "'DM Mono', monospace" }}>✦ AI Analyzed</div>
            <div style={{ background: "white", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)", border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ background: "var(--orange)", padding: "20px 22px", color: "white" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 2, opacity: 0.8, marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>CasaFlux — Report Ready</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, marginBottom: 3 }}>142 Maple Ridge Drive</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>Prepared for Sarah Chen · May 28, 2026</div>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", gap: 10 }}>
                <div style={{ flex: 1, background: "var(--gray-50)", borderRadius: 8, padding: 12, textAlign: "center" as const, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 1, color: "var(--gray-400)", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>Score</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 700, color: "#d97706" }}>74</div>
                  <div style={{ fontSize: 10, color: "var(--gray-400)" }}>out of 100</div>
                </div>
                <div style={{ flex: 2, background: "var(--gray-50)", borderRadius: 8, padding: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 1, color: "var(--gray-400)", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>Repair Cost</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>$4,200 – $8,800</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                    {[["3 Urgent","#FEE2E2","#DC2626"],["7 Monitor","#FEF3C7","#D97706"],["11 Good","#DCFCE7","#16A34A"]].map(([l,bg,c]) => (
                      <span key={l} style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: bg, color: c }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column" as const, gap: 6 }}>
                {[
                  { title: "Double-Tapped Breakers", meta: "Electrical · Electrician", cost: "$800–$1,500", color: "#DC2626" },
                  { title: "HVAC Near End of Life", meta: "HVAC · HVAC Technician", cost: "$3,500–$6,000", color: "#DC2626" },
                  { title: "Roof Flashing Separation", meta: "Roof · Roofer", cost: "$400–$800", color: "#EA580C" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 10px", borderRadius: 7, border: "1px solid var(--border)", background: "var(--gray-50)" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: f.color, marginTop: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{f.title}</div>
                      <div style={{ fontSize: 10, color: "var(--gray-400)" }}>{f.meta}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" as const }}>{f.cost}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: -16, left: -32, background: "white", borderRadius: 12, padding: "10px 14px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, minWidth: 200 }}>
              <div style={{ width: 32, height: 32, background: "var(--orange-light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📧</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>Report delivered</div>
                <div style={{ fontSize: 11, color: "var(--gray-400)" }}>sarah@realty.com · 47 sec</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 40px", background: "var(--gray-50)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--orange)", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>The Process</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 14 }}>From PDF to clear insights<br />in under a minute.</h2>
            <p style={{ fontSize: 16, color: "var(--gray-600)", lineHeight: 1.7, maxWidth: 480 }}>No manual entry. No decoding inspector shorthand. Just upload and get back to closing.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { num: "01", icon: "📄", title: "Upload the PDF", desc: "Drop in any inspection report — Spectora, HomeGauge, or any inspector's format. Enter the property address and your email." },
              { num: "02", icon: "🧠", title: "AI reads everything", desc: "CasaFlux processes every page, extracts every finding, assigns urgency levels, estimates repair costs, and flags safety hazards." },
              { num: "03", icon: "✉️", title: "Report hits your inbox", desc: "A clean report arrives sorted by urgency, with cost ranges, contractor types, and negotiation tips for every finding." },
            ].map((step, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="font-fraunces" style={{ fontSize: 72, fontWeight: 700, color: "var(--gray-200)", lineHeight: 1, marginBottom: -8, letterSpacing: -3 }}>{step.num}</div>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{step.icon}</div>
                <h3 className="font-fraunces" style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 40px", background: "var(--white)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--orange)", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>What You Get</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 14 }}>Built for realtors,<br />not for inspectors.</h2>
            <p style={{ fontSize: 16, color: "var(--gray-600)", lineHeight: 1.7, maxWidth: 480 }}>Every feature is designed around one question: what does a listing agent need to know right now?</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "🔴", title: "Urgency Classification", desc: "Every finding classified as Urgent, Monitor, or Good — so you instantly know what needs attention before closing." },
              { icon: "💰", title: "Repair Cost Estimates", desc: "Low, mid, and high cost ranges for every finding. Know the total repair bill before you negotiate." },
              { icon: "🤝", title: "Negotiation Tips", desc: "AI-generated practical guidance for every finding. Walk into negotiations knowing exactly what to ask for." },
              { icon: "⚠️", title: "Safety Hazard Flags", desc: "Safety issues automatically flagged and surfaced to the top. Protect your clients and your liability." },
              { icon: "🔧", title: "Contractor Matching", desc: "Each finding tagged with the right contractor so your clients know exactly who to call." },
              { icon: "📊", title: "Property Score", desc: "A single 0–100 property health score gives you a clear picture of overall condition at a glance." },
            ].map((f, i) => (
              <div key={i} className="reveal" style={{ background: "var(--gray-50)", borderRadius: 12, padding: 24, border: "1px solid var(--border)", transitionDelay: `${(i % 3) * 0.1}s` }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 className="font-fraunces" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 40px", background: "var(--gray-50)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--orange)", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>Pricing</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 14 }}>Simple pricing.<br />Start for free.</h2>
            <p style={{ fontSize: 16, color: "var(--gray-600)", lineHeight: 1.7, maxWidth: 420 }}>No contracts. No setup fees. Your first 5 reports are on us.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { name: "Starter", price: "$0", period: "Free forever", desc: "5 reports to try the full platform.", features: ["5 inspection reports","Full AI analysis","Email delivery","Cost estimates","Negotiation tips"], cta: "Start Free →", featured: false },
              { name: "Agent Pro", price: "$99", period: "/ month", desc: "Unlimited reports for individual agents.", features: ["Unlimited reports","Full AI analysis","Email delivery","Report history","Priority processing"], cta: "Get Started →", featured: true },
              { name: "Brokerage", price: "$499", period: "/ month", desc: "Up to 25 agents, broker analytics.", features: ["Up to 25 agents","Broker analytics","Custom branding","Team workspace","Dedicated support"], cta: "Contact Sales →", featured: false },
            ].map((plan, i) => (
              <div key={i} className="reveal" style={{ borderRadius: 16, padding: 32, background: plan.featured ? "var(--orange)" : "white", border: plan.featured ? "none" : "1px solid var(--border)", position: "relative", transitionDelay: `${i * 0.1}s` }}>
                {plan.featured && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "var(--text)", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 14px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase" as const, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" as const }}>Most Popular</div>}
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 2, color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--orange)", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>{plan.name}</div>
                <div className="font-fraunces" style={{ fontSize: 48, fontWeight: 700, color: plan.featured ? "white" : "var(--text)", lineHeight: 1, letterSpacing: -2, marginBottom: 4 }}>{plan.price}</div>
                <div style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--gray-400)", marginBottom: 16 }}>{plan.period}</div>
                <div style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.8)" : "var(--gray-600)", lineHeight: 1.6, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.2)" : "var(--border)"}` }}>{plan.desc}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 28 }}>
                  {plan.features.map((feat, j) => (
                    <li key={j} style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.9)" : "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 16, height: 16, background: plan.featured ? "rgba(255,255,255,0.25)" : "var(--orange-light)", color: plan.featured ? "white" : "var(--orange)", borderRadius: "50%", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button onClick={go} style={{ width: "100%", padding: "13px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", background: plan.featured ? "white" : "transparent", color: plan.featured ? "var(--orange)" : "var(--orange)", border: plan.featured ? "none" : "1.5px solid var(--orange)", fontFamily: "'Inter', sans-serif" }}>{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 40px", background: "var(--white)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" as const }}>
          <div className="reveal">
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--orange)", fontFamily: "'DM Mono', monospace", marginBottom: 20 }}>Get Started Today</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 700, color: "var(--text)", lineHeight: 1.05, letterSpacing: -1.5, marginBottom: 18 }}>Upload your first report.<br />See it in 60 seconds.</h2>
            <p style={{ fontSize: 16, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 36 }}>Join realtors in Virginia already using CasaFlux. Your first 5 reports are completely free.</p>
            <button onClick={go} style={{ background: "var(--orange)", color: "white", padding: "16px 44px", borderRadius: 12, fontSize: 16, fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,109,90,0.3)" }}>Upload a Report Now →</button>
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--gray-400)" }}>🔒 No credit card required · 5 free reports · Results in 60 seconds</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <span className="font-fraunces" style={{ fontSize: 17, fontWeight: 600, color: "var(--text)" }}>CasaFlux</span>
        <span style={{ fontSize: 13, color: "var(--gray-400)" }}>© 2026 CasaFlux. Built for real estate professionals.</span>
        <div style={{ display: "flex", gap: 24 }}>
          {[["How It Works","#how-it-works"],["Features","#features"],["Pricing","#pricing"],["Contact","mailto:hello@casaflux.com"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 13, color: "var(--gray-400)", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
