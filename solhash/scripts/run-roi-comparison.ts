/**
 * Run solhash ROI comparison (BTC mining, GPU mining, datacenter GPU) and output HTML.
 * From project root: npx ts-node solhash/scripts/run-roi-comparison.ts
 */

import { PENDING_CONNECTION_PARKS } from '../data/pending-connection-parks';
import { MODULAR_PARK_SIZES, KWH_PER_KWP_PER_YEAR, PARK_OM_EUR_PER_KW_PER_YEAR } from '../data/modular-parks';
import { deriveBtcParamsFromS21 } from '../data/antminer-s21';
import type { ParkInput, SharedROIInputs, ROIResult } from '../model/types';
import { runBtcMiningROI } from '../model/roi-btc-mining';
import { runJVSplit } from '../model/roi-jv-split';
import { runGpuMiningROI } from '../model/roi-gpu-mining';
import { runDatacenterGPUROI } from '../model/roi-datacenter-gpu';
import * as path from 'path';
import * as fs from 'fs';

/** Cyprus PV yield. Assume PV MWp = BESS MW. */

function toParkInputs(): ParkInput[] {
  return PENDING_CONNECTION_PARKS.map((p) => ({
    id: p.id,
    name: p.name,
    mw: p.mw,
    mwh: p.mwh,
    mwhPerYear: p.mw * KWH_PER_KWP_PER_YEAR,
  }));
}

/** Modular park sizes (1, 2.6, 5, 10 MW) as ParkInput for ROI */
function modularParksToInputs(): ParkInput[] {
  return MODULAR_PARK_SIZES.map((p) => ({
    id: p.id,
    name: p.label,
    mw: p.mwPv,
    mwh: 0,
    mwhPerYear: p.mwhPerYear,
  }));
}

const shared: SharedROIInputs = {
  years: 5,
  discountRate: 0.10,
  degradationEurPerMwh: 10,
  opexAnnualEur: 120_000,
  eurUsd: 1.08,
  daytimeOnly: true, // No BESS → load runs only when PV produces
  daytimeOnlyDatacenterRevenueFactor: 0.6, // Cloud expects 24/7; batch/spot ~50–70% of nominal
};

// BTC mining: derived from Antminer S21 + container (see data/antminer-s21.ts)
// GPU/DC: example assumptions
const gpuParams = {
  revenueEurPerMwh: 65,
  capexEur: 1_800_000,
  revenueStartsYear: 1,
};
const dcParams = {
  revenueEurPerMwh: 85,
  capexEur: 2_500_000,
  revenueStartsYear: 1,
};

interface OptionParams {
  label: string;
  revenueEurPerMwh: number;
  capexEur: number;
  meta?: Record<string, unknown>;
}

interface ModularRow {
  label: string;
  mwhPerYear: number;
  s21Count: number;
  containerCount: number;
  capexEur: number;
  npvEur: number;
  irrPct: number;
}

interface JVRow {
  label: string;
  mwPv: number;
  mwhPerYear: number;
  equipmentCapexEur: number;
  parkCapexEur: number;
  equipmentSharePct: number;
  parkSharePct: number;
  netPerYear: number;
  parkRevenueEurPerYear: number;
  parkCentsPerKwh: number;
  equipmentNpvEur: number;
  equipmentIrrPct: number;
  equipmentPaybackYears: number;
  parkNpvEur: number;
  parkIrrPct: number;
}

