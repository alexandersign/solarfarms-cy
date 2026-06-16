/**
 * Merge multiple solar-sweep CSVs (dedupe by place_id or lat/lon/name).
 *
 * Usage:
 *   npx tsx scripts/merge-solar-sweep-csvs.ts --out docs/solar-prospects/solar-sweep-merged.csv file1.csv file2.csv
 *   npx tsx scripts/merge-solar-sweep-csvs.ts --today   # merge all solar-sweep-* from today
 */

import * as fs from 'fs'
import * as path from 'path'

const SWEEP_DIR = path.join(process.cwd(), 'docs', 'solar-prospects')

function parseCsv(text: string): { header: string[]; rows: Record<string, string>[] } {
  const lines: string[][] = []
  let field = ''
  let row: string[] = []
  let inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQ = false
      } else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      if (field !== '' || row.length) { row.push(field); lines.push(row); row = []; field = '' }
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); lines.push(row) }
  if (!lines.length) return { header: [], rows: [] }
  const header = lines[0]
  const rows = lines.slice(1).map((r) => {
    const o: Record<string, string> = {}
    header.forEach((h, idx) => (o[h] = r[idx] ?? ''))
    return o
  })
  return { header, rows }
}

function rowKey(r: Record<string, string>): string {
  if (r.place_id?.trim()) return `pid:${r.place_id.trim()}`
  const lat = parseFloat(r.lat || '')
  const lon = parseFloat(r.lon || '')
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    return `geo:${lat.toFixed(5)},${lon.toFixed(5)}`
  }
  return `name:${(r.name || '').trim().toUpperCase()}`
}

function escapeCsv(v: string): string {
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`
  return v
}

function writeCsv(header: string[], rows: Record<string, string>[], outPath: string) {
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(header.map((h) => escapeCsv(r[h] ?? '')).join(','))
  }
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8')
}

function main() {
  const today = process.argv.includes('--today')
  const outIdx = process.argv.indexOf('--out')
  const outPath =
    outIdx >= 0 && process.argv[outIdx + 1]
      ? process.argv[outIdx + 1]
      : path.join(SWEEP_DIR, `solar-sweep-merged-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.csv`)

  let files = process.argv.slice(2).filter((a) => !a.startsWith('--') && a.endsWith('.csv'))
  if (today) {
    const prefix = new Date().toISOString().slice(0, 10).replace(/-/g, '').slice(0, 8) // YYYYMMDD partial
    const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    files = fs
      .readdirSync(SWEEP_DIR)
      .filter((f) => f.startsWith('solar-sweep-') && f.endsWith('.csv') && f.includes(ymd.slice(2)))
      .map((f) => path.join(SWEEP_DIR, f))
  }

  if (!files.length) {
    console.error('No CSV files. Pass paths or --today')
    process.exit(1)
  }

  const byKey = new Map<string, Record<string, string>>()
  let header: string[] = []

  for (const f of files) {
    if (!fs.existsSync(f)) continue
    const { header: h, rows } = parseCsv(fs.readFileSync(f, 'utf-8'))
    if (h.length && !header.length) header = h
    for (const r of rows) {
      const k = rowKey(r)
      const prev = byKey.get(k)
      if (!prev) byKey.set(k, r)
      else {
        // prefer row with email, then larger roof
        const score = (x: Record<string, string>) =>
          (x.email_found ? 1000 : 0) + parseFloat(x.roof_area_m2 || '0')
        if (score(r) > score(prev)) byKey.set(k, r)
      }
    }
  }

  const merged = [...byKey.values()].sort(
    (a, b) => parseFloat(b.roof_area_m2 || '0') - parseFloat(a.roof_area_m2 || '0')
  )
  writeCsv(header, merged, outPath)
  console.log(`Merged ${files.length} files → ${merged.length} rows`)
  console.log(outPath)
}

main()
