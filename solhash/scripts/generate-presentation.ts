/**
 * Generate Solhash project presentation (HTML, A4 print).
 * Run: npx tsx solhash/scripts/generate-presentation.ts
 */

import { MODULAR_PARK_SIZES, KWH_PER_KWP_PER_YEAR, PARK_OM_EUR_PER_KW_PER_YEAR } from '../data/modular-parks';
import { deriveBtcParamsFromS21 } from '../data/antminer-s21';
import { epcCostsEur } from '../data/epc-costs';
import { BTC_SCENARIOS, btcScenarioMultiplier } from '../data/btc-scenarios';
import { runJVSplit } from '../model/roi-jv-split';
import * as path from 'path';
import * as fs from 'fs';

const shared = {
  years: 5,
  discountRate: 0.10,
  degradationEurPerMwh: 10,
};

const modularParks = MODULAR_PARK_SIZES.map((p) => ({
  ...p,
  opexEur: Math.round(p.mwPv * 12_000),
  parkOmEurPerYear: p.mwPv * 1000 * PARK_OM_EUR_PER_KW_PER_YEAR,
}));

interface RowData {
  label: string;
  mwPv: number;
  mwhPerYear: number;
  s21Count: number;
  containerCount: number;
  equipmentCapex: number;
  platformEur: number;
  civilEur: number;
  transportEur: number;
  epcTotal: number;
  totalCapex: number;
  equipmentSharePct: number;
  parkSharePct: number;
  netPerYear: number;
  parkRevenuePerYear: number;
  parkCentsPerKwh: number;
  equipmentNpv: number;
  equipmentIrr: number;
  equipmentPayback: number;
  parkNpv: number;
}

const rows: RowData[] = modularParks.map((mp) => {
  const derived = deriveBtcParamsFromS21(mp.mwhPerYear);
  const epc = epcCostsEur(mp.mwPv, derived.containerCount);
  const degradationEurPerYear = mp.mwhPerYear * shared.degradationEurPerMwh;
  const revenueEurPerYear = mp.mwhPerYear * derived.revenueEurPerMwh;
  const jv = runJVSplit({
    equipmentCapexEur: derived.capexEur + epc.totalEur,
    parkCapexEur: 0,
    revenueEurPerYear,
    opexAnnualEur: mp.opexEur,
    degradationEurPerYear,
    parkOmEurPerYear: mp.parkOmEurPerYear,
    years: 5,
    discountRate: shared.discountRate,
    revenueStartsYear: 1,
  });
  const parkRevenuePerYear = jv.parkShare * jv.netPerYear;
  const parkCentsPerKwh =
    mp.mwhPerYear > 0 ? (parkRevenuePerYear / (mp.mwhPerYear * 1000)) * 100 : 0;

  return {
    label: mp.label,
    mwPv: mp.mwPv,
    mwhPerYear: mp.mwhPerYear,
    s21Count: derived.s21Count,
    containerCount: derived.containerCount,
    equipmentCapex: derived.capexEur,
    platformEur: epc.platformEur,
    civilEur: epc.civilEur,
    transportEur: epc.transportEur,
    epcTotal: epc.totalEur,
    totalCapex: derived.capexEur + epc.totalEur,
    equipmentSharePct: jv.equipmentShare * 100,
    parkSharePct: jv.parkShare * 100,
    netPerYear: jv.netPerYear,
    parkRevenuePerYear,
    parkCentsPerKwh,
    equipmentNpv: jv.equipmentNpvEur,
    equipmentIrr: jv.equipmentIrrPct,
    equipmentPayback: jv.equipmentPaybackYears,
    parkNpv: jv.parkNpvEur,
  };
});

function fmtK(n: number): string {
  return Math.abs(n) >= 1000 ? `€${(n / 1000).toFixed(1)}k` : `€${Math.round(n).toLocaleString()}`;
}
function fmtIrr(pct: number): string {
  return Number.isNaN(pct) ? '—' : `${pct.toFixed(1)}%`;
}

