"""
Generate LOI — Esperia Energy Remaining Pipeline (post-Galascope signing)
Output: docs/clients/group-order/Group2_Esperia_Energy/contracts/
        LOI-Esperia-Energy-remaining-pipeline-apr2026.docx

Data source: lib/portfolio-data.ts + esperia-energy.md (SSOT)
Excludes:   Galascope 1 & 2 (bound by concurrent EPC Agreement)
"""

from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import os

# ── Brand colours ─────────────────────────────────────────────────────────────
NAVY      = RGBColor(0x1A, 0x36, 0x5D)
GOLD      = RGBColor(0xC9, 0xA4, 0x32)
WHITE     = RGBColor(0xFF, 0xFF, 0xFF)
BLACK     = RGBColor(0x00, 0x00, 0x00)
GREY      = RGBColor(0x40, 0x40, 0x40)
AMBER_TXT = RGBColor(0x78, 0x35, 0x0F)
AMBER_HDR = RGBColor(0x92, 0x40, 0x0E)
NAVY_HEX  = "1A365D"
LIGHT_HEX = "EBF0F7"
AMBER_HEX = "FEF3C7"

# ── Portfolio data (SSOT: lib/portfolio-data.ts + esperia-energy.md) ──────────
PIPELINE = {
    "phase1": [
        {"name": "Esperia Energy (Famagusta)",      "district": "Famagusta", "mw": 6.5,  "mwh": 20,   "containers": 4,  "client_price": 2_316_815, "epc_target": "Q2 2026", "cod": "Q4 2026"},
        {"name": "Esperia Green Energy (Limassol)", "district": "Limassol",  "mw": 8.0,  "mwh": 60,   "containers": 12, "client_price": 5_644_044, "epc_target": "Q2 2026", "cod": "Q4 2026"},
        {"name": "Esperia Energy (Frenaros)",       "district": "Famagusta", "mw": 25.0, "mwh": 100,  "containers": 20, "client_price": 10_088_014,"epc_target": "Q2 2026", "cod": "Q4 2026"},
    ],
    "phase2": [
        {"name": "Esperia Green Energy (Famagusta 2)", "district": "Famagusta", "mw": 5.0, "mwh": 20, "containers": 4,  "client_price": 2_189_416, "epc_target": "Q3 2027", "cod": "Q1 2028"},
    ],
    "phase3": [
        {"name": "Esperia Energy (Tseri)",    "district": "Nicosia", "mw": 7.0,  "mwh": 20,   "containers": 4, "client_price": 2_382_035, "epc_target": "2027", "cod": "Q2 2028"},
        {"name": "Esperia Energy (Tseri 2-A)","district": "Nicosia", "mw": 2.5,  "mwh": 7.5,  "containers": 2, "client_price": 1_084_620, "epc_target": "2027", "cod": "Q2 2028"},
        {"name": "Esperia Energy (Tseri 2-B)","district": "Nicosia", "mw": 7.5,  "mwh": 25,   "containers": 5, "client_price": 2_912_993, "epc_target": "2027", "cod": "Q3 2028"},
        {"name": "Esperia Energy (Tseri 2-C)","district": "Nicosia", "mw": 6.0,  "mwh": 20,   "containers": 4, "client_price": 1_551_848, "epc_target": "2027", "cod": "Q3 2028"},
        {"name": "Esperia Energy (Tseri 3)",  "district": "Nicosia", "mw": 4.75, "mwh": 15,   "containers": 3, "client_price": 1_874_143, "epc_target": "2027", "cod": "Q4 2028"},
    ],
}

ALL_PARKS  = PIPELINE["phase1"] + PIPELINE["phase2"] + PIPELINE["phase3"]
TOTAL_MW   = sum(p["mw"]  for p in ALL_PARKS)
TOTAL_MWH  = sum(p["mwh"] for p in ALL_PARKS)
TOTAL_CONT = sum(p["containers"] for p in ALL_PARKS)
TOTAL_VAL  = sum(p["client_price"] for p in ALL_PARKS)

PHASE_TOTALS = {
    k: {
        "label": lbl,
        "mw":  sum(p["mw"]  for p in PIPELINE[k]),
        "mwh": sum(p["mwh"] for p in PIPELINE[k]),
        "containers": sum(p["containers"] for p in PIPELINE[k]),
        "val": sum(p["client_price"] for p in PIPELINE[k]),
    }
    for k, lbl in (
        ("phase1", "Phase 1 \u2014 2026 Delivery"),
        ("phase2", "Phase 2 \u2014 2027 Delivery"),
        ("phase3", "Phase 3 \u2014 2028 Delivery (Tseri Portfolio)"),
    )
}

# ── Helpers ───────────────────────────────────────────────────────────────────
def fmt_eur(v):
    return f"\u20ac{v:,.0f}"

def cm_to_twips(cm):
    return int(cm * 567)

