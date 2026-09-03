"""Inject Shapiro-style BOM offer pages and product spec pages into client presentation HTMLs.

Usage:
    python3 scripts/inject-bom-spec-pages.py                           # all clients
    python3 scripts/inject-bom-spec-pages.py --client Group3_Lampros_Andreadis
"""
from __future__ import annotations

import argparse
import base64
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SENTINEL = "<!-- BOM-SPEC-PAGES-INJECTED -->"

# ---------------------------------------------------------------------------
# Base-64 image helpers
# ---------------------------------------------------------------------------

def b64(relpath: str) -> str:
    p = ROOT / relpath
    if not p.exists():
        print(f"  WARNING: image not found: {p}")
        return ""
    data = p.read_bytes()
    ext = p.suffix.lstrip(".").lower()
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
            "webp": "image/webp"}.get(ext, "image/jpeg")
    return f"data:{mime};base64,{base64.b64encode(data).decode()}"


LOGO_LH = None
LOGO_LY = None
IMG_CONTAINER_EXT = None
IMG_PCS = None
IMG_MVSKID = None
IMG_CONTAINER_CUT = None
IMG_CELLPACK = None


def load_images():
    global LOGO_LH, LOGO_LY, IMG_CONTAINER_EXT, IMG_PCS, IMG_MVSKID, IMG_CONTAINER_CUT, IMG_CELLPACK
    LOGO_LH = b64("public/logo/lighthief-logo.png")
    LOGO_LY = b64("public/logo/linyang_logo.jpg")
    IMG_CONTAINER_EXT = b64("public/images/linyang/container-exterior.jpeg")
    IMG_PCS = b64("public/images/linyang/pcs-1000-1250.jpeg")
    IMG_MVSKID = b64("public/images/linyang/t2-mv-skid.jpeg")
    IMG_CONTAINER_CUT = b64("public/images/linyang/container-cell-racks.jpeg")
    IMG_CELLPACK = b64("public/images/linyang/cellpack bpl y166.jpeg")


# ---------------------------------------------------------------------------
# Client BOM configurations
# ---------------------------------------------------------------------------

CLIENTS: dict[str, dict] = {}

# --- Group 3 - Lampros Andreadis (2 parks, per-park BOM) ---
CLIENTS["Group3_Lampros_Andreadis"] = {
    "path": "docs/clients/group-order/Group3_Lampros_Andreadis/client-presentation-mar2026.html",
    "client_name": "Lampros Andreadis",
    "summary_only": False,
    "parks": [
        {
            "name": "Solar Breeze",
            "mw": "1.5",
            "mwh": "5",
            "items": [
                ("ME 5.015 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nConfig: 1P104S x4 x12\nCapacity: 5.015 MWh\nVoltage: 1164.8-1497.6 Vdc\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5\nComms: Modbus TCP/IEC104", "container", "1"),
                ("Kehua BCS1250K PCS", "Bidirectional converter\n1.25 MW rated\nDC: 1060-1500V\nAC: 690V\nEfficiency: 99%\nGrid-forming: VSG\nProtection: IP55", "pcs", "1"),
                ("T1 MV Skid (20ft Std)", "MV transformer + switchgear\n1 PCS slot, max 1.50 MW\n22 kV grid connection\nOil-immersed transformer", "mvskid", "1"),
            ],
        },
        {
            "name": "Solar Garden",
            "mw": "3.3",
            "mwh": "10",
            "items": [
                ("ME 5.015 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nConfig: 1P104S x4 x12\nCapacity: 5.015 MWh\nVoltage: 1164.8-1497.6 Vdc\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5", "container", "2"),
                ("Kehua BCS1250K PCS", "Bidirectional converter\n1.25 MW rated\nDC: 1060-1500V / AC: 690V\nGrid-forming: VSG\nProtection: IP55", "pcs", "2"),
                ("T2 MV Skid (20ft HC)", "MV transformer + switchgear\n2 PCS slots, max 2.50 MW\n22 kV grid connection\nOil-immersed transformer", "mvskid", "1"),
            ],
        },
    ],
}

