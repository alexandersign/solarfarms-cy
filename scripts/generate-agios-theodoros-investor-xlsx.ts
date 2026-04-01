/**
 * Generates investor-ready Excel (xlsx) for Agios Theodoros RTB (PARK-RTB-2026).
 * Run: npx tsx scripts/generate-agios-theodoros-investor-xlsx.ts
 *
 * Sheets: Cover, Assumptions, Debt_Schedule, Annual_Model, Checks
 * Includes: 10% aggregator fee on gross energy revenue, 15% CIT on taxable profit,
 * land lease, straight-line D&A, senior debt PMT, levered cash to equity.
 */
import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'
import { AGIOS_THEODOROS_RTB as AG } from '../lib/deals/agios-theodoros-rtb'

const OUT_DIR = path.join(process.cwd(), 'docs', 'investor-models')
const OUT_FILE = path.join(OUT_DIR, 'agios-theodoros-rtb-investor-model-mar2026.xlsx')
const PUBLIC_DIR = path.join(
  process.cwd(),
  'public',
  'lighthief-cyprus',
  'parks-for-sale'
)
const PUBLIC_FILE = path.join(PUBLIC_DIR, 'agios-theodoros-rtb-investor-model-mar2026.xlsx')

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
  /** Discount rate for NPV (not the same as loan rate — edit for investor hurdle) */
  discountRate: 23,
}

function enc(r: number, c: number) {
  return XLSX.utils.encode_cell({ r: r - 1, c: c - 1 })
}

function bRow(r: number) {
  return `Assumptions!$B$${r}`
}

const B = (r: number) => bRow(r)

// Debt_Schedule: header row 3, data year k in row 3+k (Excel 1-based)
// Cols: A=Year, B=Opening, C=Interest, D=Principal, E=Payment, F=Closing

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
    ['Agios Theodoros — RTB Investor Model (PARK-RTB-2026)'],
    ['Generated workbook — March 2026'],
    [],
    ['PURPOSE'],
    [
      'Indicative project economics for qualified investor discussion. Not an offer to sell securities.',
    ],
    [],
    ['KEY FEATURES'],
    ['• Gross merchant revenue escalated annually; 10% aggregator/offtake fee on gross energy revenue.'],
    ['• Operating costs: PV O&M, BESS O&M, other fixed O&M, land lease (all may escalate).'],
    ['• Depreciation (PV+BESS) and amortization (RTB+development) reduce taxable profit.'],
    ['• Cyprus corporate income tax 15% applied to taxable profit (losses = no tax this period).'],
    ['• Senior debt: annuity on loan principal; interest + principal from Debt_Schedule.'],
    ['• Levered cash flow (equity) = Net income + D&A − principal repayment (simplified, no WC).'],
    [],
    ['RECONCILIATION TO PUBLIC SITE + TEASER'],
    ['SSOT: lib/deals/agios-theodoros-rtb.ts — same CAPEX / revenue / debt / equity as solarfarms.cy and 1-page HTML teaser.'],
    [
      `Totals: €${(AG.capexStackEUR.total / 1e6).toFixed(2)}M CAPEX, €${(AG.finance.seniorDebtEUR / 1e6).toFixed(2)}M debt, €${(AG.finance.equityEUR / 1e6).toFixed(2)}M equity, €${(AG.finance.grossEnergyRevenueY1EUR / 1e6).toFixed(2)}M Y1 gross revenue.`,
    ],
    ['User must verify all inputs with signed contracts.'],
    [],
    ['INDEPENDENT REVIEW'],
    ['Investors should have tax and legal advisers. Model does not include VAT, withholding, or SDC on dividends.'],
  ]
  lines.forEach((row, i) => {
    setCell(ws, i + 1, 1, row[0] as string)
  })
  ws['!ref'] = `A1:A${lines.length}`
  ws['!cols'] = [{ wch: 100 }]
  return ws
}