def lock_table_widths(table, col_widths_cm):
    tbl   = table._tbl
    tblPr = tbl.tblPr
    for old in tblPr.findall(qn("w:tblW")):
        tblPr.remove(old)
    tblW = OxmlElement("w:tblW")
    tblW.set(qn("w:w"), str(sum(cm_to_twips(w) for w in col_widths_cm)))
    tblW.set(qn("w:type"), "dxa")
    tblPr.append(tblW)
    for old in tblPr.findall(qn("w:tblLayout")):
        tblPr.remove(old)
    lay = OxmlElement("w:tblLayout")
    lay.set(qn("w:type"), "fixed")
    tblPr.append(lay)
    existing = tbl.find(qn("w:tblGrid"))
    if existing is not None:
        tbl.remove(existing)
    tblGrid = OxmlElement("w:tblGrid")
    for w_cm in col_widths_cm:
        gc = OxmlElement("w:gridCol")
        gc.set(qn("w:w"), str(cm_to_twips(w_cm)))
        tblGrid.append(gc)
    tbl.insert(list(tbl).index(tblPr) + 1, tblGrid)
    for row in table.rows:
        for i, cell in enumerate(row.cells):
            if i >= len(col_widths_cm):
                break
            tcPr = cell._tc.get_or_add_tcPr()
            for old in tcPr.findall(qn("w:tcW")):
                tcPr.remove(old)
            tcW = OxmlElement("w:tcW")
            tcW.set(qn("w:w"), str(cm_to_twips(col_widths_cm[i])))
            tcW.set(qn("w:type"), "dxa")
            tcPr.append(tcW)

def set_cell_bg(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  hex_color)
    tcPr.append(shd)

def add_run(para, text, bold=False, italic=False, size_pt=10, color=BLACK, font="Calibri"):
    run = para.add_run(text)
    run.bold = bold
    run.italic = italic
    run.font.name  = font
    run.font.size  = Pt(size_pt)
    run.font.color.rgb = color
    return run

def para(doc, space_before=0, space_after=6, align=WD_ALIGN_PARAGRAPH.LEFT):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after  = Pt(space_after)
    p.alignment = align
    return p

def h1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after  = Pt(4)
    add_run(p, text, bold=True, size_pt=12, color=GOLD)
    # underline rule via border — simple approach: just use the run
    return p

def h2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after  = Pt(3)
    add_run(p, text, bold=True, size_pt=10, color=NAVY)
    return p

def body(doc, text, space_after=5, justify=True):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    add_run(p, text)
    return p

def bullet(doc, text, indent_cm=0.5):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.left_indent = Cm(indent_cm)
    add_run(p, text, size_pt=10)
    return p

def tbl_hdr(table, headers):
    row = table.rows[0]
    for i, hdr in enumerate(headers):
        cell = row.cells[i]
        set_cell_bg(cell, NAVY_HEX)
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        add_run(p, hdr, bold=True, size_pt=8, color=WHITE)

def tbl_row(table, values, right_cols=None, total=False, shade=False):
    right_cols = right_cols or set()
    row = table.add_row()
    for i, val in enumerate(values):
        cell = row.cells[i]
        if total:
            set_cell_bg(cell, NAVY_HEX)
        elif shade:
            set_cell_bg(cell, LIGHT_HEX)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT if i in right_cols else (
            WD_ALIGN_PARAGRAPH.CENTER if i > 0 else WD_ALIGN_PARAGRAPH.LEFT)
        color = WHITE if total else BLACK
        add_run(p, str(val), bold=total, size_pt=8.5, color=color)
    return row

# ── Document ──────────────────────────────────────────────────────────────────
doc = Document()
for section in doc.sections:
    section.top_margin    = Cm(2.0)
    section.bottom_margin = Cm(2.0)
    section.left_margin   = Cm(2.5)
    section.right_margin  = Cm(2.5)

# ═══════════════════════════════════════════════════════════════════════════════
# HEADER BAR
# ═══════════════════════════════════════════════════════════════════════════════
hdr_tbl = doc.add_table(rows=1, cols=2)
hdr_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
hdr_tbl.autofit   = False

lc = hdr_tbl.rows[0].cells[0]
set_cell_bg(lc, NAVY_HEX)
lc.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
lp = lc.paragraphs[0]
lp.alignment = WD_ALIGN_PARAGRAPH.LEFT
lp.paragraph_format.space_before = Pt(6)
lp.paragraph_format.space_after  = Pt(6)
add_run(lp, "Lighthief", bold=True,  size_pt=22, color=WHITE)
add_run(lp, " Cyprus Ltd", bold=False, size_pt=11, color=WHITE)

rc = hdr_tbl.rows[0].cells[1]
set_cell_bg(rc, NAVY_HEX)
rc.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
rp = rc.paragraphs[0]
rp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
rp.paragraph_format.space_before = Pt(6)
rp.paragraph_format.space_after  = Pt(6)
for line, is_gold in [
    ("LETTER OF INTENT", True),
    ("Ref: LCY-LOI-ESP-PIPELINE-2026", False),
    ("Date: 23 April 2026", False),
    ("STRICTLY CONFIDENTIAL", True),
]:
    add_run(rp, line + "\n", bold=is_gold, size_pt=8,
            color=GOLD if is_gold else WHITE)

