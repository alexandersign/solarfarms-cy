# -*- coding: utf-8 -*-
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
src = Path(__file__).parent.joinpath("generate-adders-v5.py").read_text(encoding="utf-8").split("# ─── BUILD WORKBOOK")[0]
ns = {"__name__": "x", "__file__": str(Path(__file__).parent / "generate-adders-v5.py")}
exec(compile(src, "a", "exec"), ns)
g = ns
M = 0.115


def calc_row(mw, mwh, bess, mv, cnt, cif):
    a = g["calc_adders"]("x", mw, mwh, bess, mv, cnt, cif)
    hw = g["EMS_HW"].get((bess, mv), 11263)
    ems = hw + g["SCADA_LOCAL"]
    inst = cif + a["phys_total"] + ems
    client = round(inst / (1 - M))
    return cif / mwh / 1000, client / mwh, client


from loi_docx_common import (
    PIPELINE,
    GALASCOPE,
    pipeline_phase_totals,
    STANDARD_4BESS_1MV_20MWh_CLIENT_EUR_PER_MWH,
    STANDARD_2MV_25MWh_CLIENT_EUR_PER_MWH,
    GALASCOPE_LOCKED_EUR_PER_MWH,
)

print("=" * 78)
print("EUR / MWh PRICING — LY202601271 + v5 adders @ 11.5% margin")
print("=" * 78)

print("\n## LY verified reference (by topology)\n")
print(f"{'Configuration':<34} {'MW':>5} {'MWh':>5} {'MV':>2} {'CIF/kWh':>8} {'Client/MWh':>11}")
print("-" * 78)
refs = [
    ("5/20 — floor (4 BESS + 1 MV)", "Esperia Famagusta 2"),
    ("6.5/20 (4 BESS + 1 MV)", "Esperia Famagusta"),
    ("6/20 (4 BESS + 1 MV)", "Esperia Tseri 2c"),
    ("7/20 (4 BESS + 1 MV)", "Esperia Tseri"),
    ("7.5/25 (5 BESS + 2 MV)", "Esperia Tseri 2b"),
    ("7.7/25 (5 BESS + 2 MV)", "My Sun Park"),
    ("8/24 (5 BESS + 2 MV)", "AGM Lightpower"),
    ("8/60 (12 BESS + 2 MV)", "Esperia Limassol"),
    ("2.5/10 (2 BESS + 1 MV)", "Galascope 2"),
    ("2.5/7.5 (2 BESS + 1 MV)", "Esperia Tseri 2a"),
]
for label, key in refs:
    mw, mwh, bess, mv, cnt, cif, _ = g["CIF"][key]
    ck, cm, _ = calc_row(mw, mwh, bess, mv, cnt, cif)
    print(f"{label:<34} {mw:>5.1f} {mwh:>5.1f} {mv:>2} {ck:>8.1f} {cm:>11,.0f}")

print("\n## No LY line: 8/30 or 7/30")
print("  Internal estimate only: 7MW/30MWh CIF ~90.77/kWh -> ~105k/MWh installed (cif-targets excel)")

print("\n## Galascope LOI (locked — separate deal)\n")
print(f"{'Park':<20} {'MWh':>8} {'EUR/MWh':>12} {'Total EUR':>14}")
print("-" * 58)
for p in GALASCOPE:
    e = p.get("effective_mwh", p["mwh"])
    print(f"{p['name']:<20} {e:>8.2f} {GALASCOPE_LOCKED_EUR_PER_MWH if '1' in p['name'] else 120630:>12,.0f} {p['client_price']:>14,}")

print("\n## Pipeline LOI — current Schedule 1 (Dino sizes)\n")
print(f"{'Park':<34} {'MW':>5} {'MWh':>5} {'Tier':<10} {'EUR/MWh':>10} {'Total EUR':>12}")
print("-" * 82)
rows = []
for phase in ("phase1", "phase2", "phase3"):
    for p in PIPELINE[phase]:
        mwh = p["mwh"]
        price = p["client_price"]
        eur_mwh = price / mwh
        if p["mw"] >= 6 and mwh >= 25:
            tier = "2MV/25"
        elif p["mw"] < 6 and mwh <= 20:
            tier = "1MV/20"
        else:
            tier = "mixed"
        rows.append((eur_mwh, p, tier, price))
        print(f"{p['name']:<34} {p['mw']:>5.2f} {mwh:>5.1f} {tier:<10} {eur_mwh:>10,.0f} {price:>12,}")

