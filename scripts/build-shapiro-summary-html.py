"""Build shapiro-bess-portfolio-summary.html matching original Linyang PDF formatting."""
from __future__ import annotations
import base64, textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "clients" / "Individual_Shapiro" / "shapiro-bess-portfolio-summary.html"

def b64(relpath: str) -> str:
    p = ROOT / relpath
    data = p.read_bytes()
    ext = p.suffix.lstrip(".").lower()
    mime = "image/png" if ext == "png" else "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(data).decode()}"

LOGO_LH = b64("public/logo/lighthief-logo.png")
LOGO_LY = b64("public/logo/linyang_logo.jpg")
LOGO_KH = b64("public/logo/kehua_logo.jpg")
IMG_CONTAINER_EXT = b64("public/images/linyang/container-exterior.jpeg")
IMG_CONTAINER_CUT = b64("public/images/linyang/container-cell-racks.jpeg")
IMG_PCS = b64("public/images/linyang/pcs-1000-1250.jpeg")
IMG_MVSKID = b64("public/images/linyang/t2-mv-skid.jpeg")
IMG_CABINET = b64("public/images/linyang/Cabinet-254-kwh.jpeg")
IMG_CELLPACK = b64("public/images/linyang/cellpack bpl y166.jpeg")

# ── Site data ──
SITES = [
    {"site":"MLP Gliwice","ref":"250/A/KT/2026","mw":"0.75","mwh":"3.34","type":"Container",
     "items":[("ME 3.34 MWh","Containerised energy storage\\nCell brand: EVE\\nNominal voltage: 1331.2 V\\nCell type: 314A\\nVoltage range: 1164.8–1497.6 Vdc\\nCooling: Liquid cooling\\nBattery type: LFP\\nProtection: IP55\\nComms: Modbus TCP/IEC104/IEC61850\\nAnti-corrosion: C3\\nCycle life: 8,000","img_container_ext","1"),
              ("Kehua PCS BCS1000K-C-HUD +\\nTransformer MV 15-33 kV (SKID)","Bidirectional converter\\nDC voltage range: 1060–1500V\\nLV side voltage: 690V\\nOperating temp: −35°C to 60°C\\nFrequency: 50Hz\\nDimensions: 735×2135×1300 mm\\nProtection: IP55","img_mvskid","1 PCS +\\n1 transformer\\n1 MW")],
     "price":"374,080.00"},
    {"site":"MLP Gliwice","ref":"250/B/KT/2026","mw":"0.75","mwh":"2.0","type":"Cabinet",
     "items":[("Cabinet 125 kW /\\n254 kWh","Battery cabinet\\nCell brand: EVE\\nRated power: 125 kW\\nCapacity: 254 kWh\\nCell type: 306 Ah / 3.2V\\nPack config: 1P52S / 50.92 kWh\\nVoltage range: 728–936 Vdc\\nCooling: Liquid cooling\\nBattery type: LFP\\nProtection: IP54\\nAnti-corrosion: C5\\nDimensions: 1420×1425×2250 mm\\nWeight: ~2.8 t\\nCycle life: 6,000 @ 90% DOD","img_cabinet","8")],
     "price":"296,000.00"},
    {"site":"MLP Lublin","ref":"250/C/KT/2026","mw":"1.0","mwh":"3.34","type":"Container",
     "items":[("ME 3.34 MWh","Containerised energy storage\\nCell: EVE 314A / LFP\\nVoltage: 1164.8–1497.6 Vdc\\nCooling: Liquid\\nProtection: IP55\\nCycle life: 8,000","img_container_ext","1"),
              ("Kehua PCS BCS1000K-C-HUD +\\nTransformer MV (SKID)","Bidirectional converter\\nDC: 1060–1500V / AC: 690V\\nTemp: −35°C to 60°C\\nProtection: IP55","img_mvskid","1 PCS +\\n1 transformer\\n1 MW")],
     "price":"374,080.00"},
    {"site":"MLP Lublin","ref":"250/D/KT/2026","mw":"1.0","mwh":"4.179","type":"Container",
     "items":[("ME 4.179 MWh","Containerised energy storage\\nCell: EVE 314A / LFP\\nVoltage: 1164.8–1497.6 Vdc\\nCooling: Liquid\\nProtection: IP55\\nCycle life: 8,000","img_container_ext","1"),
              ("Kehua PCS BCS1000K-C-HUD +\\nTransformer MV (SKID)","Bidirectional converter\\nDC: 1060–1500V / AC: 690V\\nProtection: IP55","img_mvskid","1 PCS +\\n1 transformer\\n1 MW")],
     "price":"459,690.00"},
    {"site":"MLP Poznań","ref":"250/E/KT/2026","mw":"0.75","mwh":"2.0","type":"Cabinet",
     "items":[("Cabinet 125 kW /\\n254 kWh","Battery cabinet\\nCell: EVE 306 Ah / 3.2V / LFP\\nPower: 125 kW · Capacity: 254 kWh\\nVoltage: 728–936 Vdc\\nCooling: Liquid · Protection: IP54\\nCycle life: 6,000 @ 90% DOD","img_cabinet","8")],
     "price":"296,000.00"},
    {"site":"MLP Poznań","ref":"250/F/KT/2026","mw":"1.0","mwh":"3.34","type":"Container",
     "items":[("ME 3.34 MWh","Containerised energy storage\\nCell: EVE 314A / LFP\\nProtection: IP55 · Cycle life: 8,000","img_container_ext","1"),
              ("Kehua PCS 1 MW + Transformer MV (SKID)","Bidirectional converter + MV transformer\\nDC: 1060–1500V / AC: 690V · IP55","img_mvskid","1 PCS +\\n1 transformer")],
     "price":"374,080.00"},
    {"site":"MLP Poznań West (Halls A,C,D,F)","ref":"250/G/KT/2026","mw":"1.0","mwh":"3.34","type":"Container",
     "items":[("ME 3.34 MWh","Containerised energy storage\\nCell: EVE 314A / LFP · IP55 · 8,000 cycles","img_container_ext","1"),
              ("Kehua PCS 1 MW + Transformer MV (SKID)","DC: 1060–1500V / AC: 690V · IP55","img_mvskid","1 PCS +\\n1 transformer")],
     "price":"374,080.00"},
    {"site":"MLP Poznań West (Halls A,C,D,F)","ref":"250/H/KT/2026","mw":"1.25","mwh":"5.015","type":"Container",
     "items":[("ME 5.015 MWh","Containerised energy storage\\nCell: EVE 314A / LFP · IP55 · 8,000 cycles","img_container_ext","1"),
              ("Kehua PCS 1.25 MW + Transformer MV (SKID)","DC: 1060–1500V / AC: 690V · IP55","img_mvskid","1 PCS +\\n1 transformer")],
     "price":"551,650.00"},
    {"site":"MLP Poznań West (Halls E,F)","ref":"250/I/KT/2026","mw":"0.65","mwh":"2.0","type":"Cabinet",
     "items":[("Cabinet 125 kW /\\n254 kWh","Battery cabinet · EVE 306 Ah / LFP\\n125 kW · 254 kWh · IP54 · 6,000 cycles","img_cabinet","8")],
     "price":"296,000.00"},
    {"site":"MLP Poznań West (Halls E,F)","ref":"250/J/KT/2026","mw":"0.65","mwh":"3.34","type":"Container",
     "items":[("ME 3.34 MWh","Containerised energy storage\\nCell: EVE 314A / LFP · IP55 · 8,000 cycles","img_container_ext","1"),
              ("Kehua PCS + Transformer MV (SKID)","DC: 1060–1500V / AC: 690V · IP55","img_mvskid","1 PCS +\\n1 transformer")],
     "price":"374,080.00"},
    {"site":"MLP Pruszków","ref":"250/K/KT/2026","mw":"3.0","mwh":"10.02","type":"Container",
     "items":[("ME 3.34 MWh","Containerised energy storage\\nCell: EVE 314A / LFP · IP55 · 8,000 cycles","img_container_ext","3"),
              ("Kehua PCS BCS1000K-C-HUD +\\nTransformer MV (SKID)","Bidirectional converter + MV transformer\\nDC: 1060–1500V / AC: 690V · IP55","img_mvskid","3 PCS +\\n1 transformer\\n3 MW")],
     "price":"1,122,240.00"},
    {"site":"MLP Pruszków","ref":"—","mw":"3.0","mwh":"12.537","type":"Container",
     "items":[("ME 4.179 MWh","Containerised energy storage\\nCell: EVE 314A / LFP · IP55 · 8,000 cycles","img_container_ext","3"),
              ("Kehua PCS BCS1000K-C-HUD +\\nTransformer MV (SKID)","Bidirectional converter + MV transformer\\nDC: 1060–1500V / AC: 690V · IP55","img_mvskid","3 PCS +\\n1 transformer\\n3 MW")],
     "price":None},
    {"site":"MLP Wrocław","ref":"250/M/KT/2026","mw":"0.5","mwh":"1.5","type":"Cabinet",
     "items":[("Cabinet 125 kW /\\n254 kWh","Battery cabinet · EVE 306 Ah / LFP\\n125 kW · 254 kWh · IP54 · 6,000 cycles","img_cabinet","6")],
     "price":"222,000.00"},
    {"site":"MLP Wrocław","ref":"250/N/KT/2026","mw":"0.5","mwh":"2.0","type":"Cabinet",
     "items":[("Cabinet 125 kW /\\n254 kWh","Battery cabinet · EVE 306 Ah / LFP\\n125 kW · 254 kWh · IP54 · 6,000 cycles","img_cabinet","8")],
     "price":"296,000.00"},
]