lock_table_widths(hdr_tbl, [10.0, 4.0])
doc.add_paragraph().paragraph_format.space_after = Pt(2)

# ═══════════════════════════════════════════════════════════════════════════════
# DOCUMENT TITLE
# ═══════════════════════════════════════════════════════════════════════════════
tp = doc.add_paragraph()
tp.alignment = WD_ALIGN_PARAGRAPH.LEFT
tp.paragraph_format.space_after = Pt(2)
add_run(tp, "Letter of Intent", bold=True, size_pt=18, color=NAVY)

sp = doc.add_paragraph()
sp.paragraph_format.space_after = Pt(10)
add_run(sp, "Esperia Energy Group \u2014 BESS Portfolio EPC Pipeline Commitment",
        italic=True, size_pt=11, color=GREY)

# ═══════════════════════════════════════════════════════════════════════════════
# PARTIES
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "PARTIES")

parties_tbl = doc.add_table(rows=2, cols=2)
parties_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
parties_tbl.autofit   = False
parties_data = [
    ("Contractor", (
        "Lighthief Cyprus Ltd\n"
        "Registration No. HE 477423\n"
        "28 October Ave 249, Lophitis Business Center 1,\n"
        "Office 201, 3035 Limassol, Cyprus\n"
        "office@lighthief.com | +357 77 77 00 50\n"
        "(hereinafter \u201cLighthief\u201d or the \u201cContractor\u201d)"
    )),
    ("Client", (
        "Esperia Energy Group\n"
        "represented by: Dino Constantinou (Owner)\n"
        "Famagusta, Limassol and Nicosia districts, Cyprus\n"
        "\n"
        "(hereinafter \u201cthe Client\u201d)"
    )),
]
for row_i, (label, text) in enumerate(parties_data):
    lc_p = parties_tbl.rows[row_i].cells[0]
    rc_p = parties_tbl.rows[row_i].cells[1]
    set_cell_bg(lc_p, NAVY_HEX)
    lc_p.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    lpp = lc_p.paragraphs[0]
    lpp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    lpp.paragraph_format.space_before = Pt(4)
    lpp.paragraph_format.space_after  = Pt(4)
    add_run(lpp, label, bold=True, size_pt=10, color=WHITE)
    rpp = rc_p.paragraphs[0]
    rpp.paragraph_format.space_before = Pt(4)
    rpp.paragraph_format.space_after  = Pt(4)
    add_run(rpp, text, size_pt=9, color=BLACK)

lock_table_widths(parties_tbl, [2.5, 11.5])
doc.add_paragraph().paragraph_format.space_after = Pt(2)

# ═══════════════════════════════════════════════════════════════════════════════
# RECITALS
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "RECITALS")
recitals = [
    ("A.", "Lighthief is an EPC contractor specialising in the supply, installation and commissioning of battery energy storage systems (\u201cBESS\u201d) for grid-connected hybrid photovoltaic and BESS installations in Cyprus."),
    ("B.", "The Client owns and/or develops a portfolio of hybrid PV + BESS projects requiring Category B grid connection under Cyprus EAC/DSO rules, located across Famagusta, Limassol and Nicosia districts."),
    ("C.", "Concurrently with the execution of this LOI, the Parties have entered into a binding EPC Agreement (ref. LCY-EPC-GALASCOPE-2026) for the Galascope portfolio: Galascope 1 (5.0 MW / 20 MWh, Famagusta) and Galascope 2 (2.5 MW / 8 MWh, Famagusta) (\u201cthe Galascope EPC\u201d)."),
    ("D.", "The Client wishes to confirm its intention to award further EPC Agreements to Lighthief for the nine (9) remaining Esperia Energy parks described herein (\u201cthe Pipeline Projects\u201d), subject to the terms of this LOI."),
    ("E.", "Lighthief wishes to undertake advance procurement and resource planning on the basis of the Client\u2019s commitment set out in this LOI."),
]
for letter, text in recitals:
    rp = doc.add_paragraph()
    rp.paragraph_format.space_after = Pt(4)
    rp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    add_run(rp, letter + "  ", bold=True, size_pt=10, color=NAVY)
    add_run(rp, text, size_pt=10)

doc.add_paragraph().paragraph_format.space_after = Pt(2)
body(doc, "NOW THEREFORE, in consideration of the mutual commitments set out herein and intending to be bound by the provisions expressly stated to be binding, the Parties agree as follows:", space_after=8)

