/**
 * Upsert off-registry CRM prospects (wind hybrid, TSO-only BESS, etc.) into pv_prospects.
 *
 * Usage:
 *   npx tsx scripts/sync-off-registry-to-crm.ts
 *   npx tsx scripts/sync-off-registry-to-crm.ts --dry-run
 */

import { getOffRegistryProspects } from '../lib/crm-off-registry-prospects'
import { supabase, type PvProspect } from '../lib/supabase'

function companyKey(name: string): string {
  return name.trim().toUpperCase().replace(/\s+/g, ' ')
}

async function fetchExisting(): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('id, company_name')
      .range(from, from + pageSize - 1)
    if (error) throw error
    if (!data?.length) break
    for (const r of data as { id: string; company_name?: string }[]) {
      if (r.company_name) {
        const k = companyKey(r.company_name)
        if (!map.has(k)) map.set(k, r.id)
      }
    }
    if (data.length < pageSize) break
  }
  return map
}

/** Intelligence fields refreshed on each run; CRM workflow fields preserved on update. */
const PRESERVE_ON_UPDATE = new Set([
  'outreach_status',
  'notes',
  'next_follow_up',
  'first_contact_date',
  'last_contact_date',
  'assigned_to',
  'assigned_name',
  'contact_name',
  'contact_email',
  'contact_phone',
  'tags',
])

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const prospects = getOffRegistryProspects()
  const existing = await fetchExisting()

  const toInsert: Partial<PvProspect>[] = []
  const toUpdate: { id: string; patch: Partial<PvProspect> }[] = []

  for (const row of prospects) {
    const key = companyKey(row.company_name!)
    const id = existing.get(key)
    const intel: Partial<PvProspect> = { ...row, updated_at: new Date().toISOString() }

    if (id) {
      const patch = { ...intel }
      for (const k of PRESERVE_ON_UPDATE) delete (patch as Record<string, unknown>)[k]
      toUpdate.push({ id, patch })
    } else {
      toInsert.push({
        ...intel,
        outreach_status: row.outreach_status || 'new',
        tags: row.tags,
      })
    }
  }

  console.log(`Off-registry prospects: ${prospects.length}`)
  console.log(`  Insert: ${toInsert.length} · Update: ${toUpdate.length}`)

  if (dryRun) {
    prospects.forEach((p) => console.log(`  · ${p.company_name} [${p.priority}] ${p.connection_terms_status || ''}`))
    console.log('DRY RUN — no writes')
    return
  }

  for (const row of toInsert) {
    const { error } = await supabase.from('pv_prospects').insert(row)
    if (error) console.error(`Insert ${row.company_name}:`, error.message)
    else console.log(`  + ${row.company_name}`)
  }

  for (const u of toUpdate) {
    const { error } = await supabase.from('pv_prospects').update(u.patch).eq('id', u.id)
    if (error) console.error(`Update ${u.id}:`, error.message)
    else console.log(`  ↻ ${u.patch.company_name}`)
  }

  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
