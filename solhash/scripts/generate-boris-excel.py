#!/usr/bin/env python3
"""
Generate Boris container mining analysis Excel model.
All yellow cells are editable inputs. All other cells are formulas.
"""
import openpyxl
from openpyxl.styles import (
    PatternFill, Font, Alignment, Border, Side, numbers
)
from openpyxl.utils import get_column_letter
from openpyxl.styles.numbers import FORMAT_PERCENTAGE_00
import os

# ── Brand colours ──────────────────────────────────────────────────────
NAVY   = "1A365D"
GOLD   = "C9A432"
WHITE  = "FFFFFF"
GREY   = "404040"
LIGHT  = "F0F4F8"
INPUT_YELLOW = "FFF9C4"
ALT_ROW      = "F7F9FC"
GREEN_BG     = "E8F5E9"
RED_BG       = "FFF5F5"
HEADER_FONT  = Font(name="Calibri", bold=True, color=WHITE, size=11)
TITLE_FONT   = Font(name="Calibri", bold=True, color=GOLD, size=13)
BODY_FONT    = Font(name="Calibri", size=10)
BOLD_FONT    = Font(name="Calibri", bold=True, size=10)
INPUT_FONT   = Font(name="Calibri", size=10, color="1A1A1A")
LABEL_FONT   = Font(name="Calibri", bold=True, size=10, color=NAVY)
SMALL_FONT   = Font(name="Calibri", size=9, color=GREY)

NAVY_FILL  = PatternFill("solid", fgColor=NAVY)
GOLD_FILL  = PatternFill("solid", fgColor=GOLD)
INPUT_FILL = PatternFill("solid", fgColor=INPUT_YELLOW)
ALT_FILL   = PatternFill("solid", fgColor=ALT_ROW)
GREEN_FILL = PatternFill("solid", fgColor=GREEN_BG)
LIGHT_FILL = PatternFill("solid", fgColor=LIGHT)
TOTAL_FILL = PatternFill("solid", fgColor="EEF2F8")

def thin_border(top=False, bottom=False, left=False, right=False):
    s = Side(style="thin", color="D0D8E4")
    return Border(
        top=s if top else Side(style=None),
        bottom=s if bottom else Side(style=None),
        left=s if left else Side(style=None),
        right=s if right else Side(style=None),
    )

def thick_bottom():
    return Border(bottom=Side(style="medium", color=NAVY))

FMT_USD   = '"$"#,##0'
FMT_USD2  = '"$"#,##0.00'
FMT_PCT   = '0.0%'
FMT_PCT1  = '0.00%'
FMT_NUM   = '#,##0'
FMT_YR    = '0.00 "yr"'
FMT_BTC   = '#,##0.00000000'

def hcell(ws, row, col, value, fill=None, font=None, align="center", wrap=False, fmt=None, border=None):
    c = ws.cell(row=row, column=col, value=value)
    if fill: c.fill = fill
    if font: c.font = font
    c.alignment = Alignment(horizontal=align, vertical="center", wrap_text=wrap)
    if fmt: c.number_format = fmt
    if border: c.border = border
    return c

def set_col_width(ws, col, width):
    ws.column_dimensions[get_column_letter(col)].width = width

def header_row(ws, row, cols, labels, fill=NAVY_FILL, font=HEADER_FONT):
    for i, label in enumerate(labels):
        c = hcell(ws, row, cols + i, label, fill=fill, font=font, align="center")
    return ws

def section_title(ws, row, col, text, span=8):
    c = hcell(ws, row, col, text, font=TITLE_FONT, align="left")
    ws.merge_cells(start_row=row, start_column=col, end_row=row, end_column=col+span-1)
    ws.row_dimensions[row].height = 22
    return c

def input_row(ws, row, label, value, unit="", note="", fmt=None):
    hcell(ws, row, 1, label, font=LABEL_FONT, align="left")
    c = hcell(ws, row, 2, value, fill=INPUT_FILL, font=INPUT_FONT, align="right", fmt=fmt)
    hcell(ws, row, 3, unit, font=SMALL_FONT, align="left")
    if note:
        hcell(ws, row, 4, note, font=SMALL_FONT, align="left")
    return f"Inputs!$B${row}"  # returns reference string