# ═══════════════════════════════════════════════════════════════════════════════
# 1. DEFINITIONS
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "1.   DEFINITIONS")
definitions = [
    ("\"COD\"", "means Commercial Operation Date, being the date on which a BESS park achieves grid-export capability following commissioning."),
    ("\"EPC Agreement\"", "means an Engineering, Procurement and Construction contract for a specific BESS park, to be executed separately between the Parties."),
    ("\"EPC Target Date\"", "means the indicative date by which the Parties intend to execute an EPC Agreement for a given phase, as set out in Schedule 1."),
    ("\"FAT\"", "means Factory Acceptance Test conducted at Linyang\u2019s facility prior to shipment."),
    ("\"Group-Order Pricing\"", "means the preferential pricing applicable to the Client as a group purchaser of multiple parks, based on Quotation LY202511281 or any successor quotation agreed in writing."),
    ("\"LTSA\"", "means a Long-Term Service Agreement for the ongoing maintenance and performance guarantee of commissioned parks."),
    ("\"PAC\"", "means Provisional Acceptance Certificate issued upon successful commissioning and grid energisation of a BESS park."),
    ("\"Pipeline Projects\"", "means the nine (9) Esperia Energy BESS parks identified in Schedule 1 of this LOI, excluding the Galascope EPC."),
    ("\"Validity Period\"", "has the meaning given in Clause 10."),
]
for term, defn in definitions:
    dp = doc.add_paragraph()
    dp.paragraph_format.space_after = Pt(3)
    dp.paragraph_format.left_indent = Cm(0.5)
    dp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    add_run(dp, term + "  ", bold=True, size_pt=10)
    add_run(dp, defn, size_pt=10)

# ═══════════════════════════════════════════════════════════════════════════════
# 2. SCOPE & INTENT
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "2.   SCOPE AND INTENT")
body(doc,
    "2.1  The Client hereby confirms its firm intention to award EPC Agreements to "
    "Lighthief for all nine (9) Pipeline Projects set out in Schedule 1, comprising "
    f"a total of {TOTAL_MW:.2f} MW / {TOTAL_MWH:.1f} MWh of BESS capacity across "
    "Famagusta, Limassol and Nicosia districts, with an aggregate indicative contract "
    f"value of {fmt_eur(TOTAL_VAL)} (excl. VAT).")
body(doc,
    "2.2  The Parties acknowledge that the Pipeline Projects will be executed in three "
    "phases as described in Clause 4, with each phase subject to a separately executed "
    "EPC Agreement. This LOI does not constitute a binding obligation to execute any such "
    "EPC Agreement; however, the confidentiality, good-faith negotiation, and exclusivity "
    "obligations in Clauses 8, 9 and 10 are legally binding on both Parties.")
body(doc,
    "2.3  The Client acknowledges that Lighthief will rely on this LOI to initiate "
    "procurement planning, OEM batch reservations, and resource scheduling for the "
    "Pipeline Projects. Any withdrawal by the Client from the Pipeline without valid "
    "justification following such reliance may give rise to a claim for reasonable "
    "pre-contractual costs incurred by Lighthief.")

# ═══════════════════════════════════════════════════════════════════════════════
# 3. PIPELINE OVERVIEW — SCHEDULE 1
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "3.   PIPELINE OVERVIEW (SCHEDULE 1)")
body(doc,
    "The Pipeline Projects are as follows. All pricing is indicative at Group-Order "
    "Pricing rates. Final pricing for each phase will be confirmed in the relevant EPC "
    "Agreement, no later than sixty (60) days prior to the EPC Target Date.")

# Metrics strip
mx_tbl = doc.add_table(rows=1, cols=4)
mx_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
mx_tbl.autofit   = False
for i, (val, lbl) in enumerate([
    ("9 Parks",          "Pipeline Projects"),
    (f"{TOTAL_MW:.2f} MW",   "Total BESS Power"),
    (f"{TOTAL_MWH:.1f} MWh", "Total BESS Energy"),
    (fmt_eur(TOTAL_VAL), "Indicative Value (ex. VAT)"),
]):
    cell = mx_tbl.rows[0].cells[i]
    set_cell_bg(cell, LIGHT_HEX)
    cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    mp = cell.paragraphs[0]
    mp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    mp.paragraph_format.space_before = Pt(6)
    mp.paragraph_format.space_after  = Pt(6)
    add_run(mp, val + "\n", bold=True, size_pt=12, color=NAVY)
    add_run(mp, lbl, size_pt=7.5, color=GREY)
lock_table_widths(mx_tbl, [3.5, 3.5, 3.5, 3.5])
doc.add_paragraph().paragraph_format.space_after = Pt(4)

# Pipeline table — 6 columns, 14.0 cm total (body = 16 cm)
_PC = [5.2, 1.7, 1.3, 1.3, 1.0, 3.5]
pipe_tbl = doc.add_table(rows=1, cols=6)
pipe_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
pipe_tbl.autofit   = False
tbl_hdr(pipe_tbl, ["Park / Project", "District", "MW", "MWh", "Cont.", "Indicative Price (ex. VAT)"])

RC = {2, 3, 4, 5}
for phase_key in ("phase1", "phase2", "phase3"):
    parks = PIPELINE[phase_key]
    for p in parks:
        tbl_row(pipe_tbl, [
            p["name"], p["district"],
            f"{p['mw']:.2f}", f"{p['mwh']:.1f}",
            str(p["containers"]), fmt_eur(p["client_price"]),
        ], right_cols=RC)
    pt = PHASE_TOTALS[phase_key]
    tbl_row(pipe_tbl, [
        pt["label"] + " \u2014 Subtotal", "",
        f"{pt['mw']:.2f}", f"{pt['mwh']:.1f}",
        str(pt["containers"]), fmt_eur(pt["val"]),
    ], right_cols=RC, total=True)