# --- Group 4 - A. Kerasi (3 parks, per-park BOM) ---
CLIENTS["Group4_A_Kerasi"] = {
    "path": "docs/clients/group-order/Group4_A_Kerasi/client-presentation-mar2026.html",
    "client_name": "A. Kerasi",
    "summary_only": False,
    "parks": [
        {
            "name": "Sunrise",
            "mw": "2.5",
            "mwh": "5",
            "items": [
                ("ME 5.015 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nCapacity: 5.015 MWh\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5", "container", "1"),
                ("Kehua BCS1250K PCS", "Bidirectional converter\n1.25 MW rated\nGrid-forming: VSG\nProtection: IP55", "pcs", "1"),
                ("T1 MV Skid (20ft Std)", "MV transformer + switchgear\n1 PCS slot, max 1.50 MW\n22 kV grid connection", "mvskid", "1"),
            ],
        },
        {
            "name": "Green Valley",
            "mw": "2.5",
            "mwh": "10",
            "items": [
                ("ME 5.015 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nCapacity: 5.015 MWh\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5", "container", "2"),
                ("Kehua BCS1250K PCS", "Bidirectional converter\n1.25 MW rated\nGrid-forming: VSG\nProtection: IP55", "pcs", "2"),
                ("T2 MV Skid (20ft HC)", "MV transformer + switchgear\n2 PCS slots, max 2.50 MW\n22 kV grid connection", "mvskid", "1"),
            ],
        },
        {
            "name": "Hilltop",
            "mw": "1.5",
            "mwh": "5",
            "items": [
                ("ME 5.015 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nCapacity: 5.015 MWh\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5", "container", "1"),
                ("Kehua BCS1250K PCS", "Bidirectional converter\n1.25 MW rated\nGrid-forming: VSG\nProtection: IP55", "pcs", "1"),
                ("T1 MV Skid (20ft Std)", "MV transformer + switchgear\n1 PCS slot, max 1.50 MW\n22 kV grid connection", "mvskid", "1"),
            ],
        },
    ],
}

# --- Group 5 - Ioannis Karis (1 park, per-park BOM) ---
CLIENTS["Group5_Ioannis_Karis"] = {
    "path": "docs/clients/group-order/Group5_Ioannis_Karis/client-presentation-mar2026.html",
    "client_name": "Ioannis Karis",
    "summary_only": False,
    "parks": [
        {
            "name": "Karis BESS Park",
            "mw": "7.7",
            "mwh": "25",
            "items": [
                ("ME 5.015 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nCapacity: 5.015 MWh per unit\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5", "container", "5"),
                ("Kehua BCS1250K PCS", "Bidirectional converter\n1.25 MW rated per unit\nDC: 1060-1500V / AC: 690V\nGrid-forming: VSG\nProtection: IP55", "pcs", "5"),
                ("T4 MV Skid (40ft HC)", "MV transformer + switchgear\n4 PCS slots, max 5.00 MW\n22 kV grid connection\nOil-immersed transformer", "mvskid", "1"),
                ("T1 MV Skid (20ft Std)", "MV transformer + switchgear\n1 PCS slot, max 1.50 MW\n22 kV grid connection\nOil-immersed transformer", "mvskid", "1"),
            ],
        },
    ],
}

# --- Group 6 - Timotheos Timotheou (9 parks, summary only) ---
CLIENTS["Group6_Timotheos_Timotheou"] = {
    "path": "docs/clients/group-order/Group6_Timotheos_Timotheou/client-presentation-mar2026.html",
    "client_name": "Timotheos Timotheou",
    "summary_only": True,
    "summary": {
        "total_mw": "25.5",
        "total_mwh": "81",
        "park_count": 9,
        "containers_5mwh": "~16",
        "pcs_count": "~16",
        "skid_summary": "Multiple T1/T2/T4 configurations",
    },
    "parks": [],
}

# --- Group 2 - Esperia Energy (11 parks, summary only) ---
CLIENTS["Group2_Esperia_Energy"] = {
    "path": "docs/clients/group-order/Group2_Esperia_Energy/client-presentation-mar2026.html",
    "client_name": "Esperia Energy",
    "summary_only": True,
    "summary": {
        "total_mw": "79.5",
        "total_mwh": "315.5",
        "park_count": 11,
        "containers_5mwh": "~63",
        "pcs_count": "~63",
        "skid_summary": "Multiple T1/T2/T4/T8 configurations",
    },
    "parks": [],
}

