import nodemailer from 'nodemailer';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  submittedAt: string;
}

// Email configuration
const EMAIL_CONFIG = {
  // Google Workspace SMTP settings
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER || '', // a.caruso@arcanedigitalshield.com
    pass: process.env.SMTP_APP_PASSWORD || '', // Google App Password
  },
};

// Notification recipients
const NOTIFICATION_RECIPIENTS = {
  primary: process.env.NOTIFICATION_EMAIL || 'a.caruso@arcanedigitalshield.com',
  // Add support email as CC if configured
  cc: process.env.NOTIFICATION_CC_EMAIL || '',
};

// Create reusable transporter
function createTransporter() {
  if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
    console.warn('Email credentials not configured. Skipping email notification.');
    return null;
  }

  return nodemailer.createTransport({
    host: EMAIL_CONFIG.host,
    port: EMAIL_CONFIG.port,
    secure: EMAIL_CONFIG.secure,
    auth: EMAIL_CONFIG.auth,
  });
}

// Format the email body
function formatEmailBody(submission: ContactSubmission): string {
  const submittedDate = new Date(submission.submittedAt).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 4px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e5e7eb; }
    .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb; }
    .footer { padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
    .cta { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">🔔 New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Arcane Digital Shield Website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${submission.name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">
          <a href="mailto:${submission.email}" style="color: #2563eb;">${submission.email}</a>
        </div>
      </div>
      ${submission.phone ? `
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">
          <a href="tel:${submission.phone}" style="color: #2563eb;">${submission.phone}</a>
        </div>
      </div>
      ` : ''}
      ${submission.company ? `
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${submission.company}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${submission.message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="field">
        <div class="label">Submitted</div>
        <div class="value">${submittedDate}</div>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:${submission.email}?subject=Re: Your inquiry to Arcane Digital Shield" class="cta">
          📧 Reply to ${submission.name}
        </a>
        ${submission.phone ? `
        <a href="tel:${submission.phone}" class="cta" style="background: #059669;">
          📞 Call ${submission.name}
        </a>
        ` : ''}
      </div>
    </div>
    <div class="footer">
      <p>This notification was sent from your website contact form.</p>
      <p>
        <a href="https://arcanedigitalshield.com/admin" style="color: #2563eb;">
          View all submissions in Admin Dashboard →
        </a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Format plain text version
function formatPlainText(submission: ContactSubmission): string {
  const submittedDate = new Date(submission.submittedAt).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
NEW CONTACT FORM SUBMISSION
============================

Name: ${submission.name}
Email: ${submission.email}
${submission.phone ? `Phone: ${submission.phone}` : ''}
${submission.company ? `Company: ${submission.company}` : ''}

Message:
${submission.message}

Submitted: ${submittedDate}

---
View all submissions: https://arcanedigitalshield.com/admin
  `.trim();
}

// Send notification email
export async function sendContactNotification(submission: ContactSubmission): Promise<boolean> {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Email transporter not configured. Submission saved but no notification sent.');
    return false;
  }

  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Arcane Digital Shield" <${EMAIL_CONFIG.auth.user}>`,
      to: NOTIFICATION_RECIPIENTS.primary,
      cc: NOTIFICATION_RECIPIENTS.cc || undefined,
      replyTo: submission.email,
      subject: `🔔 New Lead: ${submission.name}${submission.company ? ` from ${submission.company}` : ''}`,
      text: formatPlainText(submission),
      html: formatEmailBody(submission),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return false;
  }
}

// Verify email configuration
export async function verifyEmailConfig(): Promise<boolean> {
  const transporter = createTransporter();
  
  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    console.log('Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('Email configuration verification failed:', error);
    return false;
  }
}
