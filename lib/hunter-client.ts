/**
 * Minimal Hunter.io v2 client (account, domain-search, email-finder, verifier).
 * Uses global fetch (Node 18+). Throws HunterError with the HTTP status on failure.
 */

const BASE = 'https://api.hunter.io/v2'

export class HunterError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'HunterError'
    this.status = status
  }
}

async function hunterGet<T>(pathAndQuery: string, apiKey: string): Promise<T> {
  const sep = pathAndQuery.includes('?') ? '&' : '?'
  const url = `${BASE}${pathAndQuery}${sep}api_key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) {
    let detail = ''
    try {
      const j = await res.json()
      detail = j?.errors?.[0]?.details || ''
    } catch {
      /* ignore */
    }
    throw new HunterError(`Hunter ${res.status} ${detail}`.trim(), res.status)
  }
  return (await res.json()) as T
}

export interface HunterAccount {
  email?: string
  plan_name?: string
  searches_used: number
  searches_available: number
  verifications_used: number
  verifications_available: number
}

export async function hunterAccount(apiKey: string): Promise<HunterAccount | null> {
  const data = await hunterGet<{ data?: any }>(`/account`, apiKey)
  const d = data.data
  if (!d) return null
  return {
    email: d.email,
    plan_name: d.plan_name,
    searches_used: d.requests?.searches?.used || 0,
    searches_available: d.requests?.searches?.available || 0,
    verifications_used: d.requests?.verifications?.used || 0,
    verifications_available: d.requests?.verifications?.available || 0,
  }
}

export interface HunterEmail {
  value: string
  type?: string // 'personal' | 'generic'
  confidence?: number
  first_name?: string
  last_name?: string
  position?: string
  phone_number?: string
  linkedin?: string
}

export interface HunterDomainSearch {
  domain?: string
  organization?: string
  emails: HunterEmail[]
}

export async function hunterDomainSearch(
  domain: string,
  apiKey: string
): Promise<HunterDomainSearch> {
  const data = await hunterGet<{ data?: any }>(
    `/domain-search?domain=${encodeURIComponent(domain)}`,
    apiKey
  )
  const d = data.data || {}
  return {
    domain: d.domain,
    organization: d.organization,
    emails: (d.emails || []).map((e: any) => ({
      value: e.value,
      type: e.type,
      confidence: e.confidence,
      first_name: e.first_name,
      last_name: e.last_name,
      position: e.position,
      phone_number: e.phone_number,
      linkedin: e.linkedin,
    })),
  }
}

export interface HunterEmailFinder {
  email?: string
  score?: number // confidence 0-100
  first_name?: string
  last_name?: string
  position?: string
  phone_number?: string
  linkedin_url?: string
  verification_status?: string
}

export async function hunterEmailFinder(
  domain: string,
  firstName: string,
  lastName: string,
  apiKey: string
): Promise<HunterEmailFinder | null> {
  const data = await hunterGet<{ data?: any }>(
    `/email-finder?domain=${encodeURIComponent(domain)}&first_name=${encodeURIComponent(
      firstName
    )}&last_name=${encodeURIComponent(lastName)}`,
    apiKey
  )
  const d = data.data
  if (!d || !d.email) return null
  return {
    email: d.email,
    score: d.score,
    first_name: d.first_name,
    last_name: d.last_name,
    position: d.position,
    phone_number: d.phone_number,
    linkedin_url: d.linkedin_url,
    verification_status: d.verification?.status,
  }
}

export interface HunterVerification {
  result?: string // 'deliverable' | 'undeliverable' | 'risky' | 'unknown'
  score?: number
  status?: string
  disposable?: boolean
  webmail?: boolean
}

export async function hunterVerify(
  email: string,
  apiKey: string
): Promise<HunterVerification | null> {
  const data = await hunterGet<{ data?: any }>(
    `/email-verifier?email=${encodeURIComponent(email)}`,
    apiKey
  )
  const d = data.data
  if (!d) return null
  return {
    result: d.result,
    score: d.score,
    status: d.status,
    disposable: d.disposable,
    webmail: d.webmail,
  }
}

/** Split a registry director name into first/last for Hunter email-finder. */
export function splitDirectorName(name: string): { first: string; last: string } | null {
  // drop single-letter initials and legal noise
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !/^[A-Za-z]\.?$/.test(t))
  if (parts.length < 2) return null
  return { first: parts[0], last: parts[parts.length - 1] }
}