# --- Individual_Aristoklia_Solar (2 options) ---
CLIENTS["Individual_Aristoklia_Solar"] = {
    "path": "docs/clients/Individual_Aristoklia_Solar/client-presentation-mar2026.html",
    "client_name": "Aristoklia Solar Ltd",
    "summary_only": False,
    "parks": [
        {
            "name": "Aristoklia &mdash; Option A (~4 MWh)",
            "mw": "1.2",
            "mwh": "4.179",
            "items": [
                ("ME 4.179 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nConfig: 1P104S x4 x10\nCapacity: 4.179 MWh\nVoltage: 1164.8-1497.6 Vdc\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5", "container", "1"),
                ("Kehua BCS1000K PCS", "Bidirectional converter\n1.0 MW rated (limited to 1.2 MW nameplate)\nDC: 1060-1500V / AC: 690V\nGrid-forming: VSG\nProtection: IP55", "pcs", "1"),
                ("T1 MV Skid (20ft Std)", "MV transformer + switchgear\n1 PCS slot, max 1.50 MW\n22 kV grid connection", "mvskid", "1"),
            ],
        },
        {
            "name": "Aristoklia &mdash; Option B (Recommended, ~5 MWh)",
            "mw": "1.2",
            "mwh": "5.015",
            "items": [
                ("ME 5.015 MWh Container", "Containerised BESS\nCell: EVE 314Ah LFP\nConfig: 1P104S x4 x12\nCapacity: 5.015 MWh\nVoltage: 1164.8-1497.6 Vdc\nCooling: Liquid\nProtection: IP55\nAnti-corrosion: C5", "container", "1"),
                ("Kehua BCS1250K PCS", "Bidirectional converter\n1.25 MW rated (limited to 1.2 MW nameplate)\nDC: 1060-1500V / AC: 690V\nGrid-forming: VSG\nProtection: IP55", "pcs", "1"),
                ("T1 MV Skid (20ft Std)", "MV transformer + switchgear\n1 PCS slot, max 1.50 MW\n22 kV grid connection", "mvskid", "1"),
            ],
        },
    ],
}


# ---------------------------------------------------------------------------
# HTML building blocks
# ---------------------------------------------------------------------------

INJECT_CSS = """
<style>
/* ── BOM / Spec page styles (Shapiro-style) ── */
.bom-page { background:#fff; max-width:210mm; margin:24px auto; padding:22mm 18mm; box-shadow:0 4px 16px rgba(0,0,0,.08); }
.pg-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
.pg-hdr img.lh { height:24px; }
.pg-hdr img.ly { height:30px; }
.gold-line { height:2px; background:linear-gradient(90deg,#c9a84c,#e8d48b,#c9a84c); margin-bottom:12px; }
.bom-title { font-size:1.05rem; font-weight:700; color:#222; margin:10px 0 8px; }
.bom-meta { font-size:7.5pt; margin-bottom:10px; }
.bom-meta strong { color:#222; }
.offer-tbl { width:100%; border-collapse:collapse; margin-bottom:6px; font-size:7pt; }
.offer-tbl th { background:#1a4a7a; color:#fff; font-weight:600; font-size:7pt; padding:5px 6px; border:1px solid #1a4a7a; text-align:center; }
.offer-tbl td { padding:5px 6px; border:1px solid #ccc; vertical-align:top; }
.offer-tbl td.model { font-weight:700; text-align:center; width:22%; }
.offer-tbl td.desc { font-size:6.5pt; line-height:1.35; width:36%; }
.offer-tbl td.photo { text-align:center; width:24%; }
.offer-tbl td.photo img { max-width:100%; max-height:72px; }
.offer-tbl td.qty { text-align:center; font-weight:700; width:18%; }
.offer-tbl tr:nth-child(even) td { background:#f5f8fb; }
.price-row { display:flex; justify-content:flex-end; align-items:center; gap:8px; margin:4px 0 8px; font-size:8.5pt; }
.price-row .label { color:#666; font-weight:600; }
.price-row .amount { font-weight:800; font-size:9.5pt; color:#1a4a7a; }
.callout-yellow { background:#fdd835; border-radius:3px; padding:6px 8px; font-size:6.5pt; line-height:1.35; color:#333; margin:6px 0 8px; }
.bom-footer { border-top:1px solid #bbb; padding-top:5px; margin-top:auto; font-size:5.5pt; color:#777; line-height:1.3; }
.bom-footer strong { color:#555; }
.spec-title-bom { font-size:1.05rem; font-weight:700; color:#222; margin:10px 0 8px; }
.spec-tbl { width:100%; border-collapse:collapse; margin-bottom:8px; font-size:7pt; }
.spec-tbl th { background:#1a4a7a; color:#fff; font-weight:600; font-size:6.5pt; padding:4px 6px; border:1px solid #1a4a7a; text-align:center; }
.spec-tbl td { padding:3px 6px; border:1px solid #ccc; text-align:center; }
.spec-tbl td:first-child { text-align:left; font-weight:600; background:#f0f2f5; color:#333; width:38%; }
.spec-tbl tr:nth-child(even) td { background:#f8f9fb; }
.spec-tbl tr:nth-child(even) td:first-child { background:#e8eaee; }
.spec-tbl .section-row td { background:#fff !important; text-align:center; font-weight:700; font-size:7.5pt; color:#1a4a7a; border-left:none; border-right:none; padding:6px 4px; }
.product-img-wrap { text-align:center; margin:8px 0; }
.product-img-wrap img { max-height:120px; }
.product-img-wrap .caption { font-size:6pt; color:#888; margin-top:2px; }
.summary-tbl { width:100%; border-collapse:collapse; margin-bottom:8px; font-size:7.5pt; }
.summary-tbl th { background:#1a4a7a; color:#fff; font-weight:600; padding:5px 8px; border:1px solid #1a4a7a; text-align:center; }
.summary-tbl td { padding:5px 8px; border:1px solid #ccc; text-align:center; }
.summary-tbl td:first-child { text-align:left; font-weight:600; }
.summary-tbl tr:nth-child(even) td { background:#f5f8fb; }
.summary-tbl .total-row td { background:#fdf6e3 !important; font-weight:700; }
@media print { .bom-page { box-shadow:none; margin:0; padding:14mm 16mm; page-break-before:always; } }
</style>
"""


