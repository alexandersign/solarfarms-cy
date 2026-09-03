#!/usr/bin/env python3
"""Generate Ioannides Larnaca Mall BESS offer HTML from Aeolian template assets."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AEOLIAN = ROOT / "docs/clients/Individual_Aeolian_Dynamics_Larnaca/bess-aeolian-dynamics-final-offer-6.5mw-20mwh-24mar2026.html"
SPEC_SHEETS = ROOT / "docs/clients/Individual_Aeolian_Dynamics_Larnaca/equipment-spec-sheets.html"
OUT = ROOT / "docs/clients/Individual_Ioannides_Larnaca_Mall/bess-ioannides-larnaca-mall-2mw-8mwh-jun2026.html"


def first_img_after(text: str, marker: str) -> str:
    idx = text.find(marker)
    if idx < 0:
        return ""
    m = re.search(r'src="(data:image[^"]+)"', text[idx : idx + 800_000])
    return m.group(1) if m else ""


def extract_offer_row_img(aeolian: str, model_contains: str) -> str:
    for m in re.finditer(
        r'<tr>\s*<td class="model">(.*?)</td>\s*<td class="desc">(.*?)</td>\s*<td class="photo">(.*?)</td>',
        aeolian,
        re.S,
    ):
        model = re.sub(r"<[^>]+>", " ", m.group(1)).strip()
        if model_contains.lower() in model.lower():
            img = re.search(r'src="(data:image[^"]+)"', m.group(3))
            if img:
                return img.group(1)
    return ""


def main() -> None:
    aeolian = AEOLIAN.read_text(encoding="utf-8")
    specs = SPEC_SHEETS.read_text(encoding="utf-8")

    logo = re.search(r'<img class="lh" src="(data:image[^"]+)"', aeolian)
    logo_src = logo.group(1) if logo else ""

    img_battery = extract_offer_row_img(aeolian, "Atlantic")
    img_t2 = first_img_after(specs, "MV SKID T2")
    if not img_t2:
        img_t2 = extract_offer_row_img(aeolian, "T4 MV Skid")

    # Voltus: no image in Aeolian — use text placeholder cell
    voltus_cell = '<span style="font-size:7pt;color:#1A365D;font-weight:700;">Voltus<br>EMS</span>'

    def photo(img: str, alt: str) -> str:
        if img:
            return f'<img src="{img}" alt="{alt}">'
        return f'<span style="font-size:7pt;color:#666;">{alt}</span>'

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Andreas Ioannides — BESS 2 MW / 8 MWh Turnkey Offer | Lighthief Cyprus</title>
<style>
@page {{ size: A4; margin: 15mm 18mm; }}
@media print {{ .no-print {{ display: none; }} body {{ padding: 0; }} .page-break {{ page-break-before: always; }} }}
*{{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font-family:'Segoe UI',system-ui,sans-serif; font-size:9.5pt; line-height:1.6; color:#222; background:#fff; max-width:210mm; margin:0 auto; padding:15mm 18mm; }}
.page-break {{ page-break-before: always; }}
.pg-hdr {{ display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }}
.pg-hdr img.lh {{ height:32px; }}
.gold-line {{ height:2px; background:linear-gradient(90deg,#C9A432,#e8d48b,#C9A432); margin-bottom:12px; }}
.spec-title {{ font-size:1.1rem; font-weight:700; color:#222; margin:10px 0 8px; }}
h2 {{ font-size:11pt; color:#C9A432; margin:16px 0 6px; border-bottom:2px solid #1A365D; padding-bottom:3px; display:inline-block; }}
h3 {{ font-size:9.5pt; color:#1A365D; margin:10px 0 5px; }}
.supplier-info {{ font-size:8pt; margin-bottom:6px; }} .supplier-info strong {{ font-size:9pt; }}
.project-meta {{ font-size:8pt; margin-bottom:10px; }} .project-meta strong {{ color:#222; }}
.offer-tbl {{ width:100%; border-collapse:collapse; margin-bottom:8px; font-size:8pt; }}
.offer-tbl th {{ background:#1A365D; color:#fff; font-weight:600; font-size:7.5pt; padding:6px 8px; border:1px solid #1A365D; text-align:center; }}
.offer-tbl td {{ padding:6px 8px; border:1px solid #ccc; vertical-align:top; }}
.offer-tbl td.model {{ font-weight:700; text-align:center; width:18%; }}
.offer-tbl td.desc {{ font-size:7.5pt; line-height:1.35; width:40%; }}
.offer-tbl td.photo {{ text-align:center; width:22%; }}
.offer-tbl td.photo img {{ max-width:100%; max-height:70px; border-radius:4px; }}
.offer-tbl td.qty {{ text-align:center; font-weight:700; width:8%; font-size:10pt; }}
.offer-tbl tr:nth-child(even) td {{ background:#f5f8fb; }}
.offer-tbl tr.svc td {{ background:#fafbfc; }}
.price-row {{ display:flex; justify-content:flex-end; align-items:center; gap:10px; margin:8px 0 12px; font-size:9pt; }}
.price-row .label {{ color:#666; font-weight:600; }}
.price-row .amount {{ font-weight:800; font-size:12pt; color:#1A365D; }}
.callout-yellow {{ background:#fff8e1; border-left:3px solid #C9A432; border-radius:4px; padding:8px 10px; font-size:7.5pt; line-height:1.35; color:#333; margin:8px 0; }}
.callout-green {{ background:#e8f5e9; border-left:3px solid #2e7d32; border-radius:4px; padding:8px 10px; font-size:7.5pt; line-height:1.35; color:#1b5e20; margin:8px 0; }}
.kpi-row {{ display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin:10px 0 14px; }}
.kpi {{ background:#f5f8fb; border:1px solid #c0cfe0; border-radius:6px; padding:10px 6px; text-align:center; }}
.kpi .val {{ font-size:14pt; font-weight:800; color:#1A365D; }}
.kpi .lbl {{ font-size:6.5pt; color:#666; text-transform:uppercase; letter-spacing:.4px; margin-top:2px; }}
.kpi.green {{ background:#e8f5e9; border-color:#81c784; }} .kpi.green .val {{ color:#2e7d32; }}
.kpi.amber {{ background:#fff8e1; border-color:#ffd54f; }} .kpi.amber .val {{ color:#f57f17; }}
table.spec-tbl {{ width:100%; border-collapse:collapse; margin-bottom:10px; font-size:8pt; }}
.spec-tbl th {{ background:#1A365D; color:#fff; font-weight:600; font-size:7.5pt; padding:5px 8px; border:1px solid #1A365D; text-align:center; }}
.spec-tbl td {{ padding:4px 8px; border:1px solid #ccc; text-align:center; }}
.spec-tbl td:first-child {{ text-align:left; font-weight:600; background:#f0f2f5; color:#333; width:38%; }}
.spec-tbl tr:nth-child(even) td {{ background:#f8f9fb; }}
.spec-tbl tr:nth-child(even) td:first-child {{ background:#e8eaee; }}
.spec-tbl .section-row td {{ background:#fff!important; text-align:center; font-weight:700; font-size:9pt; color:#1A365D; border-left:none; border-right:none; padding:6px; }}
.two-col {{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:8px 0; }}
.box {{ border:1px solid #e2e8f0; border-radius:6px; padding:10px; }} .box h3 {{ margin-top:0; }} .box ul {{ margin-left:16px; }} .box li {{ margin-bottom:3px; }}
.incl {{ color:#059669; }} .excl {{ color:#dc2626; }}
.note {{ font-size:7.5pt; color:#64748b; margin:4px 0; }}
.pg-footer {{ border-top:1px solid #bbb; padding-top:8px; margin-top:16px; font-size:7pt; color:#777; line-height:1.3; }}
.pg-footer strong {{ color:#555; }}
.print-btn {{ position:fixed; top:15px; right:15px; background:#1A365D; color:#fff; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-size:10pt; z-index:100; box-shadow:0 2px 8px rgba(0,0,0,.2); }}
</style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">&#128424; Print / PDF</button>

<!-- PAGE 1: COMMERCIAL OFFER -->
<div class="pg-hdr">
  <img class="lh" src="{logo_src}" alt="Lighthief">
</div>
<div class="gold-line"></div>
<div class="spec-title">Technical &amp; Commercial Offer</div>

<div class="supplier-info">
  <strong>Lighthief Cyprus Ltd</strong> &nbsp;|&nbsp; HE 477423 &nbsp;|&nbsp; 15 Agaritsis, Nektaria Court, Office 201, 3045 Zakaki, Limassol<br>
  <strong>Prepared by:</strong> Alexander Papacosta, Cyprus Director &nbsp;|&nbsp; office@lighthief.com &nbsp;|&nbsp; +357 99 164 158
</div>
<div class="project-meta">
  <strong>Client:</strong> &Alpha;&Nu;&Delta;&Rho;&Epsilon;&Alpha;&Sigma; &Iota;&Omega;&Alpha;&Nu;&Nu;&Iota;&Delta;&Eta;&Sigma; (Director) &nbsp;&nbsp; <strong>Secondary contact:</strong> &Alpha;&Lambda;&Kappa;&Eta;&Sigma; &Kappa;&Alpha;&Iota;&Lambda;&Omicron;&Sigma;<br>
  <strong>Email:</strong> and.ioannides@cytanet.com.cy &nbsp;&nbsp; <strong>Phone:</strong> +357 99 654 438<br>
  <strong>Project:</strong> Larnaca Mall &mdash; 2 MW Net Billing PV + BESS Addon, Larnaca (Industrial Area)<br>
  <strong>Ref:</strong> LCY-IND-IOANNIDES-2026-06 &nbsp;&nbsp; <strong>Date:</strong> June 2026 &nbsp;&nbsp; <strong>Valid:</strong> 30 days
</div>

<div class="kpi-row">
  <div class="kpi amber"><div class="val">&euro;1,136,000</div><div class="lbl">Turnkey Price (ex VAT)</div></div>
  <div class="kpi green"><div class="val">2.0 MW</div><div class="lbl">Rated Power</div></div>
  <div class="kpi"><div class="val">8.36 MWh</div><div class="lbl">Storage (2&times;4.179 MWh)</div></div>
  <div class="kpi"><div class="val">4.0 h</div><div class="lbl">Duration @ Rated Power</div></div>
</div>

<table class="offer-tbl">
  <thead><tr><th>Model</th><th>Description</th><th>Photo</th><th>Qty</th></tr></thead>
  <tbody>
    <tr>
      <td class="model">Linyang Power Atlantic<br>ME 4.179 MWh</td>
      <td class="desc">20HC LFP battery energy storage container. 3-level BMS, liquid cooling, FK5112 fire suppression, Modbus TCP / IEC 104 / IEC 61850. EVE LF314 cells, 8,000 cycles @ 90% DOD.</td>
      <td class="photo">{photo(img_battery, "Battery container")}</td>
      <td class="qty">2</td>
    </tr>
    <tr>
      <td class="model">T2 MV Skid<br>BCS2000K-C-HUD</td>
      <td class="desc">20ft integrated MV skid: 2&times; Kehua BCS1000K-C-HUD PCS (2.0 MW total), 0.69/XX kV oil-immersed transformer, Schneider RM AirSeT MV switchgear, grid-forming capable.</td>
      <td class="photo">{photo(img_t2, "T2 MV Skid")}</td>
      <td class="qty">1</td>
    </tr>
    <tr>
      <td class="model">Voltus<br>EMS / SCADA</td>
      <td class="desc">Energy management &amp; SCADA: IEC 60870-5-104 DSO interface, net-billing optimisation, PV+BESS coordinated export control, curtailment recovery scheduling.</td>
      <td class="photo">{voltus_cell}</td>
      <td class="qty">1</td>
    </tr>
    <tr class="svc">
      <td class="model">MV / LV Cabling<br>&amp; Containment</td>
      <td class="desc">Minor cable works and trenching within BESS compound: DC busbar, MV feeder, LV auxiliaries, communications, cable trays and terminations to existing PV infrastructure.</td>
      <td class="photo"><span style="font-size:7pt;color:#666;">Cabling</span></td>
      <td class="qty">1</td>
    </tr>
    <tr class="svc">
      <td class="model">Civil Works</td>
      <td class="desc">Container foundations/platforms for 3&times; 20ft units (2 BESS + T2 skid), drainage within BESS pad, compound levelling as required for equipment placement.</td>
      <td class="photo"><span style="font-size:7pt;color:#666;">Civil</span></td>
      <td class="qty">1</td>
    </tr>
    <tr class="svc">
      <td class="model">DEHN Protection</td>
      <td class="desc">Internal lightning protection, surge protection devices (SPDs), compound earthing integration and bonding to existing site earth grid.</td>
      <td class="photo"><span style="font-size:7pt;color:#666;">DEHN</span></td>
      <td class="qty">1</td>
    </tr>
    <tr class="svc">
      <td class="model">Logistics &amp; Import</td>
      <td class="desc">Shipping to Limassol, customs clearance, import duties, marine &amp; transit insurance, crane offloading, inland transport and positioning at site.</td>
      <td class="photo"><span style="font-size:7pt;color:#666;">Logistics</span></td>
      <td class="qty">1</td>
    </tr>
    <tr class="svc">
      <td class="model">Engineering &amp;<br>Commissioning</td>
      <td class="desc">Electrical &amp; mechanical design, ETEK installer sign-off (Costas Hadjikyriacou), FAT witness, OEM install &amp; commissioning, EAC/DSO witness coordination, as-built manuals (electronic).</td>
      <td class="photo"><span style="font-size:7pt;color:#666;">EPC</span></td>
      <td class="qty">1</td>
    </tr>
    <tr class="svc">
      <td class="model">Construction<br>Insurance</td>
      <td class="desc">Contractor&rsquo;s All Risk (CAR/EAR) and Third Party Liability (TPL) for installation period until Provisional Acceptance (PAC).</td>
      <td class="photo"><span style="font-size:7pt;color:#666;">Insurance</span></td>
      <td class="qty">1</td>
    </tr>
  </tbody>
</table>

<div class="price-row">
  <span class="label">Turnkey EPC Price (ex VAT):</span>
  <span class="amount">&euro;1,136,000</span>
  <span class="label">(&euro;142,000/MWh &times; 8 MWh)</span>
</div>

<div class="callout-yellow">
  <strong>Net Billing PV Addon:</strong> This BESS is designed as a turnkey addon to your existing <strong>2 MW net-billing PV</strong> installation at Larnaca Mall. The Voltus EMS coordinates PV export, BESS charge/discharge, and grid export limits to maximise self-consumption and curtailment recovery.
</div>
<div class="callout-green">
  <strong>Industrial site placement:</strong> Equipment located within the existing industrial area. Minor cable routing and trenching within the BESS compound are included. PPC/PCC bay extension is <strong>not</strong> included in the turnkey price &mdash; indicative estimate provided separately if required by DSO.
</div>
<p class="note">This offer is confidential. All prices exclude VAT (19%) and battery recycling fees. Subject to final equipment confirmation and site survey within 5 working days of acceptance.</p>

<div class="pg-footer">
  <strong>Lighthief Cyprus Ltd</strong> &nbsp;|&nbsp; HE 477423 &nbsp;|&nbsp; solarfarms.cy &nbsp;|&nbsp; Page 1 of 3
</div>

<div class="page-break"></div>

<!-- PAGE 2: SCOPE, WARRANTY, PAYMENT -->
<div class="pg-hdr"><img class="lh" src="{logo_src}" alt="Lighthief"></div>
<div class="gold-line"></div>
<div class="spec-title">Scope of Works, Warranty &amp; Payment Terms</div>

<div class="two-col">
  <div class="box">
    <h3 class="incl">&#10003; Included in Turnkey Price</h3>
    <ul>
      <li>2 &times; Linyang Power Atlantic ME 4.179 MWh battery containers</li>
      <li>1 &times; T2 MV Skid (2 &times; BCS1000K-C-HUD = 2.0 MW)</li>
      <li>Voltus EMS/SCADA with IEC 60870-5-104 gateway</li>
      <li>Minor MV/LV cabling and trenching <strong>within BESS compound</strong></li>
      <li>Container foundations/platforms and compound drainage</li>
      <li>DEHN internal LPS, SPDs, compound earthing integration</li>
      <li>Shipping to Limassol + customs + inland transport + crane</li>
      <li>Electrical &amp; mechanical design drawings (BESS scope)</li>
      <li>Project engineering, FAT, install, commissioning</li>
      <li>EAC/DSO witness coordination and protection settings</li>
      <li>ETEK installer sign-off (Costas Hadjikyriacou)</li>
      <li>Construction insurance (CAR/EAR/TPL)</li>
      <li>5-year OEM base warranty (Linyang / Kehua)</li>
    </ul>
  </div>
  <div class="box">
    <h3 class="excl">&#10007; Excluded / Client Responsibility</h3>
    <ul>
      <li>VAT (19%)</li>
      <li>EAC/DSO connection &amp; witness fees (paid by client to EAC)</li>
      <li><strong>PPC / PCC bay extension</strong> &mdash; not in turnkey; <strong>indicative &euro;15,000&ndash;&euro;40,000</strong> if DSO requires dedicated bay</li>
      <li>External lightning protection beyond BESS compound (DEHN quoted per site)</li>
      <li>Licensed electrical drawings / as-built for full site (&euro;5,000&ndash;&euro;15,000)</li>
      <li>Protection relay testing: &euro;1,250/container (&euro;2,500 for 2 containers)</li>
      <li>Telecom / fibre backhaul to DSO control centre</li>
      <li>Battery recycling levy</li>
      <li>Broad site earthworks, road works, perimeter security</li>
      <li>Land / lease costs</li>
    </ul>
    <h3 style="margin-top:14px;">Year-10 Capacity</h3>
    <p style="font-size:7.5pt;color:#333;">8.36 MWh &times; 79.58% SOH = <strong>6.64 MWh</strong> usable at Year 10.<br>
    SOH guarantees: &ge;85% (Yr5), &ge;79.58% (Yr10), &ge;70% (Yr15).</p>
    <h3 style="margin-top:10px;">Extended Warranty (Yr 6&ndash;10)</h3>
    <p style="font-size:7.5pt;color:#333;">Paid directly to Linyang &mdash; not in EPC price:<br>
    BESS: &euro;913.92/MWh/yr = &euro;7,311/yr<br>
    PCS+MVS: &euro;747.76/MWh/yr = &euro;5,982/yr<br>
    <strong>Combined: &euro;13,293/yr for 8 MWh</strong></p>
  </div>
</div>

<h2>Warranty &amp; LTSA</h2>
<table class="spec-tbl">
  <thead><tr><th>Period</th><th>BESS Warranty</th><th>PCS+MVS</th><th>Combined/MWh/yr</th><th>LTSA O&amp;M</th></tr></thead>
  <tbody>
    <tr><td>Years 1&ndash;5</td><td colspan="2" style="text-align:center">Included in EPC</td><td>&euro;0</td><td>&euro;1,740/MWh/yr</td></tr>
    <tr><td>Years 6&ndash;10</td><td>&euro;913.92</td><td>&euro;747.76</td><td>&euro;1,661.68</td><td>&euro;1,740/MWh/yr</td></tr>
    <tr><td>Years 11&ndash;15</td><td>&euro;1,157.62</td><td>&euro;926.10</td><td>&euro;2,083.72</td><td>&euro;1,740/MWh/yr</td></tr>
  </tbody>
</table>
<p class="note">Extended warranty (Years 6+) paid directly to Linyang Energy. LTSA Tier C: 24/7 monitoring, 97% availability, preventive &amp; corrective maintenance. Annual LTSA (8 MWh) = &euro;13,920/yr.</p>

<h2>EMS/SCADA Annual Subscription</h2>
<table class="spec-tbl">
  <thead><tr><th>Service</th><th>&euro;/MWh/Year</th><th>Annual (8 MWh)</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>EMS/SCADA Subscription</td><td>&euro;400</td><td>&euro;3,200</td><td>Software updates, cloud hosting, data feeds, cybersecurity, DSO integrations</td></tr>
  </tbody>
</table>

<h2>Payment Terms</h2>
<table class="spec-tbl">
  <thead><tr><th>Milestone</th><th>%</th><th>Amount</th><th>Trigger</th></tr></thead>
  <tbody>
    <tr><td>Advance Payment</td><td>30%</td><td>&euro;340,800</td><td>Within 7 days of contract signing</td></tr>
    <tr><td>Pre-Shipment</td><td>55%</td><td>&euro;624,800</td><td>Factory inspection passed, ready to ship</td></tr>
    <tr><td>Provisional Acceptance (PAC)</td><td>10%</td><td>&euro;113,600</td><td>System commissioned &amp; grid-connected</td></tr>
    <tr><td>Retention</td><td>5%</td><td>&euro;56,800</td><td>Released 12 months after PAC</td></tr>
    <tr class="section-row"><td colspan="4">Total: &euro;1,136,000 (100%)</td></tr>
  </tbody>
</table>

<h2>Delivery Timeline</h2>
<table class="spec-tbl">
  <thead><tr><th>Phase</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>Detailed design &amp; engineering</td><td>2&ndash;4 weeks</td></tr>
    <tr><td>Factory production</td><td>~13 weeks</td></tr>
    <tr><td>Shipping (Shanghai &rarr; Limassol)</td><td>6&ndash;8 weeks</td></tr>
    <tr><td>Customs clearance &amp; inland delivery</td><td>1&ndash;2 weeks</td></tr>
    <tr><td>Site installation &amp; commissioning</td><td>4&ndash;6 weeks</td></tr>
    <tr class="section-row"><td colspan="2"><strong>Total: ~26&ndash;30 weeks from contract signing</strong></td></tr>
  </tbody>
</table>

<div class="pg-footer">
  <strong>Lighthief Cyprus Ltd</strong> &nbsp;|&nbsp; HE 477423 &nbsp;|&nbsp; solarfarms.cy &nbsp;|&nbsp; Page 2 of 3
</div>

<div class="page-break"></div>

<!-- PAGE 3: EQUIPMENT OVERVIEW -->
<div class="pg-hdr"><img class="lh" src="{logo_src}" alt="Lighthief"></div>
<div class="gold-line"></div>
<div class="spec-title">Equipment Overview &amp; Next Steps</div>

<table class="offer-tbl">
  <thead><tr><th>Equipment</th><th>Key Specifications</th><th>Image</th></tr></thead>
  <tbody>
    <tr>
      <td class="model">ME 4.179 MWh<br>Container</td>
      <td class="desc">LFP / EVE LF314 / 20HC / liquid cooled / IP55 / 8,000 cycles / Modbus TCP, IEC 104, IEC 61850</td>
      <td class="photo">{photo(img_battery, "ME container")}</td>
    </tr>
    <tr>
      <td class="model">T2 MV Skid<br>2&times; BCS1000K</td>
      <td class="desc">2.0 MW / 2,000 kVA / grid-forming / bi-directional 4-quadrant / EN 50549-2 certified</td>
      <td class="photo">{photo(img_t2, "T2 skid")}</td>
    </tr>
    <tr>
      <td class="model">Voltus EMS</td>
      <td class="desc">Cyprus-based EMS/SCADA, IEC 60870-5-104, net-billing &amp; curtailment optimisation, 24/7 monitoring</td>
      <td class="photo">{voltus_cell}</td>
    </tr>
  </tbody>
</table>

<h2>Attached Technical Datasheets</h2>
<table class="spec-tbl">
  <thead><tr><th>Ref</th><th>Document</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>A1</td><td>Power Atlantic ME 4.179 MWh Specification</td><td>Battery container technical data</td></tr>
    <tr><td>A2</td><td>Kehua BCS1000K-C-HUD Datasheet</td><td>1 MW PCS inverter</td></tr>
    <tr><td>A3</td><td>BCS2000K-C-HUD/T2 Skid Datasheet</td><td>2 MW integrated MV skid</td></tr>
    <tr><td>A4</td><td>Voltus EMS Technical Overview</td><td>SCADA &amp; energy management</td></tr>
    <tr><td>A5</td><td>Linyang Warranty Terms</td><td>OEM warranty terms and conditions</td></tr>
  </tbody>
</table>

<h2>Next Steps</h2>
<ol style="margin-left:20px;font-size:8.5pt;">
  <li><strong>Offer acceptance</strong> &mdash; written confirmation to office@lighthief.com</li>
  <li><strong>Site visit</strong> &mdash; BESS pad location, existing MV infrastructure, cable routing, grid voltage confirmation</li>
  <li><strong>Contract signing + advance payment (30%)</strong> &mdash; triggers production order (~13 weeks)</li>
  <li><strong>Factory Acceptance Test (FAT)</strong> &mdash; client invited</li>
  <li><strong>System operational</strong> &mdash; ~26&ndash;30 weeks from contract signing</li>
</ol>

<div class="callout-yellow" style="margin-top:12px;">
  <strong>Items to confirm at site visit:</strong> Grid voltage at POC (11/22/33 kV), space for T2 skid placement, cable route from PV inverter house to BESS pad, and whether DSO requires a dedicated PPC/PCC bay (&euro;15,000&ndash;&euro;40,000 indicative if required).
</div>

<div class="pg-footer" style="margin-top:20px;">
  <strong>Lighthief Cyprus Ltd</strong> &nbsp;|&nbsp; HE 477423<br>
  15 Agaritsis, Nektaria Court, Office 201, 3045 Zakaki, Limassol, Cyprus<br>
  <strong>Contact:</strong> Alexander Papacosta &nbsp;|&nbsp; office@lighthief.com &nbsp;|&nbsp; +357 99 164 158 &nbsp;|&nbsp; solarfarms.cy<br>
  Page 3 of 3 &nbsp;|&nbsp; Ref: LCY-IND-IOANNIDES-2026-06
</div>

</body>
</html>
"""

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({len(html):,} bytes)")
    print(f"  logo: {bool(logo_src)}, battery img: {bool(img_battery)}, t2 img: {bool(img_t2)}")


if __name__ == "__main__":
    main()