function buildHtml(
  results: ROIResult[],
  totalMwhPerYear: number,
  parks: ParkInput[],
  optionParams: OptionParams[],
  modularRows: ModularRow[],
  jvRows: JVRow[]
): string {
  const best = results.reduce((a, b) => (a.npvEur >= b.npvEur ? a : b));
  const fmtIrr = (pct: number) => (Number.isNaN(pct) ? '—' : `${pct.toFixed(1)}%`);
  const fmtK = (n: number) => (Math.abs(n) >= 1000 ? `€${(n / 1000).toFixed(1)}k` : `€${Math.round(n).toLocaleString()}`);

  const summaryRows = results
    .map(
      (r) => `
    <tr>
      <td>${r.label}</td>
      <td class="r">${fmtK(r.npvEur)}</td>
      <td class="r">${fmtIrr(r.irrPct)}</td>
      <td class="r">${fmtK(r.capexEur)}</td>
      <td class="r">${fmtK(r.totalRevenueEur)}</td>
      <td class="r">${fmtK(r.totalDegradationCostEur)}</td>
      <td class="r">${fmtK(r.totalOpexEur)}</td>
    </tr>`
    )
    .join('');

  const parkRows = parks
    .map(
      (p) => `
    <tr>
      <td>${p.name}</td>
      <td class="r">${p.mw}</td>
      <td class="r">${p.mwh}</td>
      <td class="r">${p.mwhPerYear.toFixed(1)}</td>
    </tr>`
    )
    .join('');

  const annualBreakdownSections = results.map((r, i) => {
    const params = optionParams[i];
    const meta = r.meta ?? params?.meta;
    const metaStr = meta && typeof meta === 'object' && 's21Count' in meta
      ? ` ${(meta as { s21Count: number }).s21Count}× Antminer S21, ${(meta as { containerCount: number }).containerCount} container(s).`
      : '';
    const annualRev = r.totalRevenueEur / shared.years;
    const annualDeg = r.totalDegradationCostEur / shared.years;
    const annualOp = r.totalOpexEur / shared.years;
    const annualNet = annualRev - annualDeg - annualOp;
    const yearRows = [
      `<tr><td>Year 0 (capex)</td><td class="r">—</td><td class="r">—</td><td class="r">—</td><td class="r neg">${fmtK(-r.capexEur)}</td></tr>`,
      ...Array.from({ length: shared.years }, (_, y) =>
        `<tr><td>Year ${y + 1}</td><td class="r">${fmtK(annualRev)}</td><td class="r">${fmtK(annualDeg)}</td><td class="r">${fmtK(annualOp)}</td><td class="r">${fmtK(annualNet)}</td></tr>`
      ),
    ].join('');
    return `
    <div class="breakdown-card">
      <h3>${r.label} — annual cash flow</h3>
      <p class="breakdown-meta">Revenue €${params?.revenueEurPerMwh?.toFixed(0) ?? '?'}/MWh × ${totalMwhPerYear.toFixed(1)} MWh/yr = ${fmtK(annualRev)}/yr. Degradation €${shared.degradationEurPerMwh}/MWh, opex ${fmtK(shared.opexAnnualEur)}/yr. Capex ${fmtK(r.capexEur)}.${metaStr}</p>
      <table>
        <thead><tr><th>Period</th><th class="r">Revenue</th><th class="r">Degradation</th><th class="r">Opex</th><th class="r">Net</th></tr></thead>
        <tbody>${yearRows}</tbody>
      </table>
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>solhash — ROI comparison</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1100px; margin: 24px auto; padding: 0 20px; color: #1a1a1a; }
    h1 { font-size: 1.5rem; margin-bottom: 4px; }
    h2 { font-size: 1.1rem; margin: 28px 0 12px; color: #333; }
    h3 { font-size: 0.95rem; margin: 0 0 8px; }
    .subtitle { color: #555; font-size: 0.9rem; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
    th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }
    th { background: #f5f5f5; font-weight: 600; font-size: 0.85rem; }
    td.r { text-align: right; }
    .neg { color: #c00; }
    .section { margin-bottom: 32px; }
    .breakdown-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
    .breakdown-card { background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 16px; }
    .breakdown-card table { margin-bottom: 0; }
    .breakdown-meta { font-size: 0.8rem; color: #666; margin-bottom: 12px; }
    .note { margin-top: 24px; font-size: 0.85rem; color: #666; }
    @media (max-width: 900px) { .breakdown-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <h1>solhash — Pre-connection ROI comparison</h1>
  <p class="subtitle">Equipment venture: ${shared.years} years, aggregate MWh/year = ${totalMwhPerYear.toFixed(1)} (ESP_2028 parks). ${shared.daytimeOnly ? 'Daytime-only (no BESS). ' : ''}Degradation €${shared.degradationEurPerMwh}/MWh, opex ${fmtK(shared.opexAnnualEur)}/year.${shared.daytimeOnly && shared.daytimeOnlyDatacenterRevenueFactor ? ` Datacenter revenue × ${shared.daytimeOnlyDatacenterRevenueFactor} (daytime-only penalty).` : ''}</p>

  <h2>1. Input assumptions</h2>
  <table class="section">
    <tbody>
      <tr><td>Horizon</td><td class="r">${shared.years} years</td></tr>
      <tr><td>Discount rate</td><td class="r">${(shared.discountRate * 100).toFixed(1)}%</td></tr>
      <tr><td>Degradation (park owner)</td><td class="r">€${shared.degradationEurPerMwh}/MWh</td></tr>
      <tr><td>Opex (cooling, maintenance, moves)</td><td class="r">${fmtK(shared.opexAnnualEur)}/year</td></tr>
      <tr><td>PV yield (Cyprus)</td><td class="r">${KWH_PER_KWP_PER_YEAR} kWh/kWp/year</td></tr>
    </tbody>
  </table>
  <h3>BTC mining — Antminer S21+ (20ft containers, Mineshop)</h3>
  <table class="section">
    <tbody>
      <tr><td>Miner</td><td class="r">Antminer S21+ (216 TH/s, 3.56 kW)</td></tr>
      <tr><td>Hash price</td><td class="r">€44/PH/s/day</td></tr>
      <tr><td>Daytime hours</td><td class="r">6 hrs/day</td></tr>
      <tr><td>20ft container</td><td class="r">168 slots, €21,500 (Mineshop)</td></tr>
      <tr><td>S21+ count (ESP_2028 aggregate)</td><td class="r">${(results[0]?.meta as { s21Count?: number })?.s21Count ?? '—'}</td></tr>
      <tr><td>Container(s)</td><td class="r">${(results[0]?.meta as { containerCount?: number })?.containerCount ?? '—'}</td></tr>
    </tbody>
  </table>

  <h2>2. Modular park sizing (1, 2.6, 5, 10 MW)</h2>
  <p class="subtitle">Full solar-field deployment. S21+ (Mineshop), 20ft containers (168 slots). Daytime-only.</p>
  <table class="section">
    <thead>
      <tr>
        <th>Park size</th>
        <th class="r">MWh/year</th>
        <th class="r">S21+ count</th>
        <th class="r">20ft containers</th>
        <th class="r">Capex (€)</th>
        <th class="r">NPV (€)</th>
        <th class="r">IRR (%)</th>
      </tr>
    </thead>
    <tbody>
      ${modularRows
        .map(
          (r) => `
      <tr>
        <td>${r.label}</td>
        <td class="r">${r.mwhPerYear.toLocaleString()}</td>
        <td class="r">${r.s21Count}</td>
        <td class="r">${r.containerCount}</td>
        <td class="r">${fmtK(r.capexEur)}</td>
        <td class="r">${fmtK(r.npvEur)}</td>
        <td class="r">${fmtIrr(r.irrPct)}</td>
      </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <h2>3. Joint venture — pre-connection (5 years, fair split)</h2>
  <p class="subtitle">Park owner: builds park anyway (no PPA loss). Equipment: moves when connection comes. Fair split: equipment gets share for ~5% return above break-even; park gets the rest. Both sides incentivised.</p>
  <table class="section">
    <thead>
      <tr>
        <th>Park size</th>
        <th class="r">Equip. capex</th>
        <th class="r">Equip. share</th>
        <th class="r">Park share</th>
        <th class="r">Park €/kWh</th>
        <th class="r">Net/yr</th>
        <th class="r">Equip. NPV</th>
        <th class="r">Equip. IRR</th>
        <th class="r">Equip. payback</th>
        <th class="r">Park NPV</th>
        <th class="r">Park IRR</th>
      </tr>
    </thead>
    <tbody>
      ${jvRows
        .map(
          (r) => `
      <tr>
        <td>${r.label}</td>
        <td class="r">${fmtK(r.equipmentCapexEur)}</td>
        <td class="r">${r.equipmentSharePct.toFixed(1)}%</td>
        <td class="r">${r.parkSharePct.toFixed(1)}%</td>
        <td class="r">${r.parkCentsPerKwh.toFixed(2)}¢</td>
        <td class="r">${fmtK(r.netPerYear)}</td>
        <td class="r">${fmtK(r.equipmentNpvEur)}</td>
        <td class="r">${fmtIrr(r.equipmentIrrPct)}</td>
        <td class="r">${r.equipmentPaybackYears < 20 ? r.equipmentPaybackYears.toFixed(1) + ' yr' : '—'}</td>
        <td class="r">${fmtK(r.parkNpvEur)}</td>
        <td class="r">${fmtIrr(r.parkIrrPct)}</td>
      </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <h2>4. Park summary (ESP_2028)</h2>
  <table class="section">
    <thead><tr><th>Park</th><th class="r">MW</th><th class="r">MWh (BESS)</th><th class="r">MWh/year (PV)</th></tr></thead>
    <tbody>${parkRows}
    <tr style="background:#f9f9f9"><td><strong>Total</strong></td><td class="r"><strong>${parks.reduce((s, p) => s + p.mw, 0)}</strong></td><td class="r"><strong>${parks.reduce((s, p) => s + p.mwh, 0)}</strong></td><td class="r"><strong>${totalMwhPerYear.toFixed(1)}</strong></td></tr>
    </tbody>
  </table>

  <h2>5. ROI summary</h2>
  <table class="section">
    <thead>
      <tr>
        <th>Option</th>
        <th class="r">NPV (€)</th>
        <th class="r">IRR (%)</th>
        <th class="r">Capex (€)</th>
        <th class="r">Total revenue (€)</th>
        <th class="r">Degradation cost (€)</th>
        <th class="r">Opex (€)</th>
      </tr>
    </thead>
    <tbody>${summaryRows}
    </tbody>
  </table>

  <h2>6. Per-year cash flow breakdown</h2>
  <div class="breakdown-grid">${annualBreakdownSections}</div>

  <p class="note">Best NPV under base case: <strong>${best.label}</strong> (highest NPV). Behind-the-meter scenario uses €25k opex (shared ops). See <a href="behind-the-meter-financials.md">behind-the-meter-financials.md</a> for deep dive. Re-run: <code>npm run solhash:roi</code>.</p>
</body>
</html>
`;
}

function main(): void {
  const parks: ParkInput[] = toParkInputs();
  const totalMwhPerYear = parks.reduce((s, p) => s + p.mwhPerYear, 0);

  // Modular park sizing: run ROI for each 1, 2.6, 5, 10 MW
  const modularParks = modularParksToInputs();
  const modularRows: ModularRow[] = modularParks.map((mp) => {
    const derived = deriveBtcParamsFromS21(mp.mwhPerYear);
    const btcParams = {
      revenueEurPerMwh: derived.revenueEurPerMwh,
      capexEur: derived.capexEur,
      revenueStartsYear: 1,
      label: 'BTC',
      meta: { s21Count: derived.s21Count, containerCount: derived.containerCount },
    };
    const res = runBtcMiningROI([mp], shared, btcParams);
    return {
      label: mp.name,
      mwhPerYear: mp.mwhPerYear,
      s21Count: derived.s21Count,
      containerCount: derived.containerCount,
      capexEur: derived.capexEur,
      npvEur: res.npvEur,
      irrPct: res.irrPct,
    };
  });

  // JV: 5-year pre-connection period. Park capex = 0 (built anyway, no PPA loss). 50/50 split.
  const jvRows: JVRow[] = modularParks.map((mp) => {
    const derived = deriveBtcParamsFromS21(mp.mwhPerYear);
    const opexEur = Math.round(mp.mw * 12_000); // €12k per MW (equipment)
    const parkOmEurPerYear = mp.mw * 1000 * PARK_OM_EUR_PER_KW_PER_YEAR; // €10/kW/year
    const degradationEurPerYear = mp.mwhPerYear * shared.degradationEurPerMwh;
    const revenueEurPerYear = mp.mwhPerYear * derived.revenueEurPerMwh;
    const jv = runJVSplit({
      equipmentCapexEur: derived.capexEur,
      parkCapexEur: 0, // Park built anyway; no PPA loss
      revenueEurPerYear,
      opexAnnualEur: opexEur,
      degradationEurPerYear,
      parkOmEurPerYear,
      years: 5,
      discountRate: shared.discountRate,
      revenueStartsYear: 1,
    });
    const parkRevenueEurPerYear = jv.parkShare * jv.netPerYear;
    const parkCentsPerKwh =
      mp.mwhPerYear > 0
        ? (parkRevenueEurPerYear / (mp.mwhPerYear * 1000)) * 100
        : 0;
    return {
      label: mp.name,
      mwPv: mp.mw,
      mwhPerYear: mp.mwhPerYear,
      equipmentCapexEur: derived.capexEur,
      parkCapexEur: 0,
      equipmentSharePct: jv.equipmentShare * 100,
      parkSharePct: jv.parkShare * 100,
      netPerYear: jv.netPerYear,
      parkRevenueEurPerYear,
      parkCentsPerKwh,
      equipmentNpvEur: jv.equipmentNpvEur,
      equipmentIrrPct: jv.equipmentIrrPct,
      equipmentPaybackYears: jv.equipmentPaybackYears,
      parkNpvEur: jv.parkNpvEur,
      parkIrrPct: jv.parkIrrPct,
    };
  });

  const s21Derived = deriveBtcParamsFromS21(totalMwhPerYear);
  const btcParams = {
    revenueEurPerMwh: s21Derived.revenueEurPerMwh,
    capexEur: s21Derived.capexEur,
    revenueStartsYear: 1,
    label: 'BTC mining (S21+)',
    meta: {
      miner: 'Antminer S21+',
      s21Count: s21Derived.s21Count,
      containerCount: s21Derived.containerCount,
      utilizationPct: s21Derived.utilizationPct,
    },
  };

  const btcResult = runBtcMiningROI(parks, shared, btcParams);
  const gpuResult = runGpuMiningROI(parks, shared, gpuParams);
  const dcResult = runDatacenterGPUROI(parks, shared, dcParams);

  // Behind-the-meter: reduced opex (€25k — shared ops, no dedicated staff). See docs/behind-the-meter-financials.md
  const sharedBtm = { ...shared, opexAnnualEur: 25_000 };
  const btcBtmParams = { ...btcParams, label: 'BTC mining (S21+) — behind-the-meter' };
  const btcBtmResult = runBtcMiningROI(parks, sharedBtm, btcBtmParams);

  const results: ROIResult[] = [btcResult, btcBtmResult, gpuResult, dcResult];
  const dcEffectiveRev = shared.daytimeOnly ? dcParams.revenueEurPerMwh * (shared.daytimeOnlyDatacenterRevenueFactor ?? 0.6) : dcParams.revenueEurPerMwh;
  const optionParams: OptionParams[] = [
    { label: 'BTC mining (S21+)', revenueEurPerMwh: btcParams.revenueEurPerMwh, capexEur: btcParams.capexEur, meta: btcParams.meta },
    { label: 'BTC mining (S21+) — behind-the-meter', revenueEurPerMwh: btcParams.revenueEurPerMwh, capexEur: btcParams.capexEur, meta: { ...btcParams.meta, opexNote: '€25k/yr' } },
    { label: 'GPU mining', revenueEurPerMwh: gpuParams.revenueEurPerMwh, capexEur: gpuParams.capexEur },
    { label: 'Datacenter GPU', revenueEurPerMwh: dcEffectiveRev, capexEur: dcParams.capexEur },
  ];
  const html = buildHtml(results, totalMwhPerYear, parks, optionParams, modularRows, jvRows);

  const outPath = path.join(__dirname, '../docs/roi-comparison.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote', outPath);

  // CSV summary to stdout
  console.log('\nOption,NPV_Eur,IRR_Pct,Capex_Eur');
  results.forEach((r) => console.log(`${r.label},${r.npvEur.toFixed(0)},${r.irrPct.toFixed(2)},${r.capexEur}`));
}

main();
