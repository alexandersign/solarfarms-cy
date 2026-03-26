"""
Generate equipment-spec-sheets.html for any client folder.
Reusable across group-order and individual clients.

Usage:
  python scripts/build-equipment-spec-sheets.py                     # all clients
  python scripts/build-equipment-spec-sheets.py --client group-order # group only
  python scripts/build-equipment-spec-sheets.py --client Individual_Shapiro
  python scripts/build-equipment-spec-sheets.py --list               # show client configs

Each client config specifies which equipment set to include.
Output: <client-folder>/equipment-spec-sheets.html
"""
from __future__ import annotations
import argparse, base64, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# ── Base64 image helper ──
_IMG_CACHE: dict[str, str] = {}
def b64(relpath: str) -> str:
    if relpath not in _IMG_CACHE:
        p = ROOT / relpath
        data = p.read_bytes()
        ext = p.suffix.lstrip(".").lower()
        mime = "image/png" if ext == "png" else "image/jpeg"
        _IMG_CACHE[relpath] = f"data:{mime};base64,{base64.b64encode(data).decode()}"
    return _IMG_CACHE[relpath]

def LOGO_LH(): return b64("public/logo/lighthief-logo.png")
def LOGO_LY(): return b64("public/logo/linyang_logo.jpg")
def LOGO_KH(): return b64("public/logo/kehua_logo.jpg")
def IMG_PCS(): return b64("public/images/linyang/pcs-1000-1250.jpeg")
def IMG_MVSKID_T2(): return b64("public/images/linyang/t2-mv-skid.jpeg")
def IMG_MVSKID_T4(): return b64("public/images/linyang/t4-mv-skid.jpeg")
def IMG_CONTAINER_EXT(): return b64("public/images/linyang/container-exterior.jpeg")
def IMG_CONTAINER_CUT(): return b64("public/images/linyang/container-cell-racks.jpeg")
def IMG_CABINET(): return b64("public/images/linyang/Cabinet-254-kwh.jpeg")
def IMG_CELLPACK(): return b64("public/images/linyang/cellpack bpl y166.jpeg")

# ── CSS (A5 print-ready, matching Shapiro style) ──
CSS = """
    @page { size: A4; margin: 15mm 18mm; }
    @media print { .no-print { display: none; } body { padding: 0; } }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 9.5pt; line-height: 1.5; color: #222; background: #fff; max-width: 210mm; margin: 0 auto; padding: 15mm 18mm; }
    .page-break { page-break-before: always; }
    .pg-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .pg-hdr img.lh { height: 32px; }
    .pg-hdr img.ly { height: 38px; }
    .gold-line { height: 2px; background: linear-gradient(90deg, #c9a84c, #e8d48b, #c9a84c); margin-bottom: 12px; }
    .spec-title { font-size: 1.3rem; font-weight: 700; color: #222; margin: 14px 0 10px; }
    .product-img-wrap { text-align: center; margin: 8px 0; }
    .product-img-wrap img { max-height: 180px; }
    .product-img-wrap .caption { font-size: 8pt; color: #888; margin-top: 4px; }
    .spec-tbl { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 9pt; }
    .spec-tbl th { background: #1a4a7a; color: #fff; font-weight: 600; font-size: 8.5pt; padding: 6px 10px; border: 1px solid #1a4a7a; text-align: center; }
    .spec-tbl td { padding: 5px 10px; border: 1px solid #ccc; text-align: center; }
    .spec-tbl td:first-child { text-align: left; font-weight: 600; background: #f0f2f5; color: #333; width: 38%; }
    .spec-tbl tr:nth-child(even) td { background: #f8f9fb; }
    .spec-tbl tr:nth-child(even) td:first-child { background: #e8eaee; }
    .spec-tbl .section-row td { background: #fff !important; text-align: center; font-weight: 700; font-size: 10pt; color: #1a4a7a; border-left: none; border-right: none; padding: 8px 6px; }
    .pg-footer { border-top: 1px solid #bbb; padding-top: 8px; margin-top: auto; font-size: 7pt; color: #777; line-height: 1.35; }
    .pg-footer strong { color: #555; }
"""

def page_header():
    return f'<div class="pg-hdr"><img class="lh" src="{LOGO_LH()}" alt="Lighthief"><img class="ly" src="{LOGO_LY()}" alt="Linyang"></div><div class="gold-line"></div>'

