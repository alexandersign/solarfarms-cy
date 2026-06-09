/**
 * CRM cold-outreach helper for developer/SPV prospects.
 * Renders the intro email and sends via Resend. Suppression + send-tracking
 * are stored on the prospect's `tags` array (no extra tables required):
 *   - 'unsubscribed'        -> never email again
 *   - 'intro_sent:<date>'   -> already received the intro
 */

import * as fs from 'fs'
import * as path from 'path'
import { Resend } from 'resend'
import type { PvProspect } from './supabase'

const TEMPLATE_PATH = path.join(process.cwd(), 'lib', 'crm-intro-email.html')

export const OUTREACH_FROM = 'Lighthief Cyprus <noreply@solarfarms.cy>'
export const DEFAULT_REPLY_TO = 'alexander.papacosta@lighthief.com'
export const HERO_IMAGE_URL =
  'https://solarfarms.cy/images/linyang/container-cell-racks.jpeg'

const OFFER_LINES: Record<string, string> = {
  'PV O&M':
    'With your plant now operational, our O&M team can take over performance monitoring, preventive maintenance and availability guarantees — and we can model a BESS retrofit to capture curtailed energy and add a new revenue stream.',
  'PV EPC':
    'As your project moves through construction, we can deliver the EPC turnkey — engineering, procurement, grid connection and commissioning — on a fixed, bankable basis.',
  'BESS EPC':
    'We design and build grid-scale battery energy storage turnkey — sizing, procurement, commissioning and grid-code compliance — using Tier-1 LFP technology.',
  'Hybrid EPC (PV + BESS)':
    'For your co-located PV + storage project we offer a single turnkey EPC package — solar and BESS engineered, built and commissioned together for the best project economics.',
  'PV O&M + BESS O&M':
    'We provide combined O&M for your solar and storage assets — one accountable partner for availability, performance and warranty management.',
}

const DEFAULT_OFFER_LINE =
  'Whether your project is in construction or already operating, we can support it with turnkey EPC, long-term O&M, or a battery storage (BESS) solution tailored to your site.'

/** True when the offer/angle warrants the BESS storage section. */
function isBessRelevant(target?: string, angle?: string): boolean {
  if (angle && angle !== 'none') return true
  if (!target) return false
  return /BESS|Hybrid/i.test(target)
}

/** BESS specs block (EVE / Linyang) — email-safe table row. */
function storageBlock(): string {
  return `
    <tr><td style="padding:6px 28px 8px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F9FC;border:1px solid #e2e8f0;border-radius:8px;">
        <tr><td style="padding:16px 18px;color:#222;font-size:14px;line-height:1.55;">
          <p style="margin:0 0 8px;color:#1A365D;font-weight:bold;font-size:15px;">Bankable battery storage (BESS)</p>
          <p style="margin:0 0 10px;">As exclusive EPC partner for <strong>Linyang Energy</strong> in Cyprus, we deliver containerised systems built on Tier-1 <strong>EVE 314Ah LFP cells</strong>:</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#333;">
            <tr><td style="padding:3px 0;">&#8226; UL 9540A cells, zero thermal propagation; IEC 62619 / 63056 certified</td></tr>
            <tr><td style="padding:3px 0;">&#8226; 7,000 cycles at 90% DoD, guaranteed to 70% end-of-life</td></tr>
            <tr><td style="padding:3px 0;">&#8226; ~86% AC-AC round-trip efficiency · Kehua PCS · containerised, grid-ready</td></tr>
            <tr><td style="padding:3px 0;">&#8226; Long-term O&amp;M with availability guarantee and capacity warranty</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>`
}

/** Indicative pricing block — ranges only (no internal CIF / margins). */
function pricingBlock(bess: boolean): string {
  const rows = bess
    ? `<tr><td style="padding:3px 0;">&#8226; BESS turnkey EPC — from <strong>EUR 100k–168k per MWh</strong> (scale-dependent)</td></tr>
       <tr><td style="padding:3px 0;">&#8226; Long-term BESS O&amp;M — from <strong>EUR 1,740 per MWh / year</strong></td></tr>
       <tr><td style="padding:3px 0;">&#8226; Solar EPC — from <strong>EUR 640k per MW</strong></td></tr>`
    : `<tr><td style="padding:3px 0;">&#8226; Solar EPC turnkey — from <strong>EUR 640k per MW</strong></td></tr>
       <tr><td style="padding:3px 0;">&#8226; Solar O&amp;M — competitive per-MWp annual rate with availability guarantee</td></tr>
       <tr><td style="padding:3px 0;">&#8226; Optional BESS retrofit — from <strong>EUR 100k per MWh</strong></td></tr>`
  return `
    <tr><td style="padding:6px 28px 8px;color:#222;font-size:14px;line-height:1.55;">
      <p style="margin:0 0 6px;color:#1A365D;font-weight:bold;font-size:15px;">Indicative pricing</p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;color:#333;">
        ${rows}
      </table>
      <p style="margin:8px 0 0;color:#7a869a;font-size:11px;">Indicative ranges only — final pricing depends on site, configuration and timeline.</p>
    </td></tr>`
}