IMG_MAP = {"img_container_ext": "IMG_CONTAINER_EXT", "img_container_cut": "IMG_CONTAINER_CUT", "img_pcs": "IMG_PCS", "img_mvskid": "IMG_MVSKID", "img_cabinet": "IMG_CABINET", "img_cellpack": "IMG_CELLPACK"}

def nl(s: str) -> str:
    return s.replace("\\n", "<br>")

# ── Build HTML ──
CSS = """
    @page { size: A5; margin: 8mm 10mm; }
    @media print { .no-print { display: none; } body { padding: 0; } }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      font-size: 7.5pt; line-height: 1.4; color: #222;
      background: #fff; max-width: 148mm; margin: 0 auto; padding: 8mm 10mm;
    }
    .page-break { page-break-before: always; }
    .avoid-break { page-break-inside: avoid; }

    /* ── Page header: Lighthief left, Linyang right ── */
    .pg-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .pg-hdr img.lh { height: 24px; }
    .pg-hdr img.ly { height: 30px; }
    .gold-line { height: 2px; background: linear-gradient(90deg, #c9a84c, #e8d48b, #c9a84c); margin-bottom: 12px; }

    /* ── Spec title ── */
    .spec-title { font-size: 1.05rem; font-weight: 700; color: #222; margin: 10px 0 8px; }

    /* ── Supplier / project info ── */
    .supplier-info { font-size: 7.5pt; margin-bottom: 8px; }
    .supplier-info strong { font-size: 8pt; }
    .project-meta { font-size: 7.5pt; margin-bottom: 10px; }
    .project-meta strong { color: #222; }

    /* ── Blue-header product table (commercial offer) ── */
    .offer-tbl { width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 7pt; }
    .offer-tbl th {
      background: #1a4a7a; color: #fff; font-weight: 600; font-size: 7pt;
      padding: 5px 6px; border: 1px solid #1a4a7a; text-align: center;
    }
    .offer-tbl td { padding: 5px 6px; border: 1px solid #ccc; vertical-align: top; }
    .offer-tbl td.model { font-weight: 700; text-align: center; width: 22%; }
    .offer-tbl td.desc { font-size: 6.5pt; line-height: 1.35; width: 36%; }
    .offer-tbl td.photo { text-align: center; width: 24%; }
    .offer-tbl td.photo img { max-width: 100%; max-height: 72px; }
    .offer-tbl td.qty { text-align: center; font-weight: 700; width: 18%; }
    .offer-tbl tr:nth-child(even) td { background: #f5f8fb; }

    /* ── Price bar ── */
    .price-row { display: flex; justify-content: flex-end; align-items: center; gap: 8px;
      margin: 4px 0 8px; font-size: 8.5pt; }
    .price-row .label { color: #666; font-weight: 600; }
    .price-row .amount { font-weight: 800; font-size: 9.5pt; color: #1a4a7a; }

    /* ── Yellow callout (matching original) ── */
    .callout-yellow {
      background: #fdd835; border-radius: 3px; padding: 6px 8px;
      font-size: 6.5pt; line-height: 1.35; color: #333; margin: 6px 0 8px;
    }

    /* ── Gray footer (confidentiality) ── */
    .pg-footer {
      border-top: 1px solid #bbb; padding-top: 5px; margin-top: auto;
      font-size: 5.5pt; color: #777; line-height: 1.3;
    }
    .pg-footer strong { color: #555; }

    /* ── Blue-header spec table (datasheet pages) ── */
    .spec-tbl { width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 7pt; }
    .spec-tbl th {
      background: #1a4a7a; color: #fff; font-weight: 600; font-size: 6.5pt;
      padding: 4px 6px; border: 1px solid #1a4a7a; text-align: center;
    }
    .spec-tbl td { padding: 3px 6px; border: 1px solid #ccc; text-align: center; }
    .spec-tbl td:first-child { text-align: left; font-weight: 600; background: #f0f2f5; color: #333; width: 38%; }
    .spec-tbl tr:nth-child(even) td { background: #f8f9fb; }
    .spec-tbl tr:nth-child(even) td:first-child { background: #e8eaee; }
    .spec-tbl .section-row td {
      background: #fff !important; text-align: center; font-weight: 700;
      font-size: 7.5pt; color: #1a4a7a; border-left: none; border-right: none;
      padding: 6px 4px;
    }

    /* ── Centered product image ── */
    .product-img-wrap { text-align: center; margin: 8px 0; }
    .product-img-wrap img { max-height: 120px; }
    .product-img-wrap .caption { font-size: 6pt; color: #888; margin-top: 2px; }

    /* ── Cover extras ── */
    .cover-center { text-align: center; padding: 16px 0 10px; }
    .cover-center img { height: 40px; margin-bottom: 8px; }
    .cover-center h1 { font-size: 1.1rem; color: #1a4a7a; font-weight: 800; margin-bottom: 3px; }
    .cover-center .sub { font-size: .75rem; color: #555; }
    .cover-center .sub2 { font-size: .65rem; color: #999; margin-top: 6px; }
    .kpi-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 5px; margin: 8px 0; }
    .kpi { background: #f5f8fb; border: 1px solid #c0cfe0; border-radius: 4px; padding: 6px 3px; text-align: center; }
    .kpi .val { font-size: .95rem; font-weight: 800; color: #1a4a7a; }
    .kpi .lbl { font-size: 5.5pt; color: #666; text-transform: uppercase; letter-spacing: .3px; }

    /* ── Summary overview table ── */
    .overview-tbl { width: 100%; border-collapse: collapse; font-size: 6.5pt; margin-bottom: 6px; }
    .overview-tbl th {
      background: #1a4a7a; color: #fff; font-weight: 600; font-size: 6pt;
      padding: 3px 4px; border: 1px solid #1a4a7a; text-align: center;
    }
    .overview-tbl td { padding: 2px 4px; border: 1px solid #ccc; text-align: center; }
    .overview-tbl td:first-child { text-align: left; }
    .overview-tbl tr:nth-child(even) td { background: #f8f9fb; }
    .overview-tbl .total-row td { background: #fdf6e3 !important; font-weight: 700; }
    .tag { display: inline-block; font-size: 5pt; font-weight: 700; padding: 1px 4px; border-radius: 2px; color: #fff; }
    .tag.cab { background: #7c3aed; }
    .tag.con { background: #0369a1; }
"""