tbl_row(pipe_tbl, [
    "TOTAL PIPELINE  (9 parks)", "",
    f"{TOTAL_MW:.2f}", f"{TOTAL_MWH:.1f}",
    str(TOTAL_CONT), fmt_eur(TOTAL_VAL),
], right_cols=RC, total=True)
lock_table_widths(pipe_tbl, _PC)

# ═══════════════════════════════════════════════════════════════════════════════
# 4. PHASED PROGRAMME
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "4.   PHASED PROGRAMME")
body(doc,
    "4.1  The Parties intend to execute EPC Agreements for the Pipeline Projects in "
    "three phases as set out below. EPC Target Dates are indicative and shall be "
    "confirmed in each EPC Agreement.")

h2(doc, "Phase 1 \u2014 2026 Delivery  |  3 Parks  |  180 MWh  |  " + fmt_eur(PHASE_TOTALS["phase1"]["val"]))
body(doc,
    "EPC Agreements for the three Phase 1 parks (Esperia Energy Famagusta 6.5 MW / 20 MWh; "
    "Esperia Green Energy Limassol 8.0 MW / 60 MWh; Esperia Energy Frenaros 25.0 MW / "
    "100 MWh) shall be executed no later than Q2 2026. Target COD for all Phase 1 parks "
    "is Q4 2026, subject to grid connection permits from EAC/DSO.")

h2(doc, "Phase 2 \u2014 2027 Delivery  |  1 Park  |  20 MWh  |  " + fmt_eur(PHASE_TOTALS["phase2"]["val"]))
body(doc,
    "An EPC Agreement for Esperia Green Energy (Famagusta 2, 5.0 MW / 20 MWh) shall be "
    "executed no later than Q3 2027. Target COD is Q1 2028, subject to EAC/DSO grid "
    "connection approval for that site.")

h2(doc, "Phase 3 \u2014 2028 Delivery  |  5 Parks  |  87.5 MWh  |  " + fmt_eur(PHASE_TOTALS["phase3"]["val"]))
body(doc,
    "EPC Agreements for the five Tseri portfolio parks (Nicosia district) shall be "
    "executed during 2027, with staggered CODs through 2028. Final specifications and "
    "sub-entity structure for Tseri 2 are subject to written confirmation by the Client "
    "no later than Q1 2027.")

body(doc, "4.2  Execution of each EPC Agreement is subject to:", space_after=3)
bullet(doc, "Successful PAC and satisfactory performance of the immediately preceding phase (not applicable to Phase 1);")
bullet(doc, "Receipt of written grid connection approval from EAC/DSO for the relevant sites;")
bullet(doc, "Finalisation of site-specific technical designs (single-line diagram, SCADA configuration, MV/LV layout); and")
bullet(doc, "Agreement in writing on final pricing for the relevant phase, at Group-Order Pricing rates.")

# ═══════════════════════════════════════════════════════════════════════════════
# 5. COMMERCIAL TERMS
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "5.   COMMERCIAL TERMS")
body(doc,
    "5.1  All Pipeline Projects shall be priced at Group-Order Pricing rates based on "
    "Quotation LY202511281 or a successor quotation to be agreed in writing. Lighthief "
    "shall issue a revised indicative quotation for each phase no later than ninety (90) "
    "days prior to the relevant EPC Target Date.")
body(doc,
    "5.2  Subject to final negotiation in each EPC Agreement, the indicative payment "
    "structure for each phase shall be:")
bullet(doc, "30%  \u2014  Advance payment upon EPC Agreement signature;")
bullet(doc, "55%  \u2014  Pre-shipment milestone, upon confirmation of FAT completion and ex-works despatch;")
bullet(doc, "10%  \u2014  Upon issuance of PAC (Provisional Acceptance Certificate); and")
bullet(doc, "5%   \u2014  Retention, released upon expiry of the 24-month Defect Liability Period (\u201cDLP\u201d).")
body(doc,
    "5.3  All prices are exclusive of VAT and any applicable import duties or levies. "
    "The Client shall be responsible for all costs relating to site preparation, civil "
    "works, grid connection fees, and DSO/EAC application fees unless otherwise agreed "
    "in writing in the relevant EPC Agreement.")
body(doc,
    "5.4  Indicative pricing is valid for ninety (90) days from the date of this LOI, "
    "after which it shall be subject to review based on prevailing OEM pricing and "
    "logistics costs. Lighthief shall provide at least thirty (30) days\u2019 written "
    "notice of any material pricing change.")

# ═══════════════════════════════════════════════════════════════════════════════
# 6. LTSA FRAMEWORK
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "6.   LONG-TERM SERVICE AGREEMENT (LTSA)")
body(doc,
    "6.1  The Client confirms its intention to enter into a group Long-Term Service "
    "Agreement (\u201cLTSA\u201d) with Lighthief covering all parks under the Galascope EPC "
    "and all Pipeline Projects. The LTSA shall be negotiated and executed concurrently "
    "with or prior to the Phase 1 EPC Agreements.")
