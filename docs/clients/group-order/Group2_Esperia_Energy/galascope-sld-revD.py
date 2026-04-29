"""
Galascope BESS — SLD Generator Rev D
Lighthief Cyprus Ltd  |  April 2026

Generates TWO versions per site:
  (A) Cypriot/ABIO style  — matches Iacovos Charalambous drawings, accepted by EAC DSO
       - Single circle transformer
       - CB+T-blade disconnector symbol
       - RMU as labelled rectangle
       - LV metering CT shown inside skid
       - Simple inline labels
       - "NEW RMU" box style

  (B) IEC 60617 engineering style — for Linyang/Kehua technical review
       - Two tangent circles transformer (Dy11)
       - Separate CB and DS blocks
       - CT (5P20) in JZ panel explicitly shown
       - Protection relay panel
       - Detailed annotation zones

Drawing numbers:
  G1 (5MW):   LC-G1-SLD-001-D  (Cypriot) / LC-G1-SLD-001-D-IEC  (IEC)
  G2 (2.5MW): LC-G2-SLD-001-D  (Cypriot) / LC-G2-SLD-001-D-IEC  (IEC)

Rev D changes from Rev C:
  - Configuration confirmed: G1=T4+4xBESS, G2=T2+2xBESS
  - Container size confirmed: 5.015 MWh
  - EOA submitted 28/04/2026 (Architect: Andreas Papaiacovou)
  - Earthworks scope: client (Dino Constantinou) confirmed
  - NER grounding confirmed (IT retrofit per April 2026 DSO Annex IV)
  - DELTAH role: Lighthief Cyprus Ltd
"""

import ezdxf
from ezdxf.enums import TextEntityAlignment
import math

OUTPUT_DIR = r"c:\Users\alexa\code\solinvest\docs\clients\group-order\Group2_Esperia_Energy"

# ─── LAYERS ───────────────────────────────────────────────────────────────────
def setup(doc):
    for name, col, lw in [
        ("MV",      1, 50),   # red    22kV
        ("LV",      2, 35),   # yellow 690V
        ("CTRL",    4, 18),   # cyan   control
        ("SYM",     7, 35),   # white  symbols
        ("ANN",     8, 18),   # grey   annotations
        ("BNDRY",   3, 18),   # green  boundary
        ("FRAME",   7, 50),   # frame
        ("TITLE",   7, 25),   # title block
        ("DIM",     8, 13),   # dims/notes
        ("RMU",     5, 35),   # magenta  RMU box
    ]:
        lay = doc.layers.new(name=name, dxfattribs={"color": col})
        lay.dxf.lineweight = lw
    doc.linetypes.add("DASHED2", pattern="A,.4,-.2", description="Dashed2")
    doc.linetypes.add("DASH3",   pattern="A,.3,-.15,.05,-.15", description="Dash3")

TH = {"xs": 1.8, "sm": 2.2, "md": 3.0, "lg": 4.0, "xl": 5.5}

def T(msp, text, x, y, h="sm", layer="ANN", align=TextEntityAlignment.LEFT):
    e = msp.add_text(text, dxfattribs={"layer": layer, "height": TH[h]})
    e.set_placement((x, y), align=align)

def L(msp, x1, y1, x2, y2, layer="SYM", lw=None, lt=None):
    att = {"layer": layer}
    if lw: att["lineweight"] = lw
    if lt: att["linetype"]  = lt
    return msp.add_line((x1, y1), (x2, y2), dxfattribs=att)

def R(msp, x, y, w, h, layer="SYM", lw=None, lt=None):
    att = {"layer": layer}
    if lw: att["lineweight"] = lw
    if lt: att["linetype"]  = lt
    return msp.add_lwpolyline(
        [(x, y),(x+w, y),(x+w, y+h),(x, y+h)], close=True, dxfattribs=att)

