/**
 * Generates investor-ready Excel (xlsx) for Agios Theodoros RTB (PARK-RTB-2026).
 * Output: public/lighthief-cyprus/parks-for-sale/agios-theodoros-rtb/ (same folder as HTML teaser).
 * Run: npx tsx scripts/generate-agios-theodoros-investor-xlsx.ts
 *
 * Sheets: Cover, Investor_Summary, Revenue_Model, Assumptions, Debt_Schedule, Annual_Model, Checks
 * Revenue_Model: full PV+BESS dispatch derivation — gross revenue cell drives Assumptions row 4.
 * Includes: levered equity IRR, NPV @ hurdle, aggregator fee, CIT, D&A, debt PMT, FCFE, equity tiers.
 */
import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'
import {
  AGIOS_THEODOROS_RTB as AG,
  AGIOS_INVESTOR_PACK,
} from '../lib/deals/agios-theodoros-rtb'

const PACK_DIR = path.join(
  process.cwd(),
  'public',
  'lighthief-cyprus',
  'parks-for-sale',
  'agios-theodoros-rtb'
)
const OUT_FILE = path.join(PACK_DIR, AGIOS_INVESTOR_PACK.modelFile)

/** Excel 1-based row/col for Assumptions!B column values (aligned with written rows) */
const A = {
  grossRevY1: 4,
  aggFeePct: 5,
  citPct: 6,
  revEsc: 7,
  pvOmY1: 8,
  bessOmY1: 9,
  otherOmY1: 10,
  opexEsc: 11,
  landLeaseY1: 12,
  landEsc: 13,
  deprBase: 14,
  deprYears: 15,
  amortBase: 16,
  amortYears: 17,
  loanPrincipal: 18,
  loanRate: 19,
  loanTerm: 20,
  totalCapex: 21,
  equityTotal: 22,
  discountRate: 23,
}

function enc(r: number, c: number) {
  return XLSX.utils.encode_cell({ r: r - 1, c: c - 1 })
}

function bRow(r: number) {
  return `Assumptions!$B$${r}`
}

const B = (r: number) => bRow(r)

function setCell(
  ws: XLSX.WorkSheet,
  r1: number,
  c1: number,
  v: string | number | { f: string; z?: string },
  pct?: boolean
) {
  const addr = enc(r1, c1)
  if (typeof v === 'object' && 'f' in v) {
    ws[addr] = { f: v.f, t: 'n', z: v.z ?? '#,##0', v: 0 }
  } else if (typeof v === 'number') {
    ws[addr] = { v, t: 'n', z: pct ? '0.00%' : '#,##0.00' }
  } else {
    ws[addr] = { v, t: 's' }
  }
}

function buildCover(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  const lines = [
    [`Agios Theodoros — Investor Financial Model`],
    [`${AG.referenceCode} | Lighthief Cyprus Ltd | March 2026`],
    [],
    ['ABOUT THIS MODEL'],
    [
      'Indicative project economics for qualified investor discussion. Not an offer to sell or solicitation to invest.',
    ],
    [],
    ['WORKBOOK STRUCTURE'],
    ['• Investor_Summary — project overview, KPIs, equity IRR / NPV, and equity participation tiers.'],
    ['• Revenue_Model — energy dispatch model: annual production, curtailment, BESS dispatch, DAM pricing. Edit assumptions here.'],
    ['• Assumptions — financial model inputs (OPEX, D&A, debt, discount rate). Gross revenue links from Revenue_Model.'],
    ['• Debt_Schedule — senior loan amortisation schedule.'],
    ['• Annual_Model — full P&L, cash flow to equity, levered IRR and NPV.'],
    ['• Checks — model integrity checks.'],
    [],
    ['KEY MODEL PARAMETERS'],
    [
      `Total CAPEX: €${(AG.capexStackEUR.total / 1e6).toFixed(2)}M | Senior debt: €${(AG.finance.seniorDebtEUR / 1e6).toFixed(2)}M | Equity: €${(AG.finance.equityEUR / 1e6).toFixed(2)}M | Y1 gross revenue: €${(AG.finance.grossEnergyRevenueY1EUR / 1000).toFixed(0)}k`,
    ],
    [],
    ['DISCLAIMER'],
    ['This model is indicative only. All figures are subject to final engineering, legal, and financial due diligence.'],
    ['Investors should obtain independent tax and legal advice. Model excludes VAT, withholding tax, and SDC on dividends.'],
    ['Revenue projections are based on TSOC day-ahead market sample data and are not a guarantee of future performance.'],
  ]
  lines.forEach((row, i) => {
    setCell(ws, i + 1, 1, row[0] as string)
  })
  ws['!ref'] = `A1:A${lines.length}`
  ws['!cols'] = [{ wch: 110 }]
  return ws
}