body(doc, "6.2  The LTSA framework shall incorporate the following principal terms:")
bullet(doc, "Commencement: from the PAC date of each individual park, accumulating progressively;")
bullet(doc, "Availability Guarantee: 97% calculated on a group-wide basis across all active Esperia / Galascope parks;")
bullet(doc, "Shortfall remedy: performance liquidated damages calculated on a per-MWh basis for availability shortfalls below the guaranteed threshold;")
bullet(doc, "Pricing: fixed annual service fee per MWh of installed capacity, in accordance with the agreed LTSA pricing schedule (Tier C or as separately agreed); and")
bullet(doc, "Term: a minimum of ten (10) years from the PAC date of the first commissioned park.")

# ═══════════════════════════════════════════════════════════════════════════════
# 7. TECHNICAL REQUIREMENTS
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "7.   TECHNICAL REQUIREMENTS")
body(doc,
    "7.1  All BESS systems delivered under the Pipeline Projects shall conform to the "
    "technical specification referenced in the Galascope EPC (Linyang ME 5.015 MWh "
    "LFP containers, Kehua BCS1250K-C-HUD PCS units) or any updated specification "
    "agreed in writing.")
body(doc,
    "7.2  Each system shall meet Category B hybrid RES + BESS grid connection requirements "
    "under the Cyprus Transmission and Distribution Rules (v4.0.0 or the version in force "
    "at the time of DSO application), including IEC 60870-5-104 SCADA connectivity, "
    "active power dispatch and curtailment compliance.")
body(doc,
    "7.3  The Client shall provide Lighthief with all site-specific technical documentation "
    "(SLD, title deeds, existing SCADA configurations, DSO approval references) at least "
    "ninety (90) days prior to the EPC Target Date for each phase.")

# ═══════════════════════════════════════════════════════════════════════════════
# 8. GOOD FAITH NEGOTIATION
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "8.   GOOD FAITH NEGOTIATION")
body(doc,
    "8.1  Both Parties undertake to negotiate the EPC Agreements for the Pipeline "
    "Projects in good faith and with reasonable commercial diligence, with the aim of "
    "executing each EPC Agreement by the relevant EPC Target Date.")
body(doc,
    "8.2  If the Parties are unable to agree the terms of an EPC Agreement within "
    "sixty (60) days of the relevant EPC Target Date, either Party may terminate this "
    "LOI in respect of that phase by written notice, without liability to the other, "
    "save in respect of any pre-contractual costs recoverable under Clause 2.3.")
body(doc,
    "8.3  Neither Party shall be obliged to accept terms that are materially less "
    "favourable than those prevailing in the market for comparable BESS EPC contracts "
    "in Cyprus at the relevant time.")

# ═══════════════════════════════════════════════════════════════════════════════
# 9. EXCLUSIVITY
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "9.   EXCLUSIVITY")
body(doc,
    "9.1  During the Validity Period and for a period of six (6) months following the "
    "PAC date of each phase, the Client shall not, directly or indirectly, solicit, "
    "negotiate or enter into any agreement with any third-party EPC contractor in "
    "respect of the Pipeline Projects identified in Schedule 1, without the prior "
    "written consent of Lighthief.")
body(doc,
    "9.2  The exclusivity obligation in Clause 9.1 shall not apply where: (a) the "
    "Parties have failed to agree an EPC Agreement for the relevant phase within the "
    "period specified in Clause 8.2; or (b) Lighthief has materially breached its "
    "obligations under this LOI or the Galascope EPC and has not remedied such breach "
    "within thirty (30) days of written notice.")

# ═══════════════════════════════════════════════════════════════════════════════
# 10. VALIDITY AND EXPIRY
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "10.   VALIDITY AND EXPIRY")
body(doc,
    "10.1  This LOI shall remain in force from the date of execution until the earlier "
    "of: (a) the execution of EPC Agreements for all Pipeline Projects; (b) expiry of "
    "thirty-six (36) months from the date of this LOI; or (c) termination by either "
    "Party in accordance with Clause 8.2 or Clause 13 (\u201cthe Validity Period\u201d).")
body(doc,
    "10.2  On expiry or termination of this LOI, all obligations of the Parties shall "
    "cease, except for: (i) confidentiality obligations under Clause 11, which shall "
    "survive for five (5) years; (ii) any accrued rights or obligations; and "
    "(iii) obligations under any EPC Agreement already executed.")

# ═══════════════════════════════════════════════════════════════════════════════
# 11. CONFIDENTIALITY
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "11.   CONFIDENTIALITY")
body(doc,
    "11.1  Each Party shall keep confidential all information disclosed by the other "
    "Party in connection with this LOI and the Pipeline Projects, including but not "
    "limited to pricing, technical specifications, commercial strategy and portfolio "
    "data (\u201cConfidential Information\u201d).")