def title_block(msp, cfg, style="cypriot"):
    x0, y0, W, H = 10, 10, 400, 38
    R(msp, x0, y0, W, H, layer="FRAME", lw=50)
    for xf in [0.28, 0.55, 0.74]:
        xv = x0 + W*xf
        L(msp, xv, y0, xv, y0+H, layer="FRAME")
    ym = y0 + H/2
    L(msp, x0, ym, x0+W, ym, layer="FRAME")

    def cell(text, tx, ty, ht="sm"):
        T(msp, text, tx, ty, h=ht, layer="TITLE")

    cell("Client:", x0+2, y0+H-3.5, "xs")
    cell(cfg["client"], x0+2, y0+H-8, "sm")
    cell("Project:", x0+2, ym+1, "xs")
    cell(cfg["project"], x0+2, ym-5, "sm")

    cell("Title:", x0+W*0.28+2, y0+H-3.5, "xs")
    cell(cfg["title"], x0+W*0.28+2, y0+H-8, "sm")
    cell("Drawing No.:", x0+W*0.28+2, ym+1, "xs")
    cell(cfg["drwno"], x0+W*0.28+2, ym-5, "sm")

    cell("Design firm:", x0+W*0.55+2, y0+H-3.5, "xs")
    cell("Lighthief Cyprus Ltd", x0+W*0.55+2, y0+H-8, "sm")
    cell("DELTAH:", x0+W*0.55+2, ym+1, "xs")
    cell("Lighthief Cyprus Ltd", x0+W*0.55+2, ym-5, "xs")

    cell("Rev.:", x0+W*0.74+2, y0+H-3.5, "xs")
    cell("D", x0+W*0.74+2, y0+H-9, "lg")
    cell("Date:", x0+W*0.74+2, ym+1, "xs")
    cell(cfg["date"], x0+W*0.74+2, ym-5, "sm")
    cell("Sheet: 1 of 1", x0+W*0.74+2, y0+2, "xs")

    T(msp, "LIGHTHIEF", x0+2, y0+5, h="xl", layer="TITLE")
    T(msp, "CYPRUS LTD", x0+2, y0+1.5, h="xs", layer="TITLE")

    # Standard badge
    std = "IEC 60617" if style == "iec" else "EAC/Cyprus Conv."
    T(msp, std, x0+W*0.55+2, y0+2, h="xs", layer="DIM")

# ═══════════════════════════════════════════════════════════════════
#  VERSION A — Cypriot/ABIO Style
#  Matches Iacovos Charalambous drawings, acceptable to EAC DSO
# ═══════════════════════════════════════════════════════════════════

def cypriot_cb_blade(msp, cx, y_top, layer="SYM"):
    """Cypriot CB+Disconnector combined symbol (T-blade over box+X)"""
    # Disconnector blade (T-shape, open position diagonal)
    L(msp, cx, y_top, cx, y_top-4, layer=layer)
    L(msp, cx-3, y_top-1, cx+3, y_top-1, layer=layer)  # top contact bar
    L(msp, cx, y_top-1, cx+4, y_top-6, layer=layer)    # blade diagonal
    L(msp, cx+4, y_top-6, cx+4, y_top-8, layer=layer)  # bottom contact
    # CB box with X below blade
    box_y = y_top - 16
    R(msp, cx-4, box_y, 8, 8, layer=layer, lw=25)
    L(msp, cx-4, box_y, cx+4, box_y+8, layer=layer)
    L(msp, cx+4, box_y, cx-4, box_y+8, layer=layer)
    # small I> label
    T(msp, "I>", cx+5, box_y+3, h="xs", layer="ANN")
    return box_y  # return bottom of CB

def cypriot_tx_single(msp, cx, cy, label_lines, layer="SYM"):
    """Single circle transformer (Cypriot/British convention)"""
    r = 8
    msp.add_circle((cx, cy), r, dxfattribs={"layer": layer, "lineweight": 40})
    msp.add_circle((cx, cy), 3, dxfattribs={"layer": layer})  # inner dot
    L(msp, cx, cy+r, cx, cy+r+4, layer="MV", lw=50)
    L(msp, cx, cy-r, cx, cy-r-4, layer="LV", lw=50)
    for i, ln in enumerate(label_lines):
        T(msp, ln, cx + r + 3, cy + 3 - i*4.5, h="xs", layer="ANN")

def cypriot_acb(msp, cx, y_top, label, layer="SYM"):
    """ACB symbol — box+X"""
    h, w = 9, 7
    R(msp, cx-w/2, y_top-h, w, h, layer=layer, lw=25)
    L(msp, cx-w/2, y_top-h, cx+w/2, y_top, layer=layer)
    L(msp, cx+w/2, y_top-h, cx-w/2, y_top, layer=layer)
    T(msp, label, cx, y_top-h-4, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)
    return y_top - h

