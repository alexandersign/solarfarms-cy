/**
 * Corporate service firms (accountants / lawyers / nominee secretaries) that
 * register and administer many unrelated SPVs. Their domains and phones are
 * NOT the developer's contact and must be demoted / rejected.
 *
 * Two layers:
 *   1. Seed blocklist (observed during enrichment).
 *   2. Auto-detection: any domain/phone shared across N unrelated developer
 *      groups is almost certainly a shared service firm.
 */

/** Seed list of known service-firm / unrelated domains. */
export const SERVICE_FIRM_DOMAINS = new Set([
  'greenenergy.com.cy',
  'ioannoualternative.com',
  'fivecomply.com',
  'fivered.com.cy',
  'yoda.com.cy',
  'vassiliko.com',
  'arisfc.com',
  'sidesunny.com',
  'socool.cy',
  'thylensolar.com',
  'epiphaniou.com',
  'oneroyal.eu',
  'cypenergia.com',
  'synenergia.com.cy',
  'gkupgradenergy.com.cy',
  // own company — never a prospect contact
  'lighthief.com',
  'lighthief.cy',
  'lighthief.energy',
  'solarfarms.cy',
])

/** Seed list of known service-firm phone fragments (digits only). */
export const SERVICE_FIRM_PHONES = new Set([
  '77770050', // Lighthief
  '7770050',
])

export function digitsOnly(phone?: string | null): string {
  return (phone || '').replace(/\D/g, '')
}

export function isServiceFirmDomain(domain?: string | null): boolean {
  if (!domain) return false
  const d = domain.toLowerCase().replace(/^www\./, '')
  if (SERVICE_FIRM_DOMAINS.has(d)) return true
  for (const known of SERVICE_FIRM_DOMAINS) {
    if (d === known || d.endsWith(`.${known}`)) return true
  }
  return false
}

export function isServiceFirmEmail(email?: string | null): boolean {
  if (!email) return false
  const domain = email.split('@')[1]
  return isServiceFirmDomain(domain)
}

export function isServiceFirmPhone(phone?: string | null): boolean {
  const d = digitsOnly(phone)
  if (!d) return false
  for (const frag of SERVICE_FIRM_PHONES) {
    if (d.includes(frag)) return true
  }
  return false
}

/**
 * Auto-detect shared service firms from a list of (groupId, domain/phone)
 * pairs. A domain/phone appearing across >= threshold distinct groups is a
 * shared service firm.
 */
export function detectSharedServiceFirms(
  entries: { groupId: string; domain?: string; phone?: string }[],
  threshold = 3
): { domains: Set<string>; phones: Set<string> } {
  const domainGroups = new Map<string, Set<string>>()
  const phoneGroups = new Map<string, Set<string>>()

  for (const e of entries) {
    if (e.domain) {
      const d = e.domain.toLowerCase().replace(/^www\./, '')
      if (!domainGroups.has(d)) domainGroups.set(d, new Set())
      domainGroups.get(d)!.add(e.groupId)
    }
    if (e.phone) {
      const p = digitsOnly(e.phone)
      if (p.length >= 6) {
        if (!phoneGroups.has(p)) phoneGroups.set(p, new Set())
        phoneGroups.get(p)!.add(e.groupId)
      }
    }
  }

  const domains = new Set<string>()
  for (const [d, gs] of domainGroups) if (gs.size >= threshold) domains.add(d)
  const phones = new Set<string>()
  for (const [p, gs] of phoneGroups) if (gs.size >= threshold) phones.add(p)
  return { domains, phones }
}