body(doc,
    "11.2  Confidential Information shall not be disclosed to any third party without "
    "the prior written consent of the disclosing Party, except: (a) to employees, "
    "advisers or lenders on a need-to-know basis who are bound by equivalent "
    "confidentiality obligations; or (b) as required by applicable law or regulatory "
    "authority.")
body(doc,
    "11.3  This obligation shall survive the termination or expiry of this LOI for "
    "a period of five (5) years.")

# ═══════════════════════════════════════════════════════════════════════════════
# 12. GOVERNING LAW AND JURISDICTION
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "12.   GOVERNING LAW AND JURISDICTION")
body(doc,
    "12.1  This LOI and any non-contractual obligations arising out of or in connection "
    "with it shall be governed by and construed in accordance with the laws of the "
    "Republic of Cyprus.")
body(doc,
    "12.2  The Parties irrevocably submit to the exclusive jurisdiction of the courts "
    "of the Republic of Cyprus to settle any dispute arising out of or in connection "
    "with this LOI.")

# ═══════════════════════════════════════════════════════════════════════════════
# 13. COSTS
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "13.   COSTS")
body(doc,
    "Each Party shall bear its own legal, professional and administrative costs incurred "
    "in connection with the negotiation, preparation and execution of this LOI and any "
    "EPC Agreement, unless otherwise agreed in writing.")

# ═══════════════════════════════════════════════════════════════════════════════
# 14. TERMINATION
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "14.   TERMINATION")
body(doc,
    "14.1  Either Party may terminate this LOI by giving thirty (30) days\u2019 written "
    "notice to the other Party, without cause. Termination shall not affect any EPC "
    "Agreement already in force.")
body(doc,
    "14.2  Either Party may terminate this LOI with immediate effect by written notice "
    "if the other Party: (a) commits a material breach of this LOI that is incapable "
    "of remedy; (b) is subject to insolvency, liquidation or administration proceedings; "
    "or (c) undergoes a change of control without the prior written consent of the "
    "non-affected Party.")

# ═══════════════════════════════════════════════════════════════════════════════
# 15. NOTICES
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "15.   NOTICES")
body(doc,
    "All notices under this LOI shall be in writing and delivered by email with "
    "read-receipt confirmation or by registered post to the following addresses:")

notices_tbl = doc.add_table(rows=2, cols=2)
notices_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
notices_tbl.autofit   = False
notices_data = [
    ("Lighthief Cyprus Ltd",
     "28 October Ave 249, Lophitis Business Center 1,\n"
     "Office 201, 3035 Limassol, Cyprus\n"
     "Email: office@lighthief.com\n"
     "Attn: Alexander Papacosta, Managing Director"),
    ("Esperia Energy Group",
     "Attn: Dino Constantinou, Owner\n"
     "Email: [to be inserted]\n"
     "Address: [to be inserted]"),
]
for row_i, (party, details) in enumerate(notices_data):
    lc_n = notices_tbl.rows[row_i].cells[0]
    rc_n = notices_tbl.rows[row_i].cells[1]
    set_cell_bg(lc_n, NAVY_HEX)
    lc_n.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    lnp = lc_n.paragraphs[0]
    lnp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    lnp.paragraph_format.space_before = Pt(4)
    lnp.paragraph_format.space_after  = Pt(4)
    add_run(lnp, party, bold=True, size_pt=9, color=WHITE)
    rnp = rc_n.paragraphs[0]
    rnp.paragraph_format.space_before = Pt(4)
    rnp.paragraph_format.space_after  = Pt(4)
    add_run(rnp, details, size_pt=9, color=BLACK)
lock_table_widths(notices_tbl, [3.5, 10.5])

# ═══════════════════════════════════════════════════════════════════════════════
# 16. GENERAL
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "16.   GENERAL")
body(doc,
    "16.1  Entire Agreement.  This LOI, together with the Galascope EPC and Schedule 1, "
    "constitutes the entire agreement between the Parties with respect to its subject "
    "matter and supersedes all prior discussions, representations and understandings, "
    "whether oral or written.")
body(doc,
    "16.2  Amendments.  This LOI may only be amended by a written instrument signed "
    "by authorised representatives of both Parties.")
body(doc,
    "16.3  Severability.  If any provision of this LOI is held to be invalid or "
    "unenforceable, the remaining provisions shall continue in full force and effect.")
body(doc,
    "16.4  Counterparts.  This LOI may be executed in counterparts, each of which "
    "shall constitute an original, and all of which together shall form a single "
    "instrument. Electronic signatures shall be deemed valid.")
body(doc,
    "16.5  Anti-Bribery.  Each Party warrants that it has not and shall not offer, "
    "pay, accept or authorise any bribe, kickback or improper inducement in connection "
    "with this LOI or any EPC Agreement.")
body(doc,
    "16.6  Force Majeure.  Neither Party shall be liable for delay or failure to "
    "perform its obligations under this LOI to the extent caused by circumstances "
    "beyond its reasonable control (including natural disasters, war, government "
    "action, pandemic or grid-connection moratoria), provided that the affected Party "
    "promptly notifies the other and uses reasonable endeavours to mitigate.")

