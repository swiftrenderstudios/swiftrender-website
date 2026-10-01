/**
 * ============================================================================
 *  POST /api/brief  —  Cloudflare Pages Function
 * ============================================================================
 *
 *  This replaces FormSubmit entirely. It runs on Cloudflare's own
 *  infrastructure — the same host already serving this site — so there's no
 *  separate third-party form service that can go down independently. Free
 *  tiers on both Cloudflare Pages Functions and Resend (the email API used
 *  below) comfortably cover a small studio's contact-form volume with no
 *  time limit on the free tier itself.
 *
 *  Any file under /functions maps automatically to a route: this file at
 *  functions/api/brief.js becomes POST yoursite.com/api/brief. Cloudflare
 *  detects and deploys it automatically on your next push — no separate
 *  setup beyond the two things below.
 *
 *  REQUIRED ONE-TIME SETUP (you do this, not in code — see EMAIL_SETUP.md
 *  for the full walkthrough):
 *    1. Create a free Resend account (resend.com) and verify a sending
 *       domain (e.g. swiftrenderstudios.com) by adding the DNS records
 *       Resend shows you — since your DNS is already on Cloudflare, that's
 *       a few minutes in the same dashboard you already use.
 *    2. In the Cloudflare Pages dashboard → this project → Settings →
 *       Environment variables, add RESEND_API_KEY (Production AND Preview)
 *       with a Resend API key. Never hard-code the key here.
 *
 *  WHAT THIS SENDS, PER VALID SUBMISSION:
 *    1. A notification to the studio (STUDIO_EMAIL below) with every field.
 *    2. An auto-reply to whatever address the visitor put in the form.
 *  If the studio notification fails to send, the whole request is reported
 *  as failed (so the visitor knows to retry or email directly) — losing a
 *  lead silently is worse than a visible error. If only the client
 *  auto-reply fails, the request still succeeds (you got the lead either
 *  way) and the failure is just logged.
 * ============================================================================
 */

const REQUIRED_FIELDS = ['name', 'studio', 'email', 'deadline', 'project_type', 'industry', 'file_link', 'description'];
const STUDIO_EMAIL = 'info@swiftrenderstudios.com';

// Must be on the domain you verify in Resend — see EMAIL_SETUP.md.
const FROM_ADDRESS = 'SwiftRender Studios <brief@swiftrenderstudios.com>';

export async function onRequestPost({ request, env }) {
  try {
    const form = await request.formData();

    // Honeypot: real visitors never fill this in. A filled one gets a fake
    // "success" response instead of an error, so bots don't learn to probe
    // for a different field name.
    if (form.get('_honey')) {
      return json({ success: true });
    }

    const data = {};
    for (const field of REQUIRED_FIELDS) {
      const value = (form.get(field) || '').toString().trim();
      if (!value) {
        return json({ success: false, message: `Missing field: ${field}` }, 400);
      }
      data[field] = value;
    }

    if (!isLikelyEmail(data.email)) {
      return json({ success: false, message: 'Please enter a valid email address.' }, 400);
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured in this Pages project.');
      return json({ success: false, message: 'Server email is not configured yet.' }, 500);
    }

    const [studioResult, clientResult] = await Promise.allSettled([
      sendEmail(env.RESEND_API_KEY, {
        from: FROM_ADDRESS,
        to: STUDIO_EMAIL,
        reply_to: data.email,
        subject: `New project brief — ${data.name} (${data.studio})`,
        html: studioEmailHtml(data),
      }),
      sendEmail(env.RESEND_API_KEY, {
        from: FROM_ADDRESS,
        to: data.email,
        subject: "We've received your project brief — SwiftRender Studios",
        html: clientEmailHtml(data),
      }),
    ]);

    if (studioResult.status === 'rejected') {
      console.error('Studio notification email failed:', studioResult.reason);
      return json({ success: false, message: 'Could not deliver your brief. Please try again or email us directly.' }, 502);
    }

    if (clientResult.status === 'rejected') {
      console.error('Client auto-reply failed (lead was still captured):', clientResult.reason);
    }

    return json({ success: true });
  } catch (error) {
    console.error('Unexpected error handling brief submission:', error);
    return json({ success: false, message: 'Unexpected server error.' }, 500);
  }
}

async function sendEmail(apiKey, payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Resend API ${response.status}: ${body}`);
  }

  return response.json();
}

function isLikelyEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function studioEmailHtml(data) {
  const rows = [
    ['Name', data.name],
    ['Studio / Firm', data.studio],
    ['Email', data.email],
    ['Target Completion Date', data.deadline],
    ['Project Type', data.project_type],
    ['Industry', data.industry],
    ['File Link', data.file_link],
    ['Description', data.description],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 14px;font-weight:600;border-bottom:1px solid #e5e5e5;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 14px;border-bottom:1px solid #e5e5e5;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#0D0D0D;">
      <h2 style="margin-bottom:4px;">New project brief</h2>
      <p style="color:#57575c;margin-top:0;">Submitted via swiftrenderstudios.com</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table>
    </div>
  `;
}

function clientEmailHtml(data) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#0D0D0D;">
      <h2>Thanks, ${escapeHtml(data.name)} — we've got your brief.</h2>
      <p>We've received your project brief and will follow up with a scope, schedule, and next step within 12 hours.</p>
      <p style="color:#57575c;font-size:13px;margin-top:32px;">SwiftRender Studios · Remote 3D Visualization Partner</p>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}