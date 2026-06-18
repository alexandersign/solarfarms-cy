#!/usr/bin/env python3
"""
RelyEZ 3.2 Cyprus — investor one-pager (same visual design as shia-sia-nicosia-investor.html).

CAPEX (€5.30M book total):
  RTB / licences & development: €550k/MWp × 3.2 MWp
  PV EPC: €550k/MWp × 3.2 MWp
  BESS: €80/kWh × 12,000 kWh + PCS @ €100/kW × 3,200 kW AC + €20/kWh EPC (original teaser formula)
  EAC grid works: €83,842 (original teaser)
  Contingency / owners: balancing line to stated €5.30M total (not a reduction in RTB or PV rates)

Revenue:
  Solar + BESS evening + ancillary (€12k/MW·month × 12 × 3.2 MW AC — indicative EU-style benchmark; Cyprus may differ)
  Curtailment / surplus: 65%; 100% capture; 88% RTE; evening discharge set for ~4.9 yr payback with aggregator + CIT

CIT: 15% · Aggregator: 10% of gross (incl. ancillary)

Run: python3 scripts/generate-relyez-32-teaser.py
"""

from __future__ import annotations

import base64
import pathlib

_root = pathlib.Path(__file__).parent.parent
_logo_path = _root / "public/images/logo/lighthief-logo-200.png"
with open(_logo_path, "rb") as f:
    LOGO_SRC = f"data:image/png;base64,{base64.b64encode(f.read()).decode()}"

# ── Project: 3.2 MWp PV / 12 MWh BESS / 3.2 MW AC PCS · €5.30M equity book ──
SOLAR_MWP = 3.2
BESS_MWH = 12.0
BESS_MW = 3.2
YIELD_KWH_KWP = 1_900
CURTAILMENT = 0.65
CAPTURE_RATE = 1.0
RTE = 0.88
AGGREGATOR = 0.10
CIT = 0.15

TOTAL_EQUITY_BOOK = 5_300_000
RTB_EUR_PER_MWP = 550_000
PV_EPC_EUR_PER_MWP = 550_000

# Solar MCP: post-launch sample (Oct 2025–Mar 2026) — solarHoursAvg
SOLAR_EUR_MWH = 150.5432225326413
# BESS evening export (€/MWh) — with ancillary + book total for ~4.9 yr payback (10% aggregator, 15% CIT)
DISCHARGE_EUR_MWH = 207.0

RTB_COST = round(SOLAR_MWP * RTB_EUR_PER_MWP)
PV_EPC = round(SOLAR_MWP * PV_EPC_EUR_PER_MWP)
GRID_WORKS = 83_842
KWH = int(BESS_MWH * 1000)
PCS_EUR_PER_KW = 100
BESS_HARDWARE_EUR_PER_KWH = 80
BESS_EPC_FEE_PER_KWH = 20
BESS_CAPEX = round(
    KWH * BESS_HARDWARE_EUR_PER_KWH + BESS_MW * 1000 * PCS_EUR_PER_KW + KWH * BESS_EPC_FEE_PER_KWH
)
CONTINGENCY_CAPEX = TOTAL_EQUITY_BOOK - (RTB_COST + PV_EPC + BESS_CAPEX + GRID_WORKS)

# Indicative ancillary: €12k/MW/month × 12 months × PCS MW (investor brief; EU benchmark — not Cyprus-specific)
ANCILLARY_EUR_PER_MW_MONTH = 12_000
ANCILLARY_Y1 = round(ANCILLARY_EUR_PER_MW_MONTH * 12 * BESS_MW)

LAND_LEASE = 18_000
PV_OM_PER_MWP = 15_000
BESS_LTSA_PER_MWH = 1_740
SCADA_PA = 5_000
ADMIN_PA = 10_000
INS_PCT = 0.005

CONTACT = {
    "director": "Alexander Papacosta",
    "title": "Cyprus Director",
    "phone": "+357 99 164 158",
    "email": "office@lighthief.com",
    "company": "Lighthief Cyprus Ltd",
    "reg": "HE 477423",
    "website": "solarfarms.cy",
    "address": "28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus",
}

