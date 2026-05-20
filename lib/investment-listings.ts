/**
 * Public investment listings — hub cards, investor pack links, LOI presets.
 * Teaser/model paths are under /public (served as absolute paths from site root).
 */

import {
  AGIOS_THEODOROS_RTB as AGIOS,
  AGIOS_INVESTOR_PACK,
} from '@/lib/deals/agios-theodoros-rtb'
import { ALL_RTB_DEALS } from '@/lib/deals/rtb-deals-registry'
import {
  type RtbDeal,
  type GridConnectionStatus,
  investorPackForDeal,
  publicGridListingStatus,
  permitsInPlaceLabel,
} from '@/lib/deals/rtb-deal-types'
import {
  RAGELIA_LATE_STAGE_PARKS,
  type RageliaLateStagePark,
} from '@/lib/deals/ragelia-late-stage'

export type HubSection = 'deals' | 'operational_reference'

export type DealKind = 'rtb' | 'secondary_sale' | 'market_teaser' | 'development'

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

const DEFAULT_RTB_IMAGE = '/images/solar-park-field-unsplash.jpg'
const DEFAULT_LATE_IMAGE = '/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg'

function gridNoteShort(grid: GridConnectionStatus): string | null {
  switch (grid) {
    case 'final_issued':
      return 'EAC connection terms on file'
    case 'preliminary_filed':
      return 'Formal EAC connection terms pending'
    case 'pending_upgrade':
      return 'Area grid upgrade — connection terms pending'
    case 'not_filed':
      return 'Grid application / terms not yet filed'
    default:
      return null
  }
}

export function listingFromRtbDeal(
  deal: RtbDeal,
  opts?: { featured?: boolean; image?: string }
): InvestmentListing {
  const pack = investorPackForDeal(deal)
  const gridNote = gridNoteShort(deal.gridConnectionStatus)
  const gridBadge = publicGridListingStatus(deal.gridConnectionStatus)
  const highlights = [
    `${deal.solarMWp} MWp · ${deal.bessMWh} MWh BESS (${deal.bessDurationHours}h)`,
    permitsInPlaceLabel(deal.rtbStatus),
    gridNote ?? deal.gridConnectionNote.split('.')[0],
    `Indicative acquisition €${(deal.capex.rtbAcquisition / 1000).toFixed(0)}k (RTB ticket)`,
  ]

  return {
    slug: deal.slug,
    referenceCode: deal.referenceCode,
    hubSection: 'deals',
    dealKind: 'rtb',
    publicTitle: deal.publicTitle,
    publicLocation: deal.locationLine,
    summary: deal.permitSummary.split('·')[0].trim(),
    capacityMW: deal.solarMWp,
    investmentEUR: deal.capex.rtbAcquisition,
    roiPercent: undefined,
    annualRevenueEUR: deal.finance.grossEnergyRevenueY1EUR,
    statusLabel: gridBadge.label,
    statusColor: gridBadge.color,
    completionDate: deal.timelineNote,
    image: opts?.image ?? DEFAULT_RTB_IMAGE,
    highlights,
    testimonial: {
      quote: deal.permitSummary,
      client: `Reference: ${deal.referenceCode}`,
    },
    featured: opts?.featured ?? false,
    detailRoute: `/projects/${deal.slug}`,
    teaserFile: `${pack.basePath}/${pack.teaserFile}`,
    modelFile: null,
    loiPreset: {
      projectName: deal.publicTitle,
      projectReference: deal.referenceCode,
      projectCapacityMW: deal.solarMWp,
      estimatedInvestment: deal.capex.rtbAcquisition,
      bessIncluded: deal.bessMWh > 0,
      timeline: deal.timelineNote,
    },
  }
}

function listingFromLateStage(park: RageliaLateStagePark): InvestmentListing {
  return {
    slug: park.slug,
    referenceCode: park.referenceCode,
    hubSection: 'deals',
    dealKind: 'development',
    publicTitle: park.publicTitle,
    publicLocation: park.publicLocation,
    summary: park.summary,
    capacityMW: park.capacityMW,
    investmentEUR: park.askingPriceEUR,
    roiPercent: undefined,
    annualRevenueEUR: undefined,
    statusLabel: 'Late stage',
    statusColor: 'yellow',
    completionDate: `RTB target ${park.rtbTarget}`,
    image: DEFAULT_LATE_IMAGE,
    highlights: park.highlights,
    testimonial: {
      quote: `${park.tierLabel}. Investor pack available upon RTB milestone.`,
      client: `Reference: ${park.referenceCode}`,
    },
    featured: false,
    detailRoute: `/projects/${park.slug}`,
    teaserFile: null,
    modelFile: null,
    loiPreset: {
      projectName: park.publicTitle,
      projectReference: park.referenceCode,
      projectCapacityMW: park.capacityMW,
      estimatedInvestment: park.askingPriceEUR,
      bessIncluded: !!park.bessLabel,
      timeline: `RTB target ${park.rtbTarget}`,
    },
  }
}

