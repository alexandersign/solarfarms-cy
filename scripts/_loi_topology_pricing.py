# -*- coding: utf-8 -*-
"""Compare installed/client EUR per MWh by MV/BESS topology — not flat LOI/MWh."""
from pathlib import Path

path = Path(__file__).parent / "generate-adders-v5.py"
src = path.read_text(encoding="utf-8").split("# ─── BUILD WORKBOOK")[0]
ns = {"__name__": "x", "__file__": str(path)}
exec(compile(src, str(path), "exec"), ns)
g = ns
MARGIN_ESPERIA = 0.115  # ~11.5% group; LOI phase1 ~7-16% varies


def row(mw, mwh, bess, mv, cnt, cif, label):
    a = g["calc_adders"]("x", mw, mwh, bess, mv, cnt, cif)
    hw = g["EMS_HW"].get((bess, mv), g["EMS_HW"].get((bess, 1), 11263))
    ems = hw + g["SCADA_LOCAL"]
    inst = cif + a["phys_total"] + ems
    client = round(inst / (1 - MARGIN_ESPERIA))
    return dict(
        label=label,
        mw=mw,
        mwh=mwh,
        bess=bess,
        mv=mv,
        cnt=cnt,
        cif=cif,
        cif_kwh=cif / mwh / 1000,
        installed=inst,
        inst_mwh=inst / mwh,
        client=client,
        client_mwh=client / mwh,
    )


# LY exact Esperia lines
refs = [
    row(*g["CIF"]["Esperia Famagusta 2"][:6], "5 MW / 20 — 4 BESS + 1 MV (T4)"),
    row(*g["CIF"]["Esperia Famagusta"][:6], "6.5 MW / 20 — 4 BESS + 1 MV"),
    row(*g["CIF"]["Esperia Tseri 2c"][:6], "6 MW / 20 — 4 BESS + 1 MV"),
    row(*g["CIF"]["Esperia Tseri"][:6], "7 MW / 20 — 4 BESS + 1 MV"),
    row(*g["CIF"]["Esperia Tseri 2b"][:6], "7.5 MW / 25 — 5 BESS + 2 MV"),
    row(*g["CIF"]["Esperia Tseri 2a"][:6], "2.5 MW / 7.5 — 2 BESS + 1 MV"),
    row(*g["CIF"]["Esperia Tseri 3"][:6], "4.5 MW / 15 — 3 BESS + 1 MV"),
]

# Estimated Dino finals (container rules: ~5.015 MWh/BESS; MV skid steps at 5 MW blocks)
estimates = [
    # 6.3/25: 5 BESS + 1×T4 MV (6 cnt) — NOT dual MV like 7.5/25
    row(6.3, 25, 5, 1, 6, g["CIF"]["Esperia Tseri 2c"][5] * (25 / 20), "EST 6.3/25 — scale 6/20 CIF×MWh only (weak)"),
    row(6.3, 25, 5, 1, 6, 2_384_149, "EST 6.3/25 — 6/20 CIF + 1 BESS block (~€474k)"),
    row(7.0, 25, 5, 1, 6, g["CIF"]["Esperia Tseri 2b"][5] * (6 / 7), "EST 7/25 — 2b CIF pro-rata 6cnt (rough)"),
    row(7.2, 25, 5, 2, 7, g["CIF"]["Esperia Tseri 2b"][5], "7.2/25 — use 2b 7.5/25 LY (2 MV)"),
    row(7.0, 25, 5, 2, 7, g["CIF"]["Esperia Tseri 2b"][5], "7/25 — Tseri 2b LY exact"),
]

print("REFERENCE LY TOPOLOGIES — installed & client EUR/MWh (11.5% margin on calc installed)")
print(f"{'Config':<42} {'MV':>2} {'cnt':>3} {'CIF/kWh':>8} {'Inst/MWh':>10} {'Client/MWh':>11}")
print("-" * 85)
for r in refs:
    print(
        f"{r['label']:<42} {r['mv']:>2} {r['cnt']:>3} {r['cif_kwh']:>8.1f} "
        f"{r['inst_mwh']:>10,.0f} {r['client_mwh']:>11,.0f}"
    )

