import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'admin_session';
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24; // 24 hours
const SESSION_PREFIX = 's:';

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return secret;
}

export function signSession(): string {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET must be set and at least 32 characters');
  const payload = `${SESSION_PREFIX}${Date.now()}`;
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

export function verifySession(token: string): boolean {
  try {
    const secret = getSecret();
    if (!secret) return false;
    const [raw, sig] = token.split('.');
    if (!raw?.startsWith(SESSION_PREFIX) || !sig) return false;
    const expected = createHmac('sha256', secret).update(raw).digest('hex');
    if (expected.length !== sig.length) return false;
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(sig, 'utf8');
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
    const ts = parseInt(raw.slice(SESSION_PREFIX.length), 10);
    if (Number.isNaN(ts)) return false;
    const ageSec = (Date.now() - ts) / 1000;
    return ageSec >= 0 && ageSec <= COOKIE_MAX_AGE_SEC;
  } catch {
    return false;
  }
}

const isSecure = process.env.NODE_ENV === 'production';

export function getSessionCookieHeader(): string {
  const secure = isSecure ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=0`;
}

export function setSessionCookieHeader(): string {
  const value = signSession();
  const secure = isSecure ? '; Secure' : '';
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=${COOKIE_MAX_AGE_SEC}`;
}

export function getCookieName(): string {
  return COOKIE_NAME;
}

export function parseSessionFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[1].trim()) : null;
}

export function requireAdminSession(cookieHeader: string | null): boolean {
  const token = parseSessionFromCookie(cookieHeader);
  return token !== null && verifySession(token);
}
