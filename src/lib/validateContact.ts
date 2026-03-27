/**
 * Input validation and sanitization for contact form (XSS/SQLi prevention).
 * Per pentest remediation: reject malicious payloads, enforce length limits.
 */

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 200;
const MAX_PHONE = 50;
const MAX_MESSAGE = 2000;

const XSS_PATTERN = /<script[\s\S]*?<\/script>|javascript:|on\w+\s*=|<\s*iframe|<\s*object|<\s*embed|<\s*form/gi;
const SQLI_PATTERN = /(\b(SELECT|UNION|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|EXECUTE)\b|'\s*OR\s*'1'|"\s*OR\s*"1"|;\s*--)/gi;

function stripHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

function hasXss(str: string): boolean {
  return XSS_PATTERN.test(str);
}

function hasSqli(str: string): boolean {
  return SQLI_PATTERN.test(str);
}

export interface ContactInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export interface ValidationResult {
  ok: true;
  data: ContactInput;
}

export interface ValidationError {
  ok: false;
  error: string;
  status: number;
}

export function validateContactInput(body: unknown): ValidationResult | ValidationError {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body', status: 400 };
  }
  const b = body as Record<string, unknown>;
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const company = typeof b.company === 'string' ? b.company.trim() : '';
  const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
  const message = typeof b.message === 'string' ? b.message.trim() : '';

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required', status: 400 };
  }

  if (name.length > MAX_NAME) {
    return { ok: false, error: 'Name too long', status: 400 };
  }
  if (email.length > MAX_EMAIL) {
    return { ok: false, error: 'Email too long', status: 400 };
  }
  if (company.length > MAX_COMPANY) {
    return { ok: false, error: 'Company name too long', status: 400 };
  }
  if (phone.length > MAX_PHONE) {
    return { ok: false, error: 'Phone too long', status: 400 };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: 'Message too long', status: 400 };
  }

  if (hasXss(name) || hasXss(email) || hasXss(company) || hasXss(phone) || hasXss(message)) {
    return { ok: false, error: 'Invalid characters in input', status: 400 };
  }
  if (hasSqli(name) || hasSqli(email) || hasSqli(company) || hasSqli(phone) || hasSqli(message)) {
    return { ok: false, error: 'Invalid characters in input', status: 400 };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: 'Invalid email address', status: 400 };
  }

  return {
    ok: true,
    data: {
      name: stripHtml(name),
      email: stripHtml(email).toLowerCase(),
      company: stripHtml(company),
      phone: stripHtml(phone),
      message: stripHtml(message),
    },
  };
}
