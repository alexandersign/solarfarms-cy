/**
 * Lighthief portfolio client names for prospect deduplication.
 */

import { BATCH1_PARKS } from './portfolio-data'
import { normalizeCompanyName, tokenSetRatio } from './cyprus-name-match'

const EXTRA_CLIENT_KEYWORDS = [
  'GALASCOPE',
  'ESPERIA',
  'SPANERCOM',
  'TIMOTHEOS',
  'LAMPROS',
  'AEOLIAN',
  'ABIO',
  'FOTODROMOS',
  'AGM SUNFIELD',
  'L&T SUN',
]

export function getPortfolioClientTokens(): string[] {
  const fromParks = BATCH1_PARKS.flatMap((p) => [
    p.group?.toUpperCase() || '',
    p.name?.toUpperCase() || '',
  ])
  return [...new Set([...fromParks, ...EXTRA_CLIENT_KEYWORDS].filter(Boolean))]
}

export function matchPortfolioClient(companyName: string): {
  existing_client: boolean
  portfolio_group?: string
} {
  const norm = normalizeCompanyName(companyName)
  for (const token of getPortfolioClientTokens()) {
    const nt = normalizeCompanyName(token)
    if (!nt || nt.length < 4) continue
    if (norm.includes(nt) || tokenSetRatio(norm, nt) >= 92) {
      return { existing_client: true, portfolio_group: token }
    }
  }
  return { existing_client: false }
}