print()
print("WRONG: LOI Tseri 2-C client/MWh = 1,551,848/20 =", f"{1_551_848/20:,.0f}", "(uses stale 6/20 deal, not topology)")
print()

print("DINO FINAL SIZES — recommended nearest topology + full recalc")
print(f"{'Park':<28} {'Final':<12} {'Nearest topology':<32} {'Client/MWh':>11} {'CALC LOI':>12}")
print("-" * 95)

pipeline = [
    ("Famagusta 2", "7/25", "7.5/25 — 5 BESS + 2 MV", 7.0, 25, 5, 2, 7, g["CIF"]["Esperia Tseri 2b"][5]),
    ("Tseri", "7.2/25", "7.5/25 — 5 BESS + 2 MV", 7.2, 25, 5, 2, 7, g["CIF"]["Esperia Tseri 2b"][5]),
    ("Tseri 2-A", "2.75/10", "2.5/10 — Galascope 2 match", 2.75, 10, 2, 1, 3, g["CIF"]["Galascope 2"][5]),
    ("Tseri 2-B", "7.99/30", "7.5/25 + 1 BESS module", 7.99, 30, 6, 2, 8, None),
    ("Tseri 2-C", "6.3/25", "6/20 + 1 BESS (5cnt+1MV)", 6.3, 25, 5, 1, 6, None),
    ("Tseri 3", "4.75/20", "4.5/15 scaled BESS count", 4.75, 20, 4, 1, 5, None),
]

# 2-B: 2b installed + one extra 5MWh container economics
r2b = row(*g["CIF"]["Esperia Tseri 2b"][:6], "2b")
bess_cif_unit = r2b["cif"] / r2b["bess"]  # per BESS container CIF share
# 2-C: 6/20 CIF + 1 extra BESS at unit CIF
r2c_ly = row(*g["CIF"]["Esperia Tseri 2c"][:6], "2c")
cif_2c_25 = r2c_ly["cif"] + bess_cif_unit  # 5th BESS container

# Tseri 3: 4.75/20 — between 4.5/15 and 5/20; use 4 BESS + 1 MV
cif_t3 = g["CIF"]["Esperia Tseri 3"][5] * (20 / 15)  # weak scale
cif_t3_bess = r2c_ly["cif"] / 4 * (20 / 5.015) * 4  # nonsense - use 4.5/15 + 1 bess fraction

pipeline_calc = [
    ("Famagusta 2", 7.0, 25, 5, 2, 7, g["CIF"]["Esperia Tseri 2b"][5]),
    ("Tseri", 7.2, 25, 5, 2, 7, g["CIF"]["Esperia Tseri 2b"][5]),
    ("Tseri 2-A", 2.75, 10, 2, 1, 3, g["CIF"]["Galascope 2"][5]),
    ("Tseri 2-B", 7.99, 30, 6, 2, 8, r2b["cif"] + bess_cif_unit),
    ("Tseri 2-C", 6.3, 25, 5, 1, 6, cif_2c_25),
    ("Tseri 3", 4.75, 20, 4, 1, 5, g["CIF"]["Esperia Tseri 3"][5] + bess_cif_unit * 0.25),
]

for name, mw, mwh, bess, mv, cnt, cif in pipeline_calc:
    r = row(mw, mwh, bess, mv, cnt, cif, name)
    print(
        f"{name:<28} {mw}/{mwh:<8} {bess}BESS+{mv}MV {cnt}cnt"
        f"{'':>8} {r['client_mwh']:>11,.0f} {r['client']:>12,}"
    )

print()
print("vs flat LOI/MWh mistake on 2-C:", f"{1_551_848/20:,.0f}/MWh client")
print("vs 6/20 LY topology client/MWh:", f"{r2c_ly['client_mwh']:,.0f}/MWh")
print("vs 6.3/25 recalc (5 BESS+1MV):", f"{row(6.3,25,5,1,6,cif_2c_25,'x')['client_mwh']:,.0f}/MWh")
