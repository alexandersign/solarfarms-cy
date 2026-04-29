"""
Galascope BESS — SLD DXF Generator v2
Lighthief Cyprus Ltd

Layout principle:
  LEFT  column (x=10..95)   : protection relay settings panel
  CENTRE column (x=105..315): IEC 60617 symbols only — NO free text in symbol zone
  RIGHT column (x=320..408) : technical annotations (cable, transformer, SC)
  Leader lines connect right-column notes to centre symbols

Data sourced from:
  - SLD-galascope-2.5MW-BESS.html (equipment schedule Rev.C)
  - galascope-pandapower-model.py  (Ikss, loading %)
"""

import ezdxf
from ezdxf.enums import TextEntityAlignment

OUTPUT_DIR = r"c:\Users\alexa\code\solinvest\docs\clients\group-order\Group2_Esperia_Energy"

# ─── LAYERS ───────────────────────────────────────────────────────────────────
def setup(doc):
    for name, col, lw in [
        ("MV",     1, 50),  # red,    0.50 mm
        ("LV",     2, 35),  # yellow, 0.35 mm
        ("CTRL",   4, 18),  # cyan,   0.18 mm  control/dashed
        ("SYM",    7, 35),  # white,  0.35 mm  symbol outlines
        ("ANN",    8, 18),  # grey,   0.18 mm  annotations
        ("BNDRY",  3, 18),  # green,  0.18 mm  DSO boundary
        ("FRAME",  7, 50),  # white,  0.50 mm  border
        ("TITLE",  7, 25),  # white,  0.25 mm  title block
        ("DIM",    8, 13),  # grey,   0.13 mm  dimensions
    ]:
        layer = doc.layers.new(name=name, dxfattribs={"color": col})
        layer.dxf.lineweight = lw
    doc.linetypes.add("DASHED2", pattern="A,.4,-.2",
                      description="Dashed2")


# ─── TEXT HELPER ──────────────────────────────────────────────────────────────
TH = {  # text heights (mm)
    "xs": 1.8,
    "sm": 2.2,
    "md": 3.0,
    "lg": 4.0,
    "xl": 5.5,
}

def T(msp, text, x, y, h="sm", layer="ANN",
      align=TextEntityAlignment.LEFT, rot=0):
    e = msp.add_text(text, dxfattribs={"layer": layer, "height": TH[h], "rotation": rot})
    e.set_placement((x, y), align=align)
    return e

def L(msp, x1, y1, x2, y2, layer="SYM", lw=None, lt=None):
    att = {"layer": layer}
    if lw: att["lineweight"] = lw
    if lt: att["linetype"]  = lt
    return msp.add_line((x1, y1), (x2, y2), dxfattribs=att)

def R(msp, x, y, w, h, layer="SYM", lw=None):
    att = {"layer": layer}
    if lw: att["lineweight"] = lw
    return msp.add_lwpolyline(
        [(x, y), (x+w, y), (x+w, y+h), (x, y+h)],
        close=True, dxfattribs=att
    )

def leader(msp, x_sym, y_sym, x_ann, y_ann):
    """Thin leader line from annotation to symbol"""
    L(msp, x_ann, y_ann, x_sym, y_sym, layer="DIM", lw=13)


# ─── IEC SYMBOL BLOCKS ────────────────────────────────────────────────────────

def B_cb(doc):
    """Circuit Breaker — 6×8 box with X"""
    b = doc.blocks.new("_CB")
    b.add_lwpolyline([(-3,-4),(3,-4),(3,4),(-3,4)], close=True,
                     dxfattribs={"lineweight": 30})
    b.add_line((-3,-4),(3,4))
    b.add_line((3,-4),(-3,4))
    # I> annotation on block
    b.add_text("I>", dxfattribs={"height": 2.0}).set_placement(
        (4, 0), align=TextEntityAlignment.LEFT)

