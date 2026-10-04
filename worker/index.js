/**
 * ============================================================================
 *  SwiftRender Studios — Cloudflare Worker entry point
 * ============================================================================
 *
 *  Your site is deployed as a Cloudflare *Worker* with static assets (that's
 *  what "Workers & Pages → swiftrender-website" with "Workers Logs" is), NOT a
 *  Cloudflare *Pages* project. Pages Functions (the old /functions folder) are
 *  only run by Pages, so the previous functions/api/brief.js was never
 *  deployed and /api/brief never reached any code.
 *
 *  This file is the Worker's code. wrangler.jsonc points at it and tells
 *  Cloudflare to run it first for /api/* requests; everything else (pages,
 *  images, video) is served straight from the built site in /dist.
 *
 *  ROUTES
 *    POST /api/brief  → validate form, email the studio + auto-reply via Resend
 *    GET  /api/brief  → health check: reports whether RESEND_API_KEY is
 *                       available at RUNTIME (never reveals the value)
 *
 *  REQUIRED RUNTIME SECRET
 *    RESEND_API_KEY must be a *runtime* secret on the Worker:
 *      Worker → Settings → Variables and Secrets (under "Bindings") → Add →
 *      Type: Secret.
 *    A secret added under Settings → Builds is a BUILD-time variable only —
 *    it is NOT visible to this code.
 * ============================================================================
 */

const REQUIRED_FIELDS = ['name', 'studio', 'email', 'deadline', 'project_type', 'industry', 'file_link', 'description'];
const MAX_LENGTH = { description: 5000, file_link: 2000 }; // everything else: 300
const DEFAULT_MAX_LENGTH = 300;

const STUDIO_EMAIL = 'info@swiftrenderstudios.com';

// Must be on a domain that is VERIFIED in Resend (Resend → Domains).
const FROM_ADDRESS = 'SwiftRender Studios <brief@swiftrenderstudios.com>';

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/brief' || pathname === '/api/brief/') {
      if (request.method === 'GET') return handleHealthCheck(env);
      if (request.method === 'POST') return handleBrief(request, env);
      return json({ success: false, message: 'Method not allowed.' }, 405, { Allow: 'GET, POST' });
    }

    if (pathname.startsWith('/api/')) {
      return json({ success: false, message: 'Not found.' }, 404);
    }

    // Everything else: static site (SPA fallback is handled by the assets config).
    return env.ASSETS.fetch(request);
  },
};

function handleHealthCheck(env) {
  const configured = Boolean(env.RESEND_API_KEY);
  return json({
    ok: true,
    // Compare with the version ID in Cloudflare → Deployments to confirm the
    // latest code is the one actually live.
    workerVersion: env.CF_VERSION_METADATA?.id || 'unknown',
    resendConfigured: configured,
    message: configured
      ? 'RESEND_API_KEY is set at runtime. This endpoint is ready for POST submissions from the brief form.'
      : 'RESEND_API_KEY is NOT available to the Worker at runtime. Add it under Worker → Settings → Variables and Secrets (Bindings) as a Secret — NOT under Builds — then redeploy.',
  });
}

async function handleBrief(request, env) {
  try {
    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ success: false, message: 'Invalid form submission.' }, 400);
    }

    // Honeypot: real visitors never fill this in. Bots get a fake "success".
    if (form.get('_honey')) {
      return json({ success: true });
    }

    const data = {};
    for (const field of REQUIRED_FIELDS) {
      const value = (form.get(field) || '').toString().trim();
      if (!value) {
        return json({ success: false, message: `Missing field: ${field}` }, 400);
      }
      if (value.length > (MAX_LENGTH[field] || DEFAULT_MAX_LENGTH)) {
        return json({ success: false, message: `Field too long: ${field}` }, 400);
      }
      data[field] = value;
    }

    if (!isLikelyEmail(data.email)) {
      return json({ success: false, message: 'Please enter a valid email address.' }, 400);
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not available at runtime. Add it as a Secret under Worker → Settings → Variables and Secrets (not under Builds).');
      return json({ success: false, message: 'Server email is not configured yet.' }, 500);
    }

    const [studioResult, clientResult] = await Promise.allSettled([
      sendEmail(env.RESEND_API_KEY, {
        from: FROM_ADDRESS,
        to: [STUDIO_EMAIL],
        reply_to: data.email,
        subject: `New project brief — ${data.name} (${data.studio})`.replace(/[\r\n]+/g, ' '),
        html: studioEmailHtml(data),
      }),
      sendEmail(env.RESEND_API_KEY, {
        from: FROM_ADDRESS,
        to: [data.email],
        reply_to: STUDIO_EMAIL,
        subject: "We've received your project brief — SwiftRender Studios",
        html: clientEmailHtml(data),
      }),
    ]);

    if (studioResult.status === 'rejected') {
      const reason = studioResult.reason;
      console.error('Studio notification email failed:', reason?.message || reason);
      // Resend's own explanation (e.g. "domain is not verified") is safe to
      // show and makes the real cause visible right on the form.
      const why = reason?.resendMessage ? ` (${reason.resendMessage})` : '';
      return json({ success: false, message: `Could not deliver your brief${why}.` }, 502);
    }

    if (clientResult.status === 'rejected') {
      console.error('Client auto-reply failed (lead was still captured):', clientResult.reason?.message || clientResult.reason);
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
      'User-Agent': 'swiftrender-website/1.0',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    let resendMessage = `Resend error ${response.status}`;
    try {
      const parsed = JSON.parse(body);
      if (parsed && parsed.message) resendMessage = `Resend ${response.status}: ${parsed.message}`;
    } catch {
      // body wasn't JSON — keep the generic message
    }
    const error = new Error(`Resend API ${response.status}: ${body}`);
    error.resendMessage = resendMessage;
    throw error;
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
        `<tr><td style="padding:8px 14px;font-weight:600;border-bottom:1px solid #e5e5e5;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 14px;border-bottom:1px solid #e5e5e5;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
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

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}