/** About Lighthief / Linyang / EVE block. */
function aboutBlock(): string {
  return `
    <tr><td style="padding:6px 28px 12px;color:#444;font-size:12.5px;line-height:1.5;">
      <p style="margin:0 0 6px;"><strong>Lighthief</strong> — European-Asian renewable energy contractor; exclusive EPC partner for utility-scale BESS in Cyprus, with O&amp;M operations across 11 countries.</p>
      <p style="margin:0 0 6px;"><strong>Linyang Energy</strong> — SSE-listed battery OEM and system integrator (5 GWh+ annual capacity), supplying containerised LFP storage.</p>
      <p style="margin:0;"><strong>EVE Energy</strong> — Tier-1 manufacturer of the 314Ah LFP cells at the heart of our systems (UL 9540A, CATL-grade).</p>
    </td></tr>`
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export interface OutreachRecipient {
  id?: string
  company_name?: string
  contact_name?: string
  contact_email?: string
  primary_target?: string
  parent_group?: string
  bess_angle?: string
  tags?: string[] | null
}

export interface RenderedEmail {
  subject: string
  html: string
}

export function buildUnsubscribeUrl(baseUrl: string, id: string): string {
  return `${baseUrl.replace(/\/$/, '')}/api/crm/unsubscribe?id=${encodeURIComponent(id)}`
}

export function renderIntroEmail(
  p: OutreachRecipient,
  opts: {
    baseUrl: string
    senderName?: string
    senderTitle?: string
    senderEmail?: string
    senderPhone?: string
  }
): RenderedEmail {
  const tpl = fs.readFileSync(TEMPLATE_PATH, 'utf-8')

  const contactName = p.contact_name?.trim() || 'there'
  const company = p.company_name?.trim() || 'your company'
  const group = p.parent_group?.trim()
  const greeting = group
    ? `As the team behind ${esc(group)}, you manage one of Cyprus's notable renewable portfolios.`
    : `I am reaching out regarding ${esc(company)} and your renewable energy project in Cyprus.`
  const offerLine = (p.primary_target && OFFER_LINES[p.primary_target]) || DEFAULT_OFFER_LINE
  const bess = isBessRelevant(p.primary_target, p.bess_angle)

  const senderName  = opts.senderName  || 'Alexander Papacosta'
  const senderTitle = opts.senderTitle || 'Director'
  const senderEmail = opts.senderEmail || DEFAULT_REPLY_TO
  const senderPhone = opts.senderPhone || '+357 99 164 158'

  const html = tpl
    .replace(/\{\{HERO_IMAGE_URL\}\}/g, HERO_IMAGE_URL)
    .replace(/\{\{CONTACT_NAME\}\}/g, esc(contactName))
    .replace(/\{\{COMPANY\}\}/g, esc(company))
    .replace(/\{\{GREETING_LINE\}\}/g, greeting)
    .replace(/\{\{OFFER_LINE\}\}/g, esc(offerLine))
    .replace(/\{\{STORAGE_BLOCK\}\}/g, bess ? storageBlock() : '')
    .replace(/\{\{PRICING_BLOCK\}\}/g, pricingBlock(bess))
    .replace(/\{\{ABOUT_BLOCK\}\}/g, aboutBlock())
    .replace(/\{\{SENDER_NAME\}\}/g, esc(senderName))
    .replace(/\{\{SENDER_TITLE\}\}/g, esc(senderTitle))
    .replace(/\{\{SENDER_EMAIL\}\}/g, esc(senderEmail))
    .replace(/\{\{SENDER_PHONE\}\}/g, esc(senderPhone))
    .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : '#')
    .replace(/\{\{YEAR\}\}/g, String(new Date().getFullYear()))

  const subject = bess
    ? `Lighthief — EPC, O&M & battery storage for ${company}`
    : `Lighthief — solar EPC & O&M for ${company}`
  return { subject, html }
}

/** Suppression: skip if unsubscribed, no/invalid email. */
export function isSuppressed(p: OutreachRecipient): boolean {
  if (!p.contact_email || !p.contact_email.includes('@')) return true
  const tags = p.tags || []
  return tags.includes('unsubscribed')
}