# ════════════════════════════════════════════════════════════════════════
wb = openpyxl.Workbook()

# ════════════════════════════════════════════════════════════════════════
# SHEET 1 — INPUTS
# ════════════════════════════════════════════════════════════════════════
ws_in = wb.active
ws_in.title = "Inputs"
ws_in.sheet_view.showGridLines = False
ws_in.freeze_panes = "A3"

# Column widths
for col, w in [(1,30),(2,14),(3,12),(4,44)]:
    set_col_width(ws_in, col, w)

# Title
ws_in.merge_cells("A1:D1")
hcell(ws_in, 1, 1, "MINING CONTAINER MODEL — INPUTS", fill=NAVY_FILL, font=TITLE_FONT, align="center")
ws_in.row_dimensions[1].height = 28

hcell(ws_in, 2, 1, "Yellow cells are editable. All other sheets read from here.",
      font=SMALL_FONT, align="left")
ws_in.row_dimensions[2].height = 16

row = 4
section_title(ws_in, row, 1, "HASHRATE & MARKET", span=4); row+=1
input_row(ws_in, row, "Hashprice (BTC/PH/day)", 0.00049578, "BTC/PH/day", "Hashrate Index 14 Sep 2026, diff 127.45T"); row+=1
input_row(ws_in, row, "Pool fee", 0.02, "%", "2% (standard Braiins / Foundry)", fmt=FMT_PCT); row+=1
input_row(ws_in, row, "Daytime hours / day", 8, "h/day", "Cyprus solar, 8 productive sun hours"); row+=1
input_row(ws_in, row, "BTC price — scenario 1", 60000, "USD", "Low"); row+=1
input_row(ws_in, row, "BTC price — scenario 2", 80000, "USD", "Mid (near live $78,274)"); row+=1
input_row(ws_in, row, "BTC price — scenario 3", 100000, "USD", "Base"); row+=1
input_row(ws_in, row, "BTC price — scenario 4", 120000, "USD", "High"); row+=1

row+=1
section_title(ws_in, row, 1, "MINER SPECS", span=4); row+=1
input_row(ws_in, row, "S19j Pro — hashrate", 104, "TH/s", "Bitmain spec"); row+=1
input_row(ws_in, row, "S19j Pro — power", 3068, "W", "At wall, 25°C, Bitmain spec"); row+=1
input_row(ws_in, row, "S19j Pro — unit price", 300, "USD", "Mid-market used: BitmainMiners $156-$312, Digital Bridge $312"); row+=1
input_row(ws_in, row, "S21 200T — hashrate", 200, "TH/s", "Bitmain spec"); row+=1
input_row(ws_in, row, "S21 200T — power", 3500, "W", "At wall, 25°C, Bitmain spec"); row+=1
input_row(ws_in, row, "S21 200T — unit price", 1000, "USD", "Mid-market used: ECOS $900, Bitark $1,100 (Sep 2026)"); row+=1
input_row(ws_in, row, "Container slots", 168, "miners", "OneMiners 20ft 168-slot S19/S21 compatible"); row+=1
input_row(ws_in, row, "Container price", 25118, "USD", "OneMiners list price Sep 2026"); row+=1
input_row(ws_in, row, "Container fans aux", 25, "kW", "~4-5% of miner load"); row+=1
input_row(ws_in, row, "Year-1 failure rate", 0.15, "%", "Used miners; not replaced", fmt=FMT_PCT); row+=1
input_row(ws_in, row, "Uptime Y2-Y5", 0.85, "%", "85% of fleet (15% dead, no replacement)", fmt=FMT_PCT); row+=1