def nl(s: str) -> str:
    return s.replace("\n", "<br>")


def page_header() -> str:
    return f"""<div class="pg-hdr">
  <img class="lh" src="{LOGO_LH}" alt="Lighthief">
  <img class="ly" src="{LOGO_LY}" alt="Linyang Energy">
</div>
<div class="gold-line"></div>"""


def page_footer(client_name: str) -> str:
    return f"""<div class="bom-footer">
  <strong>Lighthief Cyprus Ltd</strong> &middot; HE 477423 &middot; 15 Agaritsis, Nektaria Court, Office 201, 3045 Zakaki, Limassol<br>
  Prepared for {client_name} &middot; Confidential &mdash; equipment specifications constitute proprietary information of Linyang Energy.
</div>"""


def img_for_key(key: str) -> str:
    return {
        "container": IMG_CONTAINER_EXT,
        "pcs": IMG_PCS,
        "mvskid": IMG_MVSKID,
        "cellpack": IMG_CELLPACK,
        "container_cut": IMG_CONTAINER_CUT,
    }.get(key, "")


# ---------------------------------------------------------------------------
# BOM offer page (per park)
# ---------------------------------------------------------------------------

def build_bom_page(park: dict, client_name: str) -> str:
    rows = ""
    for model, desc, img_key, qty in park["items"]:
        rows += f"""      <tr>
        <td class="model">{nl(model)}</td>
        <td class="desc">{nl(desc)}</td>
        <td class="photo"><img src="{img_for_key(img_key)}" alt=""></td>
        <td class="qty">{nl(str(qty))}</td>
      </tr>\n"""

    return f"""
<div class="bom-page page-break">
{page_header()}
<div class="bom-title">Bill of Materials &mdash; {park['name']}</div>

<div class="bom-meta">
  <strong>Client:</strong> {client_name}<br>
  <strong>Project:</strong> {park['name']}<br>
  <strong>Power:</strong> {park['mw']} MW &nbsp;&nbsp;
  <strong>Capacity:</strong> {park['mwh']} MWh<br>
  <strong>Date:</strong> 26 March 2026 &nbsp;&nbsp;
  <strong>Valid for:</strong> 14 days
</div>

<table class="offer-tbl">
  <thead><tr><th>Equipment</th><th>Description</th><th>Photo</th><th>Quantity</th></tr></thead>
  <tbody>
{rows}  </tbody>
</table>

<div class="price-row">
  <span class="label">Turnkey EPC Price</span>
  <span class="amount">See pricing table above</span>
</div>

<div class="callout-yellow">
  <strong>Note:</strong> All equipment is supplied by Linyang Energy (OEM) with Kehua PCS and installed turnkey by Lighthief Cyprus Ltd.
  Pricing for this park is included in the commercial offer above. Equipment specifications subject to final engineering.
  All containers rated C5 anti-corrosion for Cyprus coastal/industrial environment.
</div>

{page_footer(client_name)}
</div>
"""


# ---------------------------------------------------------------------------
# Summary BOM page (for large portfolios)
# ---------------------------------------------------------------------------

