/**
 * Remove clearly wrong scraped emails (wrong domain vs SPV name).
 */
import * as fs from 'fs'
import * as path from 'path'
import { emailMatchesCompany } from '../lib/contact-discovery'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')

const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
let fixed = 0
for (const p of data.plants || []) {
  if (
    p.contact_email &&
    p.contact_email_source !== 'manual_override' &&
    p.contact_email_source !== 'employer_public' &&
    !emailMatchesCompany(p.contact_email, p.company_name)
  ) {
    console.log(`  clear ${p.company_name}: ${p.contact_email}`)
    delete p.contact_email
    if (p.contact_email_source === 'website_scrape' || p.contact_email_source === 'google_places') {
      delete p.contact_email_source
    }
    fixed++
  }
}
fs.writeFileSync(PLANTS_JSON, JSON.stringify(data, null, 2))
console.log(`Cleared ${fixed} bad emails`)
