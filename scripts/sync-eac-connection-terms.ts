/**
 * Sync confirmed EAC connection-terms matches into the CRM.
 *
 * For each unique 1:1 capacity match (one EAC entry ↔ one CERA company):
 *   - Sets connection_terms_status = 'preliminary_issued'
 *   - Appends an activity_feed entry with EAC application ref + POS date
 *   - Adds tags: eac_ref:<app_ref> and eac_pos:<date>
 *
 * Usage:
 *   npx tsx scripts/sync-eac-connection-terms.ts
 *   npx tsx scripts/sync-eac-connection-terms.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import { supabase } from '../lib/supabase'
import type { ActivityEntry } from '../lib/supabase'

const EAC_JSON  = path.join(process.cwd(), 'marketing', 'research', 'eac-res-systems.json')
const CERA_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const DRY_RUN   = process.argv.includes('--dry-run')

interface EacRow {
  district: string
  capacity_mw: number
  municipality: string
  application_ref: string
  application_date: string
  pos_issue_date: string
  pos_acceptance_date: string
}

interface CeraPlant {
  company_name: string
  pv_kw?: number
  district_en?: string
}

function roundMw(mw: number, dp = 3): number {
  return Math.round(mw * 10 ** dp) / 10 ** dp
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function main() {
  const eacData  = JSON.parse(fs.readFileSync(EAC_JSON,  'utf-8'))
  const ceraData = JSON.parse(fs.readFileSync(CERA_JSON, 'utf-8'))

  const eacRows:  EacRow[]    = eacData.systems
  const ceraPlants: CeraPlant[] = ceraData.plants

  // Index EAC by MW (3dp)
  const eacByMw = new Map<number, EacRow[]>()
  for (const r of eacRows) {
    const mw = roundMw(r.capacity_mw)
    if (!eacByMw.has(mw)) eacByMw.set(mw, [])
    eacByMw.get(mw)!.push(r)
  }

  // Index CERA by MW (3dp)
  const ceraByMw = new Map<number, CeraPlant[]>()
  for (const p of ceraPlants) {
    if (!p.pv_kw) continue
    const mw = roundMw(p.pv_kw / 1000)
    if (!ceraByMw.has(mw)) ceraByMw.set(mw, [])
    ceraByMw.get(mw)!.push(p)
  }

  // Find unique 1:1 matches
  type Match = { mw: number; eac: EacRow; ceraName: string }
  const matches: Match[] = []
  for (const [mw, eacList] of eacByMw) {
    const ceraList = ceraByMw.get(mw) || []
    if (eacList.length === 1 && ceraList.length === 1) {
      matches.push({ mw, eac: eacList[0], ceraName: ceraList[0].company_name })
    }
  }

  console.log(`Unique 1:1 EAC↔CERA matches: ${matches.length}`)
  if (DRY_RUN) console.log('DRY RUN — no writes\n')

  let updated = 0, notFound = 0, alreadyDone = 0

  for (const { mw, eac, ceraName } of matches) {
    // Find CRM row by company_name (case-insensitive prefix)
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('id, company_name, connection_terms_status, activity_feed, tags')
      .ilike('company_name', `%${ceraName.split(' ')[0]}%`)
      .eq('segment', 'developer')
      .limit(5)

    if (error) { console.error(`  ✗ ${ceraName}: ${error.message}`); continue }

    // Find best match (exact company name)
    const row = (data || []).find(
      r => r.company_name?.toUpperCase() === ceraName.toUpperCase()
    ) || data?.[0]

    if (!row) {
      console.log(`  - ${ceraName} (${mw} MW): not in CRM`)
      notFound++
      continue
    }

    if (row.connection_terms_status === 'preliminary_issued' || row.connection_terms_status === 'final_issued') {
      console.log(`  ~ ${row.company_name} (${mw} MW): already set to ${row.connection_terms_status}`)
      alreadyDone++
      continue
    }

    const posDate = eac.pos_issue_date || eac.pos_acceptance_date || '—'
    const appRef  = eac.application_ref

    console.log(`  ✓ ${row.company_name} (${mw} MW)`)
    console.log(`      EAC ref: ${appRef}  |  POS: ${posDate}  |  mun: ${eac.municipality}`)

    if (DRY_RUN) continue

    // Build activity entry
    const existingFeed: ActivityEntry[] = (row.activity_feed || []) as ActivityEntry[]
    const newEntry: ActivityEntry = {
      ts: new Date().toISOString(),
      author: 'System (EAC match)',
      type: 'system',
      body: `EAC connection terms confirmed via capacity match (${mw} MW).\nApplication ref: ${appRef}\nApplication date: ${eac.application_date || '—'}\nPOS issued: ${posDate}\nMunicipality: ${eac.municipality}`,
    }

    // Build tags (add eac_ref + eac_pos, preserve existing)
    const existingTags: string[] = (row.tags || []).filter(
      (t: string) => !t.startsWith('eac_ref:') && !t.startsWith('eac_pos:')
    )
    const newTags = [
      ...existingTags,
      `eac_ref:${appRef}`,
      `eac_pos:${posDate}`,
    ]

    const { error: ue } = await supabase
      .from('pv_prospects')
      .update({
        connection_terms_status: 'preliminary_issued',
        activity_feed: [newEntry, ...existingFeed],
        tags: newTags,
      })
      .eq('id', row.id)

    if (ue) {
      console.error(`    ✗ update failed: ${ue.message}`)
    } else {
      updated++
    }

    await sleep(200)
  }

  console.log(`\nDone: ${updated} updated, ${alreadyDone} already done, ${notFound} not in CRM`)
}

main().catch(e => { console.error(e); process.exit(1) })