# ═══════════════════════════════════════════════════════════════════════════════
# NON-BINDING NOTICE BOX
# ═══════════════════════════════════════════════════════════════════════════════
doc.add_paragraph().paragraph_format.space_after = Pt(4)
nb_tbl = doc.add_table(rows=1, cols=1)
nb_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
nb_tbl.autofit   = False
nb_cell = nb_tbl.rows[0].cells[0]
set_cell_bg(nb_cell, AMBER_HEX)
nb_cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
nbp = nb_cell.paragraphs[0]
nbp.paragraph_format.space_before = Pt(6)
nbp.paragraph_format.space_after  = Pt(6)
nbp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
add_run(nbp, "NATURE OF THIS DOCUMENT:  ", bold=True, size_pt=9, color=AMBER_HDR)
add_run(nbp,
    "Save for Clauses 2.3, 9, 10, 11, 12 and 16 which are legally binding on the "
    "Parties, this LOI is a statement of commercial intent and does not constitute "
    "a legally binding obligation to execute EPC Agreements for the Pipeline Projects. "
    "The binding commitment for the Galascope portfolio is contained solely in the "
    "Galascope EPC Agreement (ref. LCY-EPC-GALASCOPE-2026) executed concurrently. "
    "Each Pipeline Project EPC Agreement shall be separately negotiated and executed "
    "and shall become binding only upon signature by both Parties.",
    size_pt=9, color=AMBER_TXT)
lock_table_widths(nb_tbl, [14.0])

# ═══════════════════════════════════════════════════════════════════════════════
# SIGNATURES
# ═══════════════════════════════════════════════════════════════════════════════
h1(doc, "SIGNATURES")
body(doc,
    "IN WITNESS WHEREOF, the authorised representatives of the Parties have executed "
    "this Letter of Intent as of the date first written above.", space_after=10)

sig_tbl = doc.add_table(rows=5, cols=2)
sig_tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
sig_tbl.autofit   = False
sig_data = [
    ("For and on behalf of\nLighthief Cyprus Ltd", "For and on behalf of\nEsperia Energy Group"),
    ("Name:   Alexander Papacosta",          "Name:   ___________________________"),
    ("Title:    Managing Director",           "Title:    ___________________________"),
    ("Signature:   ___________________________", "Signature:   ___________________________"),
    ("Date:   ___________________________",  "Date:   ___________________________"),
]
for row_i, (lt, rt) in enumerate(sig_data):
    lc_s = sig_tbl.rows[row_i].cells[0]
    rc_s = sig_tbl.rows[row_i].cells[1]
    if row_i == 0:
        set_cell_bg(lc_s, NAVY_HEX)
        set_cell_bg(rc_s, NAVY_HEX)
        for cell, txt in ((lc_s, lt), (rc_s, rt)):
            sp2 = cell.paragraphs[0]
            sp2.paragraph_format.space_before = Pt(5)
            sp2.paragraph_format.space_after  = Pt(5)
            add_run(sp2, txt, bold=True, size_pt=9, color=WHITE)
    else:
        for cell, txt in ((lc_s, lt), (rc_s, rt)):
            sp2 = cell.paragraphs[0]
            sp2.paragraph_format.space_before = Pt(7)
            sp2.paragraph_format.space_after  = Pt(7)
            add_run(sp2, txt, size_pt=10, color=BLACK)
lock_table_widths(sig_tbl, [7.0, 7.0])

# ═══════════════════════════════════════════════════════════════════════════════
# FOOTER
# ═══════════════════════════════════════════════════════════════════════════════
doc.add_paragraph().paragraph_format.space_after = Pt(8)
fp = doc.add_paragraph()
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
add_run(fp,
    "Lighthief Cyprus Ltd  \u2502  HE 477423  \u2502  28 October Ave 249, Lophitis Business Center 1, "
    "Office 201, 3035 Limassol, Cyprus\n"
    "office@lighthief.com  \u2502  +357 77 77 00 50  \u2502  solarfarms.cy  \u2502  "
    "Ref: LCY-LOI-ESP-PIPELINE-2026",
    size_pt=7.5, color=GREY)

# ═══════════════════════════════════════════════════════════════════════════════
# SAVE
# ═══════════════════════════════════════════════════════════════════════════════
base         = os.path.join(os.path.dirname(__file__), "..",
                            "docs", "clients", "group-order", "Group2_Esperia_Energy")
contracts_dir = os.path.join(base, "contracts")
os.makedirs(contracts_dir, exist_ok=True)
filename = "LOI-Esperia-Energy-remaining-pipeline-apr2026.docx"

p1 = os.path.join(contracts_dir, filename)
doc.save(p1)
print("Saved -> " + os.path.abspath(p1))

p2 = os.path.join(base, filename)
try:
    doc.save(p2)
    print("Saved -> " + os.path.abspath(p2))
except PermissionError:
    tmp = os.path.join(base, "LOI-Esperia-Pipeline-apr2026-UPDATED.docx")
    doc.save(tmp)
    print("Root file locked by Word - saved as -> " + os.path.abspath(tmp))
    print("Close the old file in Word, then rename.")
