/**
 * PV Feasibility Study Packages — Single Source of Truth
 * Client-facing landowner development packages (Cyprus solar parks)
 */

export type FeasibilityPackageId = 'essential' | 'professional' | 'development-ready'

export interface FeasibilityPackage {
  id: FeasibilityPackageId
  number: string
  name: string
  tagline: string
  priceEur: number
  priceLabel: string
  maxCapacity?: string
  delivery: string
  popular?: boolean
  recommendedFor: string
  included: string[]
  excluded: string[]
  paymentTerms: string
}

export const PV_FEASIBILITY_PACKAGES: FeasibilityPackage[] = [
  {
    id: 'essential',
    number: '01',
    name: 'Essential',
    tagline: 'Desktop pre-feasibility for landowners',
    priceEur: 2500,
    priceLabel: '€2,500',
    delivery: '7–10 business days',
    recommendedFor: 'Landowners exploring solar potential before committing to a site visit',
    included: [
      'Land title & zoning suitability review (registry check)',
      'Solar irradiance & yield estimate (PVsyst desktop simulation)',
      'Indicative system capacity (kWp) based on land area',
      'Nearest substation & grid proximity desktop assessment',
      'High-level financial summary (indicative IRR & payback estimate)',
      'Written summary report (10–15 pages) + 30-minute briefing call',
    ],
    excluded: ['Site visit', 'Environmental screening'],
    paymentTerms: '50% on order · 50% on report delivery',
  },
  {
    id: 'professional',
    number: '02',
    name: 'Professional',
    tagline: 'Full feasibility with site visit & grid pre-assessment',
    priceEur: 7500,
    priceLabel: '€7,500',
    delivery: '15–20 business days',
    popular: true,
    recommendedFor: 'Landowners ready to validate grid, layout, and economics before licensing',
    included: [
      'Everything in Essential, plus:',
      'On-site visit, land survey & drone mapping',
      'Full PVsyst simulation with shading & performance ratio analysis',
      'Grid connection pre-assessment (EAC/TSO proximity & capacity check)',
      'Preliminary environmental constraints screening (Natura 2000, EIA trigger check)',
      'Detailed financial model (NPV, IRR, sensitivity analysis, revenue scenarios)',
      'Indicative project layout & single-line electrical diagram',
      'Full report (30–40 pages) + in-person or video presentation',
    ],
    excluded: [],
    paymentTerms: '50% on order · 50% on report delivery',
  },
  {
    id: 'development-ready',
    number: '03',
    name: 'Development Ready',
    tagline: 'Licensing-ready full development package',
    priceEur: 39500,
    priceLabel: '€39,500',
    maxCapacity: 'Up to 5 MWp',
    delivery: '3–6 months (subject to authority timelines)',
    recommendedFor: 'Landowners or investors pursuing Ready-to-Build (RTB) status with full permit support',
    included: [
      'Everything in Professional, plus:',
      'Formal grid connection application submission to EAC/TSO (filing fees separate)',
      'Environmental Impact Assessment (EIA) coordination & submission (authority & consultant fees separate)',
      'Planning permission application — Town Planning Department (permit fees separate)',
      'CERA energy production licence application support (CERA fees separate)',
      'Detailed electrical design & full engineering drawings (ETEK-signed)',
      'Investor-grade bankable feasibility report',
      'Dedicated project manager throughout entire pre-construction phase',
    ],
    excluded: ['Third-party authority, consultant, and study fees (itemised separately)'],
    paymentTerms: '40% on order · 40% on application submission · 20% on RTB milestone',
  },
]

export const PV_FEASIBILITY_NOTES = {
  vatDisclaimer: 'Fixed fee · VAT not included · Third-party application fees not included',
  epcCredit:
    'Package fees are credited toward EPC construction costs if you proceed with Lighthief as your EPC contractor.',
  freeConsultation: 'A free 30-minute initial consultation is included before any commitment.',
  authorityFees:
    'All packages exclude third-party fees payable directly to authorities (CERA, EAC/TSO, Town Planning Department, Department of Environment, etc.) — these vary by project and are itemised separately upon application.',
  bespokePricing:
    'For projects above 5 MWp or with complex grid/environmental conditions, bespoke pricing applies.',
  validity:
    'All prices are indicative and subject to confirmation following initial site review.',
  documentDate: 'May 2026',
  pdfPath: '/documents/lighthief-feasibility-packages.html',
} as const

function formatEur(value: number): string {
  return `€${value.toLocaleString('en-IE')}`
}