def page_footer():
    return '<div class="pg-footer"><strong>Linyang address:</strong> Warsaw Vibe Office Building, ul. Towarowa 7, 00-839 Warsaw (8th floor).<br>This offer is confidential and constitutes a trade secret of Jiangsu Linyang Energy Storage Technology Co., Ltd within the meaning of Art. 11(4) of the Act of 16 April 1993 on Combating Unfair Competition.</div>'


# ══════════════════════════════════════════════════
# SPEC PAGE BUILDERS — each returns a full page HTML
# ══════════════════════════════════════════════════

def spec_pcs(is_first=False):
    pb = '' if is_first else '<div class="page-break"></div>'
    return f"""{pb}
{page_header()}
<div class="spec-title">PCS Technical Description (Power Conversion System)</div>
<div class="product-img-wrap"><img src="{IMG_PCS()}" alt="PCS" style="max-height:200px"><div class="caption">Kehua BCS1000K / BCS1250K</div></div>
<table class="spec-tbl">
  <thead><tr><th>Products</th><th>BCS1000K-C-HUD</th><th>BCS1250K-C-HUD</th></tr></thead>
  <tbody>
    <tr class="section-row"><td colspan="3">DC Side</td></tr>
    <tr><td>Max DC voltage</td><td>1500 Vdc</td><td>1500 Vdc</td></tr>
    <tr><td>DC voltage range</td><td>1060–1500 Vdc</td><td>1060–1500 Vdc</td></tr>
    <tr><td>Max DC current</td><td>1122 A</td><td>1403 A</td></tr>
    <tr><td>Soft start</td><td>YES</td><td>YES</td></tr>
    <tr class="section-row"><td colspan="3">AC Output (Grid-connected)</td></tr>
    <tr><td>Rated AC output power</td><td>1000 kW</td><td>1250 kW</td></tr>
    <tr><td>Max AC output power</td><td>1100 kVA</td><td>1375 kVA</td></tr>
    <tr><td>Rated grid voltage</td><td>690 Vac</td><td>690 Vac</td></tr>
    <tr><td>Grid voltage range</td><td colspan="2">−15% ~ +10%</td></tr>
    <tr><td>Grid frequency range</td><td>50 Hz</td><td>50 Hz</td></tr>
    <tr><td>Max output current</td><td>920 A</td><td>1151 A</td></tr>
    <tr><td>Power factor</td><td colspan="2">&gt;0.99 (at rated)</td></tr>
    <tr><td>THDi</td><td colspan="2">&lt;3% (at rated)</td></tr>
    <tr class="section-row"><td colspan="3">PCS Efficiency</td></tr>
    <tr><td>Max efficiency</td><td>99%</td><td>99%</td></tr>
    <tr class="section-row"><td colspan="3">General</td></tr>
    <tr><td>IP protection class</td><td colspan="2">IP 55</td></tr>
    <tr><td>Operating temperature</td><td colspan="2">−35°C to 60°C (derate above 45°C)</td></tr>
    <tr><td>Cooling</td><td colspan="2">Intelligent air cooling</td></tr>
    <tr><td>Dimensions (W×H×D)</td><td colspan="2">735 × 2135 × 1300 mm</td></tr>
    <tr><td>Weight</td><td colspan="2">1500 kg</td></tr>
    <tr><td>Altitude</td><td colspan="2">4000 m (&gt;2000 m: derate)</td></tr>
    <tr><td>Communication</td><td colspan="2">Modbus-RTU, Modbus-TCP, IEC 61850, IEC 104</td></tr>
    <tr><td>Compliance</td><td colspan="2">IEC/EN 62477-1, EN IEC 61000-6-2/4, EN 50549-2, NC RfG, IEC 62116, IEC 61727</td></tr>
  </tbody>
</table>
{page_footer()}"""


