/**
 * Resolve the real operating company + domain behind each developer group.
 *
 * Strategy per group:
 *   1. firecrawl web search on director names / brand + "Cyprus solar"
 *      -> collect candidate company domains + LinkedIn URLs
 *   2. brand-based domain guess (slug + .com.cy/.cy/.com/.eu)
 *   3. Google Places text search (brand + Cyprus)
 *   Validate the chosen domain with a live host/HTML check.
 *
 * Usage:
 *   npx tsx scripts/resolve-cyprus-developer-domains.ts --min-spvs 2
 *   npx tsx scripts/resolve-cyprus-developer-domains.ts --min-spvs 2 --limit 10 --force
 *   npx tsx scripts/resolve-cyprus-developer-domains.ts --no-firecrawl
 */

import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import {
  fetchHtml,
  domainCandidatesFromCompany,
  googlePlacesTextSearch,
} from '../lib/contact-discovery'
import { isServiceFirmDomain } from '../lib/cyprus-service-firms'
import type { DeveloperGroup } from '../lib/cyprus-developer-groups'

// load env for Google key
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(process.cwd(), envFile)
  if (!fs.existsSync(envPath)) continue
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq < 1) continue
    const k = t.slice(0, eq).trim()
    let v = t.slice(eq + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1)
    if (!process.env[k]) process.env[k] = v
  }
}

const OUT_JSON = path.join(process.cwd(), 'marketing', 'cyprus-developer-groups.json')
const OVERRIDES_JSON = path.join(
  process.cwd(),
  'marketing',
  'cyprus-developer-overrides.json'
)

interface DeveloperOverride {
  group_id?: string
  brand?: string
  developer_name?: string
  developer_domain?: string
  developer_website?: string
  developer_linkedin?: string
}

function loadDeveloperOverrides(): DeveloperOverride[] {
  if (!fs.existsSync(OVERRIDES_JSON)) return []
  try {
    return JSON.parse(fs.readFileSync(OVERRIDES_JSON, 'utf-8')).overrides || []
  } catch {
    return []
  }
}

function matchOverride(
  g: DeveloperGroup,
  overrides: DeveloperOverride[]
): DeveloperOverride | undefined {
  return overrides.find(
    (o) =>
      (o.group_id && o.group_id.toLowerCase() === g.group_id.toLowerCase()) ||
      (o.brand && o.brand.toUpperCase() === g.brand.toUpperCase())
  )
}

// Domains that are never the developer's own site (social, data aggregators,
// directories, news, registries, government).
const EXCLUDE_DOMAINS = new Set([
  'linkedin.com',
  'facebook.com',
  'instagram.com',
  'twitter.com',
  'x.com',
  'youtube.com',
  'tiktok.com',
  'leadiq.com',
  'rocketreach.co',
  'zoominfo.com',
  'crunchbase.com',
  'bloomberg.com',
  'opencorporates.com',
  'companiesregistry.cy',
  'companieshousecyprus.com',
  'dnb.com',
  'pitchbook.com',
  'wikipedia.org',
  'google.com',
  'maps.google.com',
  'newprojectmedia.com',
  'pv-magazine.com',
  'pv-tech.org',
  'reuters.com',
  'renewablesnow.com',
  'balkangreenenergynews.com',
  'enfsolar.com',
  '24glo.com',
  'europa.eu',
  'theglobaleconomy.com',
  'mecdn.gov.cy',
  'cera.org.cy',
  'gov.cy',
  'glassdoor.com',
  'indeed.com',
  'kompass.com',
  'cylaw.org',
  // academic / research
  'researchgate.net',
  'academia.edu',
  'scholar.google.com',
  'semanticscholar.org',
  // Cyprus news / portals
  'i-cyprus.com',
  'cyprus-mail.com',
  'philenews.com',
  'in-cyprus.philenews.com',
  'sigmalive.com',
  'financialmirror.com',
  'stockwatch.com.cy',
  'cna.org.cy',
  'kathimerini.com.cy',
  'politis.com.cy',
  'offsite.com.cy',
  'reportingproject.net',
])

// Substrings that flag an aggregator/news/directory domain.
const EXCLUDE_SUBSTRINGS = [
  'news',
  'magazine',
  'directory',
  'registry',
  'wiki',
  'jobs',
  'philenews',
  'cyprus-mail',
]

function isExcludedDomain(domain: string): boolean {
  if (EXCLUDE_DOMAINS.has(domain)) return true
  return EXCLUDE_SUBSTRINGS.some((s) => domain.includes(s))
}