def cypriot_lv_ct(msp, cx, y, layer="SYM"):
    """Small CT on LV side (metering, inside skid)"""
    msp.add_circle((cx, y), 2.5, dxfattribs={"layer": layer})
    T(msp, "CT", cx+3.5, y+0.5, h="xs", layer="ANN")

def draw_cypriot(cfg):
    """Draw complete SLD in Cypriot/ABIO style"""
    doc = ezdxf.new("R2010")
    doc.header["$INSUNITS"] = 4
    doc.header["$LIMMAX"] = (420, 297)
    setup(doc)
    msp = doc.modelspace()

    # ── A3 frame ────────────────────────────────────────────────
    R(msp, 0, 0, 420, 297, layer="FRAME", lw=70)
    R(msp, 10, 48, 400, 239, layer="FRAME", lw=40)
    title_block(msp, cfg, style="cypriot")

    n    = cfg["n_bess"]
    cx   = 210.0
    BW   = 40
    BGAP = 12
    total_w = n * BW + (n-1)*BGAP
    bx0  = cx - total_w/2

    TOP  = 285
    TB   = 48

    # ── Y-levels ────────────────────────────────────────────────
    Y_grid     = TOP - 10
    Y_bndry    = TOP - 28
    Y_mvbus    = TOP - 42
    Y_rmu_top  = Y_mvbus - 5
    Y_rmu_bot  = Y_mvbus - 24
    Y_tx_ctr   = Y_rmu_bot - 26
    Y_lv_bus   = Y_tx_ctr - 26
    Y_main_acb = Y_lv_bus - 20
    Y_br_bus   = Y_main_acb - 15
    Y_bess_top = Y_br_bus  - 18
    Y_bess_ht  = 30
    Y_bess_bot = Y_bess_top - Y_bess_ht

    jz_name = "JZ5" if n == 4 else "JZ4"

    # ── Existing RMU + grid ──────────────────────────────────────
    ex_x = cx - 55
    # Existing RMU box
    R(msp, ex_x-22, Y_rmu_top-18, 44, 18+10, layer="RMU", lw=25, lt="DASHED2")
    T(msp, "Existing RMU", ex_x, Y_rmu_top+4, h="xs", layer="RMU",
      align=TextEntityAlignment.MIDDLE_CENTER)
    T(msp, f"Grid {cfg['trafo_hv']:.0f}kV", ex_x, Y_grid, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)
    # Arrow up to grid
    L(msp, ex_x, Y_grid, ex_x, Y_rmu_top, layer="MV", lw=50)
    L(msp, ex_x, Y_grid, ex_x-3, Y_grid-7, layer="MV")
    L(msp, ex_x, Y_grid, ex_x+3, Y_grid-7, layer="MV")
    # Existing CB in existing RMU
    L(msp, ex_x, Y_rmu_top, ex_x, Y_rmu_top-4, layer="MV")
    cb_bot = cypriot_cb_blade(msp, ex_x, Y_rmu_top-4, layer="SYM")
    T(msp, "existing", ex_x+5, Y_rmu_top-12, h="xs", layer="DIM")
    # Existing MV cable + PV park
    L(msp, ex_x, cb_bot, ex_x, Y_rmu_bot, layer="MV")
    R(msp, ex_x-15, Y_rmu_bot-18, 30, 18, layer="SYM")
    T(msp, "Existing PV", ex_x, Y_rmu_bot-6, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)
    T(msp, cfg.get("pv_label","PV Park"), ex_x, Y_rmu_bot-12, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)

    # ── DSO/Private boundary ────────────────────────────────────
    L(msp, 15, Y_bndry, 405, Y_bndry, layer="BNDRY", lw=18, lt="DASHED2")
    T(msp, "DSO Area of Responsibility",    15, Y_bndry+4, h="xs", layer="BNDRY")
    T(msp, "Private Area of Responsibility", 15, Y_bndry-6, h="xs", layer="BNDRY")

    # ── NEW RMU box (BESS feeder panel) ─────────────────────────
    rmu_xl = cx - 30
    rmu_xr = cx + 30
    R(msp, rmu_xl, Y_rmu_bot, rmu_xr-rmu_xl, Y_rmu_top-Y_rmu_bot,
      layer="RMU", lw=35)
    T(msp, f"NEW RMU  ({jz_name})", cx, Y_rmu_top+3, h="sm", layer="RMU",
      align=TextEntityAlignment.MIDDLE_CENTER)
    T(msp, f"{cfg['trafo_hv']:.0f}kV", cx-20, Y_rmu_top-5, h="xs", layer="ANN")

    # Grid arrow → New RMU
    L(msp, cx, Y_grid, cx, Y_rmu_top, layer="MV", lw=50)
    L(msp, cx, Y_grid, cx-3, Y_grid-7, layer="MV")
    L(msp, cx, Y_grid, cx+3, Y_grid-7, layer="MV")
    T(msp, f"Grid {cfg['trafo_hv']:.0f}kV", cx+4, Y_grid, h="xs", layer="ANN")

    # MV connection from existing RMU to new RMU (horizontal at Y_mvbus)
    L(msp, ex_x, Y_mvbus, cx - 30, Y_mvbus, layer="MV", lw=40, lt="DASHED2")
    T(msp, f"new MV cable {cfg['mv_cable_len']:.0f}m", (ex_x+cx-30)/2, Y_mvbus+3,
      h="xs", layer="DIM", align=TextEntityAlignment.MIDDLE_CENTER)

    # CB inside new RMU
    cb_bot2 = cypriot_cb_blade(msp, cx, Y_rmu_top-2, layer="SYM")
    T(msp, "new", cx+8, Y_rmu_top-12, h="xs", layer="ANN")

    # Drop from RMU to transformer
    L(msp, cx, cb_bot2, cx, Y_tx_ctr+9, layer="MV", lw=50)

    # ── Transformer ──────────────────────────────────────────────
    cypriot_tx_single(msp, cx, Y_tx_ctr, [
        f"{cfg['trafo_kva']:.0f}kVA",
        f"{cfg['trafo_hv']:.0f}/{cfg['trafo_lv']*1000:.0f}V",
    ])

    # ── LV CT (metering, inside skid) ───────────────────────────
    cypriot_lv_ct(msp, cx+12, Y_tx_ctr - 16)

    # ── NER annotation ──────────────────────────────────────────
    T(msp, "NER 25Ohm (Annex IV - IT retrofit)", cx+20, Y_lv_bus+2, h="xs", layer="DIM")

    # ── 690V LV Bus ──────────────────────────────────────────────
    lv_xl = bx0 + BW/2 - 8
    lv_xr = bx0 + total_w - BW/2 + 8
    L(msp, cx, Y_tx_ctr-9, cx, Y_lv_bus, layer="LV", lw=50)
    L(msp, lv_xl, Y_lv_bus, lv_xr, Y_lv_bus, layer="LV", lw=60)
    T(msp, f"{cfg['trafo_lv']*1000:.0f}V", lv_xl-3, Y_lv_bus+2, h="xs", layer="ANN")

    # ── Main ACB ─────────────────────────────────────────────────
    L(msp, cx, Y_lv_bus, cx, Y_main_acb + 9, layer="LV", lw=50)
    acb_bot = cypriot_acb(msp, cx, Y_main_acb + 9, f"{cfg['acb_m_a']:.0f}A ACB")

    # ── Branch bus ───────────────────────────────────────────────
    L(msp, cx, acb_bot, cx, Y_br_bus, layer="LV", lw=40)
    L(msp, bx0+BW/2, Y_br_bus, bx0+total_w-BW/2, Y_br_bus, layer="LV", lw=35)

    # ── BESS containers ──────────────────────────────────────────
    for i in range(n):
        bx  = bx0 + i*(BW+BGAP)
        bcx = bx + BW/2
        L(msp, bcx, Y_br_bus, bcx, Y_bess_top, layer="LV")
        cypriot_acb(msp, bcx, Y_bess_top, f"{cfg['acb_b_a']:.0f}A")
        # BESS box (dashed border = prefabricated unit)
        R(msp, bx, Y_bess_bot, BW, Y_bess_ht, layer="SYM", lw=25, lt="DASHED2")
        L(msp, bx, Y_bess_bot+Y_bess_ht*0.55, bx+BW, Y_bess_bot+Y_bess_ht*0.55,
          layer="SYM")
        # PCS icon (small inverter symbol)
        T(msp, f"{cfg['pcs_mw']:.2g}MW", bcx, Y_bess_bot+Y_bess_ht*0.75,
          h="xs", layer="ANN", align=TextEntityAlignment.MIDDLE_CENTER)
        T(msp, "BESS", bcx, Y_bess_bot+Y_bess_ht*0.32, h="xs", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)
        T(msp, f"{cfg['bess_mwh']:.0f}MWh", bcx, Y_bess_bot+Y_bess_ht*0.15,
          h="xs", layer="ANN", align=TextEntityAlignment.MIDDLE_CENTER)

    # ── EMS + BMS boxes ──────────────────────────────────────────
    for j, lbl in enumerate(["EMS", "BMS"]):
        bx_side = lv_xr + 8
        by = Y_bess_top - j*18
        R(msp, bx_side, by-10, 18, 10, layer="SYM")
        T(msp, lbl, bx_side+9, by-5, h="md", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)
        L(msp, bx_side, by-5, lv_xr, Y_lv_bus, layer="CTRL", lt="DASHED2", lw=13)

    return doc