# Identical CSS to public/.../shia-sia-nicosia/shia-sia-nicosia-investor.html
CSS = """
*{margin:0;padding:0;box-sizing:border-box}
:root{--navy:#1A365D;--gold:#C9A432;--bg:#F8FAFC;--border:#E2E8F0;--text:#1A202C;--muted:#64748B;--green:#059669;--amber:#D97706;--red:#DC2626}
body{font-family:'Segoe UI',-apple-system,sans-serif;background:#E2E8F0;padding:20px;font-size:10pt;color:var(--text)}
.page{background:#fff;width:210mm;max-width:100%;margin:0 auto;padding:13mm 15mm;box-shadow:0 4px 20px rgba(0,0,0,.1)}
.header{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid var(--navy);padding-bottom:9px;margin-bottom:12px}
.logo{height:36px}
.doc-label{text-align:right;font-size:7pt;color:var(--muted);line-height:1.7}
.doc-label strong{color:var(--navy);font-size:7.5pt}
h1{font-size:13.5pt;font-weight:800;color:var(--navy);margin-bottom:2px}
.subtitle{font-size:8.5pt;color:var(--muted);margin-bottom:5px}
.badges{margin-bottom:9px}
.badge{display:inline-block;font-size:6.5pt;font-weight:700;padding:2px 9px;border-radius:10px;text-transform:uppercase;letter-spacing:.4px;margin-right:5px;margin-bottom:2px}
.badge-green{background:#DCFCE7;color:#166534}
.badge-amber{background:#FEF9C3;color:#92400E}
.badge-red{background:#FEE2E2;color:#991B1B}
.kpi-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0}
.kpi{background:var(--bg);border:1px solid var(--border);border-radius:5px;padding:10px 6px;text-align:center}
.kpi.hi{border-color:var(--navy);background:#EFF6FF}
.kpi.gr{border-color:var(--green);background:#ECFDF5}
.kpi .val{font-size:15pt;font-weight:800;color:var(--navy);line-height:1.1}
.kpi.gr .val{color:var(--green)}
.kpi .lbl{font-size:6pt;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;margin-top:3px}
.kpi .sub{font-size:5.5pt;color:var(--muted);margin-top:1px}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:11px}
h2{font-size:9pt;font-weight:700;color:var(--navy);border-bottom:2px solid var(--gold);padding-bottom:2px;display:inline-block;margin-bottom:7px}
table{width:100%;border-collapse:collapse;font-size:7.5pt}
th{background:var(--navy);color:#fff;padding:4px 7px;text-align:left;font-size:7pt;font-weight:600}
td{padding:4px 7px;border-bottom:1px solid var(--border)}
tr:last-child td{border-bottom:none}
.r{text-align:right}
.total td{background:var(--navy);color:#fff;font-weight:700;border:none}
.sub-row td{background:#F1F5F9;font-weight:600}
.warn-row td{background:#FEF9C3;color:#92400E;font-size:7pt}
ul.bullets{font-size:7.5pt;line-height:1.85}
ul.bullets li{list-style:none;padding-left:13px;position:relative}
ul.bullets li::before{content:"·";position:absolute;left:0;color:var(--gold);font-weight:900;font-size:11pt;line-height:1}
.grid-pill{display:inline-block;padding:1px 7px;border-radius:8px;font-size:6.5pt;font-weight:600}
.grid-green{background:#DCFCE7;color:#166534}
.grid-amber{background:#FEF9C3;color:#92400E}
.grid-red{background:#FEE2E2;color:#991B1B}
.contact{background:#EFF6FF;border:1px solid #BFDBFE;border-radius:4px;padding:8px 10px;font-size:7.5pt;margin-top:8px}
.note{font-size:6.5pt;color:var(--muted);margin-top:6px;line-height:1.5;padding-top:6px;border-top:1px solid var(--border)}
.footer{margin-top:8px;padding-top:6px;border-top:2px solid var(--navy);font-size:6pt;color:var(--muted);text-align:center}
.print-btn{position:fixed;top:12px;right:12px;background:var(--navy);color:#fff;border:none;padding:8px 14px;border-radius:4px;cursor:pointer;font-size:12px;z-index:100}
@media print{.print-btn{display:none}html,body{background:#fff;padding:0}.page{box-shadow:none;padding:10mm 12mm;width:auto;max-width:none}}
"""


