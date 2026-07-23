#!/usr/bin/env python3
"""Generate UHE Ukraine hydropower hybrid BESS one-pager (SA offer style)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AEOLIAN = ROOT / "docs/clients/Individual_Aeolian_Dynamics_Larnaca/bess-aeolian-dynamics-final-offer-6.5mw-20mwh-24mar2026.html"
OUT_DIR = ROOT / "docs/clients/Individual_UHE_Ukraine_Hydro"
OUT = OUT_DIR / "offer-uhe-ukraine-hydro-197mw-394mwh-jun2026.html"

MWH_TOTAL = 394
MW_TOTAL = 197
EQ_PER_MWH = 109_000
SA_MWH = 50
MARGIN_PCT = 0.15

# Standard 2-hour skid blocks — 2 x BCS1250K (2.5 MW) wired per ME 5.015 container
CONTAINER_MWH = 5.015
PCS_MW = 1.25
T4 = {"name": "T4", "bess": 2, "pcs": 4, "mw": 5.0, "mwh": 2 * CONTAINER_MWH}
T8 = {"name": "T8", "bess": 4, "pcs": 8, "mw": 10.0, "mwh": 4 * CONTAINER_MWH}

SITES = [
    ("PSP (Pumped Storage Plant)", 46, 92),
    ("HPP — Site 1", 66, 132),
    ("HPP — Site 2", 60, 120),
    ("HPP — Site 3", 25, 50),
]


def pack_site(req_mw: float, req_mwh: float) -> dict:
    """Pick fewest T8/T4 blocks that meet MW and MWh, sizing up where no exact match."""
    best = None
    bound = int(req_mwh // T8["mwh"]) + 3
    for n8 in range(bound + 1):
        for n4 in range(bound * 2 + 3):
            mw = n8 * T8["mw"] + n4 * T4["mw"]
            mwh = n8 * T8["mwh"] + n4 * T4["mwh"]
            if mw < req_mw or mwh < req_mwh:
                continue
            key = (n8 + n4, (mw - req_mw) + (mwh - req_mwh), mw + mwh)
            if best is None or key < best[0]:
                best = (key, n8, n4, mw, mwh)
    _, n8, n4, mw, mwh = best
    parts = []
    if n8:
        parts.append(f"{n8}&times;T8")
    if n4:
        parts.append(f"{n4}&times;T4")
    return {
        "t8": n8,
        "t4": n4,
        "skids": n8 + n4,
        "blocks": " + ".join(parts),
        "containers": n8 * T8["bess"] + n4 * T4["bess"],
        "pcs": n8 * T8["pcs"] + n4 * T4["pcs"],
        "inst_mw": mw,
        "inst_mwh": round(mwh, 1),
    }

SA_EPC = [
    ("Shipping and logistics (DDP/DAP, marine freight, port handling, inland transport to 4 sites, crane and offloading)", 215_000),
    ("HV/MV transformers, switchgear and 110/330 kV switchyard connection works (4 sites)", 575_000),
    ("Civil works (foundations, platforms, drainage, access roads per site)", 220_000),
    ("Electrical installation (MV cabling, terminations, protection relays, earthing)", 180_000),
    ("Hybrid EMS/SCADA (UHE plant SCADA, Ukrenergo interface, cybersecurity)", 130_000),
    ("Installation, OEM supervision, commissioning and operator training", 275_000),
    ("Grid synchronisation, testing and performance verification (IEEE/IEC/DSTU)", 115_000),
    ("Design (Stage P + Stage R per DBN A.2.2-3-2014), engineering and project management", 265_000),
    ("Insurance (CAR/EAR, TPL)", 70_000),
]


def fmt(n: float) -> str:
    return f"{int(round(n)):,}".replace(",", "&nbsp;")


def compute() -> dict:
    scale = MWH_TOTAL / SA_MWH

    # Per-site block packing (T4/T8) -> installed nameplate drives equipment cost
    sites = []
    inst_mwh_total = 0.0
    inst_mw_total = 0.0
    containers = pcs = t8 = t4 = 0
    for name, mw, mwh in SITES:
        pk = pack_site(mw, mwh)
        sites.append({"name": name, "mw": mw, "mwh": mwh, **pk})
        inst_mwh_total += pk["inst_mwh"]
        inst_mw_total += pk["inst_mw"]
        containers += pk["containers"]
        pcs += pk["pcs"]
        t8 += pk["t8"]
        t4 += pk["t4"]

    equipment = round(inst_mwh_total * EQ_PER_MWH, -3)
    epc_lines = [(label, round(amount * scale, -3)) for label, amount in SA_EPC]
    epc_total = sum(v for _, v in epc_lines)
    subtotal = equipment + epc_total
    contingency = round(subtotal * 0.05, -3)
    pre_margin = subtotal + contingency
    margin = round(pre_margin * MARGIN_PCT, -3)
    total = pre_margin + margin

    # Allocate site turnkey by installed-MWh share
    for s in sites:
        share = s["inst_mwh"] / inst_mwh_total
        s["equipment"] = round(equipment * share, -3)
        s["turnkey"] = round(total * share, -3)

    return {
        "equipment": equipment,
        "epc_lines": epc_lines,
        "epc_total": epc_total,
        "contingency": contingency,
        "margin": margin,
        "total": total,
        "sites": sites,
        "inst_mwh": round(inst_mwh_total, 1),
        "inst_mw": round(inst_mw_total, 1),
        "containers": containers,
        "pcs": pcs,
        "t8": t8,
        "t4": t4,
        "skids": t8 + t4,
    }


def main() -> None:
    aeolian = AEOLIAN.read_text(encoding="utf-8")
    logo = re.search(r'<img class="lh" src="(data:image[^"]+)"', aeolian)
    logo_src = logo.group(1) if logo else ""
    data = compute()

    site_rows = "\n".join(
        f'    <tr><td>{s["name"]}</td><td style="text-align:center;">{s["mw"]}</td>'
        f'<td style="text-align:center;">{s["mwh"]}</td>'
        f'<td style="text-align:center;">{s["blocks"]}</td>'
        f'<td style="text-align:center;">{s["inst_mw"]:.0f}&nbsp;/&nbsp;{s["inst_mwh"]:.1f}</td>'
        f'<td style="text-align:right;">&euro;{fmt(s["turnkey"])}</td></tr>'
        for s in data["sites"]
    )

    epc_rows = "\n".join(
        f'    <tr><td>{label}</td><td style="text-align:right;">&euro;{fmt(value)}</td></tr>'
        for label, value in data["epc_lines"]
    )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Commercial Offer — UHE Hybrid BESS (197 MW / 394 MWh) | Lighthief</title>
  <style>
    @page {{ size: A4; margin: 12mm 15mm; }}
    @media print {{ .no-print {{ display: none; }} body {{ padding: 0; font-size: 8pt; }} }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Segoe UI', system-ui, sans-serif;
      font-size: 8.5pt; line-height: 1.45; color: #222;
      background: #fff; max-width: 210mm; margin: 0 auto; padding: 12mm 15mm;
    }}
    .pg-hdr {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }}
    .pg-hdr img.lh {{ height: 30px; }}
    .pg-hdr .ly-text {{ font-size: 7.5pt; color: #1A365D; font-weight: 700; text-align: right; line-height: 1.3; }}
    .gold-line {{ height: 2px; background: linear-gradient(90deg, #C9A432, #e8d48b, #C9A432); margin-bottom: 10px; }}
    .offer-title {{ font-size: 1.15rem; font-weight: 700; color: #222; margin: 8px 0 6px; }}
    .offer-meta {{ font-size: 8pt; margin-bottom: 10px; line-height: 1.65; }}
    .offer-meta strong {{ color: #333; }}
    h3 {{ font-size: 9pt; color: #C9A432; margin: 10px 0 4px; border-bottom: 2px solid #1A365D; padding-bottom: 2px; display: inline-block; }}
    .spec-tbl, .terms-tbl, .build-tbl {{ width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 7.5pt; }}
    .spec-tbl th, .terms-tbl th, .build-tbl th {{
      background: #1A365D; color: #fff; font-weight: 600; font-size: 7pt;
      padding: 4px 6px; border: 1px solid #1A365D; text-align: center;
    }}
    .spec-tbl td, .terms-tbl td, .build-tbl td {{
      padding: 3px 6px; border: 1px solid #ccc; vertical-align: top;
    }}
    .spec-tbl td:first-child {{ text-align: left; font-weight: 600; color: #1A365D; width: 16%; }}
    .spec-tbl td:nth-child(2) {{ text-align: left; width: 52%; font-size: 7pt; line-height: 1.35; }}
    .spec-tbl td:nth-child(4) {{ font-weight: 700; text-align: center; width: 10%; }}
    .spec-tbl tr:nth-child(even) td {{ background: #f8f9fb; }}
    .terms-tbl td:first-child {{ font-weight: 600; background: #f0f2f5; width: 28%; }}
    .build-tbl td:first-child {{ text-align: left; }}
    .build-tbl .total-row td {{ background: #1A365D !important; color: #fff; font-weight: 700; }}
    .two-col {{ display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 6px 0; }}
    .note-box {{
      background: #fff8e1; border-left: 3px solid #C9A432; border-radius: 4px;
      padding: 6px 8px; font-size: 7pt; color: #404040; margin: 6px 0; line-height: 1.4;
    }}
    .price-row {{ text-align: right; font-size: 11pt; font-weight: 700; margin: 8px 0 10px; }}
    .price-row .label {{ color: #404040; font-size: 8pt; font-weight: 400; }}
    .price-row .amount {{ color: #1A365D; }}
    .pg-footer {{
      border-top: 1px solid #bbb; padding-top: 6px; margin-top: 10px;
      font-size: 6.5pt; color: #777; line-height: 1.3;
    }}
    .print-btn {{
      position: fixed; top: 15px; right: 15px; background: #1A365D; color: #fff;
      border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 9pt; z-index: 100;
    }}
  </style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">Print / PDF</button>

<div class="pg-hdr">
  <img class="lh" src="{logo_src}" alt="Lighthief">
  <div class="ly-text">Jiangsu Linyang Energy Storage<br>Technology Co., Ltd</div>
</div>
<div class="gold-line"></div>

<div class="offer-title">Commercial Offer &mdash; UHE Hybrid BESS Programme (197 MW / 394 MWh)</div>

<div class="offer-meta">
  <strong>Lighthief Cyprus Ltd</strong> &mdash; OEM: Jiangsu Linyang Energy Storage Technology Co., Ltd &nbsp;|&nbsp; HE 477423<br>
  <strong>Client:</strong> Ukrhydroenergo (UHE) &nbsp;&nbsp;|&nbsp; <strong>Country:</strong> Ukraine<br>
  <strong>Scope:</strong> Turnkey BESS supply, design, installation and commissioning at 4 hydropower sites (PSP + 3 HPP), hybrid coordination with existing HPP units and Ukrenergo<br>
  <strong>Prepared by:</strong> Alexander Papacosta, Cyprus Director &nbsp;|&nbsp; office@lighthief.com &nbsp;|&nbsp; +357 99 164 158<br>
  <strong>Date:</strong> June 2026 &nbsp;&nbsp; <strong>Valid:</strong> 30 days &nbsp;&nbsp; <strong>Incoterms:</strong> DDP/DAP (ICC 2020) per lot
</div>

<h3>Programme Overview &mdash; Four Sites (2-hour systems)</h3>
<table class="terms-tbl">
  <thead>
    <tr><th>Site</th><th style="text-align:center;">Contract MW</th><th style="text-align:center;">Contract MWh</th><th style="text-align:center;">Block config</th><th style="text-align:center;">Installed MW&nbsp;/&nbsp;MWh</th><th style="text-align:right;">Indicative Site Total</th></tr>
  </thead>
  <tbody>
{site_rows}
    <tr class="total-row">
      <td>Programme Total</td><td style="text-align:center;">{MW_TOTAL}</td><td style="text-align:center;">{MWH_TOTAL}</td>
      <td style="text-align:center;">{data["t8"]}&times;T8 + {data["t4"]}&times;T4</td>
      <td style="text-align:center;">{data["inst_mw"]:.0f}&nbsp;/&nbsp;{data["inst_mwh"]:.1f}</td>
      <td style="text-align:right;">&euro;{fmt(data["total"])}</td>
    </tr>
  </tbody>
</table>

<h3>Proposed Equipment Supply</h3>
<table class="spec-tbl">
  <thead><tr><th>Model</th><th>Description</th><th>Scope</th><th>Qty</th></tr></thead>
  <tbody>
    <tr>
      <td>Linyang Power Atlantic<br>ME 5.015 MWh</td>
      <td>Outdoor-rated 20ft HC LFP container. IP55, liquid cooling, integrated fire suppression. EVE LF314 cells. Rated 2.5 MW @ 1C for 2-hour discharge. IEEE/IEC compliant.</td>
      <td>Battery containers</td>
      <td>{data["containers"]}</td>
    </tr>
    <tr>
      <td>Kehua BCS1250K-C-HUD</td>
      <td>1.25 MW bi-directional PCS, grid-forming and grid-following modes. Two units wired per container (2.5 MW) for 2-hour operation. Ukrenergo synchronisation compatible.</td>
      <td>Power conversion</td>
      <td>{data["pcs"]}</td>
    </tr>
    <tr>
      <td>Linyang MV Skids<br>(T4 / T8)</td>
      <td>Integrated MV skids: T8 = 4 BESS + 8 PCS (10 MW / 20.06 MWh); T4 = 2 BESS + 4 PCS (5 MW / 10.03 MWh). LV/MV oil-immersed transformer, RM switchgear, protection.</td>
      <td>LV &rarr; MV step-up</td>
      <td>{data["t8"]}&times;T8<br>{data["t4"]}&times;T4</td>
    </tr>
    <tr>
      <td>MV / HV Power<br>Transformers &amp; HV bay</td>
      <td>Main step-up transformers (MV &rarr; 110/330 kV) and HV switchgear bay for connection to each existing switchyard. Rating and ratio per site POC. Protection, CTs/VTs, earthing.</td>
      <td>MV &rarr; HV step-up</td>
      <td>Per site</td>
    </tr>
    <tr>
      <td>Voltus Hybrid EMS</td>
      <td>Centralised hybrid control coordinating BESS and HPP units. UHE SCADA and Ukrenergo interfaces. Cybersecurity per IEC 62443.</td>
      <td>EMS / SCADA</td>
      <td>1 system</td>
    </tr>
  </tbody>
</table>

<div class="price-row">
  <span class="label">Indicative Turnkey EPC Price (excl. VAT and import duties)</span><br>
  <span class="amount">&euro;{fmt(data["total"])}</span>
  <span class="label"> &nbsp;|&nbsp; {data["containers"]} containers &middot; {data["pcs"]} PCS &middot; {data["skids"]} skids &middot; {data["inst_mw"]:.0f} MW / {data["inst_mwh"]:.1f} MWh installed</span>
</div>

<div class="note-box">
  <strong>Note:</strong> Indicative proposal for bid preparation. The system is built from standard 2-hour skid blocks (T8 = 10 MW / 20.06 MWh; T4 = 5 MW / 10.03 MWh) with two Kehua BCS1250K PCS wired per ME 5.015 container. Installed capacity ({data["inst_mw"]:.0f} MW / {data["inst_mwh"]:.1f} MWh) is sized up to the nearest full block and exceeds the {MW_TOTAL} MW / {MWH_TOTAL} MWh contract minimum. Equipment priced at &euro;109,000/MWh of installed capacity; EPC line items scaled from Lighthief&rsquo;s validated turnkey cost model and adapted for 4-site Ukraine delivery (110/330 kV switchyard works, DBN Stage P/R design, Ukrenergo integration). Final pricing subject to site survey, lot structure, grid-forming/overload confirmation and Ukrainian import duty treatment.
</div>

<div class="two-col">
  <div>
    <h3>Turnkey EPC Cost Build-Up</h3>
    <table class="build-tbl">
      <thead><tr><th>Item</th><th style="text-align:right;">Amount</th></tr></thead>
      <tbody>
        <tr><td>BESS equipment (containers, PCS, MV skids, EMS hardware) @ &euro;109,000/MWh &times; {data["inst_mwh"]:.1f} MWh</td><td style="text-align:right;">&euro;{fmt(data["equipment"])}</td></tr>
{epc_rows}
        <tr><td>Contingency (5%)</td><td style="text-align:right;">&euro;{fmt(data["contingency"])}</td></tr>
        <tr><td>Margin (15%)</td><td style="text-align:right;">&euro;{fmt(data["margin"])}</td></tr>
        <tr class="total-row"><td>Total Turnkey EPC</td><td style="text-align:right;">&euro;{fmt(data["total"])}</td></tr>
      </tbody>
    </table>
  </div>
  <div>
    <h3>Delivery, Payment and Warranty</h3>
    <table class="terms-tbl">
      <tbody>
        <tr><td>Implementation</td><td>420&ndash;510 calendar days from Effective Date (per lot/site)</td></tr>
        <tr><td>Advance Payment</td><td>30% within 7 days of contract signing (APG)</td></tr>
        <tr><td>FAT / Pre-shipment</td><td>70% on equipment ready and FAT passed</td></tr>
        <tr><td>Base Warranty</td><td>5 years BESS + PCS (included)</td></tr>
        <tr><td>Spare Parts</td><td>Mandatory 3-year spare parts supply (quoted separately per ITB)</td></tr>
        <tr><td>Long-term Availability</td><td>11-year post-warranty availability guarantee (per tender)</td></tr>
        <tr><td>Standards</td><td>IEEE, IEC, DSTU 9243.4:2023; design per DBN A.2.2-3-2014</td></tr>
        <tr><td>Qualification</td><td>Reference: &ge;60 MW/MWh BESS completed within 5 years (Lighthief/Linyang portfolio)</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h3>Included in Turnkey Scope</h3>
<table class="terms-tbl">
  <tbody>
    <tr><td>Supply</td><td>LFP BESS containers, PCS, MV skids, transformers, switchgear, protection relays, cabling, grounding, communications</td></tr>
    <tr><td>Design</td><td>Stage P (Project) and Stage R (Working Documentation) per DBN A.2.2-3-2014</td></tr>
    <tr><td>Installation</td><td>Civil works, mounting, connection to existing 110/330 kV switchyards at each site</td></tr>
    <tr><td>Commissioning</td><td>Testing, synchronisation with Ukrenergo, performance verification</td></tr>
    <tr><td>EMS</td><td>Hybrid BESS+HPP coordination, UHE SCADA integration, Ukrenergo telecontrol interface, cybersecurity</td></tr>
    <tr><td>Training</td><td>Comprehensive technical training for UHE operations and maintenance staff</td></tr>
    <tr><td>Insurance</td><td>CAR/EAR and third-party liability during construction</td></tr>
  </tbody>
</table>

<h3>Excluded / Client Responsibility</h3>
<table class="terms-tbl">
  <tbody>
    <tr><td>Import duties and VAT</td><td>Ukrainian import duties, VAT and local taxes (unless DDP lot specifies otherwise)</td></tr>
    <tr><td>CC3 licensing</td><td>Local construction licensing (CC3 class) &mdash; Lighthief to partner with qualified Ukrainian EPC</td></tr>
    <tr><td>Land and permits</td><td>Environmental permits, grid connection fees beyond switchyard interface scope</td></tr>
    <tr><td>LTSA / O&amp;M</td><td>Post-commissioning operations (available separately)</td></tr>
  </tbody>
</table>

<div class="pg-footer">
  <strong>Lighthief Cyprus Ltd</strong> &nbsp;|&nbsp; HE 477423 &nbsp;|&nbsp; solarfarms.cy &nbsp;|&nbsp;
  28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus<br>
  Confidential &mdash; indicative commercial proposal for Ukrhydroenergo hybrid BESS programme. Not a binding offer until formal bid submission.
</div>
</body>
</html>
"""

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"Written: {OUT}")
    print(f"Containers: {data['containers']} | PCS: {data['pcs']} | "
          f"Skids: {data['t8']}xT8 + {data['t4']}xT4 | "
          f"Installed: {data['inst_mw']:.0f} MW / {data['inst_mwh']:.1f} MWh")
    print(f"Equipment: EUR {int(data['equipment']):,} | EPC: EUR {int(data['epc_total']):,} | "
          f"Contingency: EUR {int(data['contingency']):,} | Margin: EUR {int(data['margin']):,}")
    print(f"TOTAL: EUR {int(data['total']):,}")


if __name__ == "__main__":
    main()
