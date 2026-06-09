/**
 * CRM internal sales knowledge base — static sections for /crm/knowledge.
 * Imports SSOT from portfolio-data, constants, pv-om-packages.
 */

import {
  CLIENT_PRICING,
  CLIENT_PAID,
  GROUPS,
  LTSA,
  WARRANTY,
  RFI_STATUS,
  FINANCIALS,
  ADDERS,
  AEOLIAN,
} from './portfolio-data'
import { BESS_DEFAULTS, CAPEX_MODES, COMPANY_DATA } from './constants'
import {
  POLAND_PACKAGES,
  POLAND_CALLOUT,
  GREENVILLE_CUSTOM,
  SPANERCOM_PV_OM,
  CYPRUS_OM_BANDS,
  PV_OM_META,
} from './pv-om-packages'
import { CRM_KB_OFFERS_INDEX } from './crm-kb-documents'

// ─── Types ───────────────────────────────────────────────────────────────────

export type CrmKbCallout = { type: 'info' | 'warning'; text: string }

export type CrmKbTable = {
  caption?: string
  internalOnly?: boolean
  headers: string[]
  rows: (string | number)[][]
}

export type CrmKbSection = {
  id: string
  title: string
  summary?: string
  tables?: CrmKbTable[]
  bullets?: string[]
  callouts?: CrmKbCallout[]
  links?: { label: string; href: string }[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatEur(n: number, decimals = 0): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(n)
}

function parseConfigKey(key: string): { mw: number; mwh: number } | null {
  const m = key.match(/^(\d+(?:\.\d+)?)MW_(\d+(?:\.\d+)?)MWh$/)
  if (!m) return null
  return { mw: parseFloat(m[1]), mwh: parseFloat(m[2]) }
}

function bessPricingExamples(): CrmKbTable['rows'] {
  const rows: (string | number)[][] = []
  for (const [key, val] of Object.entries(CLIENT_PRICING)) {
    if (key === '_meta' || typeof val !== 'object' || !('ratePerMWh' in val)) continue
    const cfg = parseConfigKey(key)
    if (!cfg) continue
    const total = val.ratePerMWh * cfg.mwh
    rows.push([
      `${cfg.mw} MW / ${cfg.mwh} MWh`,
      formatEur(val.ratePerMWh),
      formatEur(total),
      val.status,
    ])
  }
  rows.push([
    '5 MW / 20 MWh (Spanercom)',
    formatEur(119_000),
    formatEur(119_000 * 20),
    'confirmed (individual)',
  ])
  rows.push([
    '5 MW / 20 MWh (Galascope / group)',
    formatEur(111_900),
    formatEur(111_900 * 20),
    'confirmed (negotiated)',
  ])
  return rows
}

const director = COMPANY_DATA.contacts.cyprusDirector

// ─── Sections ────────────────────────────────────────────────────────────────

export const CRM_KB_SECTIONS: CrmKbSection[] = [
  {
    id: 'quick-reference',
    title: 'Quick reference',
    summary: 'Who to contact and what to quote in a first reply.',
    bullets: [
      `Sales contact: ${director.name}, ${director.title} — ${director.phone}, ${director.email}`,
      `PV O&M: Poland packages from ~${formatEur(4_230)}/MW/yr (ECO) to ~${formatEur(11_256)}/MW/yr (GOLD); Cyprus custom typically €5,200–5,640/MW (see Spanercom benchmark).`,
      `BESS turnkey EPC: Client price = equipment + adders with +${BESS_DEFAULTS.epcMarkup.cifMarginPercent}% on CIF and +${BESS_DEFAULTS.epcMarkup.epcCostsMarginPercent}% on EPC costs. Use CLIENT_PRICING examples below — confirm live quote in Excel before sending.`,
      `BESS O&M (LTSA Tier C): ${formatEur(LTSA.tierC.ratePerMWh)}/MWh/yr, ${LTSA.tierC.availabilityTarget}% availability target, 15-year term.`,
      `PV EPC: ${formatEur(CAPEX_MODES['epc-dev'].pricePerMW)}/MW client price (${formatEur(CAPEX_MODES['epc-dev'].epcMarkupPerMW)}/MW flat markup on self-cost).`,
    ],
    callouts: [
      {
        type: 'warning',
        text: 'Internal only — do not paste CIF figures, quotation references, or portfolio pipeline totals into client emails.',
      },
    ],
  },
  {
    id: 'pv-om',
    title: 'PV O&M pricing',
    summary: `Poland package research and Cyprus benchmarks. Source: ${PV_OM_META.source} (${PV_OM_META.date}).`,
    tables: [
      {
        caption: 'Lighthief Poland — standard packages (ex. VAT, per MW/year)',
        headers: ['Package', '€/MW/yr', 'Scope'],
        rows: POLAND_PACKAGES.map((p) => [p.name, formatEur(p.eurPerMwYr), p.includes]),
      },
      {
        caption: 'Poland — GreenVille custom quotes (annual, ex. VAT)',
        headers: ['Park size', 'Annual total', '€/MW/yr'],
        rows: GREENVILLE_CUSTOM.map((g) => [
          `${g.mw} MW`,
          formatEur(g.annualEur),
          formatEur(g.eurPerMw),
        ]),
      },
      {
        caption: 'Cyprus — recommended bands for new clients (ex. VAT)',
        headers: ['Park size', 'ECO', 'SILVER / Custom equiv.', 'GOLD'],
        rows: CYPRUS_OM_BANDS.map((b) => [b.size, b.eco, b.silver, b.gold]),
      },
      {
        caption: 'Spanercom — active PV O&M contract reference (2 × 5 MW, Anarita)',
        headers: ['Metric', 'Value'],
        rows: [
          ['Annual fee (both parks, ex. VAT)', formatEur(SPANERCOM_PV_OM.annualExVat)],
          ['Per park / year', formatEur(SPANERCOM_PV_OM.perParkYr)],
          ['Per MW / year', formatEur(SPANERCOM_PV_OM.eurPerMwYr)],
          ['vs incumbent (€60k/yr)', formatEur(SPANERCOM_PV_OM.savingVsIncumbent) + ' saving'],
          ['Panel cleaning', `${SPANERCOM_PV_OM.cleaningsPerYr}×/yr`],
          ['Vegetation', `${SPANERCOM_PV_OM.vegetationPerYr}×/yr`],
          ['Included call-outs', String(SPANERCOM_PV_OM.includedCallouts)],
          ['Urgent response', `${SPANERCOM_PV_OM.urgentResponseHours} hours`],
          ['Availability guarantee', `${SPANERCOM_PV_OM.availabilityPct}%`],
        ],
      },
    ],
    bullets: [
      `Extra emergency visit (Poland packages): ~${formatEur(POLAND_CALLOUT.emergencyVisitEur)} per visit, ${POLAND_CALLOUT.responseHours}h response.`,
      'Co-located parks: 10–15% mobilisation discount on combined fee.',
      'Cyprus custom scope typically beats Poland on SLA (4h vs 12h), cleaning frequency, and included LESA/MV (Dimos).',
    ],
  },
  {
    id: 'bess-pricing',
    title: 'BESS turnkey pricing',
    summary: 'Illustrative client €/MWh and total EPC prices from confirmed configurations.',
    tables: [
      {
        caption: 'BESS EPC — example turnkey prices (ex. VAT)',
        internalOnly: true,
        headers: ['Configuration', '€/MWh', 'Total EPC', 'Status'],
        rows: bessPricingExamples(),
      },
      {
        caption: 'Standard markup (code SSOT)',
        headers: ['Component', 'Markup'],
        rows: [
          ['CIF equipment', `+${BESS_DEFAULTS.epcMarkup.cifMarginPercent}%`],
          ['EPC installation & adders', `+${BESS_DEFAULTS.epcMarkup.epcCostsMarginPercent}%`],
          ['PV EPC (if bundled)', `+${formatEur(BESS_DEFAULTS.epcMarkup.pvMarkupPerMW)}/MW flat`],
        ],
      },
    ],
    callouts: [
      {
        type: 'info',
        text: 'Confirm final numbers in Bess - EPC System Cost v2.xlsx before issuing a formal offer. Spanercom uses €119k/MWh; Galascope group deal €111.9k/MWh for same 5/20 hardware.',
      },
    ],
  },
  {
    id: 'pv-epc',
    title: 'PV EPC pricing',
    summary: 'Utility-scale solar EPC client pricing reference.',
    tables: [
      {
        headers: ['Item', 'Value'],
        rows: [
          ['Client price (5 MW example)', formatEur(CAPEX_MODES['epc-dev'].pricePerMW) + '/MW'],
          ['Self-cost reference', formatEur(CAPEX_MODES['epc-dev'].selfCostPerMW) + '/MW'],
          ['EPC markup', formatEur(CAPEX_MODES['epc-dev'].epcMarkupPerMW) + '/MW flat'],
          ['5 MW illustrative total', formatEur(CAPEX_MODES['epc-dev'].pricePerMW * 5)],
        ],
      },
    ],
    bullets: [
      'Turnkey new-build (PV + RTB) is higher — see CAPEX_MODES turnkey / RTB options in constants.',
      'Bank solar-only debt often capped at €500k/MW — BESS improves bankability (70% LTV possible).',
    ],
  },
  {
    id: 'scope',
    title: 'Included & excluded (BESS EPC)',
    summary: 'Standard turnkey scope — aligned with Spanercom Anarita offer.',
    bullets: [
      'Included: LFP battery containers (EVE cells), Kehua PCS, MV skid, auxiliary transformer, RTU, CIF Limassol + inland transport, import duty & customs, standard civil foundations, DC/AC/MV cabling (typical lengths), protection engineering, SCADA programming (IEC 60870-5-104), remote trip, commissioning, CAR/EAR insurance, OEM supervision, 5-year base warranty.',
      'Client responsibility: CERA licence, DSO application & fees, external LPS if required, telecoms backhaul, site fencing, planning permits, land, grid upgrades, non-standard ground works, access roads.',
    ],
    tables: [
      {
        caption: 'Also client-paid (portfolio SSOT)',
        headers: ['Item', 'Rate / note'],
        rows: [
          ['Protection testing', CLIENT_PAID.protectionTesting.rate],
          ['Electrical drawings (permits)', CLIENT_PAID.electricalDrawings.rate],
          ['External LPS', 'Coordinated by Lighthief; client pays DEHN scope'],
          ['VAT', CLIENT_PAID.vat.rate],
        ],
      },
    ],
  },
  {
    id: 'bankability',
    title: 'Bankability & warranties',
    summary: 'Key lender and investor talking points — from RFI status and warranty SSOT.',
    bullets: [
      `Linyang sales contract: ${RFI_STATUS.linyangSalesContract.status} (${RFI_STATUS.linyangSalesContract.version}).`,
      `Performance bond: ${RFI_STATUS.performanceBond.note}`,
      `Grid code certification: ${RFI_STATUS.gridCodeCert.doc}.`,
      `SOH guarantees: Year 5 ≥${WARRANTY.sohGuarantees.year5}%, Year 10 ≥${WARRANTY.sohGuarantees.year10}%, Year 15 ≥${WARRANTY.sohGuarantees.year15}%.`,
      `Extended warranty (client → Linyang direct): Yrs 6–10 ${formatEur(WARRANTY.extendedYr6to10.totalPerMWh)}/MWh/yr; Yrs 11–15 ${formatEur(WARRANTY.extendedYr11to15.totalPerMWh)}/MWh/yr.`,
      `Construction insurance: ${RFI_STATUS.insurancePricing.status} — budget 0.75% of installed value until firm Marsh quotes.`,
    ],
    links: [
      {
        label: 'BESS EPC & LTSA commercial summary (full HTML)',
        href: '/api/crm/kb/document?slug=bess-commercial-summary',
      },
    ],
  },
  {
    id: 'ems',
    title: 'EMS & SCADA',
    summary: 'Disperon / Voltus structure for Cyprus BESS portfolio.',
    tables: [
      {
        headers: ['Component', 'Rate', 'Notes'],
        rows: [
          ['SCADA Local (upfront)', ADDERS.scadaLocal.rate, ADDERS.scadaLocal.note],
          ['SCADA Global (upfront)', ADDERS.scadaGlobal.rate, ADDERS.scadaGlobal.note],
          ['SCADA Local maintenance', '€3,000/park/year', 'Recurring'],
          ['SCADA Global maintenance', '€12,000/group/year', 'Recurring'],
          ['EMS subscription (client)', '€400/MWh/year', '20% Voltus / 80% Lighthief EUBESS per SHA'],
          ['Portfolio EMS/SCADA upfront (28 parks)', formatEur(FINANCIALS.emsScadaTotal), 'Disperon v3 corrected pricing'],
        ],
      },
    ],
    bullets: [
      'Cyprus BESS revenue today is primarily curtailment recovery (store curtailed solar at €0, discharge at evening peak) — DAM arbitrage not yet legal for grid-charging.',
      'LTSA O&M is separate from EMS subscription — LTSA covers field maintenance; EMS covers control platform and optimization.',
    ],
  },
  {
    id: 'groups',
    title: 'Group & individual offers',
    summary: 'Signing status and indicative economics — internal pipeline view.',
    tables: [
      {
        caption: 'Group order clients',
        internalOnly: true,
        headers: ['Client', 'Parks', 'MWh', 'Revenue', 'Margin %', 'Status', 'Probability'],
        rows: GROUPS.map((g) => [
          g.name,
          String(g.parks),
          String(g.mwh),
          formatEur(g.revenue),
          `${g.marginPct.toFixed(1)}%`,
          g.signingStatus,
          `${g.signingProbabilityPct}%`,
        ]),
      },
      {
        caption: 'Standalone / individual clients',
        headers: ['Client', 'Config', 'Offer', 'Status', 'Probability'],
        rows: [
          [
            'Spanercom (Anarita)',
            '10 MW / 40 MWh BESS',
            formatEur(4_760_000) + ' EPC',
            'high',
            '85%',
          ],
          [
            AEOLIAN.name.split('—')[0].trim(),
            `${AEOLIAN.mw} MW / ${AEOLIAN.mwh} MWh (wind hybrid)`,
            formatEur(AEOLIAN.revenue) + ' turnkey',
            AEOLIAN.signingStatus,
            `${AEOLIAN.signingProbabilityPct}%`,
          ],
          [
            'Aristoklia Solar',
            'Commercial PV',
            'See offer doc',
            'pipeline',
            '—',
          ],
        ],
      },
    ],
    callouts: GROUPS.filter((g) => g.signingNote).slice(0, 2).map((g) => ({
      type: 'info' as const,
      text: `${g.name}: ${g.signingNote}`,
    })),
  },
  // ─── Client pain points (curtailment + DAM market intel) ──────────────────
  {
    id: 'client-pain-points',
    title: 'Client pain points — curtailment & market context',
    summary:
      'Use this section to anchor BESS conversations. EAC publishes daily curtailment reports — the 2022–2023 data below is from official DSO records. DAM spreads are from real TSOC trading data (Oct 2025–Feb 2026).',
    callouts: [
      {
        type: 'info',
        text:
          'Curtailment events more than doubled from 2022 to 2023 (110 → 233 events). The average curtailment per event rose from 11% to 19%. In February 2023 alone, one day saw 67.5% curtailed. This is the fastest-growing pain point for operational PV owners.',
      },
      {
        type: 'warning',
        text:
          'BESS cannot buy from the DAM grid in Cyprus yet (regulatory restriction as of 2026). The revenue model for BESS is: arbitrage via contracted storage charging during solar generation + discharge into evening peak — not grid-to-charge.',
      },
    ],
    tables: [
      {
        caption: 'CLIENT DATA — Esperia / Galascope actual curtailment (confirmed Jun 2026)',
        headers: ['Period', 'Curtailment rate', 'Impact on 6.5 MW park', 'Revenue lost'],
        rows: [
          ['2025 annual average', '47%', '~3 MW wasted per curtailment day', '~€360/MWh-day at EAC tariff'],
          ['2026 YTD (most days)', '~70%', '~4.5 MW wasted per curtailment day', '~€540/MWh-day lost'],
          ['Trend', 'Sharply worsening', 'Grid saturation accelerating', 'BESS retrofit pays back in <5 years'],
        ],
      },
      {
        caption: 'EAC system-wide curtailment statistics (official DSO data)',
        headers: ['Year', 'Events', 'Avg curtailment per event', 'Worst day', 'Peak month'],
        rows: [
          ['2022', '110', '11.1%', '38.5% (8 Oct 2022)', 'Apr & Nov (17–18 events)'],
          ['2023', '233', '18.8%', '67.5% (19 Feb 2023)', 'May (31 events)'],
          ['2025 (client data)', '—', '47% avg', '~70% recent days', 'Every month'],
          ['Trend', '+112% events 22→23', 'Still worsening', 'Grid saturation', 'Year-round, no relief'],
        ],
      },
      {
        caption: 'Cyprus DAM price profile — real TSOC data Oct 2025–Feb 2026',
        headers: ['Period', 'Avg price (€/MWh)', 'Key insight'],
        rows: [
          ['Midday solar (10:00–14:00)', '€101 / €77 trough at noon', 'Deep duck curve — worst revenue hours for PV'],
          ['Evening peak (17:00–21:00)', '€183', 'BESS discharge window — best revenue'],
          ['Off-peak night (22:00–05:00)', '€171', 'Charging window if needed'],
          ['Peak–midday spread', '€82/MWh (up to €107 in Nov)', 'BESS arbitrage opportunity per cycle'],
          ['Zero-price periods', '5.2% of all half-hours', 'Pure curtailment — no revenue at all'],
        ],
      },
      {
        caption: 'BESS revenue pitch — operational PV owner example (4 MW park)',
        headers: ['Scenario', 'Annual impact'],
        rows: [
          ['Lost revenue from curtailment (11–19% avg, EAC tariff ~€110/MWh)', '€50k–€140k/year per MW curtailed'],
          ['BESS captures 2h storage × 250 cycles/yr × 4 MW = 2,000 MWh/yr', 'Revenue at €183/MWh evening = €366k/yr'],
          ['BESS avoids forced disconnection (Photovoltaic Disconnection Process — EAC)', 'Protects grid connection agreement'],
          ['Net payback on 4 MWh BESS at €400k CAPEX (Lighthief pricing)', '~4–6 years with curtailment + arbitrage'],
        ],
      },
      {
        caption: 'Objection handling',
        headers: ['Client objection', 'Response'],
        rows: [
          [
            '"We don\'t have that much curtailment"',
            'Esperia/Galascope — our active client group with similar operational PV in Cyprus — reported 47% average curtailment in 2025, now reaching 70% in 2026. EAC publishes daily DSO reports confirming this is system-wide. We can calculate your specific loss from CERA generation data and EAC tariff records.',
          ],
          [
            '"The price of BESS is too high"',
            'Our Linyang/EVE LFP pricing is €100k–168k/MWh at scale — below EU market. The payback with curtailment + arbitrage is 4–6 years, after which storage revenue is pure upside.',
          ],
          [
            '"We\'ll wait for the regulation to mature"',
            'Every year without BESS is €50k–140k of curtailed energy per MW. The grid is getting worse — 233 curtailment events in 2023 vs 110 in 2022. First mover advantage on connection terms.',
          ],
          [
            '"We don\'t want the complexity of operating a BESS"',
            'Lighthief takes full LTSA responsibility — availability guarantee, remote monitoring, capacity warranty. One contract, one point of contact.',
          ],
        ],
      },
    ],
    links: [
      { label: 'EAC Curtailments page (official)', href: 'https://www.eac.com.cy/EN/RegulatedActivities/Distribution/DistributionSystemOperation/Pages/res-e_curtailments.aspx' },
      { label: 'EAC Photovoltaic Disconnection Process PDF', href: 'https://www.eac.com.cy/EN/RegulatedActivities/Distribution/DistributionSystemOperation/Documents/Photovoltaic_Disconnection_Process_EN.pdf' },
      { label: 'EAC RES Connection Terms (POS tables)', href: 'https://www.eac.com.cy/EN/RegulatedActivities/Distribution/renewableenergy/Pages/ressystems.aspx' },
      { label: 'Cyprus TSOC Day-Ahead Market', href: 'https://www.tsoc.org.cy/en/electricity-market/day-ahead-market' },
    ],
  },
  {
    id: 'offers-sent',
    title: 'Offers sent',
    summary: 'Open full HTML documents (CRM login required).',
    tables: [
      {
        headers: ['Document', 'Client', 'Type', 'Date', 'Open'],
        rows: CRM_KB_OFFERS_INDEX.map((o) => [
          o.title,
          o.client,
          o.type,
          o.date,
          'View →',
        ]),
      },
    ],
    links: CRM_KB_OFFERS_INDEX.map((o) => ({
      label: o.title,
      href: `/api/crm/kb/document?slug=${o.slug}`,
    })),
  },
]

export const CRM_KB_BESS_IMAGE = '/images/linyang/container-cell-racks.jpeg'

export const CRM_KB_FOOTER = {
  company: COMPANY_DATA.name,
  reg: COMPANY_DATA.registration.companyNumber,
  website: 'solarfarms.cy',
}