type AnnualModelMeta = {
  ws: XLSX.WorkSheet
  rNetRev: number
  /** Row in Annual_Model where levered FCFE for year 1 is (col B) */
  rFcfe: number
  /** Row where Equity IRR formula is (value in col B) */
  irrRow: number
  /** Row where Equity NPV formula is (value in col B) */
  npvRow: number
}

function buildInvestorSummary(meta: AnnualModelMeta): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  const am = 'Annual_Model!'
  const ir = meta.irrRow
  const nr = meta.npvRow
  const rf = meta.rFcfe
  const rn = meta.rNetRev

  let r = 1
  const title = (t: string) => {
    setCell(ws, r, 1, t)
    r++
  }
  const row = (label: string, val: string | number | { f: string; z?: string }, pct?: boolean) => {
    setCell(ws, r, 1, label)
    setCell(ws, r, 2, val, pct)
    r++
  }

  title('INVESTOR SUMMARY — Agios Theodoros RTB')
  r++
  row('Project reference', AG.referenceCode)
  row('CERA licence', AG.ceraLicense)
  row('Location', AG.locationLine)
  row('Timeline', AG.timelineHeadline)
  r++
  title('Technical')
  row('Solar capacity (MWp)', AG.solarMWp)
  row('BESS power (MW)', AG.bessPowerMW)
  row('BESS energy (MWh)', AG.bessMWh)
  row('BESS duration (h)', AG.bessDurationHours)
  row('Technology — PV', AG.technologySolar)
  row('Technology — BESS', AG.technologyBess)
  row('Indicative yield (kWh/kWp·yr)', AG.specificYieldKwhPerKwp)
  row('Annual production (MWh/yr)', AG.annualProductionMWh)
  r++
  title('Capital structure (EUR)')
  row('Total CAPEX', AG.capexStackEUR.total)
  row('Senior debt', AG.finance.seniorDebtEUR)
  row('Equity (all-in)', AG.finance.equityEUR)
  row(
    'Debt / (PV+BESS EPC)',
    AG.finance.seniorDebtEUR / (AG.capexStackEUR.pvEpc + AG.capexStackEUR.bessEpc),
    true
  )
  row('Loan nominal rate', AG.finance.loanNominalRate, true)
  row('Loan term (years)', AG.finance.loanTermYears)
  r++
  title('Revenue & tax (Y1 basis)')
  row('Y1 gross energy revenue', AG.finance.grossEnergyRevenueY1EUR)
  row('Aggregator fee (% of gross)', AG.finance.aggregatorFeePct, true)
  row('CIT rate (Cyprus)', AG.finance.citPct, true)
  row('Y1 net revenue (model Y1)', { f: `${am}${enc(rn, 2)}`, z: '#,##0' })
  row(
    'Y1 total OPEX (PV+BESS+other+land)',
    AG.opexY1EUR.pvOm + AG.opexY1EUR.bessOm + AG.opexY1EUR.other + AG.opexY1EUR.landLease
  )
  r++
  title('Returns (from Annual_Model — levered, after tax)')
  row('Levered equity IRR', { f: `${am}$B$${ir}`, z: '0.00%' })
  row('Equity NPV @ hurdle', { f: `${am}$B$${nr}`, z: '#,##0' })
  row('NPV discount rate (hurdle)', { f: B(A.discountRate), z: '0.00%' })
  row('Y1 levered cash flow to equity', { f: `${am}${enc(rf, 2)}`, z: '#,##0' })
  row('Indicative levered IRR (teaser / IC note)', AG.finance.leveredEquityIrrIndicative)
  r++
  title('Indicative equity tickets (cash economics in full model)')
  let tierR = r
  setCell(ws, tierR, 1, 'Equity %')
  setCell(ws, tierR, 2, 'Equity EUR')
  setCell(ws, tierR, 3, 'Y1 FCFE from model (levered, after-tax)')
  tierR++
  for (const t of AG.equityTiers) {
    setCell(ws, tierR, 1, `${t.pct}%`)
    setCell(ws, tierR, 2, t.equityEUR)
    // Dynamic: tier share of model Y1 FCFE — updates automatically when assumptions change
    setCell(ws, tierR, 3, { f: `${am}${enc(rf, 2)}*${t.pct / 100}`, z: '#,##0' })
    tierR++
  }
  r = tierR
  r++
  title(`Wholesale electricity reference (TSOC DAM — ${AG.marketDAM.sampleNote})`)
  row('24-hour average (€/MWh)', AG.marketDAM.avgEURPerMWh)
  row('Evening peak 17:00–21:00 (€/MWh)', AG.marketDAM.peakEveningEURPerMWh)
  row('Midday 10:00–14:00 (€/MWh)', AG.marketDAM.middayEURPerMWh)
  row('Peak vs midday spread (€/MWh)', AG.marketDAM.peakMiddaySpreadEURPerMWh)
  r++
  setCell(ws, r, 1, 'Model methodology')
  setCell(
    ws,
    r,
    2,
    'Revenue_Model → Assumptions → Debt_Schedule → Annual_Model. Equity IRR: CF0 = −equity invested; CF1..15 = levered after-tax cash flow.'
  )
  r++
  setCell(ws, r, 1, 'Disclaimer')
  setCell(
    ws,
    r,
    2,
    'Indicative only. Subject to final due diligence. Not an offer. Investors should obtain independent tax and legal advice.'
  )

  ws['!ref'] = `A1:C${r}`
  ws['!cols'] = [{ wch: 46 }, { wch: 22 }, { wch: 28 }]
  return ws
}

