# -*- coding: utf-8 -*-
"""Pipeline LOI park pricing: LY verified CIF + v5 adders + 11.5% margin."""
from pathlib import Path

path = Path(__file__).parent / "generate-adders-v5.py"
src = path.read_text(encoding="utf-8").split("# ─── BUILD WORKBOOK")[0]
ns = {"__name__": "x", "__file__": str(path)}
exec(compile(src, str(path), "exec"), ns)
g = ns
MARGIN = 0.115
EMS_HW = g["EMS_HW"]
SCADA_LOCAL = g["SCADA_LOCAL"]


def price(mw, mwh, bess, mv, cnt, cif, cif_ref, cif_note):
    a = g["calc_adders"]("x", mw, mwh, bess, mv, cnt, cif)
    hw = EMS_HW.get((bess, mv), EMS_HW.get((bess, 1), 11263))
    ems = hw + SCADA_LOCAL
    inst = cif + a["phys_total"] + ems
    client = round(inst / (1 - MARGIN))
    return dict(
        mw=mw, mwh=mwh, bess=bess, mv=mv, cnt=cnt,
        cif=cif, cif_kwh=cif / mwh / 1000,
        cif_ref=cif_ref, cif_note=cif_note,
        installed=inst, inst_mwh=inst / mwh,
        client=client, client_mwh=client / mwh,
        margin_pct=MARGIN * 100,
    )


# Per-BESS-container CIF (5.015 MWh units) from verified lines
def bess_unit_cif(key):
    mw, mwh, bess, mv, cnt, cif, _ = g["CIF"][key]
    return cif / bess


BESS_UNIT = {
    "5MWh_block": bess_unit_cif("Esperia Famagusta 2"),  # 5/20 standard
    "5MWh_2b": bess_unit_cif("Esperia Tseri 2b"),
}

# Verified LY reference rows (Esperia + baseline 5/20)
VERIFIED = [
    ("LY202601271", "Esperia Famagusta 2", *g["CIF"]["Esperia Famagusta 2"][:6]),
    ("LY202601271", "Esperia Famagusta", *g["CIF"]["Esperia Famagusta"][:6]),
    ("LY202601271", "Esperia Limassol", *g["CIF"]["Esperia Limassol"][:6]),
    ("LY202601271", "Esperia Frenaros", *g["CIF"]["Esperia Frenaros"][:6]),
    ("LY202601271", "Esperia Tseri 2c", *g["CIF"]["Esperia Tseri 2c"][:6]),
    ("LY202601271", "Esperia Tseri", *g["CIF"]["Esperia Tseri"][:6]),
    ("LY202601271", "Esperia Tseri 2b", *g["CIF"]["Esperia Tseri 2b"][:6]),
    ("LY202601271", "Esperia Tseri 2a", *g["CIF"]["Esperia Tseri 2a"][:6]),
    ("LY202601271", "Esperia Tseri 3", *g["CIF"]["Esperia Tseri 3"][:6]),
    ("LY202601271", "Galascope 2 (2.5/10)", *g["CIF"]["Galascope 2"][:6]),
]

