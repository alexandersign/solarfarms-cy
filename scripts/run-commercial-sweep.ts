/**
 * Multi-city warehouse sweep (OSM + PVGIS + Hunter in Python) — dry-run, no emails.
 *
 * Usage:
 *   npx tsx scripts/run-commercial-sweep.ts
 *   npx tsx scripts/run-commercial-sweep.ts --limit 25
 */

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { setTimeout as sleep } from 'timers/promises'

const SWEEP_DIR = path.join(process.cwd(), 'docs', 'solar-prospects')
const PYTHON = process.platform === 'win32' ? 'python' : 'python3'

const CITIES: { city: string; radius: number; limit: number }[] = [
  { city: 'Limassol', radius: 12_000, limit: 22 },
  { city: 'Nicosia', radius: 12_000, limit: 22 },
  { city: 'Larnaca', radius: 10_000, limit: 18 },
  { city: 'Paphos', radius: 9_000, limit: 15 },
]

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name)
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

function sweepFilesBefore(): Set<string> {
  if (!fs.existsSync(SWEEP_DIR)) return new Set()
  return new Set(fs.readdirSync(SWEEP_DIR).filter((f) => f.startsWith('solar-sweep-') && f.endsWith('.csv')))
}

async function main() {
  const limitOverride = arg('--limit', '')
  const before = sweepFilesBefore()
  const created: string[] = []

  console.log('Commercial warehouse sweep (dry-run, no emails)\n')

  for (const { city, radius, limit } of CITIES) {
    const lim = limitOverride ? parseInt(limitOverride, 10) : limit
    console.log(`\n=== ${city} · radius ${radius}m · limit ${lim} ===\n`)
    try {
      execSync(
        `${PYTHON} scripts/solar-prospect-sweep.py --city "${city}" --radius ${radius} --limit ${lim} --sector warehouse --dry-run --min-roof 200`,
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: process.platform === 'win32' ? 'powershell.exe' : '/bin/sh',
          env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' },
        }
      )
    } catch {
      console.warn(`Sweep failed or partial for ${city}`)
    }
    await sleep(8000)
    const after = sweepFilesBefore()
    for (const f of after) {
      if (!before.has(f)) {
        created.push(path.join(SWEEP_DIR, f))
        before.add(f)
      }
    }
  }

  if (!created.length) {
    console.error('\nNo new CSV files produced')
    process.exit(1)
  }

  const merged = path.join(
    SWEEP_DIR,
    `solar-sweep-merged-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.csv`
  )
  execSync(
    `npx tsx scripts/merge-solar-sweep-csvs.ts --out "${merged}" ${created.map((f) => `"${f}"`).join(' ')}`,
    { cwd: process.cwd(), stdio: 'inherit', shell: true }
  )

  console.log(`\nMerged sweep ready: ${merged}`)
  console.log('Next: npm run commercial:hunter && npm run commercial:sync-crm')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