# ═══════════════════════════════════════════════════════════════════
#  VERSION B — IEC 60617 Engineering Style
#  For Linyang/Kehua technical review
# ═══════════════════════════════════════════════════════════════════

def B_cb(doc):
    b = doc.blocks.new("_CB2")
    b.add_lwpolyline([(-3,-4),(3,-4),(3,4),(-3,4)], close=True, dxfattribs={"lineweight":25})
    b.add_line((-3,-4),(3,4)); b.add_line((3,-4),(-3,4))
    b.add_text("I>", dxfattribs={"height":2.0}).set_placement((4,0), align=TextEntityAlignment.LEFT)

def B_tx_iec(doc):
    b = doc.blocks.new("_TX2")
    r = 7.5
    b.add_circle((0, r*0.85),  r, dxfattribs={"lineweight":35})
    b.add_circle((0, -r*0.85), r, dxfattribs={"lineweight":35})
    b.add_line((0, r*0.85+r), (0, r*0.85+r+4))
    b.add_line((0,-r*0.85-r), (0,-r*0.85-r-4))
    d=2.2
    b.add_lwpolyline([(-d,r*0.85+1.5),(0,r*0.85+1.5+d*1.5),(d,r*0.85+1.5)],close=True)
    cy=-r*0.85-1.5
    for a in [90,210,330]:
        b.add_line((0,cy),(d*math.cos(math.radians(a)),cy+d*math.sin(math.radians(a))))

