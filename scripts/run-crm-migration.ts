import { supabase } from '../lib/supabase'

async function main() {
  // Check if columns already exist
  const { data, error } = await supabase
    .from('pv_prospects')
    .select('assigned_to, assigned_name')
    .limit(1)

  if (!error) {
    console.log('Columns already exist — no migration needed.')
    return
  }

  console.log('Adding assigned_to + assigned_name columns via Supabase REST...')
  // Supabase anon key cannot run DDL directly — print instructions
  console.log('\nPlease run this in your Supabase SQL Editor:')
  console.log(`
ALTER TABLE pv_prospects
  ADD COLUMN IF NOT EXISTS assigned_to   TEXT,
  ADD COLUMN IF NOT EXISTS assigned_name TEXT;

CREATE INDEX IF NOT EXISTS idx_pv_prospects_assigned
  ON pv_prospects(assigned_to);
  `)
  console.log('Then re-run this script to confirm.')
}
main()