total = sum(p["client_price"] for phase in PIPELINE for p in PIPELINE[phase])
total_mwh = sum(p["mwh"] for phase in PIPELINE for p in PIPELINE[phase])
print("-" * 82)
print(f"{'TOTAL (9 parks)':<34} {'':>5} {total_mwh:>5.1f} {'':<10} {total/total_mwh:>10,.0f} {total:>12,}")

print("\n## Pricing tier constants (code)\n")
print(f"  Tier 1 — 1 MV class (~20 MWh, <=5 MW):  EUR {STANDARD_4BESS_1MV_20MWh_CLIENT_EUR_PER_MWH:,}/MWh")
print(f"  Tier 2 — 2 MV class (25 MWh, >=6 MW):   EUR {STANDARD_2MV_25MWh_CLIENT_EUR_PER_MWH:,}/MWh")
print(f"  Galascope G1 only:                     EUR {GALASCOPE_LOCKED_EUR_PER_MWH:,}/MWh")

print("\n## Sorted by client EUR/MWh (pipeline + tiers)\n")
all_rates = [
    ("Galascope G1 (locked)", GALASCOPE_LOCKED_EUR_PER_MWH),
    ("Tier 1 — 1MV/20", STANDARD_4BESS_1MV_20MWh_CLIENT_EUR_PER_MWH),
    ("Limassol 8/60 (LY)", calc_row(*g["CIF"]["Esperia Limassol"][:6])[1]),
    ("Frenaros 25/100 (LY)", calc_row(*g["CIF"]["Esperia Frenaros"][:6])[1]),
    ("Tier 2 — 2MV/25", STANDARD_2MV_25MWh_CLIENT_EUR_PER_MWH),
    ("6.5/20 Famagusta (LY)", calc_row(*g["CIF"]["Esperia Famagusta"][:6])[1]),
    ("Galascope 2 / 2.5/10", calc_row(*g["CIF"]["Galascope 2"][:6])[1]),
    ("Tseri 2-A 2.5/7.5", calc_row(*g["CIF"]["Esperia Tseri 2a"][:6])[1]),
]
for name, rate in sorted(all_rates, key=lambda x: x[1]):
    print(f"  {rate:>10,.0f}/MWh  {name}")

print("\n## User decisions — Tseri 3 / 2-A / 2-B\n")
from loi_docx_common import GALASCOPE_LOCKED_EUR_PER_MWH, standard_2mv_25mwh_client_price

t3 = round(GALASCOPE_LOCKED_EUR_PER_MWH * 20)
t2b = standard_2mv_25mwh_client_price(30)
print(f"Tseri 3 (4.75/20): Galascope rate {GALASCOPE_LOCKED_EUR_PER_MWH:,}/MWh -> EUR {t3:,}")
print(f"Tseri 2-B (7.99/30): 7.5/25 tier {STANDARD_2MV_25MWh_CLIENT_EUR_PER_MWH:,}/MWh -> EUR {t2b:,}")

print("\nTseri 2-A (2.75/10) nearest LY matches:")
for label, key in [
    ("Galascope 2 LY 2.5/10", "Galascope 2"),
    ("Tseri 2a LY 2.5/7.5 (wrong MWh)", "Esperia Tseri 2a"),
    ("Tseri 3 LY 4.5/15 (wrong size)", "Esperia Tseri 3"),
]:
    mw, mwh, bess, mv, cnt, cif, _ = g["CIF"][key]
    _, cm, cl = *calc_row(mw, mwh, bess, mv, cnt, cif), cl
    print(f"  {label}: {cm:,.0f}/MWh -> {cl:,}")

mw, mwh, bess, mv, cnt, cif, _ = g["CIF"]["Galascope 2"]
cif275 = cif * (2.75 / 2.5)
_, cm, cl = *calc_row(2.75, 10, bess, mv, cnt, cif275), cl
print(f"  2.75/10 scaled from Galascope 2 CIF: {cm:,.0f}/MWh -> {cl:,}")
print(f"  Galascope G2 LOI locked: 120,630/MWh -> {120_630 * 10:,}")
print(f"  Current pipeline 2-A LOI: 108,462/MWh -> 1,084,620")