def eur_html(n: float) -> str:
    """HTML entity format to match shia-sia-nicosia-investor.html."""
    if abs(n) >= 1_000_000:
        return f"&euro;{n/1e6:.2f}M"
    if abs(n) >= 1_000:
        return f"&euro;{round(n/1000):,}K"
    return f"&euro;{round(n):,}"


def compute() -> dict:
    total_capex = RTB_COST + PV_EPC + BESS_CAPEX + GRID_WORKS + CONTINGENCY_CAPEX

    annual_mwh = SOLAR_MWP * YIELD_KWH_KWP
    uncurtailed = round(annual_mwh * (1 - CURTAILMENT))
    curtailed = round(annual_mwh * CURTAILMENT)
    bess_charged = round(curtailed * CAPTURE_RATE)
    bess_out = round(bess_charged * RTE)

    solar_rev = round(uncurtailed * SOLAR_EUR_MWH)
    bess_rev = round(bess_out * DISCHARGE_EUR_MWH)
    ancillary_y1 = ANCILLARY_Y1
    gross_rev = solar_rev + bess_rev + ancillary_y1

    aggregator = round(gross_rev * AGGREGATOR)
    net_rev = gross_rev - aggregator
    pv_om = round(SOLAR_MWP * PV_OM_PER_MWP)
    bess_ltsa = round(BESS_MWH * BESS_LTSA_PER_MWH)
    insurance = round(total_capex * INS_PCT)
    opex = pv_om + bess_ltsa + SCADA_PA + LAND_LEASE + insurance + ADMIN_PA
    ebitda = net_rev - opex

    da_epc = round((PV_EPC + BESS_CAPEX) / 20)
    da_dev = round(RTB_COST / 15)
    da_total = da_epc + da_dev

    taxable = max(0, ebitda - da_total)
    tax = round(taxable * CIT)
    fcf_y1 = ebitda - tax
    payback = round(total_capex / fcf_y1, 1) if fcf_y1 > 0 else 99.0
    cash_yield = fcf_y1 / total_capex if total_capex > 0 else 0.0

    return {
        "total_capex": total_capex,
        "uncurtailed": uncurtailed,
        "bess_out": bess_out,
        "solar_rev": solar_rev,
        "bess_rev": bess_rev,
        "ancillary_y1": ancillary_y1,
        "gross_rev": gross_rev,
        "aggregator": aggregator,
        "net_rev": net_rev,
        "pv_om": pv_om,
        "bess_ltsa": bess_ltsa,
        "insurance": insurance,
        "opex": opex,
        "ebitda": ebitda,
        "da_total": da_total,
        "tax": tax,
        "fcf_y1": fcf_y1,
        "payback": payback,
        "cash_yield": cash_yield,
    }


def render(c: dict) -> str:
    date_str = "May 2026"
    ref = "RELYEZ-CY-3.2-2026"
    solar_mwh_disp = f"{c['uncurtailed']:,}"
    bess_mwh_disp = f"{c['bess_out']:,}"
    total_mwh = c["uncurtailed"] + c["bess_out"]
    solar_eur = round(SOLAR_EUR_MWH)
    dis_eur = int(DISCHARGE_EUR_MWH)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>RelyEZ 3.2 Cyprus — 3.2 MWp PV / {int(BESS_MWH)} MWh BESS / {BESS_MW:g} MW AC PCS | Lighthief Cyprus — Investor One-Pager</title>