def page_header() -> str:
    return f"""<div class="pg-hdr">
  <img class="lh" src="{LOGO_LH}" alt="Lighthief">
  <img class="ly" src="{LOGO_LY}" alt="Linyang">
</div>
<div class="gold-line"></div>"""

def page_footer() -> str:
    return """<div class="pg-footer">
  <strong>Linyang address:</strong> Warsaw Vibe Office Building, ul. Towarowa 7, 00-839 Warsaw (8th floor).<br>
  This offer is confidential and constitutes a trade secret of Jiangsu Linyang Energy Storage Technology Co., Ltd
  within the meaning of Art. 11(4) of the Act of 16 April 1993 on Combating Unfair Competition.
</div>"""

def build_offer_page(s: dict, idx: int) -> str:
    img_src = {"img_container_ext": IMG_CONTAINER_EXT, "img_container_cut": IMG_CONTAINER_CUT, "img_pcs": IMG_PCS, "img_mvskid": IMG_MVSKID, "img_cabinet": IMG_CABINET, "img_cellpack": IMG_CELLPACK}
    rows = ""
    for model, desc, img_key, qty in s["items"]:
        rows += f"""      <tr>
        <td class="model">{nl(model)}</td>
        <td class="desc">{nl(desc)}</td>
        <td class="photo"><img src="{img_src[img_key]}" alt=""></td>
        <td class="qty">{nl(qty)}</td>
      </tr>\n"""

    price_html = ""
    if s["price"]:
        price_html = f"""<div class="price-row">
  <span class="label">Total in EUR</span>
  <span class="amount">{s['price']} EUR</span>
</div>"""
    else:
        price_html = '<div class="price-row"><span class="label">Total in EUR</span><span class="amount" style="color:#aaa">— technical spec only —</span></div>'

    ref_display = s["ref"] if s["ref"] != "—" else "— (tech spec only)"

    pb = '<div class="page-break"></div>' if idx > 0 else ""
    return f"""{pb}
{page_header()}
<div class="spec-title">Technical Specification {ref_display}</div>

<div class="supplier-info">
  <strong>Jiangsu Linyang Energy Storage Technology Co., Ltd</strong><br>
  F17, Bldg. D1, No.2 Mudanjiang Street, Jianye Dist, Nanjing, Jiangsu, 210004
</div>

<div class="project-meta">
  <strong>Project:</strong> {s['site']}<br>
  <strong>Power:</strong> {s['mw']} MW &nbsp;&nbsp;
  <strong>Capacity:</strong> {s['mwh']} MWh<br>
  <strong>Date of issue:</strong> 11.03.2026 &nbsp;&nbsp;
  <strong>Valid for:</strong> 14 days
</div>

<table class="offer-tbl">
  <thead><tr><th>Model</th><th>Description</th><th>Photo</th><th>Quantity</th></tr></thead>
  <tbody>
{rows}  </tbody>
</table>

{price_html}

<div class="callout-yellow">
  <strong>Note:</strong> System power and capacity indicated in this technical specification may differ from the values in the
  commercial offer. The difference is solely due to technological limitations of available BESS system configurations
  and does not affect the contract price.
</div>

{page_footer()}
"""


