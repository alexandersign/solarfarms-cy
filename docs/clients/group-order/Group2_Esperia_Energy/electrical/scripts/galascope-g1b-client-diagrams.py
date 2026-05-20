"""
Galascope 1 (5 MW) — Option 2 (G1b) client concept diagrams.
Generates PNGs in electrical/client/diagrams/

Run from electrical/scripts:
  python galascope-g1b-client-diagrams.py
"""

from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle, Rectangle
import matplotlib.patches as mpatches

SCRIPT_DIR = Path(__file__).resolve().parent
OUT_DIR = SCRIPT_DIR.parent / "client" / "diagrams"
OUT_DIR.mkdir(parents=True, exist_ok=True)

NAVY = "#1A365D"
GOLD = "#C9A432"
LIGHT = "#2B5FA0"
GREY = "#404040"
WHITE = "#FFFFFF"
MV = "#C0392B"
OK = "#2E7D32"
WARN = "#B7791F"


def box(ax, xy, w, h, label, sub=None, fc="#E8EEF4", ec=NAVY, fontsize=9):
    x, y = xy
    p = FancyBboxPatch(
        (x, y), w, h,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        linewidth=1.5, edgecolor=ec, facecolor=fc,
    )
    ax.add_patch(p)
    ax.text(x + w / 2, y + h * 0.62, label, ha="center", va="center",
            fontsize=fontsize, fontweight="bold", color=NAVY)
    if sub:
        ax.text(x + w / 2, y + h * 0.28, sub, ha="center", va="center",
                fontsize=7.5, color=GREY)


def arrow(ax, p1, p2, color=NAVY, style="-|>", lw=1.8):
    ax.add_patch(FancyArrowPatch(
        p1, p2, arrowstyle=style, mutation_scale=14,
        linewidth=lw, color=color, shrinkA=4, shrinkB=4,
    ))


def diagram_01_before_after():
    """SwS + four MCTS — today vs Option 2 (MCTS 1+2 only)."""
    fig, axes = plt.subplots(1, 2, figsize=(14, 7))
    fig.suptitle(
        "Galascope 1 (5 MW) — Option 2: extend nearest 8DJH (G1b)\n"
        "Scope: MCTS 1 & 2 nearest customer MV station — MCTS 3 & 4 unchanged",
        fontsize=13, fontweight="bold", color=NAVY,
    )

    for ax, title, phase in zip(axes, ["Today (as-built)", "After Option 2 (G1b + Rev F)"], ["before", "after"]):
        ax.set_xlim(0, 10)
        ax.set_ylim(0, 10)
        ax.set_aspect("equal")
        ax.axis("off")
        ax.set_title(title, fontsize=11, fontweight="bold", color=GOLD, pad=12)

        box(ax, (3.2, 7.2), 3.6, 1.5, "Customer MV station", "ABB UniSec 24 kV", fc="#D6E4F0")

        if phase == "before":
            for i, (jz, mcts) in enumerate([("JZ2", "MCTS 1"), ("JZ3", "MCTS 2"), ("JZ?", "MCTS 3"), ("JZ?", "MCTS 4")]):
                y = 5.2 - i * 1.15
                arrow(ax, (5, 7.2), (5, y + 1.05), color=MV)
                box(ax, (3.5, y), 3.0, 0.95, mcts, f"{jz} feeder · 8DJH R+T · 1250 kVA", fontsize=8)
            box(ax, (0.4, 0.5), 9.2, 0.9, "BESS needs a UniSec bay — panel appears full (≥4 cubicles)",
                sub="No spare cubicle for 5 MW BESS skid", fc="#FDEBD0", ec=WARN, fontsize=8)
        else:
            arrow(ax, (5, 7.2), (5, 6.0), color=MV)
            box(ax, (2.8, 4.6), 4.4, 1.35, "MCTS 1 (nearest)", "8DJH  R + T₁ + T₂  ← NEW T-module", fc="#D5F5E3", ec=OK)
            arrow(ax, (5, 4.6), (5, 3.85), color=MV)
            ax.plot([5, 8.2], [3.4, 3.4], color=MV, lw=2)
            ax.text(6.6, 3.55, "~10 m MV cable", fontsize=8, color=GREY, ha="center")
            arrow(ax, (8.2, 3.4), (8.2, 2.55), color=MV)
            box(ax, (6.7, 1.6), 3.0, 0.95, "MCTS 2", "Trafo HV fed from T₂ · R isolated/standby", fontsize=8)
            arrow(ax, (5, 7.2), (1.8, 5.5), color="#8E44AD", lw=2)
            box(ax, (0.3, 4.5), 2.2, 1.1, "JZ3", "BESS 5 MW", fc="#E8DAEF", ec="#8E44AD", fontsize=8)
            for mcts, y in [("MCTS 3", 3.0), ("MCTS 4", 1.5)]:
                arrow(ax, (5, 7.2), (5, y + 0.95), color=MV, lw=1.2)
                box(ax, (3.5, y), 3.0, 0.85, mcts, "Unchanged · own SwS feeder", fontsize=8, fc="#F4F6F7")

    fig.tight_layout(rect=[0, 0, 1, 0.92])
    path = OUT_DIR / "01-g1b-before-after-sws-mcts.png"
    fig.savefig(path, dpi=160, facecolor="white", bbox_inches="tight")
    plt.close(fig)
    print(f"  {path}")


