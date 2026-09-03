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

const TEMPLATE_PATH            = path.join(process.cwd(), 'lib', 'crm-intro-email.html')
const COMMERCIAL_TEMPLATE_PATH = path.join(process.cwd(), 'lib', 'crm-commercial-email.html')

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

/** Curtailment pain section — always shown for BESS developer prospects. */
function curtailmentBlock(): string {
  return `
    <tr><td style="padding:14px 28px 6px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#FFF5F5;border-left:4px solid #C53030;border-radius:4px;">
        <tr><td style="padding:16px 20px;color:#222;font-size:14px;line-height:1.65;">
          <p style="margin:0 0 10px;color:#C53030;font-weight:bold;font-size:16px;">
            47% of Cyprus solar energy was wasted in 2025
          </p>
          <p style="margin:0 0 10px;">
            Curtailment hit <strong>47.44%</strong> last year — 306,000 MWh of generated solar power
            forced off the grid. Energy you paid to produce, handed back for free.
            For a 1 MW park, that translates to roughly
            <strong>€20,000–€35,000 in lost revenue every year.</strong>
          </p>
          <p style="margin:0;">
            The grid cannot absorb peak midday solar without storage. Every curtailment event
            is not a grid failure — it is a revenue leak with a known fix.
          </p>
        </td></tr>
      </table>
    </td></tr>`
}

/** Revenue models block — arbitrage, FFR, FCR in plain business language. */
function revenueModelsBlock(): string {
  return `
    <tr><td style="padding:6px 28px 6px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#F7F9FC;border:1px solid #e2e8f0;border-radius:8px;">
        <tr><td style="padding:18px 20px;color:#222;font-size:14px;line-height:1.65;">
          <p style="margin:0 0 12px;color:#C9A432;font-weight:bold;font-size:15px;">
            A battery earns in 3 ways — most park owners know none of them
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:#333;margin-bottom:4px;">
            <tr valign="top">
              <td style="padding:6px 14px 6px 0;width:22px;color:#1A365D;font-weight:bold;font-size:16px;">1.</td>
              <td style="padding:6px 0;">
                <strong>Curtailment recovery</strong> — instead of wasting your peak generation,
                charge the battery midday and export it when the grid can take it.
                Recover the 47% you are currently giving away.
              </td>
            </tr>
            <tr valign="top">
              <td style="padding:6px 14px 6px 0;width:22px;color:#1A365D;font-weight:bold;font-size:16px;">2.</td>
              <td style="padding:6px 0;">
                <strong>Price arbitrage</strong> — charge when wholesale prices are low
                (midday solar glut, ~€84/MWh average), discharge into the evening peak
                (~€203/MWh). That <strong>€119/MWh average spread</strong> is the BESS case —
                it is seasonal (wider in spring, flatter in some summer weeks).
              </td>
            </tr>
            <tr valign="top">
              <td style="padding:6px 14px 6px 0;width:22px;color:#1A365D;font-weight:bold;font-size:16px;">3.</td>
              <td style="padding:6px 0;">
                <strong>Ancillary services (FFR &amp; FCR)</strong> — TSOC pays battery
                owners to hold capacity on standby. FFR (Frequency Fast Response) is
                available now; FCR (Frequency Containment Reserve) is coming as the
                Cyprus grid matures. These are recurring payments for doing almost nothing —
                your battery sits ready and earns a retainer.
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>`
}

/** "We size it for you" block — removes the technical barrier for park owners. */
function bessSizingBlock(): string {
  return `
    <tr><td style="padding:6px 28px 6px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:linear-gradient(135deg,#1A365D 0%,#2B5FA0 100%);border-radius:8px;">
        <tr><td style="padding:18px 20px;color:#ffffff;font-size:14px;line-height:1.65;">
          <p style="margin:0 0 10px;color:#C9A432;font-weight:bold;font-size:15px;">
            "How big a battery do I need?" — We answer that for you
          </p>
          <p style="margin:0 0 10px;">
            Most park owners stall here. BESS sizing is genuinely complex — it depends on
            your curtailment profile, grid connection capacity, DSO constraints, and your
            target revenue model. The wrong size leaves money on the table; the right size
            pays for itself in 4–6 years.
          </p>
          <p style="margin:0 0 10px;">
            We run a full curtailment analysis using <strong>EAC metering data</strong> and
            our grid expertise — the same approach we use for our O&amp;M parks across
            Famagusta, Limassol and Nicosia districts.
            <strong>We bring the data; you make the decision.</strong>
          </p>
          <p style="margin:0;font-size:13px;color:#ccd8e8;">
            No cost. No obligation. Just a clear picture of what your park could earn with storage.
          </p>
        </td></tr>
      </table>
    </td></tr>`
}