def B_ct(doc):
    b = doc.blocks.new("_CT2")
    b.add_circle((0,0), 3.5, dxfattribs={"lineweight":20})
    b.add_line((0,-6),(0,-3.5)); b.add_line((0,3.5),(0,6))

def B_acb(doc, name, w=8, h=10):
    b = doc.blocks.new(name)
    b.add_lwpolyline([(-w/2,-h/2),(w/2,-h/2),(w/2,h/2),(-w/2,h/2)],
                     close=True, dxfattribs={"lineweight":35})
    b.add_line((-w/2,-h/2),(w/2,h/2)); b.add_line((w/2,-h/2),(-w/2,h/2))
    b.add_line((0,-h/2),(0,-h/2-3)); b.add_line((0,h/2),(0,h/2+3))

def draw_iec(cfg):
    """Draw complete SLD in IEC 60617 engineering style"""
    doc = ezdxf.new("R2010")
    doc.header["$INSUNITS"] = 4
    doc.header["$LIMMAX"]   = (420, 297)
    setup(doc)
    for fn in [B_cb, B_tx_iec, B_ct]:
        fn(doc)
    B_acb(doc, "_ACB_M2", 9, 11)
    B_acb(doc, "_ACB_B2", 6, 8)
    msp = doc.modelspace()

    n   = cfg["n_bess"]
    cx  = 210.0
    BW  = 38
    BGAP= 10
    total_w = n*BW + (n-1)*BGAP
    bx0 = cx - total_w/2

    TOP = 285
    Y_arrow   = TOP - 8
    Y_bndry   = TOP - 28
    Y_mvbus   = TOP - 42
    Y_jz_top  = Y_mvbus - 5
    Y_jz_bot  = Y_mvbus - 20
    Y_cb      = Y_mvbus - 13
    Y_ct      = Y_jz_bot - 14
    Y_tx      = Y_ct - 22
    Y_lv_bus  = Y_tx - 28
    Y_acb_m   = Y_lv_bus - 16
    Y_brbus   = Y_acb_m - 18
    Y_bess_t  = Y_brbus - 15
    Y_bess_b  = Y_bess_t - 28

    jz_name = "JZ5" if n==4 else "JZ4"

    R(msp, 0, 0, 420, 297, layer="FRAME", lw=70)
    R(msp, 10, 48, 400, 239, layer="FRAME", lw=40)
    title_block(msp, cfg, style="iec")

    # Grid
    L(msp, cx, Y_arrow, cx, Y_mvbus, layer="MV", lw=50)
    L(msp, cx, Y_arrow, cx-4, Y_arrow-8, layer="MV")
    L(msp, cx, Y_arrow, cx+4, Y_arrow-8, layer="MV")
    T(msp, f"to EAC RMU {cfg['trafo_hv']:.0f}kV (existing)",
      cx+5, Y_arrow-2, h="xs", layer="ANN")

    # DSO boundary
    L(msp, 15, Y_bndry, 405, Y_bndry, layer="BNDRY", lt="DASHED2", lw=18)
    T(msp, "DSO Area of Responsibility", 17, Y_bndry+4, h="xs", layer="BNDRY")
    T(msp, "Private Area (Lighthief DELTAH)", 17, Y_bndry-6, h="xs", layer="BNDRY")

    # Existing PV (left tap)
    pv_x = cx-35
    L(msp, pv_x, Y_mvbus, pv_x, Y_mvbus-28, layer="MV")
    msp.add_blockref("_CB2", (pv_x, Y_mvbus-10), dxfattribs={"layer":"SYM"})
    R(msp, pv_x-15, Y_mvbus-42, 30, 14, layer="SYM")
    T(msp, "Existing PV", pv_x, Y_mvbus-35, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)
    T(msp, cfg.get("pv_label",""), pv_x, Y_mvbus-40, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)

    # 22kV MV bus
    L(msp, pv_x-16, Y_mvbus, cx+50, Y_mvbus, layer="MV", lw=70)
    T(msp, f"{cfg['trafo_hv']:.0f}kV Bus — Customer Switching Substation",
      pv_x-16, Y_mvbus+3, h="xs", layer="ANN")

    # JZ panel
    R(msp, cx-20, Y_jz_bot, 40, Y_jz_top-Y_jz_bot, layer="SYM", lw=35)
    T(msp, f"{jz_name} — Schneider SM6  24kV 630A 25kA/1s",
      cx, (Y_jz_top+Y_jz_bot)/2+1, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)
    msp.add_blockref("_CB2", (cx, Y_cb), dxfattribs={"layer":"SYM"})
    # MV cable label
    T(msp, cfg["mv_cable_spec"], cx+25, Y_mvbus-6, h="xs", layer="ANN")
    T(msp, f"L={cfg['mv_cable_len']:.0f}m  Loading:{cfg['cable_load']:.0f}%",
      cx+25, Y_mvbus-11, h="xs", layer="DIM")

    # CT in JZ panel
    L(msp, cx, Y_jz_bot, cx, Y_ct+6, layer="MV", lw=50)
    msp.add_blockref("_CT2", (cx, Y_ct), dxfattribs={"layer":"SYM"})
    T(msp, "CT 200/1A  5P20+0.5  30VA", cx+6, Y_ct+1, h="xs", layer="ANN")
    # Protection relay annotation
    T(msp, "7SJ82: 50/51, 50N/51N, 67N, 27/59, 81, 78",
      cx-90, Y_ct+1, h="xs", layer="CTRL")
    L(msp, cx-4, Y_ct, cx-45, Y_ct, layer="CTRL", lt="DASHED2", lw=13)

    # Transformer
    L(msp, cx, Y_ct-6, cx, Y_tx+16, layer="MV", lw=50)
    msp.add_blockref("_TX2", (cx, Y_tx), dxfattribs={"layer":"SYM"})
    T(msp, f"T  {cfg['trafo_kva']:.0f}kVA  22/{cfg['trafo_lv']*1000:.0f}V  Dyn11  Uk={cfg['trafo_uk']:.0f}%",
      cx+10, Y_tx+4, h="xs", layer="ANN")
    T(msp, f"NER 25Ohm / 100kJ  (IT retrofit per DSO Annex IV)",
      cx+10, Y_tx-4, h="xs", layer="DIM")
    T(msp, f"Loading: {cfg['trafo_load']:.0f}%", cx+10, Y_tx-10, h="xs", layer="DIM")

    # LV bus
    L(msp, cx, Y_tx-16, cx, Y_lv_bus, layer="LV", lw=50)
    lv_xl = bx0+BW/2-8; lv_xr = bx0+total_w-BW/2+8
    L(msp, lv_xl, Y_lv_bus, lv_xr, Y_lv_bus, layer="LV", lw=70)
    T(msp, f"{cfg['trafo_lv']*1000:.0f}V LV Bus", lv_xl, Y_lv_bus+3, h="xs", layer="ANN")

    # Main ACB + Ikss
    L(msp, cx, Y_lv_bus, cx, Y_acb_m+5.5, layer="LV", lw=50)
    msp.add_blockref("_ACB_M2", (cx, Y_acb_m), dxfattribs={"layer":"SYM"})
    icu_note = f"Icu={cfg['acb_m_icu']:.0f}kA"
    flag = "  <- UPGRADE 65kA" if cfg["ikss"] > 50 else "  OK"
    T(msp, f"Main ACB {cfg['acb_m_a']:.0f}A  {icu_note}{flag}",
      cx-65, Y_acb_m+2, h="xs", layer="ANN")
    T(msp, f"Ikss={cfg['ikss']:.1f}kA (IEC 60909)", cx-65, Y_acb_m-3, h="xs", layer="DIM")

    # Branch bus + BESS
    L(msp, cx, Y_acb_m-5.5, cx, Y_brbus, layer="LV", lw=50)
    L(msp, bx0+BW/2, Y_brbus, bx0+total_w-BW/2, Y_brbus, layer="LV", lw=35)
    for i in range(n):
        bx = bx0 + i*(BW+BGAP); bcx = bx+BW/2
        L(msp, bcx, Y_brbus, bcx, Y_bess_t+4, layer="LV")
        msp.add_blockref("_ACB_B2", (bcx, Y_bess_t-4), dxfattribs={"layer":"SYM"})
        T(msp, f"{cfg['acb_b_a']:.0f}A", bcx, Y_bess_t-16, h="xs", layer="DIM",
          align=TextEntityAlignment.MIDDLE_CENTER)
        L(msp, bcx, Y_bess_t-8, bcx, Y_bess_t-14, layer="LV")
        R(msp, bx, Y_bess_b, BW, Y_bess_t-Y_bess_b, layer="SYM", lw=35)
        L(msp, bx, Y_bess_b+(Y_bess_t-Y_bess_b)*0.55,
              bx+BW, Y_bess_b+(Y_bess_t-Y_bess_b)*0.55, layer="SYM")
        T(msp, f"PCS-{i+1}  {cfg['pcs_mw']:.2g}MW BCS1250K",
          bcx, Y_bess_b+(Y_bess_t-Y_bess_b)*0.80, h="xs", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)
        T(msp, f"BESS-{i+1}  {cfg['bess_mwh']:.0f}MWh LFP  IP55",
          bcx, Y_bess_b+(Y_bess_t-Y_bess_b)*0.28, h="xs", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)
        T(msp, "EVE 314Ah  liq.cooled", bcx, Y_bess_b+(Y_bess_t-Y_bess_b)*0.12,
          h="xs", layer="DIM", align=TextEntityAlignment.MIDDLE_CENTER)

    # EMS/BMS
    for j, lbl in enumerate(["EMS (Voltus)", "BMS"]):
        bx_s = lv_xr+6; by = Y_bess_t - j*20
        R(msp, bx_s, by-12, 24, 12, layer="SYM")
        T(msp, lbl, bx_s+12, by-6, h="xs", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)
        L(msp, bx_s, by-6, lv_xr, Y_lv_bus, layer="CTRL", lt="DASHED2", lw=13)

    return doc


