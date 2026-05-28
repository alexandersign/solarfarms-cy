import * as fs from 'fs'
import * as path from 'path'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
let n = 0
for (const row of data.plants || []) {
  const ph = String(row.contact_phone || '')
  const web = String(row.contact_website || '')
  const em = String(row.contact_email || '')
  if (
    ph.includes('77770050') ||
    em.includes('lighthief') ||
    web.includes('lighthief')
  ) {
    delete row.contact_phone
    delete row.contact_website
    if (em.includes('lighthief')) delete row.contact_email
    n++
  }
}
fs.writeFileSync(PLANTS_JSON, JSON.stringify(data, null, 2))
console.log(`Cleared Lighthief bleed on ${n} licence rows`)