# Pipeline LOI parks — final Dino size + pricing topology
# (name, mw, mwh, bess, mv, cnt, cif, cif_ref, note)
PIPELINE = [
    (
        "Esperia Energy (Famagusta)",
        6.5, 20, 4, 1, 5,
        g["CIF"]["Esperia Famagusta"][5],
        "Esperia Famagusta",
        "LY exact — 6.5MW 4×BESS + 1×T4 MV (5 cnt)",
    ),
    (
        "Esperia Green Energy (Limassol)",
        8.0, 60, 12, 2, 14,
        g["CIF"]["Esperia Limassol"][5],
        "Esperia Limassol",
        "LY exact — 8MW 12×BESS + 2×MV (14 cnt)",
    ),
    (
        "Esperia Energy (Frenaros)",
        25.0, 100, 20, 3, 23,
        g["CIF"]["Esperia Frenaros"][5],
        "Esperia Frenaros",
        "LY exact — 25MW 20×BESS + 3×MV (23 cnt)",
    ),
    (
        "Esperia Green Energy (Famagusta 2)",
        7.0, 25, 5, 2, 7,
        g["CIF"]["Esperia Tseri 2b"][5],
        "Esperia Tseri 2b",
        "Nearest verified — 7.5/25 5×BESS + 2×MV; 7/25 uses same 2-MV class",
    ),
    (
        "Esperia Energy (Tseri)",
        7.2, 25, 5, 2, 7,
        g["CIF"]["Esperia Tseri 2b"][5],
        "Esperia Tseri 2b",
        "Nearest verified — no 7.2/25 LY line; 2-MV 25MWh block",
    ),
    (
        "Esperia Energy (Tseri 2-A)",
        2.75, 10, 2, 1, 3,
        g["CIF"]["Galascope 2"][5],
        "Galascope 2",
        "Nearest verified — 2.5/10 2×BESS + 1×MV (3 cnt)",
    ),
    (
        "Esperia Energy (Tseri 2-B)",
        7.99, 30, 6, 2, 8,
        g["CIF"]["Esperia Tseri 2b"][5] + bess_unit_cif("Esperia Tseri 2b"),
        "Esperia Tseri 2b + 1 BESS",
        "2b CIF + 1× BESS container (5.015 MWh module)",
    ),
    (
        "Esperia Energy (Tseri 2-C)",
        6.3, 25, 5, 1, 6,
        g["CIF"]["Esperia Tseri 2c"][5] + bess_unit_cif("Esperia Tseri 2c"),
        "Esperia Tseri 2c + 1 BESS",
        "6/20 LY + 5th BESS — 1×MV (6 cnt), not 2×MV",
    ),
    (
        "Esperia Energy (Tseri 3)",
        4.75, 20, 4, 1, 5,
        g["CIF"]["Esperia Famagusta 2"][5],
        "Esperia Famagusta 2",
        "4×BESS + 1×MV @ 20MWh — same topology as 5/20 cheapest block",
    ),
]

print("=" * 110)
print("VERIFIED LY202601271 CIF REFERENCE — €/MWh (v5 adders + 11.5% margin)")
print("5 MW / 20 MWh (4 BESS + 1 MV) = cheapest standard block")
print("=" * 110)
print(f"{'LY line':<28} {'MW':>5} {'MWh':>5} {'BESS':>4} {'MV':>2} {'Cnt':>3} {'CIF':>12} {'CIF/kWh':>8} {'Inst/MWh':>10} {'Client/MWh':>11}")
print("-" * 110)
for ref, name, mw, mwh, bess, mv, cnt, cif in VERIFIED:
    r = price(mw, mwh, bess, mv, cnt, cif, name, "verified")
    print(
        f"{name:<28} {mw:>5.1f} {mwh:>5.1f} {bess:>4} {mv:>2} {cnt:>3} {cif:>12,.0f} "
        f"{r['cif_kwh']:>8.1f} {r['inst_mwh']:>10,.0f} {r['client_mwh']:>11,.0f}"
    )

print()
print("=" * 110)
print("PIPELINE LOI SCHEDULE 1 — indicative client pricing @ 11.5% margin")
print("=" * 110)
print(f"{'Park':<32} {'MW':>5} {'MWh':>5} {'BESS':>4} {'MV':>2} {'Cnt':>3} {'Nearest CIF':<22} {'CIF':>11} {'Client':>12} {'€/MWh':>9}")
print("-" * 110)

total = 0
for row in PIPELINE:
    name, mw, mwh, bess, mv, cnt, cif, cref, note = row
    r = price(mw, mwh, bess, mv, cnt, cif, cref, note)
    total += r["client"]
    print(
        f"{name:<32} {mw:>5.2f} {mwh:>5.1f} {bess:>4} {mv:>2} {cnt:>3} {cref:<22} "
        f"{cif:>11,.0f} {r['client']:>12,} {r['client_mwh']:>9,.0f}"
    )

print("-" * 110)
print(f"{'TOTAL (9 parks)':<32} {'':>5} {'':>5} {'':>4} {'':>2} {'':>3} {'':<22} {'':>11} {total:>12,}")

print()
print("DETAIL NOTES")
for row in PIPELINE:
    name, mw, mwh, bess, mv, cnt, cif, cref, note = row
    r = price(mw, mwh, bess, mv, cnt, cif, cref, note)
    print(f"  {name}")
    print(f"    {note}")
    print(f"    CIF EUR {cif:,.0f} ({r['cif_kwh']:.1f}/kWh) -> installed EUR {r['installed']:,.0f} -> client EUR {r['client']:,} @ {MARGIN*100:.1f}%")
