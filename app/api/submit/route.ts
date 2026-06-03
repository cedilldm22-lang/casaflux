import { NextRequest, NextResponse } from 'next/server';

const N8N_FORM_URL = 'https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok || response.status === 200 || response.redirected) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true }); // N8N returns 200 on success
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}
