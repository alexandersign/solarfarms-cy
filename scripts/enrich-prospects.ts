/**
 * PV Prospect Enrichment Pipeline
 * 
 * Stage 1: Cyprus Company Register (Playwright) → directors, reg number, address
 * Stage 2: Hunter.io API → email addresses from company domains & person names
 * 
 * Usage:
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/enrich-prospects.ts
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/enrich-prospects.ts --stage 1
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/enrich-prospects.ts --stage 2
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/enrich-prospects.ts --limit 50
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/enrich-prospects.ts --priority urgent,high
 * 
 * Environment:
 *   HUNTER_API_KEY    Hunter.io API key (or pass via --hunter-key)
 */

import { createClient } from '@supabase/supabase-js'
import * as https from 'https'

// ─── Config ──────────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const COMPANY_REGISTER_URL = 'https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU'
const REGISTER_DELAY_MS = 2500 // Be respectful to the government site
const HUNTER_DELAY_MS = 1200

// ─── CLI Args ────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2)
  let stage: number | null = null
  let limit = 100
  let priorities: string[] = ['urgent', 'high', 'medium']
  let hunterKey = process.env.HUNTER_API_KEY || ''
  let dryRun = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--stage' && args[i + 1]) { stage = parseInt(args[i + 1]); i++ }
    if (args[i] === '--limit' && args[i + 1]) { limit = parseInt(args[i + 1]); i++ }
    if (args[i] === '--priority' && args[i + 1]) { priorities = args[i + 1].split(','); i++ }
    if (args[i] === '--hunter-key' && args[i + 1]) { hunterKey = args[i + 1]; i++ }
    if (args[i] === '--dry-run') dryRun = true
  }

  return { stage, limit, priorities, hunterKey, dryRun }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}

function fetchJSON(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'SolarFarms.cy Lead Research/1.0' }
    }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { reject(new Error(`Invalid JSON from ${url}: ${data.substring(0, 200)}`)) }
      })
      res.on('error', reject)
    }).on('error', reject)
  })
}

// Clean company name for search (remove LTD, Ltd, etc.)
function cleanForSearch(name: string): string {
  return name
    .replace(/\s+(LTD|LIMITED|PLC|PUBLIC|LLC)\.?$/i, '')
    .replace(/\s+(ΛΤΔ|ΛΙΜΙΤΕΔ|ΛΤΔ\.)$/i, '')
    .replace(/&/g, ' ')
    .replace(/[()]/g, '')
    .trim()
}

// ─── Stage 1: Cyprus Company Register Lookup ─────────────────────────────────

