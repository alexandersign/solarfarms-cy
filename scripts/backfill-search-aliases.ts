/**
 * Backfill search_aliases for all existing pv_prospects rows.
 * Run once after the migration, then the sync scripts keep it current.
 *
 * Usage: npx tsx scripts/backfill-search-aliases.ts
 */
import { supabase } from '../lib/supabase'
import { buildSearchAliases } from '../lib/greek-translit'

async function main() {
  let from = 0
  const pageSize = 500
  let updated = 0

  for (;;) {
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('id, company_name, contact_name, parent_group')
      .range(from, from + pageSize - 1)
    if (error) throw error
    if (!data || data.length === 0) break

    for (const row of data as { id: string; company_name?: string; contact_name?: string; parent_group?: string }[]) {
      const aliases = buildSearchAliases(row.company_name, row.contact_name, row.parent_group)
      const { error: ue } = await supabase
        .from('pv_prospects')
        .update({ search_aliases: aliases })
        .eq('id', row.id)
      if (!ue) updated++
    }
    console.log(`  updated ${updated} rows so far…`)
    if (data.length < pageSize) break
    from += pageSize
  }
  console.log(`Done: search_aliases backfilled on ${updated} rows.`)
}

main().catch(e => { console.error(e); process.exit(1) })