def build_spec_page_pcs() -> str:
    return f"""<div class="page-break"></div>
{page_header()}
<div class="spec-title">PCS Technical Description (Power Conversion System)</div>

<div class="product-img-wrap">
  <img src="{IMG_PCS}" alt="PCS" style="max-height:130px">
  <div class="caption">PCS reference image — Kehua BCS1000K / BCS1250K</div>
</div>

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
    <tr><td>Grid voltage range</td><td>−15% ~ +10%</td><td>−15% ~ +10%</td></tr>
    <tr><td>Grid frequency range</td><td>50 Hz</td><td>50 Hz</td></tr>
    <tr><td>Max output current</td><td>920 A</td><td>1151 A</td></tr>
    <tr><td>Power factor</td><td>&gt;0.99 (at rated)</td><td>&gt;0.99 (at rated)</td></tr>
    <tr><td>Adjustable power factor</td><td>1 (leading) ~ 1 (lagging)</td><td>1 (leading) ~ 1 (lagging)</td></tr>
    <tr><td>THDi</td><td>&lt;3% (at rated)</td><td>&lt;3% (at rated)</td></tr>
    <tr class="section-row"><td colspan="3">PCS Efficiency</td></tr>
    <tr><td>Max efficiency</td><td>99%</td><td>99%</td></tr>
    <tr class="section-row"><td colspan="3">General</td></tr>
    <tr><td>Isolation mode</td><td>None</td><td>None</td></tr>
    <tr><td>IP protection class</td><td>IP 55</td><td>IP 55</td></tr>
    <tr><td>Operating temperature</td><td colspan="2">−35°C to 60°C (derate above 45°C)</td></tr>
    <tr><td>Relative humidity</td><td colspan="2">0–100% (non-condensing)</td></tr>
    <tr><td>Cooling</td><td colspan="2">Intelligent air cooling</td></tr>
    <tr><td>Dimensions (W×H×D)</td><td colspan="2">735 × 2135 × 1300 mm</td></tr>
    <tr><td>Weight</td><td colspan="2">1500 kg</td></tr>
    <tr><td>Altitude</td><td colspan="2">4000 m (&gt;2000 m: derate)</td></tr>
    <tr><td>Display</td><td colspan="2">Touchscreen (optional)</td></tr>
    <tr><td>Communication protocol</td><td colspan="2">Modbus-RTU, Modbus-TCP, IEC 61850, IEC 104</td></tr>
    <tr><td>Communication interface</td><td colspan="2">RS485, Ethernet</td></tr>
    <tr><td>Compliance</td><td colspan="2">IEC/EN 62477-1, EN IEC 61000-6-2/4, EN 50549-2, NC RfG, IEC 62116, IEC 61727</td></tr>
  </tbody>
</table>

{page_footer()}
"""


