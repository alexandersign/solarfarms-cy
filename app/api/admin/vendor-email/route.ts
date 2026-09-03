import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { getVendorById, getPrimaryContact } from '@/lib/vendor-contacts'
import * as fs from 'fs'
import * as path from 'path'

// ────────────────────── Rate Limiting ──────────────────────────
const sendLog: { ts: number; to: string; by: string }[] = []
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  // Purge old entries
  while (sendLog.length > 0 && sendLog[0].ts < cutoff) sendLog.shift()
  const recentByUser = sendLog.filter(e => e.by === identifier).length
  return recentByUser < RATE_LIMIT_MAX
}

// ───────────────── Auth (dual: admin key OR bess cookie) ──────
function authenticate(request: NextRequest): { ok: boolean; identity: string } {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey && adminKey === process.env.ADMIN_SECRET_KEY) {
    return { ok: true, identity: 'admin-key' }
  }

  const bessCookie = request.cookies.get('bess-project-auth')
  const BESS_PASSWORD = 'BessCyprus2026'
  const expectedToken = Buffer.from(`bess-project-auth-${BESS_PASSWORD}-valid`).toString('base64')
  if (bessCookie?.value === expectedToken) {
    return { ok: true, identity: 'bess-session' }
  }

  return { ok: false, identity: 'none' }
}

// ──────────────────── POST: Send document email ───────────────
export async function POST(request: NextRequest) {
  const auth = authenticate(request)
  if (!auth.ok) {
    return NextResponse.json(
      { error: 'Unauthorized — valid admin key or BESS project session required' },
      { status: 401 }
    )
  }

  if (!checkRateLimit(auth.identity)) {
    return NextResponse.json(
      { error: `Rate limited — max ${RATE_LIMIT_MAX} emails per minute` },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const {
      vendor_id,
      to_email,
      to_name,
      cc,
      subject,
      document_path,
      cover_message,
      send_as_attachment,
    } = body

    if (!to_email || !subject) {
      return NextResponse.json({ error: 'to_email and subject are required' }, { status: 400 })
    }

    let documentHtml = ''
    if (document_path) {
      const fullPath = path.resolve(process.cwd(), document_path)
      if (!fullPath.startsWith(process.cwd())) {
        return NextResponse.json({ error: 'Invalid document path' }, { status: 400 })
      }
      if (!fs.existsSync(fullPath)) {
        return NextResponse.json({ error: `Document not found: ${document_path}` }, { status: 404 })
      }
      documentHtml = fs.readFileSync(fullPath, 'utf-8')
    }

    const emailHtml = buildEmail({
      to_name: to_name || '',
      subject,
      cover_message: cover_message || '',
      document_html: send_as_attachment ? '' : documentHtml,
    })

    const emailOptions: any = {
      to: to_email,
      subject,
      html: emailHtml,
      from: 'Lighthief Cyprus <noreply@solarfarms.cy>',
      replyTo: 'office@lighthief.com',
    }

    if (cc) emailOptions.cc = cc

    const result = await sendEmail(emailOptions)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Email sending failed', detail: (result as any).message },
        { status: 500 }
      )
    }

    sendLog.push({ ts: Date.now(), to: to_email, by: auth.identity })

    console.log(`[VENDOR-EMAIL] Sent to ${to_email} (${vendor_id || 'manual'}) by ${auth.identity} at ${new Date().toISOString()}`)

    return NextResponse.json({
      success: true,
      message: `Email sent to ${to_email}`,
      vendor_id: vendor_id || null,
      document: document_path || null,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('[VENDOR-EMAIL] Error:', error)
    return NextResponse.json(
      { error: 'Failed to send email', detail: error?.message },
      { status: 500 }
    )
  }
}

// ────────────────── GET: List vendors & documents ─────────────
export async function GET(request: NextRequest) {
  const auth = authenticate(request)
  if (!auth.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { VENDORS, SENDABLE_DOCUMENTS } = await import('@/lib/vendor-contacts')
  return NextResponse.json({ vendors: VENDORS, documents: SENDABLE_DOCUMENTS })
}

// ──────────────────── Email builder ───────────────────────────
function buildEmail(data: {
  to_name: string
  subject: string
  cover_message: string
  document_html: string
}): string {
  const hasDocument = !!data.document_html

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; line-height: 1.6; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 700px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; padding: 28px 36px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .header .sub { font-size: 11px; opacity: 0.6; margin-top: 4px; letter-spacing: 0.5px; }
    .body { padding: 28px 36px; }
    .body p { margin: 0 0 14px; font-size: 14px; }
    .divider { border: 0; border-top: 2px solid #e2e8f0; margin: 24px 0; }
    .document-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 20px 0; }
    .document-section h3 { margin: 0 0 16px; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 1px; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 36px; font-size: 11px; color: #6b7280; }
    .footer strong { color: #334155; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${escapeHtml(data.subject)}</h1>
      <div class="sub">LIGHTHIEF CYPRUS LTD — BESS PROJECT COMMUNICATION</div>
    </div>
    <div class="body">
      <p>Dear ${escapeHtml(data.to_name || 'Sir/Madam')},</p>
      ${data.cover_message
        ? `<p>${escapeHtml(data.cover_message)}</p>`
        : `<p>Please find the attached document for your review and response.</p>`
      }
      <p>Please do not hesitate to contact us should you require any clarification.</p>
      <p>Kind regards,<br><strong>Alexander Papacosta</strong><br>Cyprus Director — Lighthief Cyprus Ltd<br>+357 99 164 158</p>
    </div>
    ${hasDocument ? `
    <hr class="divider" />
    <div class="document-section">
      <h3>Document Content</h3>
      ${data.document_html}
    </div>
    ` : ''}
    <div class="footer">
      <strong>LIGHTHIEF CYPRUS LTD</strong><br>
      15 Agaritsis, Nektaria Court, Office 201 · 3045 Zakaki, Limassol, Cyprus<br>
      office@lighthief.com · +357 99 164 158 · solarfarms.cy<br><br>
      <em>This email and any attachments are confidential. If you are not the intended recipient, please delete and notify the sender.</em>
    </div>
  </div>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