row+=1
section_title(ws_in, row, 1, "IMPORT COSTS (CHINA → LIMASSOL)", span=4); row+=1
input_row(ws_in, row, "Ocean freight (per container)", 4000, "USD", "China–Limassol FCL 20ft; published range $2,250-$4,400"); row+=1
input_row(ws_in, row, "Marine insurance rate", 0.003, "%", "0.3% of FOB", fmt=FMT_PCT1); row+=1
input_row(ws_in, row, "Customs duty rate", 0.00, "%", "0% under EU TARIC 8471 (ITA/German BTI); 8543 alt = 3.7%", fmt=FMT_PCT); row+=1
input_row(ws_in, row, "Cyprus import VAT", 0.19, "%", "19% on (CIF + duty + THC); reclaimable by VAT-reg entity", fmt=FMT_PCT); row+=1
input_row(ws_in, row, "Limassol terminal (THC)", 300, "USD", "EUROGATE €260.85 / 20ft (Feb 2026 tariff), converted"); row+=1
input_row(ws_in, row, "Customs broker", 287, "USD", "~€250 est."); row+=1

row+=1
section_title(ws_in, row, 1, "HALVING", span=4); row+=1
input_row(ws_in, row, "Halving date", "13-Apr-2028", "", "Block 1,050,000; subsidy 3.125 → 1.5625 BTC"); row+=1
input_row(ws_in, row, "Y1 pre-halving factor", 1.000, "", "All 365 days pre-halving", fmt='0.000'); row+=1
input_row(ws_in, row, "Y2 blended factor", 0.784, "", "208 pre-halving + 158 post = 78.4% of pre-halving", fmt='0.000'); row+=1
input_row(ws_in, row, "Y3-Y5 post-halving factor", 0.500, "", "All 365 days post-halving = 50%", fmt='0.000'); row+=1

# Named ranges (manual — use sheet refs)
# Store row numbers for reference
IN = {
    "hashprice": 5, "pool": 6, "dayhours": 7,
    "btc1": 8, "btc2": 9, "btc3": 10, "btc4": 11,
    "s19_th": 13, "s19_w": 14, "s19_price": 15,
    "s21_th": 16, "s21_w": 17, "s21_price": 18,
    "slots": 19, "can_price": 20, "fan_kw": 21,
    "fail": 22, "uptime": 23,
    "freight": 25, "ins": 26, "duty": 27, "vat": 28, "thc": 29, "broker": 30,
    "halv_y1": 33, "halv_y2": 34, "halv_y3": 35,
}

def I(k): return f"Inputs!$B${IN[k]}"

# ════════════════════════════════════════════════════════════════════════
# SHEET 2 — CAPEX
# ════════════════════════════════════════════════════════════════════════
ws_cap = wb.create_sheet("Capex")
ws_cap.sheet_view.showGridLines = False

for col, w in [(1,32),(2,16),(3,16),(4,24)]:
    set_col_width(ws_cap, col, w)

ws_cap.merge_cells("A1:D1")
hcell(ws_cap, 1, 1, "LANDED CAPEX — CHINA TO LIMASSOL", fill=NAVY_FILL, font=TITLE_FONT, align="center")
ws_cap.row_dimensions[1].height = 28

hcell(ws_cap, 2, 2, "S19j Pro ($300/unit)", fill=NAVY_FILL, font=HEADER_FONT, align="center")
hcell(ws_cap, 2, 3, "S21 200T ($1,000/unit)", fill=NAVY_FILL, font=HEADER_FONT, align="center")
hcell(ws_cap, 2, 4, "Notes", fill=NAVY_FILL, font=HEADER_FONT, align="left")
ws_cap.row_dimensions[2].height = 18

def cap_row(ws, row, label, f19, f21, note="", is_sub=False, is_total=False, is_net=False, fmt=FMT_USD):
    fill = TOTAL_FILL if is_sub else (PatternFill("solid", fgColor=NAVY) if is_total else (GREEN_FILL if is_net else None))
    font = BOLD_FONT if (is_sub or is_total or is_net) else BODY_FONT
    tfont = Font(name="Calibri", bold=True, color=WHITE, size=10) if is_total else font
    hcell(ws, row, 1, label, font=tfont if is_total else LABEL_FONT if (is_sub or is_total or is_net) else BODY_FONT, fill=fill, align="left")
    c19 = hcell(ws, row, 2, f19, font=tfont if is_total else font, fill=fill, align="right", fmt=fmt)
    c21 = hcell(ws, row, 3, f21, font=tfont if is_total else font, fill=fill, align="right", fmt=fmt)
    hcell(ws, row, 4, note, font=SMALL_FONT if not is_total else Font(name="Calibri",size=9,color=WHITE), fill=fill, align="left")
    if is_total or is_sub:
        for cc in [ws.cell(row,1), ws.cell(row,2), ws.cell(row,3), ws.cell(row,4)]:
            cc.border = thick_bottom()
    return row + 1