def B_ds(doc):
    """Disconnector 3-position"""
    b = doc.blocks.new("_DS")
    b.add_circle((-2, 0), 1.5)   # bottom contact
    b.add_line((-2, 1.5),( 3, 6))  # blade
    b.add_circle((0, 7), 1.5)    # top contact
    b.add_line((-2, -1.5), (-2, -4))  # bottom lead
    b.add_line(( 0,  8.5), ( 0, 11))  # top lead

def B_ct(doc):
    """Current Transformer — circle on line"""
    b = doc.blocks.new("_CT")
    b.add_circle((0, 0), 3.5, dxfattribs={"lineweight": 25})
    b.add_line((0, -6), (0, -3.5))
    b.add_line((0,  3.5),(0,  6))

def B_vt(doc):
    """Voltage Transformer — small cross on line"""
    b = doc.blocks.new("_VT")
    b.add_line((0, -5), (0, 5))
    b.add_line((-3, -1.5),(3, -1.5))
    b.add_line((-2.5, 1.5),(2.5, 1.5))

def B_tx(doc):
    """Transformer — two tangent circles with D/Y"""
    b = doc.blocks.new("_TX")
    r = 7.5
    b.add_circle((0, r*0.85),  r, dxfattribs={"lineweight": 40})  # HV (top)
    b.add_circle((0, -r*0.85), r, dxfattribs={"lineweight": 40})  # LV (bottom)
    b.add_line((0, r*0.85+r),  (0, r*0.85+r+4))   # HV lead up
    b.add_line((0, -r*0.85-r), (0, -r*0.85-r-4))  # LV lead down
    # delta (HV)
    d = 2.2
    b.add_lwpolyline([(-d, r*0.85+1.5),(0, r*0.85+1.5+d*1.6),(d, r*0.85+1.5)],
                     close=True)
    # star (LV)
    cy = -r*0.85-1.5
    for a in [90, 210, 330]:
        import math
        b.add_line((0, cy), (d*math.cos(math.radians(a)), cy + d*math.sin(math.radians(a))))

def B_sa(doc):
    """Surge Arrester — rectangle + arrow + earth"""
    b = doc.blocks.new("_SA")
    b.add_lwpolyline([(-2.5,-3.5),(2.5,-3.5),(2.5,3.5),(-2.5,3.5)], close=True)
    b.add_line((0, -3.5),(0, -7))     # bottom lead
    b.add_line((0,  3.5),(0,  7))     # top lead
    b.add_line((-2.5,-3.5),(2.5,3.5)) # diagonal arrow

def B_ner(doc):
    """NER — rectangle"""
    b = doc.blocks.new("_NER")
    b.add_lwpolyline([(-3.5,-4),(3.5,-4),(3.5,4),(-3.5,4)], close=True,
                     dxfattribs={"lineweight": 25})
    for y in [2, 0, -2]:
        b.add_line((-2.5, y),(2.5, y))
    b.add_line((0,-4),(0,-7))  # bottom lead
    # earth bars
    b.add_line((-4,-7),(4,-7))
    b.add_line((-2.8,-8.5),(2.8,-8.5))
    b.add_line((-1.5,-10),(1.5,-10))

def B_acb(doc, name, w=8, h=10):
    """ACB — wider CB box"""
    b = doc.blocks.new(name)
    b.add_lwpolyline([(-w/2,-h/2),(w/2,-h/2),(w/2,h/2),(-w/2,h/2)],
                     close=True, dxfattribs={"lineweight": 40})
    b.add_line((-w/2,-h/2),(w/2,h/2))
    b.add_line((w/2,-h/2),(-w/2,h/2))
    b.add_line((0,-h/2),(0,-h/2-3))
    b.add_line((0, h/2),(0, h/2+3))

def B_meter(doc):
    b = doc.blocks.new("_M")
    b.add_lwpolyline([(-4,-3),(4,-3),(4,3),(-4,3)], close=True)
    b.add_text("M", dxfattribs={"height": 3.0}).set_placement(
        (0, -1), align=TextEntityAlignment.MIDDLE_CENTER)
    b.add_line((0, -3),(0, -5))
    b.add_line((0,  3),(0,  5))