def diagram_02_8djh_lineup():
    """8DJH module lineup at MCTS 1."""
    fig, ax = plt.subplots(figsize=(11, 5))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 6)
    ax.axis("off")
    fig.suptitle("Option 2 — Siemens 8DJH extension at nearest MCTS (MCTS 1 or 2)",
                 fontsize=13, fontweight="bold", color=NAVY)

    modules = [
        ("R\nRing / incomer", "From UniSec JZ2", "#D6E4F0", NAVY),
        ("T₁\n80 A fuse", "Existing · to Trafo 1", "#D6E4F0", NAVY),
        ("T₂\n80 A fuse", "NEW module · ~10 m to Trafo 2", "#D5F5E3", OK),
    ]
    x = 0.8
    for title, sub, fc, ec in modules:
        box(ax, (x, 2.2), 2.6, 2.2, title, sub, fontsize=10, fc=fc, ec=ec)
        if x > 0.8:
            arrow(ax, (x - 0.15, 3.3), (x, 3.3), color=NAVY)
        x += 3.0

    box(ax, (9.5, 2.5), 2.0, 1.6, "1250 kVA", "Lami · 800 V LVS", fontsize=9)
    arrow(ax, (8.4, 3.1), (9.5, 3.1), color=MV)
    ax.text(8.0, 1.2, "Second trafo at MCTS 2 via MV cable only (LV buses not tied)",
            fontsize=9, color=GREY, ha="center")

    ax.text(0.5, 0.4,
            "Ratings (as-built): 22 kV · 20 kA / 3 s · 200 A bus · Dyn11 1250 kVA · match existing 8DJH serial",
            fontsize=8.5, color=GREY)
    path = OUT_DIR / "02-g1b-8djh-r-t1-t2-lineup.png"
    fig.savefig(path, dpi=160, facecolor="white", bbox_inches="tight")
    plt.close(fig)
    print(f"  {path}")


def diagram_03_site_plan():
    """Top-down site schematic."""
    fig, ax = plt.subplots(figsize=(10, 8))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.suptitle("Galascope 1 — site layout (concept) — Option 2 coupling MCTS 1 ↔ 2 only",
                 fontsize=12, fontweight="bold", color=NAVY)

    box(ax, (4.0, 8.2), 2.0, 1.0, "UniSec SwS", "", fontsize=9)
    box(ax, (2.0, 5.8), 2.2, 1.4, "MCTS 1", "8DJH extended", fc="#D5F5E3", ec=OK)
    box(ax, (4.3, 5.8), 2.2, 1.4, "MCTS 2", "~10 m from MCTS 1", fc="#D5F5E3", ec=OK)
    box(ax, (6.6, 5.8), 2.2, 1.4, "MCTS 3", "no change", fontsize=9)
    box(ax, (6.6, 3.8), 2.2, 1.4, "MCTS 4", "no change", fontsize=9)
    box(ax, (0.5, 7.5), 2.0, 1.2, "BESS skid", "JZ3 feeder", fc="#E8DAEF", ec="#8E44AD")

    arrow(ax, (5, 8.2), (3.1, 7.2), color=MV)
    arrow(ax, (5, 8.2), (5.4, 7.2), color=MV)
    ax.annotate("", xy=(4.3, 6.5), xytext=(4.2, 6.5),
                arrowprops=dict(arrowstyle="<->", color=MV, lw=2))
    ax.text(4.25, 6.75, "~10 m", fontsize=9, color=MV, ha="center", fontweight="bold")
    arrow(ax, (4.2, 5.8), (5.4, 6.5), color=MV, style="-")
    ax.plot([4.2, 5.4], [6.2, 6.2], color=MV, lw=2, linestyle="--")

    for x in [7.7, 7.7]:
        arrow(ax, (5, 8.2), (x, 7.2), color=MV, lw=1.2)
    arrow(ax, (1.5, 7.5), (4.0, 8.0), color="#8E44AD")

    ax.text(5, 0.6,
            "11 inverters per MCTS · 44 total · HV parallel only (not 800 V)",
            ha="center", fontsize=9, color=GREY)

    path = OUT_DIR / "03-g1b-site-layout-mcts1-2.png"
    fig.savefig(path, dpi=160, facecolor="white", bbox_inches="tight")
    plt.close(fig)
    print(f"  {path}")


def diagram_04_work_sequence():
    """Simple outage / works flow."""
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis("off")
    fig.suptitle("Option 2 — indicative works sequence (MCTS/EAC outage)",
                 fontsize=12, fontweight="bold", color=NAVY)

    steps = [
        "1. Agree outage · isolate MCTS 1 & 2 feeders",
        "2. Install matched 8DJH T-module on nearest MCTS (factory extension)",
        "3. Lay ~10 m MV cable MCTS 1 T₂ → MCTS 2 transformer",
        "4. Retire SwS feeder that served MCTS 2; reconfigure JZ3 → BESS",
        "5. Tap sync / witness test · commission BESS feeder",
    ]
    y = 6.0
    for s in steps:
        box(ax, (0.5, y - 0.55), 9.0, 0.9, s, fc="#F8F9FA", ec=NAVY, fontsize=9)
        y -= 1.15

    path = OUT_DIR / "04-g1b-works-sequence.png"
    fig.savefig(path, dpi=160, facecolor="white", bbox_inches="tight")
    plt.close(fig)
    print(f"  {path}")


def main():
    print("Generating Option 2 (G1b) client diagrams...")
    diagram_01_before_after()
    diagram_02_8djh_lineup()
    diagram_03_site_plan()
    diagram_04_work_sequence()
    print(f"Done -> {OUT_DIR}")


if __name__ == "__main__":
    main()