type RevenueModelMeta = {
  ws: XLSX.WorkSheet
  /** Row (1-based) in Revenue_Model sheet where gross Y1 revenue is */
  grossRevRow: number
}

function buildRevenueModel(): RevenueModelMeta {
  const ws: XLSX.WorkSheet = {}
  const rm = AG.revenueModel

  setCell(ws, 1, 1, 'REVENUE MODEL — Agios Theodoros (Energy Dispatch & Pricing)')
  setCell(ws, 2, 1, 'Yellow cells are editable. All revenue calculations update automatically.')
  setCell(ws, 3, 1, 'Parameter')
  setCell(ws, 3, 2, 'Value')
  setCell(ws, 3, 3, 'Notes')

  let r = 4

  const editable = (label: string, val: number, note: string, fmt: string) => {
    setCell(ws, r, 1, label)
    ws[enc(r, 2)] = { v: val, t: 'n', z: fmt }
    setCell(ws, r, 3, note)
    r++
    return r - 1
  }

  const calc = (label: string, formula: string, note: string, fmt = '#,##0') => {
    setCell(ws, r, 1, label)
    ws[enc(r, 2)] = { f: formula, t: 'n', z: fmt, v: 0 }
    setCell(ws, r, 3, note)
    r++
    return r - 1
  }

  // Production
  setCell(ws, r, 1, '— Annual Energy Production —'); r++
  const rProd = editable(
    'Annual gross production (MWh/yr)',
    AG.annualProductionMWh,
    `${AG.solarMWp} MWp × ${AG.specificYieldKwhPerKwp} kWh/kWp — ${AG.technologySolar}`,
    '#,##0'
  )

  // Dispatch
  r++
  setCell(ws, r, 1, '— Curtailment & BESS Dispatch —'); r++
  const rCurtPct = editable(
    'Curtailment rate (% of gross production)',
    rm.curtailmentPct,
    'Editable — 65% is the 2027 baseline (Cyprus curtailment trending up); stress-test at 55% for upside',
    '0%'
  )
  const rCurtMwh = calc(
    'Curtailed energy → captured by BESS (MWh/yr)',
    `B${rProd}*B${rCurtPct}`,
    'Energy stored in BESS for peak discharge'
  )
  const rUncurtMwh = calc(
    'Uncurtailed solar → sold direct to grid (MWh/yr)',
    `B${rProd}*(1-B${rCurtPct})`,
    'Sold at daytime DAM rate'
  )
  const rCapturePct = editable(
    'BESS storage efficiency (% of curtailed captured)',
    rm.bessCapturePct,
    'Accounts for SOC limits and auxiliary consumption',
    '0%'
  )
  const rBessOut = calc(
    'Net energy discharged from BESS (MWh/yr)',
    `B${rCurtMwh}*B${rCapturePct}*0.8632`,
    'Curtailed × capture rate × round-trip efficiency (86.32%)'
  )

  // DAM pricing
  r++
  setCell(ws, r, 1, '— Market Pricing (TSOC Day-Ahead Market) —'); r++
  setCell(ws, r, 1, 'Data source')
  setCell(ws, r, 2, `TSOC DAM sample: ${AG.marketDAM.sampleNote}`)
  r++
  const rDaytime = editable(
    'Daytime electricity price (€/MWh, avg 06:00–17:00)',
    rm.uncurtailedSolarRateEURPerMWh,
    'Average over sample period — edit with updated TSOC data',
    '#,##0.00'
  )
  const rPeak = editable(
    'Evening peak electricity price (€/MWh, avg 17:00–21:00)',
    rm.bessDischargeRateEURPerMWh,
    'BESS dispatches during evening peak — edit with updated TSOC data',
    '#,##0.00'
  )

  // Revenue output
  r++
  setCell(ws, r, 1, '— Year 1 Gross Revenue —'); r++
  const rSolarRev = calc(
    'Solar revenue Y1 (EUR)',
    `B${rUncurtMwh}*B${rDaytime}`,
    'Uncurtailed MWh × daytime price'
  )
  const rBessRev = calc(
    'BESS revenue Y1 (EUR)',
    `B${rBessOut}*B${rPeak}`,
    'Discharged MWh × evening peak price'
  )
  const rGrossRev = calc(
    'TOTAL GROSS REVENUE Y1 (EUR)',
    `B${rSolarRev}+B${rBessRev}`,
    'Feeds into Assumptions → Annual_Model'
  )
  r++

  ws['!ref'] = `A1:C${r}`
  ws['!cols'] = [{ wch: 54 }, { wch: 18 }, { wch: 72 }]
  return { ws, grossRevRow: rGrossRev }
}