def define_blocks(doc):
    B_cb(doc); B_ds(doc); B_ct(doc); B_vt(doc); B_tx(doc)
    B_sa(doc); B_ner(doc)
    B_acb(doc, "_ACB_M", w=9, h=11)   # main ACB (bigger)
    B_acb(doc, "_ACB_B", w=6, h=8)    # branch ACB
    B_meter(doc)


# ─── TITLE BLOCK ──────────────────────────────────────────────────────────────
def title_block(msp, x0, y0, W, H, c):
    R(msp, x0, y0, W, H, layer="FRAME", lw=50)
    # vertical dividers
    for xf in [0.30, 0.58, 0.76]:
        x = x0 + W*xf
        L(msp, x, y0, x, y0+H, layer="FRAME")
    # horizontal mid
    ym = y0 + H/2
    L(msp, x0, ym, x0+W, ym, layer="FRAME")

    def cell(text, cx, cy, ht="sm"):
        T(msp, text, cx, cy, h=ht, layer="TITLE")

    # column centres
    c1x = x0 + W*0.15;  c2x = x0 + W*0.44
    c3x = x0 + W*0.67;  c4x = x0 + W*0.88

    cell("Client:",      x0+2, y0+H-3.5,  "xs")
    cell(c["client"],    x0+2, y0+H-8,    "sm")
    cell("Project:",     x0+2, ym+1,       "xs")
    cell(c["project"],   x0+2, ym-5,       "sm")

    cell("Title:",           x0+W*0.30+2, y0+H-3.5, "xs")
    cell(c["title"],         x0+W*0.30+2, y0+H-8,   "sm")
    cell("Drawing No.:",     x0+W*0.30+2, ym+1,       "xs")
    cell(c["drawing_no"],    x0+W*0.30+2, ym-5,       "sm")

    cell("Designed by:",     x0+W*0.58+2, y0+H-3.5, "xs")
    cell(c["designer"],      x0+W*0.58+2, y0+H-8,   "sm")
    cell("Date:",            x0+W*0.58+2, ym+1,       "xs")
    cell(c["date"],          x0+W*0.58+2, ym-5,       "sm")

    cell("Rev.:",            x0+W*0.76+2, y0+H-3.5, "xs")
    cell(c["rev"],           x0+W*0.76+2, y0+H-8,   "lg")
    cell("Sheet:",           x0+W*0.76+2, ym+1,       "xs")
    cell("1 of 1",           x0+W*0.76+2, ym-5,       "sm")

    # logo
    T(msp, "LIGHTHIEF", x0+2, y0+5, h="xl", layer="TITLE")
    T(msp, "CYPRUS LTD", x0+2, y0+1.5, h="xs", layer="TITLE")


# ─── MAIN SLD ─────────────────────────────────────────────────────────────────