def spec_mvskid_t2(is_first=False):
    pb = '' if is_first else '<div class="page-break"></div>'
    return f"""{pb}
{page_header()}
<div class="spec-title">MV SKID T2 Technical Description (20ft, 2 PCS slots)</div>
<div class="product-img-wrap"><img src="{IMG_MVSKID_T2()}" alt="MV SKID T2"><div class="caption">MV SKID T2 — 20ft container with 2× PCS + MV transformer</div></div>
<table class="spec-tbl">
  <thead><tr><th>Products</th><th>BCS2000K-C-HUD/T2</th><th>BCS2500K-C-HUD/T2</th></tr></thead>
  <tbody>
    <tr class="section-row"><td colspan="3">DC Side</td></tr>
    <tr><td>Max DC voltage</td><td colspan="2">1500 Vdc</td></tr>
    <tr><td>DC voltage range</td><td colspan="2">1000–1500 Vdc</td></tr>
    <tr><td>Max DC current</td><td>1122A × 2</td><td>1403A × 2</td></tr>
    <tr><td>Soft start</td><td colspan="2">YES</td></tr>
    <tr class="section-row"><td colspan="3">AC Output (Grid-connected)</td></tr>
    <tr><td>Rated AC output power</td><td>2000 kW</td><td>2500 kW</td></tr>
    <tr><td>Max AC output power</td><td>2500 kVA</td><td>2750 kVA</td></tr>
    <tr><td>Rated grid voltage</td><td colspan="2">690 Vac 3P3W+PE</td></tr>
    <tr><td>Max output current</td><td>1841 A</td><td>2301 A</td></tr>
    <tr><td>Power factor</td><td colspan="2">&gt;0.99 (at rated)</td></tr>
    <tr><td>Max efficiency</td><td colspan="2">99%</td></tr>
    <tr class="section-row"><td colspan="3">Transformer</td></tr>
    <tr><td>Rated power</td><td>2000 kVA</td><td>2500 kVA</td></tr>
    <tr><td>Voltage ratio</td><td colspan="2">0.69 / (6–33) kV</td></tr>
    <tr><td>Isolation</td><td colspan="2">Oil-immersed transformer</td></tr>
    <tr class="section-row"><td colspan="3">General</td></tr>
    <tr><td>Protection</td><td colspan="2">IP 55</td></tr>
    <tr><td>Operating temperature</td><td colspan="2">−35°C to 60°C (derate above 45°C)</td></tr>
    <tr><td>Dimensions</td><td colspan="2">6058 × 2896 × 2438 mm</td></tr>
    <tr><td>Weight</td><td colspan="2">&lt;13,000 / &lt;14,000 kg</td></tr>
    <tr><td>Communication</td><td colspan="2">Modbus-RTU/-TCP, IEC 61850, IEC 104; CAN</td></tr>
    <tr><td>Compliance</td><td colspan="2">IEC/EN 62477-1, EN IEC 61000-6-2/4, EN 50549-2, NC RfG</td></tr>
  </tbody>
</table>
{page_footer()}"""


def spec_mvskid_t4(is_first=False):
    pb = '' if is_first else '<div class="page-break"></div>'
    return f"""{pb}
{page_header()}
<div class="spec-title">MV SKID T4 Technical Description (40ft HC, 4 PCS slots)</div>
<div class="product-img-wrap"><img src="{IMG_MVSKID_T4()}" alt="MV SKID T4"><div class="caption">MV SKID T4 — 40ft HC container with 4× PCS + MV transformer</div></div>
<table class="spec-tbl">
  <thead><tr><th>Products</th><th>BCS4000K-C-HUD/T4</th><th>BCS5000K-C-HUD/T4</th></tr></thead>
  <tbody>
    <tr class="section-row"><td colspan="3">DC Side</td></tr>
    <tr><td>Max DC voltage</td><td colspan="2">1500 Vdc</td></tr>
    <tr><td>DC voltage range</td><td colspan="2">1000–1500 Vdc</td></tr>
    <tr><td>Max DC current</td><td>1122A × 4</td><td>1403A × 4</td></tr>
    <tr><td>Soft start</td><td colspan="2">YES</td></tr>
    <tr class="section-row"><td colspan="3">AC Output (Grid-connected)</td></tr>
    <tr><td>Rated AC output power</td><td>4000 kW</td><td>5000 kW</td></tr>
    <tr><td>Max AC output power</td><td>5000 kVA</td><td>5500 kVA</td></tr>
    <tr><td>Rated grid voltage</td><td colspan="2">690 Vac 3P3W+PE</td></tr>
    <tr><td>Power factor</td><td colspan="2">&gt;0.99 (at rated)</td></tr>
    <tr><td>Max efficiency</td><td colspan="2">99%</td></tr>
    <tr class="section-row"><td colspan="3">Transformer</td></tr>
    <tr><td>Rated power</td><td>4000 kVA</td><td>5000 kVA</td></tr>
    <tr><td>Voltage ratio</td><td colspan="2">0.69 / (6–33) kV</td></tr>
    <tr><td>Isolation</td><td colspan="2">Oil-immersed transformer</td></tr>
    <tr class="section-row"><td colspan="3">General</td></tr>
    <tr><td>Protection</td><td colspan="2">IP 55</td></tr>
    <tr><td>Operating temperature</td><td colspan="2">−35°C to 60°C (derate above 45°C)</td></tr>
    <tr><td>Dimensions</td><td colspan="2">12192 × 2896 × 2896 mm (40ft HC)</td></tr>
    <tr><td>Communication</td><td colspan="2">Modbus-RTU/-TCP, IEC 61850, IEC 104; CAN</td></tr>
    <tr><td>Compliance</td><td colspan="2">IEC/EN 62477-1, EN IEC 61000-6-2/4, EN 50549-2, NC RfG</td></tr>
  </tbody>
</table>
{page_footer()}"""