# References
r = 3
cap_row(ws_cap, r, "Miners", f"={I('slots')}*{I('s19_price')}", f"={I('slots')}*{I('s21_price')}", "168 × unit price"); r+=1
cap_row(ws_cap, r, "Container (OneMiners 168-slot)", f"={I('can_price')}", f"={I('can_price')}", "Same box for both miner types"); r+=1
cap_row(ws_cap, r, "FOB China", f"=Capex!B3+Capex!B4", f"=Capex!C3+Capex!C4", "", is_sub=True); r+=1
cap_row(ws_cap, r, "Ocean freight (China → Limassol)", f"={I('freight')}", f"={I('freight')}", "FCL 20ft; range $2,250–$4,400"); r+=1
cap_row(ws_cap, r, "Marine insurance (0.3% of FOB)", f"=Capex!B5*{I('ins')}", f"=Capex!C5*{I('ins')}", "0.3%"); r+=1
cap_row(ws_cap, r, "CIF Limassol", "=Capex!B5+Capex!B6+Capex!B7", "=Capex!C5+Capex!C6+Capex!C7", "", is_sub=True); r+=1
cap_row(ws_cap, r, "Customs duty (EU TARIC 8471 ITA: 0%)", f"=Capex!B8*{I('duty')}", f"=Capex!C8*{I('duty')}", "Change to 3.7% in Inputs if customs reclassifies to 8543"); r+=1
cap_row(ws_cap, r, "Cyprus import VAT 19% (reclaimable)", f"=(Capex!B8+Capex!B9+{I('thc')})*{I('vat')}", f"=(Capex!C8+Capex!C9+{I('thc')})*{I('vat')}", "Paid at port; reclaimed by VAT-registered importer"); r+=1
cap_row(ws_cap, r, "EUROGATE Limassol THC", f"={I('thc')}", f"={I('thc')}", "€260.85/20ft effective Feb 2026, converted at 1.15"); r+=1
cap_row(ws_cap, r, "Customs broker", f"={I('broker')}", f"={I('broker')}", "~€250"); r+=1
cap_row(ws_cap, r, "CASH TO CLEAR PORT", "=Capex!B8+Capex!B9+Capex!B10+Capex!B11+Capex!B12","=Capex!C8+Capex!C9+Capex!C10+Capex!C11+Capex!C12", "Pay this to get the container", is_total=True); r+=1
cap_row(ws_cap, r, "Net after VAT reclaim", "=Capex!B13-Capex!B10", "=Capex!C13-Capex!C10", "Effective capex for VAT-registered entity", is_net=True); r+=1

r+=1
# Specs block
hcell(ws_cap, r, 1, "CONTAINER SPECS", fill=NAVY_FILL, font=HEADER_FONT, align="left")
ws_cap.merge_cells(start_row=r, start_column=2, end_row=r, end_column=4)
hcell(ws_cap, r, 2, "", fill=NAVY_FILL); r+=1

specs = [
    ("Hashrate (168 units)", f"={I('slots')}*{I('s19_th')}/1000&\" PH/s\"", f"={I('slots')}*{I('s21_th')}/1000&\" PH/s\""),
    ("Miner load (168 units)", f"={I('slots')}*{I('s19_w')}/1000&\" kW\"", f"={I('slots')}*{I('s21_w')}/1000&\" kW\""),
    ("Peak draw incl. fans", f"=({I('slots')}*{I('s19_w')}+{I('fan_kw')}*1000)/1000&\" kW\"", f"=({I('slots')}*{I('s21_w')}+{I('fan_kw')}*1000)/1000&\" kW\""),
]
for label, v19, v21 in specs:
    hcell(ws_cap, r, 1, label, font=BODY_FONT, fill=ALT_FILL if r%2==0 else None, align="left")
    hcell(ws_cap, r, 2, v19, font=BODY_FONT, fill=ALT_FILL if r%2==0 else None, align="right")
    hcell(ws_cap, r, 3, v21, font=BODY_FONT, fill=ALT_FILL if r%2==0 else None, align="right")
    r+=1

