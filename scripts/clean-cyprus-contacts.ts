/**
 * Preventive contact hygiene for marketing/cyprus-energy-plants.json.
 * Replaces the old reactive fix-cyprus-bad-contacts.ts / fix-cyprus-lighthief-bleed.ts.
 *
 *   - normalizes phones to E.164-ish display form
 *   - drops emails whose domain doesn't match the company (unless manual/hunter/employer)
 *   - drops seed + auto-detected service-firm domains/phones/websites
 *   - auto-detects shared service firms (same domain/phone across >= N developer groups)
 *
 * Usage:
 *   npx tsx scripts/clean-cyprus-contacts.ts
 *   npx tsx scripts/clean-cyprus-contacts.ts --threshold 3 --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import { emailMatchesCompany, normalizePhoneE164, websiteIsServiceFirm } from '../lib/contact-discovery'
import {
  detectSharedServiceFirms,
  isServiceFirmEmail,
  isServiceFirmPhone,
  digitsOnly,
} from '../lib/cyprus-service-firms'
import { buildDeveloperGroups, type DeveloperGroupPlant } from '../lib/cyprus-developer-groups'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')

// sources whose email we trust even if the domain doesn't match the SPV name
const TRUSTED_EMAIL_SOURCES = new Set([
  'manual_override',
  'employer_public',
  'hunter_email_finder',
  'hunter_email_finder+verified',
  'hunter_domain_search',
  'hunter_domain_search+verified',
])

function arg(name: string, fallback: number): number {
  const i = process.argv.indexOf(name)
  if (i >= 0 && process.argv[i + 1]) return parseInt(process.argv[i + 1], 10)
  return fallback
}

function emailDomain(email?: string): string {
  return (email || '').split('@')[1]?.toLowerCase().replace(/^www\./, '') || ''
}

function main() {
  const threshold = arg('--threshold', 3)
  const dryRun = process.argv.includes('--dry-run')

  const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
  const plants: DeveloperGroupPlant[] = data.plants || []

  // map each company to a developer group id for cross-cluster detection
  const groups = buildDeveloperGroups(plants, { minScore: 0 })
  const companyToGroup = new Map<string, string>()
  for (const g of groups) {
    for (const c of g.companies) companyToGroup.set(c.trim().toUpperCase(), g.group_id)
  }

  const entries = plants.map((p) => ({
    groupId:
      companyToGroup.get(String(p.company_name).trim().toUpperCase()) ||
      String(p.company_name).trim().toUpperCase(),
    domain: emailDomain(p.contact_email) || undefined,
    phone: p.contact_phone || undefined,
  }))
  const shared = detectSharedServiceFirms(entries, threshold)
  if (shared.domains.size || shared.phones.size) {
    console.log(
      `Auto-detected shared service firms — domains: ${[...shared.domains].join(', ') || 'none'}; phones: ${[...shared.phones].join(', ') || 'none'}`
    )
  }

  let clearedEmail = 0
  let clearedPhone = 0
  let clearedWebsite = 0
  let normPhone = 0

  for (const p of plants) {
    // email hygiene
    if (p.contact_email) {
      const src = String(p.contact_email_source || '')
      const dom = emailDomain(p.contact_email)
      const isShared = shared.domains.has(dom)
      const trusted = TRUSTED_EMAIL_SOURCES.has(src)
      const bad =
        isServiceFirmEmail(p.contact_email) ||
        isShared ||
        (!trusted && !emailMatchesCompany(p.contact_email, p.company_name))
      if (bad) {
        delete p.contact_email
        delete p.contact_email_source
        delete p.email_confidence
        clearedEmail++
      }
    }

    // phone hygiene
    if (p.contact_phone) {
      const isShared = shared.phones.has(digitsOnly(p.contact_phone))
      if (isServiceFirmPhone(p.contact_phone) || isShared) {
        delete p.contact_phone
        clearedPhone++
      } else {
        const norm = normalizePhoneE164(p.contact_phone)
        if (!norm) {
          delete p.contact_phone
          clearedPhone++
        } else if (norm !== p.contact_phone) {
          p.contact_phone = norm
          normPhone++
        }
      }
    }

    // website hygiene
    if (p.contact_website && websiteIsServiceFirm(p.contact_website as string)) {
      delete p.contact_website
      clearedWebsite++
    }
  }

  console.log(
    `Cleared ${clearedEmail} emails, ${clearedPhone} phones, ${clearedWebsite} websites; normalized ${normPhone} phones`
  )

  if (dryRun) {
    console.log('DRY RUN — no file written')
    return
  }

  data.contactsCleanedAt = new Date().toISOString()
  fs.writeFileSync(PLANTS_JSON, JSON.stringify(data, null, 2), 'utf8')
  console.log(`Updated ${PLANTS_JSON}`)
}

main()