def spec_container_5mwh(is_first=False):
    pb = '' if is_first else '<div class="page-break"></div>'
    return f"""{pb}
{page_header()}
<div class="spec-title">Energy Storage Container — 5.015 MWh (20ft HC)</div>
<div class="product-img-wrap"><img src="{IMG_CONTAINER_CUT()}" alt="Container" style="max-height:170px"><div class="caption">Linyang 5.015 MWh containerised BESS — internal view</div></div>
<table class="spec-tbl">
  <thead><tr><th>Parameter</th><th>ME 5.015 MWh</th></tr></thead>
  <tbody>
    <tr><td>Cell type</td><td>EVE 3.2V / 314 Ah LFP</td></tr>
    <tr><td>Battery system config</td><td>1P104S × 4 × 12</td></tr>
    <tr><td>Capacity</td><td>5.015 MWh</td></tr>
    <tr><td>DC voltage range</td><td>1164.8 ~ 1497.6 V</td></tr>
    <tr><td>Dimensions W×D×H</td><td>6058 × 2438 × 2896 mm (20ft HC)</td></tr>
    <tr><td>Weight (w/ battery)</td><td>~41 t</td></tr>
    <tr><td>Anti-corrosion</td><td>C3</td></tr>
    <tr><td>Protection class</td><td>IP55</td></tr>
    <tr><td>Operating temp range</td><td>−30 ~ +50 °C</td></tr>
    <tr><td>Humidity</td><td>0 ~ 95 %</td></tr>
    <tr><td>Cooling</td><td>Liquid cooling</td></tr>
    <tr><td>Max altitude</td><td>≤ 2000 m</td></tr>
    <tr><td>Fire suppression</td><td>Aerosol + gas detection + ventilation; water mist (opt.)</td></tr>
    <tr><td>Communication</td><td>Modbus TCP / IEC 104 / IEC 61850</td></tr>
    <tr><td>Cycle life</td><td>8,000 cycles</td></tr>
  </tbody>
</table>
{page_footer()}"""


def spec_container_multi(is_first=False):
    """Container spec with 3.34 / 4.179 / 5.015 MWh columns (Shapiro/Poland)."""
    pb = '' if is_first else '<div class="page-break"></div>'
    return f"""{pb}
{page_header()}
<div class="spec-title">Energy Storage Container Technical Description</div>
<div class="product-img-wrap"><img src="{IMG_CONTAINER_CUT()}" alt="Container" style="max-height:170px"><div class="caption">Containerised energy storage — internal view</div></div>
<table class="spec-tbl">
  <thead><tr><th>Model</th><th>ME 4.179 MWh</th><th>ME 5.015 MWh</th></tr></thead>
  <tbody>
    <tr><td>Cell type</td><td>EVE 3.2V / 314Ah</td><td>EVE 3.2V / 314Ah</td></tr>
    <tr><td>Battery system config</td><td>1P104S × 4 × 10</td><td>1P104S × 4 × 12</td></tr>
    <tr><td>Capacity (MWh)</td><td>4.179</td><td>5.015</td></tr>
    <tr><td>DC voltage range (V)</td><td>1164.8 ~ 1497.6</td><td>1164.8 ~ 1497.6</td></tr>
    <tr><td>Dimensions W×D×H (mm)</td><td>6058 × 2438 × 2896</td><td>6058 × 2438 × 2896</td></tr>
    <tr><td>Weight w/ battery (t)</td><td>~38.5</td><td>~41</td></tr>
    <tr><td>Anti-corrosion</td><td>C3</td><td>C3</td></tr>
    <tr><td>Protection class</td><td>IP55</td><td>IP55</td></tr>
    <tr><td>Operating temp range (°C)</td><td>−30 ~ +50</td><td>−30 ~ +50</td></tr>
    <tr><td>Cooling</td><td>Liquid cooling</td><td>Liquid cooling</td></tr>
    <tr><td>Fire suppression</td><td colspan="2">Aerosol + gas detection + ventilation; water mist (opt.)</td></tr>
    <tr><td>Communication</td><td colspan="2">Modbus TCP / IEC 104 / IEC 61850</td></tr>
    <tr><td>Cycle life</td><td colspan="2">8,000 cycles</td></tr>
  </tbody>
</table>
{page_footer()}"""