def draw_sld(cfg):
    doc = ezdxf.new("R2010")
    doc.header["$INSUNITS"] = 4   # mm
    doc.header["$LIMMAX"]   = (420, 297)
    setup(doc)
    define_blocks(doc)
    msp = doc.modelspace()

    n   = cfg["n_bess"]        # number of BESS containers
    cx  = 210.0                # drawing centre X (A3 landscape)
    TB  = 38                   # title block height
    BRD = 10                   # border

    # ── Zones ──────────────────────────────────────────────────────────────
    Xl  = BRD                  # left annotation x0
    Xl2 = 100                  # left annotation x1 / SLD left edge
    Xr  = 318                  # right annotation x0 / SLD right edge
    Xr2 = 410                  # right annotation x1

    # ── Y-positions (mm from bottom of drawing area) ─────────────────────
    # bottom of drawing area = BRD + TB
    Y0  = BRD + TB             # 48 mm from bottom of page
    TOP = 297 - BRD            # 287 mm

    # Key Y levels
    Y_arrow   = TOP - 8        # grid arrow tip
    Y_bndry   = TOP - 28       # DSO/private boundary
    Y_mvbus   = TOP - 42       # 22kV MV bus bar
    Y_jz_top  = Y_mvbus - 6
    Y_jz_bot  = Y_mvbus - 20
    Y_cb      = Y_mvbus - 13   # CB centre (inside JZ box)
    Y_ds      = Y_jz_bot - 10  # disconnector centre
    Y_ct      = Y_ds - 15      # CT centre
    Y_sa_tap  = Y_ct - 10      # SA MV tap-off
    Y_tx_hv   = Y_sa_tap - 6   # TX HV lead top
    Y_tx      = Y_tx_hv - 14   # TX centre
    Y_tx_lv   = Y_tx - 14      # TX LV lead bottom
    Y_ner     = Y_tx_lv - 2    # NER side-tap
    Y_meter   = Y_tx_lv - 12   # revenue meter
    Y_lvbus   = Y_tx_lv - 22   # 690V LV bus
    Y_acb_m   = Y_lvbus - 17   # main ACB centre
    Y_brbus   = Y_acb_m - 19   # horizontal branch bus
    Y_acb_b   = Y_brbus - 8    # branch ACB centre
    Y_bess_t  = Y_acb_b - 15   # BESS top
    Y_bess_b  = Y_bess_t - 28  # BESS bottom

    # BESS horizontal layout
    BW   = 38          # container width
    BGAP = 10          # gap between containers
    total_bess_w = n * BW + (n-1)*BGAP
    bx0  = cx - total_bess_w / 2

    jz_name = "JZ5" if n == 4 else "JZ4"

    # ── A3 frame ───────────────────────────────────────────────────────────
    R(msp, 0, 0, 420, 297, layer="FRAME", lw=70)
    R(msp, BRD, Y0, 400, TOP - Y0, layer="FRAME", lw=40)

    # ── Title block ────────────────────────────────────────────────────────
    title_block(msp, BRD, BRD, 400, TB, cfg)

    # ═══════════════════════════════════════════════════
    # LEFT PANEL — Protection relay settings
    # ═══════════════════════════════════════════════════
    px, py = Xl+2, Y_ct + 10
    R(msp, Xl, py-60, 85, 64, layer="CTRL")
    T(msp, "PROTECTION RELAY",     Xl+3, py-3,  h="sm", layer="CTRL")
    T(msp, "Siemens SIPROTEC 7SJ82", Xl+3, py-8, h="xs", layer="CTRL")
    relay_rows = [
        "50/51  I>  = %d A  TMS=0.20" % cfg["r51_lo"],
        "       I>> = %d A  t=0.05s"  % cfg["r51_hi"],
        "50N/51N  IE> = %.1f A" % cfg["r51n"],
        "67N  dir.EF  80deg  0.4s",
        "27/59  0.85/1.10 pu  1.0s",
        "81U/O  47.5/51.5 Hz  inst.",
        "81R  ROCOF > 1.0 Hz/s  0.5s",
        "78  Vec.shift > 8 deg  inst.",
    ]
    for i, s in enumerate(relay_rows):
        T(msp, s, Xl+3, py-16 - i*5.5, h="xs", layer="ANN")
    # Leader to JZ panel
    L(msp, Xl+85, py-32, Xl2, (Y_jz_top+Y_jz_bot)/2,
      layer="CTRL", lt="DASHED2", lw=13)

    # ═══════════════════════════════════════════════════
    # RIGHT PANEL — Technical annotations
    # Each annotation has ONE Y level, no overlap
    # ═══════════════════════════════════════════════════
    rx = Xr + 2

    def right_ann(lines, y_ref, y_sym=None, x_sym=None):
        """Write multi-line annotation in right column; optional leader."""
        y = y_ref
        for line in lines:
            T(msp, line, rx, y, h="xs", layer="ANN")
            y -= 4.5
        if y_sym is not None:
            leader(msp, x_sym or cx, y_sym, Xr, y_ref - (len(lines)-1)*2.25)

    # MV Cable annotation (anchor at Y_mvbus - 13)
    right_ann([
        "NEW MV CABLE",
        cfg["mv_cable_spec"],
        f"L = {cfg['mv_cable_len']:.0f} m",
        f"Loading: {cfg['cable_load']:.1f}%",
    ], Y_mvbus - 8, y_sym=Y_mvbus - 5, x_sym=cx+5)

    # JZ panel / CB annotation
    right_ann([
        f"{jz_name} — Schneider SM6",
        "Vacuum CB  24 kV  630 A",
        "25 kA/1s  motor-operated",
        "DS 3-pos  24 kV  630 A",
    ], Y_cb + 6, y_sym=Y_cb, x_sym=cx+5)

    # CT / VT annotation
    right_ann([
        "CT: 200/1A  5P20 + 0.5",
        "    30 VA per core  3ph",
        "VT: 22/0.1kV  3P  Cl.0.5",
    ], Y_ct + 6, y_sym=Y_ct, x_sym=cx+4)

    # SA-MV annotation
    right_ann([
        "SA-MV: ZnO 24kV/10kA cl.2",
    ], Y_sa_tap + 2, y_sym=Y_sa_tap, x_sym=cx - 12)

    # Transformer annotation
    right_ann([
        f"T{n//2+1}: {cfg['trafo_kva']:.0f} kVA  ONAN",
        f"22 / 0.69 kV  Dyn11",
        f"Uk = {cfg['trafo_uk']:.0f}%",
        f"NER: R={cfg['ner_ohm']:.0f}\u03a9  If\u226416A  100kJ",
        f"Loading: {cfg['trafo_load']:.1f}%",
    ], Y_tx + 10, y_sym=Y_tx, x_sym=cx+8)

    # Main ACB annotation
    icu_note = f"Icu = {cfg['acb_m_icu']:.0f} kA"
    upgrade  = "  ← UPGRADE TO 65kA" if cfg["ikss"] > cfg["acb_m_icu"] else "  ← OK"
    right_ann([
        f"Main ACB  {cfg['acb_m_a']:.0f}A  4P  690V",
        icu_note + upgrade,
        f"SA-LV: 690V  In=20kA",
    ], Y_acb_m + 6, y_sym=Y_acb_m, x_sym=cx+5)

    # SC result
    sc_y = max(Y_bess_t - 2, Y0 + 40)
    sc_col = "ANN"
    R(msp, Xr, sc_y-32, 90, 35, layer="ANN")
    T(msp, "IEC 60909 SHORT CIRCUIT",    rx, sc_y-3,  h="xs", layer="ANN")
    T(msp, f"Ikss (LV) = {cfg['ikss']:.2f} kA", rx, sc_y-9,  h="sm", layer="ANN")
    ok = "OK" if cfg["ikss"] <= cfg["acb_m_icu"] else "UPGRADE ACB to 65kA Icu"
    T(msp, f"ACB {cfg['acb_m_icu']:.0f}kA: {ok}", rx, sc_y-15, h="xs", layer="ANN")
    T(msp, f"Cable:  {cfg['cable_load']:.1f}%  Trafo:  {cfg['trafo_load']:.1f}%",
      rx, sc_y-21, h="xs", layer="ANN")

    # ═══════════════════════════════════════════════════
    # CENTRE COLUMN — IEC symbols only
    # ═══════════════════════════════════════════════════

    # ── Grid arrow ────────────────────────────────────
    mv_drop_x = cx          # single centre line for MV down to transformer
    L(msp, mv_drop_x, Y_arrow, mv_drop_x, Y_mvbus, layer="MV", lw=50)
    L(msp, mv_drop_x, Y_arrow, mv_drop_x-4, Y_arrow-8, layer="MV")
    L(msp, mv_drop_x, Y_arrow, mv_drop_x+4, Y_arrow-8, layer="MV")
    T(msp, f"to EAC RMU  {cfg['trafo_hv']:.0f} kV",
      mv_drop_x+4, Y_arrow-2, h="xs", layer="ANN")

    # ── DSO / Private boundary line ───────────────────
    L(msp, Xl2, Y_bndry, Xr, Y_bndry, layer="BNDRY", lw=18, lt="DASHED2")
    T(msp, "DSO Area of Responsibility",
      Xl2+2, Y_bndry+3, h="xs", layer="BNDRY")
    T(msp, "Private Area (Lighthief EPC Scope)",
      Xl2+2, Y_bndry-6, h="xs", layer="BNDRY")

    # ── Existing PV branch (left tap of MV bus) ───────
    pv_x = cx - 30
    L(msp, pv_x, Y_mvbus, pv_x, Y_mvbus-28, layer="MV")
    # small CB for existing PV
    msp.add_blockref("_CB", (pv_x, Y_mvbus-10), dxfattribs={"layer": "SYM"})
    R(msp, pv_x-14, Y_mvbus-28-14, 28, 14, layer="SYM")
    T(msp, "Existing PV", pv_x, Y_mvbus-31-3, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)
    T(msp, cfg.get("pv_label","PV Park"), pv_x, Y_mvbus-31-8, h="xs",
      layer="ANN", align=TextEntityAlignment.MIDDLE_CENTER)
    T(msp, "existing", pv_x-16, Y_mvbus-5, h="xs", layer="DIM")

    # ── 22 kV MV Bus ─────────────────────────────────
    L(msp, pv_x-16, Y_mvbus, cx+50, Y_mvbus, layer="MV", lw=70)
    T(msp, f"{cfg['trafo_hv']:.0f} kV  Customer Switching Substation",
      pv_x-16, Y_mvbus+3, h="xs", layer="ANN")

    # ── JZ panel box ──────────────────────────────────
    R(msp, cx-18, Y_jz_bot, 36, Y_jz_top-Y_jz_bot, layer="SYM", lw=35)
    T(msp, jz_name, cx, (Y_jz_top+Y_jz_bot)/2+2, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)
    # CB inside JZ
    msp.add_blockref("_CB", (cx, Y_cb), dxfattribs={"layer": "SYM"})

    # ── Vertical MV line through JZ to DS ─────────────
    L(msp, cx, Y_jz_bot, cx, Y_ds+11, layer="MV", lw=50)

    # ── Disconnector ──────────────────────────────────
    msp.add_blockref("_DS", (cx, Y_ds), dxfattribs={"layer": "SYM",
                                                      "xscale": 0.9, "yscale": 0.9})

    # ── Line DS → CT ──────────────────────────────────
    L(msp, cx, Y_ds-5, cx, Y_ct+6, layer="MV", lw=50)

    # ── CT (dual core 5P20 + 0.5) ─────────────────────
    msp.add_blockref("_CT", (cx, Y_ct), dxfattribs={"layer": "SYM"})
    # small VT tap-off to the left
    vt_x = cx - 16
    L(msp, cx, Y_ct, vt_x, Y_ct, layer="MV")
    msp.add_blockref("_VT", (vt_x, Y_ct), dxfattribs={"layer": "SYM",
                                                         "xscale": 0.8, "yscale": 0.8})
    T(msp, "VT", vt_x-5, Y_ct+3, h="xs", layer="ANN",
      align=TextEntityAlignment.MIDDLE_CENTER)

    # ── MV line CT → SA tap → Transformer ─────────────
    L(msp, cx, Y_ct-6, cx, Y_tx_hv+14+4, layer="MV", lw=50)

    # ── SA-MV (side-tap left) ─────────────────────────
    sa_x = cx - 18
    L(msp, cx, Y_sa_tap, sa_x, Y_sa_tap, layer="MV")
    msp.add_blockref("_SA", (sa_x, Y_sa_tap), dxfattribs={"layer": "SYM"})

    # ── Transformer ───────────────────────────────────
    msp.add_blockref("_TX", (cx, Y_tx), dxfattribs={"layer": "SYM"})

    # ── NER (side tap from LV neutral) ────────────────
    ner_x = cx + 30
    L(msp, cx, Y_tx_lv, cx, Y_lvbus, layer="LV", lw=50)
    L(msp, cx, Y_ner, ner_x, Y_ner, layer="LV")
    msp.add_blockref("_NER", (ner_x, Y_ner-4), dxfattribs={"layer": "SYM"})

    # ── Revenue Meter ─────────────────────────────────
    msp.add_blockref("_M", (cx, Y_meter), dxfattribs={"layer": "SYM"})
    T(msp, "Revenue Meter  Cl.0.2S",
      cx+6, Y_meter+1, h="xs", layer="ANN")

    # ── 690 V LV Bus ──────────────────────────────────
    lv_xl = bx0 + BW/2 - 8
    lv_xr = bx0 + total_bess_w - BW/2 + 8
    L(msp, lv_xl, Y_lvbus, lv_xr, Y_lvbus, layer="LV", lw=70)
    T(msp, "690 V  LV Bus", lv_xl, Y_lvbus+3, h="xs", layer="ANN")

    # ── Main ACB ──────────────────────────────────────
    L(msp, cx, Y_lvbus, cx, Y_acb_m+5.5, layer="LV", lw=50)
    msp.add_blockref("_ACB_M", (cx, Y_acb_m), dxfattribs={"layer": "SYM"})
    # SA-LV tap
    sa_lv_x = cx + 20
    L(msp, cx, Y_acb_m, sa_lv_x, Y_acb_m, layer="LV")
    msp.add_blockref("_SA", (sa_lv_x, Y_acb_m), dxfattribs={"layer": "SYM",
                                                               "xscale": 0.8, "yscale": 0.8})

    # ── Horizontal branch bus ─────────────────────────
    L(msp, cx, Y_acb_m-5.5, cx, Y_brbus, layer="LV", lw=50)
    L(msp, bx0+BW/2, Y_brbus, bx0+total_bess_w-BW/2, Y_brbus,
      layer="LV", lw=35)

    # ── Branch ACBs + BESS containers ─────────────────
    for i in range(n):
        bx  = bx0 + i*(BW+BGAP)
        bcx = bx + BW/2

        # vertical branch drop
        L(msp, bcx, Y_brbus, bcx, Y_acb_b+4, layer="LV")
        msp.add_blockref("_ACB_B", (bcx, Y_acb_b), dxfattribs={"layer": "SYM"})
        # ACB rating below
        T(msp, f"{cfg['acb_b_a']:.0f}A",
          bcx, Y_acb_b-7, h="xs", layer="DIM",
          align=TextEntityAlignment.MIDDLE_CENTER)

        # LV line to BESS
        L(msp, bcx, Y_acb_b-4, bcx, Y_bess_t, layer="LV")

        # BESS outer box
        R(msp, bx, Y_bess_b, BW, Y_bess_t-Y_bess_b, layer="SYM", lw=35)
        # PCS / BESS divider
        yd = Y_bess_b + (Y_bess_t-Y_bess_b)*0.55
        L(msp, bx, yd, bx+BW, yd, layer="SYM")

        # PCS label
        T(msp, f"PCS-{i+1}", bcx, yd+3, h="xs", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)
        T(msp, "BCS1250K", bcx, yd-1, h="xs", layer="DIM",
          align=TextEntityAlignment.MIDDLE_CENTER)
        T(msp, f"{cfg['pcs_mw']:.2g} MW", bcx, yd-6, h="xs", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)

        # BESS label
        T(msp, f"BESS-{i+1}", bcx, Y_bess_b+(Y_bess_t-Y_bess_b)*0.25+2, h="xs",
          layer="ANN", align=TextEntityAlignment.MIDDLE_CENTER)
        T(msp, f"{cfg['bess_mwh']:.0f} MWh  LFP", bcx,
          Y_bess_b+(Y_bess_t-Y_bess_b)*0.13, h="xs",
          layer="DIM", align=TextEntityAlignment.MIDDLE_CENTER)

    # ── BMS + EMS (right of BESS row) ─────────────────
    bms_x = bx0 + total_bess_w + 10
    for j, lbl in enumerate(["BMS", "EMS"]):
        by = Y_bess_t - j * 18
        R(msp, bms_x, by-12, 18, 12, layer="SYM")
        T(msp, lbl, bms_x+9, by-6, h="md", layer="ANN",
          align=TextEntityAlignment.MIDDLE_CENTER)
        # dashed control line to LV bus
        L(msp, bms_x, by-6, Xr, Y_lvbus,
          layer="CTRL", lt="DASHED2", lw=13)

    return doc