# ─── CONFIGS & GENERATE ───────────────────────────────────────────────────────

CONFIGS = [
    {
        "tag":"G1", "n_bess":4, "bess_mwh":5, "pcs_mw":1.25,
        "trafo_kva":5000, "trafo_hv":22.0, "trafo_lv":0.690, "trafo_uk":6,
        "mv_cable_spec":"3x(1x120mm2) Cu XLPE 12/20(24)kV",
        "mv_cable_len":25, "acb_m_a":5000, "acb_m_icu":65, "acb_b_a":1600,
        "ikss":55.76, "trafo_load":99, "cable_load":12,
        "pv_label":"PV Park 5 MWp",
        "client":"Esperia Energy Group / Galascope Ltd",
        "project":"Galascope 1  -  5 MW PV + 5 MW / 20 MWh BESS",
        "title":"BESS MV/LV Single Line Diagram",
    },
    {
        "tag":"G2", "n_bess":2, "bess_mwh":5, "pcs_mw":1.25,
        "trafo_kva":3000, "trafo_hv":22.0, "trafo_lv":0.690, "trafo_uk":6,
        "mv_cable_spec":"3x(1x95mm2) Cu XLPE 12/20(24)kV",
        "mv_cable_len":30, "acb_m_a":2500, "acb_m_icu":50, "acb_b_a":1250,
        "ikss":37.45, "trafo_load":83, "cable_load":7,
        "pv_label":"PV Park 2.5 MWp",
        "client":"Esperia Energy Group / Galascope Ltd",
        "project":"Galascope 2  -  2.5 MW PV + 2.5 MW / 10 MWh BESS",
        "title":"BESS MV/LV Single Line Diagram",
    },
]

