#!/usr/bin/env tsx
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');

interface PayslipData {
  name: string;
  position: string;
  cyprusId?: string;
  siNo?: string;
  startDate: string;
  gross: number;
  paye: number;
  month: string;       // e.g. "2026-01"
  monthLabel: string;   // e.g. "January 2026"
  periodStart: string;
  periodEnd: string;
  payDate: string;
  workingDays: number;
  proRated?: boolean;
  proRateNote?: string;
}

function generatePayslipHtml(d: PayslipData): string {
  const si = +(d.gross * 0.088).toFixed(2);
  const gesy = +(d.gross * 0.0265).toFixed(2);
  const totalDeductions = +(si + gesy + d.paye).toFixed(2);
  const net = +(d.gross - totalDeductions).toFixed(2);

  const empSi = +(d.gross * 0.088).toFixed(2);
  const empGesy = +(d.gross * 0.029).toFixed(2);
  const empCohesion = +(d.gross * 0.02).toFixed(2);
  const empRedundancy = +(d.gross * 0.012).toFixed(2);
  const empTraining = +(d.gross * 0.005).toFixed(2);
  const empTotal = +(empSi + empGesy + empCohesion + empRedundancy + empTraining).toFixed(2);

  const fmt = (n: number) => `€${n.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const proRateRow = d.proRated ? `<tr><td colspan="2" style="font-size:11px;color:#666;font-style:italic;">${d.proRateNote}</td></tr>` : '';

  const idRow = d.cyprusId ? `<p><span class="label">ID No:</span> ${d.cyprusId}</p>` : '';
  const siRow = d.siNo ? `<p><span class="label">SI No:</span> ${d.siNo}</p>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payslip — ${d.name} — ${d.monthLabel}</title>
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        @page{size:A4;margin:15mm}
        body{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#111;padding:20px;max-width:800px;margin:0 auto}
        .payslip{border:2px solid #1a3a5c;padding:25px}
        .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1a3a5c;padding-bottom:15px;margin-bottom:15px}
        .company{font-size:11px}
        .company h1{font-size:18px;color:#1a3a5c;margin-bottom:4px;letter-spacing:1px}
        .payslip-title{text-align:right}
        .payslip-title h2{font-size:20px;color:#1a3a5c;text-transform:uppercase;letter-spacing:2px}
        .payslip-title p{font-size:14px;font-weight:bold;margin-top:4px}
        .info-grid{display:flex;gap:30px;margin-bottom:18px}
        .info-block{flex:1}
        .info-block h3{font-size:10px;text-transform:uppercase;color:#666;letter-spacing:1px;margin-bottom:6px;border-bottom:1px solid #ddd;padding-bottom:3px}
        .info-block p{font-size:12px;margin-bottom:3px}
        .info-block .label{color:#666;display:inline-block;width:130px}
        table{width:100%;border-collapse:collapse;margin-bottom:18px}
        th{background-color:#1a3a5c;color:#fff;text-align:left;padding:8px 10px;font-size:11px;text-transform:uppercase;letter-spacing:.5px}
        td{padding:7px 10px;border-bottom:1px solid #e0e0e0;font-size:12px}
        .amount{text-align:right;font-family:'Courier New',monospace}
        .total-row td{border-top:2px solid #1a3a5c;font-weight:bold;font-size:13px;background-color:#f0f4f8}
        .net-row td{border-top:3px double #1a3a5c;font-weight:bold;font-size:15px;background-color:#e8eef5;color:#1a3a5c}
        .footer{margin-top:20px;padding-top:12px;border-top:1px solid #ddd;font-size:10px;color:#888;text-align:center}
        .two-col{display:flex;gap:15px}
        .two-col>div{flex:1}
        @media print{
            body{padding:0}
            .payslip{border:2px solid #1a3a5c!important}
            th{background-color:#1a3a5c!important;color:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
            .total-row td{background-color:#f0f4f8!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
            .net-row td{background-color:#e8eef5!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        }
    </style>
</head>
<body>
<div class="payslip">
    <div class="header">
        <div class="company">
            <h1>LIGHTHIEF CYPRUS LTD</h1>
            <p>15 Agaritsis, Nektaria Court, Office 201</p>
            <p>3045 Zakaki, Limassol, Cyprus</p>
            <p>Reg No: HE 477423 &nbsp;|&nbsp; TIN: 60187188Q</p>
        </div>
        <div class="payslip-title">
            <h2>Payslip</h2>
            <p>${d.monthLabel}</p>
        </div>
    </div>
    <div class="info-grid">
        <div class="info-block">
            <h3>Employee Details</h3>
            <p><span class="label">Name:</span> ${d.name}</p>
            <p><span class="label">Position:</span> ${d.position}</p>
            ${idRow}
            ${siRow}
            <p><span class="label">Employment Type:</span> Full-Time Employee</p>
        </div>
        <div class="info-block">
            <h3>Pay Period</h3>
            <p><span class="label">Period:</span> ${d.periodStart} – ${d.periodEnd}</p>
            <p><span class="label">Pay Date:</span> ${d.payDate}</p>
            <p><span class="label">Working Days:</span> ${d.workingDays}</p>
            <p><span class="label">Start Date:</span> ${d.startDate}</p>
        </div>
    </div>
    <table>
        <tr><th colspan="2">Earnings</th></tr>
        <tr><td>Basic Salary${d.proRated ? ' (pro-rated)' : ''}</td><td class="amount">${fmt(d.gross)}</td></tr>
        ${proRateRow}
        <tr class="total-row"><td>Gross Pay</td><td class="amount">${fmt(d.gross)}</td></tr>
    </table>
    <div class="two-col">
        <div>
            <table>
                <tr><th colspan="2">Employee Deductions</th></tr>
                <tr><td>Social Insurance (8.8%)</td><td class="amount">${fmt(si)}</td></tr>
                <tr><td>GESY / GHS (2.65%)</td><td class="amount">${fmt(gesy)}</td></tr>
                <tr><td>PAYE Income Tax</td><td class="amount">${fmt(d.paye)}</td></tr>
                <tr class="total-row"><td>Total Deductions</td><td class="amount">${fmt(totalDeductions)}</td></tr>
            </table>
        </div>
        <div>
            <table>
                <tr><th colspan="2">Employer Contributions</th></tr>
                <tr><td>Social Insurance (8.8%)</td><td class="amount">${fmt(empSi)}</td></tr>
                <tr><td>GESY / GHS (2.90%)</td><td class="amount">${fmt(empGesy)}</td></tr>
                <tr><td>Social Cohesion Fund (2%)</td><td class="amount">${fmt(empCohesion)}</td></tr>
                <tr><td>Redundancy Fund (1.2%)</td><td class="amount">${fmt(empRedundancy)}</td></tr>
                <tr><td>Industrial Training (0.5%)</td><td class="amount">${fmt(empTraining)}</td></tr>
                <tr class="total-row"><td>Total Employer</td><td class="amount">${fmt(empTotal)}</td></tr>
            </table>
        </div>
    </div>
    <table>
        <tr class="net-row"><td>NET PAY</td><td class="amount">${fmt(net)}</td></tr>
    </table>
    <div class="footer">
        <p>Lighthief Cyprus Ltd — HE 477423 — This is a computer-generated payslip and does not require a signature.</p>
    </div>
</div>
</body>
</html>`;
}

const MONTHS_2025 = [
  { month: '2025-07', label: 'July 2025', start: '1 Jul', end: '31 Jul 2025', pay: '1 – 5 August 2025', days: 23 },
  { month: '2025-08', label: 'August 2025', start: '1 Aug', end: '31 Aug 2025', pay: '1 – 5 September 2025', days: 21 },
  { month: '2025-09', label: 'September 2025', start: '1 Sep', end: '30 Sep 2025', pay: '1 – 5 October 2025', days: 22 },
  { month: '2025-10', label: 'October 2025', start: '1 Oct', end: '31 Oct 2025', pay: '1 – 5 November 2025', days: 22 },
  { month: '2025-11', label: 'November 2025', start: '1 Nov', end: '30 Nov 2025', pay: '1 – 5 December 2025', days: 21 },
  { month: '2025-12', label: 'December 2025', start: '1 Dec', end: '31 Dec 2025', pay: '1 – 5 January 2026', days: 22 },
];

const JAN_2026 = { month: '2026-01', label: 'January 2026', start: '1 Jan', end: '31 Jan 2026', pay: '1 – 5 February 2026', days: 21 };

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
}

function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  PAYSLIP GENERATOR — Backdated + Current         ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();

  const payslips: PayslipData[] = [];

  // Alexander Jul-Dec 2025 (no PAYE — under threshold for 2025)
  for (const m of MONTHS_2025) {
    payslips.push({
      name: 'Alexander Papacosta',
      position: 'Director',
      startDate: '1 July 2025',
      gross: 2375,
      paye: 0,
      month: m.month,
      monthLabel: m.label,
      periodStart: m.start,
      periodEnd: m.end,
      payDate: m.pay,
      workingDays: m.days,
    });
  }

  // Alexander Jan 2026 (PAYE kicks in — full year projected)
  payslips.push({
    name: 'Alexander Papacosta',
    position: 'Director',
    startDate: '1 July 2025',
    gross: 2375,
    paye: 102.63,
    month: '2026-01',
    monthLabel: 'January 2026',
    periodStart: '1 Jan',
    periodEnd: '31 Jan 2026',
    payDate: '1 – 5 February 2026',
    workingDays: 21,
  });

  // Zinovia Dec 2025 (no PAYE)
  payslips.push({
    name: 'Zinovia Efesopoulou',
    position: 'Sales Executive & Lead Intake Coordinator',
    cyprusId: '1160290',
    siNo: '1676925',
    startDate: '1 December 2025',
    gross: 1400,
    paye: 0,
    month: '2025-12',
    monthLabel: 'December 2025',
    periodStart: '1 Dec',
    periodEnd: '31 Dec 2025',
    payDate: '1 – 5 January 2026',
    workingDays: 22,
  });

  // Zinovia Jan 2026 (no PAYE)
  payslips.push({
    name: 'Zinovia Efesopoulou',
    position: 'Sales Executive & Lead Intake Coordinator',
    cyprusId: '1160290',
    siNo: '1676925',
    startDate: '1 December 2025',
    gross: 1400,
    paye: 0,
    month: '2026-01',
    monthLabel: 'January 2026',
    periodStart: '1 Jan',
    periodEnd: '31 Jan 2026',
    payDate: '1 – 5 February 2026',
    workingDays: 21,
  });

  // Costas Jan 2026 (pro-rated: started Jan 19, 10 of 21 working days)
  payslips.push({
    name: 'Costas Hadjikyriacou',
    position: 'BESS Division Lead — ETEK Licensed Engineer, Sales & Technical Consultant',
    cyprusId: '874287',
    siNo: '1347386',
    startDate: '19 January 2026',
    gross: 1500,
    paye: 120.50,
    month: '2026-01',
    monthLabel: 'January 2026',
    periodStart: '19 Jan',
    periodEnd: '31 Jan 2026',
    payDate: '1 – 5 February 2026',
    workingDays: 10,
    proRated: true,
    proRateNote: 'Pro-rated: 10 of 21 working days (start date 19 Jan). Full monthly salary: €3,000.00',
  });

  // ── MARCH 2026 ────────────────────────────────────────────────────────────

  // Alexander — March 2026 (full month)
  payslips.push({
    name: 'Alexander Papacosta',
    position: 'Director',
    startDate: '1 July 2025',
    gross: 2375,
    paye: 102.63,
    month: '2026-03',
    monthLabel: 'March 2026',
    periodStart: '1 Mar',
    periodEnd: '31 Mar 2026',
    payDate: '1 – 5 April 2026',
    workingDays: 22,
  });

  // Costas — March 2026 (full month)
  payslips.push({
    name: 'Costas Hadjikyriacou',
    position: 'BESS Division Lead — ETEK Licensed Engineer, Sales & Technical Consultant',
    cyprusId: '874287',
    siNo: '1347386',
    startDate: '19 January 2026',
    gross: 3000,
    paye: 241,
    month: '2026-03',
    monthLabel: 'March 2026',
    periodStart: '1 Mar',
    periodEnd: '31 Mar 2026',
    payDate: '1 – 5 April 2026',
    workingDays: 22,
  });

  // Andreas — March 2026 (pro-rated: started 2 Mar, 21 of 22 working days)
  // Pro-rated gross: €2,500 × 21/22 = €2,386.36
  // PAYE pro-rated: ~€121 (based on monthly equivalent)
  payslips.push({
    name: 'Andreas Christoforou',
    position: 'Business Development & Technical Sales Consultant',
    startDate: '2 March 2026',
    gross: 2386.36,
    paye: 121,
    month: '2026-03',
    monthLabel: 'March 2026',
    periodStart: '2 Mar',
    periodEnd: '31 Mar 2026',
    payDate: '1 – 5 April 2026',
    workingDays: 21,
    proRated: true,
    proRateNote: 'Pro-rated: 21 of 22 working days (start date 2 Mar). Full monthly salary: €2,500.00. PAYE is approximate — subject to confirmation by accountant.',
  });

  // Zinovia — March 2026 (full month, no PAYE)
  payslips.push({
    name: 'Zinovia Efesopoulou',
    position: 'Sales Executive & Lead Intake Coordinator',
    cyprusId: '1160290',
    siNo: '1676925',
    startDate: '1 December 2025',
    gross: 1400,
    paye: 0,
    month: '2026-03',
    monthLabel: 'March 2026',
    periodStart: '1 Mar',
    periodEnd: '31 Mar 2026',
    payDate: '1 – 5 April 2026',
    workingDays: 22,
  });

  // Jihat — March 2026 (full month, no PAYE)
  payslips.push({
    name: 'Jihat [Surname]',
    position: 'Field Engineer — Civil Works & O&M',
    startDate: '[START DATE]',
    gross: 1400,
    paye: 0,
    month: '2026-03',
    monthLabel: 'March 2026',
    periodStart: '1 Mar',
    periodEnd: '31 Mar 2026',
    payDate: '1 – 5 April 2026',
    workingDays: 22,
  });

  let generated = 0;
  for (const p of payslips) {
    const dir = path.join(ROOT, 'team', 'payslips', p.month);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filename = `payslip-${slugify(p.name)}-${p.month.replace('-', '')}.html`;
    const filePath = path.join(dir, filename);
    const html = generatePayslipHtml(p);
    fs.writeFileSync(filePath, html, 'utf-8');

    const rel = path.relative(ROOT, filePath);
    console.log(`  ✓ ${p.name.padEnd(25)} ${p.monthLabel.padEnd(18)} → ${rel}`);
    generated++;
  }

  console.log();
  console.log(`Done: ${generated} payslip(s) generated.`);
}

main();