function buildAssumptions(grossRevRef: string): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  setCell(ws, 1, 1, 'ASSUMPTIONS — Agios Theodoros RTB')
  setCell(ws, 3, 1, 'Parameter')
  setCell(ws, 3, 2, 'Value')
  setCell(ws, 3, 3, 'Notes / unit')

  const rows: [string, number | string | { f: string; z?: string }, string][] = [
    [
      'Gross annual energy revenue — Year 1 (EUR)',
      { f: grossRevRef, z: '#,##0' },
      `Calculated in Revenue_Model sheet — edit curtailment % and DAM rates there`,
    ],
    ['Aggregator / offtake fee (% of gross energy revenue)', AG.finance.aggregatorFeePct, 'Fee to market aggregator / offtake counterparty'],
    ['Corporate income tax rate (Cyprus)', AG.finance.citPct, AG.finance.citNote],
    ['Revenue escalation (% p.a.)', 0.02, 'Annual uplift applied to gross revenue from Y2'],
    ['PV O&M — Year 1 (EUR)', AG.opexY1EUR.pvOm, 'Solar array maintenance and monitoring'],
    ['BESS O&M — Year 1 (EUR)', AG.opexY1EUR.bessOm, 'Battery system maintenance and monitoring'],
    ['Other fixed O&M — Year 1 (EUR)', AG.opexY1EUR.other, 'Insurance, administration, miscellaneous'],
    ['OPEX escalation (% p.a.)', 0.02, 'Applied to PV O&M, BESS O&M, and other O&M from Y2'],
    ['Land lease — Year 1 (EUR)', AG.opexY1EUR.landLease, 'Annual land lease — verify against signed lease deed'],
    ['Land lease escalation (% p.a.)', 0.02, 'Applied to land lease from Y2'],
    [
      'Depreciable asset base — plant & equipment (EUR)',
      AG.depreciationEUR.pvPlusBessBase,
      'PV + BESS EPC cost (straight-line depreciation)',
    ],
    ['Depreciation period (years)', AG.depreciationEUR.pvPlusBessYears, 'Straight-line over asset life'],
    [
      'Amortisable asset base — licences & development (EUR)',
      AG.depreciationEUR.rtbPlusDevBase,
      'RTB acquisition + development costs (straight-line amortisation)',
    ],
    ['Amortisation period (years)', AG.depreciationEUR.rtbPlusDevYears, 'Straight-line over licence term'],
    [
      'Senior loan principal (EUR)',
      AG.finance.seniorDebtEUR,
      `~${Math.round((AG.finance.seniorDebtEUR / (AG.capexStackEUR.pvEpc + AG.capexStackEUR.bessEpc)) * 100)}% of plant & equipment EPC cost`,
    ],
    ['Loan interest rate (annual, nominal)', AG.finance.loanNominalRate, 'Indicative — replace with signed term sheet rate'],
    ['Loan term (years)', AG.finance.loanTermYears, 'Full amortisation period'],
    ['Total project CAPEX (EUR)', AG.capexStackEUR.total, 'PV EPC + BESS EPC + RTB acquisition + development'],
    ['Total equity funded (EUR)', AG.finance.equityEUR, 'Year 0 equity outflow — basis for IRR calculation'],
    [
      'Discount rate for NPV — equity hurdle (annual)',
      AG.finance.npvDiscountRate,
      'Investor required return — not the debt rate',
    ],
  ]

  const pctValueRows = new Set([5, 6, 7, 11, 13, 19, 23])

  let rr = 4
  for (const [label, val, note] of rows) {
    setCell(ws, rr, 1, label)
    setCell(ws, rr, 2, typeof val === 'number' ? val : val, pctValueRows.has(rr))
    setCell(ws, rr, 3, note)
    rr++
  }
  rr++

  ws['!ref'] = `A1:C${rr - 1}`
  ws['!cols'] = [{ wch: 48 }, { wch: 14 }, { wch: 60 }]
  return ws
}

