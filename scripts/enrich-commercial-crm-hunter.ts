/**
 * Hunter.io email enrichment for commercial CRM rows (live Supabase).
 *
 * Queries pv_prospects where:
 *   segment = 'commercial' AND company_website IS NOT NULL AND contact_email IS NULL
 *
 * For each row, does a Hunter domain search and patches contact_email + email_confidence.
 *
 * Usage:
 *   npx tsx scripts/enrich-commercial-crm-hunter.ts
 *   npx tsx scripts/enrich-commercial-crm-hunter.ts --limit 30
 *   npx tsx scripts/enrich-commercial-crm-hunter.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import { supabase } from '../lib/supabase'
import { hunterAccount, hunterDomainSearch, type HunterEmail } from '../lib/hunter-client'

// Load .env.local so HUNTER_API_KEY is available
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(process.cwd(), envFile)
  if (!fs.existsSync(envPath)) continue
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  break
}

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name)
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

function extractDomain(url: string): string | null {
  try {
    const u = url.startsWith('http') ? url : `https://${url}`
    const host = new URL(u).hostname.replace(/^www\./, '')
    return host.includes('.') ? host : null
  } catch {
    return null
  }
}

function pickEmail(emails: HunterEmail[]): { email: string; confidence: number } | null {
  if (!emails.length) return null
  const sorted = [...emails].sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
  const generic = sorted.find((e) =>
    /^(info|contact|sales|office|admin|hello|support)@/i.test(e.value)
  )
  const best = generic || sorted[0]
  return { email: best.value, confidence: best.confidence || 0 }
}

async function main() {
  const apiKey = process.env.HUNTER_API_KEY
  if (!apiKey) {
    console.error('HUNTER_API_KEY missing in .env.local')
    process.exit(1)
  }

  const limit = parseInt(arg('--limit', '50'), 10)
  const dryRun = process.argv.includes('--dry-run')

  // Check Hunter quota first
  const acct = await hunterAccount(apiKey)
  if (acct) {
    console.log(
      `Hunter: ${acct.searches_used}/${acct.searches_available} searches used · ${acct.plan_name || 'plan'}`
    )
    if ((acct.searches_available || 0) < 1) {
      console.error('No Hunter searches remaining this month.')
      process.exit(1)
    }
  }

  // Fetch commercial CRM rows that have a website but no email
  const { data, error } = await supabase
    .from('pv_prospects')
    .select('id, company_name, company_website, contact_email, email_confidence')
    .eq('segment', 'commercial')
    .not('company_website', 'is', null)
    .is('contact_email', null)
    .order('priority', { ascending: false })
    .limit(limit)

  if (error) throw error

  const rows = (data || []) as {
    id: string
    company_name?: string
    company_website?: string
    contact_email?: string
    email_confidence?: number
  }[]

  console.log(`CRM rows to enrich: ${rows.length} (limit ${limit})`)
  if (rows.length === 0) {
    console.log('Nothing to do — all website rows already have emails.')
    return
  }

  let enriched = 0, notFound = 0, errors = 0

  for (const r of rows) {
    const site = (r.company_website || '').trim()
    const domain = extractDomain(site)
    if (!domain) {
      console.log(`  - ${r.company_name}: cannot extract domain from "${site}"`)
      notFound++
      continue
    }

    if (dryRun) {
      console.log(`  [dry] ${r.company_name} → ${domain}`)
      continue
    }

    try {
      const res = await hunterDomainSearch(domain, apiKey)
      const found = pickEmail(res.emails)
      if (found) {
        const { error: ue } = await supabase
          .from('pv_prospects')
          .update({ contact_email: found.email, email_confidence: found.confidence })
          .eq('id', r.id)
        if (ue) {
          console.error(`  ✗ ${r.company_name}: DB update failed — ${ue.message}`)
          errors++
        } else {
          enriched++
          console.log(`  ✓ ${r.company_name}: ${found.email} (conf: ${found.confidence}%)`)
        }
      } else {
        notFound++
        console.log(`  - ${r.company_name} (${domain}): no emails found`)
      }
    } catch (e) {
      errors++
      console.log(`  ✗ ${r.company_name}: ${String(e)}`)
    }

    await sleep(1100) // ~1 req/s — stay within Hunter rate limits
  }

  console.log(`\nDone: ${enriched} enriched, ${notFound} not found, ${errors} errors`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
