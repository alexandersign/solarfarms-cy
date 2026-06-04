/**
 * Hunter.io enrichment at the DEVELOPER level (not the SPV shell).
 *
 * For each developer group that has a resolved developer_domain:
 *   1. domain-search  -> organisation + team emails
 *   2. email-finder   -> each director's email on that domain
 *   3. email-verifier -> deliverability score
 * Writes best_contact_* + confidence onto the group, and propagates the
 * verified contact to every member SPV row in cyprus-energy-plants.json.
 *
 * Usage:
 *   npx tsx scripts/enrich-cyprus-developers-hunter.ts --min-spvs 2
 *   npx tsx scripts/enrich-cyprus-developers-hunter.ts --min-spvs 2 --limit 10 --force
 *   npx tsx scripts/enrich-cyprus-developers-hunter.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  hunterAccount,
  hunterDomainSearch,
  hunterEmailFinder,
  hunterVerify,
  splitDirectorName,
  HunterError,
  type HunterEmail,
} from '../lib/hunter-client'
import { isServiceFirmEmail } from '../lib/cyprus-service-firms'
import type { DeveloperGroup } from '../lib/cyprus-developer-groups'

// load env
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

const GROUPS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-developer-groups.json')
const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const DELAY_MS = 1200

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function arg(name: string, fallback: number): number {
  const i = process.argv.indexOf(name)
  if (i >= 0 && process.argv[i + 1]) return parseInt(process.argv[i + 1], 10)
  return fallback
}

interface Candidate {
  email: string
  name?: string
  position?: string
  phone?: string
  linkedin?: string
  confidence: number // 0-100
  source: string
}

async function main() {
  const apiKey = process.env.HUNTER_API_KEY || ''
  const minSpvs = arg('--min-spvs', 2)
  const limit = arg('--limit', 1000)
  const force = process.argv.includes('--force')
  const dryRun = process.argv.includes('--dry-run')

  if (!apiKey) {
    console.error('Missing HUNTER_API_KEY in .env.local')
    process.exit(1)
  }
  if (!fs.existsSync(GROUPS_JSON)) {
    console.error('Missing', GROUPS_JSON, '— run npm run cyprus:cluster + cyprus:developer-domains')
    process.exit(1)
  }

  // account / credits
  try {
    const acct = await hunterAccount(apiKey)
    if (acct) {
      const searchesLeft = acct.searches_available - acct.searches_used
      const verifsLeft = acct.verifications_available - acct.verifications_used
      console.log(`Hunter account: ${acct.email || ''} (${acct.plan_name || 'plan'})`)
      console.log(`  Searches left: ${searchesLeft} · Verifications left: ${verifsLeft}`)
      if (searchesLeft <= 0 && !dryRun) {
        console.log('  No searches remaining. Aborting (upgrade plan or wait for monthly reset).')
        return
      }
      if (searchesLeft <= 0) {
        console.log('  (dry-run continues; live run would abort until credits reset)')
      }
    }
  } catch (e) {
    console.log(`  Warning: could not read account: ${(e as Error).message}`)
  }

  const data = JSON.parse(fs.readFileSync(GROUPS_JSON, 'utf-8'))
  const groups: DeveloperGroup[] = data.groups || []

  const queue = groups
    .filter((g) => g.spv_count >= minSpvs)
    .filter((g) => g.developer_domain)
    .filter((g) => force || !g.best_contact_email)
    .slice(0, limit)

  console.log(`Hunter enrichment: ${queue.length} groups with a developer domain`)

  if (dryRun) {
    queue.forEach((g) =>
      console.log(`  ${g.brand} @ ${g.developer_domain} — ${g.directors.length} directors`)
    )
    return
  }

  let enriched = 0
  for (const g of queue) {
    const domain = g.developer_domain!
    const candidates: Candidate[] = []

    try {
      // 1. domain-search
      const ds = await hunterDomainSearch(domain, apiKey)
      if (ds.organization && !g.developer_name_resolved) {
        g.developer_name_resolved = ds.organization
      }
      const personal = ds.emails
        .filter((e: HunterEmail) => e.value && !isServiceFirmEmail(e.value))
        .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
      for (const e of personal.slice(0, 3)) {
        candidates.push({
          email: e.value,
          name: [e.first_name, e.last_name].filter(Boolean).join(' ') || undefined,
          position: e.position,
          phone: e.phone_number,
          linkedin: e.linkedin,
          confidence: e.confidence || 0,
          source: 'hunter_domain_search',
        })
      }
      await sleep(DELAY_MS)

      // 2. email-finder per director
      for (const dir of g.directors.slice(0, 3)) {
        const split = splitDirectorName(dir)
        if (!split) continue
        try {
          const ef = await hunterEmailFinder(domain, split.first, split.last, apiKey)
          if (ef?.email && !isServiceFirmEmail(ef.email)) {
            candidates.push({
              email: ef.email,
              name: [ef.first_name, ef.last_name].filter(Boolean).join(' ') || dir,
              position: ef.position,
              phone: ef.phone_number,
              linkedin: ef.linkedin_url,
              confidence: ef.score || 0,
              source: 'hunter_email_finder',
            })
          }
        } catch (e) {
          if (e instanceof HunterError && (e.status === 401 || e.status === 403)) throw e
        }
        await sleep(DELAY_MS)
      }

      if (candidates.length === 0) {
        console.log(`  - ${g.brand} @ ${domain}: no emails`)
        continue
      }

      // 3. pick best (prefer email-finder/director match, then confidence)
      candidates.sort((a, b) => {
        const af = a.source === 'hunter_email_finder' ? 1 : 0
        const bf = b.source === 'hunter_email_finder' ? 1 : 0
        return bf - af || b.confidence - a.confidence
      })
      const best = candidates[0]

      // 4. verify
      let confidence = best.confidence
      let verified = false
      try {
        const v = await hunterVerify(best.email, apiKey)
        if (v) {
          confidence = v.score ?? confidence
          verified = v.result === 'deliverable' || v.result === 'risky'
        }
        await sleep(DELAY_MS)
      } catch {
        /* keep finder confidence */
      }

      g.best_contact_email = best.email
      g.best_contact_name = best.name
      g.best_contact_phone = best.phone
      g.best_contact_linkedin = best.linkedin || g.best_contact_linkedin
      g.best_contact_confidence = confidence
      g.best_contact_source = verified ? `${best.source}+verified` : best.source

      enriched++
      console.log(
        `  ✓ ${g.brand} @ ${domain}: ${best.email} (${confidence}%${verified ? ', verified' : ''})`
      )
    } catch (e) {
      if (e instanceof HunterError && (e.status === 401 || e.status === 403)) {
        console.log('  ✗ Hunter auth error — aborting.')
        break
      }
      if (e instanceof HunterError && e.status === 429) {
        console.log('  ⚠ Rate limited — waiting 60s')
        await sleep(60000)
        continue
      }
      console.log(`  ✗ ${g.brand}: ${(e as Error).message}`)
    }
  }

  // persist groups
  data.hunterEnrichedAt = new Date().toISOString()
  fs.writeFileSync(GROUPS_JSON, JSON.stringify(data, null, 2), 'utf8')

  // propagate verified developer contacts to member SPV rows
  if (fs.existsSync(PLANTS_JSON)) {
    const pdata = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
    const plants: Record<string, unknown>[] = pdata.plants || []
    const companyToGroup = new Map<string, DeveloperGroup>()
    for (const g of groups) {
      for (const c of g.companies) companyToGroup.set(c.trim().toUpperCase(), g)
    }
    let propagated = 0
    for (const p of plants) {
      const g = companyToGroup.get(String(p.company_name).trim().toUpperCase())
      if (!g) continue
      p.developer_group = g.group_id
      p.developer_domain = g.developer_domain
      if (g.best_contact_email) {
        const existingConf = (p.email_confidence as number) || 0
        const newConf = g.best_contact_confidence || 0
        // only overwrite when Hunter is more confident or no email yet
        if (!p.contact_email || newConf >= existingConf) {
          p.contact_email = g.best_contact_email
          p.email_confidence = newConf
          p.contact_email_source = g.best_contact_source
          if (g.best_contact_name) p.contact_name = g.best_contact_name
          if (g.best_contact_linkedin) p.contact_linkedin = g.best_contact_linkedin
          if (g.best_contact_phone) p.contact_phone = g.best_contact_phone
          propagated++
        }
      }
    }
    pdata.hunterPropagatedAt = new Date().toISOString()
    fs.writeFileSync(PLANTS_JSON, JSON.stringify(pdata, null, 2), 'utf8')
    console.log(`Propagated developer contacts to ${propagated} SPV rows`)
  }

  console.log(`\nDone: ${enriched}/${queue.length} groups enriched -> ${GROUPS_JSON}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