function buildDebtSchedule(years: number): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  setCell(ws, 1, 1, 'Debt schedule — senior facility (formulas)')
  setCell(ws, 3, 1, 'Year')
  setCell(ws, 3, 2, 'Opening balance')
  setCell(ws, 3, 3, 'Interest')
  setCell(ws, 3, 4, 'Principal')
  setCell(ws, 3, 5, 'Total debt service')
  setCell(ws, 3, 6, 'Closing balance')

  setCell(ws, 2, 8, {
    f: `PMT(${B(A.loanRate)},${B(A.loanTerm)},-${B(A.loanPrincipal)})`,
  })
  setCell(ws, 1, 8, 'Annual PMT (helper)')

  for (let y = 1; y <= years; y++) {
    const row = 3 + y
    setCell(ws, row, 1, y)
    if (y === 1) {
      setCell(ws, row, 2, { f: B(A.loanPrincipal) })
    } else {
      setCell(ws, row, 2, { f: enc(row - 1, 6) })
    }
    setCell(ws, row, 3, { f: `${enc(row, 2)}*${B(A.loanRate)}` })
    setCell(ws, row, 5, { f: `$H$2` })
    setCell(ws, row, 4, { f: `${enc(row, 5)}-${enc(row, 3)}` })
    setCell(ws, row, 6, { f: `${enc(row, 2)}-${enc(row, 4)}` })
  }

  ws['!ref'] = `A1:H${3 + years}`
  ws['!cols'] = [{ wch: 8 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 18 }, { wch: 16 }, { wch: 4 }, { wch: 16 }]
  return ws
}