def build_summary_bom_page(cfg: dict) -> str:
    s = cfg["summary"]
    return f"""
<div class="bom-page page-break">
{page_header()}
<div class="bom-title">Portfolio Equipment Summary &mdash; {cfg['client_name']}</div>

<div class="bom-meta">
  <strong>Client:</strong> {cfg['client_name']}<br>
  <strong>Portfolio:</strong> {s['park_count']} parks &nbsp;&nbsp;
  <strong>Total Power:</strong> {s['total_mw']} MW &nbsp;&nbsp;
  <strong>Total Capacity:</strong> {s['total_mwh']} MWh<br>
  <strong>Date:</strong> 26 March 2026 &nbsp;&nbsp;
  <strong>Valid for:</strong> 14 days
</div>

<table class="summary-tbl">
  <thead><tr><th>Equipment</th><th>Description</th><th>Quantity (approx.)</th></tr></thead>
  <tbody>
    <tr><td>ME 5.015 MWh Container</td><td>Containerised BESS &mdash; EVE 314Ah LFP, liquid cooled, IP55, C5 anti-corrosion</td><td>{s['containers_5mwh']}</td></tr>
    <tr><td>Kehua BCS1250K PCS</td><td>1.25 MW bidirectional converter, grid-forming VSG, IP55</td><td>{s['pcs_count']}</td></tr>
    <tr><td>MV Skids</td><td>{s['skid_summary']}</td><td>Per park design</td></tr>
    <tr class="total-row"><td>Total Portfolio</td><td>{s['park_count']} parks across Cyprus</td><td>{s['total_mw']} MW / {s['total_mwh']} MWh</td></tr>
  </tbody>
</table>

<div class="product-img-wrap">
  <img src="{IMG_CONTAINER_EXT}" alt="Container" style="max-height:90px; margin-right:12px;">
  <img src="{IMG_PCS}" alt="PCS" style="max-height:90px; margin-right:12px;">
  <img src="{IMG_MVSKID}" alt="MV Skid" style="max-height:90px;">
  <div class="caption">Linyang BESS Container &middot; Kehua PCS &middot; MV Skid (representative images)</div>
</div>

<div class="callout-yellow">
  <strong>Note:</strong> Exact per-park equipment counts depend on final engineering design. All containers rated C5 anti-corrosion
  for Cyprus coastal/industrial environment. Pricing per park is included in the commercial offer above.
</div>

{page_footer(cfg['client_name'])}
</div>
"""


# ---------------------------------------------------------------------------
# Product spec pages
# ---------------------------------------------------------------------------

def build_spec_page_pcs() -> str:
    return f"""
<div class="bom-page page-break">
{page_header()}
<div class="spec-title-bom">PCS Technical Specification (Power Conversion System)</div>

<div class="product-img-wrap">
  <img src="{IMG_PCS}" alt="PCS" style="max-height:130px">
  <div class="caption">PCS reference image &mdash; Kehua BCS1000K / BCS1250K</div>
</div>

<table class="spec-tbl">
  <thead><tr><th>Parameter</th><th>BCS1000K-C-HUD</th><th>BCS1250K-C-HUD</th></tr></thead>
  <tbody>
    <tr class="section-row"><td colspan="3">DC Side</td></tr>
    <tr><td>Max DC voltage</td><td>1500 Vdc</td><td>1500 Vdc</td></tr>
    <tr><td>DC voltage range</td><td>1060&ndash;1500 Vdc</td><td>1060&ndash;1500 Vdc</td></tr>
    <tr><td>Max DC current</td><td>1122 A</td><td>1403 A</td></tr>
    <tr><td>Soft start</td><td>YES</td><td>YES</td></tr>
    <tr class="section-row"><td colspan="3">AC Output (Grid-connected)</td></tr>
    <tr><td>Rated AC output power</td><td>1000 kW</td><td>1250 kW</td></tr>
    <tr><td>Max AC output power</td><td>1100 kVA</td><td>1375 kVA</td></tr>
    <tr><td>Rated grid voltage</td><td>690 Vac</td><td>690 Vac</td></tr>
    <tr><td>Grid voltage range</td><td>&minus;15% ~ +10%</td><td>&minus;15% ~ +10%</td></tr>
    <tr><td>Grid frequency</td><td>50 Hz</td><td>50 Hz</td></tr>
    <tr><td>Max output current</td><td>920 A</td><td>1151 A</td></tr>
    <tr><td>Power factor</td><td>&gt;0.99 (at rated)</td><td>&gt;0.99 (at rated)</td></tr>
    <tr><td>THDi</td><td>&lt;3% (at rated)</td><td>&lt;3% (at rated)</td></tr>
    <tr class="section-row"><td colspan="3">Efficiency</td></tr>
    <tr><td>Max efficiency</td><td>99%</td><td>99%</td></tr>
    <tr class="section-row"><td colspan="3">Grid-Forming Capability</td></tr>
    <tr><td>Virtual Synchronous Generator (VSG)</td><td colspan="2">Built-in &mdash; synthetic inertia for island grids</td></tr>
    <tr><td>Black-start capability</td><td colspan="2">Available</td></tr>
    <tr><td>4-quadrant operation</td><td colspan="2">Standard</td></tr>
    <tr class="section-row"><td colspan="3">General</td></tr>
    <tr><td>IP protection class</td><td colspan="2">IP 55</td></tr>
    <tr><td>Operating temperature</td><td colspan="2">&minus;35&deg;C to 60&deg;C (derate above 45&deg;C)</td></tr>
    <tr><td>Cooling</td><td colspan="2">Intelligent air cooling</td></tr>
    <tr><td>Dimensions (W&times;H&times;D)</td><td colspan="2">735 &times; 2135 &times; 1300 mm</td></tr>
    <tr><td>Weight</td><td colspan="2">1500 kg</td></tr>
    <tr><td>Communication</td><td colspan="2">Modbus-RTU, Modbus-TCP, IEC 61850, IEC 104</td></tr>
    <tr><td>Compliance</td><td colspan="2">EN 50549-2 (T&Uuml;V D 115067 0077), IEC/EN 62477-1, NC RfG</td></tr>
  </tbody>
</table>

{page_footer("Client")}
</div>
"""