function arg(name: string, fallback: number): number {
  const i = process.argv.indexOf(name)
  if (i >= 0 && process.argv[i + 1]) return parseInt(process.argv[i + 1], 10)
  return fallback
}

function rootDomain(host: string): string {
  const h = host.replace(/^www\./, '').toLowerCase()
  // keep .com.cy / .co.uk style two-level TLDs intact
  const parts = h.split('.')
  if (parts.length <= 2) return h
  const twoLevel = ['com.cy', 'co.uk', 'com.gr', 'org.cy', 'gov.cy']
  const last2 = parts.slice(-2).join('.')
  const last3 = parts.slice(-3).join('.')
  return twoLevel.includes(last2) ? last3 : last2
}

interface FirecrawlHit {
  url: string
  host: string
  domain: string
}

function firecrawlSearch(query: string): FirecrawlHit[] {
  try {
    const out = execSync(
      `firecrawl search "${query.replace(/"/g, '')}" --limit 8`,
      { encoding: 'utf-8', timeout: 45000, stdio: ['ignore', 'pipe', 'ignore'] }
    )
    const hits: FirecrawlHit[] = []
    for (const m of out.matchAll(/URL:\s*(https?:\/\/[^\s]+)/gi)) {
      try {
        const u = new URL(m[1])
        hits.push({
          url: m[1],
          host: u.hostname.replace(/^www\./, ''),
          domain: rootDomain(u.hostname),
        })
      } catch {
        /* skip */
      }
    }
    return hits
  } catch {
    return []
  }
}

async function validateDomain(domain: string): Promise<string | null> {
  if (!domain) return null
  // Rely on an actual HTTP fetch: dns.resolve4/6 (hostExists) gives false
  // negatives behind some CDNs/resolvers even when the site loads fine.
  for (const url of [`https://${domain}`, `https://www.${domain}`]) {
    const html = await fetchHtml(url, 8000)
    if (html && html.length > 500 && !html.includes('404 Not Found')) return url
  }
  return null
}

/** "PIETER JOHAN M. GODDERIS" -> "Pieter Godderis" (drop middle initials). */
function simplifyPersonName(name: string): string {
  const parts = name
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !/^[A-Z]\.?$/.test(t)) // drop single-letter initials
  if (parts.length <= 1) return name
  return `${parts[0]} ${parts[parts.length - 1]}`
}

/** distinctive (non-generic) brand tokens for name-overlap checks */
function brandTokens(brand: string): string[] {
  return brand
    .toUpperCase()
    .split(/\s+/)
    .filter((t) => t.length >= 4)
}

function nameOverlapsBrand(placeName: string, brand: string): boolean {
  const pn = placeName.toUpperCase()
  return brandTokens(brand).some((t) => pn.includes(t))
}

