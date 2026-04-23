/**
 * Public investment listings — hub cards, investor pack links, LOI presets.
 * Teaser/model paths are under /public (served as absolute paths from site root).
 */

import {
  AGIOS_THEODOROS_RTB as AGIOS,
  AGIOS_INVESTOR_PACK,
} from '@/lib/deals/agios-theodoros-rtb'

export type HubSection = 'deals' | 'operational_reference'

export type DealKind = 'rtb' | 'secondary_sale' | 'market_teaser'

export interface LoIPreset {
  projectName: string
  projectReference: string
  projectCapacityMW: number
  estimatedInvestment?: number
  bessIncluded?: boolean
  timeline?: string
}

export interface InvestmentListing {
  slug: string
  referenceCode: string
  hubSection: HubSection
  /** Badge / label for deals only */
  dealKind?: DealKind
  publicTitle: string
  publicLocation: string
  summary: string
  capacityMW: number
  investmentEUR?: number
  roiPercent?: number
  annualRevenueEUR?: number
  statusLabel: string
  statusColor: 'green' | 'blue' | 'yellow' | 'red'
  completionDate: string
  image: string
  highlights: string[]
  testimonial: { quote: string; client: string }
  featured: boolean
  detailRoute: string
  /** Absolute path under site root, e.g. /lighthief-cyprus/parks-for-sale/x.html */
  teaserFile?: string | null
  modelFile?: string | null
  loiPreset: LoIPreset
}