/** EVE + Kehua equipment block — plain business language, no spec-sheet jargon. */
function equipmentBlock(): string {
  return `
    <tr><td style="padding:6px 28px 8px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#F7F9FC;border:1px solid #e2e8f0;border-radius:8px;">
        <tr><td style="padding:18px 20px;color:#222;font-size:14px;line-height:1.65;">
          <p style="margin:0 0 12px;color:#1A365D;font-weight:bold;font-size:15px;">
            Equipment that lasts — in plain English
          </p>

          <p style="margin:0 0 6px;"><strong style="color:#1A365D;">EVE Energy cells (314Ah LFP) — the cells inside the box</strong></p>
          <p style="margin:0 0 12px;">
            EVE is a Tier-1 manufacturer — the same LFP cells used inside the world&#39;s
            leading grid-scale storage systems. In plain terms: <strong>7,000 charge cycles at
            90% depth of discharge, with a 15-year capacity warranty.</strong>
            UL 9540A certified with zero thermal propagation — no fire risk, no chain reaction.
            Your cells will still be working and warrantied when your grandchildren inherit the park.
          </p>

          <p style="margin:0 0 6px;"><strong style="color:#1A365D;">Kehua PCS — the brain that talks to the grid</strong></p>
          <p style="margin:0;">
            Kehua&#39;s Power Conversion System is a leading grid-forming inverter.
            Grid-forming capability means the BESS does not just absorb power — it actively
            stabilises the local grid <em>during</em> curtailment events. That qualifies your
            system for premium ancillary service contracts with TSOC, not just basic curtailment relief.
          </p>
        </td></tr>
      </table>
    </td></tr>`
}

/** Legacy BESS specs block (EVE / Linyang) — kept for non-BESS angle emails. */
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

export interface CommercialRecipient extends OutreachRecipient {
  location?: string
  district?: string
  roof_area_m2?: number
  annual_savings_eur?: number
  payback_years?: number
  capacity_mwp?: number     // stored in MW — converted to kWp in template
  roof_image_url?: string
  industry?: string
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
    .replace(/\{\{CURTAILMENT_BLOCK\}\}/g, bess ? curtailmentBlock() : '')
    .replace(/\{\{REVENUE_MODELS_BLOCK\}\}/g, bess ? revenueModelsBlock() : '')
    .replace(/\{\{BESS_SIZING_BLOCK\}\}/g, bess ? bessSizingBlock() : '')
    .replace(/\{\{EQUIPMENT_BLOCK\}\}/g, bess ? equipmentBlock() : '')
    .replace(/\{\{STORAGE_BLOCK\}\}/g, bess ? '' : storageBlock())
    .replace(/\{\{PRICING_BLOCK\}\}/g, pricingBlock(bess))
    .replace(/\{\{ABOUT_BLOCK\}\}/g, aboutBlock())
    .replace(/\{\{SENDER_NAME\}\}/g, esc(senderName))
    .replace(/\{\{SENDER_TITLE\}\}/g, esc(senderTitle))
    .replace(/\{\{SENDER_EMAIL\}\}/g, esc(senderEmail))
    .replace(/\{\{SENDER_PHONE\}\}/g, esc(senderPhone))
    .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : '#')
    .replace(/\{\{YEAR\}\}/g, String(new Date().getFullYear()))

  const subject = bess
    ? `Your solar park is losing money to curtailment — here's how to recover it`
    : `Lighthief — solar EPC & O&M for ${company}`
  return { subject, html }
}

// ─── Commercial rooftop email renderer ───────────────────────────────────────

