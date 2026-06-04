/**
 * Contact discovery without Hunter.io — website scrape, domain guess, email patterns.
 * Used by enrich-prospects Stage 3 and utility SPV outreach.
 */

import * as cheerio from 'cheerio'
import * as dns from 'dns/promises'
import * as https from 'https'
import * as http from 'http'
import {
  isServiceFirmDomain,
  isServiceFirmEmail,
  isServiceFirmPhone,
} from './cyprus-service-firms'

const SKIP_EMAIL_DOMAINS = new Set([
  'example.com',
  'sentry.io',
  'wixpress.com',
  'schema.org',
  'w3.org',
  'google.com',
  'facebook.com',
  'instagram.com',
  'youtube.com',
])

export function cleanCompanyNameForDomain(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+(ltd|limited|λτδ|plc|cyprus|κύπρου)\.?$/gi, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 40)
}

export function domainCandidatesFromCompany(companyName: string): string[] {
  const slug = cleanCompanyNameForDomain(companyName)
  if (!slug || slug.length < 3) return []
  const bases = [slug]
  // First word only (e.g. GREENFIN from GREENFIN ENERGIES)
  const first = companyName.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (first && first.length >= 4 && first !== slug) bases.push(first)

  const domains: string[] = []
  for (const b of bases) {
    domains.push(`${b}.com.cy`, `${b}.cy`, `${b}.com`, `${b}.eu`)
  }
  return [...new Set(domains)]
}

const BLOCKED_PHONE_FRAGMENTS = ['77770050', '7770050']
const BLOCKED_WEBSITE_FRAGMENTS = ['lighthief', 'solarfarms.cy']

const BLOCKED_EMAIL_DOMAINS = new Set([
  'lighthief.com',
  'lighthief.cy',
  'solarfarms.cy',
  'google.com',
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
])

/** Reject scraped emails that clearly belong to another company. */
export function emailMatchesCompany(email: string, companyName: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() || ''
  if (!domain || BLOCKED_EMAIL_DOMAINS.has(domain)) return false
  if (isServiceFirmEmail(email)) return false
  const candidates = domainCandidatesFromCompany(companyName)
  for (const c of candidates) {
    const cd = c.toLowerCase()
    if (domain === cd || domain.endsWith(`.${cd}`)) return true
  }
  const slug = cleanCompanyNameForDomain(companyName)
  if (slug.length >= 5) {
    const token = slug.slice(0, Math.min(slug.length, 12))
    if (domain.includes(token)) return true
  }
  return false
}

export function isValidEmail(email: string): boolean {
  const e = email.toLowerCase().trim()
  if (!e.includes('@') || e.length > 80) return false
  const domain = e.split('@')[1]
  if (!domain || !domain.includes('.')) return false
  if (SKIP_EMAIL_DOMAINS.has(domain)) return false
  if (e.match(/\.(png|jpg|svg|gif|webp)$/)) return false
  return true
}

export async function fetchHtml(url: string, timeoutMs = 8000): Promise<string | null> {
  const normalized = url.startsWith('http') ? url : `https://${url}`
  return new Promise((resolve) => {
    const lib = normalized.startsWith('https') ? https : http
    const req = lib.get(
      normalized,
      {
        timeout: timeoutMs,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0',
          Accept: 'text/html',
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchHtml(res.headers.location, timeoutMs).then(resolve)
          return
        }
        let data = ''
        res.on('data', (c) => (data += c))
        res.on('end', () => resolve(data))
      }
    )
    req.on('error', () => resolve(null))
    req.on('timeout', () => {
      req.destroy()
      resolve(null)
    })
  })
}

const CYPRUS_PHONE_RE =
  /(?:\+357|00357|357)[\s\-]?[\d\s\-]{6,12}|(?:\+46|\+49|\+44|\+33)[\s\-]?[\d\s\-]{8,14}/g

export function scrapePhonesFromHtml(html: string): string[] {
  const found = new Set<string>()
  const $ = cheerio.load(html)
  $('a[href^="tel:"]').each((_, el) => {
    const href = $(el).attr('href') || ''
    const raw = href.replace(/^tel:/i, '').split('?')[0].trim()
    if (raw.length >= 8) found.add(raw)
  })
  for (const m of html.match(CYPRUS_PHONE_RE) || []) {
    const cleaned = m.replace(/\s+/g, ' ').trim()
    if (cleaned.length >= 10) found.add(cleaned)
  }
  return [...found]
}