def build_spec_page_container() -> str:
    return f"""
<div class="bom-page page-break">
{page_header()}
<div class="spec-title-bom">BESS Container Technical Specification</div>

<div class="product-img-wrap">
  <img src="{IMG_CONTAINER_CUT}" alt="Container" style="max-height:110px">
  <div class="caption">Linyang ME 5.015 MWh containerised energy storage</div>
</div>

<table class="spec-tbl">
  <thead><tr><th>Parameter</th><th>ME 5.015 MWh (Standard)</th></tr></thead>
  <tbody>
    <tr><td>Cell type</td><td>EVE 3.2V / 314Ah LFP</td></tr>
    <tr><td>Battery system config</td><td>1P104S &times; 4 &times; 12 (12 battery packs)</td></tr>
    <tr><td>Nominal capacity</td><td>5.015 MWh</td></tr>
    <tr><td>Nominal DC voltage</td><td>1331.2 V</td></tr>
    <tr><td>DC voltage range</td><td>1164.8 ~ 1497.6 Vdc</td></tr>
    <tr><td>Dimensions W&times;D&times;H (mm)</td><td>6058 &times; 2438 &times; 2896</td></tr>
    <tr><td>Container type</td><td>20ft High-Cube (20HC)</td></tr>
    <tr><td>Weight with battery (t)</td><td>~41</td></tr>
    <tr><td>Anti-corrosion rating</td><td><strong>C5</strong> (coastal/industrial &mdash; Cyprus spec)</td></tr>
    <tr><td>Protection class</td><td>IP55</td></tr>
    <tr><td>Operating temp range</td><td>&minus;30&deg;C ~ +50&deg;C</td></tr>
    <tr><td>Relative humidity</td><td>0 ~ 95%</td></tr>
    <tr><td>Cooling &mdash; battery chamber</td><td>Liquid cooling</td></tr>
    <tr><td>Max operating altitude</td><td>&le; 2000 m</td></tr>
    <tr><td>Operating environment</td><td>Outdoor (container)</td></tr>
    <tr><td>Fire detection</td><td>Multi-zone smoke, heat &amp; gas (H&#8322;, CO)</td></tr>
    <tr><td>Fire suppression</td><td>Integrated aerosol per container (auto-activation)</td></tr>
    <tr><td>Fire safety certification</td><td>UL9540A PASSED &mdash; zero thermal propagation</td></tr>
    <tr><td>BMS monitoring</td><td>Cell-level voltage, temperature &amp; current</td></tr>
    <tr><td>Communication</td><td>Modbus TCP / IEC 104 / IEC 61850</td></tr>
    <tr><td>Cycle life</td><td>7,000 cycles @ 90% DOD, 25&plusmn;2&deg;C, &ge;70% EOL</td></tr>
    <tr><td>Design life</td><td>15 years (contractual SOH guarantee)</td></tr>
    <tr><td>Round-trip efficiency (AC-AC)</td><td>&ge; 86.32% (full system incl. cabling losses)</td></tr>
  </tbody>
</table>

{page_footer("Client")}
</div>
"""