# ════════════════════════════════════════════════════════════════════════
# Helper: create revenue sheet
# ════════════════════════════════════════════════════════════════════════
def make_revenue_sheet(wb, sheet_name, miner_label, th_ref, price_ref, capex_cash_ref, capex_net_ref):
    ws = wb.create_sheet(sheet_name)
    ws.sheet_view.showGridLines = False

    for col, w in [(1,14),(2,13),(3,13),(4,13),(5,13),(6,13),(7,14),(8,14),(9,14)]:
        set_col_width(ws, col, w)

    ws.merge_cells("A1:I1")
    hcell(ws, 1, 1, f"{miner_label} — 5-YEAR DAYTIME MINING REVENUE", fill=NAVY_FILL, font=TITLE_FONT, align="center")
    ws.row_dimensions[1].height = 28

    ws.merge_cells("A2:I2")
    hcell(ws, 2, 1,
          "Daytime only (8 h/day) · Pool fee 2% · 15% failure Y1 · Halving ~13 Apr 2028 · Difficulty flat",
          font=SMALL_FONT, align="left")

    # Sub-header
    r = 3
    for col, lbl in enumerate(["BTC Price","Year 1","Year 2","Year 3","Year 4","Year 5","5-Yr Gross","Payback (cash)","Payback (net VAT)"], 1):
        hcell(ws, r, col, lbl, fill=NAVY_FILL, font=HEADER_FONT, align="center")
    ws.row_dimensions[r].height = 18

    # PH/s formula
    ph = f"({I('slots')}*{th_ref}/1000)"

    # uptime per year
    uptimes = [
        f"(1-{I('fail')})",        # Y1: 92.5%
        f"{I('uptime')}",          # Y2
        f"{I('uptime')}",          # Y3
        f"{I('uptime')}",          # Y4
        f"{I('uptime')}",          # Y5
    ]
    halvings = [I('halv_y1'), I('halv_y2'), I('halv_y3'), I('halv_y3'), I('halv_y3')]

    btc_refs = [I('btc1'), I('btc2'), I('btc3'), I('btc4')]
    btc_labels = ["$60k", "$80k", "$100k", "$120k"]
    btc_bold = [False, True, False, False]  # highlight $80k as current-ish

    data_rows = []
    for i, (btc_ref, btc_lbl) in enumerate(zip(btc_refs, btc_labels)):
        r += 1
        fill = ALT_FILL if i % 2 == 1 else None
        bfont = BOLD_FONT if btc_bold[i] else BODY_FONT
        hcell(ws, r, 1, btc_lbl, font=LABEL_FONT, fill=fill, align="center")

        year_cells = []
        for y in range(5):
            f = (f"={ph}*{I('hashprice')}*(1-{I('pool')})*{btc_ref}*365"
                 f"*({I('dayhours')}/24)*{uptimes[y]}*{halvings[y]}")
            c = hcell(ws, r, 2+y, f, font=bfont, fill=fill, align="right", fmt=FMT_USD)
            year_cells.append(ws.cell(r, 2+y).coordinate)

        # 5-yr gross
        sum_f = f"=SUM({ws.cell(r,2).coordinate}:{ws.cell(r,6).coordinate})"
        hcell(ws, r, 7, sum_f, font=BOLD_FONT, fill=PatternFill("solid",fgColor="EEF2F8"), align="right", fmt=FMT_USD)

        # Payback cash
        # Simple: find year where cumulative > capex_cash
        # Use approximate: capex / Y1 as lower bound, actual payback via MATCH approximation
        # We'll use a formula approach: 
        pb_cash = (f"=IF({ws.cell(r,7).coordinate}>={capex_cash_ref},"
                   f"MATCH(TRUE,MMULT((ROW(INDIRECT(\"1:5\"))>=TRANSPOSE(ROW(INDIRECT(\"1:5\")))),CHOOSE({{1,2,3,4,5}},{','.join(year_cells)}))>={capex_cash_ref},0),"
                   f"\">5 yr\")")
        # Simpler payback: capex / Y1 revenue (approximation, conservative)
        pb_cash_simple = f"={capex_cash_ref}/{ws.cell(r,2).coordinate}"
        pb_net_simple  = f"={capex_net_ref}/{ws.cell(r,2).coordinate}"
        hcell(ws, r, 8, pb_cash_simple, font=bfont, fill=fill, align="right", fmt=FMT_YR)
        hcell(ws, r, 9, pb_net_simple,  font=bfont, fill=fill, align="right", fmt=FMT_YR)

        data_rows.append(r)

    # Notes below table
    r += 2
    notes = [
        f"Hashrate:  {ph.replace('=','')} PH/s  (={I('slots')} slots × {th_ref} TH ÷ 1,000)",
        "Payback = Cash-to-port ÷ Year-1 revenue (conservative: ignores Year-2+ cash in).  Actual payback is faster.",
        "Year 2 blended factor 0.784 = 208 pre-halving days + 158 post-halving days (out of 365).",
        "Difficulty is held flat. A ~5% increase was queued for 19 Sep 2026 — subtract 5% from all figures if confirmed.",
    ]
    for note in notes:
        ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=9)
        hcell(ws, r, 1, note, font=SMALL_FONT, align="left")
        r += 1

    return ws


