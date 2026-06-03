"use client";
import React, { useEffect } from "react";

const N8N_FORM_URL = "https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4";

export default function Home() {
  const [showSuccess, setShowSuccess] = React.useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
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
    <main style={{ background: "var(--white)" }}>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", maxWidth: 460, width: "100%", textAlign: "center" as const, boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <div style={{ width: 60, height: 60, background: "var(--orange-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 20px" }}>✓</div>
            <h2 className="font-fraunces" style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>Report submitted!</h2>
            <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 8 }}>Your inspection is being analyzed by AI. You'll get a detailed email with every finding, repair costs, and negotiation tips in under 60 seconds.</p>
            <p style={{ fontSize: 12, color: "var(--gray-400)", marginBottom: 28 }}>Check your inbox — and spam folder just in case.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" as const }}>
              <button onClick={() => setShowSuccess(false)} style={{ padding: "12px 24px", background: "var(--gray-100)", color: "var(--text)", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Back to site</button>
              <button onClick={() => { setShowSuccess(false); go(); }} style={{ padding: "12px 24px", background: "var(--orange)", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Upload another →</button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, background: "var(--orange)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: "white" }}>C</div>
          <span className="font-fraunces" style={{ fontSize: 18, fontWeight: 600 }}>CasaFlux</span>
        </div>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[["How It Works","#how-it-works"],["Features","#features"],["Pricing","#pricing"]].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: 14, fontWeight: 500, color: "var(--gray-600)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <button onClick={go} style={{ background: "var(--orange)", color: "white", padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", whiteSpace: "nowrap" as const }}>Upload Report →</button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", paddingTop: 60, background: "var(--white)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--gray-100) 1px,transparent 1px),linear-gradient(90deg,var(--gray-100) 1px,transparent 1px)", backgroundSize: "48px 48px", opacity: 0.4, pointerEvents: "none" }} />
        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2, width: "100%" }}>
          <div>
            <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--orange-light)", border: "1px solid #ffd5d0", borderRadius: 100, padding: "5px 12px 5px 8px", fontSize: 12, fontWeight: 600, color: "var(--orange-dark)", marginBottom: 24 }}>
              <span style={{ width: 16, height: 16, background: "var(--orange)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "white" }}>✦</span>
              AI Inspection Intelligence
            </div>
            <h1 className="animate-fade-up-1 font-fraunces" style={{ fontSize: "clamp(38px,5vw,62px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, marginBottom: 20 }}>
              Every finding.<br />Every cost.<br /><em style={{ color: "var(--orange)", fontStyle: "italic" }}>Instantly clear.</em>
            </h1>
            <p className="animate-fade-up-2" style={{ fontSize: 16, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
              Upload any home inspection PDF. CasaFlux reads every finding, estimates repair costs, flags safety hazards, and delivers a clean report to your inbox in under 60 seconds.
            </p>
            <div className="animate-fade-up-3" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 36, flexWrap: "wrap" as const }}>
              <button onClick={go} style={{ background: "var(--orange)", color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,109,90,0.3)" }}>Upload Your Report →</button>
              <a href="#how-it-works" style={{ color: "var(--gray-600)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>See how it works ↓</a>
            </div>
            <div className="animate-fade-up-4" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex" }}>
                {["JR","ML","SK","DP"].map((init,i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid white", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white", marginLeft: i===0?0:-8, position: "relative", zIndex: 4-i }}>{init}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Trusted by Virginia realtors</div>
                <div style={{ fontSize: 12, color: "var(--gray-400)" }}>5 free reports — no credit card</div>
              </div>
            </div>
          </div>

          {/* Card - hidden on mobile via CSS */}
          <div className="hero-card animate-float" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -12, right: -12, zIndex: 10, background: "var(--orange)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Mono',monospace" }}>✦ AI Analyzed</div>
            <div style={{ background: "white", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ background: "var(--orange)", padding: "18px 20px", color: "white" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 2, opacity: 0.8, marginBottom: 4, fontFamily: "'DM Mono',monospace" }}>CasaFlux — Report Ready</div>
                <div className="font-fraunces" style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>142 Maple Ridge Drive</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>Sarah Chen · May 28, 2026</div>
              </div>
              <div style={{ padding: "14px 18px", display: "flex", gap: 10 }}>
                <div style={{ flex: 1, background: "var(--gray-50)", borderRadius: 8, padding: 12, textAlign: "center" as const, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 1, color: "var(--gray-400)", fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>Score</div>
                  <div className="font-fraunces" style={{ fontSize: 28, fontWeight: 700, color: "#d97706" }}>74</div>
                  <div style={{ fontSize: 10, color: "var(--gray-400)" }}>/ 100</div>
                </div>
                <div style={{ flex: 2, background: "var(--gray-50)", borderRadius: 8, padding: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 1, color: "var(--gray-400)", fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>Repair Cost</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>$4,200 – $8,800</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                    {[["3 Urgent","#FEE2E2","#DC2626"],["7 Monitor","#FEF3C7","#D97706"],["11 Good","#DCFCE7","#16A34A"]].map(([l,bg,c]) => (
                      <span key={l} style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 3, background: bg, color: c }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: "0 18px 16px", display: "flex", flexDirection: "column" as const, gap: 6 }}>
                {[
                  { title: "Double-Tapped Breakers", meta: "Electrical", cost: "$800–$1,500", color: "#DC2626" },
                  { title: "HVAC Near End of Life", meta: "HVAC", cost: "$3,500–$6,000", color: "#DC2626" },
                  { title: "Roof Flashing Separation", meta: "Roof", cost: "$400–$800", color: "#EA580C" },
                ].map((f,i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--gray-50)" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>{f.title}</div>
                      <div style={{ fontSize: 10, color: "var(--gray-400)" }}>{f.meta}</div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" as const }}>{f.cost}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: -14, left: -28, background: "white", borderRadius: 10, padding: "10px 14px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, background: "var(--orange-light)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📧</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>Report delivered</div>
                <div style={{ fontSize: 10, color: "var(--gray-400)" }}>sarah@realty.com · 47 sec</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: "var(--gray-50)", borderTop: "1px solid var(--border)" }}>
        <div className="section-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--orange)", marginBottom: 12 }}>The Process</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 12 }}>From PDF to clear insights<br />in under a minute.</h2>
            <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.7, maxWidth: 460 }}>No manual entry. No decoding inspector shorthand. Just upload and get back to closing.</p>
          </div>
          <div className="section-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 36 }}>
            {[
              { num: "01", icon: "📄", title: "Upload the PDF", desc: "Drop in any inspection report — Spectora, HomeGauge, or any inspector format." },
              { num: "02", icon: "🧠", title: "AI reads everything", desc: "Every finding extracted, urgency assigned, repair costs estimated, safety hazards flagged." },
              { num: "03", icon: "✉️", title: "Report hits your inbox", desc: "Clean, sorted report with cost ranges, contractor types, and negotiation tips." },
            ].map((step,i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i*0.1}s` }}>
                <div className="font-fraunces" style={{ fontSize: 64, fontWeight: 700, color: "var(--gray-200)", lineHeight: 1, marginBottom: -4, letterSpacing: -3 }}>{step.num}</div>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{step.icon}</div>
                <h3 className="font-fraunces" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: "var(--white)", borderTop: "1px solid var(--border)" }}>
        <div className="section-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--orange)", marginBottom: 12 }}>What You Get</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 12 }}>Built for realtors,<br />not inspectors.</h2>
            <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.7, maxWidth: 460 }}>Every feature answers one question: what does a listing agent need to know right now?</p>
          </div>
          <div className="section-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { icon: "🔴", title: "Urgency Classification", desc: "Every finding classified as Urgent, Monitor, or Good." },
              { icon: "💰", title: "Repair Cost Estimates", desc: "Cost ranges for every finding before you negotiate." },
              { icon: "🤝", title: "Negotiation Tips", desc: "AI-generated guidance for every finding." },
              { icon: "⚠️", title: "Safety Hazard Flags", desc: "Safety issues surfaced to the top automatically." },
              { icon: "🔧", title: "Contractor Matching", desc: "Each finding tagged with the right contractor type." },
              { icon: "📊", title: "Property Score", desc: "A 0–100 health score for instant condition overview." },
            ].map((f,i) => (
              <div key={i} className="reveal" style={{ background: "var(--gray-50)", borderRadius: 10, padding: 22, border: "1px solid var(--border)", transitionDelay: `${(i%3)*0.1}s` }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{f.icon}</div>
                <h3 className="font-fraunces" style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: "var(--gray-50)", borderTop: "1px solid var(--border)" }}>
        <div className="section-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--orange)", marginBottom: 12 }}>Pricing</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 12 }}>Simple pricing.<br />Start for free.</h2>
            <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.7, maxWidth: 380 }}>No contracts. Your first 5 reports are on us.</p>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { name: "Starter", price: "$0", period: "Free forever", desc: "Try the full platform.", features: ["5 inspection reports","Full AI analysis","Email delivery","Cost estimates","Negotiation tips"], cta: "Start Free →", featured: false },
              { name: "Agent Pro", price: "$99", period: "/ month", desc: "Unlimited for individual agents.", features: ["Unlimited reports","Full AI analysis","Email delivery","Report history","Priority processing"], cta: "Get Started →", featured: true },
              { name: "Brokerage", price: "$499", period: "/ month", desc: "Up to 25 agents.", features: ["Up to 25 agents","Broker analytics","Custom branding","Team workspace","Dedicated support"], cta: "Contact Sales →", featured: false },
            ].map((plan,i) => (
              <div key={i} className="reveal" style={{ borderRadius: 14, padding: 28, background: plan.featured?"var(--orange)":"white", border: plan.featured?"none":"1px solid var(--border)", position: "relative", transitionDelay: `${i*0.1}s` }}>
                {plan.featured && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "var(--text)", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase" as const, fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap" as const }}>Most Popular</div>}
                <div className="font-mono" style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 2, color: plan.featured?"rgba(255,255,255,0.7)":"var(--orange)", marginBottom: 14 }}>{plan.name}</div>
                <div className="font-fraunces" style={{ fontSize: 44, fontWeight: 700, color: plan.featured?"white":"var(--text)", lineHeight: 1, letterSpacing: -2, marginBottom: 4 }}>{plan.price}</div>
                <div style={{ fontSize: 13, color: plan.featured?"rgba(255,255,255,0.7)":"var(--gray-400)", marginBottom: 14 }}>{plan.period}</div>
                <div style={{ fontSize: 13, color: plan.featured?"rgba(255,255,255,0.8)":"var(--gray-600)", lineHeight: 1.6, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${plan.featured?"rgba(255,255,255,0.2)":"var(--border)"}` }}>{plan.desc}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 24 }}>
                  {plan.features.map((feat,j) => (
                    <li key={j} style={{ fontSize: 13, color: plan.featured?"rgba(255,255,255,0.9)":"var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 15, height: 15, background: plan.featured?"rgba(255,255,255,0.25)":"var(--orange-light)", color: plan.featured?"white":"var(--orange)", borderRadius: "50%", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button onClick={go} style={{ width: "100%", padding: "12px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", background: plan.featured?"white":"transparent", color: plan.featured?"var(--orange)":"var(--orange)", border: plan.featured?"none":"1.5px solid var(--orange)", fontFamily: "'Inter',sans-serif" }}>{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section" style={{ margin: "0 40px 80px" }}>
        <div style={{ background: "var(--orange)", borderRadius: 20, padding: "64px 40px", textAlign: "center" as const }}>
          <div className="reveal">
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2px", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Get Started Today</div>
            <h2 className="font-fraunces" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "white", lineHeight: 1.05, letterSpacing: -1.5, marginBottom: 14 }}>Upload your first report.<br />See it in 60 seconds.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>Join realtors in Virginia already using CasaFlux. First 5 reports free.</p>
            <button onClick={go} style={{ background: "white", color: "var(--orange)", padding: "14px 36px", borderRadius: 10, fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>Upload a Report Now →</button>
            <div style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>🔒 No credit card · 5 free reports · Results in 60 seconds</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 40px" }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="font-fraunces" style={{ fontSize: 16, fontWeight: 600 }}>CasaFlux</span>
          <span style={{ fontSize: 12, color: "var(--gray-400)" }}>© 2026 CasaFlux. Built for real estate professionals.</span>
          <div className="footer-links" style={{ display: "flex", gap: 20 }}>
            {[["How It Works","#how-it-works"],["Features","#features"],["Pricing","#pricing"],["Contact","mailto:hello@casaflux.com"]].map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize: 12, color: "var(--gray-400)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