def build_spec_page_mvskid() -> str:
    return f"""
<div class="bom-page page-break">
{page_header()}
<div class="spec-title-bom">MV Skid Technical Specification</div>

<div class="product-img-wrap">
  <img src="{IMG_MVSKID}" alt="MV SKID" style="max-height:120px">
  <div class="caption">MV Skid reference image &mdash; T2 shown (2-PCS configuration)</div>
</div>

<table class="spec-tbl">
  <thead><tr><th>Parameter</th><th>T2 (2&times;PCS)</th><th>T2 (2&times;1.25 MW)</th></tr></thead>
  <tbody>
    <tr class="section-row"><td colspan="3">DC Side</td></tr>
    <tr><td>Max DC voltage</td><td colspan="2">1500 Vdc</td></tr>
    <tr><td>DC voltage range</td><td colspan="2">1000&ndash;1500 Vdc</td></tr>
    <tr><td>Max DC current</td><td>1122A &times; 2</td><td>1403A &times; 2</td></tr>
    <tr><td>Soft start</td><td colspan="2">YES</td></tr>
    <tr class="section-row"><td colspan="3">AC Output (Grid-connected)</td></tr>
    <tr><td>Rated AC output power</td><td>2000 kW</td><td>2500 kW</td></tr>
    <tr><td>Max AC output power</td><td>2500 kVA</td><td>2750 kVA</td></tr>
    <tr><td>Rated grid voltage</td><td colspan="2">690 Vac (3P3W+PE)</td></tr>
    <tr><td>Grid frequency</td><td colspan="2">50 Hz</td></tr>
    <tr><td>Max output current</td><td>1841 A</td><td>2301 A</td></tr>
    <tr><td>Power factor</td><td colspan="2">&gt;0.99 (at rated power)</td></tr>
    <tr><td>THDi</td><td colspan="2">&lt;3% (at rated power)</td></tr>
    <tr class="section-row"><td colspan="3">Efficiency</td></tr>
    <tr><td>Max efficiency</td><td colspan="2">99%</td></tr>
    <tr class="section-row"><td colspan="3">Transformer</td></tr>
    <tr><td>Rated power</td><td>2000 kVA</td><td>2500 kVA</td></tr>
    <tr><td>Voltage ratio</td><td colspan="2">0.69 / (6&ndash;33) kV</td></tr>
    <tr><td>Isolation mode</td><td colspan="2">Oil-immersed transformer</td></tr>
    <tr class="section-row"><td colspan="3">General</td></tr>
    <tr><td>Container type</td><td colspan="2">20ft High-Cube (6058 &times; 2896 &times; 2438 mm)</td></tr>
    <tr><td>IP protection</td><td colspan="2">IP 55</td></tr>
    <tr><td>Operating temperature</td><td colspan="2">&minus;35&deg;C to 60&deg;C (derate above 45&deg;C)</td></tr>
    <tr><td>Weight</td><td>&lt;13,000 kg</td><td>&lt;14,000 kg</td></tr>
    <tr><td>Communication</td><td colspan="2">Modbus-RTU, Modbus-TCP, IEC 61850, IEC 104</td></tr>
    <tr><td>Compliance</td><td colspan="2">IEC/EN 62477-1, EN 50549-2, NC RfG, IEC 62116</td></tr>
  </tbody>
</table>

<div class="callout-yellow">
  <strong>Skid configurations:</strong> T1 (1 PCS, 20ft Std, &le;1.50 MW) &middot;
  T2 (2 PCS, 20ft HC, &le;2.50 MW) &middot; T4 (4 PCS, 40ft HC, &le;5.00 MW) &middot;
  T8 (8 PCS, 2&times;40ft HC, &le;10.0 MW). Exact skid type per park based on PCS count.
</div>

{page_footer("Client")}
</div>
"""


