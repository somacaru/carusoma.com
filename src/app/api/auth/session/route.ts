import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie');
  if (requireAdminSession(cookie)) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