// BTC scenario data (5 MW base case). Revenue scales with BTC price; 2028 halving applied.
const r5 = rows.find((x) => x.mwPv === 5)!;
const costs5MW = r5.mwhPerYear * shared.degradationEurPerMwh
  + r5.mwPv * 1000 * PARK_OM_EUR_PER_KW_PER_YEAR
  + r5.mwPv * 12_000;
const baseGross5MW = r5.netPerYear + costs5MW;

const scenarioData = Object.entries(BTC_SCENARIOS).map(([key, { btcEur, label }]) => {
  const mult = btcScenarioMultiplier(btcEur);
  const scaledNet = baseGross5MW * mult - costs5MW;
  const park5yr = Math.max(0, r5.parkSharePct / 100 * scaledNet * 5);
  const mining5yr = Math.max(0, r5.equipmentSharePct / 100 * scaledNet * 5);
  const parkBtc = park5yr / btcEur;
  const miningBtc = mining5yr / btcEur;
  return { key, label, btcEur, park5yr, mining5yr, parkBtc, miningBtc, scaledNet };
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solhash — Pre-Connection Mining JV Presentation</title>
  <style>
    @page { size: A4; margin: 15mm; }
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #222;
      background: #fff;
      max-width: 210mm;
      margin: 0 auto;
      padding: 12mm;
    }
    .page-break { page-break-before: always; }
    .cover {
      text-align: center;
      padding: 40px 0 60px;
      border-bottom: 2px solid #2d7d46;
    }
    .cover img { max-height: 80px; margin-bottom: 24px; }
    .cover h1 { font-size: 1.8rem; color: #1a5c2e; margin: 0 0 8px; }
    .cover .subtitle { font-size: 1rem; color: #555; }
    .cover .date { font-size: 0.9rem; color: #777; margin-top: 24px; }
    h2 {
      font-size: 1.1rem;
      color: #1a5c2e;
      margin: 24px 0 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid #2d7d46;
    }
    h3 { font-size: 0.95rem; margin: 16px 0 8px; color: #333; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 9pt;
    }
    th, td { padding: 6px 10px; text-align: left; border: 1px solid #ddd; }
    th { background: #f0f7f2; font-weight: 600; color: #1a5c2e; }
    td.r { text-align: right; }
    tr:nth-child(even) { background: #fafafa; }
    .role-card {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 16px;
      background: #fafafa;
    }
    .role-card h3 { margin-top: 0; }
    .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
    @media print {
      body { padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page-break { page-break-before: always; }
      .cover { padding: 20px 0 40px; }
      a { color: #1a5c2e; }
    }
    .note { font-size: 8pt; color: #666; margin-top: 8px; }
    .highlight { background: #e8f5e9; }
  </style>
</head>
<body>

<div class="cover">
  <img src="../image/solhash-logo.png" alt="Solhash">
  <h1>Pre-Connection Mining Joint Venture</h1>
  <p class="subtitle">Park Partner · Mining Partner · Solhash (Intermediary & EPC)</p>
  <p class="date">Confidential — March 2026</p>
</div>

<h2>1. Executive Summary</h2>
<p>Solhash structures a joint venture between <strong>Park Partner</strong> (solar park owner) and <strong>Mining Partner</strong> (equipment provider) to monetise stranded PV energy during the pre-grid-connection period (typically 3–5 years). Solhash acts as intermediary and EPC, delivering turnkey behind-the-meter mining installations.</p>
<ul>
  <li><strong>Park Partner</strong>: Provides park and panels (built anyway). Receives revenue share (${rows[0]?.parkCentsPerKwh.toFixed(2) ?? '0.44'}–${rows[rows.length - 1]?.parkCentsPerKwh.toFixed(2) ?? '0.44'}¢/kWh) with no capex. No PPA loss.</li>
  <li><strong>Mining Partner</strong>: Invests in miners, containers, and EPC (platforms, civil, transport). Receives ${rows[0]?.equipmentSharePct.toFixed(0) ?? '95'}–${rows[rows.length - 1]?.equipmentSharePct.toFixed(0) ?? '95'}% of net. IRR ${rows.find((r) => r.mwPv === 5)?.equipmentIrr.toFixed(1) ?? '10'}%, payback ${rows.find((r) => r.mwPv === 5)?.equipmentPayback.toFixed(1) ?? '3.8'} years (5 MW).</li>
  <li><strong>Solhash</strong>: Structures JV, provides EPC (platforms, civil works, transport, LV tie-in).</li>
</ul>

<h2>2. Project Structure</h2>
<div class="three-col">
  <div class="role-card">
    <h3>Park Partner</h3>
    <p><strong>Role:</strong> Provides solar park and panels. Park built before connection terms (no PPA loss).</p>
    <p><strong>Costs:</strong> Degradation (€10/MWh), O&M (€10/kW/yr).</p>
    <p><strong>Revenue:</strong> Fair share of mining revenue (9–12% of net).</p>
    <p><strong>Capex:</strong> None for JV (park built anyway).</p>
  </div>
  <div class="role-card">
    <h3>Mining Partner</h3>
    <p><strong>Role:</strong> Provides Antminer S21+ miners and 20ft containers. Equipment moves to another park when connection comes.</p>
    <p><strong>Costs:</strong> Equipment capex + EPC (platforms, civil, transport). Opex €12k/MW.</p>
    <p><strong>Revenue:</strong> Fair share of mining revenue (~88–91% of net).</p>
    <p><strong>Horizon:</strong> 5 years per park (pre-connection period).</p>
  </div>
  <div class="role-card">
    <h3>Solhash</h3>
    <p><strong>Role:</strong> Intermediary and EPC. Structures JV, negotiates terms, delivers turnkey installation.</p>
    <p><strong>Scope:</strong> Platforms, civil works, transport, LV tie-in to PV. Project management.</p>
    <p><strong>Model:</strong> EPC margin on civil/transport; JV structuring fee.</p>
  </div>
</div>

<h2>3. Modular Sizing (1, 2.6, 5, 10 MW)</h2>
<table>
  <thead>
    <tr>
      <th>Park size</th>
      <th class="r">MWh/yr</th>
      <th class="r">S21+</th>
      <th class="r">Containers</th>
      <th class="r">Equip. capex</th>
      <th class="r">EPC (platforms, civil, transport)</th>
      <th class="r">Total capex</th>
    </tr>
  </thead>
  <tbody>
    ${rows.map((r) => `
    <tr>
      <td>${r.label}</td>
      <td class="r">${r.mwhPerYear.toLocaleString()}</td>
      <td class="r">${r.s21Count}</td>
      <td class="r">${r.containerCount}</td>
      <td class="r">${fmtK(r.equipmentCapex)}</td>
      <td class="r">${fmtK(r.epcTotal)}</td>
      <td class="r">${fmtK(r.totalCapex)}</td>
    </tr>`).join('')}
  </tbody>
</table>

<h2>4. EPC Cost Breakdown (Solhash)</h2>
<p>Platforms (€15k/container), civil works (€25k/MW), transport (€10k/container).</p>
<table>
  <thead>
    <tr>
      <th>Park size</th>
      <th class="r">Platforms</th>
      <th class="r">Civil works</th>
      <th class="r">Transport</th>
      <th class="r">EPC total</th>
    </tr>
  </thead>
  <tbody>
    ${rows.map((r) => `
    <tr>
      <td>${r.label}</td>
      <td class="r">${fmtK(r.platformEur)}</td>
      <td class="r">${fmtK(r.civilEur)}</td>
      <td class="r">${fmtK(r.transportEur)}</td>
      <td class="r">${fmtK(r.epcTotal)}</td>
    </tr>`).join('')}
  </tbody>
</table>

<div class="page-break"></div>

<h2>5. Park Partner Economics</h2>
<p>Park Partner receives a fair share of net revenue (after opex, degradation, park O&M). No capex. Value expressed as €/kWh.</p>
<table>
  <thead>
    <tr>
      <th>Park size</th>
      <th class="r">Park share</th>
      <th class="r">Park revenue/yr</th>
      <th class="r">Park €/kWh</th>
      <th class="r">Park NPV (5yr)</th>
    </tr>
  </thead>
  <tbody>
    ${rows.map((r) => `
    <tr>
      <td>${r.label}</td>
      <td class="r">${r.parkSharePct.toFixed(1)}%</td>
      <td class="r">${fmtK(r.parkRevenuePerYear)}</td>
      <td class="r">${r.parkCentsPerKwh.toFixed(2)}¢</td>
      <td class="r">${fmtK(r.parkNpv)}</td>
    </tr>`).join('')}
  </tbody>
</table>
<p class="note">Park Partner has no capex; any positive revenue share yields positive NPV. Degradation and O&M are JV-level costs (deducted before split). With EPC costs included, Mining Partner economics favour 5 MW+ parks.</p>

<h2>6. Mining Partner Economics</h2>
<p>Mining Partner invests equipment + EPC. Receives majority share. Fair split ensures ~11.9% IRR, 3.6-year payback.</p>
<table>
  <thead>
    <tr>
      <th>Park size</th>
      <th class="r">Total capex</th>
      <th class="r">Mining share</th>
      <th class="r">Net/yr</th>
      <th class="r">NPV</th>
      <th class="r">IRR</th>
      <th class="r">Payback</th>
    </tr>
  </thead>
  <tbody>
    ${rows.map((r) => `
    <tr>
      <td>${r.label}</td>
      <td class="r">${fmtK(r.totalCapex)}</td>
      <td class="r">${r.equipmentSharePct.toFixed(1)}%</td>
      <td class="r">${fmtK(r.netPerYear)}</td>
      <td class="r">${fmtK(r.equipmentNpv)}</td>
      <td class="r">${fmtIrr(r.equipmentIrr)}</td>
      <td class="r">${r.equipmentPayback < 20 ? r.equipmentPayback.toFixed(1) + ' yr' : '—'}</td>
    </tr>`).join('')}
  </tbody>
</table>

<h2>7. Mining Partner — Full Cost Breakdown (5 MW example)</h2>
${(function () {
  const r5 = rows.find((x) => x.mwPv === 5);
  if (!r5) return '';
  const minersEur = r5.s21Count * 2040;
  const containersEur = r5.containerCount * 21500;
  return `<table>
  <thead><tr><th>Item</th><th class="r">Amount</th></tr></thead>
  <tbody>
    <tr><td>Antminer S21+ (${r5.s21Count} × €2,040)</td><td class="r">${fmtK(minersEur)}</td></tr>
    <tr><td>20ft containers (${r5.containerCount} × €21,500)</td><td class="r">${fmtK(containersEur)}</td></tr>
    <tr><td>Platforms (${r5.containerCount} × €15,000)</td><td class="r">${fmtK(r5.platformEur)}</td></tr>
    <tr><td>Civil works (${r5.mwPv} MW × €25,000)</td><td class="r">${fmtK(r5.civilEur)}</td></tr>
    <tr><td>Transport (${r5.containerCount} × €10,000)</td><td class="r">${fmtK(r5.transportEur)}</td></tr>
    <tr style="background:#e8f5e9"><td><strong>Total capex</strong></td><td class="r"><strong>${fmtK(r5.totalCapex)}</strong></td></tr>
  </tbody>
</table>`;
})()}

<h2>8. BTC Price Scenarios — 5-Year Revenue Share (5 MW)</h2>
<p>Revenue scales with BTC price. 2028 halving (block reward 3.125→1.5625 BTC) applied. Base case: €100K.</p>
<div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 320px;">
    <canvas id="btcScenarioChart" width="400" height="280"></canvas>
  </div>
  <table style="flex: 0 0 260px;">
    <thead>
      <tr><th>Scenario</th><th class="r">Park Partner</th><th class="r">Mining Partner</th></tr>
    </thead>
    <tbody>
      ${scenarioData.map((s) => `
      <tr class="${s.key === 'base' ? 'highlight' : ''}">
        <td>${s.key === 'base' ? '★ ' : ''}${s.label}</td>
        <td class="r">${fmtK(s.park5yr)}<br><span style="font-size:8pt;color:#666">${s.parkBtc.toFixed(3)} BTC</span></td>
        <td class="r">${fmtK(s.mining5yr)}<br><span style="font-size:8pt;color:#666">${s.miningBtc.toFixed(3)} BTC</span></td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>
<p class="note">5-year total revenue share per party. Low €60K, Base €100K, High €200K. Halving reduces effective output ~29% over 5 years.</p>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script>
(function() {
  const data = ${JSON.stringify(scenarioData)};
  const ctx = document.getElementById('btcScenarioChart');
  if (!ctx || !window.Chart) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.label),
      datasets: [
        { label: 'Park Partner', data: data.map(d => d.park5yr/1000), backgroundColor: '#6ab04c', borderRadius: 4 },
        { label: 'Mining Partner', data: data.map(d => d.mining5yr/1000), backgroundColor: '#1a5c2e', borderRadius: 4 }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: (c) => c.dataset.label + ': €' + (c.raw*1000).toLocaleString(0) } }
      },
      scales: {
        x: { stacked: true, beginAtZero: true, title: { display: true, text: '€k (5-year total)' } },
        y: { stacked: true }
      }
    }
  });
})();
</script>

<h2>9. Key Assumptions</h2>
<table>
  <tbody>
    <tr><td>PV yield (Cyprus)</td><td class="r">${KWH_PER_KWP_PER_YEAR} kWh/kWp/year</td></tr>
    <tr><td>Daytime hours</td><td class="r">6 hrs/day</td></tr>
    <tr><td>Miner</td><td class="r">Antminer S21+ (216 TH/s, 3.56 kW)</td></tr>
    <tr><td>Hash price</td><td class="r">€44/PH/s/day</td></tr>
    <tr><td>20ft container</td><td class="r">168 slots, €21,500 (Mineshop)</td></tr>
    <tr><td>Degradation</td><td class="r">€10/MWh</td></tr>
    <tr><td>Park O&M</td><td class="r">€10/kW/year</td></tr>
    <tr><td>Equipment opex</td><td class="r">€12k/MW/year</td></tr>
    <tr><td>Horizon</td><td class="r">5 years (pre-connection)</td></tr>
    <tr><td>Discount rate</td><td class="r">10%</td></tr>
  </tbody>
</table>

<h2>10. Timeline</h2>
<ol>
  <li><strong>JV agreement</strong> — Park Partner, Mining Partner, Solhash sign JV and EPC terms.</li>
  <li><strong>EPC mobilisation</strong> — Solhash procures platforms, civil works, transport. Mining Partner orders miners and containers.</li>
  <li><strong>Installation</strong> — Platforms, civil, LV tie-in. Container delivery and commissioning.</li>
  <li><strong>Operations</strong> — 5-year pre-connection period. Revenue split monthly/quarterly.</li>
  <li><strong>Exit</strong> — When park receives connection terms, Mining Partner moves equipment to next park. Park Partner transitions to grid PPA.</li>
</ol>

<h2>11. Solhash EPC Scope</h2>
<ul>
  <li><strong>Platforms:</strong> Concrete pads/foundations per container (€15k/unit). Levelling, drainage.</li>
  <li><strong>Civil works:</strong> Cabling from PV to mining area, fencing, access roads, LV tie-in (€25k/MW).</li>
  <li><strong>Transport:</strong> Container delivery from port/depot to site (€10k/container).</li>
  <li><strong>Project management:</strong> Coordination, permits, commissioning.</li>
</ul>

<p class="note" style="margin-top: 24px;">Generated by Solhash. Re-run: <code>npm run solhash:presentation</code>. Data from solhash/model and solhash/data.</p>

</body>
</html>
`;

const outPath = path.join(__dirname, '../docs/project-presentation.html');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html, 'utf8');
console.log('Wrote', outPath);
