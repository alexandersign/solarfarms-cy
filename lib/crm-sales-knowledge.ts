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
          ['Cyprus DAM average (Oct 2025–Jul 2026)', '€189/MWh overall; €84/MWh midday (seasonal — summer often higher)', 'TSOC DAM, 283 days'],
          ['DAM evening peak (17:00–21:00)', '€203/MWh', 'TSOC DAM, 283 days'],
          ['Peak–midday arbitrage spread', '€119/MWh average (Apr–May much wider; early Jul can flatten)', 'TSOC DAM data'],
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
  // ─── SPIN sales playbook ──────────────────────────────────────────────────
  {
    id: 'spin-qualifying',
    title: 'SPIN sales playbook — scripts for every segment',
    summary:
      'Full consultative scripts for commercial rooftop (by industry) and PV/BESS developer prospects. Based on Cyprus market data. Log calls with SPIN phase via the "Log call" button on each prospect card — answers automatically update the record.',
    callouts: [
      {
        type: 'info',
        text:
          'HOW TO RUN SPIN: S = Situation (2–4 questions only — buyers get bored). P = Problem (surface the pain). I = Implication (THIS IS WHERE DEALS ARE WON — make the pain expensive over a 5–10 year horizon). N = Need-payoff (let them sell themselves). Talk 30% of the time. The prospect naming their own pain out loud is worth more than any spec sheet.',
      },
      {
        type: 'warning',
        text:
          'NEVER pitch the solution during S or P phases. Only move to pricing after the prospect has articulated their own Need-payoff. End your strongest Implication question with silence, then transition: "If we could protect that and lock in your rate — what would that mean for you?"',
      },
    ],
    tables: [
      {
        caption: 'Cyprus pain facts — use in every call (update quarterly)',
        headers: ['Fact', 'How to use it'],
        rows: [
          ['Business electricity ~€0.263/kWh (Sept 2025) — ~140% of EU average, ~180% world average', 'Anchor all Implication questions: "You\'re paying the highest rate in the EU with no cap"'],
          ['Commercial tariffs: LV ~10.5–12.8 c/kWh + fuel adj + VAT → ~26 c/kWh all-in', 'Use when client questions the bill — break it down for them'],
          ['Fuel adjustment recalculated monthly vs heavy fuel oil — completely unpredictable', 'Problem question hook: "Is the unpredictable monthly swing making budgeting hard?"'],
          ['CERA approved ~3% increase mid-2025. No price cap.', 'Implication: "It just went up again, and there\'s no mechanism to cap it"'],
          ['Cyprus: only EU member with zero interconnection — cannot import a single MW', 'Grid fragility hook — use for reliability/outage angle'],
          ['July 2025 heatwave: demand hit 1,200 MW, officials warned blackouts if one Vasilikos unit failed', 'For hospitality, healthcare, cold storage — make it visceral'],
          ['H1 2025: over 167 GWh curtailed — more than all of 2024 combined', 'For PV park owners: "That\'s energy your panels produced that EAC forced you to throw away"'],
          ['Full-year 2025 curtailment: 47.44% of all solar output (306,000 MWh wasted)', 'BESS pitch: "Nearly half your generation is being wasted — storage captures it"'],
        ],
      },
      {
        caption: 'Action words — steer from cost thinking to ownership/control',
        headers: ['Theme', 'Words and phrases to use'],
        rows: [
          ['Ownership & control', 'Own your power · take control · energy independence · your own generation · stop renting from the grid'],
          ['Protection & security', 'Protect · shield · safeguard · secure · ride through · uninterrupted · resilience · backup'],
          ['Predictability', 'Lock in · fix your rate · cap your cost · predictable · budget with confidence · no more surprises'],
          ['Future-proofing', 'Future-proof · hedge · insulate from price rises · 25-year horizon · long-term asset on your balance sheet'],
          ['Urgency (use honestly)', 'Every month you wait · today\'s bill vs next summer\'s · the rate just went up again · the grid is tighter every year'],
          ['AVOID — they kill momentum', 'Cheap · spend · expense · risk · maybe · try · "it will cost you" (reframe everything as investment)'],
        ],
      },
      {
        caption: 'Discovery call — one-page sequence (all segments)',
        headers: ['Step', 'What to say / do'],
        rows: [
          ['1. Open with permission', '"Before I mention solar at all, mind if I understand your power situation first?"'],
          ['2. Situation (2–4 Qs)', 'Monthly bill, sanctioned demand/tariff, roof area + access, operating hours, ownership (own/lease?)'],
          ['3. Problem (2–3 Qs)', 'Is the bill climbing? Is the fuel adjustment unpredictable? What do outages cost you?'],
          ['4. Implication (key step)', 'Make the rising cost and grid fragility concrete and expensive over 5–10 years. Use the Cyprus facts above. PAUSE after asking.'],
          ['5. Need-payoff', 'Let them state the value: savings, predictability, outage protection, ESG. Do not tell them — ask.'],
          ['6. Steer', 'Use an ownership/protection action word, then propose site survey + tailored proposal.'],
          ['7. Close next step', '"Let\'s get you exact numbers — when can we look at the site?" Book the survey. That is the close.'],
        ],
      },
      {
        caption: 'Hotels & Hospitality — SPIN script',
        headers: ['Phase', 'Question / line'],
        rows: [
          ['S', 'What\'s your average monthly electricity spend across the season?'],
          ['S', 'Which tariff are you on and what\'s your sanctioned demand (kVA)?'],
          ['S', 'What are your peak load hours — daytime A/C, or evening dining and lighting?'],
          ['S', 'Any sustainability targets from owners, a chain, or booking platforms?'],
          ['P', 'How much has your power bill climbed over the last two or three seasons?'],
          ['P', 'When the grid drops in peak summer, what does it do to guest experience?'],
          ['P', 'Is energy eating into your margin per occupied room?'],
          ['I', 'You\'re paying ~140% of the EU average and it just rose 3% — with no interconnector to cap it, where\'s that bill in five summers?'],
          ['I', 'A blackout during a 44°C heatwave with no A/C — how many guest complaints, refunds, or bad reviews is that worth?'],
          ['I', 'If a competitor hotel cuts energy cost 40–50%, how does that affect your rates and margin?'],
          ['N', 'If you cut your power bill 40–60% and locked the rate for 25 years, where would that saving go — renovations, marketing, rates?'],
          ['N', 'How valuable is telling guests and platforms you run on clean energy?'],
          ['Steer', 'Hotels consume most at exactly the hours solar produces most — self-consumption is high, payback is strong. "Let\'s protect your guest experience and own your summer costs."'],
        ],
      },
      {
        caption: 'Clinics & Healthcare — SPIN script',
        headers: ['Phase', 'Question / line'],
        rows: [
          ['S', 'Which equipment cannot tolerate a power interruption?'],
          ['S', 'Do you currently have any backup — UPS or genset?'],
          ['P', 'When the grid drops, what happens to your cold chain, diagnostics, or scheduled procedures?'],
          ['P', 'How often have you had outages in the last year, and how long?'],
          ['P', 'How much does a single hour of downtime actually cost you?'],
          ['I', 'The grid was one unit failure from rolling blackouts last July — how exposed are you?'],
          ['I', 'If a 2-hour cut spoils a batch of vaccines or cancels a list of procedures, what\'s the financial and reputational hit?'],
          ['N', 'If your critical loads rode through every grid cut untouched, what would that peace of mind be worth?'],
          ['N', 'If you also cut a brutal 26-cent bill while protecting patients, how does that change the priority?'],
          ['Steer', 'Lead with RELIABILITY, not savings. Solar + battery here is clinical risk insurance that also pays for itself. "Safeguard patient care · protect your cold chain · independence from a fragile grid."'],
        ],
      },
      {
        caption: 'Cold Storage & Food Processing — SPIN script',
        headers: ['Phase', 'Question / line'],
        rows: [
          ['S', 'What share of your load is refrigeration?'],
          ['S', 'Do you run a genset, and how often / at what monthly cost?'],
          ['P', 'How much has energy grown as a share of your cost per unit produced?'],
          ['P', 'What does an outage do to product at risk in your chillers/freezers?'],
          ['I', 'With no grid interconnection and blackouts threatened every summer — what\'s a full freezer of spoiled stock worth in one bad outage?'],
          ['I', 'If diesel and electricity both keep rising, what happens to your margin per unit over five years?'],
          ['N', 'If you cut your largest fixed cost 40–60% and protected stock through any cut — what would that do to your competitiveness?'],
          ['N', 'Would replacing diesel runtime with stored solar improve both cost and reliability?'],
          ['Steer', '24/7 baseload makes economics excellent. Quantify spoilage risk in euros — it\'s often bigger than the energy saving itself. "Protect your stock · cut cost per unit · replace the diesel."'],
        ],
      },
      {
        caption: 'Supermarkets & Retail — SPIN script',
        headers: ['Phase', 'Question / line'],
        rows: [
          ['S', 'What\'s your monthly bill per store, and how many sites do you operate?'],
          ['S', 'What share is refrigeration vs lighting/A/C, and what are your trading hours?'],
          ['P', 'How much has the bill risen, and how does the fuel adjustment hit thin retail margins?'],
          ['P', 'What does an outage do to chilled and frozen stock?'],
          ['I', 'On retail margins, a 3% rise plus an uncapped 26-cent rate compounds fast — what\'s that across all your stores over five years?'],
          ['I', 'One outage spoiling refrigerated stock across a store — what\'s the loss in product and customer trust?'],
          ['N', 'If you cut energy 40–60% per store and rolled it across the estate, what does that add to net margin?'],
          ['N', 'If the same system protected your cold stock during cuts, what\'s that worth per site?'],
          ['Steer', 'Daytime load = very high self-consumption = fast payback. Pitch as a per-site rollout across the whole estate. "Protect your margin · own your daytime load · predictable cost per site."'],
        ],
      },
      {
        caption: 'Warehouses & Manufacturing — SPIN script',
        headers: ['Phase', 'Question / line'],
        rows: [
          ['S', 'What\'s your monthly spend, demand (kVA), and voltage band?'],
          ['S', 'What\'s your production load profile across the day?'],
          ['S', 'Do you face demand charges or power-factor penalties?'],
          ['P', 'How much has energy grown as a share of your unit cost?'],
          ['P', 'Does an outage stop the line — and what does a stoppage cost per hour?'],
          ['I', 'You\'re exposed to the highest business rates in the EU with no price cap — over a 5–10 year horizon, what does that do to competitiveness against importers?'],
          ['I', 'A line stoppage during a summer blackout — cost in lost output and idle labour?'],
          ['N', 'If you shaved 40–60% off energy and stabilised it for 25 years, what does that do to your cost per unit and your quoting?'],
          ['N', 'Would protecting the line from grid cuts pay for itself in avoided downtime?'],
          ['Steer', 'Lean on hard ROI. Bring demand-charge reduction and power-factor correction as extra value. "Cut cost per unit · secure your output · long-term asset on your balance sheet."'],
        ],
      },
      {
        caption: 'Developer / PV park — BESS retrofit SPIN script',
        headers: ['Phase', 'Question / line'],
        rows: [
          ['S', 'Is the park operational, under construction, or still in permitting?'],
          ['S', 'What is the total installed capacity (MWp)?'],
          ['S', 'Do you have connection terms (POS) issued by EAC?'],
          ['S', 'Is the park currently under an O&M contract — and when does it expire?'],
          ['P', 'Is the park being curtailed by EAC? Approximately what percentage of output?'],
          ['P', 'Are you aware of the annual revenue you\'re losing to curtailment? (Cyprus avg 47% in 2025)'],
          ['P', 'Have you had inverter failures or significant downtime in the last 12 months?'],
          ['I', 'Cyprus curtailment doubled from 2024 to 2025 — now at 47%. If it continues to 60–70%, how does that affect your project ROI and any lender covenants?'],
          ['I', 'If curtailment continues unchecked for 3 more years, what is the cumulative lost revenue? We can run that number together.'],
          ['I', 'The DAM evening peak is ~€203/MWh vs a midday average of €84/MWh in the Oct 2025–Jul 2026 TSOC sample — that ~€119 spread is revenue the park cannot capture without storage (and it is seasonal).'],
          ['N', 'If a BESS paid back in 4–5 years and captured that curtailed energy plus the arbitrage spread — would that justify a feasibility study?'],
          ['N', 'Beyond curtailment recovery, BESS can earn from FFR (Frequency Fast Response) and FCR ancillary services through TSOC — did you know that was an option on your connection?'],
          ['N', 'Who else needs to be involved in this decision — directors, lenders, the bank financing the park?'],
          ['Steer', '"Stop losing money to curtailment · capture the arbitrage spread · future revenue streams from ancillary services · we bring the curtailment data, you make the decision."'],
        ],
      },
      {
        caption: 'Objection handling — with steer-to responses',
        headers: ['Objection', 'Response'],
        rows: [
          ['"It\'s too expensive upfront"', '"It\'s not a cost — it\'s swapping an unpredictable, rising bill for a fixed, owned asset. Most commercial systems pay back in a few years and then run near-free. What\'s your current bill doing over that same period?"'],
          ['"What if I sell the building?"', '"A solar asset raises property value and lowers running costs — it\'s a selling point, not a liability. And until then you\'re banking the savings every month."'],
          ['"Isn\'t solar wasted if the grid curtails it?"', '"Exactly why we pair it with storage — you capture that energy for evenings and outages instead of losing it. That\'s the difference between a panel array and an energy system you control."'],
          ['"I lease the roof"', '"Let\'s involve the owner — falling running costs benefit them too — or we look at a structure where you pay only for the power you use."'],
          ['"I\'ll wait"', '"Every month is another unpredictable bill at the highest rate in the EU, and it just went up again. Waiting doesn\'t lower the cost — it just means more months paying the grid\'s price instead of your own."'],
          ['"We don\'t have that much curtailment"', '"Esperia/Galascope — an active client group with similar operational PV in Cyprus — reported 47% average curtailment in 2025, now reaching 70% in 2026. We can pull the EAC curtailment data for your specific park and run the calculation together."'],
          ['"The payback is too long"', '"Let\'s check the actual numbers first — we use your real EAC bills, not estimates. Our commercial clients are seeing 3.5–5 year paybacks. Storage pushes that slightly longer but adds the reliability and arbitrage revenue that changes the whole picture."'],
        ],
      },
    ],
  },

  // ─── Document checklists ──────────────────────────────────────────────────
  {
    id: 'document-checklists',
    title: 'Document checklists — what to collect before permitting',
    summary:
      'Use this as a back-office and sales tracking guide. Check off documents as they are received. All three land registry documents must reference the same plot number — this is the most common cause of EAC application queries.',
    callouts: [
      {
        type: 'warning',
        text:
          'THREE-DOCUMENT RULE: Title deed, building permit, and topographic plan must ALL reference the same plot number. If plot numbers have changed (land consolidation / re-parcelling), you need EITHER a new title deed with the updated number OR the old cadastral register map (αρχαίο κτηματολόγιο) proving the old plot = new plot. Without this chain, EAC will query the application.',
      },
      {
        type: 'info',
        text:
          'Net Metering ended 31 Dec 2025 — all new applications are Net Billing. For existing Net Metering parks: adding BESS triggers reclassification to Net Billing terms. CERA licence must be obtained BEFORE submitting the EAC PCC (ΠΟΣ) application.',
      },
    ],
    tables: [
      {
        caption: 'Commercial / Residential rooftop PV — document checklist (≤500 kWp Net Billing)',
        headers: ['Document', 'Who provides it', 'Critical notes', 'Status field in CRM'],
        rows: [
          ['Title deed (τίτλος ιδιοκτησίας)', 'Client', 'Must show current plot number — EAC cross-checks via GIS', 'documents_received.title_deed'],
          ['Building permit (άδεια οικοδομής)', 'Client', 'Must reference the same plot number as title deed', 'documents_received.building_permit'],
          ['Topographic / cadastral plan', 'Client / licensed surveyor', 'Must show same plot number; must identify the building on the plot', 'documents_received.topographic_plan'],
          ['EAC energy statement (12 months)', 'Client via EAC portal', 'Downloads from eac.com.cy customer portal; shows meter number + kWh history', 'documents_received.eac_energy_statement'],
          ['List of electrical appliances + operating hours', 'Client', 'Needed to calculate consumption profile and confirm self-consumption ratio', 'documents_received.appliance_list'],
          ['E-ΔΔ-744 (electrical engineer\'s declaration)', 'Our electrical engineer', 'Signed by licensed ETEK electrical engineer; required for all sizes without exception', 'documents_received.e_dd_744'],
          ['Structural / load study (roof)', 'Licensed civil engineer', 'Confirms roof slab can support panel weight (~15–20 kg/m²). Must state allowable load, current load, conclusion.', 'documents_received.load_study'],
          ['Lease consent (if leasing)', 'Landlord', 'Required only if client does not own the building. Landlord must sign EAC application.', 'documents_received.lease_consent'],
          ['CERA construction licence (>30 kWp)', 'CERA portal (cera.org.cy)', 'Required before EAC application for systems above 30 kWp. Apply first.', 'documents_received.cera_licence'],
        ],
      },
      {
        caption: 'PV park BESS retrofit — additional documents',
        headers: ['Document', 'Who provides it', 'Critical notes'],
        rows: [
          ['Existing SLD (Single Line Diagram)', 'Client / EAC file', 'EAC holds the original on file; client or their engineer can request a copy'],
          ['CERA BESS construction licence', 'CERA portal', 'Sequential with EAC — CERA first, then EAC PCC. Exemption applies for <1 MW.'],
          ['Curtailment data (EAC DSO / TSOC)', 'EAC / TSOC MMS reports', 'Official documentation of curtailment %. Required for BESS sizing justification.'],
          ['Geotechnical / soil study', 'Licensed geotechnical engineer', 'For ground-mounted containers with foundations. Confirms bearing capacity for 10–20 tonne containers.'],
          ['Updated SLD including BESS', 'Our electrical engineer', 'Shows integration of inverter, battery modules, protection relays, and grid connection'],
          ['Grid connection capacity confirmation', 'EAC / grid study', 'Confirms connection point can accept BESS discharge (not just PV injection)'],
          ['EAC co-location exemption (if applicable)', 'EAC', 'For parks using the Jan 2026 co-location regulation — no new PCC required'],
        ],
      },
      {
        caption: 'Standalone BESS — document checklist',
        headers: ['Document', 'Who provides it', 'Critical notes'],
        rows: [
          ['Title deed / land ownership', 'Client', 'Must confirm right to develop the land'],
          ['CERA BESS licence (full)', 'CERA portal', 'Full licence required — exemption does not apply for standalone. Apply first.'],
          ['EAC PCC / connection terms', 'EAC', '6–18 month process; submit after CERA licence in hand'],
          ['Environmental permit (DoE / MECI)', 'MECI OSS portal', 'Required for any installation above minimum thresholds'],
          ['Building permit (local authority)', 'Local authority', 'BESS containers with foundations are classified as structures'],
          ['Geotechnical study', 'Licensed engineer', 'Mandatory for foundations. Confirms soil bearing for containers + substation.'],
          ['Grid connection capacity study', 'Licensed engineer', 'Required by EAC for standalone storage'],
        ],
      },
    ],
  },

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
        caption: 'Cyprus DAM price profile — TSOC data Oct 2025–Jul 2026 (283 days)',
        headers: ['Period', 'Avg price (€/MWh)', 'Key insight'],
        rows: [
          ['Midday solar (10:00–14:00)', '€84 (seasonal — spring near zero, summer often higher)', 'Duck curve — worst revenue hours for PV, not every month'],
          ['Evening peak (17:00–21:00)', '€203', 'BESS discharge window — best revenue'],
          ['Solar hours (06:00–17:00)', '€138', 'Daytime average including the morning ramp'],
          ['Peak–midday spread', '€119/MWh average', 'BESS opportunity per cycle; Apr–May much wider'],
          ['Zero-price midday days', '165 of 283 days', 'At least one €0 midday print'],
        ],
      },
      {
        caption: 'BESS revenue pitch — operational PV owner example (4 MW park)',
        headers: ['Scenario', 'Annual impact'],
        rows: [
          ['Lost revenue from curtailment (11–19% avg, EAC tariff ~€110/MWh)', '€50k–€140k/year per MW curtailed'],
          ['BESS captures 2h storage × 250 cycles/yr × 4 MW = 2,000 MWh/yr', 'Revenue at €203/MWh evening ≈ €406k/yr'],
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
  // ─── CRM Development roadmap ──────────────────────────────────────────────
  {
    id: 'crm-roadmap',
    title: 'CRM development roadmap (internal)',
    summary:
      'Planned integrations and improvements — for Alexander and dev reference only. Priority order listed below.',
    callouts: [
      {
        type: 'info',
        text:
          'Priority 1 — OpenSolar integration (in progress): push qualified commercial prospects from CRM → OpenSolar for system design; pull completed design data (kWp, annual yield, price) back via webhook. Standard API Access tier is sufficient. See knowledge section for implementation plan.',
      },
      {
        type: 'info',
        text:
          'Priority 2 — WhatsApp & email auto-logging (parked): allow each rep to connect their work email and WhatsApp so calls/messages are logged automatically without manual "Log call" entries. Two options evaluated: (A) BCC logger via Resend inbound parsing — simplest, any email client, 1 day build; (B) Gmail API OAuth polling — fully automatic, 3–4 days. WhatsApp: WATI/Respond.io for shared company number, or Evolution API for personal numbers. Decision pending after OpenSolar integration is live.',
      },
    ],
    tables: [
      {
        caption: 'CRM integration priority list',
        headers: ['Priority', 'Integration', 'Status', 'Effort', 'Cost', 'Notes'],
        rows: [
          ['1', 'OpenSolar — push prospects + pull designs', 'In progress', '3–5 days', 'Free (standard API)', 'Enable API Access in OpenSolar → get org_id + machine user token → add to Vercel env vars → build push button on commercial card + webhook to receive design completions'],
          ['2', 'Email auto-logging — BCC logger', 'Parked', '1 day', 'Free', 'BCC log@solarfarms.cy when emailing clients → server parses → auto-logs to activity_feed. Simplest email integration, no OAuth needed.'],
          ['3', 'Email auto-logging — Gmail API sync', 'Parked', '3–4 days', 'Free (Google Workspace)', 'Each rep connects @lighthief.com Google account via OAuth → polls Sent Mail every 15 min → matches contact_email → auto-logs. Zero friction for reps.'],
          ['4', 'WhatsApp — shared company number (WATI/Respond.io)', 'Parked', '2 days + setup', '€50–150/month', 'Official Meta WhatsApp Business API. Team inbox. Webhook to /api/crm/webhooks/whatsapp matches phone → prospect → logs message.'],
          ['5', 'WhatsApp — personal numbers (Evolution API)', 'Parked', '1–2 days + server', 'Server cost only', 'Each rep scans QR to connect personal WhatsApp. Unofficial but works for low-volume sales teams.'],
          ['6', 'Document checklist tracking (documents_received JSONB)', 'Designed', '1 day', 'Free', 'Add documents_received column to pv_prospects. Show per-project checklist in expanded card (title deed, building permit, etc.). Needs Supabase migration.'],
          ['7', 'SPIN analytics on dashboard', 'Designed', '1 day', 'Free', 'Aggregate spin_phase from structured call log entries. Show per-rep SPIN phase distribution and where deals stall.'],
        ],
      },
    ],
    links: [
      { label: 'OpenSolar API documentation', href: 'https://developers.opensolar.com/' },
      { label: 'OpenSolar — enable API Access in Settings → Integrations', href: 'https://app.opensolar.com' },
      { label: 'WATI WhatsApp Business API', href: 'https://wati.io' },
      { label: 'Evolution API (personal WhatsApp bridge)', href: 'https://evolution-api.com' },
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