# ─── GENERATE ─────────────────────────────────────────────────────────────────

CONFIGS = [
    {
        "tag":           "G1",
        "n_bess":        4,
        "bess_mwh":      5,
        "pcs_mw":        1.25,
        "trafo_kva":     5000,
        "trafo_hv":      22.0,
        "trafo_lv":      0.690,
        "trafo_uk":      6,
        "mv_cable_spec": "3x(1x120mm2) Cu XLPE 12/20(24)kV",
        "mv_cable_len":  25,
        "acb_m_a":       5000,
        "acb_m_icu":     50,     # needs 65kA per IEC 60909 — flag
        "acb_b_a":       1250,
        "ner_ohm":       25,
        "ikss":          55.76,  # pandapower IEC 60909
        "trafo_load":    99.4,
        "cable_load":    12.4,
        "r51_lo":        157,  "r51_hi": 1050,  "r51n": 6.6,
        "pv_label":      "5 MWp PV Park",
        "client":        "Esperia Energy Group / Galascope Ltd",
        "project":       "Galascope 1  -  5 MW / 20 MWh BESS",
        "title":         "BESS MV/LV Single Line Diagram",
        "drawing_no":    "LC-G1-SLD-001",
        "designer":      "Lighthief Cyprus Ltd",
        "rev":           "A",
        "date":          "28/04/2026",
        "filename":      "galascope-1-5mw-sld-v2.dxf",
    },
    {
        "tag":           "G2",
        "n_bess":        2,
        "bess_mwh":      5,
        "pcs_mw":        1.25,
        "trafo_kva":     3000,
        "trafo_hv":      22.0,
        "trafo_lv":      0.690,
        "trafo_uk":      6,
        "mv_cable_spec": "3x(1x95mm2) Cu XLPE 12/20(24)kV",
        "mv_cable_len":  30,
        "acb_m_a":       2500,
        "acb_m_icu":     50,
        "acb_b_a":       1250,
        "ner_ohm":       25,
        "ikss":          37.45,
        "trafo_load":    82.8,
        "cable_load":    7.1,
        "r51_lo":        79,   "r51_hi": 525,   "r51n": 5.0,
        "pv_label":      "2.5 MWp PV Park",
        "client":        "Esperia Energy Group / Galascope Ltd",
        "project":       "Galascope 2  -  2.5 MW / 10 MWh BESS",
        "title":         "BESS MV/LV Single Line Diagram",
        "drawing_no":    "LC-G2-SLD-001",
        "designer":      "Lighthief Cyprus Ltd",
        "rev":           "A",
        "date":          "28/04/2026",
        "filename":      "galascope-2-2.5mw-sld-v2.dxf",
    },
]