function formatEur(n: number): string {
  if (n >= 1000) return `€${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `€${Math.round(n).toLocaleString()}`
}

function formatEurFull(n: number): string {
  return `€${Math.round(n).toLocaleString('en-CY')}`
}

/**
 * Bold, visual savings numbers block — the centrepiece of the commercial email.
 * Shows system size, year 1 savings, payback, 5-year savings, and the big 30-year number.
 */
function savingsNumbersBlock(p: CommercialRecipient): string {
  const kWp     = p.capacity_mwp != null ? Math.round(p.capacity_mwp * 1000) : null
  const saves   = p.annual_savings_eur != null ? Math.round(p.annual_savings_eur) : null
  const pb      = p.payback_years != null ? p.payback_years : null
  const saves5  = saves ? Math.round(saves * 5) : null
  // 25 productive years beyond payback period (lifetime ~30yrs, conservative productive calc)
  const lifetime = saves ? Math.round(saves * 25) : null
  const roof    = p.roof_area_m2 != null ? Math.round(p.roof_area_m2) : null

  if (!kWp && !saves) {
    return `
    <tr><td style="padding:6px 28px 12px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:linear-gradient(135deg,#f0f7ff 0%,#e8f4f0 100%);border:1px solid #c8ddf0;border-radius:8px;">
        <tr><td style="padding:20px 22px;">
          <p style="margin:0 0 8px;color:#1A365D;font-weight:bold;font-size:15px;">Your personalised savings estimate</p>
          <p style="margin:0;color:#555;font-size:14px;">Available on request — contact us for a free roof assessment and savings projection.</p>
        </td></tr>
      </table>
    </td></tr>`
  }

  const bigNumber = lifetime
    ? `<td style="padding:12px 0 12px 16px;text-align:center;border-left:2px solid #c8ddf0;">
        <p style="margin:0 0 4px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Over 25 productive years</p>
        <p style="margin:0;color:#059669;font-size:34px;font-weight:bold;line-height:1.1;">${formatEurFull(lifetime)}</p>
        <p style="margin:4px 0 0;color:#059669;font-size:11px;font-weight:bold;">TOTAL LIFETIME SAVINGS</p>
      </td>`
    : ''

  const metaRows: string[] = []
  if (kWp)    metaRows.push(`<tr><td style="padding:5px 0;color:#666;font-size:14px;width:60%;">System size</td><td style="padding:5px 0;font-weight:bold;font-size:14px;">${kWp} kWp</td></tr>`)
  if (roof)   metaRows.push(`<tr><td style="padding:5px 0;color:#666;font-size:14px;">Roof area assessed</td><td style="padding:5px 0;font-size:14px;">${roof.toLocaleString()} m²</td></tr>`)
  if (saves)  metaRows.push(`<tr><td style="padding:5px 0;color:#666;font-size:14px;">Year 1 savings</td><td style="padding:5px 0;font-weight:bold;font-size:14px;color:#059669;">${formatEurFull(saves)}</td></tr>`)
  if (pb)     metaRows.push(`<tr><td style="padding:5px 0;color:#666;font-size:14px;">Payback period</td><td style="padding:5px 0;font-weight:bold;font-size:14px;">${pb} years</td></tr>`)
  if (saves5) metaRows.push(`<tr><td style="padding:5px 0;color:#666;font-size:14px;">Savings over 5 years</td><td style="padding:5px 0;font-weight:bold;font-size:14px;color:#059669;">${formatEurFull(saves5)}</td></tr>`)

  return `
    <tr><td style="padding:6px 28px 12px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:linear-gradient(135deg,#f0f7ff 0%,#e8f4f0 100%);border:1px solid #c8ddf0;border-radius:8px;">
        <tr><td style="padding:20px 22px;">
          <p style="margin:0 0 14px;color:#1A365D;font-weight:bold;font-size:15px;">
            We ran the numbers on your building{{COMPANY_SUFFIX}}
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr valign="top">
              <td style="width:${lifetime ? '55%' : '100%'};">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${metaRows.join('')}
                </table>
              </td>
              ${bigNumber}
            </tr>
          </table>
          <p style="margin:12px 0 0;color:#7a869a;font-size:11px;">
            Based on satellite roof assessment and current EAC commercial tariffs.
            Solar systems carry a 30-year lifespan — lifetime savings use 25 productive years.
            Final figures subject to on-site survey.
          </p>
        </td></tr>
      </table>
    </td></tr>`
}

function roofImageBlock(url?: string): string {
  if (!url) return ''
  // Ensure absolute URL
  const src = url.startsWith('/') ? `https://solarfarms.cy${url}` : url
  return `
    <tr>
      <td style="padding:0;line-height:0;font-size:0;background:#e8f0f7;">
        <img src="${src}" alt="Satellite roof assessment — ${url}" width="620"
          style="width:100%;max-width:620px;height:auto;max-height:220px;display:block;object-fit:cover;" />
      </td>
    </tr>`
}