export function alreadySent(p: OutreachRecipient): boolean {
  return (p.tags || []).some((t) => t.startsWith('intro_sent'))
}

export interface SendResult {
  id?: string
  email?: string
  ok: boolean
  skipped?: string
  error?: string
}

let resendClient: Resend | null | undefined
function getResend(): Resend | null {
  if (resendClient === undefined) {
    resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
  }
  return resendClient
}

export async function sendIntroEmail(
  p: OutreachRecipient,
  opts: { baseUrl: string; replyTo?: string; senderName?: string; senderTitle?: string; senderEmail?: string; senderPhone?: string }
): Promise<SendResult> {
  const resend = getResend()
  if (!resend) return { id: p.id, ok: false, error: 'RESEND_API_KEY not configured' }
  if (!p.contact_email) return { id: p.id, ok: false, skipped: 'no_email' }

  const { subject, html } = renderIntroEmail(p, opts)
  try {
    const { error } = await resend.emails.send({
      from: OUTREACH_FROM,
      to: [p.contact_email],
      replyTo: opts.replyTo || opts.senderEmail || DEFAULT_REPLY_TO,
      subject,
      html,
      headers: {
        'List-Unsubscribe': `<${p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : ''}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    })
    if (error) return { id: p.id, email: p.contact_email, ok: false, error: String(error) }
    return { id: p.id, email: p.contact_email, ok: true }
  } catch (e) {
    return { id: p.id, email: p.contact_email, ok: false, error: String(e) }
  }
}

/** Tag helper: add intro_sent:<date> + drop nothing. */
export function withIntroSentTag(tags: string[] | null | undefined): string[] {
  const date = new Date().toISOString().split('T')[0]
  const base = (tags || []).filter((t) => !t.startsWith('intro_sent'))
  return [...base, `intro_sent:${date}`]
}

// ─── Email sequence follow-ups ────────────────────────────────────────────────

/** Render follow-up email step 1 ("circling back" — sent ~7 days after intro). */
export function renderFollowUp1Email(
  p: OutreachRecipient,
  opts: {
    baseUrl: string
    senderName?: string
    senderTitle?: string
    senderEmail?: string
    senderPhone?: string
  }
): RenderedEmail {
  const contactName = p.contact_name?.trim() || 'there'
  const company = p.company_name?.trim() || 'your company'
  const bess = isBessRelevant(p.primary_target, p.bess_angle)

  const senderName  = opts.senderName  || 'Alexander Papacosta'
  const senderTitle = opts.senderTitle || 'Director'
  const senderEmail = opts.senderEmail || DEFAULT_REPLY_TO
  const senderPhone = opts.senderPhone || '+357 99 164 158'
  const unsubUrl    = p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : '#'

  const subject = bess
    ? `Following up — BESS & O&M for ${company}`
    : `Following up — solar EPC & O&M for ${company}`

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',system-ui,sans-serif;color:#222;background:#f0f4f8;margin:0;padding:0;">
<div style="max-width:620px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;margin-top:24px;">
  <div style="background:linear-gradient(135deg,#1A365D 0%,#2B5FA0 100%);padding:28px 32px;">
    <h1 style="color:#C9A432;margin:0;font-size:20px;">Lighthief Cyprus</h1>
    <p style="color:#ccd8e8;margin:6px 0 0;font-size:13px;">Renewable Energy &amp; Storage</p>
  </div>
  <div style="padding:32px;">
    <p style="font-size:15px;line-height:1.7;">Dear ${esc(contactName)},</p>
    <p style="font-size:15px;line-height:1.7;">I wanted to follow up on my earlier message regarding <strong>${esc(company)}</strong>. I appreciate you are busy, and I'll keep this brief.</p>
    <p style="font-size:15px;line-height:1.7;">We have been active in Cyprus renewable energy for several years and have recently completed BESS and O&amp;M contracts across the island. I believe there may be a straightforward fit between what we do and your current priorities — even a brief 15-minute call could clarify whether it makes sense to explore further.</p>
    <p style="font-size:15px;line-height:1.7;">Would any slot this week or next suit you?</p>
    <p style="font-size:15px;line-height:1.7;margin-top:28px;">Kind regards,<br>
      <strong>${esc(senderName)}</strong><br>
      <span style="color:#666;">${esc(senderTitle)}, Lighthief Cyprus Ltd</span><br>
      <a href="mailto:${esc(senderEmail)}" style="color:#1A365D;">${esc(senderEmail)}</a> | ${esc(senderPhone)}
    </p>
  </div>
  <div style="background:#f7f9fc;padding:16px 32px;font-size:11px;color:#9ca3af;text-align:center;">
    Lighthief Cyprus Ltd — HE 477423 — solarfarms.cy<br>
    <a href="${unsubUrl}" style="color:#9ca3af;">Unsubscribe</a>
  </div>
</div>
</body></html>`

  return { subject, html }
}

/** Render follow-up email step 2 ("final note" — sent ~7 days after follow-up 1). */
export function renderFollowUp2Email(
  p: OutreachRecipient,
  opts: {
    baseUrl: string
    senderName?: string
    senderTitle?: string
    senderEmail?: string
    senderPhone?: string
  }
): RenderedEmail {
  const contactName = p.contact_name?.trim() || 'there'
  const company = p.company_name?.trim() || 'your company'

  const senderName  = opts.senderName  || 'Alexander Papacosta'
  const senderTitle = opts.senderTitle || 'Director'
  const senderEmail = opts.senderEmail || DEFAULT_REPLY_TO
  const senderPhone = opts.senderPhone || '+357 99 164 158'
  const unsubUrl    = p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : '#'

  const subject = `Last note — Lighthief & ${company}`

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',system-ui,sans-serif;color:#222;background:#f0f4f8;margin:0;padding:0;">
<div style="max-width:620px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;margin-top:24px;">
  <div style="background:linear-gradient(135deg,#1A365D 0%,#2B5FA0 100%);padding:28px 32px;">
    <h1 style="color:#C9A432;margin:0;font-size:20px;">Lighthief Cyprus</h1>
    <p style="color:#ccd8e8;margin:6px 0 0;font-size:13px;">Renewable Energy &amp; Storage</p>
  </div>
  <div style="padding:32px;">
    <p style="font-size:15px;line-height:1.7;">Dear ${esc(contactName)},</p>
    <p style="font-size:15px;line-height:1.7;">This is my final note regarding <strong>${esc(company)}</strong>. I won't trouble you further after this — I understand timing is everything in this business.</p>
    <p style="font-size:15px;line-height:1.7;">If there is a better moment in the next quarter to revisit solar O&amp;M, BESS integration, or EPC services, please do reach out directly. We will be here.</p>
    <p style="font-size:15px;line-height:1.7;margin-top:28px;">With kind regards,<br>
      <strong>${esc(senderName)}</strong><br>
      <span style="color:#666;">${esc(senderTitle)}, Lighthief Cyprus Ltd</span><br>
      <a href="mailto:${esc(senderEmail)}" style="color:#1A365D;">${esc(senderEmail)}</a> | ${esc(senderPhone)}
    </p>
  </div>
  <div style="background:#f7f9fc;padding:16px 32px;font-size:11px;color:#9ca3af;text-align:center;">
    Lighthief Cyprus Ltd — HE 477423 — solarfarms.cy<br>
    <a href="${unsubUrl}" style="color:#9ca3af;">Unsubscribe</a>
  </div>
</div>
</body></html>`

  return { subject, html }
}

/** Send a sequence follow-up email (step 1 or 2) via Resend. */
export async function sendSequenceEmail(
  p: OutreachRecipient & { sequence_step?: number },
  opts: { baseUrl: string; replyTo?: string; senderName?: string; senderTitle?: string; senderEmail?: string; senderPhone?: string }
): Promise<SendResult> {
  const resend = getResend()
  if (!resend) return { id: p.id, ok: false, error: 'RESEND_API_KEY not configured' }
  if (!p.contact_email) return { id: p.id, ok: false, skipped: 'no_email' }

  const rendered =
    p.sequence_step === 2
      ? renderFollowUp2Email(p, opts)
      : renderFollowUp1Email(p, opts)

  try {
    const { error } = await resend.emails.send({
      from: OUTREACH_FROM,
      to: [p.contact_email],
      replyTo: opts.replyTo || opts.senderEmail || DEFAULT_REPLY_TO,
      subject: rendered.subject,
      html: rendered.html,
      headers: {
        'List-Unsubscribe': `<${p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : ''}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    })
    if (error) return { id: p.id, email: p.contact_email, ok: false, error: String(error) }
    return { id: p.id, email: p.contact_email, ok: true }
  } catch (e) {
    return { id: p.id, email: p.contact_email, ok: false, error: String(e) }
  }
}

/** Tag for a sequence step send: `seq_step_1:<date>` or `seq_step_2:<date>`. */
export function withSequenceStepTag(tags: string[] | null | undefined, step: number): string[] {
  const date = new Date().toISOString().split('T')[0]
  const key = `seq_step_${step}`
  const base = (tags || []).filter((t) => !t.startsWith(key))
  return [...base, `${key}:${date}`]
}
