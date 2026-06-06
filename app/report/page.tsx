import { notFound } from "next/navigation";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = "appdnd2iQTxgFMFKC";
const PROPERTIES_TABLE = "tbl0GygHGyyb027KQ";
const FINDINGS_TABLE = "tblI1ylCBaemdyAYC";

async function getProperty(id: string) {
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${PROPERTIES_TABLE}/${id}`,
    {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

async function getFindings(propertyId: string) {
  const formula = encodeURIComponent(`SEARCH("${propertyId}", ARRAYJOIN({PropertyID}))`);
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${FINDINGS_TABLE}?filterByFormula=${formula}&pageSize=100`,
    {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.records || [];
}

function fmt(n: number | null) {
  if (n == null) return "N/A";
  return "$" + Number(n).toLocaleString();
}

function formatDate(val: string | null) {
  if (!val) return "N/A";
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return val;
  }
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  const [property, findings] = await Promise.all([
    getProperty(params.id),
    getFindings(params.id),
  ]);

  if (!property || !property.fields) notFound();

  const f = property.fields;
  const score = f.fld0HEwG7kV53vydp || 0;
  const scoreColor = score >= 75 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";

  const sortedFindings = [...findings].sort((a: any, b: any) => {
    const order: Record<string, number> = { urgent: 0, monitor: 1, good: 2 };
    const sa = a.fields?.fldPy307JCSKffGkR?.name || "monitor";
    const sb = b.fields?.fldPy307JCSKffGkR?.name || "monitor";
    return (order[sa] ?? 3) - (order[sb] ?? 3);
  });

  const urgentCount = f.fldCNVSExE3R8r9u6 || 0;
  const monitorCount = f.fld8o9nhvxPoGR3jY || 0;
  const goodCount = f.fldY7edJyNGQxx1HY || 0;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{f.fldIQ9PO9Dj9DfhXS || "Inspection Report"} — SmartListings</title>
        <meta name="robots" content="noindex" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; background: #f2f2f2; color: #111; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: #ff6d5a; color: white; padding: 28px 32px; border-radius: 12px; margin-bottom: 12px; }
          .brand { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; margin-bottom: 6px; }
          .address { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
          .meta { font-size: 13px; opacity: 0.9; }
          .disclaimer { background: #fffbeb; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; margin-bottom: 12px; }
          .disclaimer-title { font-size: 12px; font-weight: 700; color: #92400e; margin-bottom: 3px; }
          .disclaimer-body { font-size: 11px; color: #78350f; line-height: 1.5; }
          .stats { display: grid; grid-template-columns: 1fr 2fr; gap: 12px; margin-bottom: 12px; }
          .stat-card { background: white; border: 1px solid #ddd; border-radius: 10px; padding: 16px; }
          .stat-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
          .stat-score { font-size: 44px; font-weight: 800; }
          .stat-sub { font-size: 11px; color: #888; }
          .cost-main { font-size: 20px; font-weight: 700; margin-bottom: 2px; }
          .cost-note { font-size: 10px; color: #888; font-style: italic; margin-bottom: 6px; }
          .cost-urgent { font-size: 12px; color: #dc2626; font-weight: 600; margin-bottom: 10px; }
          .badges { display: flex; gap: 12px; font-size: 13px; flex-wrap: wrap; }
          .summary-box { background: #fff5f4; border-left: 4px solid #ff6d5a; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 12px; }
          .summary-label { font-size: 11px; font-weight: 700; color: #ff6d5a; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
          .summary-text { font-size: 13px; color: #111; line-height: 1.6; }
          .findings-header { font-size: 15px; font-weight: 700; border-bottom: 2px solid #ff6d5a; padding-bottom: 6px; margin-bottom: 8px; }
          .findings-sub { font-size: 11px; font-weight: 400; color: #888; margin-left: 6px; }
          .finding { background: white; border: 1px solid #eee; border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
          .finding-inner { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 14px; }
          .finding-title { font-weight: 700; font-size: 13px; margin-bottom: 3px; }
          .finding-meta { font-size: 11px; color: #666; margin-bottom: 5px; }
          .finding-desc { font-size: 12px; color: #333; line-height: 1.5; margin-bottom: 6px; }
          .finding-tip { font-size: 12px; color: #0f766e; font-style: italic; }
          .finding-status { text-align: center; min-width: 140px; }
          .badge { color: white; padding: 5px 8px; border-radius: 5px; font-size: 10px; font-weight: 700; margin-bottom: 6px; line-height: 1.3; }
          .badge-urgent { background: #dc2626; }
          .badge-monitor { background: #d97706; }
          .badge-good { background: #059669; }
          .cost-val { font-size: 13px; font-weight: 700; }
          .cost-est { font-size: 10px; color: #888; font-style: italic; margin-top: 2px; }
          .tag { display: inline-block; color: white; padding: 1px 5px; border-radius: 3px; font-size: 10px; margin-left: 4px; }
          .tag-safety { background: #dc2626; }
          .tag-diy { background: #16a34a; }
          .cta { text-align: center; padding: 24px; background: white; border-radius: 10px; margin-top: 16px; }
          .cta p { font-size: 14px; color: #333; margin-bottom: 14px; }
          .cta a { display: inline-block; background: #ff6d5a; color: white; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 700; text-decoration: none; }
          .footer { margin-top: 12px; padding: 12px; background: #f8f8f8; border-radius: 8px; text-align: center; }
          .footer p { font-size: 10px; color: #888; line-height: 1.5; }
          @media (max-width: 600px) {
            .stats { grid-template-columns: 1fr; }
            .finding-inner { grid-template-columns: 1fr; }
            .finding-status { text-align: left; }
            .header { padding: 20px; }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="brand">SmartListings — Home Inspection Report</div>
            <div className="address">{f.fldIQ9PO9Dj9DfhXS || "Property Report"}</div>
            <div className="meta">
              Prepared for: {f.fldP32c1m2AHhaLRd || "Client"} &nbsp;|&nbsp; {formatDate(f.fldmNrWoeNT2Zug6Q)}
            </div>
            <div className="meta" style={{ opacity: 0.8, fontSize: 12, marginTop: 3 }}>
              Inspector: {f.fld7lXC962F9Gz0Hb || "N/A"} — {f.fldlEFzXzy5yRfHzx || ""}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer">
            <div className="disclaimer-title">⚠️ IMPORTANT — ESTIMATED COSTS ONLY</div>
            <div className="disclaimer-body">
              All repair cost ranges are AI-generated estimates for reference and negotiation purposes only.
              They are NOT contractor quotes, bids, or final prices. Actual costs vary based on location,
              scope, materials, and contractor pricing. Always obtain 2–3 quotes from licensed professionals
              before making financial decisions.
            </div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-card" style={{ textAlign: "center" }}>
              <div className="stat-label">Property Score</div>
              <div className="stat-score" style={{ color: scoreColor }}>{score}</div>
              <div className="stat-sub">out of 100</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Estimated Repair Range</div>
              <div className="cost-main">{fmt(f.fldPDDmVRJYYKRC0H)} – {fmt(f.fldxM78dfCzUqfzK3)}</div>
              <div className="cost-note">Estimates only — get contractor quotes for accurate pricing</div>
              <div className="cost-urgent">Urgent items: ~{fmt(f.fldfIL8ojQLRXpxtz)} (est.)</div>
              <div className="badges">
                <span style={{ color: "#dc2626", fontWeight: 700 }}>{urgentCount} urgent</span>
                <span style={{ color: "#d97706", fontWeight: 700 }}>{monitorCount} monitor</span>
                <span style={{ color: "#16a34a", fontWeight: 700 }}>{goodCount} good</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="summary-box">
            <div className="summary-label">AI Analysis Summary</div>
            <div className="summary-text">{f.fld1XBu8cnqgPFduK || ""}</div>
          </div>

          {/* Findings */}
          <div className="findings-header">
            All Findings ({sortedFindings.length} total)
            <span className="findings-sub">— costs are estimates only</span>
          </div>

          {sortedFindings.map((rec: any) => {
            const ff = rec.fields || {};
            const severity = ff.fldPy307JCSKffGkR?.name || "monitor";
            const hasCost = ff.fldHTTZEwcR9RYIIn != null && ff.fldWlLOMjzUTnaT53 != null;
            const costText = hasCost
              ? `${fmt(ff.fldHTTZEwcR9RYIIn)} – ${fmt(ff.fldWlLOMjzUTnaT53)}`
              : "No repair needed";
            const badgeClass =
              severity === "urgent" ? "badge badge-urgent" :
              severity === "good" ? "badge badge-good" :
              "badge badge-monitor";
            const badgeLabel =
              severity === "urgent" ? "Urgent — Fix Before Closing" :
              severity === "good" ? "Good Condition" :
              "Monitor — Within 1 Year";

            return (
              <div key={rec.id} className="finding">
                <div className="finding-inner">
                  <div>
                    <div className="finding-title">
                      {ff.fldSBMr0uv0dJXQTs || "Finding"}
                      {ff.fldtdqs9sIFB9yWYr && <span className="tag tag-safety">SAFETY</span>}
                      {ff.fldAFRsnLr93kWqpy && <span className="tag tag-diy">DIY OK</span>}
                    </div>
                    <div className="finding-meta">
                      {ff.fldIFPDgeAI6oyK5T || ""} | {ff.fldO1XxqA3BC1GyyB?.name || ""} | {ff.fldB72dpGc5JcCaxX?.name || ""}
                    </div>
                    <div className="finding-desc">{ff.fldm3BfOCrEVJFCZn || ""}</div>
                    {ff.fld4X0m1VPWCUHgl8 && (
                      <div className="finding-tip">💡 Tip: {ff.fld4X0m1VPWCUHgl8}</div>
                    )}
                  </div>
                  <div className="finding-status">
                    <div className={badgeClass}>{badgeLabel}</div>
                    <div className="cost-val">{costText}</div>
                    {hasCost && <div className="cost-est">Estimated only — not a quote</div>}
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA */}
          <div className="cta">
            <p>Want to analyze your own inspection report?</p>
            <a href="https://casaflux.vercel.app">Try SmartListings Free →</a>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>
              All cost estimates are AI-generated for reference only and do not constitute professional contractor quotes.
              Costs vary by location, scope, materials, and market conditions. Always consult licensed professionals for accurate pricing.
              <br />Powered by SmartListings
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