def build_spec_page_mvskid() -> str:
    return f"""<div class="page-break"></div>
{page_header()}
<div class="spec-title">MV SKID Technical Description</div>

<div class="product-img-wrap">
  <img src="{IMG_MVSKID}" alt="MV SKID">
  <div class="caption">MV SKID reference image</div>
</div>

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
    <tr><td>Grid voltage range</td><td colspan="2">−15% ~ +10%</td></tr>
    <tr><td>Grid frequency range</td><td colspan="2">50 Hz / 60 Hz</td></tr>
    <tr><td>Max output current</td><td>1841 A</td><td>2301 A</td></tr>
    <tr><td>Power factor</td><td colspan="2">&gt;0.99 (at rated power)</td></tr>
    <tr><td>Adjustable power factor</td><td colspan="2">1 (leading) ~ 1 (lagging)</td></tr>
    <tr><td>THDi</td><td colspan="2">&lt;3% (at rated power)</td></tr>
    <tr class="section-row"><td colspan="3">PCS Efficiency</td></tr>
    <tr><td>Max efficiency</td><td colspan="2">99%</td></tr>
    <tr class="section-row"><td colspan="3">Transformer</td></tr>
    <tr><td>Rated power</td><td>2000 kVA</td><td>2500 kVA</td></tr>
    <tr><td>Voltage transformation ratio</td><td colspan="2">0.69 / (6–33) kV</td></tr>
    <tr><td>Isolation mode</td><td colspan="2">Oil-immersed transformer</td></tr>
    <tr class="section-row"><td colspan="3">General</td></tr>
    <tr><td>IP protection class</td><td colspan="2">IP 55</td></tr>
    <tr><td>Operating temperature</td><td colspan="2">−35°C to 60°C (derate above 45°C)</td></tr>
    <tr><td>Relative humidity</td><td colspan="2">0–100% (non-condensing)</td></tr>
    <tr><td>Cooling</td><td colspan="2">Intelligent air cooling</td></tr>
    <tr><td>Dimensions (W×H×D)</td><td colspan="2">6058 × 2896 × 2438 mm</td></tr>
    <tr><td>Weight</td><td colspan="2">&lt;13,000 kg / &lt;14,000 kg</td></tr>
    <tr><td>Altitude</td><td colspan="2">2000 m (&gt;1000 m: derate)</td></tr>
    <tr><td>Display</td><td colspan="2">LED</td></tr>
    <tr><td>Communication protocol</td><td colspan="2">Modbus-RTU, Modbus-TCP, IEC 61850, IEC 104</td></tr>
    <tr><td>Communication interface</td><td colspan="2">RS485, Ethernet, CAN</td></tr>
    <tr><td>Compliance</td><td colspan="2">IEC/EN 62477-1, EN IEC 61000-6-2/4, EN 50549-2, NC RfG, IEC 62116, IEC 61727</td></tr>
  </tbody>
</table>

{page_footer()}
"""