export function scrapeEmailsFromHtml(html: string): string[] {
  const found = new Set<string>()
  const $ = cheerio.load(html)
  $('a[href^="mailto:"]').each((_, el) => {
    const href = $(el).attr('href') || ''
    const addr = href.replace(/^mailto:/i, '').split('?')[0].trim()
    if (isValidEmail(addr)) found.add(addr.toLowerCase())
  })
  const regex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g
  for (const m of html.match(regex) || []) {
    if (isValidEmail(m)) found.add(m.toLowerCase())
  }
  return [...found]
}

export async function scrapeContactFromWebsite(
  url: string
): Promise<{ email?: string; phone?: string }> {
  const html = await fetchHtml(url)
  if (!html) return {}
  const emails = scrapeEmailsFromHtml(html)
  const preferred = emails.find(
    (e) =>
      !e.startsWith('info@') &&
      !e.startsWith('noreply@') &&
      !e.startsWith('no-reply@')
  )
  const phones = scrapePhonesFromHtml(html)
  return {
    email: preferred || emails[0] || undefined,
    phone: phones[0],
  }
}

export async function scrapeEmailFromWebsite(url: string): Promise<string | null> {
  const r = await scrapeContactFromWebsite(url)
  return r.email || null
}

/** Check if host resolves (quick domain viability). */
export async function hostExists(domain: string): Promise<boolean> {
  try {
    await dns.resolve4(domain)
    return true
  } catch {
    try {
      await dns.resolve6(domain)
      return true
    } catch {
      return false
    }
  }
}

export async function discoverWebsiteForCompany(
  companyName: string,
  googlePlacesKey?: string
): Promise<{ website: string; source: string } | null> {
  // 1) Try guessed domains — homepage fetch
  for (const domain of domainCandidatesFromCompany(companyName)) {
    if (!(await hostExists(domain))) continue
    for (const url of [`https://${domain}`, `https://www.${domain}`]) {
      const html = await fetchHtml(url, 5000)
      if (html && html.length > 500 && !html.includes('404 Not Found')) {
        return { website: url, source: 'domain_guess' }
      }
    }
  }

  // 2) Google Places Text Search (works for some holding companies with GMB)
  if (googlePlacesKey) {
    const place = await googlePlacesTextSearch(companyName + ' Cyprus', googlePlacesKey)
    if (place?.website) return { website: place.website, source: 'google_places' }
  }

  return null
}

export async function googlePlacesTextSearch(
  textQuery: string,
  apiKey: string
): Promise<{ website?: string; phone?: string; name?: string } | null> {
  try {
    const body = JSON.stringify({ textQuery, languageCode: 'en' })
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.displayName,places.websiteUri,places.nationalPhoneNumber',
      },
      body,
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      places?: Array<{
        displayName?: { text?: string }
        websiteUri?: string
        nationalPhoneNumber?: string
      }>
    }
    const p = data.places?.[0]
    if (!p) return null
    return {
      name: p.displayName?.text,
      website: p.websiteUri,
      phone: p.nationalPhoneNumber,
    }
  } catch {
    return null
  }
}

/** Build candidate emails from director name + domain (unverified). */
export function guessEmailsFromPersonName(
  fullName: string,
  domain: string
): string[] {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length < 2 || !domain) return []
  const first = parts[0].toLowerCase().replace(/[^a-z]/g, '')
  const last = parts[parts.length - 1].toLowerCase().replace(/[^a-z]/g, '')
  if (!first || !last) return []
  const patterns = [
    `${first}.${last}@${domain}`,
    `${first}${last}@${domain}`,
    `${first[0]}.${last}@${domain}`,
    `${first}@${domain}`,
    `info@${domain}`,
    `contact@${domain}`,
    `office@${domain}`,
  ]
  return patterns.filter(isValidEmail)
}

export interface ContactDiscoveryResult {
  contact_email?: string
  contact_phone?: string
  company_website?: string
  contact_name?: string
  contact_linkedin?: string
  email_source?: string
  email_verified?: boolean
}

/**
 * Full no-Hunter pipeline for one company.
 * Pass director names from Cyprus company register (Stage 1).
 */