def spec_cabinet(is_first=False):
    pb = '' if is_first else '<div class="page-break"></div>'
    return f"""{pb}
{page_header()}
<div class="spec-title">Battery Cabinet — 125 kW / 254 kWh</div>
<div class="product-img-wrap"><img src="{IMG_CABINET()}" alt="Cabinet" style="max-height:180px"><div class="caption">Linyang Battery Cabinet 125 kW / 254 kWh</div></div>
<table class="spec-tbl">
  <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Cell</td><td>EVE 306 Ah / 3.2V LFP</td></tr>
    <tr><td>Rated power</td><td>125 kW per cabinet</td></tr>
    <tr><td>Capacity</td><td>254 kWh per cabinet</td></tr>
    <tr><td>Pack config</td><td>1P52S / 50.92 kWh per pack</td></tr>
    <tr><td>DC voltage range</td><td>728–936 Vdc</td></tr>
    <tr><td>Cooling</td><td>Liquid cooling</td></tr>
    <tr><td>Protection</td><td>IP54</td></tr>
    <tr><td>Anti-corrosion</td><td>C5</td></tr>
    <tr><td>Dimensions</td><td>1420 × 1425 × 2250 mm</td></tr>
    <tr><td>Weight</td><td>~2.8 t per cabinet</td></tr>
    <tr><td>Cycle life</td><td>6,000 @ 90% DOD</td></tr>
  </tbody>
</table>
{page_footer()}"""


def spec_battery_pack(is_first=False):
    pb = '' if is_first else '<div class="page-break"></div>'
    return f"""{pb}
{page_header()}
<div class="spec-title">Liquid-cooled Battery Pack Technical Description</div>
<div class="product-img-wrap"><img src="{IMG_CELLPACK()}" alt="Battery Pack" style="max-height:160px"><div class="caption">Linyang BPL-Y series liquid-cooled battery pack</div></div>
<table class="spec-tbl">
  <thead><tr><th>Model</th><th>BPL-Y166.4/<br>306 2A</th><th>BPL-Y166.4/<br>314 2A</th><th>BPL-Y332.8/<br>314 2A</th></tr></thead>
  <tbody>
    <tr><td>Cell type</td><td>306 A</td><td>314 A</td><td>314 A</td></tr>
    <tr><td>Battery system config</td><td colspan="2">1P52S</td><td>1P104S</td></tr>
    <tr><td>Cell capacity (Ah)</td><td>306</td><td>314</td><td>314</td></tr>
    <tr><td>Nominal DC voltage (V)</td><td colspan="2">166.4</td><td>332.8</td></tr>
    <tr><td>Rated capacity (kWh)</td><td>50.92</td><td>52.25</td><td>104.5</td></tr>
    <tr><td>Operating temp (°C)</td><td colspan="3">Charging: 0~55 / Discharging: −20~55</td></tr>
    <tr><td>BMS balancing</td><td colspan="3">Active balancing</td></tr>
    <tr><td>Cooling</td><td colspan="3">Liquid cooling</td></tr>
    <tr><td>Efficiency</td><td colspan="3">&gt; 93%</td></tr>
    <tr><td>Dimensions W×D×H</td><td colspan="2">1140 × 790 × 251 mm</td><td>2180 × 763 × 252 mm</td></tr>
    <tr><td>Weight</td><td colspan="2">~345 kg</td><td>~690 kg</td></tr>
    <tr><td>Protection</td><td colspan="3">≤ IP67</td></tr>
    <tr><td>Cell voltage</td><td colspan="3">3.2 V</td></tr>
  </tbody>
</table>
{page_footer()}"""


