import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const SUBMIT_FORM_URL = 'https://submit-form.com/Ks1Uh0Zzl';

function parseBody(contentType: string, raw: string, json?: Record<string, unknown>) {
  const params: Record<string, string> = {};
  if (contentType.includes('application/x-www-form-urlencoded') && raw) {
    const sp = new URLSearchParams(raw);
    sp.forEach((value, key) => { params[key] = value; });
  } else if (json) {
    Object.entries(json).forEach(([key, value]) => {
      if (value != null && typeof value === 'string') params[key] = value;
    });
  }
  return params;
}

/**
 * 문의 폼: 먼저 submit-form.com으로 전송 시도, 실패 시 Supabase contact_inquiries에 저장 후 성공 반환.
 */
export async function POST(request: NextRequest) {
  let body: string;
  let contentType: string;
  let jsonBody: Record<string, unknown> | undefined;

  try {
    contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
      body = await request.text();
    } else if (contentType.includes('application/json')) {
      jsonBody = await request.json();
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(jsonBody || {})) {
        if (value != null && typeof value === 'string') params.append(key, value);
      }
      body = params.toString();
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400 }
      );
    }
  } catch (e) {
    console.error('Contact API: failed to read body', e);
    return NextResponse.json(
      { success: false, error: '요청을 읽는 중 오류가 발생했습니다.' },
      { status: 400 }
    );
  }

  const params = parseBody(contentType, body, jsonBody);
  const payload = {
    name: params.name ?? '',
    company: params.company ?? '',
    email: params.email ?? '',
    phone: params.phone ?? '',
    industry: params.industry ?? '',
    message: params.message ?? '',
  };

  // 1) submit-form.com 전송 시도 (타임아웃 15초)
  let submitFormOk = false;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(SUBMIT_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    submitFormOk = response.ok;
    if (!response.ok) {
      console.warn('Contact API: submit-form.com returned', response.status, await response.text());
    }
  } catch (err) {
    console.warn('Contact API: submit-form.com request failed', err);
  }

  if (submitFormOk) {
    return NextResponse.json({ success: true });
  }

  // 2) 실패 시 Supabase에 저장 후 성공 반환 (문의 유실 방지)
  const supabase = await createClient();
  if (!supabase) {
    console.error('Contact API: Supabase client not configured');
    return NextResponse.json(
      { success: false, error: '문의 전송 설정이 되어 있지 않습니다. 관리자에게 문의해 주세요.' },
      { status: 500 }
    );
  }

  const { error } = await supabase.from('contact_inquiries').insert({
    name: payload.name || null,
    company: payload.company || null,
    email: payload.email || null,
    phone: payload.phone || null,
    industry: payload.industry || null,
    message: payload.message || null,
  });

  if (error) {
    console.error('Contact API: Supabase insert failed', error);
    return NextResponse.json(
      { success: false, error: '문의 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
