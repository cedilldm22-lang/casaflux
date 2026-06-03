import { NextRequest, NextResponse } from 'next/server';

const N8N_FORM_URL = 'https://flux1.app.n8n.cloud/form/f6f81001-50f4-42d9-bc6c-b29df62e00d4';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const forwardForm = new FormData();
    for (const [key, value] of formData.entries()) {
      forwardForm.append(key, value);
    }

    await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: forwardForm,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