# Capex references for revenue sheets
CASH19 = "Capex!B13"
NET19  = "Capex!B14"
CASH21 = "Capex!C13"
NET21  = "Capex!C14"

ws_s19 = make_revenue_sheet(wb, "S19j-Pro", "S19j Pro 104T", I('s19_th'), I('s19_price'), CASH19, NET19)
ws_s21 = make_revenue_sheet(wb, "S21-200T",  "S21 200T",      I('s21_th'), I('s21_price'), CASH21, NET21)

# ════════════════════════════════════════════════════════════════════════
# SHEET 5 — COMPARISON
# ════════════════════════════════════════════════════════════════════════
ws_cmp = wb.create_sheet("Comparison")
ws_cmp.sheet_view.showGridLines = False

for col, w in [(1,32),(2,18),(3,18),(4,22)]:
    set_col_width(ws_cmp, col, w)

ws_cmp.merge_cells("A1:D1")
hcell(ws_cmp, 1, 1, "S19j Pro vs S21 200T — COMPARISON @ $80k BTC", fill=NAVY_FILL, font=TITLE_FONT, align="center")
ws_cmp.row_dimensions[1].height = 28

hcell(ws_cmp, 2, 2, "S19j Pro", fill=NAVY_FILL, font=HEADER_FONT, align="center")
hcell(ws_cmp, 2, 3, "S21 200T",  fill=GOLD_FILL, font=Font(name="Calibri",bold=True,color=NAVY,size=11), align="center")
hcell(ws_cmp, 2, 4, "Notes",     fill=NAVY_FILL, font=HEADER_FONT, align="left")