# ══════════════════════════════════════════════════
# CLIENT CONFIGURATIONS
# ══════════════════════════════════════════════════

# Equipment sets — which spec pages to include
EQUIPMENT_SETS = {
    "cyprus_group": [spec_pcs, spec_mvskid_t2, spec_mvskid_t4, spec_container_5mwh, spec_battery_pack],
    "cyprus_individual": [spec_pcs, spec_mvskid_t2, spec_container_5mwh, spec_battery_pack],
    "poland_full": [spec_pcs, spec_mvskid_t2, spec_container_multi, spec_cabinet, spec_battery_pack],
}

CLIENT_CONFIGS: dict[str, dict] = {
    # Group order clients (Cyprus)
    "group-order/Group1_ABIO_Power": {"set": "cyprus_group", "label": "ABIO Power"},
    "group-order/Group2_Esperia_Energy": {"set": "cyprus_group", "label": "Esperia Energy / Galascope"},
    "group-order/Group3_Lampros_Andreadis": {"set": "cyprus_group", "label": "Lampros Andreadis"},
    "group-order/Group4_A_Kerasi": {"set": "cyprus_group", "label": "A. Kerasi"},
    "group-order/Group5_Ioannis_Karis": {"set": "cyprus_group", "label": "Ioannis Karis"},
    "group-order/Group6_Timotheos_Timotheou": {"set": "cyprus_group", "label": "Timotheos Timotheou"},
    # Individual clients (Cyprus)
    "Individual_Aeolian_Dynamics_Larnaca": {"set": "cyprus_individual", "label": "Aeolian Dynamics"},
    "Individual_Christos_Nicosia": {"set": "cyprus_individual", "label": "Christos Nicosia"},
    "Individual_Generic_7MW": {"set": "cyprus_individual", "label": "Generic 7 MW"},
    "Individual_Maltezos_Agios_Theodoros": {"set": "cyprus_individual", "label": "Maltezos"},
    "Individual_Scandinavian_Solar_Parks": {"set": "cyprus_individual", "label": "Scandinavian Solar Parks"},
    "Individual_Spanercom": {"set": "cyprus_individual", "label": "Spanercom / Anarita"},
    # Poland
    "Individual_Shapiro": {"set": "poland_full", "label": "Shapiro / MLP Poland"},
}

def build_for_client(client_key: str, cfg: dict) -> Path:
    out_dir = ROOT / "docs" / "clients" / client_key
    if not out_dir.is_dir():
        print(f"  SKIP {client_key} — folder not found", file=sys.stderr)
        return None
    out_path = out_dir / "equipment-spec-sheets.html"

    equip_set = EQUIPMENT_SETS[cfg["set"]]
    parts = [f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Equipment Spec Sheets — {cfg['label']} | Lighthief</title>
  <style>{CSS}</style>
</head>
<body>
"""]
    for i, builder in enumerate(equip_set):
        parts.append(builder(is_first=(i == 0)))

    parts.append("\n</body>\n</html>")
    html = "\n".join(parts)
    out_path.write_text(html, encoding="utf-8")
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--client", default="all", help="Client key, 'group-order', 'individual', or 'all'")
    ap.add_argument("--list", action="store_true", help="List client configs and exit")
    args = ap.parse_args()

    if args.list:
        for k, v in CLIENT_CONFIGS.items():
            print(f"  {k:50s}  set={v['set']:20s}  {v['label']}")
        return 0

    targets = {}
    if args.client == "all":
        targets = CLIENT_CONFIGS
    elif args.client == "group-order":
        targets = {k: v for k, v in CLIENT_CONFIGS.items() if k.startswith("group-order/")}
    elif args.client == "individual":
        targets = {k: v for k, v in CLIENT_CONFIGS.items() if k.startswith("Individual_")}
    elif args.client in CLIENT_CONFIGS:
        targets = {args.client: CLIENT_CONFIGS[args.client]}
    else:
        print(f"Unknown client: {args.client}. Use --list to see options.", file=sys.stderr)
        return 1

    count = 0
    for key, cfg in targets.items():
        out = build_for_client(key, cfg)
        if out:
            print(f"  [{cfg['set']:20s}] {out}")
            count += 1
    print(f"\nGenerated {count} equipment-spec-sheets.html files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