def build_spec_page_container() -> str:
    return f"""<div class="page-break"></div>
{page_header()}
<div class="spec-title">Energy Storage Container Technical Description</div>

<div class="product-img-wrap">
  <img src="{IMG_CONTAINER_CUT}" alt="Container" style="max-height:110px">
  <div class="caption">Containerised energy storage reference image</div>
</div>

<table class="spec-tbl">
  <thead><tr><th>Model</th><th>ME 4.179 MWh</th><th>ME 5.015 MWh</th></tr></thead>
  <tbody>
    <tr><td>Cell type</td><td>EVE 3.2V / 314Ah</td><td>EVE 3.2V / 314Ah</td></tr>
    <tr><td>Battery system config</td><td>1P104S × 4 × 10</td><td>1P104S × 4 × 12</td></tr>
    <tr><td>Cell capacity (MWh)</td><td>4.179</td><td>5.015</td></tr>
    <tr><td>DC voltage range (V)</td><td>1164.8 ~ 1497.6</td><td>1164.8 ~ 1497.6</td></tr>
    <tr><td>Dimensions W×D×H (mm)</td><td>6058 × 2438 × 2896</td><td>6058 × 2438 × 2896</td></tr>
    <tr><td>Weight w/ battery (t)</td><td>~38.5</td><td>~41</td></tr>
    <tr><td>Anti-corrosion</td><td>C3</td><td>C3</td></tr>
    <tr><td>Protection class</td><td>IP55</td><td>IP55</td></tr>
    <tr><td>Operating temp range (°C)</td><td>−30 ~ +50</td><td>−30 ~ +50</td></tr>
    <tr><td>Relative humidity (%)</td><td>0 ~ 95</td><td>0 ~ 95</td></tr>
    <tr><td>Cooling — battery chamber</td><td>Liquid cooling</td><td>Liquid cooling</td></tr>
    <tr><td>Max operating altitude (m)</td><td>≤ 2000</td><td>≤ 2000</td></tr>
    <tr><td>Operating environment</td><td>Outdoor (container)</td><td>Outdoor (container)</td></tr>
    <tr><td>Fire suppression</td><td colspan="2">Aerosol, flammable gas detection + ventilation, water mist (optional)</td></tr>
    <tr><td>System communication</td><td colspan="2">Modbus TCP / IEC 104 / IEC 61850</td></tr>
  </tbody>
</table>

{page_footer()}
"""


