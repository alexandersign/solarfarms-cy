/**
 * Late-stage Ragelia parks — listing cards only (no investor teaser yet).
 * Source: parks-for-sale/Ragelia_George-Balatsos/RAGELIA-PORTFOLIO-ANALYSIS.md
 */

export type LateStageTier = 'tier2_late' | 'tier3_mid'

export interface RageliaLateStagePark {
  slug: string
  parkId: string
  referenceCode: string
  publicTitle: string
  publicLocation: string
  summary: string
  capacityMW: number
  bessLabel: string | null
  askingPriceEUR: number
  tier: LateStageTier
  tierLabel: string
  rtbTarget: string
  highlights: string[]
}

export const RAGELIA_LATE_STAGE_PARKS: RageliaLateStagePark[] = [
  {
    slug: 'ragelia-2402',
    parkId: '#2402',
    referenceCode: 'RAGELIA-2402-2026',
    publicTitle: 'Agrivoltaic Solar Park #2402 with BESS — 0.95 MWp',
    publicLocation: 'Nicosia District, Cyprus',
    summary:
      'Tier 2 late-stage agrivoltaic asset with 0.95 MW / 1.9 MWh BESS in licence. Preliminary grid filed; RTB target Q4 2026. Data room on milestone.',
    capacityMW: 0.95,
    bessLabel: '0.95 MW / 1.9 MWh',
    askingPriceEUR: 380_000,
    tier: 'tier2_late',
    tierLabel: 'Tier 2 — Late stage (~70–85%)',
    rtbTarget: 'Q4 2026',
    highlights: [
      'Agrivoltaic — dual-use solar + agriculture',
      'BESS already in CERA licence (1.9 MWh)',
      'Preliminary grid application submitted',
      '100% SPV share purchase structure',
    ],
  },
  {
    slug: 'ragelia-2501',
    parkId: '#2501',
    referenceCode: 'RAGELIA-2501-2026',
    publicTitle: 'Solar Park #2501 with BESS — 0.95 MWp',
    publicLocation: 'Nicosia District, Cyprus',
    summary:
      'Tier 2 late-stage ground-mounted PV with 0.4 MW / 2.0 MWh BESS in licence. Preliminary grid filed; RTB target Q4 2026.',
    capacityMW: 0.95,
    bessLabel: '0.4 MW / 2.0 MWh',
    askingPriceEUR: 380_000,
    tier: 'tier2_late',
    tierLabel: 'Tier 2 — Late stage (~70–85%)',
    rtbTarget: 'Q4 2026',
    highlights: [
      'BESS sized for arbitrage / peak-shifting',
      'Leasehold — registered, zero encumbrances',
      'Preliminary grid application submitted',
      'Indicative asking €380,000',
    ],
  },
  {
    slug: 'ragelia-2502',
    parkId: '#2502',
    referenceCode: 'RAGELIA-2502-2026',
    publicTitle: 'Agrivoltaic Solar Park #2502 with BESS — 2.765 MWp',
    publicLocation: 'Nicosia District, Cyprus',
    summary:
      'Tier 3 mid-stage agrivoltaic development with 1.2 MW / 2.4 MWh BESS. Grid application not yet filed; RTB target Q1 2027.',
    capacityMW: 2.765,
    bessLabel: '1.2 MW / 2.4 MWh',
    askingPriceEUR: 1_106_000,
    tier: 'tier3_mid',
    tierLabel: 'Tier 3 — Mid stage (~40–60%)',
    rtbTarget: 'Q1 2027',
    highlights: [
      'Largest late-stage asset in portfolio',
      'Agrivoltaic ground-mounted PV',
      'BESS in licence (2.4 MWh)',
      'Grid application to be submitted',
    ],
  },
]

const BY_SLUG = new Map(RAGELIA_LATE_STAGE_PARKS.map((p) => [p.slug, p]))

export function getLateStageParkBySlug(slug: string): RageliaLateStagePark | undefined {
  return BY_SLUG.get(slug)
}

export function getLateStageSlugs(): string[] {
  return RAGELIA_LATE_STAGE_PARKS.map((p) => p.slug)
}