const LISTINGS: InvestmentListing[] = [
  {
    slug: 'agios-theodoros-rtb',
    referenceCode: AGIOS.referenceCode,
    hubSection: 'deals',
    dealKind: 'rtb',
    publicTitle: 'Agios Theodoros Solar Park with Battery Storage',
    publicLocation: 'Agios Theodoros, Larnaca District',
    summary:
      'Ready-to-build 2.64 MWp bifacial solar + 10.56 MWh BESS. Merchant exposure with curtailment mitigation.',
    capacityMW: AGIOS.solarMWp,
    investmentEUR: AGIOS.capexStackEUR.total,
    roiPercent: 30,
    annualRevenueEUR: AGIOS.finance.grossEnergyRevenueY1EUR,
    statusLabel: 'Ready to Build',
    statusColor: 'green',
    completionDate: AGIOS.timelineHeadline,
    image: '/images/solar-farm-aerial-unsplash.jpg',
    highlights: [
      `Integrated ${AGIOS.bessMWh} MWh BESS — ${AGIOS.bessDurationHours}-hour duration`,
      'Bifacial TopCon — strong yield',
      `Leveraged equity IRR ${AGIOS.finance.leveredEquityIrrIndicative} range (indicative)`,
      'Single operator: Lighthief EPC + O&M',
    ],
    testimonial: {
      quote:
        'Ready-to-build utility-scale project with integrated battery storage. Strong leveraged returns with conservative assumptions.',
      client: `Reference: ${AGIOS.referenceCode}`,
    },
    featured: true,
    detailRoute: '/projects/agios-theodoros-rtb',
    teaserFile: `${AGIOS_INVESTOR_PACK.basePath}/${AGIOS_INVESTOR_PACK.teaserFile}`,
    modelFile: `${AGIOS_INVESTOR_PACK.basePath}/${AGIOS_INVESTOR_PACK.modelFile}`,
    loiPreset: {
      projectName: AGIOS.publicTitle,
      projectReference: AGIOS.referenceCode,
      projectCapacityMW: AGIOS.solarMWp,
      estimatedInvestment: AGIOS.capexStackEUR.total,
      bessIncluded: true,
      timeline: AGIOS.timelineHeadline,
    },
  },
  {
    slug: 'park-ref-5001',
    referenceCode: 'PARK-REF-5001',
    hubSection: 'deals',
    dealKind: 'secondary_sale',
    publicTitle: '5.01 MWp Operational Solar — Single-Axis Tracking',
    publicLocation: 'Cyprus (Galascope Limited)',
    summary:
      'Operational utility-scale park with tracking, PPA-style offtake, and BESS expansion upside. Indicative asking price on listing page.',
    capacityMW: 5.01,
    investmentEUR: 9_600_000,
    roiPercent: undefined,
    annualRevenueEUR: undefined,
    statusLabel: 'For sale',
    statusColor: 'blue',
    completionDate: 'Operational',
    image: '/images/solar-park-field-unsplash.jpg',
    highlights: [
      '5.01 MWp DC / 4.62 MW AC — premium trackers',
      'Historical production and curtailment data',
      'BESS scenarios on project page',
      'Reference PARK-REF-5001',
    ],
    testimonial: {
      quote: 'Fully specified operational asset with transparent equipment and O&M structure.',
      client: 'Reference: PARK-REF-5001',
    },
    featured: true,
    detailRoute: '/projects/park-ref-5001',
    teaserFile: null,
    modelFile: null,
    loiPreset: {
      projectName: '5.01 MWp operational solar (PARK-REF-5001)',
      projectReference: 'PARK-REF-5001',
      projectCapacityMW: 5.01,
      estimatedInvestment: 9_600_000,
      bessIncluded: false,
      timeline: 'Subject to due diligence',
    },
  },
  {
    slug: 'cyprus-bess-investment',
    referenceCode: 'CYPRUS-BESS-2026',
    hubSection: 'deals',
    dealKind: 'market_teaser',
    publicTitle: 'Cyprus — BESS & Hybrid Investment Context',
    publicLocation: 'Cyprus (portfolio / market)',
    summary:
      'Market-level investor teaser: policy, grid, merchant and BESS economics — not a single named RTB ticket.',
    capacityMW: 0,
    investmentEUR: undefined,
    roiPercent: undefined,
    annualRevenueEUR: undefined,
    statusLabel: 'Market overview',
    statusColor: 'yellow',
    completionDate: 'March 2026',
    image: '/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg',
    highlights: [
      'CIT 15% from Jan 2026',
      'Curtailment and merchant context',
      'BESS value stack (indicative)',
      'Contact for specific parks',
    ],
    testimonial: {
      quote: 'Use this note alongside individual project listings and your own diligence.',
      client: 'Reference: CYPRUS-BESS-2026',
    },
    featured: false,
    detailRoute: '/contact',
    teaserFile: '/lighthief-cyprus/parks-for-sale/cyprus-bess-investment-teaser-mar2026.html',
    modelFile: null,
    loiPreset: {
      projectName: 'Cyprus solar / BESS investment (to be specified)',
      projectReference: 'CYPRUS-BESS-2026',
      projectCapacityMW: 0,
      bessIncluded: true,
      timeline: 'To be agreed',
    },
  },
  {
    slug: 'anarita-10mw',
    referenceCode: 'PARK-ANARITA-10',
    hubSection: 'operational_reference',
    publicTitle: 'Anarita Solar Park — 10 MW Operational',
    publicLocation: 'Anarita, Paphos District',
    summary:
      'Operational asset with published curtailment statistics — reference case for BESS retrofit economics.',
    capacityMW: 10,
    investmentEUR: 12_500_000,
    roiPercent: 14.5,
    annualRevenueEUR: 1_950_000,
    statusLabel: 'Operational',
    statusColor: 'green',
    completionDate: 'Energized & grid connected',
    image: '/images/solar-park-field-unsplash.jpg',
    highlights: [
      'Real curtailment data (multi-year)',
      'BESS opportunity narrative',
      'Tier-1 integration pathway',
    ],
    testimonial: {
      quote: 'Transparent operational asset with real curtailment data.',
      client: 'Reference: PARK-ANARITA-10',
    },
    featured: true,
    detailRoute: '/projects/anarita-10mw',
    teaserFile: null,
    modelFile: null,
    loiPreset: {
      projectName: 'Anarita 10 MW operational solar park',
      projectReference: 'PARK-ANARITA-10',
      projectCapacityMW: 10,
      estimatedInvestment: 12_500_000,
      bessIncluded: true,
      timeline: 'Operational — BESS add-on subject to study',
    },
  },
]

export function getPublicListings(): InvestmentListing[] {
  return [...LISTINGS]
}

export function getListingBySlug(slug: string): InvestmentListing | undefined {
  return LISTINGS.find((l) => l.slug === slug)
}

export function getDealsListings(): InvestmentListing[] {
  return LISTINGS.filter((l) => l.hubSection === 'deals')
}

export function getOperationalReferenceListings(): InvestmentListing[] {
  return LISTINGS.filter((l) => l.hubSection === 'operational_reference')
}

export function dealKindLabel(kind: DealKind | undefined): string {
  switch (kind) {
    case 'rtb':
      return 'Ready to build'
    case 'secondary_sale':
      return 'For sale'
    case 'market_teaser':
      return 'Market'
    default:
      return 'Opportunity'
  }
}
