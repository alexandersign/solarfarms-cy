/**
 * Cyprus Company Register enrichment for commercial CRM prospects.
 *
 * For GMB-matched businesses that look like registered companies (contain "Ltd",
 * "Limited", "ΛΤΔ", or are a known brand name), look them up in the Cyprus
 * e-filing register via Playwright and write back:
 *   - contact_name  (first director)
 *   - company_reg_no
 *   - registered_address
 *
 * Reuses the same lookupCompanyRegister() used by the developer pipeline.
 *
 * Usage:
 *   npx tsx scripts/enrich-commercial-crm-register.ts
 *   npx tsx scripts/enrich-commercial-crm-register.ts --limit 20
 *   npx tsx scripts/enrich-commercial-crm-register.ts --dry-run
 *   npx tsx scripts/enrich-commercial-crm-register.ts --all   # skip Ltd filter
 */

import { supabase } from '../lib/supabase'
import { lookupCompanyRegister } from '../lib/cyprus-company-register'

const REGISTER_DELAY_MS = 3000

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name)
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

/** Returns true if the business name is likely a registered company. */
function looksLikeCompany(name: string): boolean {
  return /\b(Ltd|Limited|LTD|ΛΤΔ|Λιμιτεδ|LLC|PLC|S\.A\.|Co\.)\b/.test(name)
}

async function main() {
  const limit = parseInt(arg('--limit', '30'), 10)
  const dryRun = process.argv.includes('--dry-run')
  const all = process.argv.includes('--all') // skip Ltd filter

  // Fetch commercial CRM rows missing contact_name, not "Commercial Site" placeholders
  const { data, error } = await supabase
    .from('pv_prospects')
    .select('id, company_name, contact_name, company_reg_no, registered_address')
    .eq('segment', 'commercial')
    .is('contact_name', null)
    .not('company_name', 'ilike', 'Commercial Site%')
    .order('priority', { ascending: false })
    .limit(limit * 3) // fetch more, then filter down
  if (error) throw error

  const candidates = ((data || []) as {
    id: string
    company_name?: string
    contact_name?: string
    company_reg_no?: string
    registered_address?: string
  }[]).filter((r) => {
    if (!r.company_name) return false
    if (all) return true
    return looksLikeCompany(r.company_name)
  }).slice(0, limit)

  console.log(`Commercial CRM candidates for register lookup: ${candidates.length}`)
  if (candidates.length === 0) {
    console.log('No candidates found. Try --all to attempt all named businesses.')
    return
  }

  if (dryRun) {
    candidates.forEach((r) => console.log(`  [dry] ${r.company_name}`))
    return
  }

  const pw = await import('playwright')
  const browser = await pw.chromium.launch({
    headless: true,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0',
  })

  let enriched = 0, missed = 0

  for (const r of candidates) {
    const companyName = r.company_name!
    try {
      const reg = await lookupCompanyRegister(page, companyName)
      if (reg && reg.directors.length) {
        const patch: Record<string, unknown> = {
          contact_name: reg.directors[0],
          contact_title: 'Director',
        }
        if (!r.company_reg_no && reg.company_reg_no) patch.company_reg_no = reg.company_reg_no
        if (!r.registered_address && reg.registered_address) patch.registered_address = reg.registered_address

        const { error: ue } = await supabase
          .from('pv_prospects')
          .update(patch)
          .eq('id', r.id)

        if (ue) {
          console.error(`  ✗ ${companyName}: DB update failed — ${ue.message}`)
          missed++
        } else {
          enriched++
          console.log(
            `  ✓ ${companyName}: ${reg.directors[0]} | ${reg.company_reg_no}` +
            (reg.directors.length > 1 ? ` (+ ${reg.directors.length - 1} more directors)` : '')
          )
        }
      } else {
        missed++
        console.log(`  - ${companyName}: not found in register`)
      }
    } catch (e) {
      missed++
      console.error(`  ✗ ${companyName}: ${(e as Error).message}`)
    }
    await sleep(REGISTER_DELAY_MS)
  }

  await browser.close()
  console.log(`\nDone: ${enriched} enriched, ${missed} missed`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
