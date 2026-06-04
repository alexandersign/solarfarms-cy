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

const OFFER_LINES: Record<string, string> = {
  'PV O&M':
    'With your plant now operational, our O&M team can take over performance monitoring, preventive maintenance, and availability guarantees — and assess a BESS retrofit to capture curtailed energy.',
  'PV EPC':
    'As your project moves through construction, we can deliver the EPC turnkey — engineering, procurement, grid connection and commissioning — on a fixed, bankable basis.',
  'BESS EPC':
    'We design and build grid-scale battery storage (BESS) turnkey, from sizing and procurement to commissioning and grid compliance.',
  'Hybrid EPC (PV + BESS)':
    'For your co-located PV + storage project we offer a single turnkey EPC package — solar and BESS engineered, built and commissioned together for the best economics.',
  'PV O&M + BESS O&M':
    'We provide combined O&M for your solar and storage assets — one accountable partner for availability, performance and warranty management.',
}

const DEFAULT_OFFER_LINE =
  'Whether your project is in construction or already operating, we can support it with turnkey EPC, long-term O&M, or a BESS solution tailored to your site.'

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

  const senderName  = opts.senderName  || 'Alexander Papacosta'
  const senderTitle = opts.senderTitle || 'Director'
  const senderEmail = opts.senderEmail || DEFAULT_REPLY_TO
  const senderPhone = opts.senderPhone || '+357 99 164 158'

  const html = tpl
    .replace(/\{\{CONTACT_NAME\}\}/g, esc(contactName))
    .replace(/\{\{COMPANY\}\}/g, esc(company))
    .replace(/\{\{GREETING_LINE\}\}/g, greeting)
    .replace(/\{\{OFFER_LINE\}\}/g, esc(offerLine))
    .replace(/\{\{SENDER_NAME\}\}/g, esc(senderName))
    .replace(/\{\{SENDER_TITLE\}\}/g, esc(senderTitle))
    .replace(/\{\{SENDER_EMAIL\}\}/g, esc(senderEmail))
    .replace(/\{\{SENDER_PHONE\}\}/g, esc(senderPhone))
    .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : '#')
    .replace(/\{\{YEAR\}\}/g, String(new Date().getFullYear()))

  const subject = `Lighthief — EPC, O&M & BESS for ${company}`
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