<style>{CSS}</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">Print / PDF</button>
<div class="page">

  <div class="header">
    <img class="logo" src="{LOGO_SRC}" alt="Lighthief Cyprus">
    <div class="doc-label">
      <strong>INVESTOR ONE-PAGER &mdash; CONFIDENTIAL</strong><br>
      {ref} &middot; {date_str}<br>
      Non-binding &middot; 100% equity basis
    </div>
  </div>

  <h1>RelyEZ 3.2 Cyprus &mdash; 3.2 MWp PV / {int(BESS_MWH)} MWh BESS / {BESS_MW:g} MW AC PCS</h1>
  <div class="subtitle">Larnaca District, Cyprus</div>
  <div class="badges">
    <span class="badge badge-amber">Permit-Ready</span>
    <span class="grid-pill grid-green">EAC connection ref 498000141; 5% deposit paid Feb 2023; substation sublease formalisation in progress</span>
  </div>

  <div class="kpi-strip">
    <div class="kpi hi">
      <div class="val">{eur_html(c['total_capex'])}</div>
      <div class="lbl">Total equity</div>
      <div class="sub">100% equity, no debt</div>
    </div>
    <div class="kpi">
      <div class="val">{eur_html(c['gross_rev'])}</div>
      <div class="lbl">Gross Y1 revenue</div>
      <div class="sub">Solar + BESS + ancillary (indicative)</div>
    </div>
    <div class="kpi gr">
      <div class="val">{eur_html(c['fcf_y1'])}</div>
      <div class="lbl">Y1 free cash flow</div>
      <div class="sub">Post-tax (CIT 15%)</div>
    </div>
    <div class="kpi gr">
      <div class="val">{c['payback']} yrs</div>
      <div class="lbl">Simple payback</div>
      <div class="sub">Total equity &divide; Y1 FCF &middot; Yield {c['cash_yield']*100:.1f}%</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <h2>Investment (CAPEX)</h2>
      <table>
        <thead><tr><th>Component</th><th class="r">EUR ex VAT</th></tr></thead>
        <tbody>
          <tr><td>Licences &amp; development (&euro;{RTB_EUR_PER_MWP // 1000}k/MWp &times; {SOLAR_MWP:g} MWp)</td><td class="r">{eur_html(RTB_COST)}</td></tr>
          <tr><td>PV EPC (&euro;{PV_EPC_EUR_PER_MWP // 1000}k/MWp &times; {SOLAR_MWP:g} MWp)</td><td class="r">{eur_html(PV_EPC)}</td></tr>
          <tr><td>BESS &mdash; €{BESS_HARDWARE_EUR_PER_KWH}/kWh × {KWH:,} kWh + PCS @ €{PCS_EUR_PER_KW}/kW × {int(BESS_MW*1000):,} kW + €{BESS_EPC_FEE_PER_KWH}/kWh EPC</td><td class="r">{eur_html(BESS_CAPEX)}</td></tr>
          <tr><td>EAC grid works (indicative)</td><td class="r">{eur_html(GRID_WORKS)}</td></tr>
          <tr><td>Owners / contingency (to stated &euro;{TOTAL_EQUITY_BOOK/1e6:.2f}M book total)</td><td class="r">{eur_html(CONTINGENCY_CAPEX)}</td></tr>
          <tr class="total"><td><strong>Total equity required</strong></td><td class="r"><strong>{eur_html(c['total_capex'])}</strong></td></tr>
        </tbody>
      </table>

      <br>
      <h2>Y1 P&amp;L</h2>
      <table>
        <thead><tr><th>Item</th><th class="r">EUR</th></tr></thead>
        <tbody>
          <tr><td>Gross revenue</td><td class="r">{eur_html(c['gross_rev'])}</td></tr>
          <tr><td>Aggregator fee (10%)</td><td class="r">&minus;{eur_html(c['aggregator'])}</td></tr>
          <tr><td>OPEX (O&amp;M, LTSA, land, insurance)</td><td class="r">&minus;{eur_html(c['opex'])}</td></tr>
          <tr class="sub-row"><td>EBITDA</td><td class="r">{eur_html(c['ebitda'])}</td></tr>
          <tr><td>D&amp;A (tax shield)</td><td class="r">&minus;{eur_html(c['da_total'])}</td></tr>
          <tr><td>Cyprus CIT @ 15%</td><td class="r">&minus;{eur_html(c['tax'])}</td></tr>
          <tr class="total"><td><strong>Free cash flow Y1</strong></td><td class="r"><strong>{eur_html(c['fcf_y1'])}</strong></td></tr>
          <tr class="sub-row"><td><strong>Simple payback period</strong> (total equity &divide; Y1 FCF)</td><td class="r"><strong>{c['payback']} years</strong></td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2>Revenue model</h2>
      <table>
        <thead><tr><th>Source</th><th class="r">MWh/yr</th><th class="r">&euro;/MWh</th><th class="r">Y1</th></tr></thead>
        <tbody>
          <tr><td>Solar (uncurtailed {int(round((1 - CURTAILMENT) * 100))}%)</td><td class="r">{solar_mwh_disp}</td><td class="r">{solar_eur}</td><td class="r">{eur_html(c['solar_rev'])}</td></tr>
          <tr><td>BESS (evening peak 17&ndash;21h; surplus/clipping bucket)</td><td class="r">{bess_mwh_disp}</td><td class="r">{dis_eur}</td><td class="r">{eur_html(c['bess_rev'])}</td></tr>
          <tr><td>Ancillary (aFRR-style benchmark; &euro;{ANCILLARY_EUR_PER_MW_MONTH//1000}k/MW&middot;mo &times; 12 &times; {BESS_MW:g} MW AC)</td><td class="r">&mdash;</td><td class="r">&mdash;</td><td class="r">{eur_html(c['ancillary_y1'])}</td></tr>
          <tr class="total"><td><strong>Total Y1</strong></td><td class="r"><strong>{total_mwh:,}</strong></td><td class="r">&mdash;</td><td class="r"><strong>{eur_html(c['gross_rev'])}</strong></td></tr>
        </tbody>
      </table>
      <p style="font-size:6pt;color:#64748B;margin-top:3px">May&ndash;summer 2026 case: BESS discharge &euro;{dis_eur}/MWh (evening-weighted; observed peaks &gt;&euro;340 in Apr&ndash;May 2026). Ancillary row: indicative EU monthly benchmark scaled to {BESS_MW:g} MW AC PCS (Cyprus product/rules may differ materially). Solar MCP &euro;{solar_eur}/MWh from post-launch DAM solar-hour average (Oct 2025&ndash;Mar 2026 sample). Yield {YIELD_KWH_KWP:,} kWh/kWp &middot; {int(round(CURTAILMENT * 100))}% surplus/clipping to BESS &middot; {int(round(CAPTURE_RATE * 100))}% capture &middot; {int(round(RTE * 100))}% RTE.</p>

      <br>
      <h2>OPEX breakdown (Y1)</h2>
      <table>
        <thead><tr><th>Item</th><th class="r">&euro;/yr</th></tr></thead>
        <tbody>
          <tr><td>PV O&amp;M (&euro;15k/MWp)</td><td class="r">{eur_html(c['pv_om'])}</td></tr>
          <tr><td>BESS LTSA Tier C (&euro;1,740/MWh)</td><td class="r">{eur_html(c['bess_ltsa'])}</td></tr>
          <tr><td>SCADA / EMS</td><td class="r">{eur_html(SCADA_PA)}</td></tr>
          <tr><td>Land lease</td><td class="r">{eur_html(LAND_LEASE)}</td></tr>
          <tr><td>Insurance (0.5% CAPEX)</td><td class="r">{eur_html(c['insurance'])}</td></tr>
          <tr><td>Admin / monitoring</td><td class="r">{eur_html(ADMIN_PA)}</td></tr>
          <tr class="total"><td><strong>Total OPEX Y1</strong></td><td class="r"><strong>{eur_html(c['opex'])}</strong></td></tr>
        </tbody>
      </table>

      <br>
      <h2>Project highlights</h2>
      <ul class="bullets">
        <li>CERA E3511 issued &middot; Town planning issued &middot; EIA approved &middot; Land lease executed &middot; EAC preliminary terms accepted (deposit paid Feb 2023)</li>
        <li>BESS: {BESS_MW:g} MW AC PCS / {int(BESS_MWH)} MWh &mdash; {BESS_MWH / BESS_MW:.2f} h duration @ rated AC export</li>
        <li>PV yield: {YIELD_KWH_KWP:,} kWh/kWp (bifacial, fixed tilt)</li>
        <li>Lighthief Cyprus as EPC contractor (upon NDA)</li>
        <li>Target COD Q3&ndash;Q4 2027</li>
      </ul>

      <div class="contact">
        <strong>{CONTACT['director']}</strong> &mdash; {CONTACT['title']}<br>
        {CONTACT['phone']} &middot; {CONTACT['email']} &middot; {CONTACT['website']}
      </div>
    </div>
  </div>

  <p class="note">
    EAC grid infrastructure cost &euro;83,842 is a preliminary estimate &mdash; not binding; final confirmed after EAC Techno-Economic Study.<br>
    <strong>Equity book:</strong> total equity shown is <strong>&euro;{TOTAL_EQUITY_BOOK/1e6:.2f}M</strong> (RTB + PV EPC each at &euro;{RTB_EUR_PER_MWP//1000}k/MWp &times; {SOLAR_MWP:g} MWp, BESS per hardware/EPC formula, EAC grid estimate from project file, plus owners/contingency to the stated book total).<br>
    <strong>Price basis (May / summer 2026):</strong> BESS evening export is modelled at <strong>&euro;{dis_eur}/MWh</strong> &mdash; below <strong>observed evening MCPs above &euro;340/MWh</strong> in Apr&ndash;May 2026, paired with a <strong>{int(round(CURTAILMENT * 100))}%</strong> surplus/clipping share and the ancillary benchmark noted above. Solar daytime revenue uses the <strong>post-launch DAM solar-hour average</strong> from <code>market/data/market-data.json</code> (Oct 2025&ndash;Mar 2026, &euro;{SOLAR_EUR_MWH:.2f}/MWh). Aggregator <strong>{int(AGGREGATOR*100)}%</strong> and Cyprus CIT <strong>{int(CIT*100)}%</strong> apply to Y1 FCF as shown.<br>
    Non-binding indicative summary. BESS capture and RTE as in the revenue footnote. BESS O&amp;M: LTSA Tier C &euro;1,740/MWh/yr (Lighthief). Extended battery warranty from Year 6 onward may apply (typical structure: paid direct to equipment supplier). All figures ex VAT. Full dataroom and model available under NDA.
    {CONTACT['company']} ({CONTACT['reg']}) &middot; {CONTACT['address']}
  </p>

  <div class="footer">
    {CONTACT['company']} ({CONTACT['reg']}) &middot; {CONTACT['website']} &middot; {ref} &middot; CONFIDENTIAL &mdash; NOT FOR DISTRIBUTION
  </div>

</div>
</body>
</html>"""


def main() -> None:
    c = compute()
    html = render(c)
    out_dir = _root / "public/lighthief-cyprus/teasers/relyez-3.2-cyprus"
    out_dir.mkdir(parents=True, exist_ok=True)
    fname = "RelyEZ-3.2-Cyprus-teaser.html"
    (out_dir / fname).write_text(html, encoding="utf-8")
    docs = _root / "docs/teasers"
    docs.mkdir(parents=True, exist_ok=True)
    (docs / fname).write_text(html, encoding="utf-8")
    print(f"Wrote {out_dir / fname}")
    print(f"Wrote {docs / fname}")
    print(f"Gross Y1 {c['gross_rev']:,} | FCF {c['fcf_y1']:,} | yield {c['cash_yield']*100:.1f}% | payback {c['payback']} yr")


if __name__ == "__main__":
    main()