def build_spec_page_pack() -> str:
    return f"""<div class="page-break"></div>
{page_header()}
<div class="spec-title">Liquid-cooled Battery Pack Technical Description</div>

<div class="product-img-wrap">
  <img src="{IMG_CELLPACK}" alt="Battery Pack" style="max-height:100px">
  <div class="caption">Battery pack reference image</div>
</div>

<table class="spec-tbl">
  <thead><tr><th>Model</th><th>BPL-Y166.4/<br>306 2A</th><th>BPL-Y166.4/<br>314 2A</th><th>BPL-Y332.8/<br>314 2A</th></tr></thead>
  <tbody>
    <tr><td>Cell type</td><td>306 A</td><td>314 A</td><td>314 A</td></tr>
    <tr><td>Battery system config</td><td colspan="2">1P52S</td><td>1P104S</td></tr>
    <tr><td>Cell capacity (Ah)</td><td>306</td><td>314</td><td>314</td></tr>
    <tr><td>Nominal DC voltage (V)</td><td colspan="2">166.4</td><td>332.8</td></tr>
    <tr><td>Rated capacity (kWh)</td><td>50.92</td><td>52.25</td><td>104.5</td></tr>
    <tr><td>Operating temp range (°C)</td><td colspan="3">Charging: 0 ~ 55 / Discharging: −20 ~ 55</td></tr>
    <tr><td>BMS balancing mode</td><td colspan="3">Active balancing</td></tr>
    <tr><td>Battery chamber cooling</td><td colspan="3">Liquid cooling</td></tr>
    <tr><td>Efficiency (%)</td><td colspan="3">&gt; 93</td></tr>
    <tr><td>Dimensions W×D×H (mm)</td><td colspan="2">1140 × 790 × 250.5</td><td>2180 × 762.5 × 252</td></tr>
    <tr><td>Weight (kg)</td><td colspan="2">~345</td><td>~690</td></tr>
    <tr><td>Protection class</td><td colspan="3">≤ IP67</td></tr>
    <tr><td>Cell material</td><td colspan="3">LFP</td></tr>
    <tr><td>Rated cell capacity (Ah)</td><td>306</td><td>314</td><td>314</td></tr>
    <tr><td>Rated cell voltage (V)</td><td colspan="3">3.2</td></tr>
    <tr><td>Cell weight (kg)</td><td>~5.6</td><td colspan="2">~5.62</td></tr>
  </tbody>
</table>

{page_footer()}
"""