def build_spec_page_pack() -> str:
    return f"""
<div class="bom-page page-break">
{page_header()}
<div class="spec-title-bom">Liquid-Cooled Battery Pack Technical Specification</div>

<div class="product-img-wrap">
  <img src="{IMG_CELLPACK}" alt="Battery Pack" style="max-height:100px">
  <div class="caption">Linyang battery pack reference image</div>
</div>

<table class="spec-tbl">
  <thead><tr><th>Parameter</th><th>BPL-Y166.4/<br>306 2A</th><th>BPL-Y166.4/<br>314 2A</th><th>BPL-Y332.8/<br>314 2A</th></tr></thead>
  <tbody>
    <tr><td>Cell type</td><td>306 Ah</td><td>314 Ah</td><td>314 Ah</td></tr>
    <tr><td>Battery config</td><td colspan="2">1P52S</td><td>1P104S</td></tr>
    <tr><td>Cell capacity (Ah)</td><td>306</td><td>314</td><td>314</td></tr>
    <tr><td>Nominal DC voltage (V)</td><td colspan="2">166.4</td><td>332.8</td></tr>
    <tr><td>Rated capacity (kWh)</td><td>50.92</td><td>52.25</td><td>104.5</td></tr>
    <tr><td>Operating temp (charge)</td><td colspan="3">0&deg;C ~ 55&deg;C</td></tr>
    <tr><td>Operating temp (discharge)</td><td colspan="3">&minus;20&deg;C ~ 55&deg;C</td></tr>
    <tr><td>BMS balancing</td><td colspan="3">Active balancing</td></tr>
    <tr><td>Cooling</td><td colspan="3">Liquid cooling</td></tr>
    <tr><td>Efficiency</td><td colspan="3">&gt; 93%</td></tr>
    <tr><td>Dimensions W&times;D&times;H (mm)</td><td colspan="2">1140 &times; 790 &times; 250.5</td><td>2180 &times; 762.5 &times; 252</td></tr>
    <tr><td>Weight (kg)</td><td colspan="2">~345</td><td>~690</td></tr>
    <tr><td>Protection class</td><td colspan="3">&le; IP67</td></tr>
    <tr><td>Cell material</td><td colspan="3">LFP (Lithium Iron Phosphate)</td></tr>
    <tr><td>Rated cell voltage (V)</td><td colspan="3">3.2</td></tr>
    <tr><td>Cell weight (kg)</td><td>~5.6</td><td colspan="2">~5.62</td></tr>
    <tr><td>Cell manufacturer</td><td colspan="3">EVE Energy (Global Top 3 ESS cell manufacturer)</td></tr>
  </tbody>
</table>

{page_footer("Client")}
</div>
"""


# ---------------------------------------------------------------------------
# Main injection logic
# ---------------------------------------------------------------------------

def inject_client(key: str, cfg: dict) -> bool:
    """Inject BOM + spec pages into one client's HTML file. Returns True if modified."""
    fpath = ROOT / cfg["path"]
    if not fpath.exists():
        print(f"  SKIP {key}: file not found ({fpath})")
        return False

    html = fpath.read_text(encoding="utf-8")

    if SENTINEL in html:
        print(f"  SKIP {key}: already injected")
        return False

    parts: list[str] = []

    # CSS (injected once)
    parts.append(SENTINEL)
    parts.append(INJECT_CSS)

    # Per-park BOM pages (small portfolios) or summary page (large portfolios)
    if cfg["summary_only"]:
        parts.append(build_summary_bom_page(cfg))
    else:
        for park in cfg["parks"]:
            parts.append(build_bom_page(park, cfg["client_name"]))

    # 4 product spec pages (always)
    parts.append(build_spec_page_pcs())
    parts.append(build_spec_page_container())
    parts.append(build_spec_page_mvskid())
    parts.append(build_spec_page_pack())

    injection = "\n".join(parts)

    # Insert before </body>
    if "</body>" in html:
        html = html.replace("</body>", injection + "\n</body>", 1)
    else:
        html += injection

    fpath.write_text(html, encoding="utf-8")
    print(f"  DONE {key}: injected into {fpath.relative_to(ROOT)}")
    return True


def main():
    parser = argparse.ArgumentParser(description="Inject BOM/spec pages into client presentations")
    parser.add_argument("--client", type=str, default=None, help="Single client key to process")
    args = parser.parse_args()

    load_images()

    targets = {}
    if args.client:
        if args.client in CLIENTS:
            targets[args.client] = CLIENTS[args.client]
        else:
            print(f"ERROR: Unknown client '{args.client}'. Available: {', '.join(CLIENTS.keys())}")
            sys.exit(1)
    else:
        targets = CLIENTS

    updated = 0
    skipped = 0
    for key, cfg in targets.items():
        print(f"Processing: {key}")
        if inject_client(key, cfg):
            updated += 1
        else:
            skipped += 1

    print(f"\nSummary: {updated} file(s) updated, {skipped} skipped")


if __name__ == "__main__":
    main()