function buildAssumptions(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  setCell(ws, 1, 1, 'ASSUMPTIONS — Agios Theodoros RTB')
  setCell(ws, 3, 1, 'Parameter')
  setCell(ws, 3, 2, 'Value')
  setCell(ws, 3, 3, 'Notes / unit')

  const rows: [string, number | string, string][] = [
    [
      'Gross annual energy revenue — Year 1 (EUR)',
      AG.finance.grossEnergyRevenueY1EUR,
      'Merchant / blended DAM — from lib/deals/agios-theodoros-rtb.ts',
    ],
    ['Aggregator / offtake fee (% of gross energy revenue)', AG.finance.aggregatorFeePct, 'Decimal'],
    ['Corporate income tax rate (Cyprus CIT)', AG.finance.citPct, AG.finance.citNote],
    ['Revenue escalation (% p.a.)', 0.02, 'Applied to gross revenue'],
    ['PV O&M — Year 1 (EUR)', AG.opexY1EUR.pvOm, ''],
    ['BESS O&M — Year 1 (EUR)', AG.opexY1EUR.bessOm, ''],
    ['Other fixed O&M — Year 1 (EUR)', AG.opexY1EUR.other, 'Insurance, admin, misc.'],
    ['OPEX escalation (% p.a.)', 0.02, 'PV/BESS/Other O&M'],
    ['Land lease — Year 1 (EUR)', AG.opexY1EUR.landLease, 'Editable — verify lease deed'],
    ['Land lease escalation (% p.a.)', 0.02, ''],
    [
      'Depreciable base — PV + BESS (EUR)',
      AG.depreciationEUR.pvPlusBessBase,
      'PV + BESS EPC per deal SSOT',
    ],
    ['Depreciation period (years)', AG.depreciationEUR.pvPlusBessYears, 'Straight-line for model'],
    [
      'Amortizable — RTB acquisition + development (EUR)',
      AG.depreciationEUR.rtbPlusDevBase,
      'Per deal SSOT',
    ],
    ['Amortization period (years)', AG.depreciationEUR.rtbPlusDevYears, 'Straight-line for model'],
    [
      'Senior loan principal (EUR)',
      AG.finance.seniorDebtEUR,
      '~70% of PV+BESS EPC — see deal SSOT',
    ],
    ['Loan interest (annual, nominal)', AG.finance.loanNominalRate, 'Editable — replace with term sheet'],
    ['Loan term (years)', AG.finance.loanTermYears, ''],
    ['Total project CAPEX (EUR)', AG.capexStackEUR.total, 'lib/deals/agios-theodoros-rtb.ts'],
    ['Total equity funded (EUR)', AG.finance.equityEUR, 'Year 0 outflow for equity IRR'],
    [
      'Discount rate for NPV (annual, equity hurdle)',
      AG.finance.npvDiscountRate,
      'Not the loan rate — investor required return',
    ],
  ]

  const pctValueRows = new Set([5, 6, 7, 11, 13, 19, 23])

  let r = 4
  for (const [label, val, note] of rows) {
    setCell(ws, r, 1, label)
    setCell(
      ws,
      r,
      2,
      typeof val === 'number' ? val : val,
      pctValueRows.has(r)
    )
    setCell(ws, r, 3, note)
    r++
  }

  ws['!ref'] = `A1:C${r - 1}`
  ws['!cols'] = [{ wch: 48 }, { wch: 14 }, { wch: 42 }]
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

  // Helper: annual payment (Excel PMT) at row 2 col H (8)
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
      setCell(ws, row, 2, { f: enc(row - 1, 6) }) // previous closing col F
    }
    setCell(ws, row, 3, { f: `${enc(row, 2)}*${B(A.loanRate)}` })
    setCell(ws, row, 5, { f: `$H$2` }) // total payment = PMT
    setCell(ws, row, 4, { f: `${enc(row, 5)}-${enc(row, 3)}` }) // principal = payment - interest
    setCell(ws, row, 6, { f: `${enc(row, 2)}-${enc(row, 4)}` })
  }

  ws['!ref'] = `A1:H${3 + years}`
  ws['!cols'] = [{ wch: 8 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 18 }, { wch: 16 }, { wch: 4 }, { wch: 16 }]
  return ws
}

function buildAnnualModel(years: number): { ws: XLSX.WorkSheet; rNetRev: number } {
  const ws: XLSX.WorkSheet = {}
  const startCol = 2 // B = year 1
  const yearRow = 4

  setCell(ws, 1, 1, 'ANNUAL MODEL — after-tax, levered (formulas)')
  setCell(ws, yearRow, 1, 'Operating year #')
  for (let y = 1; y <= years; y++) {
    setCell(ws, yearRow, startCol + y - 1, y)
  }

  // Line items start row 5
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

    setCell(ws, rGross, c, { f: `${B(A.grossRevY1)}*POWER(1+${B(A.revEsc)},${yc})` })
    setCell(ws, rAgg, c, { f: `${enc(rGross, c)}*${B(A.aggFeePct)}` })
    setCell(ws, rNetRev, c, { f: `${enc(rGross, c)}-${enc(rAgg, c)}` })

    setCell(ws, rPvOm, c, {
      f: `${B(A.pvOmY1)}*POWER(1+${B(A.opexEsc)},${yc})`,
    })
    setCell(ws, rBessOm, c, {
      f: `${B(A.bessOmY1)}*POWER(1+${B(A.opexEsc)},${yc})`,
    })
    setCell(ws, rOtherOm, c, {
      f: `${B(A.otherOmY1)}*POWER(1+${B(A.opexEsc)},${yc})`,
    })
    setCell(ws, rLand, c, {
      f: `${B(A.landLeaseY1)}*POWER(1+${B(A.landEsc)},${yc})`,
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

  // Equity IRR / NPV: CF0 in col A, CF1..CFn in B.. (single row for Excel IRR)
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

  setCell(ws, cfRow + 1, 1, 'Equity IRR')
  setCell(ws, cfRow + 1, 2, {
    f: `IRR(${rangeAll})`,
    z: '0.00%',
  })

  setCell(ws, cfRow + 2, 1, 'Equity NPV (EUR)')
  setCell(ws, cfRow + 2, 2, {
    f: `${enc(cfRow, 1)}+NPV(${B(A.discountRate)},${rangeOps})`,
    z: '#,##0',
  })
  setCell(ws, cfRow + 2, 3, 'CF0 + NPV — discount rate on Assumptions')

  ws['!ref'] = `A1:${enc(cfRow + 2, lastC)}`
  ws['!cols'] = [{ wch: 42 }, ...Array(years + 1).fill({ wch: 14 })]
  return { ws, rNetRev }
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
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true })

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, buildCover(), 'Cover')
  XLSX.utils.book_append_sheet(wb, buildAssumptions(), 'Assumptions')
  XLSX.utils.book_append_sheet(wb, buildDebtSchedule(YEARS), 'Debt_Schedule')

  const { ws: annual, rNetRev } = buildAnnualModel(YEARS)
  XLSX.utils.book_append_sheet(wb, annual, 'Annual_Model')
  XLSX.utils.book_append_sheet(wb, buildChecksFixed(YEARS, rNetRev), 'Checks')

  XLSX.writeFile(wb, OUT_FILE, { bookType: 'xlsx' })
  XLSX.writeFile(wb, PUBLIC_FILE, { bookType: 'xlsx' })
  console.log('Wrote', OUT_FILE)
  console.log('Wrote', PUBLIC_FILE)
}

main()
