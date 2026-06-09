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
  // ─── Cyprus market context ────────────────────────────────────────────────
  {
    id: 'cyprus-market-context',
    title: 'Cyprus solar market — 2025/2026 context',
    summary:
      'Key market figures for anchoring BESS conversations. Source: TSOC, CERA, pv-magazine, EAC (all verified Q1–Q2 2026).',
    callouts: [
      {
        type: 'info',
        text:
          'Jan 2026 regulation change: existing solar park owners can now co-locate BESS with their current plant without a new EAC connection application. This is the fastest path to market — no queue, no new POS needed. Lead with this for any operational prospect.',
      },
      {
        type: 'info',
        text:
          '€40M EU Recovery & Resilience Fund (RRF) subsidy scheme launched Feb 2025 for 150 MW / 350 MWh of private storage. Clients who act now can still qualify. Creates real urgency.',
      },
    ],
    tables: [
      {
        caption: 'Cyprus PV market — installed capacity (TSOC official data)',
        headers: ['End of year', 'Cumulative solar PV', 'Annual addition', 'Context'],
        rows: [
          ['2022', '~450 MW', '—', 'Pre-duck-curve era'],
          ['2023', '~638 MW', '+188 MW', 'Curtailment starts appearing'],
          ['2024', '797 MW', '+159 MW', '29% curtailment rate'],
          ['2025 (est.)', '~957 MW', '+122 MW', '47% curtailment — record year'],
          ['1 GW target', 'Exceeded', '—', 'National target met early; grid cannot cope'],
        ],
      },
      {
        caption: 'Cyprus curtailment crisis — national scale',
        headers: ['Metric', 'Value', 'Source'],
        rows: [
          ['2025 annual curtailment rate', '47.44%', 'pv-magazine, Jan 2026'],
          ['2025 total curtailed energy', '306,000 MWh', 'pv-magazine, Jan 2026'],
          ['H1 2025 curtailment rate', '58%', 'CERA/EAC reports'],
          ['March 2025 (worst month)', '38,155 MWh in one month', 'CERA data'],
          ['Curtailment hitting commercial parks', '89% of total', 'CERA breakdown'],
          ['2024 curtailment (comparison)', '166,997 MWh / 29%', 'EAC DSO'],
          ['Year-on-year increase', '+83% in volume', '2024→2025'],
        ],
      },
      {
        caption: 'BESS market — private investment landscape',
        headers: ['Metric', 'Value'],
        rows: [
          ['Private companies with BESS licences', '33+ companies', ],
          ['Total potential storage licensed', '>1,000 MW', ],
          ['CERA-licensed standalone storage', '482 MW / 1,600 MWh', ],
          ['CERA-licensed hybrid (RES + storage)', '790 MW', ],
          ['TSOC-owned BESS (3 substations)', '120 MW / 400 MWh — target operational Jun 2026', ],
          ['€40M RRF subsidy target', '150 MW / 350 MWh of private storage', ],
          ['NECP 2030 RES share target', '33.17% of gross final energy', ],
        ],
      },
    ],
    links: [
      { label: 'pv-magazine: Cyprus curtailment hits 47% in 2025', href: 'https://www.pv-magazine.com/2026/01/13/cyprus-solar-curtailment-hits-47-in-2025/' },
      { label: 'CERA production stats (monthly MWh by type)', href: 'https://www.cera.org.cy/en-gb/smv/sp-graph' },
      { label: 'TSOC MMS reports (curtailment, DAM, balancing)', href: 'https://tsoc.org.cy/competitive-electricity-market/mms-reports/' },
      { label: 'Cyprus NECP 2021–2030 (Dec 2024)', href: 'https://cdn.climatepolicyradar.org/navigator/CYP/2024/cyprus-updated-final-national-energy-and-climate-plan-necp-2021-2030_ed6636c45211f9fea8966557f855871c.pdf' },
    ],
  },

  // ─── Regulatory landscape ─────────────────────────────────────────────────
  {
    id: 'regulatory-landscape',
    title: 'Regulatory landscape — CERA, TSOC, EAC, MECI',
    summary:
      'Quick reference for who does what in Cyprus energy. Know this to answer client questions about licensing, grid connection, permits, and Guarantees of Origin.',
    callouts: [
      {
        type: 'info',
        text:
          'Guarantees of Origin (GOOs): TSOC issues GOOs to registered RES producers. Clients with co-located BESS can generate GOOs during discharge — an additional revenue stream worth mentioning to larger commercial clients.',
      },
    ],
    tables: [
      {
        caption: 'Regulatory bodies — roles at a glance',
        headers: ['Body', 'Role', 'Relevant to our sales', 'Website'],
        rows: [
          ['CERA', 'Energy regulator — licenses PV & BESS, sets tariffs, issues GOO frameworks, approves LTSA rates', 'Client BESS licence status; confirm LTSA tariff; check licence type before pricing', 'cera.org.cy'],
          ['TSOC', 'Transmission operator — runs DAM, issues curtailment orders, registers GOOs, owns 120 MW BESS', 'DAM price data; curtailment orders; GOO registration for clients', 'tsoc.org.cy'],
          ['EAC', 'Distribution operator — issues Preliminary Operating System (POS / connection terms), meters RES', 'Connection queue; POS acceptance date; EAC RES tables by district', 'eac.com.cy'],
          ['MECI', 'Ministry — policy, One-Stop-Shop (OSS) for RES permits, RRF subsidies', 'Environmental + building permits (bfu.meci.gov.cy); subsidy eligibility', 'meci.gov.cy'],
        ],
      },
      {
        caption: 'BESS project licensing timeline — greenfield vs co-located retrofit',
        headers: ['Step', 'Greenfield BESS', 'Co-located retrofit (post Jan 2026)'],
        rows: [
          ['1. CERA application', 'Exemption (<1 MW) or licence (>1 MW) — 2–4 months', 'Same — but EAC steps below may be skipped'],
          ['2. EAC connection terms (POS)', '6–18 months — biggest bottleneck', 'SKIPPED — uses existing PV connection'],
          ['3. Environmental permit (MECI OSS)', '2–6 months depending on MW', '2–6 months (same)'],
          ['4. Building permit', '1–3 months (local authority)', '1–3 months (same)'],
          ['5. Connection agreement & commissioning', '3–6 months', '3–6 months (same)'],
          ['Total typical timeline', '14–37 months from application', '6–15 months — 2× faster'],
        ],
      },
      {
        caption: 'Key tariff reference points (2026)',
        headers: ['Tariff / rate', 'Value', 'Source'],
        rows: [
          ['EAC purchase price (LV, basic + fuel adj.)', '~11.0 cent/kWh (€110/MWh)', 'EAC Jan 2026 monthly table'],
          ['Cyprus DAM average (Oct 2025–Feb 2026)', '€158/MWh overall; €77/MWh midday trough', 'TSOC DAM data (our analysis)'],
          ['DAM evening peak (17:00–21:00)', '€183/MWh', 'TSOC DAM data'],
          ['Peak–midday arbitrage spread', '€82–107/MWh per cycle', 'TSOC DAM data (seasonal variation)'],
          ['LTSA rate (CERA Tier C)', '€1,740/MWh/year', 'lib/portfolio-data.ts — internal SSOT'],
        ],
      },
    ],
    links: [
      { label: 'CERA licence lists (producers + storage)', href: 'https://www.cera.org.cy/el-gr/ilektrismos/details/katalogoi' },
      { label: 'EAC RES connection terms (4 districts)', href: 'https://www.eac.com.cy/EN/RegulatedActivities/Distribution/renewableenergy/Pages/ressystems.aspx' },
      { label: 'MECI One-Stop-Shop RES licensing (Greek)', href: 'https://bfu.meci.gov.cy' },
      { label: 'TSOC Guarantees of Origin', href: 'https://tsoc.org.cy/competitive-electricity-market/' },
    ],
  },

  // ─── Commercial rooftop playbook ──────────────────────────────────────────
  {
    id: 'commercial-playbook',
    title: 'Commercial rooftop PV — sales playbook',
    summary:
      'The commercial segment (warehouses, hotels, factories) is different from developer-BESS. ROI is cost avoidance (EAC tariff), not curtailment recovery. Pitch is simpler and faster.',
    callouts: [
      {
        type: 'info',
        text:
          'Commercial rooftop does NOT use the curtailment angle — these are self-consumption systems. The pitch is entirely about reducing EAC electricity bills. Payback under 5 years makes it a straightforward financial decision.',
      },
    ],
    tables: [
      {
        caption: 'Qualifying criteria for commercial rooftop prospect',
        headers: ['Criterion', 'Threshold', 'Why it matters'],
        rows: [
          ['Roof area', '>300 m²', 'Below this, system is too small to justify sales time'],
          ['Payback period', '<7 years', 'Clients reject beyond 7yr; our sweet spot is 3.5–5yr'],
          ['Annual savings', '>€7,000/year', 'Minimum meaningful revenue justification'],
          ['Existing PV on roof', 'No / unknown', 'Confirmed existing PV = deprioritise (retrofit more complex)'],
          ['Business type', 'Warehouse / hotel / clinic / factory', 'High daytime loads = best self-consumption match'],
          ['Google Maps presence', 'GMB entry preferred', 'Gives us phone, website, address for outreach'],
        ],
      },
      {
        caption: 'Standard pitch sequence',
        headers: ['Step', 'Action', 'Tool / resource'],
        rows: [
          ['1. Identify', 'Satellite roof scan → CRM commercial segment', 'Queue tab — commercial prospects with high/urgent priority'],
          ['2. First call', 'Introduce: "We noticed your building qualifies for rooftop solar — annual saving of approx €X"', 'Use estimated_deal_value and annual_savings_eur from CRM card'],
          ['3. Follow-up email', 'Send intro email with roof image and savings summary', 'CRM → "Email selected" → commercial intro template'],
          ['4. Site visit', 'Confirm roof condition, meter, single-phase vs three-phase', 'Book with contact from CRM card'],
          ['5. Proposal', 'kWp configuration, payback table, Lighthief scope', 'Use BESS commercial summary KB doc as base'],
        ],
      },
      {
        caption: 'Key numbers for Cyprus commercial rooftop (our sweep data)',
        headers: ['Metric', 'Value', 'Notes'],
        rows: [
          ['Qualified prospects (current sweep)', '41 sites', '4-city OSM + Google Maps sweep, Jun 2026'],
          ['Average payback', '3.9 years', 'Weighted across all 41 qualified sites'],
          ['Average annual savings', '€7,400–€29,400/yr', 'Range by system size'],
          ['Average roof area (qualified)', '>200 m²', 'Minimum qualifying threshold in sweep'],
          ['Typical system size', '25–280 kWp', 'Drives the savings range above'],
          ['EAC commercial tariff (self-consumption offset)', '~11 cent/kWh LV', 'Revenue per kWh not exported'],
          ['Key industries targeted', 'Warehouse / Logistics (primary), Hotel, Clinic', 'From industry tag in CRM'],
        ],
      },
      {
        caption: 'Key difference: commercial vs developer BESS pitch',
        headers: ['Dimension', 'Developer (BESS retrofit)', 'Commercial (rooftop PV)'],
        rows: [
          ['Core pitch', 'Stop losing curtailed revenue — 47% wasted', 'Cut your electricity bill by €X/year'],
          ['Decision maker', 'Director / SPV owner (register lookup)', 'Building owner / ops manager (GMB)'],
          ['Typical deal size', '€400k–€5M (BESS EPC)', '€20k–€200k (PV install)'],
          ['Sales cycle', '3–18 months', '1–6 months'],
          ['Key objection', '"Regulation is unclear"', '"Too expensive / disruption to operations"'],
          ['Data source', 'CERA archive + company register', 'Google Maps / OSM sweep'],
          ['Intro email', 'Curtailment pain point + BESS specs', 'Savings estimate + roof photo'],
        ],
      },
    ],
  },

  // ─── Data sources & research tools ───────────────────────────────────────
  {
    id: 'data-sources',
    title: 'Data sources & research tools (internal)',
    summary:
      'What data we collect, where it lives, and how to refresh it. Run enrichment pipelines from the project root on the local dev machine — not in production.',
    callouts: [
      {
        type: 'warning',
        text:
          'Only 12.6% of 1,403 CERA plant entries have directors enriched from the Cyprus Company Register. Run `npm run enrich:register` periodically to improve coverage — especially before a targeted outreach batch.',
      },
    ],
    tables: [
      {
        caption: 'Prospect data sources',
        headers: ['Source', 'What it gives', 'Records', 'How to refresh'],
        rows: [
          ['CERA licensing archive', '1,403 PV/wind/BESS plant licences — company name, MW, district, status', '1,403 plants', '`npm run import:cera` (monthly)'],
          ['Cyprus Company Register (e-filing)', 'Directors, reg number, registered address for each SPV', '177 of 1,403 enriched (12.6%)', '`npm run enrich:register` (Playwright, slow)'],
          ['Hunter.io', 'Verified contact emails + confidence score', '93 emails on file (6.6%)', '`npm run enrich:contacts`'],
          ['EAC RES district tables (4 PDFs)', '227 rows with connection terms dates + application refs', 'marketing/research/eac-res-systems.json', '`python scripts/research/parse-all-eac-pdfs.py`'],
          ['EAC curtailment reports (2022–2023)', '343 system-wide daily events — date, MWh, % curtailed', 'marketing/research/eac-curtailment-events.json', 'Download new PDFs, rerun parse script'],
          ['CERA production stats', 'Monthly MWh by producer type (PV FIT, net-billing, wind, IPP)', 'marketing/research/cera-production-monthly.json', '`python scripts/research/scrape-cera-production-stats.py`'],
          ['Commercial sweep (OSM + Google Maps)', '41 qualified commercial rooftop prospects', 'docs/solar-prospects/solar-sweep-merged-*.csv', '`npm run commercial:pipeline`'],
          ['Cyprus developer groups', 'SPVs clustered by shared director / brand', '132 groups identified', '`npm run cluster:developers`'],
        ],
      },
      {
        caption: 'Key npm commands',
        headers: ['Command', 'What it does'],
        rows: [
          ['`npm run cyprus:full`', 'Full developer pipeline: import CERA → cluster → Hunter → sync to CRM'],
          ['`npm run commercial:pipeline`', 'Commercial sweep → Hunter → sync to CRM'],
          ['`npm run enrich:register`', 'Cyprus company register Playwright scrape (directors + reg number)'],
          ['`npm run enrich:contacts`', 'Hunter email verification on enriched plants'],
          ['`npm run commercial:enrich-email`', 'Hunter for commercial CRM rows with website but no email'],
          ['`npm run commercial:enrich-register`', 'Register lookup for commercial Ltd-named businesses'],
          ['`npm run crm:backfill-aliases`', 'Rebuild search_aliases and all_directors for all CRM rows'],
          ['`npm run docs:update`', 'Regenerate all templated docs from SSOT (portfolio-data.ts)'],
        ],
      },
      {
        caption: 'EAC & regulatory data links',
        headers: ['Resource', 'URL', 'Notes'],
        rows: [
          ['CERA monthly production (MWh by type)', 'cera.org.cy/smv/sp-graph', 'HTML table — PV FIT, net-billing, wind, etc.'],
          ['CERA licence lists', 'cera.org.cy/ilektrismos/details/katalogoi', 'All producer + storage licences'],
          ['EAC RES systems tables (4 districts)', 'eac.com.cy RES systems page', 'PDF download per district'],
          ['TSOC MMS reports (curtailment, DAM, balancing)', 'tsoc.org.cy/mms-reports', 'Full trading data archive'],
          ['Cyprus company register', 'efiling.drcor.mcit.gov.cy', 'Directors, addresses, annual returns'],
        ],
      },
    ],
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
          'VERIFIED 2025 full-year data (pv-magazine, Jan 2026): Cyprus curtailment hit 47.44% — 306,000 MWh wasted. This nearly doubled the 2024 figure (166,997 MWh / 29%). EAC DSO reports (2022–2023) show events growing from 110 → 233 per year. The trend is accelerating.',
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