import sys, io, warnings
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
warnings.filterwarnings('ignore')

print("Generating SLD DXF files (v2 — clean layout)...")
for cfg in CONFIGS:
    doc = draw_sld(cfg)
    dxf_path = f"{OUTPUT_DIR}\\{cfg['filename']}"
    doc.saveas(dxf_path)
    print(f"  DXF: {dxf_path}")

    # PNG preview
    try:
        import matplotlib; matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        from ezdxf.addons.drawing import RenderContext, Frontend
        from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
        fig = plt.figure(figsize=(420/25.4, 297/25.4), facecolor='#0D1B2E')
        ax  = fig.add_axes([0,0,1,1])
        ax.set_facecolor('#0D1B2E')
        ctx = RenderContext(doc)
        MatplotlibBackend(ax)
        Frontend(ctx, MatplotlibBackend(ax)).draw_layout(doc.modelspace(), finalize=True)
        png_path = dxf_path.replace('.dxf', '.png')
        fig.savefig(png_path, dpi=150, bbox_inches='tight')
        plt.close()
        print(f"  PNG: {png_path}")
    except Exception as e:
        print(f"  PNG skipped: {e}")

print("\nDone. Open .dxf in LibreCAD / AutoCAD / FreeCAD.")
print("REMINDER: G1 Ikss=55.76kA > ACB 50kA - confirm Linyang T4 uses 65kA ACB.")
