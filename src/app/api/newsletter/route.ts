import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkRateLimit, getClientIdentifier } from '../contact/rate-limit';

const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_APP_PASSWORD || '',
  },
};

const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || 'a.caruso@arcanedigitalshield.com';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  // Rate limit
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)) },
      }
    );
  }

  let email: string;
  try {
    const body = await request.json();
    email = (body.email || '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // Send notification if SMTP is configured
  if (EMAIL_CONFIG.auth.user && EMAIL_CONFIG.auth.pass) {
    try {
      const transporter = nodemailer.createTransport(EMAIL_CONFIG);
      await transporter.sendMail({
        from: `"Arcane Digital Shield" <${EMAIL_CONFIG.auth.user}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: `📬 New Newsletter Subscriber: ${email}`,
        text: `New newsletter subscriber:\n\n${email}\n\nReply to this email to respond directly.`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#0a0f1a;padding:20px;border-radius:8px 8px 0 0">
              <h2 style="color:#22d3ee;margin:0">📬 New Newsletter Subscriber</h2>
              <p style="color:#94a3b8;margin:8px 0 0 0">Arcane Digital Shield Blog</p>
            </div>
            <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb">
              <p style="font-size:16px;color:#374151">Someone subscribed to your security insights newsletter:</p>
              <div style="background:white;padding:12px 16px;border-radius:6px;border:1px solid #e5e7eb;font-size:18px">
                <a href="mailto:${email}" style="color:#2563eb">${email}</a>
              </div>
              <div style="text-align:center;margin-top:20px">
                <a href="mailto:${email}?subject=Welcome to Arcane Digital Shield Security Insights"
                   style="display:inline-block;background:#0a0f1a;color:#22d3ee;padding:10px 24px;text-decoration:none;border-radius:6px;font-weight:bold">
                  ✉️ Send Welcome Email
                </a>
              </div>
            </div>
            <div style="padding:12px;text-align:center;font-size:12px;color:#6b7280">
              Sent from your website newsletter form
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error('Newsletter email notification failed:', error);
      // Don't fail the request — subscriber still gets success response
    }
  }

  return NextResponse.json(
    { success: true, message: "You're subscribed! Watch your inbox for weekly security insights." },
    { status: 201 }
  );
}
