import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookieHeader } from '@/lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!ADMIN_PASSWORD || !secret || secret.length < 32) {
      return NextResponse.json(
        { error: 'Admin login not configured' },
        { status: 503 }
      );
    }
    const body = await request.json();
    const { password } = body;
    if (typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      );
    }
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
    const cookie = setSessionCookieHeader();
    const res = NextResponse.json({ success: true });
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