async function stage1_companyRegister(prospects: any[], dryRun: boolean) {
  console.log('\n══════════════════════════════════════════════')
  console.log('  STAGE 1: Cyprus Company Register Lookup')
  console.log('══════════════════════════════════════════════')

  // Process prospects that don't have directors yet, skip already-searched failures
  const toProcess = prospects.filter(p => !p.contact_name && !(p.tags && p.tags.includes('register_searched')))
  console.log(`  Prospects needing enrichment: ${toProcess.length}`)

  if (toProcess.length === 0) {
    console.log('  All prospects already have company register data. Skipping.')
    return
  }

  if (dryRun) {
    console.log('  DRY RUN: Would look up these companies:')
    toProcess.slice(0, 10).forEach(p => console.log(`    - ${p.company_name || p.plant_name}`))
    return
  }

  // Dynamic import Playwright
  let chromium: any
  try {
    const pw = await import('playwright')
    chromium = pw.chromium
  } catch {
    console.error('  Playwright not installed. Run: npx playwright install chromium')
    console.error('  Skipping Stage 1.')
    return
  }

  console.log('  Launching browser...')
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'en-US',
  })

  const page = await context.newPage()

  let enriched = 0
  let failed = 0
  let noResult = 0

  for (const prospect of toProcess) {
    const companyName = prospect.company_name || prospect.plant_name
    if (!companyName) continue

    const searchName = cleanForSearch(companyName)
    
    try {
      // Navigate to search form
      await page.goto(COMPANY_REGISTER_URL, { waitUntil: 'networkidle', timeout: 30000 })
      await sleep(1500)

      // ASP.NET WebForms IDs (verified from page inspection):
      // Name input: ctl00_cphMyMasterCentral_ucSearch_txtName
      // Go button:  ctl00_cphMyMasterCentral_ucSearch_lbtnSearch
      // Results grid: ctl00$cphMyMasterCentral$GridView1
      
      // Fill company name using Playwright's fill() which auto-clears
      try {
        await page.fill('#ctl00_cphMyMasterCentral_ucSearch_txtName', searchName, { timeout: 5000 })
      } catch {
        // Fallback to first text input
        const inputs = await page.$$('input[type="text"]')
        if (inputs.length > 0) {
          await inputs[0].fill(searchName)
        } else {
          failed++
          continue
        }
      }

      await sleep(300)

      // Click Go button via its exact ASP.NET ID
      await page.click('#ctl00_cphMyMasterCentral_ucSearch_lbtnSearch')
      
      // Wait for postback to complete
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
      await sleep(1500)

      // Extract data from the results grid
      // Grid columns: [hidden Select] | Name | HE prefix | Reg Number | Type | Name Status | Org Status
      const gridData = await page.evaluate(() => {
        const results: { name: string; regPrefix: string; regNo: string; type: string; status: string }[] = []
        // GridView rows (skip header)
        const rows = document.querySelectorAll('table[id*="GridView"] tr, table.grid tr')
        rows.forEach((row, idx) => {
          if (idx === 0) return // skip header
          const cells = row.querySelectorAll('td')
          if (cells.length >= 6) {
            results.push({
              name: (cells[1] as HTMLElement)?.innerText?.trim() || '',
              regPrefix: (cells[2] as HTMLElement)?.innerText?.trim() || '',
              regNo: (cells[3] as HTMLElement)?.innerText?.trim() || '',
              type: (cells[4] as HTMLElement)?.innerText?.trim() || '',
              status: (cells[6] as HTMLElement)?.innerText?.trim() || '',
            })
          }
        })
        return results
      })

      if (gridData.length === 0) {
        noResult++
        if (noResult <= 15) console.log(`  - ${companyName}: No results in register`)
        // Tag so we don't retry
        await supabase.from('pv_prospects').update({ tags: [...(prospect.tags || []), 'register_searched'] }).eq('id', prospect.id)
        await sleep(REGISTER_DELAY_MS)
        continue
      }

      // Pick the best match from results
      const searchUpper = companyName.toUpperCase()
      const bestMatch = gridData.find((r: any) => r.name.toUpperCase() === searchUpper) 
        || gridData.find((r: any) => r.name.toUpperCase().includes(cleanForSearch(companyName).toUpperCase()))
        || gridData[0]

      const regNo = bestMatch.regPrefix && bestMatch.regNo 
        ? `${bestMatch.regPrefix} ${bestMatch.regNo}` 
        : ''

      // Now try to click "Select" to get to the detail page for directors
      // The Select link is hidden but we can trigger the postback via JS
      let details: { address: string; directors: string[]; secretary: string } = {
        address: '', directors: [], secretary: ''
      }

      try {
        // Find the index of the best match
        const matchIdx = gridData.indexOf(bestMatch)
        
        // Trigger the ASP.NET postback for Select to load detail page
        await page.evaluate((idx: number) => {
          const fn = (window as any).__doPostBack
          if (typeof fn === 'function') {
            fn('ctl00$cphMyMasterCentral$GridView1', `Select$${idx}`)
          }
        }, matchIdx)
        
        await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {})
        await sleep(2000)

        // Extract directors from the OfficialsGrid table (data is in HTML, hidden by CSS)
        details = await page.evaluate(() => {
          const result = { address: '', directors: [] as string[], secretary: '' }

          // Directors & Secretaries table: #ctl00_cphMyMasterCentral_OfficialsGrid
          const grid = document.getElementById('ctl00_cphMyMasterCentral_OfficialsGrid')
          if (grid) {
            const rows = grid.querySelectorAll('tr.gridRow, tr.gridAlternateRow')
            rows.forEach((row: Element) => {
              const cells = row.querySelectorAll('td')
              if (cells.length >= 2) {
                const name = (cells[0] as HTMLElement).innerText.trim()
                const role = (cells[1] as HTMLElement).innerText.trim()
                if (name.length > 2) {
                  if (role.toLowerCase() === 'director') {
                    result.directors.push(name)
                  } else if (role.toLowerCase() === 'secretary') {
                    result.secretary = name
                  }
                }
              }
            })
          }

          // Address from specific spans (data is in HTML, hidden by CSS)
          const street = document.getElementById('ctl00_cphMyMasterCentral_Street')
          const building = document.getElementById('ctl00_cphMyMasterCentral_Building')
          const parish = document.getElementById('ctl00_cphMyMasterCentral_Parish')
          const territory = document.getElementById('ctl00_cphMyMasterCentral_Teritory')
          
          const addrParts = [street, building, parish, territory]
            .map(el => el?.innerText?.trim() || '')
            .filter(s => s.length > 0)
          
          if (addrParts.length > 0) {
            result.address = addrParts.join(' ').replace(/\s+/g, ' ').replace(/,\s*,/g, ',').trim()
          }

          return result
        })
      } catch {
        // Detail page failed, we still have the grid data
      }

      // Build update payload
      const updates: Record<string, any> = {}

      if (regNo) updates.company_reg_no = regNo
      if (bestMatch.status) {
        // Append company status to notes
        const statusNote = `\nCompany Status: ${bestMatch.status} (${bestMatch.type})`
        if (prospect.notes) {
          updates.notes = prospect.notes + statusNote
        } else {
          updates.notes = statusNote
        }
      }
      if (details.address) updates.registered_address = details.address
      if (details.directors.length > 0) {
        updates.contact_name = details.directors[0]
        updates.contact_title = 'Director'
        if (details.directors.length > 1) {
          updates.secondary_contact_name = details.directors[1]
          updates.secondary_contact_title = 'Director'
        }
      }

      if (Object.keys(updates).length > 0) {
        const { error: dbError } = await supabase
          .from('pv_prospects')
          .update(updates)
          .eq('id', prospect.id)

        if (dbError) {
          console.log(`  ✗ ${companyName}: DB error - ${dbError.message}`)
          failed++
        } else {
          enriched++
          const dirStr = details.directors.length > 0 ? ` | Dir: ${details.directors.slice(0, 2).join(', ')}` : ''
          console.log(`  ✓ ${companyName}: ${regNo}${dirStr}${details.address ? ' | Addr: ' + details.address.substring(0, 40) : ''}`)
        }
      } else {
        noResult++
        if (noResult <= 15) console.log(`  - ${companyName}: No data found`)
      }

      await sleep(REGISTER_DELAY_MS)

    } catch (err) {
      console.log(`  ✗ ${companyName}: ${(err as Error).message}`)
      failed++
      await sleep(REGISTER_DELAY_MS)
    }
  }

  await browser.close()

  console.log(`\n  Stage 1 Complete:`)
  console.log(`    Enriched: ${enriched}`)
  console.log(`    No result: ${noResult}`)
  console.log(`    Failed: ${failed}`)
}