export async function discoverContactNoHunter(opts: {
  companyName: string
  directorNames?: string[]
  existingWebsite?: string
  googlePlacesKey?: string
}): Promise<ContactDiscoveryResult> {
  const out: ContactDiscoveryResult = {}
  let website = opts.existingWebsite?.trim()

  // Google Places — phone + website (only if result name overlaps company tokens)
  if (opts.googlePlacesKey) {
    const place = await googlePlacesTextSearch(
      opts.companyName + ' Cyprus',
      opts.googlePlacesKey
    )
    const companySlug = cleanCompanyNameForDomain(opts.companyName)
    const placeSlug = place?.name ? cleanCompanyNameForDomain(place.name) : ''
    const placesMatch =
      companySlug.length >= 4 &&
      (placeSlug.includes(companySlug.slice(0, 6)) ||
        companySlug.includes(placeSlug.slice(0, 6)))
    if (
      place?.phone &&
      placesMatch &&
      !BLOCKED_PHONE_FRAGMENTS.some((f) => place.phone!.replace(/\D/g, '').includes(f)) &&
      !isServiceFirmPhone(place.phone)
    ) {
      out.contact_phone = place.phone
    }
    if (place?.website && !website && placesMatch && !websiteIsServiceFirm(place.website)) {
      website = place.website
      out.company_website = website
      if (!out.email_source) out.email_source = 'google_places'
    }
  }

  if (!website) {
    const discovered = await discoverWebsiteForCompany(
      opts.companyName,
      opts.googlePlacesKey
    )
    if (discovered) {
      website = discovered.website
      out.company_website = website
      out.email_source = discovered.source
    }
  } else if (!out.company_website) {
    out.company_website = website
  }

  if (website) {
    const scraped = await scrapeContactFromWebsite(website)
    if (scraped.email && emailMatchesCompany(scraped.email, opts.companyName)) {
      out.contact_email = scraped.email
      out.email_source = 'website_scrape'
      out.email_verified = false
    }
    if (scraped.phone && !out.contact_phone && !isServiceFirmPhone(scraped.phone)) {
      out.contact_phone = scraped.phone
    }
    if (out.contact_email) return out
  }

  const domain = website
    ? new URL(website.startsWith('http') ? website : `https://${website}`).hostname.replace(
        /^www\./,
        ''
      )
    : domainCandidatesFromCompany(opts.companyName).find((d) => d.includes('.')) || ''

  if (domain && !isServiceFirmDomain(domain) && opts.directorNames?.length) {
    for (const name of opts.directorNames) {
      const guesses = guessEmailsFromPersonName(name, domain)
      if (guesses.length) {
        out.contact_email = guesses[0]
        out.contact_name = out.contact_name || name
        out.email_source = 'pattern_guess'
        out.email_verified = false
        return out
      }
    }
  }

  return out
}

/**
 * Normalize a Cyprus/foreign phone toward E.164-ish display form.
 * Strips URL-encoding, spaces and punctuation; maps 00xxx -> +xxx and bare
 * Cyprus 8-digit numbers -> +357. Returns '' for junk.
 */
export function normalizePhoneE164(phone?: string | null): string {
  if (!phone) return ''
  let p = decodeURIComponent(String(phone)).replace(/%20/gi, ' ').trim()
  p = p.replace(/[()\[\]]/g, ' ').replace(/\s+/g, ' ').trim()
  let digits = p.replace(/[^\d+]/g, '')
  if (digits.startsWith('00')) digits = '+' + digits.slice(2)
  if (!digits.startsWith('+')) {
    const bare = digits.replace(/\D/g, '')
    if (bare.length === 8) digits = '+357' + bare // Cyprus national number
    else if (bare.length >= 10 && bare.startsWith('357')) digits = '+' + bare
    else digits = bare ? '+' + bare : ''
  }
  const onlyDigits = digits.replace(/\D/g, '')
  if (onlyDigits.length < 8 || onlyDigits.length > 15) return ''
  return digits
}

/**
 * Contact-source confidence ranking (higher = more trustworthy). Used to
 * decide whether a newly-found contact should overwrite an existing one.
 */
export const CONTACT_SOURCE_RANK: Record<string, number> = {
  hunter_email_finder: 95,
  'hunter_email_finder+verified': 98,
  hunter_domain_search: 80,
  'hunter_domain_search+verified': 88,
  manual_override: 100,
  employer_public: 85,
  website_scrape: 60,
  google_places: 40,
  pattern_guess: 20,
}

export function contactConfidence(source?: string, hunterScore?: number): number {
  if (hunterScore != null && source?.startsWith('hunter')) return hunterScore
  if (!source) return 0
  return CONTACT_SOURCE_RANK[source] ?? 10
}

/** True when a website URL belongs to a known service firm / own company. */
export function websiteIsServiceFirm(url?: string): boolean {
  if (!url) return false
  try {
    const host = new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(
      /^www\./,
      ''
    )
    return isServiceFirmDomain(host)
  } catch {
    return BLOCKED_WEBSITE_FRAGMENTS.some((f) => url.toLowerCase().includes(f))
  }
}