export function getFeasibilityTemplateVars(): Record<string, string> {
  const vars: Record<string, string> = {
    'FEASIBILITY.documentDate': PV_FEASIBILITY_NOTES.documentDate,
    'FEASIBILITY.vatDisclaimer': PV_FEASIBILITY_NOTES.vatDisclaimer,
    'FEASIBILITY.epcCredit': PV_FEASIBILITY_NOTES.epcCredit,
    'FEASIBILITY.freeConsultation': PV_FEASIBILITY_NOTES.freeConsultation,
    'FEASIBILITY.authorityFees': PV_FEASIBILITY_NOTES.authorityFees,
    'FEASIBILITY.bespokePricing': PV_FEASIBILITY_NOTES.bespokePricing,
    'FEASIBILITY.validity': PV_FEASIBILITY_NOTES.validity,
  }

  for (const pkg of PV_FEASIBILITY_PACKAGES) {
    const templateKey = pkg.id.replace(/-/g, '_')
    const prefix = `FEASIBILITY.${templateKey}`
    vars[`${prefix}.number`] = pkg.number
    vars[`${prefix}.name`] = pkg.name
    vars[`${prefix}.tagline`] = pkg.tagline
    vars[`${prefix}.price`] = pkg.priceLabel
    vars[`${prefix}.priceEur`] = String(pkg.priceEur)
    vars[`${prefix}.delivery`] = pkg.delivery
    vars[`${prefix}.maxCapacity`] = pkg.maxCapacity ?? ''
    vars[`${prefix}.popular`] = pkg.popular ? 'true' : ''
    vars[`${prefix}.recommendedFor`] = pkg.recommendedFor
    vars[`${prefix}.paymentTerms`] = pkg.paymentTerms
    vars[`${prefix}.includedList`] = pkg.included.map((item) => `<li>${item}</li>`).join('\n')
    vars[`${prefix}.excludedList`] = pkg.excluded.length
      ? pkg.excluded.map((item) => `<li class="excl">${item} — not included</li>`).join('\n')
      : ''
  }

  vars['FEASIBILITY.packageCount'] = String(PV_FEASIBILITY_PACKAGES.length)
  vars['FEASIBILITY.priceRange'] = `${formatEur(PV_FEASIBILITY_PACKAGES[0].priceEur)} – ${formatEur(PV_FEASIBILITY_PACKAGES[PV_FEASIBILITY_PACKAGES.length - 1].priceEur)}`

  return vars
}

export function getFeasibilityPackage(id: FeasibilityPackageId): FeasibilityPackage | undefined {
  return PV_FEASIBILITY_PACKAGES.find((pkg) => pkg.id === id)
}

const BROCHURE_URL = 'https://solarfarms.cy/documents/lighthief-feasibility-packages.html'
const LANDOWNERS_PACKAGES_URL = 'https://solarfarms.cy/landowners#feasibility-packages'

/** HTML block for landowner autoresponder emails (table layout for client compatibility) */
export function getFeasibilityPackagesEmailHtml(): string {
  const packageCells = PV_FEASIBILITY_PACKAGES.map((pkg) => {
    const highlights = pkg.included
      .filter((item) => !item.toLowerCase().startsWith('everything in'))
      .slice(0, 4)
      .map((item) => `<li style="margin-bottom:4px;">${item}</li>`)
      .join('')

    return `
      <td style="width:33%; vertical-align:top; padding:8px; border:1px solid #d7e0ea; border-radius:6px; background:${pkg.popular ? '#eef4fc' : '#f8fafc'};">
        ${pkg.popular ? `<div style="font-size:10px;font-weight:700;color:#1a1a1a;background:#C9A432;display:inline-block;padding:2px 8px;border-radius:999px;margin-bottom:6px;">MOST POPULAR</div>` : ''}
        <div style="font-size:10px;color:#404040;text-transform:uppercase;">Package ${pkg.number}</div>
        <div style="font-size:16px;font-weight:800;color:#1A365D;margin:2px 0;">${pkg.name}</div>
        <div style="font-size:11px;color:#404040;margin-bottom:8px;">${pkg.tagline}${pkg.maxCapacity ? ` · ${pkg.maxCapacity}` : ''}</div>
        <div style="font-size:20px;font-weight:800;color:#1A365D;margin-bottom:8px;">${pkg.priceLabel}</div>
        <div style="font-size:10px;color:#64748b;margin-bottom:8px;">ex VAT · authority fees separate</div>
        <ul style="margin:0 0 8px 16px;padding:0;font-size:11px;color:#333;line-height:1.35;">${highlights}</ul>
        <div style="font-size:10px;color:#64748b;"><strong>Delivery:</strong> ${pkg.delivery}</div>
        <div style="margin-top:10px;">
          <a href="https://solarfarms.cy/contact?subject=Feasibility%20${encodeURIComponent(pkg.name)}%20Package" style="display:inline-block;background:#1A365D;color:#fff;text-decoration:none;padding:8px 12px;border-radius:4px;font-size:11px;font-weight:600;">Request ${pkg.name}</a>
        </div>
      </td>`
  }).join('')

  return `
    <div style="margin:28px 0 16px;">
      <h3 style="color:#1A365D;margin:0 0 6px;font-size:18px;">Feasibility Study Packages</h3>
      <p style="color:#404040;font-size:14px;margin:0 0 14px;">
        Take the next step with a fixed-fee study. Package fees are credited toward EPC if you build with Lighthief.
        <a href="${BROCHURE_URL}" style="color:#1A365D;">Download full brochure</a>
      </p>
      <table role="presentation" cellpadding="0" cellspacing="8" style="width:100%;border-collapse:separate;">
        <tr>${packageCells}</tr>
      </table>
      <p style="font-size:12px;color:#64748b;margin:12px 0 0;">
        ${PV_FEASIBILITY_NOTES.freeConsultation}
        <a href="${LANDOWNERS_PACKAGES_URL}" style="color:#1A365D;">View all packages online</a>
      </p>
    </div>`
}