def build_cover() -> str:
    return f"""{page_header()}
<div class="cover-center">
  <img src="{LOGO_LH}" alt="Lighthief">
  <h1>Shapiro / MLP Portfolio</h1>
  <div class="sub">BESS Technical Specifications &amp; Pricing Summary</div>
  <div class="sub">14 Linyang Offers — 7 MLP Logistics Sites, Poland</div>
  <div class="sub2">Offers issued 11 March 2026 · Lighthief Sp. z o.o. · OEM: Jiangsu Linyang Energy Storage Technology</div>
</div>

<div class="kpi-row">
  <div class="kpi"><div class="val">7</div><div class="lbl">MLP Sites</div></div>
  <div class="kpi"><div class="val">14</div><div class="lbl">Offer Variants</div></div>
  <div class="kpi"><div class="val">0.5–3</div><div class="lbl">MW Range</div></div>
  <div class="kpi"><div class="val">1.5–12.5</div><div class="lbl">MWh Range</div></div>
</div>

<table class="overview-tbl">
  <thead><tr><th>Site</th><th>MW</th><th>MWh</th><th>Type</th><th>Ref.</th><th>EUR</th></tr></thead>
  <tbody>
    <tr><td>MLP Gliwice</td><td>0.75</td><td>2.0</td><td><span class="tag cab">Cab</span></td><td>250/B</td><td>296,000</td></tr>
    <tr><td>MLP Gliwice</td><td>0.75</td><td>3.34</td><td><span class="tag con">Con</span></td><td>250/A</td><td>374,080</td></tr>
    <tr><td>MLP Lublin</td><td>1.0</td><td>3.34</td><td><span class="tag con">Con</span></td><td>250/C</td><td>374,080</td></tr>
    <tr><td>MLP Lublin</td><td>1.0</td><td>4.179</td><td><span class="tag con">Con</span></td><td>250/D</td><td>459,690</td></tr>
    <tr><td>MLP Poznań</td><td>0.75</td><td>2.0</td><td><span class="tag cab">Cab</span></td><td>250/E</td><td>296,000</td></tr>
    <tr><td>MLP Poznań</td><td>1.0</td><td>3.34</td><td><span class="tag con">Con</span></td><td>250/F</td><td>374,080</td></tr>
    <tr><td>MLP Pzn W. ACDF</td><td>1.25</td><td>5.015</td><td><span class="tag con">Con</span></td><td>250/H</td><td>551,650</td></tr>
    <tr><td>MLP Pzn W. ACDF</td><td>1.0</td><td>3.34</td><td><span class="tag con">Con</span></td><td>250/G</td><td>374,080</td></tr>
    <tr><td>MLP Pzn W. EF</td><td>0.65</td><td>2.0</td><td><span class="tag cab">Cab</span></td><td>250/I</td><td>296,000</td></tr>
    <tr><td>MLP Pzn W. EF</td><td>0.65</td><td>3.34</td><td><span class="tag con">Con</span></td><td>250/J</td><td>374,080</td></tr>
    <tr><td>MLP Pruszków</td><td>3.0</td><td>10.02</td><td><span class="tag con">Con</span></td><td>250/K</td><td>1,122,240</td></tr>
    <tr><td>MLP Pruszków</td><td>3.0</td><td>12.537</td><td><span class="tag con">Con</span></td><td>—</td><td style="color:#aaa">n/a</td></tr>
    <tr><td>MLP Wrocław</td><td>0.5</td><td>1.5</td><td><span class="tag cab">Cab</span></td><td>250/M</td><td>222,000</td></tr>
    <tr><td>MLP Wrocław</td><td>0.5</td><td>2.0</td><td><span class="tag cab">Cab</span></td><td>250/N</td><td>296,000</td></tr>
    <tr class="total-row"><td colspan="5" style="text-align:right">Total (13 priced)</td><td>5,409,980</td></tr>
  </tbody>
</table>

{page_footer()}
"""


# ── Assemble ──
parts = [f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shapiro / MLP — BESS Portfolio Summary</title>
  <style>{CSS}</style>
</head>
<body>
"""]

parts.append(build_cover())

for i, s in enumerate(SITES):
    parts.append(build_offer_page(s, i + 1))

parts.append(build_spec_page_pcs())
parts.append(build_spec_page_mvskid())
parts.append(build_spec_page_container())
parts.append(build_spec_page_pack())

parts.append("\n</body>\n</html>")
html = "\n".join(parts)
OUT.write_text(html, encoding="utf-8")
print(f"Wrote {OUT} ({len(html):,} chars)")