function buildAnnualModel(years: number): AnnualModelMeta {
  const ws: XLSX.WorkSheet = {}
  const startCol = 2
  const yearRow = 4

  setCell(ws, 1, 1, 'ANNUAL MODEL — after-tax, levered (formulas)')
  setCell(ws, yearRow, 1, 'Operating year #')
  for (let y = 1; y <= years; y++) {
    setCell(ws, yearRow, startCol + y - 1, y)
  }

  let row = 5
  const line = (label: string) => {
    setCell(ws, row, 1, label)
    row++
    return row - 1
  }

  const rGross = line('Gross energy revenue')
  const rAgg = line('Aggregator fee (% of gross — see Assumptions)')
  const rNetRev = line('Net revenue after aggregator')
  const rPvOm = line('PV O&M')
  const rBessOm = line('BESS O&M')
  const rOtherOm = line('Other O&M')
  const rLand = line('Land lease')
  const rTotOpex = line('Total operating costs')
  const rEbitda = line('EBITDA')
  const rDepr = line('Depreciation (PV+BESS)')
  const rAmort = line('Amortization (RTB+dev)')
  const rEbit = line('EBIT')
  const rInt = line('Interest (senior debt)')
  const rEbt = line('Taxable profit (EBT)')
  const rTax = line('Corporate income tax (15%)')
  const rNi = line('Net income (after tax)')
  const rDaAdd = line('Add back: depreciation + amortization')
  const rCfo = line('Cash from operations (before principal)')
  const rPrin = line('Principal repayment (senior)')
  const rFcfe = line('Levered cash flow to equity')

  for (let y = 1; y <= years; y++) {
    const c = startCol + y - 1
    const yc = enc(yearRow, c)
    const debtR = 3 + y

    // year-1 exponent: Y1 = base * POWER(g, 0) = base; Y2 = base * POWER(g, 1); etc.
    setCell(ws, rGross, c, { f: `${B(A.grossRevY1)}*POWER(1+${B(A.revEsc)},${yc}-1)` })
    setCell(ws, rAgg, c, { f: `${enc(rGross, c)}*${B(A.aggFeePct)}` })
    setCell(ws, rNetRev, c, { f: `${enc(rGross, c)}-${enc(rAgg, c)}` })

    setCell(ws, rPvOm, c, {
      f: `${B(A.pvOmY1)}*POWER(1+${B(A.opexEsc)},${yc}-1)`,
    })
    setCell(ws, rBessOm, c, {
      f: `${B(A.bessOmY1)}*POWER(1+${B(A.opexEsc)},${yc}-1)`,
    })
    setCell(ws, rOtherOm, c, {
      f: `${B(A.otherOmY1)}*POWER(1+${B(A.opexEsc)},${yc}-1)`,
    })
    setCell(ws, rLand, c, {
      f: `${B(A.landLeaseY1)}*POWER(1+${B(A.landEsc)},${yc}-1)`,
    })
    setCell(ws, rTotOpex, c, {
      f: `SUM(${enc(rPvOm, c)}:${enc(rLand, c)})`,
    })
    setCell(ws, rEbitda, c, { f: `${enc(rNetRev, c)}-${enc(rTotOpex, c)}` })
    setCell(ws, rDepr, c, { f: `${B(A.deprBase)}/${B(A.deprYears)}` })
    setCell(ws, rAmort, c, { f: `${B(A.amortBase)}/${B(A.amortYears)}` })
    setCell(ws, rEbit, c, {
      f: `${enc(rEbitda, c)}-${enc(rDepr, c)}-${enc(rAmort, c)}`,
    })
    setCell(ws, rInt, c, { f: `Debt_Schedule!${enc(debtR, 3)}` })
    setCell(ws, rEbt, c, { f: `${enc(rEbit, c)}-${enc(rInt, c)}` })
    setCell(ws, rTax, c, {
      f: `IF(${enc(rEbt, c)}>0,${enc(rEbt, c)}*${B(A.citPct)},0)`,
    })
    setCell(ws, rNi, c, { f: `${enc(rEbt, c)}-${enc(rTax, c)}` })
    setCell(ws, rDaAdd, c, { f: `${enc(rDepr, c)}+${enc(rAmort, c)}` })
    setCell(ws, rCfo, c, { f: `${enc(rNi, c)}+${enc(rDaAdd, c)}` })
    setCell(ws, rPrin, c, { f: `Debt_Schedule!${enc(debtR, 4)}` })
    setCell(ws, rFcfe, c, { f: `${enc(rCfo, c)}-${enc(rPrin, c)}` })
  }

  const cfRow = rFcfe + 3
  setCell(ws, cfRow - 1, 1, 'Equity cash flow row for IRR / NPV (EUR)')
  setCell(ws, cfRow, 1, { f: `-${B(A.equityTotal)}` })
  for (let y = 1; y <= years; y++) {
    const c = startCol + y - 1
    setCell(ws, cfRow, c, { f: `${enc(rFcfe, c)}` })
  }
  const lastC = startCol + years - 1
  const rangeAll = `${enc(cfRow, 1)}:${enc(cfRow, lastC)}`
  const rangeOps = `${enc(cfRow, 2)}:${enc(cfRow, lastC)}`

  const irrRow = cfRow + 1
  const npvRow = cfRow + 2
  setCell(ws, irrRow, 1, 'Equity IRR (levered, after tax)')
  setCell(ws, irrRow, 2, {
    f: `IRR(${rangeAll})`,
    z: '0.00%',
  })

  setCell(ws, npvRow, 1, 'Equity NPV @ hurdle (EUR)')
  setCell(ws, npvRow, 2, {
    f: `${enc(cfRow, 1)}+NPV(${B(A.discountRate)},${rangeOps})`,
    z: '#,##0',
  })
  setCell(ws, npvRow, 3, 'CF0 + NPV — discount rate on Assumptions')

  ws['!ref'] = `A1:${enc(npvRow, lastC)}`
  ws['!cols'] = [{ wch: 42 }, ...Array(years + 1).fill({ wch: 14 })]
  return { ws, rNetRev, rFcfe, irrRow, npvRow }
}