const MANUAL_LISTINGS: InvestmentListing[] = [
  {
    slug: 'agios-theodoros-rtb',
    referenceCode: AGIOS.referenceCode,
    hubSection: 'deals',
    dealKind: 'rtb',
    publicTitle: 'Agios Theodoros Solar Park with Battery Storage',
    publicLocation: 'Agios Theodoros, Larnaca District',
    summary:
      '2.64 MWp bifacial solar + 10.56 MWh BESS — permits in place; confirm grid connection terms in diligence. Merchant DAM exposure with integrated storage.',
    capacityMW: AGIOS.solarMWp,
    investmentEUR: AGIOS.capexStackEUR.total,
    roiPercent: 30,
    annualRevenueEUR: AGIOS.finance.grossEnergyRevenueY1EUR,
    statusLabel: 'Connection terms pending',
    statusColor: 'yellow',
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
        'Licensed utility-scale project with integrated battery storage — verify grid connection terms before close.',
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
      'Multi-year operational track record',
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
      'Cyprus merchant market and hybrid PV+BESS context',
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
    slug: 'ragelia-portfolio',
    referenceCode: 'RAGELIA-PORTFOLIO-2026',
    hubSection: 'deals',
    dealKind: 'secondary_sale',
    publicTitle: 'Cyprus Solar Portfolio — 8 Parks, 9.81 MW',
    publicLocation: 'Cyprus (multiple locations)',
    summary:
      '8-park portfolio totalling 9.81 MW: licensed tickets with grid terms mostly pending (see each listing), 2 late-stage, 1 mid-stage. Agrivoltaic and BESS-integrated assets. Portfolio or single-park acquisition.',
    capacityMW: 9.813,
    investmentEUR: undefined,
    roiPercent: undefined,
    annualRevenueEUR: undefined,
    statusLabel: 'For sale',
    statusColor: 'blue',
    completionDate: 'Various (grid terms mostly pending)',
    image: '/images/solar-park-field-unsplash.jpg',
    highlights: [
      'Licensed parks — connection terms pending except where stated on listing',
      'Agrivoltaic + BESS parks in pipeline',
      'Individual listings for each park',
      'Staged pipeline: immediate & Q3/Q4 2026 delivery',
    ],
    testimonial: {
      quote: 'A diversified small-cap portfolio — permits largely in place; grid connection terms vary by park (see individual listings).',
      client: 'Reference: RAGELIA-PORTFOLIO-2026',
    },
    featured: true,
    detailRoute: '/projects/ragelia-portfolio',
    teaserFile: null,
    modelFile: null,
    loiPreset: {
      projectName: 'Cyprus Solar Portfolio — 8 Parks, 9.81 MW (RAGELIA-PORTFOLIO-2026)',
      projectReference: 'RAGELIA-PORTFOLIO-2026',
      projectCapacityMW: 9.813,
      bessIncluded: true,
      timeline: 'Various — RTB through Q1 2027',
    },
  },
  {
    slug: 'anarita-10mw',
    referenceCode: 'PARK-ANARITA-10',
    hubSection: 'operational_reference',
    publicTitle: 'Anarita Solar Park — 10 MW Operational',
    publicLocation: 'Anarita, Paphos District',
    summary:
      'Operational 10 MW asset with verified production — reference case for BESS retrofit and yield enhancement.',
    capacityMW: 10,
    investmentEUR: 12_500_000,
    roiPercent: 14.5,
    annualRevenueEUR: 1_950_000,
    statusLabel: 'Operational',
    statusColor: 'green',
    completionDate: 'Energized & grid connected',
    image: '/images/solar-park-field-unsplash.jpg',
    highlights: [
      'Verified multi-year production',
      'BESS retrofit upside to 18%+ ROI',
      'Tier-1 integration pathway',
    ],
    testimonial: {
      quote: 'Transparent operational asset with verified performance and clear BESS investment path.',
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

const RTB_LISTINGS = ALL_RTB_DEALS.map((deal) =>
  listingFromRtbDeal(deal, {
    featured: deal.slug === 'vanalio-nicosia',
    image:
      deal.slug === 'shia-sia-nicosia'
        ? '/images/solar-farm-aerial-unsplash.jpg'
        : DEFAULT_RTB_IMAGE,
  })
)

const LATE_STAGE_LISTINGS = RAGELIA_LATE_STAGE_PARKS.map(listingFromLateStage)

const LISTINGS: InvestmentListing[] = [
  ...MANUAL_LISTINGS,
  ...RTB_LISTINGS,
  ...LATE_STAGE_LISTINGS,
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

/** Featured deal cards for homepage and cross-links (deals section only). */
export function getFeaturedListings(limit = 3): InvestmentListing[] {
  return LISTINGS.filter((l) => l.featured && l.hubSection === 'deals').slice(0, limit)
}

export function getOperationalReferenceListings(): InvestmentListing[] {
  return LISTINGS.filter((l) => l.hubSection === 'operational_reference')
}

/** Project detail routes for sitemap (excludes /contact). */
export function getProjectSlugsForSitemap(): string[] {
  return LISTINGS.filter((l) => l.detailRoute.startsWith('/projects/'))
    .map((l) => l.detailRoute.replace('/projects/', ''))
}

export function dealKindLabel(kind: DealKind | undefined): string {
  switch (kind) {
    case 'rtb':
      return 'Licensed project'
    case 'secondary_sale':
      return 'For sale'
    case 'market_teaser':
      return 'Market'
    case 'development':
      return 'Late stage'
    default:
      return 'Opportunity'
  }
}
