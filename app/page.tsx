"use client";
import { useEffect, useState, useRef } from "react";

const N8N_FORM_URL = "https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (formState === "submitting") {
      const interval = setInterval(() => setProgress(p => Math.min(p + 2, 88)), 400);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [formState]);

  const handleFileChange = (file: File | null) => {
    if (file && file.type === "application/pdf") setFileName(file.name);
    else if (file) alert("Please upload a PDF file.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const file = formData.get("Inspection_Report") as File;
    if (!file || file.size === 0) { alert("Please attach your inspection PDF."); return; }

    setFormState("submitting");

    // Submit via hidden iframe so we stay on casaflux.com
    // The form posts to N8N directly — no CORS issue with form submissions
    const iframe = document.createElement("iframe");
    iframe.name = "cf_submit_frame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const hiddenForm = document.createElement("form");
    hiddenForm.method = "POST";
    hiddenForm.action = N8N_FORM_URL;
    hiddenForm.enctype = "multipart/form-data";
    hiddenForm.target = "cf_submit_frame";

    // Copy all form data into hidden form
    const fields = [
      ["Property Address", formData.get("Property Address") as string],
      ["Agent / Client Name", formData.get("Agent / Client Name") as string],
      ["Agent / Client Email", formData.get("Agent / Client Email") as string],
      ["Report Source (e.g. Spectora, HomeGauge, other)", formData.get("Report Source (e.g. Spectora, HomeGauge, other)") as string],
    ];

    fields.forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value || "";
      hiddenForm.appendChild(input);
    });

    // File input must be the real one
    const fileInput = formRef.current.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.name = "Inspection_Report";
      hiddenForm.appendChild(fileInput.cloneNode(true));
      // Re-attach original to keep files
      hiddenForm.appendChild(fileInput);
    }

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();

    // Show success after 3 seconds — N8N processes async
    setTimeout(() => {
      setFormState("success");
      document.body.removeChild(iframe);
      document.body.removeChild(hiddenForm);
    }, 3000);
  };

  const s = (base: React.CSSProperties): React.CSSProperties => base;

  return (
    <main style={{ background: "var(--white)" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, var(--blue), var(--blue-deeper))", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "white" }}>CF</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "var(--text)" }}>Casa<span style={{ color: "var(--blue)" }}>Flux</span></span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {[["How It Works","#how-it-works"],["Features","#features"],["Pricing","#pricing"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)", textDecoration: "none" }}>{label}</a>
          ))}
          <a href="#upload" style={{ background: "var(--blue)", color: "white", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px rgba(74,143,184,0.3)" }}>Upload Report →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", paddingTop: 72, background: "linear-gradient(155deg, #ffffff 0%, var(--sky) 50%, var(--sky-mid) 100%)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,143,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(74,143,184,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -200, right: -200, width: 700, height: 700, background: "radial-gradient(circle, rgba(74,143,184,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2, width: "100%" }}>
          <div>
            <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,143,184,0.1)", border: "1px solid rgba(74,143,184,0.25)", borderRadius: 100, padding: "6px 14px 6px 8px", fontSize: 11, fontWeight: 600, color: "var(--blue-dark)", letterSpacing: "0.5px", textTransform: "uppercase" as const, marginBottom: 28 }}>
              <span style={{ width: 20, height: 20, background: "var(--blue)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white" }}>✦</span>
              AI-Powered Inspection Intelligence
            </div>
            <h1 className="animate-fade-up-1 font-playfair" style={{ fontSize: "clamp(40px, 5vw, 62px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color: "var(--text)", marginBottom: 24 }}>
              Every finding.<br />Every cost.<br /><em style={{ color: "var(--blue)", fontStyle: "italic" }}>Instantly clear.</em>
            </h1>
            <p className="animate-fade-up-2" style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Upload any home inspection PDF. CasaFlux reads every finding, estimates repair costs, flags safety hazards, and delivers a clean report to your inbox in under 60 seconds.
            </p>
            <div className="animate-fade-up-3" style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 48 }}>
              <a href="#upload" style={{ background: "var(--blue)", color: "white", padding: "16px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 30px rgba(74,143,184,0.35)" }}>Upload Your Report →</a>
              <a href="#how-it-works" style={{ color: "var(--text-muted)", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>See how it works ↓</a>
            </div>
            <div className="animate-fade-up-4" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex" }}>
                {["JR","ML","SK","DP"].map((init, i) => (
                  <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid white", background: "linear-gradient(135deg, var(--blue), var(--blue-deeper))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", marginLeft: i === 0 ? 0 : -8, position: "relative", zIndex: 4 - i }}>{init}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Trusted by Virginia realtors</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>5 free reports — no credit card required</div>
              </div>
            </div>
          </div>

          {/* Report Card */}
          <div className="animate-float" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 10, background: "var(--gold)", color: "white", fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 100, letterSpacing: 0.5, boxShadow: "0 4px 20px rgba(212,168,83,0.4)", fontFamily: "'DM Mono', monospace" }}>✦ AI Analyzed</div>
            <div style={{ background: "white", borderRadius: 20, boxShadow: "0 20px 80px rgba(74,143,184,0.15), 0 4px 20px rgba(74,143,184,0.08)", border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(135deg, var(--blue-deeper), var(--blue-dark))", padding: "22px 24px", color: "white" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 2, opacity: 0.7, marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>CasaFlux Inspect — Report Ready</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>142 Maple Ridge Drive</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>Prepared for Sarah Chen · May 28, 2026</div>
              </div>
              <div style={{ padding: "18px 24px", display: "flex", gap: 12 }}>
                <div style={{ flex: 1, background: "var(--sky)", borderRadius: 10, padding: 14, textAlign: "center" as const, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 1, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>Score</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "#d97706" }}>74</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>out of 100</div>
                </div>
                <div style={{ flex: 2, background: "var(--sky)", borderRadius: 10, padding: 14, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: 1, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>Est. Repair Cost</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>$4,200 – $8,800</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                    {[["3 Urgent","#FEE2E2","#DC2626"],["7 Monitor","#FEF3C7","#D97706"],["11 Good","#DCFCE7","#16A34A"]].map(([l,bg,c]) => (
                      <span key={l} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: bg, color: c }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
                {[
                  { title: "Double-Tapped Breakers", meta: "Electrical · Electrician", cost: "$800–$1,500", color: "#DC2626", safety: true },
                  { title: "HVAC Near End of Life", meta: "HVAC · HVAC Technician", cost: "$3,500–$6,000", color: "#DC2626", safety: false },
                  { title: "Roof Flashing Separation", meta: "Roof · Roofer", cost: "$400–$800", color: "#EA580C", safety: false },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--sky)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, marginTop: 5, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                        {f.title}
                        {f.safety && <span style={{ background: "#dc2626", color: "white", fontSize: 9, padding: "1px 5px", borderRadius: 3, marginLeft: 6 }}>⚠️ SAFETY</span>}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{f.meta}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" as const }}>{f.cost}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: -20, left: -40, background: "white", borderRadius: 14, padding: "12px 16px", boxShadow: "0 12px 40px rgba(74,143,184,0.18)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, minWidth: 220 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #DCFCE7, #A7F3D0)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📧</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>Report delivered</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Sent to sarah@realty.com · 47 sec</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD SECTION */}
      <section id="upload" style={{ background: "linear-gradient(180deg, var(--sky) 0%, white 100%)", padding: "100px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center" as const, marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2.5px", color: "var(--blue)", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>Free to Start</div>
            <h2 className="font-playfair" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 }}>Upload your inspection report</h2>
            <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7 }}>Your first 5 reports are completely free. No credit card required.</p>
          </div>

          <div className="reveal" style={{ background: "white", borderRadius: 24, boxShadow: "0 20px 80px rgba(74,143,184,0.12)", border: "1px solid var(--border)", overflow: "hidden" }}>

            {/* IDLE / FORM */}
            {formState === "idle" && (
              <form ref={formRef} onSubmit={handleSubmit} style={{ padding: 40 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <label className="upload-label">Property Address *</label>
                    <input name="Property Address" required placeholder="123 Main St, City, VA" className="upload-input" />
                  </div>
                  <div>
                    <label className="upload-label">Your Name *</label>
                    <input name="Agent / Client Name" required placeholder="Sarah Chen" className="upload-input" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <label className="upload-label">Email Address *</label>
                    <input name="Agent / Client Email" type="email" required placeholder="you@realty.com" className="upload-input" />
                  </div>
                  <div>
                    <label className="upload-label">Report Source</label>
                    <input name="Report Source (e.g. Spectora, HomeGauge, other)" placeholder="Spectora, HomeGauge, other..." className="upload-input" />
                  </div>
                </div>

                {/* Drop Zone */}
                <div style={{ marginBottom: 28 }}>
                  <label className="upload-label">Inspection Report PDF *</label>
                  <div
                    className={`upload-drop-zone${dragging ? " dragging" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f && fileInputRef.current) { const dt = new DataTransfer(); dt.items.add(f); fileInputRef.current.files = dt.files; handleFileChange(f); } }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
                    {fileName ? (
                      <>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--blue)", marginBottom: 4 }}>✓ {fileName}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Click to change file</div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Drop your PDF here or click to browse</div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Supports Spectora, HomeGauge, and all inspector formats</div>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" name="Inspection_Report" accept=".pdf" style={{ display: "none" }} onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
                  </div>
                </div>

                <button type="submit" style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, var(--blue), var(--blue-dark))", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 30px rgba(74,143,184,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
                  Analyze My Report →
                </button>
                <div style={{ textAlign: "center" as const, marginTop: 16, fontSize: 12, color: "var(--text-muted)" }}>
                  🔒 Your report is processed securely and never shared
                </div>
              </form>
            )}

            {/* SUBMITTING */}
            {formState === "submitting" && (
              <div style={{ padding: 60, textAlign: "center" as const }}>
                <div className="spinner" />
                <h3 className="font-playfair" style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Analyzing your report...</h3>
                <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28 }}>Our AI is reading every finding, estimating costs, and building your report.</p>
                <div style={{ background: "var(--sky)", borderRadius: 100, height: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg, var(--blue), var(--sky-deep))", width: `${progress}%`, transition: "width 0.4s ease", borderRadius: 100 }} />
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>This takes about 30–60 seconds</div>
              </div>
            )}

            {/* SUCCESS */}
            {formState === "success" && (
              <div style={{ padding: 60, textAlign: "center" as const }}>
                <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, #DCFCE7, #A7F3D0)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>✓</div>
                <h3 className="font-playfair" style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Report on its way!</h3>
                <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>
                  Your inspection report is being analyzed. You'll receive a detailed email with every finding, cost estimate, and negotiation tip within 60 seconds.
                </p>
                <button onClick={() => { setFormState("idle"); setFileName(""); }} style={{ padding: "12px 28px", background: "var(--sky)", color: "var(--blue-dark)", border: "1.5px solid var(--border)", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  Upload Another Report
                </button>
              </div>
            )}

            {/* ERROR */}
            {formState === "error" && (
              <div style={{ padding: 60, textAlign: "center" as const }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                <h3 className="font-playfair" style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Something went wrong</h3>
                <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28 }}>Please try again or contact us at hello@casaflux.com</p>
                <button onClick={() => setFormState("idle")} style={{ padding: "12px 28px", background: "var(--blue)", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Try Again</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal">
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2.5px", color: "var(--blue)", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>The Process</div>
          <h2 className="font-playfair" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 }}>From PDF to clear insights<br />in under a minute.</h2>
          <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 520, marginBottom: 60 }}>No manual entry. No decoding inspector shorthand. Just upload and get back to closing.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
          {[
            { num: "01", icon: "📄", title: "Upload the PDF", desc: "Drop in any inspection report — Spectora, HomeGauge, or any inspector's format. Enter the property address and your email." },
            { num: "02", icon: "🧠", title: "AI reads everything", desc: "CasaFlux processes every page, extracts every finding, assigns urgency levels, estimates repair costs, and flags safety hazards." },
            { num: "03", icon: "✉️", title: "Report hits your inbox", desc: "A clean report arrives in your inbox — sorted by urgency, with cost ranges, contractor types, and negotiation tips for every finding." },
          ].map((step, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="font-playfair" style={{ fontSize: 80, fontWeight: 800, color: "var(--sky-mid)", lineHeight: 1, marginBottom: -10, letterSpacing: -4 }}>{step.num}</div>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{step.icon}</div>
              <h3 className="font-playfair" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: "linear-gradient(180deg, var(--sky) 0%, white 100%)", padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div className="reveal">
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2.5px", color: "var(--blue)", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>What You Get</div>
            <h2 className="font-playfair" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 }}>Built for realtors,<br />not for inspectors.</h2>
            <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 520, marginBottom: 60 }}>Every feature is designed around one question: what does a listing agent need to know right now?</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: "🔴", title: "Urgency Classification", desc: "Every finding is classified as Urgent, Monitor, or Good — so you instantly know what needs attention before closing." },
              { icon: "💰", title: "Repair Cost Estimates", desc: "Low, mid, and high cost ranges for every finding. Know the total repair bill before you negotiate." },
              { icon: "🤝", title: "Negotiation Tips", desc: "AI-generated practical negotiation guidance for every finding. Walk into negotiations knowing exactly what to ask for." },
              { icon: "⚠️", title: "Safety Hazard Flags", desc: "Safety issues are automatically flagged and surfaced to the top. Protect your clients and your liability." },
              { icon: "🔧", title: "Contractor Matching", desc: "Each finding is tagged with the right contractor — electrician, roofer, HVAC tech — so your clients know who to call." },
              { icon: "📊", title: "Property Score", desc: "A single 0–100 property health score gives you and your clients a clear picture of overall condition at a glance." },
            ].map((f, i) => (
              <div key={i} className="reveal" style={{ background: "white", borderRadius: 16, padding: 28, border: "1px solid var(--border)", transitionDelay: `${(i % 3) * 0.1}s` }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 className="font-playfair" style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal">
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2.5px", color: "var(--blue)", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>Pricing</div>
          <h2 className="font-playfair" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 }}>Simple pricing.<br />Start for free.</h2>
          <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 480, marginBottom: 60 }}>No contracts. No setup fees. Your first 5 reports are on us.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { name: "Starter", price: "$0", period: "Free forever", desc: "5 reports to try the full platform. No credit card required.", features: ["5 inspection reports","Full AI analysis","Email delivery","Cost estimates & urgency","Negotiation tips"], cta: "Start Free →", href: "#upload", featured: false },
            { name: "Agent Pro", price: "$99", period: "/ month", desc: "Unlimited reports for individual agents. Everything you need to close faster.", features: ["Unlimited reports","Full AI analysis","Email delivery","Report history dashboard","Priority processing"], cta: "Get Started →", href: "#upload", featured: true },
            { name: "Brokerage", price: "$499", period: "/ month", desc: "For brokerages. Up to 25 agents, broker analytics, custom branding.", features: ["Up to 25 agents","Broker analytics dashboard","Custom branding","Team workspace","Dedicated support"], cta: "Contact Sales →", href: "mailto:hello@casaflux.com", featured: false },
          ].map((plan, i) => (
            <div key={i} className="reveal" style={{ borderRadius: 20, padding: 36, position: "relative", background: plan.featured ? "linear-gradient(160deg, var(--blue-deeper), var(--blue-dark))" : "white", border: plan.featured ? "none" : "1.5px solid var(--border)", transitionDelay: `${i * 0.1}s` }}>
              {plan.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 100, letterSpacing: 0.5, textTransform: "uppercase" as const, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" as const }}>Most Popular</div>}
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 2, color: plan.featured ? "rgba(255,255,255,0.6)" : "var(--blue)", fontFamily: "'DM Mono', monospace", marginBottom: 20 }}>{plan.name}</div>
              <div className="font-playfair" style={{ fontSize: 52, fontWeight: 800, color: plan.featured ? "white" : "var(--text)", lineHeight: 1, letterSpacing: -2, marginBottom: 4 }}>{plan.price}</div>
              <div style={{ fontSize: 14, color: plan.featured ? "rgba(255,255,255,0.6)" : "var(--text-muted)", marginBottom: 20 }}>{plan.period}</div>
              <div style={{ fontSize: 14, color: plan.featured ? "rgba(255,255,255,0.75)" : "var(--text-muted)", lineHeight: 1.6, marginBottom: 28, paddingBottom: 28, borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.15)" : "var(--border)"}` }}>{plan.desc}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 32 }}>
                {plan.features.map((feat, j) => (
                  <li key={j} style={{ fontSize: 14, color: plan.featured ? "rgba(255,255,255,0.85)" : "var(--text)", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 18, height: 18, background: plan.featured ? "rgba(255,255,255,0.2)" : "var(--sky)", color: plan.featured ? "white" : "var(--blue-dark)", borderRadius: "50%", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href={plan.href} style={{ display: "block", textAlign: "center" as const, padding: "14px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", background: plan.featured ? "white" : "transparent", color: plan.featured ? "var(--blue-deeper)" : "var(--blue)", border: plan.featured ? "none" : "1.5px solid var(--blue)" }}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ margin: "0 48px 100px" }}>
        <div style={{ background: "linear-gradient(135deg, var(--blue-deeper), var(--blue))", borderRadius: 28, padding: "80px 60px", textAlign: "center" as const, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "2.5px", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Mono', monospace", marginBottom: 20 }}>Get Started Today</div>
          <h2 className="font-playfair" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "white", lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 20 }}>Upload your first report.<br />See it in 60 seconds.</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px" }}>Join realtors in Virginia already using CasaFlux. Your first 5 reports are completely free.</p>
          <a href="#upload" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "white", color: "var(--blue-deeper)", padding: "18px 44px", borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>Upload a Report Now →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <span className="font-playfair" style={{ fontSize: 18, fontWeight: 600, color: "var(--text)" }}>Casa<span style={{ color: "var(--blue)" }}>Flux</span></span>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>© 2026 CasaFlux. Built for real estate professionals.</span>
        <div style={{ display: "flex", gap: 28 }}>
          {[["How It Works","#how-it-works"],["Features","#features"],["Pricing","#pricing"],["Contact","mailto:hello@casaflux.com"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