function buildChecksFixed(years: number, rNetRev: number): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  setCell(ws, 1, 1, 'CHECKS')
  setCell(ws, 3, 1, 'Total principal repaid (should = loan principal)')
  const firstPr = enc(4, 4)
  const lastPr = enc(3 + years, 4)
  setCell(ws, 3, 2, { f: `SUM(Debt_Schedule!${firstPr}:Debt_Schedule!${lastPr})` })
  setCell(ws, 3, 3, '≈')
  setCell(ws, 3, 4, { f: B(A.loanPrincipal) })

  setCell(ws, 5, 1, 'Y1 gross × (1 − aggregator fee)')
  setCell(ws, 5, 2, { f: `${B(A.grossRevY1)}*(1-${B(A.aggFeePct)})` })
  setCell(ws, 5, 3, 'should match Annual_Model net revenue Y1')
  setCell(ws, 5, 4, { f: `Annual_Model!${enc(rNetRev, 2)}` })

  ws['!ref'] = 'A1:D6'
  return ws
}

function main() {
  const YEARS = 15
  fs.mkdirSync(PACK_DIR, { recursive: true })

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, buildCover(), 'Cover')

  // Revenue_Model drives Assumptions row 4 (grossRevY1) via cross-sheet formula
  const revModelMeta = buildRevenueModel()
  const grossRevRef = `Revenue_Model!$B$${revModelMeta.grossRevRow}`

  const assumptions = buildAssumptions(grossRevRef)
  const debt = buildDebtSchedule(YEARS)
  const annualMeta = buildAnnualModel(YEARS)
  const checks = buildChecksFixed(YEARS, annualMeta.rNetRev)
  const investorSummary = buildInvestorSummary(annualMeta)

  // Sheet order: Cover, Investor_Summary, Revenue_Model, Assumptions, Debt_Schedule, Annual_Model, Checks
  XLSX.utils.book_append_sheet(wb, investorSummary, 'Investor_Summary')
  XLSX.utils.book_append_sheet(wb, revModelMeta.ws, 'Revenue_Model')
  XLSX.utils.book_append_sheet(wb, assumptions, 'Assumptions')
  XLSX.utils.book_append_sheet(wb, debt, 'Debt_Schedule')
  XLSX.utils.book_append_sheet(wb, annualMeta.ws, 'Annual_Model')
  XLSX.utils.book_append_sheet(wb, checks, 'Checks')

  XLSX.writeFile(wb, OUT_FILE, { bookType: 'xlsx' })
  console.log('Wrote', OUT_FILE)
}

main()