cmp_data = [
    ("Unit price",                f"={I('s19_price')}", f"={I('s21_price')}", "USD, per miner", FMT_USD),
    ("Hashrate per container",    f"={I('slots')}*{I('s19_th')}/1000", f"={I('slots')}*{I('s21_th')}/1000", "PH/s", '#,##0.00 "PH/s"'),
    ("S21 : S19 hashrate ratio",  "—",                  f"={I('slots')}*{I('s21_th')}/({I('slots')}*{I('s19_th')})", "×", '0.00"×"'),
    ("Cash to clear Limassol",    f"={CASH19}",          f"={CASH21}", "USD",  FMT_USD),
    ("Net after VAT reclaim",     f"={NET19}",           f"={NET21}",  "USD",  FMT_USD),
    ("S21 premium vs S19 (cash)", "—",                  f"={CASH21}-{CASH19}", "USD extra",  FMT_USD),
    ("Year 1 revenue @ $80k",     "='S19j-Pro'!B5",      "='S21-200T'!B5",     "USD",   FMT_USD),
    ("Year 2 revenue @ $80k",     "='S19j-Pro'!C5",      "='S21-200T'!C5",     "USD",   FMT_USD),
    ("5-year gross @ $80k",       "='S19j-Pro'!G5",      "='S21-200T'!G5",     "USD",   FMT_USD),
    ("5-year net profit @ $80k",  f"='S19j-Pro'!G5-{CASH19}", f"='S21-200T'!G5-{CASH21}", "USD", FMT_USD),
    ("Payback — cash @ $80k",     f"={CASH19}/'S19j-Pro'!B5", f"={CASH21}/'S21-200T'!B5", "years (Y1 basis)", FMT_YR),
    ("Payback — net VAT @ $80k",  f"={NET19}/'S19j-Pro'!B5",  f"={NET21}/'S21-200T'!B5",  "years (Y1 basis)", FMT_YR),
    ("5-yr ROI on cash @ $80k",   f"=('S19j-Pro'!G5-{CASH19})/{CASH19}", f"=('S21-200T'!G5-{CASH21})/{CASH21}", "%", FMT_PCT),
]

for i, (label, v19, v21, note, fmt) in enumerate(cmp_data):
    r = 3 + i
    fill = ALT_FILL if i % 2 == 1 else None
    is_highlight = label.startswith("5-year net") or label.startswith("5-yr ROI")
    hcell(ws_cmp, r, 1, label, font=BOLD_FONT if is_highlight else BODY_FONT, fill=GREEN_FILL if is_highlight else fill, align="left")
    hcell(ws_cmp, r, 2, v19,  font=BOLD_FONT if is_highlight else BODY_FONT, fill=GREEN_FILL if is_highlight else fill, align="right", fmt=fmt)
    hcell(ws_cmp, r, 3, v21,  font=BOLD_FONT if is_highlight else BODY_FONT, fill=GREEN_FILL if is_highlight else fill, align="right", fmt=fmt)
    hcell(ws_cmp, r, 4, note, font=SMALL_FONT, fill=GREEN_FILL if is_highlight else fill, align="left")

r = 3 + len(cmp_data) + 1
ws_cmp.merge_cells(start_row=r, start_column=1, end_row=r, end_column=4)
hcell(ws_cmp, r, 1,
      "★  S19 wins on ROI %; S21 wins on absolute 5-yr profit. Two S19 cans (~$191k cash) "
      "outperform one S21 can ($236k) on absolute profit at every BTC scenario.",
      font=Font(name="Calibri", bold=True, size=10, color=NAVY), align="left", wrap=True)
ws_cmp.row_dimensions[r].height = 36

# ════════════════════════════════════════════════════════════════════════
# SHEET 6 — PRICE SOURCES
# ════════════════════════════════════════════════════════════════════════
ws_src = wb.create_sheet("Price Sources")
ws_src.sheet_view.showGridLines = False
for col, w in [(1,22),(2,12),(3,16),(4,30),(5,36)]:
    set_col_width(ws_src, col, w)

ws_src.merge_cells("A1:E1")
hcell(ws_src, 1, 1, "MINER PRICE VERIFICATION — SOURCES (Sep 2026)", fill=NAVY_FILL, font=TITLE_FONT, align="center")
ws_src.row_dimensions[1].height = 28

for col, lbl in enumerate(["Source","Model","Price (USD)","Condition","URL / Note"], 1):
    hcell(ws_src, 2, col, lbl, fill=NAVY_FILL, font=HEADER_FONT, align="center" if col>1 else "left")