import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

print("Generating Rev D SLDs (Cypriot + IEC versions)...")
for cfg in CONFIGS:
    tag = cfg["tag"]
    g_label = "1" if tag=="G1" else "2"

    # Version A — Cypriot/ABIO style (for DSO submission)
    cfg["drwno"] = f"LC-G{g_label}-SLD-001-D"
    cfg["date"]  = "28/04/2026"
    doc_cy = draw_cypriot(cfg)
    path_cy = f"{OUTPUT_DIR}\\LC-G{g_label}-SLD-001-D_Cypriot.dxf"
    doc_cy.saveas(path_cy)
    print(f"  Saved: {path_cy}")

    # Version B — IEC 60617 (for Linyang/Kehua)
    cfg["drwno"] = f"LC-G{g_label}-SLD-001-D-IEC"
    doc_iec = draw_iec(cfg)
    path_iec = f"{OUTPUT_DIR}\\LC-G{g_label}-SLD-001-D-IEC.dxf"
    doc_iec.saveas(path_iec)
    print(f"  Saved: {path_iec}")

    # PNG previews
    try:
        import matplotlib; matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        from ezdxf.addons.drawing import RenderContext, Frontend
        from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
        for label, doc, path in [("Cypriot", doc_cy, path_cy),
                                   ("IEC",     doc_iec, path_iec)]:
            fig = plt.figure(figsize=(420/25.4, 297/25.4), facecolor='#0D1B2E')
            ax  = fig.add_axes([0,0,1,1])
            ax.set_facecolor('#0D1B2E')
            ctx = RenderContext(doc)
            Frontend(ctx, MatplotlibBackend(ax)).draw_layout(doc.modelspace(), finalize=True)
            png = path.replace('.dxf', '.png')
            fig.savefig(png, dpi=150, bbox_inches='tight')
            plt.close()
            print(f"  PNG:   {png}")
    except Exception as e:
        print(f"  PNG skipped: {e}")

print("\nAll Rev D SLDs generated.")
print("Cypriot style  -> share with DSO / EAC")
print("IEC 60617 style -> share with Linyang / Kehua team")
print()
print("Note: G1 ACB rated 65kA (IEC 60909 confirmed 55.76kA)")
print("Note: NER earthing follows April 2026 DSO Annex IV (IT retrofit)")
print("Note: DIgSILENT .pfd model will be required by EAC for G1 5MW connection")