async function resolveGroup(
  g: DeveloperGroup,
  useFirecrawl: boolean,
  overrides: DeveloperOverride[]
) {
  // 0. Manual override — authoritative.
  const ov = matchOverride(g, overrides)
  if (ov?.developer_domain) {
    g.developer_domain = ov.developer_domain
    g.developer_website =
      ov.developer_website || `https://${ov.developer_domain}`
    if (ov.developer_linkedin) g.developer_linkedin = ov.developer_linkedin
    g.developer_source = 'manual_override'
    return true
  }

  // 1. firecrawl. Track provenance: domains from a DIRECTOR query are only a
  //    suggestion (name collisions are common); BRAND-query domains count as
  //    authoritative only if the domain itself contains a brand token.
  const directorDomains = new Map<string, number>()
  const brandDomains = new Map<string, number>()
  let linkedinCompany: string | undefined

  if (useFirecrawl) {
    const latinDirectors = g.directors.filter((d) => /[A-Za-z]/.test(d)).slice(0, 2)

    const collect = (hits: FirecrawlHit[], target: Map<string, number>) => {
      for (const h of hits) {
        if (h.host.includes('linkedin.com')) {
          if (!linkedinCompany && /\/company\//.test(h.url)) linkedinCompany = h.url
          continue
        }
        if (isExcludedDomain(h.domain)) continue
        if (isServiceFirmDomain(h.domain)) continue
        target.set(h.domain, (target.get(h.domain) || 0) + 1)
      }
    }

    for (const d of latinDirectors) {
      collect(firecrawlSearch(`"${simplifyPersonName(d)}" Cyprus solar`), directorDomains)
    }
    collect(firecrawlSearch(`${g.brand} Cyprus solar energy developer`), brandDomains)
  }

  // 1a. brand-query domain containing a brand token — authoritative
  const tokens = brandTokens(g.brand).map((t) => t.toLowerCase())
  const rankedBrand = [...brandDomains.entries()]
    .filter(([domain]) => tokens.some((t) => domain.includes(t)))
    .sort((a, b) => b[1] - a[1])
  for (const [domain] of rankedBrand) {
    const website = await validateDomain(domain)
    if (website) {
      g.developer_domain = domain
      g.developer_website = website
      g.developer_linkedin = linkedinCompany
      g.developer_source = 'firecrawl_brand'
      return true
    }
  }

  // 1b. director-query domain — low confidence: keep as SUGGESTION only.
  const rankedDirector = [...directorDomains.entries()].sort((a, b) => b[1] - a[1])
  for (const [domain] of rankedDirector) {
    const website = await validateDomain(domain)
    if (website) {
      g.developer_domain_suggested = domain
      g.developer_suggested_source = 'firecrawl_director'
      if (linkedinCompany && !g.developer_linkedin) g.developer_linkedin = linkedinCompany
      break
    }
  }

  // 2. brand domain guess
  for (const cand of domainCandidatesFromCompany(g.brand)) {
    if (isServiceFirmDomain(cand)) continue
    const website = await validateDomain(cand)
    if (website) {
      g.developer_domain = rootDomain(cand)
      g.developer_website = website
      g.developer_linkedin = linkedinCompany
      g.developer_source = 'brand_guess'
      return true
    }
  }

  // 3. Google Places — only accept when the returned place name overlaps the
  //    brand (avoids matching the nearest unrelated solar company).
  const googleKey = process.env.GOOGLE_MAPS_KEY || process.env.GOOGLE_PLACES_KEY
  if (googleKey) {
    const place = await googlePlacesTextSearch(`${g.brand} solar Cyprus`, googleKey)
    if (place?.website && place.name && nameOverlapsBrand(place.name, g.brand)) {
      try {
        const host = new URL(place.website).hostname.replace(/^www\./, '')
        const domain = rootDomain(host)
        if (!EXCLUDE_DOMAINS.has(domain) && !isServiceFirmDomain(domain)) {
          g.developer_domain = domain
          g.developer_website = place.website
          g.developer_linkedin = linkedinCompany
          g.developer_source = 'google_places'
          return true
        }
      } catch {
        /* skip */
      }
    }
  }

  if (linkedinCompany && !g.developer_linkedin) {
    g.developer_linkedin = linkedinCompany
    g.developer_source = g.developer_source || 'linkedin_only'
  }
  return false
}

async function main() {
  const minSpvs = arg('--min-spvs', 2)
  const limit = arg('--limit', 1000)
  const force = process.argv.includes('--force')
  const useFirecrawl = !process.argv.includes('--no-firecrawl')

  if (!fs.existsSync(OUT_JSON)) {
    console.error('Missing', OUT_JSON, '— run npm run cyprus:cluster first')
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(OUT_JSON, 'utf-8'))
  const groups: DeveloperGroup[] = data.groups || []
  const overrides = loadDeveloperOverrides()

  const queue = groups
    .filter((g) => g.spv_count >= minSpvs)
    .filter((g) => force || !g.developer_domain)
    .slice(0, limit)

  console.log(
    `Resolving developer domains for ${queue.length} groups (firecrawl: ${useFirecrawl ? 'yes' : 'no'})`
  )

  let ok = 0
  for (const g of queue) {
    const found = await resolveGroup(g, useFirecrawl, overrides)
    if (found) {
      ok++
      console.log(`  ✓ ${g.brand} -> ${g.developer_domain} (${g.developer_source})`)
    } else if (g.developer_domain_suggested) {
      console.log(
        `  ? ${g.brand}: suggested ${g.developer_domain_suggested} (review — not used by Hunter)`
      )
    } else {
      console.log(`  - ${g.brand}: no domain${g.developer_linkedin ? ' (LinkedIn only)' : ''}`)
    }
  }

  data.developerDomainsResolvedAt = new Date().toISOString()
  fs.writeFileSync(OUT_JSON, JSON.stringify(data, null, 2), 'utf8')
  console.log(`\nDone: ${ok}/${queue.length} resolved -> ${OUT_JSON}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
