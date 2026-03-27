import { NextResponse } from 'next/server';
import { getSessionCookieHeader } from '@/lib/auth';

export async function POST() {
  const cookie = getSessionCookieHeader();
  const res = NextResponse.json({ success: true });
  res.headers.set('Set-Cookie', cookie);
  return res;
}