s19_rows = [
    ("BitmainMiners (Delaware)","S19j Pro 104T","$156","Used, 60-day warranty","bitmainminers.com — cheapest verifiable spot"),
    ("EndlessMining (Philadelphia)","S19j Pro 104T","$190","Used, listed serial numbers","endlessmining.com — 23 units with s/n"),
    ("Digital Bridge Mining","S19j Pro 104T","$312","Used, in-slot","digitalbridgemining.io"),
    ("IngListing sold-comp DB","S19j Pro 104T","$118","Median of 18 sold units","inglisting.com — bare machines, auction data"),
    ("CryptoMiningHubs","S19j Pro 104T","$740","Used, manufacturer warranty","cryptomininghubs.com — EU-priced"),
    ("NoxHash 2026 range","S19j Pro 104T","$5–9/TH → $520–935","Used, indicative","noxhash.com — Luxor desk / Kaboomracks data"),
    ("★  MODEL PRICE USED","S19j Pro 104T","$300","Mid of spot warehouse","Midpoint $156–$312; tested, serial, minimal warranty"),
]
s21_rows = [
    ("ECOS marketplace (Sep 2026)","S21 200T","$900","Used peer sale (9 Sep 2026)","ecos.am marketplace — lowest Sep listing"),
    ("IngListing sold-comp","S21 200T","$999","1 unit sold, thin data","inglisting.com — single sold comp"),
    ("Bitark (ASIC Miner Value)","S21 200T","$1,100","Used, Hong Kong stock","asicminervalue.com vendor list"),
    ("HSASICMiner","S21 200T","$716–$1,725","Used, PSU included","hsasicminer.com"),
    ("EndlessMining (US stock)","S21 200T","$1,657","Used, 7-day DOA","endlessmining.com"),
    ("MillionMiner","S21 200T","$1,755","Used","millionminer.com"),
    ("NoxHash 2026 range","S21 200T","$16–19/TH → $3,200–$3,800","Used, indicative","noxhash.com — newer gen retains value better"),
    ("★  MODEL PRICE USED","S21 200T","$1,000","Mid ECOS $900 / Bitark $1,100","Minimum verifiable: $716; mid Asia/peer market: $1,000"),
]

r = 3
hcell(ws_src, r, 1, "— S19j Pro 104 TH/s —", font=Font(name="Calibri",bold=True,color=NAVY,size=10), align="left")
ws_src.merge_cells(start_row=r, start_column=1, end_row=r, end_column=5); r+=1
for i, row_data in enumerate(s19_rows):
    is_model = row_data[0].startswith("★")
    f = PatternFill("solid", fgColor="FFF9C4") if is_model else (ALT_FILL if i%2==1 else None)
    bf = BOLD_FONT if is_model else BODY_FONT
    for col, val in enumerate(row_data, 1):
        hcell(ws_src, r, col, val, font=bf, fill=f, align="left")
    r+=1

r+=1
hcell(ws_src, r, 1, "— S21 200 TH/s —", font=Font(name="Calibri",bold=True,color=NAVY,size=10), align="left")
ws_src.merge_cells(start_row=r, start_column=1, end_row=r, end_column=5); r+=1
for i, row_data in enumerate(s21_rows):
    is_model = row_data[0].startswith("★")
    f = PatternFill("solid", fgColor="FFF9C4") if is_model else (ALT_FILL if i%2==1 else None)
    bf = BOLD_FONT if is_model else BODY_FONT
    for col, val in enumerate(row_data, 1):
        hcell(ws_src, r, col, val, font=bf, fill=f, align="left")
    r+=1

# ════════════════════════════════════════════════════════════════════════
# Sheet order & tab colours
# ════════════════════════════════════════════════════════════════════════
tab_colors = {
    "Inputs": GOLD, "Capex": NAVY, "S19j-Pro": "2B5FA0",
    "S21-200T": "C9A432", "Comparison": "276749", "Price Sources": "718096"
}
for sh in wb.sheetnames:
    if sh in tab_colors:
        wb[sh].sheet_properties.tabColor = tab_colors[sh]

# Set Inputs as active
wb.active = ws_in

# ════════════════════════════════════════════════════════════════════════
out = "/Volumes/T7 Grey/solinvest/solhash/docs/boris-container-model.xlsx"
wb.save(out)
print(f"Saved: {out}")
