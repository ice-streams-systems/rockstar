/**
 * ═════════════════════════════════════════════════════════════
 *  ROCKSTAR AUTO REPAIR — Contact Form Worker
 *  Receives POSTs from rockstarautorepair.com's Request Service
 *  and Free Estimate forms, validates, and dispatches via Resend.
 *
 *  Same pattern as icestreams.io's worker.js - only the fields and
 *  the email copy are specific to Rockstar.
 * ═════════════════════════════════════════════════════════════
 *
 *  Deploy as its OWN Worker (not part of the static-assets "rockstar"
 *  Pages project), routed at api.rockstarautorepair.com, e.g.:
 *
 *    wrangler deploy worker.js --name rockstar-api
 *    wrangler secret put RESEND_API_KEY --name rockstar-api
 *    wrangler secret put DESTINATION    --name rockstar-api   # service@rockstarautorepair.com
 *    wrangler secret put FROM_ADDRESS   --name rockstar-api   # e.g. noreply@rockstarautorepair.com
 *    wrangler secret put ALLOWED_ORIGIN --name rockstar-api   # https://rockstarautorepair.com
 *                                                              # (use the staging subdomain while reviewing)
 *
 *  FROM_ADDRESS must be on a domain verified in Resend before it will send.
 */

export default {
  async fetch(request, env, ctx) {
    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'METHOD_NOT_ALLOWED' }, 405, env);
    }

    // ── Parse body ──
    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: 'INVALID_JSON' }, 400, env);
    }

    // ── Validate ──
    const formType = String(data.formType || '').trim() || 'Request Service';
    const name     = String(data.name    || '').trim();
    const phone    = String(data.phone   || '').trim();
    const email    = String(data.email   || '').trim();
    const year     = String(data.year    || '').trim();
    const make     = String(data.make    || '').trim();
    const model    = String(data.model   || '').trim();
    const service  = String(data.service || '').trim();
    const hp       = String(data.hp      || '').trim(); // honeypot

    // Honeypot — bots fill this, humans don't see it
    if (hp) return json({ ok: true }, 200, env); // silently drop

    if (!name  || name.length  > 120) return json({ error: 'BAD_NAME' },  400, env);
    if (!phone || phone.length > 40)  return json({ error: 'BAD_PHONE' }, 400, env);
    if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return json({ error: 'BAD_EMAIL' }, 400, env);
    if (!year  || !/^\d{4}$/.test(year))  return json({ error: 'BAD_YEAR' },  400, env);
    if (!make  || make.length  > 60)      return json({ error: 'BAD_MAKE' },  400, env);
    if (!model || model.length > 60)      return json({ error: 'BAD_MODEL' }, 400, env);
    if (service.length > 5000)            return json({ error: 'BAD_SERVICE' }, 400, env);

    // ── Compose email ──
    const subject = `[Rockstar] ${formType}: ${year} ${make} ${model} - ${name}`;
    const text    = [
      `NEW ${formType.toUpperCase()} - rockstarautorepair.com`,
      ``,
      `NAME:     ${name}`,
      `PHONE:    ${phone}`,
      `EMAIL:    ${email}`,
      `VEHICLE:  ${year} ${make} ${model}`,
      ``,
      `SERVICE NEEDED:`,
      service || '(not provided)',
      ``,
      `---`,
      `Timestamp: ${new Date().toISOString()}`,
      `Source IP: ${request.headers.get('CF-Connecting-IP') || 'unknown'}`,
      `User-Agent: ${request.headers.get('User-Agent') || 'unknown'}`,
    ].join('\n');

    const html = `
<div style="font-family:Arial,sans-serif;background:#111111;color:#E8E8E8;padding:24px;border-left:3px solid #C14A09;">
  <div style="color:#C14A09;font-size:16px;font-weight:bold;margin-bottom:16px;">
    NEW ${escapeHtml(formType).toUpperCase()} — rockstarautorepair.com
  </div>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td style="color:#999;padding:4px 12px 4px 0;width:120px;">NAME</td><td style="color:#F0F0F0;">${escapeHtml(name)}</td></tr>
    <tr><td style="color:#999;padding:4px 12px 4px 0;">PHONE</td><td><a href="tel:${escapeHtml(phone)}" style="color:#09A688;">${escapeHtml(phone)}</a></td></tr>
    <tr><td style="color:#999;padding:4px 12px 4px 0;">EMAIL</td><td><a href="mailto:${escapeHtml(email)}" style="color:#09A688;">${escapeHtml(email)}</a></td></tr>
    <tr><td style="color:#999;padding:4px 12px 4px 0;">VEHICLE</td><td style="color:#F0F0F0;">${escapeHtml(year)} ${escapeHtml(make)} ${escapeHtml(model)}</td></tr>
  </table>
  <div style="margin-top:20px;padding-top:16px;border-top:1px solid #2A2A2A;">
    <div style="color:#999;font-size:12px;margin-bottom:8px;">SERVICE NEEDED</div>
    <div style="color:#D8D8D8;white-space:pre-wrap;line-height:1.6;">${escapeHtml(service) || '<span style="color:#999;">(not provided)</span>'}</div>
  </div>
  <div style="margin-top:24px;padding-top:12px;border-top:1px solid #2A2A2A;color:#999;font-size:11px;">
    ${new Date().toISOString()} / ${escapeHtml(request.headers.get('CF-Connecting-IP') || 'unknown')}
  </div>
</div>`.trim();

    // ── Send via Resend ──
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          from:     env.FROM_ADDRESS,
          to:       [env.DESTINATION],
          reply_to: email,
          subject:  subject,
          text:     text,
          html:     html,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Resend error:', res.status, errText);
        return json({ error: 'DISPATCH_FAILED' }, 502, env);
      }

      return json({ ok: true }, 200, env);

    } catch (err) {
      console.error('Worker error:', err);
      return json({ error: 'INTERNAL' }, 500, env);
    }
  }
};

// ── Helpers ──

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin':  env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age':       '86400',
  };
}

function json(obj, status, env) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(env),
    },
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
