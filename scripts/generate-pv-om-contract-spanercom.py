"""
Generate PV O&M Contract — Spanercom Ltd (Anarita East & West Parks)
Output: docs/clients/Individual_Spanercom/contracts/
        PV-OM-Contract-Spanercom-Anarita-2x5MW-apr2026.docx

Parks:   2 × 5.01 MWp (Anarita East + West), Paphos District, Cyprus
Price:   €56,700 / MW / year  →  €283,500 / park / year  →  €567,000 / year total
Cleaning: 2 × per year (spring + autumn)
Guarantee: 99% Availability with performance penalty schedule
"""

from docx import Document
from docx.shared import Pt, RGBColor, Cm, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import os
from datetime import date

# ── Brand colours ─────────────────────────────────────────────────────────────
NAVY      = RGBColor(0x1A, 0x36, 0x5D)
GOLD      = RGBColor(0xC9, 0xA4, 0x32)
WHITE     = RGBColor(0xFF, 0xFF, 0xFF)
BLACK     = RGBColor(0x00, 0x00, 0x00)
GREY      = RGBColor(0x40, 0x40, 0x40)
NAVY_HEX  = "1A365D"
GOLD_HEX  = "C9A432"
LIGHT_HEX = "EBF0F7"
ALT_HEX   = "F5F7FA"

# ── Contract data ─────────────────────────────────────────────────────────────
CONTRACT = {
    "ref":           "LH-OM-SPANERCOM-2026-001",
    "date":          "23 April 2026",
    "effective_date":"1 July 2026",
    "term_years":    2,
    "client": {
        "name":    "Spanercom Ltd",
        "contact": "Muminjon",
        "address": "Anarita, Paphos District, Republic of Cyprus",
    },
    "provider": {
        "name":    "Lighthief Cyprus Ltd",
        "contact": "Alexander Papacosta",
        "title":   "Cyprus Director",
        "address": "Republic of Cyprus",
        "reg":     "HE [·]",
    },
    "parks": [
        {"name": "Anarita East Park",  "dc_mwp": 5.01, "ac_mw": 5.0, "location": "Anarita, Paphos District"},
        {"name": "Anarita West Park",  "dc_mwp": 5.01, "ac_mw": 5.0, "location": "Anarita, Paphos District"},
    ],
    "price_per_mw_yr": 56_700,
    "mw_per_park":     5.0,
    "parks_count":     2,
    "cleanings_per_yr":2,
    "availability_guarantee_pct": 99.0,
}

PRICE_PER_PARK = CONTRACT["price_per_mw_yr"] * CONTRACT["mw_per_park"]
PRICE_TOTAL    = PRICE_PER_PARK * CONTRACT["parks_count"]

# ── Output path ───────────────────────────────────────────────────────────────
OUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "docs", "clients",
                        "Individual_Spanercom", "contracts")
OUT_FILE = os.path.join(OUT_DIR, "PV-OM-Contract-Spanercom-Anarita-2x5MW-apr2026.docx")
os.makedirs(OUT_DIR, exist_ok=True)

# ── Helpers ───────────────────────────────────────────────────────────────────
def set_cell_bg(cell, hex_color: str):
    tc   = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  hex_color)
    tcPr.append(shd)

def set_cell_borders(cell, top=None, bottom=None, left=None, right=None):
    tc   = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for side, val in [("top", top), ("bottom", bottom),
                      ("left", left), ("right", right)]:
        if val:
            el = OxmlElement(f"w:{ side }")
            el.set(qn("w:val"),   val.get("val",   "single"))
            el.set(qn("w:sz"),    val.get("sz",    "4"))
            el.set(qn("w:space"), val.get("space", "0"))
            el.set(qn("w:color"), val.get("color", "auto"))
            tcBorders.append(el)
    tcPr.append(tcBorders)

def fmt(p, text, bold=False, italic=False, size=11,
        color=BLACK, align=WD_ALIGN_PARAGRAPH.LEFT):
    run = p.add_run(text)
    run.bold  = bold
    run.italic = italic
    run.font.size  = Pt(size)
    run.font.color.rgb = color
    p.alignment = align
    return run

def add_paragraph(doc, text="", bold=False, italic=False, size=11,
                  color=BLACK, align=WD_ALIGN_PARAGRAPH.LEFT,
                  space_before=0, space_after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after  = Pt(space_after)
    if text:
        fmt(p, text, bold=bold, italic=italic, size=size, color=color, align=align)
    return p

def add_heading(doc, text, level=1):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14 if level == 1 else 10)
    p.paragraph_format.space_after  = Pt(4)
    size  = 14 if level == 1 else 12
    color = GOLD
    fmt(p, text, bold=True, size=size, color=color)
    # underline thin rule via bottom border on the paragraph
    pPr  = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bot  = OxmlElement("w:bottom")
    bot.set(qn("w:val"),   "single")
    bot.set(qn("w:sz"),    "4")
    bot.set(qn("w:space"), "1")
    bot.set(qn("w:color"), GOLD_HEX if level == 1 else NAVY_HEX)
    pBdr.append(bot)
    pPr.append(pBdr)
    return p