// ─── Stage 2: Hunter.io Email Enrichment ─────────────────────────────────────

async function stage2_hunterEmails(prospects: any[], hunterKey: string, dryRun: boolean) {
  console.log('\n══════════════════════════════════════════════')
  console.log('  STAGE 2: Hunter.io Email Enrichment')
  console.log('══════════════════════════════════════════════')

  if (!hunterKey) {
    console.log('  No Hunter.io API key provided. Skipping.')
    console.log('  Pass via: --hunter-key YOUR_KEY or env HUNTER_API_KEY')
    return
  }

  // Check Hunter.io account status
  try {
    const account = await fetchJSON(`https://api.hunter.io/v2/account?api_key=${hunterKey}`)
    if (account.data) {
      const { requests } = account.data
      console.log(`  Hunter.io account:`)
      console.log(`    Searches used:  ${requests.searches?.used || 0} / ${requests.searches?.available || 0}`)
      console.log(`    Verifs used:    ${requests.verifications?.used || 0} / ${requests.verifications?.available || 0}`)
      
      const searchesLeft = (requests.searches?.available || 0) - (requests.searches?.used || 0)
      if (searchesLeft <= 0) {
        console.log('  No searches remaining this month. Skipping.')
        return
      }
      console.log(`    Searches left:  ${searchesLeft}`)
    }
  } catch (err) {
    console.log(`  Warning: Could not check account: ${(err as Error).message}`)
  }

  // Process prospects that have company names but no email
  const toProcess = prospects.filter(p => 
    !p.contact_email && 
    (p.company_name || p.plant_name)
  )
  console.log(`  Prospects needing emails: ${toProcess.length}`)

  if (toProcess.length === 0) {
    console.log('  All prospects already have emails. Skipping.')
    return
  }

  if (dryRun) {
    console.log('  DRY RUN: Would search these companies:')
    toProcess.slice(0, 10).forEach(p => console.log(`    - ${p.company_name || p.plant_name}`))
    return
  }

  let emailsFound = 0
  let noEmails = 0
  let failed = 0

  for (const prospect of toProcess) {
    const companyName = prospect.company_name || prospect.plant_name
    if (!companyName) continue

    try {
      // Strategy 1: If we have a website domain, use Domain Search
      if (prospect.company_website) {
        const domain = new URL(prospect.company_website).hostname.replace('www.', '')
        const result = await fetchJSON(
          `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&api_key=${hunterKey}`
        )

        if (result.data?.emails?.length > 0) {
          const bestEmail = result.data.emails.find((e: any) => e.type === 'personal') || result.data.emails[0]
          const updates: Record<string, any> = {
            contact_email: bestEmail.value,
          }
          
          if (bestEmail.first_name && bestEmail.last_name && !prospect.contact_name) {
            updates.contact_name = `${bestEmail.first_name} ${bestEmail.last_name}`
          }
          if (bestEmail.position && !prospect.contact_title) {
            updates.contact_title = bestEmail.position
          }
          if (bestEmail.linkedin && !prospect.contact_linkedin) {
            updates.contact_linkedin = bestEmail.linkedin
          }
          if (bestEmail.phone_number && !prospect.contact_phone) {
            updates.contact_phone = bestEmail.phone_number
          }

          // If there's a second email, add as secondary
          if (result.data.emails.length > 1 && !prospect.secondary_contact_email) {
            const second = result.data.emails[1]
            updates.secondary_contact_email = second.value
            if (second.first_name && second.last_name) {
              updates.secondary_contact_name = `${second.first_name} ${second.last_name}`
            }
            if (second.position) {
              updates.secondary_contact_title = second.position
            }
          }

          await supabase.from('pv_prospects').update(updates).eq('id', prospect.id)
          emailsFound++
          console.log(`  ✓ ${companyName}: ${bestEmail.value}${bestEmail.position ? ` (${bestEmail.position})` : ''}`)
          await sleep(HUNTER_DELAY_MS)
          continue
        }
      }

      // Strategy 2: Use Email Finder if we have a person name + company
      if (prospect.contact_name) {
        const nameParts = prospect.contact_name.trim().split(/\s+/)
        const firstName = nameParts[0]
        const lastName = nameParts.slice(1).join(' ')

        if (firstName && lastName) {
          // Try to find company domain first
          const domain = prospect.company_website 
            ? new URL(prospect.company_website).hostname.replace('www.', '')
            : null

          if (domain) {
            const result = await fetchJSON(
              `https://api.hunter.io/v2/email-finder?domain=${encodeURIComponent(domain)}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&api_key=${hunterKey}`
            )

            if (result.data?.email) {
              const updates: Record<string, any> = {
                contact_email: result.data.email,
              }
              if (result.data.linkedin_url && !prospect.contact_linkedin) {
                updates.contact_linkedin = result.data.linkedin_url
              }
              if (result.data.phone_number && !prospect.contact_phone) {
                updates.contact_phone = result.data.phone_number
              }

              await supabase.from('pv_prospects').update(updates).eq('id', prospect.id)
              emailsFound++
              console.log(`  ✓ ${companyName}: ${result.data.email} (via email-finder)`)
              await sleep(HUNTER_DELAY_MS)
              continue
            }
          }
        }
      }

      // Strategy 3: Company name search (for companies without domains)
      const companySearchName = cleanForSearch(companyName) + ' Cyprus'
      const result = await fetchJSON(
        `https://api.hunter.io/v2/domain-search?company=${encodeURIComponent(companySearchName)}&api_key=${hunterKey}`
      )

      if (result.data?.emails?.length > 0) {
        const bestEmail = result.data.emails[0]
        const updates: Record<string, any> = {
          contact_email: bestEmail.value,
        }

        if (bestEmail.first_name && bestEmail.last_name && !prospect.contact_name) {
          updates.contact_name = `${bestEmail.first_name} ${bestEmail.last_name}`
        }
        if (bestEmail.position && !prospect.contact_title) {
          updates.contact_title = bestEmail.position
        }
        if (bestEmail.linkedin && !prospect.contact_linkedin) {
          updates.contact_linkedin = bestEmail.linkedin
        }

        // Capture the domain/website
        if (result.data.domain && !prospect.company_website) {
          updates.company_website = `https://${result.data.domain}`
        }

        await supabase.from('pv_prospects').update(updates).eq('id', prospect.id)
        emailsFound++
        console.log(`  ✓ ${companyName}: ${bestEmail.value} (via company search)`)
      } else {
        noEmails++
        if (noEmails <= 20) {
          console.log(`  - ${companyName}: No emails found`)
        }
      }

      await sleep(HUNTER_DELAY_MS)

    } catch (err) {
      const errMsg = (err as Error).message
      if (errMsg.includes('429') || errMsg.includes('rate')) {
        console.log(`  ⚠ Rate limited. Waiting 60 seconds...`)
        await sleep(60000)
      } else if (errMsg.includes('401') || errMsg.includes('403')) {
        console.log(`  ✗ Hunter.io authentication error. Check API key.`)
        break
      } else {
        console.log(`  ✗ ${companyName}: ${errMsg}`)
        failed++
      }
      await sleep(HUNTER_DELAY_MS)
    }
  }

  console.log(`\n  Stage 2 Complete:`)
  console.log(`    Emails found: ${emailsFound}`)
  console.log(`    No results:   ${noEmails}`)
  console.log(`    Failed:       ${failed}`)
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { stage, limit, priorities, hunterKey, dryRun } = parseArgs()

  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  PV Prospect Enrichment Pipeline                        ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log(`  Mode:       ${dryRun ? 'DRY RUN' : 'LIVE'}`)
  console.log(`  Stage:      ${stage || 'All (1 + 2)'}`)
  console.log(`  Limit:      ${limit} prospects`)
  console.log(`  Priorities: ${priorities.join(', ')}`)
  console.log(`  Hunter.io:  ${hunterKey ? 'Key provided' : 'No key (Stage 2 will skip)'}`)
  console.log('')

  // Fetch prospects from Supabase, prioritized
  console.log('  Fetching prospects from Supabase...')
  
  const { data: allProspects, error } = await supabase
    .from('pv_prospects')
    .select('*')
    .in('priority', priorities)
    .not('outreach_status', 'in', '("won","lost","not_interested")')
    .order('capacity_mwp', { ascending: false })
    .limit(limit)

  if (error) {
    console.error(`  Failed to fetch prospects: ${error.message}`)
    process.exit(1)
  }

  const prospects = allProspects || []
  console.log(`  Loaded ${prospects.length} prospects`)
  
  const withoutContact = prospects.filter(p => !p.contact_name).length
  const withoutEmail = prospects.filter(p => !p.contact_email).length
  const withoutRegNo = prospects.filter(p => !p.company_reg_no).length
  
  console.log(`    Without contact name: ${withoutContact}`)
  console.log(`    Without email:        ${withoutEmail}`)
  console.log(`    Without reg number:   ${withoutRegNo}`)

  // Run stages
  if (!stage || stage === 1) {
    await stage1_companyRegister(prospects, dryRun)
  }

  if (!stage || stage === 2) {
    // Re-fetch prospects to get updated data from Stage 1
    let prospectsForStage2 = prospects
    if (!stage) {
      const { data: refreshed } = await supabase
        .from('pv_prospects')
        .select('*')
        .in('priority', priorities)
        .not('outreach_status', 'in', '("won","lost","not_interested")')
        .order('capacity_mwp', { ascending: false })
        .limit(limit)
      prospectsForStage2 = refreshed || prospects
    }
    
    await stage2_hunterEmails(prospectsForStage2, hunterKey, dryRun)
  }

  console.log('\n══════════════════════════════════════════════')
  console.log('  ENRICHMENT COMPLETE')
  console.log('══════════════════════════════════════════════')
  console.log('  View results at: /admin/prospects')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
