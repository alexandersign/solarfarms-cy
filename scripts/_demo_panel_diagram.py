# -*- coding: utf-8 -*-
"""
Generate a clean solar panel layout diagram for the review cards.
No satellite imagery needed — just a crisp, branded panel array visual.
"""
from PIL import Image, ImageDraw, ImageFont
import math, io, os

NAVY  = (26,  54,  93)
GOLD  = (201, 164, 50)
WHITE = (255, 255, 255)
LIGHT = (240, 244, 248)
GREY  = (64,  64,  64)
PANEL_FILL   = (22, 46, 80)      # slightly lighter navy for panel faces
PANEL_BORDER = (201, 164, 50)    # gold frames

def make_panel_diagram(panel_count: int, peak_kw: float,
                       annual_kwh: int, savings_eur: int,
                       building_name: str = "",
                       width: int = 620, height: int = 340) -> bytes:
    """
    Returns PNG bytes of a clean panel layout diagram showing:
    - Roof area rectangle with panel grid
    - Key figures in a stat bar
    - Lighthief branding
    """
    img  = Image.new("RGB", (width, height), LIGHT)
    draw = ImageDraw.Draw(img)

    # ── Header bar ────────────────────────────────────────────────────────────
    draw.rectangle([0, 0, width, 48], fill=NAVY)
    draw.text((16, 14), "LIGHTHIEF", fill=GOLD)
    draw.text((16 + 110, 14), "  Solar Panel Layout — Indicative", fill=(180, 200, 220))

    # ── Roof rectangle ────────────────────────────────────────────────────────
    margin    = 24
    roof_top  = 60
    roof_bot  = height - 76
    roof_left = margin
    roof_right= width - margin
    roof_w    = roof_right - roof_left
    roof_h    = roof_bot - roof_top

    # Roof background (light concrete colour)
    draw.rectangle([roof_left, roof_top, roof_right, roof_bot],
                   fill=(220, 225, 230), outline=(160, 170, 180), width=2)

    # ── Panel grid ────────────────────────────────────────────────────────────
    # Work out the best rectangular grid layout for the panel count
    cols = max(1, int(math.sqrt(panel_count * roof_w / max(roof_h, 1))))
    cols = max(cols, 4)
    rows = math.ceil(panel_count / cols)

    # Panel size: fill ~85% of roof area evenly
    usable_w = roof_w * 0.88
    usable_h = roof_h * 0.88
    gap      = 3
    pw = max(6, int((usable_w - gap * (cols - 1)) / cols))
    ph = max(4, int(pw * 0.55))          # landscape panel ratio ~1.8:1

    # Recompute cols/rows to fit
    cols = max(1, int((usable_w + gap) / (pw + gap)))
    rows = math.ceil(panel_count / cols)
    # If too many rows, shrink ph
    while rows * (ph + gap) > usable_h and ph > 4:
        ph -= 1

    grid_w = cols * (pw + gap) - gap
    grid_h = rows * (ph + gap) - gap
    ox = roof_left + (roof_w - grid_w) // 2
    oy = roof_top  + (roof_h - grid_h) // 2

    drawn = 0
    for r in range(rows):
        for c in range(cols):
            if drawn >= panel_count:
                break
            x = ox + c * (pw + gap)
            y = oy + r * (ph + gap)
            # Panel face
            draw.rectangle([x, y, x + pw, y + ph], fill=PANEL_FILL)
            # Gold border
            draw.rectangle([x, y, x + pw, y + ph], outline=PANEL_BORDER, width=1)
            # Thin horizontal line (cell divider, 2 cells per panel)
            mid_y = y + ph // 2
            draw.line([(x + 1, mid_y), (x + pw - 1, mid_y)],
                      fill=(40, 70, 120), width=1)
            drawn += 1

    # Roof outline (on top of panels)
    draw.rectangle([roof_left, roof_top, roof_right, roof_bot],
                   fill=None, outline=(120, 135, 150), width=2)

    # ── Panel count label (centre of roof) ────────────────────────────────────
    label = f"{panel_count} panels  |  {peak_kw} kWp"
    # Draw label below grid if space, else overlay at bottom of roof
    label_y = oy + grid_h + 6
    if label_y + 18 > roof_bot - 4:
        label_y = roof_bot - 20
    draw.text((roof_left + roof_w // 2 - len(label) * 3, label_y),
              label, fill=GREY)

    # ── Stats bar ─────────────────────────────────────────────────────────────
    bar_top = height - 72
    draw.rectangle([0, bar_top, width, height], fill=NAVY)

    stats = [
        (f"{peak_kw} kWp",        "System Size"),
        (f"{annual_kwh:,} kWh",   "Annual Yield"),
        (f"EUR {savings_eur:,}",  "Savings / Year"),
        (f"{panel_count}",         "Panels"),
    ]
    col_w = width // len(stats)
    for idx, (val, lbl) in enumerate(stats):
        cx = idx * col_w + col_w // 2
        draw.text((cx - len(val) * 4, bar_top + 10), val, fill=GOLD)
        draw.text((cx - len(lbl) * 3, bar_top + 36), lbl,  fill=(150, 175, 210))
        if idx > 0:
            draw.line([(idx * col_w, bar_top + 8), (idx * col_w, height - 8)],
                      fill=(50, 75, 110), width=1)

    # ── Watermark ─────────────────────────────────────────────────────────────
    draw.text((width - 90, height - 16), "lighthief.cy", fill=(100, 120, 145))

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


if __name__ == "__main__":
    # Example: 60-panel 30 kWp system — typical clinic/restaurant
    png = make_panel_diagram(
        panel_count  = 60,
        peak_kw      = 30.0,
        annual_kwh   = 45_300,
        savings_eur  = 8_380,
        building_name= "Example Clinic",
    )
    out = "docs/solar-prospects/_panel_diagram_example.png"
    with open(out, "wb") as f:
        f.write(png)
    print(f"Saved: {out}")

    # Second example: 280-panel 140 kWp — large hotel
    png2 = make_panel_diagram(
        panel_count  = 280,
        peak_kw      = 140.0,
        annual_kwh   = 211_400,
        savings_eur  = 39_110,
        building_name= "Example Hotel",
        width        = 620,
        height       = 340,
    )
    out2 = "docs/solar-prospects/_panel_diagram_example_hotel.png"
    with open(out2, "wb") as f:
        f.write(png2)
    print(f"Saved: {out2}")