def add_bullet(doc, text, indent_level=0, bold_prefix=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.left_indent  = Cm(0.5 + indent_level * 0.6)
    p.paragraph_format.space_after  = Pt(3)
    if bold_prefix:
        r = p.add_run(bold_prefix)
        r.bold = True
        r.font.size  = Pt(10.5)
        r.font.color.rgb = BLACK
        r2 = p.add_run(text)
        r2.font.size  = Pt(10.5)
        r2.font.color.rgb = BLACK
    else:
        r = p.add_run(text)
        r.font.size  = Pt(10.5)
        r.font.color.rgb = BLACK
    return p

def add_numbered(doc, text, bold_prefix=None):
    p = doc.add_paragraph(style="List Number")
    p.paragraph_format.left_indent  = Cm(0.5)
    p.paragraph_format.space_after  = Pt(3)
    if bold_prefix:
        r = p.add_run(bold_prefix)
        r.bold = True
        r.font.size  = Pt(10.5)
        r.font.color.rgb = BLACK
        r2 = p.add_run(text)
        r2.font.size  = Pt(10.5)
        r2.font.color.rgb = BLACK
    else:
        r = p.add_run(text)
        r.font.size  = Pt(10.5)
        r.font.color.rgb = BLACK
    return p

def add_table_row(table, cells_data, header=False, alt=False):
    """cells_data: list of (text, width_cm, align, bold)"""
    row = table.add_row()
    for i, (text, width, align_str, bold) in enumerate(cells_data):
        cell = row.cells[i]
        cell.width = Cm(width)
        if header:
            set_cell_bg(cell, NAVY_HEX)
        elif alt:
            set_cell_bg(cell, ALT_HEX)
        p   = cell.paragraphs[0]
        run = p.add_run(text)
        run.bold = bold or header
        run.font.size  = Pt(9.5)
        run.font.color.rgb = WHITE if header else BLACK
        if align_str == "C":
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        elif align_str == "R":
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        else:
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after  = Pt(2)

def set_col_widths(table, widths_cm):
    for i, w in enumerate(widths_cm):
        for row in table.rows:
            row.cells[i].width = Cm(w)

# ── Page setup ────────────────────────────────────────────────────────────────
doc = Document()
section = doc.sections[0]
section.page_width   = Cm(21)
section.page_height  = Cm(29.7)
section.left_margin  = Cm(2.5)
section.right_margin = Cm(2.5)
section.top_margin   = Cm(2.0)
section.bottom_margin= Cm(2.0)

# ── Default style ─────────────────────────────────────────────────────────────
style = doc.styles["Normal"]
style.font.name  = "Calibri"
style.font.size  = Pt(11)
style.font.color.rgb = BLACK

# ══════════════════════════════════════════════════════════════════════════════
# COVER / HEADER BLOCK
# ══════════════════════════════════════════════════════════════════════════════
# Navy header bar via a single-cell table
hdr_table = doc.add_table(rows=1, cols=1)
hdr_table.alignment = WD_TABLE_ALIGNMENT.CENTER
hdr_cell = hdr_table.rows[0].cells[0]
hdr_cell.width = Cm(16)
set_cell_bg(hdr_cell, NAVY_HEX)

p = hdr_cell.paragraphs[0]
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_before = Pt(12)
p.paragraph_format.space_after  = Pt(4)
r = p.add_run("LIGHTHIEF CYPRUS LTD")
r.bold = True; r.font.size = Pt(15); r.font.color.rgb = WHITE

p2 = hdr_cell.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
p2.paragraph_format.space_after = Pt(12)
r2 = p2.add_run("Photovoltaic Operation & Maintenance Services Agreement")
r2.bold = True; r2.font.size = Pt(12); r2.font.color.rgb = GOLD

doc.add_paragraph()

# Reference block
ref_table = doc.add_table(rows=3, cols=2)
ref_table.alignment = WD_TABLE_ALIGNMENT.LEFT
ref_data = [
    ("Contract Reference:", CONTRACT["ref"]),
    ("Date:",               CONTRACT["date"]),
    ("Effective Date:",     CONTRACT["effective_date"]),
]
for i, (label, value) in enumerate(ref_data):
    row = ref_table.rows[i]
    c0, c1 = row.cells[0], row.cells[1]
    c0.width = Cm(5); c1.width = Cm(11)
    lp = c0.paragraphs[0]
    lr = lp.add_run(label)
    lr.bold = True; lr.font.size = Pt(10); lr.font.color.rgb = GREY
    vp = c1.paragraphs[0]
    vr = vp.add_run(value)
    vr.font.size = Pt(10); vr.font.color.rgb = BLACK

doc.add_paragraph()

# ── Parties block ─────────────────────────────────────────────────────────────
parties_table = doc.add_table(rows=1, cols=2)
parties_table.alignment = WD_TABLE_ALIGNMENT.LEFT

for i, (role, party_key) in enumerate([("SERVICE PROVIDER", "provider"), ("CLIENT", "client")]):
    cell = parties_table.rows[0].cells[i]
    cell.width = Cm(8)
    set_cell_bg(cell, LIGHT_HEX)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after  = Pt(2)
    r = p.add_run(role)
    r.bold = True; r.font.size = Pt(9); r.font.color.rgb = NAVY

    party = CONTRACT[party_key]
    for line in [party["name"], party.get("contact",""), party["address"]]:
        if line:
            lp = cell.add_paragraph()
            lp.paragraph_format.space_after = Pt(1)
            lr = lp.add_run(line)
            lr.font.size = Pt(9.5); lr.font.color.rgb = BLACK
    ep = cell.add_paragraph()
    ep.paragraph_format.space_after = Pt(6)

doc.add_paragraph()

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 1 — DEFINITIONS
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 1 — Definitions", level=1)
add_paragraph(doc,
    "In this Agreement, the following terms shall have the meanings set out below:",
    size=10.5, space_after=6)

definitions = [
    ('"Agreement"',          'this Photovoltaic Operation & Maintenance Services Agreement, including all Schedules and Annexes.'),
    ('"Availability"',       'the ratio (expressed as a percentage) of hours in a measurement period during which each Park\'s AC output is capable of meeting its rated capacity, excluding Excused Downtime.'),
    ('"Availability Guarantee"', f'{CONTRACT["availability_guarantee_pct"]}% measured on an annual rolling basis per Park.'),
    ('"Commencement Date"',  f'the Effective Date of this Agreement, being {CONTRACT["effective_date"]}.'),
    ('"Contract Year"',      'each consecutive twelve (12) month period commencing on the Commencement Date.'),
    ('"Excused Downtime"',   'downtime caused by: (i) Force Majeure events; (ii) Client-instructed shutdowns; (iii) grid outages beyond the Substation; (iv) any defect or failure in equipment not maintained under this Agreement; (v) planned maintenance windows pre-agreed in writing.'),
    ('"Fault Response Time"','the elapsed time from Service Provider\'s receipt of a fault notification to commencement of active remediation.'),
    ('"Parks"',              'collectively, the Anarita East Park (5.01 MWp / 5 MW AC) and the Anarita West Park (5.01 MWp / 5 MW AC), both located at Anarita, Paphos District, Republic of Cyprus.'),
    ('"Performance Ratio"',  'the ratio of the measured specific energy yield (kWh/kWp) to the theoretically achievable yield, calculated per IEC 61724-1.'),
    ('"Preventive Maintenance"', 'all scheduled maintenance activities carried out in accordance with the Maintenance Plan set out in Schedule A.'),
    ('"Corrective Maintenance"', 'all unscheduled maintenance activities required to restore the Parks to their normal operating condition following a fault or failure.'),
    ('"SCADA"',              'the supervisory control and data acquisition system monitoring the Parks.'),
    ('"Service Fee"',        f'the annual remuneration payable to the Service Provider as set out in Article 9.'),
]
for term, defn in definitions:
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.left_indent  = Cm(0.5)
    p.paragraph_format.space_after  = Pt(3)
    r1 = p.add_run(term + "  ")
    r1.bold = True; r1.font.size = Pt(10); r1.font.color.rgb = NAVY
    r2 = p.add_run(defn)
    r2.font.size = Pt(10); r2.font.color.rgb = BLACK

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 2 — SCOPE OF SERVICES
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 2 — Scope of Services", level=1)
add_paragraph(doc,
    "The Service Provider shall provide the following Operation & Maintenance services "
    "for both Parks throughout the Term of this Agreement:",
    size=10.5, space_after=6)

add_heading(doc, "2.1  Preventive Maintenance", level=2)
add_paragraph(doc,
    "The Service Provider shall perform a minimum of two (2) full preventive maintenance "
    "visits per Park per Contract Year, scheduled in spring (March–April) and autumn "
    "(September–October), unless otherwise agreed in writing. Each visit shall include:",
    size=10.5, space_after=4)

prev_items = [
    "Full visual inspection of all PV modules, mounting structures, cables, connectors, and junction boxes.",
    "Thermal infrared (IR) thermography of all PV strings and modules to detect hot-spot defects and soiling anomalies.",
    "IV-curve testing on a representative sample (minimum 10% of strings per Park) using a calibrated IV curve tracer.",
    "Inspection and testing of all DC isolators, string fuses, and surge protection devices (SPDs).",
    "Inverter inspection: firmware version verification, fault log review, cooling system cleaning, filter replacement.",
    "MV/LV switchgear visual inspection, torque verification of busbar connections, and interlock functional testing.",
    "Meteorological station calibration check and irradiance sensor cleaning.",
    "Fence integrity, gate locks, CCTV, and perimeter security inspection.",
    "Earthing and lightning protection continuity check.",
    "Vegetation management: grass cutting and weed control within 0.5 m of all mounting structures and cable routes.",
    "Compilation of a written visit report with photographic evidence, fault register update, and recommended actions.",
]
for item in prev_items:
    add_bullet(doc, item)

add_heading(doc, "2.2  Panel Cleaning", level=2)
add_paragraph(doc,
    f"The Service Provider shall perform two (2) professional PV module cleaning sessions "
    f"per Park per Contract Year (once per preventive maintenance visit). Cleaning shall comply "
    f"with IEC TS 62788 and module manufacturer guidelines, using deionised or approved water "
    f"and soft-brush equipment. No abrasive agents or high-pressure jets above 40 bar shall be used. "
    f"Post-cleaning irradiance-normalised energy output shall be recorded for performance benchmarking.",
    size=10.5, space_after=6)

add_heading(doc, "2.3  Corrective Maintenance", level=2)
add_paragraph(doc,
    "The Service Provider shall provide corrective maintenance response as follows:",
    size=10.5, space_after=4)

response_items = [
    ("Critical fault (total Park shutdown, >50 kW loss): ",
     "on-site response within 4 hours of notification; restoration target 24 hours."),
    ("Major fault (>10% capacity loss, inverter failure, MV fault): ",
     "on-site response within 8 hours; restoration target 48 hours."),
    ("Minor fault (string failure, sensor fault, communication loss): ",
     "on-site response within 24 hours; resolution within 5 business days."),
    ("Cosmetic / administrative fault: ",
     "addressed at next scheduled preventive maintenance visit."),
]
for bold_part, text_part in response_items:
    add_bullet(doc, text_part, bold_prefix=bold_part)

add_heading(doc, "2.4  SCADA / Performance Monitoring", level=2)
monitoring_items = [
    "24/7 remote monitoring of both Parks via SCADA with automatic alarm notification to the Service Provider's operations centre.",
    "Monthly performance report issued within 10 business days of month-end, covering: energy yield (MWh), specific yield (kWh/kWp), Performance Ratio (PR), Availability, fault log, and cleaning records.",
    "Quarterly trend analysis identifying degradation, soiling losses, and inverter performance deviations.",
    "Annual performance summary report with year-on-year comparison and maintenance recommendations.",
    "Immediate notification to Client for any fault or event causing >5% instantaneous capacity loss.",
]
for item in monitoring_items:
    add_bullet(doc, item)

add_heading(doc, "2.5  Electrical Safety & Compliance Inspections", level=2)
compliance_items = [
    "Annual insulation resistance (IR) testing of all DC and AC cabling per IEC 62446-1.",
    "Annual earth continuity testing and earth fault loop impedance measurement.",
    "Biennial full IV-curve testing of all strings.",
    "Maintenance of electrical safety records and asset register in compliance with Cyprus Electricity Authority (EAC) requirements.",
    "Coordination with the EAC for any grid-related inspections or connection tests.",
]
for item in compliance_items:
    add_bullet(doc, item)

add_heading(doc, "2.6  Vegetation & Civil Maintenance", level=2)
civil_items = [
    "Minimum four (4) grass-cutting and vegetation control sessions per Park per Contract Year (spring, early summer, late summer, autumn).",
    "Inspection of civil foundations, cable ducting, and drainage systems; reporting of defects to Client.",
    "Post-storm site inspection within 48 hours of any storm event with wind speeds exceeding 80 km/h.",
    "Minor civil repairs (sealing of cable duct penetrations, fence post re-setting) up to €500 per incident included; larger works quoted separately.",
]
for item in civil_items:
    add_bullet(doc, item)

add_heading(doc, "2.7  Spare Parts & Consumables", level=2)
add_paragraph(doc,
    "The Service Provider shall maintain an on-island spare parts inventory covering: "
    "string fuse elements, DC SPDs, AC SPDs, inverter air filters, connector caps, "
    "and cable termination materials. Replacement of these consumable items during "
    "Preventive or Corrective Maintenance visits is included in the Service Fee. "
    "Major components (inverters, transformers, modules) are excluded and quoted separately.",
    size=10.5, space_after=6)

add_heading(doc, "2.8  Health, Safety & Environmental (HSE)", level=2)
hse_items = [
    "All works to be performed in compliance with the Cyprus Safety and Health at Work Law (89(I)/1996) and all applicable EU Directives.",
    "Service Provider to maintain a site-specific HSE Plan and Method Statements for all planned activities.",
    "Toolbox talks to be documented prior to each site visit.",
    "Environmental management: collection and licensed disposal of all waste materials including failed modules, oils, and packaging.",
]
for item in hse_items:
    add_bullet(doc, item)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 3 — AVAILABILITY GUARANTEE & PERFORMANCE PENALTIES
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 3 — Availability Guarantee & Performance Penalties", level=1)

add_heading(doc, "3.1  Availability Guarantee", level=2)
add_paragraph(doc,
    f"The Service Provider guarantees a minimum Availability of "
    f"{CONTRACT['availability_guarantee_pct']}% for each Park, measured annually per "
    f"Contract Year. Availability is calculated as:",
    size=10.5, space_after=4)

p = doc.add_paragraph()
p.paragraph_format.left_indent  = Cm(1.5)
p.paragraph_format.space_after  = Pt(6)
r = p.add_run("Availability (%) = [(Total Hours − Unavailable Hours − Excused Downtime Hours) / "
              "(Total Hours − Excused Downtime Hours)] × 100")
r.bold = True; r.italic = True; r.font.size = Pt(10.5); r.font.color.rgb = NAVY

add_heading(doc, "3.2  Availability Penalty Schedule", level=2)
add_paragraph(doc,
    "Where the measured annual Availability falls below the guaranteed 99%, the following "
    "liquidated damages shall be payable by the Service Provider to the Client within "
    "30 days of the end of the relevant Contract Year:",
    size=10.5, space_after=6)

pen_table = doc.add_table(rows=1, cols=4)
pen_table.alignment = WD_TABLE_ALIGNMENT.LEFT
pen_table.style = "Table Grid"
add_table_row(pen_table, [
    ("Annual Availability Achieved", 4.5, "C", True),
    ("Penalty Rate", 3.5, "C", True),
    ("Basis", 3.5, "C", True),
    ("Annual Cap", 4.5, "C", True),
], header=True)

penalty_rows = [
    ("98.00% – 98.99%", "5% of annual Service Fee per Park", "Per shortfall band", "—"),
    ("97.00% – 97.99%", "10% of annual Service Fee per Park", "Per shortfall band", "—"),
    ("95.00% – 96.99%", "20% of annual Service Fee per Park", "Per shortfall band", "—"),
    ("< 95.00%",        "30% of annual Service Fee per Park", "Per shortfall band", "30% of annual Service Fee per Park"),
]
for i, row_data in enumerate(penalty_rows):
    add_table_row(pen_table, [
        (row_data[0], 4.5, "C", False),
        (row_data[1], 3.5, "C", False),
        (row_data[2], 3.5, "C", False),
        (row_data[3], 4.5, "C", False),
    ], alt=(i % 2 == 1))

add_paragraph(doc,
    "The total annual liquidated damages under this Article shall not exceed 30% of the "
    "annual Service Fee for the relevant Park. Liquidated damages represent the Client's "
    "sole financial remedy for Availability shortfalls.",
    size=10, color=GREY, space_before=6, space_after=6)

add_heading(doc, "3.3  Performance Ratio (PR) Guarantee", level=2)
add_paragraph(doc,
    "The Service Provider guarantees a minimum annual average Performance Ratio (PR) of "
    "75% for each Park, calculated per IEC 61724-1 using irradiance data from the "
    "on-site meteorological station. Where the measured annual PR falls below 75%, "
    "the Service Provider shall, at no additional cost:",
    size=10.5, space_after=4)

pr_items = [
    "Conduct a full root-cause analysis within 10 business days.",
    "Present a corrective action plan to the Client within 20 business days.",
    "Implement approved corrective actions within the timeframe agreed with the Client.",
    "If PR remains below 70% for two consecutive Contract Years due to factors within the Service Provider's control, the Client may terminate this Agreement without penalty.",
]
for item in pr_items:
    add_bullet(doc, item)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 4 — EXCLUDED SERVICES
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 4 — Excluded Services", level=1)
add_paragraph(doc,
    "The following services are expressly excluded from this Agreement and shall be "
    "quoted and invoiced separately if required:",
    size=10.5, space_after=4)

excluded = [
    "Replacement of PV modules (including warranty claim administration on behalf of the Client).",
    "Replacement of string inverters, central inverters, or transformers.",
    "Major electrical works including MV cable replacement or substation upgrades.",
    "Civil engineering works beyond minor repairs (as defined in Article 2.6).",
    "Grid connection modifications or grid operator compliance testing.",
    "Insurance claims management.",
    "Cybersecurity or IT infrastructure services beyond SCADA maintenance.",
    "Works required as a result of vandalism, theft, or third-party damage (quoted separately).",
]
for item in excluded:
    add_bullet(doc, item)

add_heading(doc, "4.1  BESS Operation & Maintenance — Separate Agreement", level=2)
add_paragraph(doc,
    "Both Parks include Battery Energy Storage System (BESS) installations currently "
    "subject to a separate Long-Term Service Agreement (LTSA) between the Parties. "
    "BESS O&M services are expressly excluded from the scope of this PV O&M Agreement. "
    "For reference, the key service response times under the separate BESS LTSA are:",
    size=10.5, space_after=4)

bess_response_items = [
    ("Critical BESS fault (full system shutdown, fire suppression activation, BMS alarm): ",
     "on-site response within 2 hours; system isolation and safe-state confirmation within 4 hours."),
    ("Major BESS fault (>20% capacity loss, PCS failure, thermal event): ",
     "on-site response within 4 hours; restoration target 24 hours."),
    ("Minor BESS fault (single container fault, communication loss, BMS warning): ",
     "on-site response within 8 hours; resolution within 48 hours."),
    ("Planned BESS preventive maintenance: ",
     "2 visits per year per system, scheduled in coordination with PV preventive maintenance visits "
     "to minimise combined downtime across both Parks."),
]
for bold_part, text_part in bess_response_items:
    add_bullet(doc, text_part, bold_prefix=bold_part)

add_paragraph(doc,
    "Where a fault event affects both the PV system and the BESS simultaneously, "
    "the Service Provider shall coordinate response under both agreements and provide "
    "a single unified incident report to the Client within 24 hours.",
    size=10, color=GREY, space_before=4, space_after=6)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 5 — CLIENT OBLIGATIONS
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 5 — Client Obligations", level=1)
add_paragraph(doc,
    "The Client shall throughout the Term of this Agreement:", size=10.5, space_after=4)
client_obs = [
    "Provide the Service Provider and its personnel with unrestricted access to both Parks at all reasonable times, with reasonable notice except in cases of emergency.",
    "Maintain valid property and public liability insurance for both Parks and provide evidence of cover on request.",
    "Ensure that both Parks are connected to the SCADA / monitoring system and that communication links remain operational; promptly notify the Service Provider of any communication outage.",
    "Notify the Service Provider promptly of any observed fault, alarm, or unusual operating condition.",
    "Not perform or authorise any maintenance, modification, or repair to the Parks without the Service Provider's prior written consent, except in cases of emergency.",
    "Pay all Service Fees in accordance with Article 9.",
    "Provide the Service Provider with copies of all existing warranties, manuals, as-built drawings, and grid connection documentation within 14 days of the Commencement Date.",
]
for item in client_obs:
    add_bullet(doc, item)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 6 — REPORTING & RECORDS
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 6 — Reporting & Records", level=1)
report_items = [
    ("Monthly Performance Report: ", "issued by the 10th of each calendar month covering the preceding month's energy yield, PR, Availability, fault events, and maintenance activities."),
    ("Maintenance Visit Report: ",   "issued within 5 business days of each site visit, including photographs, findings, and recommendations."),
    ("Annual Summary Report: ",      "issued within 30 days of each Contract Year-end, including year-on-year performance comparison, asset condition assessment, and maintenance plan for the following year."),
    ("Ad-hoc Incident Reports: ",    "issued within 24 hours of any Critical fault event."),
]
for bold_part, text_part in report_items:
    add_bullet(doc, text_part, bold_prefix=bold_part)

add_paragraph(doc,
    "All reports shall be delivered electronically in PDF format. The Service Provider "
    "shall maintain a maintenance log, fault register, and asset condition record for "
    "each Park and make these available to the Client on request.",
    size=10.5, space_after=6)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 7 — TERM & RENEWAL
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 7 — Term & Renewal", level=1)
add_paragraph(doc,
    f"This Agreement shall commence on the Commencement Date and shall continue "
    f"for an initial Term of {CONTRACT['term_years']} (two) Contract Years unless "
    f"terminated earlier in accordance with Article 12. Unless either Party gives "
    f"written notice of non-renewal at least ninety (90) days before the expiry of "
    f"the initial Term or any renewal period, this Agreement shall automatically renew "
    f"for successive one (1) year periods on the same terms, subject to the annual "
    f"Service Fee adjustment set out in Article 9.4.",
    size=10.5, space_after=6)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 8 — SERVICE LEVELS & KPIs
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 8 — Service Levels & Key Performance Indicators", level=1)

kpi_table = doc.add_table(rows=1, cols=3)
kpi_table.alignment = WD_TABLE_ALIGNMENT.LEFT
kpi_table.style = "Table Grid"
add_table_row(kpi_table, [
    ("KPI", 5.5, "L", True),
    ("Target", 4.5, "C", True),
    ("Measurement Basis", 6.0, "L", True),
], header=True)

kpi_rows = [
    ("Annual Availability (per Park)",              f"≥ {CONTRACT['availability_guarantee_pct']}%",  "Annual, per IEC 61724-1"),
    ("Annual Performance Ratio (per Park)",         "≥ 75%",           "Annual, per IEC 61724-1"),
    ("Critical Fault Response Time",                "≤ 4 hours",       "Time from notification receipt"),
    ("Major Fault Response Time",                   "≤ 8 hours",       "Time from notification receipt"),
    ("Minor Fault Response Time",                   "≤ 24 hours",      "Time from notification receipt"),
    ("Preventive Maintenance Visits (per Park)",    "2 per year",      "Scheduled spring & autumn"),
    ("Panel Cleaning Sessions (per Park)",          "2 per year",      "Per preventive visit"),
    ("Monthly Report Delivery",                     "By 10th of month","Electronic PDF delivery"),
    ("Grass Cutting & Vegetation Control",          "4 per year",      "Per Park"),
]
for i, (kpi, target, basis) in enumerate(kpi_rows):
    add_table_row(kpi_table, [
        (kpi,    5.5, "L", False),
        (target, 4.5, "C", True),
        (basis,  6.0, "L", False),
    ], alt=(i % 2 == 1))

doc.add_paragraph()

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 9 — SERVICE FEE & PAYMENT
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 9 — Service Fee & Payment Terms", level=1)

add_heading(doc, "9.1  Annual Service Fee", level=2)
add_paragraph(doc,
    "The annual Service Fee for both Parks is as follows:",
    size=10.5, space_after=6)

fee_table = doc.add_table(rows=1, cols=4)
fee_table.alignment = WD_TABLE_ALIGNMENT.LEFT
fee_table.style = "Table Grid"
add_table_row(fee_table, [
    ("Park",                2.5, "L", True),
    ("Capacity (AC MW)",    3.0, "C", True),
    ("Rate (€/MW/year)",    3.5, "R", True),
    ("Annual Fee",          3.0, "R", True),
], header=True)

fee_rows = [
    ("Anarita East Park",  "5.0 MW",  f"€{CONTRACT['price_per_mw_yr']:,}",  f"€{PRICE_PER_PARK:,.0f}"),
    ("Anarita West Park",  "5.0 MW",  f"€{CONTRACT['price_per_mw_yr']:,}",  f"€{PRICE_PER_PARK:,.0f}"),
    ("TOTAL",              "10.0 MW", f"€{CONTRACT['price_per_mw_yr']:,}",   f"€{PRICE_TOTAL:,.0f}"),
]
for i, (park, cap, rate, fee) in enumerate(fee_rows):
    is_total = (i == 2)
    add_table_row(fee_table, [
        (park, 2.5, "L", is_total),
        (cap,  3.0, "C", is_total),
        (rate, 3.5, "R", is_total),
        (fee,  3.0, "R", is_total),
    ], alt=(i % 2 == 1))

add_paragraph(doc,
    "All fees are quoted exclusive of VAT. VAT shall be applied in accordance with "
    "Cyprus tax law in force at the time of invoicing.",
    size=10, color=GREY, space_before=4, space_after=6)

add_heading(doc, "9.2  Payment Schedule", level=2)
add_paragraph(doc,
    "The annual Service Fee shall be invoiced semi-annually, with each instalment of "
    f"€{PRICE_TOTAL/2:,.0f} (excluding VAT) due as follows:",
    size=10.5, space_after=4)

payment_items = [
    f"First instalment (€{PRICE_TOTAL/2:,.0f} + VAT): invoiced on 1 January of each Contract Year, "
     "due within 30 days of invoice date.",
    f"Second instalment (€{PRICE_TOTAL/2:,.0f} + VAT): invoiced on 1 July of each Contract Year, "
     "due within 30 days of invoice date.",
]
for item in payment_items:
    add_bullet(doc, item)

add_heading(doc, "9.3  Late Payment", level=2)
add_paragraph(doc,
    "Overdue amounts shall accrue interest at 2% per annum above the European Central Bank "
    "base rate from the due date until the date of payment. The Service Provider reserves "
    "the right to suspend non-emergency services after 45 days of non-payment, with written "
    "notice of 10 business days.",
    size=10.5, space_after=6)

add_heading(doc, "9.4  Annual Fee Escalation", level=2)
add_paragraph(doc,
    "From the second Contract Year onwards, the Service Fee shall be adjusted annually "
    "on 1 January by the change in the Harmonised Index of Consumer Prices for Cyprus "
    "(HICP-CY), as published by Eurostat, for the preceding calendar year. "
    "The maximum annual escalation shall not exceed 4%.",
    size=10.5, space_after=6)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 10 — INSURANCE
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 10 — Insurance", level=1)
add_paragraph(doc,
    "Throughout the Term, the Service Provider shall maintain the following minimum "
    "insurance cover and provide evidence to the Client on request:",
    size=10.5, space_after=4)

insurance_items = [
    ("Public Liability Insurance: ", "minimum €2,000,000 per occurrence."),
    ("Employers' Liability Insurance: ", "as required by Cyprus law."),
    ("Professional Indemnity Insurance: ", "minimum €500,000 per claim."),
    ("Motor Vehicle Insurance: ", "third-party liability for all vehicles used on-site."),
]
for bold_part, text_part in insurance_items:
    add_bullet(doc, text_part, bold_prefix=bold_part)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 11 — LIABILITY
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 11 — Liability & Indemnity", level=1)
liability_paras = [
    ("11.1", "Each Party shall indemnify the other against any third-party claims, losses, damages, "
             "and costs arising from its negligent acts or omissions in connection with this Agreement."),
    ("11.2", "The Service Provider's total aggregate liability to the Client under this Agreement "
             "in any Contract Year shall not exceed 100% of the annual Service Fee payable for that "
             "Contract Year, except in cases of fraud, wilful misconduct, or death or personal injury "
             "caused by negligence."),
    ("11.3", "Neither Party shall be liable to the other for any indirect, consequential, or "
             "special losses, including loss of revenue, loss of profit, or loss of production, "
             "howsoever arising."),
    ("11.4", "Liquidated damages payable under Article 3 represent the Client's sole financial "
             "remedy for Availability and Performance Ratio shortfalls."),
]
for num, text in liability_paras:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    r1 = p.add_run(num + "  ")
    r1.bold = True; r1.font.size = Pt(10.5); r1.font.color.rgb = NAVY
    r2 = p.add_run(text)
    r2.font.size = Pt(10.5); r2.font.color.rgb = BLACK

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 12 — FORCE MAJEURE
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 12 — Force Majeure", level=1)
add_paragraph(doc,
    "Neither Party shall be in breach of this Agreement, nor liable for any failure or "
    "delay in performance of its obligations, to the extent that such failure or delay "
    "results from a Force Majeure event, being any event beyond a Party's reasonable "
    "control, including acts of God, natural disasters, war, terrorism, government action, "
    "pandemic, grid outages caused by the national transmission operator, or civil unrest. "
    "The Party invoking Force Majeure shall notify the other Party within 48 hours and "
    "resume performance as soon as reasonably practicable.",
    size=10.5, space_after=6)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 13 — TERMINATION
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 13 — Termination", level=1)
term_items = [
    ("13.1  Termination for Convenience: ",
     "Either Party may terminate this Agreement at the end of any Contract Year "
     "by giving at least ninety (90) days' written notice."),
    ("13.2  Termination for Cause: ",
     "Either Party may terminate this Agreement immediately by written notice if "
     "the other Party: (i) commits a material breach and fails to remedy it within "
     "30 days of written notice; (ii) becomes insolvent, enters administration, or "
     "ceases business; or (iii) commits fraud or wilful misconduct."),
    ("13.3  Consequences of Termination: ",
     "On termination, the Service Provider shall hand over all Park records, "
     "maintenance logs, spare parts, and SCADA access credentials to the Client "
     "within 14 days. Any fees accrued and unpaid as of the termination date remain "
     "payable. Prepaid fees relating to periods after the termination date shall be "
     "refunded on a pro-rata basis."),
]
for bold_part, text_part in term_items:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    r1 = p.add_run(bold_part)
    r1.bold = True; r1.font.size = Pt(10.5); r1.font.color.rgb = NAVY
    r2 = p.add_run(text_part)
    r2.font.size = Pt(10.5); r2.font.color.rgb = BLACK

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 14 — CONFIDENTIALITY
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 14 — Confidentiality", level=1)
add_paragraph(doc,
    "Each Party undertakes to keep confidential all Confidential Information received "
    "from the other Party and not to disclose it to any third party without prior "
    "written consent, except as required by law or regulation. This obligation "
    "shall survive termination of this Agreement for a period of three (3) years.",
    size=10.5, space_after=6)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 15 — GOVERNING LAW & DISPUTE RESOLUTION
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 15 — Governing Law & Dispute Resolution", level=1)
add_paragraph(doc,
    "This Agreement shall be governed by and construed in accordance with the laws "
    "of the Republic of Cyprus. Any dispute arising out of or in connection with this "
    "Agreement shall first be submitted to good-faith mediation. If not resolved within "
    "30 days, the dispute shall be referred to the exclusive jurisdiction of the courts "
    "of the Republic of Cyprus.",
    size=10.5, space_after=6)

# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE 16 — GENERAL PROVISIONS
# ══════════════════════════════════════════════════════════════════════════════
add_heading(doc, "Article 16 — General Provisions", level=1)
general_items = [
    ("Entire Agreement: ", "This Agreement constitutes the entire agreement between the Parties relating to its subject matter and supersedes all prior negotiations, representations, and agreements."),
    ("Amendments: ", "No amendment to this Agreement shall be effective unless made in writing and signed by authorised representatives of both Parties."),
    ("Assignment: ", "Neither Party may assign its rights or obligations under this Agreement without the prior written consent of the other Party, not to be unreasonably withheld."),
    ("Severability: ", "If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect."),
    ("Notices: ", "All notices shall be in writing and delivered by email with read receipt or by registered post to the addresses set out on the cover page."),
    ("Waiver: ", "Failure to exercise or delay in exercising any right shall not constitute a waiver of that right."),
    ("Counterparts: ", "This Agreement may be executed in counterparts, each of which shall constitute an original, and together they shall form one agreement."),
]
for bold_part, text_part in general_items:
    add_bullet(doc, text_part, bold_prefix=bold_part)

# ══════════════════════════════════════════════════════════════════════════════
# SCHEDULES
# ══════════════════════════════════════════════════════════════════════════════
doc.add_page_break()
add_heading(doc, "Schedule A — Annual Maintenance Plan", level=1)
add_paragraph(doc, "Minimum maintenance activities per Park per Contract Year:", size=10.5, space_after=6)

sched_table = doc.add_table(rows=1, cols=5)
sched_table.alignment = WD_TABLE_ALIGNMENT.LEFT
sched_table.style = "Table Grid"
add_table_row(sched_table, [
    ("Activity",              5.0, "L", True),
    ("Q1 (Jan–Mar)",          2.5, "C", True),
    ("Q2 (Apr–Jun)",          2.5, "C", True),
    ("Q3 (Jul–Sep)",          2.5, "C", True),
    ("Q4 (Oct–Dec)",          2.5, "C", True),
], header=True)

sched_rows = [
    ("Full preventive maintenance visit",        "",   "Yes", "",    "Yes"),
    ("PV module cleaning",                       "",   "Yes", "",    "Yes"),
    ("IR thermography scan",                     "",   "Yes", "",    "Yes"),
    ("IV-curve testing (sample)",                "",   "Yes", "",    "Yes"),
    ("Grass cutting / vegetation control",       "Yes","Yes", "Yes", "Yes"),
    ("SCADA / monitoring system check",          "Yes","Yes", "Yes", "Yes"),
    ("Insulation resistance testing",            "",   "",    "Yes", ""),
    ("Earth continuity testing",                 "",   "",    "Yes", ""),
    ("Perimeter / security inspection",          "Yes","Yes", "Yes", "Yes"),
    ("Post-storm emergency inspection",          "On demand - within 48 hours of trigger event", "", "", ""),
]
for i, row_d in enumerate(sched_rows):
    if len(row_d) == 2:
        add_table_row(sched_table, [
            (row_d[0], 5.0, "L", False),
            (row_d[1], 10.0, "C", True),
        ], alt=(i % 2 == 1))
    else:
        add_table_row(sched_table, [
            (row_d[0], 5.0, "L", False),
            (row_d[1], 2.5, "C", False),
            (row_d[2], 2.5, "C", False),
            (row_d[3], 2.5, "C", False),
            (row_d[4], 2.5, "C", False),
        ], alt=(i % 2 == 1))

doc.add_paragraph()

add_heading(doc, "Schedule B — Parks Technical Summary", level=1)
park_table = doc.add_table(rows=1, cols=4)
park_table.alignment = WD_TABLE_ALIGNMENT.LEFT
park_table.style = "Table Grid"
add_table_row(park_table, [
    ("Parameter",             5.0, "L", True),
    ("Anarita East Park",     4.0, "L", True),
    ("Anarita West Park",     4.0, "L", True),
    ("Combined",              3.0, "C", True),
], header=True)

park_rows = [
    ("Location",              "Anarita, Paphos District",        "Anarita, Paphos District",  "—"),
    ("Installed PV Capacity", "5.01 MWp",                        "5.01 MWp",                  "10.02 MWp"),
    ("AC Export Capacity",    "5.0 MW",                          "5.0 MW",                    "10.0 MW"),
    ("Grid Connection",       "22 kV (EAC)",                     "22 kV (EAC)",               "—"),
    ("Annual O&M Fee",        f"€{PRICE_PER_PARK:,.0f}",         f"€{PRICE_PER_PARK:,.0f}",   f"€{PRICE_TOTAL:,.0f}"),
    ("Cleaning Sessions/yr",  "2",                               "2",                         "4 total"),
    ("Availability Guarantee","99%",                             "99%",                       "99% per park"),
]
for i, row_d in enumerate(park_rows):
    add_table_row(park_table, [
        (row_d[0], 5.0, "L", True),
        (row_d[1], 4.0, "L", False),
        (row_d[2], 4.0, "L", False),
        (row_d[3], 3.0, "C", False),
    ], alt=(i % 2 == 1))

# ══════════════════════════════════════════════════════════════════════════════
# SIGNATURE BLOCK
# ══════════════════════════════════════════════════════════════════════════════
doc.add_page_break()
add_heading(doc, "Execution", level=1)
add_paragraph(doc,
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date "
    "first written above.",
    size=10.5, space_after=16)

sig_table = doc.add_table(rows=1, cols=2)
sig_table.alignment = WD_TABLE_ALIGNMENT.LEFT

for i, (role, party_key, extra) in enumerate([
    ("SERVICE PROVIDER", "provider", f"Title: {CONTRACT['provider']['title']}"),
    ("CLIENT",           "client",   "Title: Authorised Signatory"),
]):
    cell = sig_table.rows[0].cells[i]
    cell.width = Cm(8)

    def sig_para(cell, text, bold=False, color=BLACK, after=4):
        p = cell.add_paragraph()
        p.paragraph_format.space_after = Pt(after)
        r = p.add_run(text)
        r.bold = bold; r.font.size = Pt(10.5); r.font.color.rgb = color
        return p

    sig_para(cell, role, bold=True, color=NAVY)
    sig_para(cell, CONTRACT[party_key]["name"], bold=True)
    sig_para(cell, "", after=32)
    sig_para(cell, "Signature: ___________________________")
    sig_para(cell, f"Name: {CONTRACT[party_key]['contact']}")
    sig_para(cell, extra)
    sig_para(cell, "Date: ___________________________")

# remove first blank paragraph from each cell
for cell in sig_table.rows[0].cells:
    first = cell.paragraphs[0]
    if not first.text:
        p_elem = first._p
        p_elem.getparent().remove(p_elem)

# ── Save ──────────────────────────────────────────────────────────────────────
doc.save(OUT_FILE)
print("Saved: " + OUT_FILE)
