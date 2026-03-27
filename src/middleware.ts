import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Session-based authentication for admin routes
// The /admin page has its own login form that sets a session cookie
// Note: Full crypto verification happens in the API route handlers
// Middleware only does basic cookie presence check for Edge Runtime compatibility

const SESSION_PREFIX = 's:';
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

function hasValidSessionCookie(request: NextRequest): boolean {
  // Basic check: cookie exists and has expected format
  // Full signature verification happens in the API routes (Node.js runtime)
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith('admin_session='));
  
  if (!sessionCookie) {
    return false;
  }

  const token = sessionCookie.split('=')[1];
  if (!token) {
    return false;
  }

  try {
    const decoded = decodeURIComponent(token);
    // Basic format check: should have prefix and a dot (signature separator)
    if (!decoded.startsWith(SESSION_PREFIX) || !decoded.includes('.')) {
      return false;
    }

    // Extract timestamp and check age
    const lastDot = decoded.lastIndexOf('.');
    const raw = decoded.substring(0, lastDot);
    const timestampStr = raw.substring(SESSION_PREFIX.length);
    const timestamp = parseInt(timestampStr, 10);
    
    if (isNaN(timestamp)) return false;
    if (Date.now() - timestamp > SESSION_MAX_AGE) return false;

    // Cookie looks valid (signature will be verified by the API route)
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // /admin page uses its own login form - no middleware block needed
  // The page checks session via /api/auth/session
  
  // Protect /api/contact GET and PATCH (data exfiltration prevention)
  // POST is allowed for public form submissions (has rate limiting)
  // These endpoints require valid session cookie
  if (pathname === '/api/contact' && (method === 'GET' || method === 'PATCH')) {
    if (!hasValidSessionCookie(request)) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // HSTS (only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes that need to be public
    '/((?!_next/static|_next/image|favicon.ico|api/health).*)',
  ],
};
