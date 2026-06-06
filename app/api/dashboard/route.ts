import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = "appdnd2iQTxgFMFKC";
const PROPERTIES_TABLE = "tbl0GygHGyyb027KQ";
const MAGIC_LINKS_TABLE = "tblMagicLinks"; // we'll create this

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.json({ error: "Missing email or token" }, { status: 400 });
  }

  try {
    // Verify token against Airtable magic links table
    const formula = encodeURIComponent(`AND(Email='${email}', Token='${token}', Used=FALSE())`);
    const verifyRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${MAGIC_LINKS_TABLE}?filterByFormula=${formula}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
    );

    if (!verifyRes.ok) {
      return NextResponse.json({ error: "Verification failed" }, { status: 401 });
    }

    const verifyData = await verifyRes.json();
    if (!verifyData.records || verifyData.records.length === 0) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 401 });
    }

    // Mark token as used
    const tokenRecordId = verifyData.records[0].id;
    await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${MAGIC_LINKS_TABLE}/${tokenRecordId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: { Used: true } })
      }
    );

    // Fetch all properties for this email
    const propFormula = encodeURIComponent(`ClientEmail='${email}'`);
    const propsRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${PROPERTIES_TABLE}?filterByFormula=${propFormula}&sort[0][field]=CreatedTime&sort[0][direction]=desc`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
    );

    if (!propsRes.ok) {
      return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
    }

    const propsData = await propsRes.json();
    const properties = (propsData.records || []).map((r: any) => ({
      id: r.id,
      address: r.fields.fldIQ9PO9Dj9DfhXS || "Unknown Address",
      score: r.fields.fld0HEwG7kV53vydp || 0,
      urgentCount: r.fields.fldCNVSExE3R8r9u6 || 0,
      monitorCount: r.fields.fld8o9nhvxPoGR3jY || 0,
      goodCount: r.fields.fldY7edJyNGQxx1HY || 0,
      totalCostLow: r.fields.fldPDDmVRJYYKRC0H || 0,
      totalCostHigh: r.fields.fldxM78dfCzUqfzK3 || 0,
      urgentCost: r.fields.fldfIL8ojQLRXpxtz || 0,
      summary: r.fields.fld1XBu8cnqgPFduK || "",
      date: r.fields.fldmNrWoeNT2Zug6Q || "",
      shareToken: r.fields.fldCqJ39KtXrzfmkJ || "",
    }));

    // Issue a new session token for continued access
    const sessionToken = Date.now().toString(36) + Math.random().toString(36).substring(2, 10);

    return NextResponse.json({ properties, sessionToken });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