export function renderCommercialEmail(
  p: CommercialRecipient,
  opts: {
    baseUrl: string
    senderName?: string
    senderTitle?: string
    senderEmail?: string
    senderPhone?: string
  }
): RenderedEmail {
  const tpl = fs.readFileSync(COMMERCIAL_TEMPLATE_PATH, 'utf-8')

  const contactName = p.contact_name?.trim() || 'there'
  const company     = p.company_name?.trim() || 'your business'
  const address     = p.location?.trim() || ''
  const addressSuffix = address ? ` in ${address}` : ''
  const addressLine   = address ? ` at <strong>${esc(address)}</strong>` : ''

  const senderName  = opts.senderName  || 'Alexander Papacosta'
  const senderTitle = opts.senderTitle || 'Director'
  const senderEmail = opts.senderEmail || DEFAULT_REPLY_TO
  const senderPhone = opts.senderPhone || '+357 99 164 158'

  // Computed savings figures
  const annualSavings = p.annual_savings_eur != null ? Math.round(p.annual_savings_eur) : null
  const savings5yr    = annualSavings ? Math.round(annualSavings * 5) : null
  const lifetimeSavings = annualSavings ? Math.round(annualSavings * 25) : null

  // Build the savings numbers block (renders {{COMPANY_SUFFIX}} internally)
  const numbersBlock = savingsNumbersBlock(p)
    .replace(/\{\{COMPANY_SUFFIX\}\}/g, company !== 'your business' ? ` — ${esc(company)}` : '')

  const html = tpl
    .replace(/\{\{CONTACT_NAME\}\}/g,         esc(contactName))
    .replace(/\{\{COMPANY\}\}/g,              esc(company))
    .replace(/\{\{COMPANY_ENCODED\}\}/g,      encodeURIComponent(company))
    .replace(/\{\{ADDRESS_SUFFIX\}\}/g,       esc(addressSuffix))
    .replace(/\{\{ADDRESS_LINE\}\}/g,         addressLine)
    .replace(/\{\{ANNUAL_SAVINGS_EUR\}\}/g,   annualSavings ? formatEurFull(annualSavings) : '')
    .replace(/\{\{SAVINGS_5YR_EUR\}\}/g,      savings5yr ? formatEurFull(savings5yr) : '')
    .replace(/\{\{LIFETIME_SAVINGS_EUR\}\}/g, lifetimeSavings ? formatEurFull(lifetimeSavings) : '')
    .replace(/\{\{SAVINGS_NUMBERS_BLOCK\}\}/g, numbersBlock)
    .replace(/\{\{ROOF_IMAGE_BLOCK\}\}/g,     roofImageBlock(p.roof_image_url))
    .replace(/\{\{SENDER_NAME\}\}/g,          esc(senderName))
    .replace(/\{\{SENDER_TITLE\}\}/g,         esc(senderTitle))
    .replace(/\{\{SENDER_EMAIL\}\}/g,         esc(senderEmail))
    .replace(/\{\{SENDER_PHONE\}\}/g,         esc(senderPhone))
    .replace(/\{\{UNSUBSCRIBE_URL\}\}/g,      p.id ? buildUnsubscribeUrl(opts.baseUrl, p.id) : '#')
    .replace(/\{\{YEAR\}\}/g,                 String(new Date().getFullYear()))

  const subject = company !== 'your business'
    ? `${esc(company)}: we ran the numbers on your roof`
    : p.annual_savings_eur
      ? `Electricity doesn't have to be your biggest cost — Lighthief Cyprus`
      : `Free rooftop solar savings estimate — Lighthief Cyprus`

  return { subject, html }
}

export async function sendCommercialEmail(
  p: CommercialRecipient,
  opts: { baseUrl: string; replyTo?: string; senderName?: string; senderTitle?: string; senderEmail?: string; senderPhone?: string }
): Promise<SendResult> {
  const resend = getResend()
  if (!resend) return { id: p.id, ok: false, error: 'RESEND_API_KEY not configured' }
  if (!p.contact_email) return { id: p.id, ok: false, skipped: 'no_email' }

  const { subject, html } = renderCommercialEmail(p, opts)
  const bccSender = opts.senderEmail && opts.senderEmail !== DEFAULT_REPLY_TO ? [opts.senderEmail] : undefined
  try {
    const { error } = await resend.emails.send({
      from: OUTREACH_FROM,
      to: [p.contact_email],
      replyTo: opts.replyTo || opts.senderEmail || DEFAULT_REPLY_TO,
      bcc: bccSender,    // copy to sending rep
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
  const bccSender = opts.senderEmail && opts.senderEmail !== DEFAULT_REPLY_TO ? [opts.senderEmail] : undefined
  try {
    const { error } = await resend.emails.send({
      from: OUTREACH_FROM,
      to: [p.contact_email],
      replyTo: opts.replyTo || opts.senderEmail || DEFAULT_REPLY_TO,
      bcc: bccSender,    // copy to sending rep
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
      bcc: opts.senderEmail ? [opts.senderEmail] : undefined,  // copy to sending rep
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
