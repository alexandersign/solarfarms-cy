# -*- coding: utf-8 -*-
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
p = Path(__file__).parent / "generate-adders-v5.py"
src = p.read_text(encoding="utf-8").split("\u2500\u2500\u2500 BUILD WORKBOOK")[0]
ns = {"__name__": "x", "__file__": str(p)}
exec(compile(src, "a", "exec"), ns)
g, M = ns, 0.115

from loi_docx_common import (
    GALASCOPE,
    PIPELINE,
    GALASCOPE_LOCKED_EUR_PER_MWH,
    GALASCOPE_G2_LOCKED_TOTAL,
    standard_2mv_25mwh_client_price,
)

G2_RATE = 120_630


def v5_at(key):
    mw, mwh, bess, mv, cnt, cif, _ = g["CIF"][key]
    a = g["calc_adders"]("x", mw, mwh, bess, mv, cnt, cif)
    hw = g["EMS_HW"].get((bess, mv), 11263)
    inst = cif + a["phys_total"] + hw + g["SCADA_LOCAL"]
    cl = round(inst / (1 - M))
    return cif, cif / mwh / 1000, cl, cl / mwh


def loi_price(name):
    for x in GALASCOPE:
        if name in x["name"]:
            return x["client_price"]
    for ph in PIPELINE.values():
        for x in ph:
            if name in x["name"]:
                return x["client_price"]
    return 0


ROWS = [
    ("Galascope", "G1", 5.0, 20, 5, "Galascope 1", "Famagusta 2 match", 2_238_000, "Locked"),
    ("Galascope", "G2", 2.5, 10, 3, "Galascope 2", "Dianary 2.5/10", 1_206_300, "Locked"),
    ("Pipeline", "Famagusta", 6.5, 20, 4, "Esperia Famagusta", "LY exact", None, "v5 or hold LOI"),
    ("Pipeline", "Limassol", 8.0, 60, 12, "Esperia Limassol", "LY exact", None, "LY calc"),
    ("Pipeline", "Frenaros", 25.0, 100, 20, "Esperia Frenaros", "LY exact", None, "LY calc"),
    ("Pipeline", "Famagusta 2", 7.0, 25, 7, "Esperia Tseri 2b", "7.5/25 tier", standard_2mv_25mwh_client_price(25), "Tier 2"),
    ("Pipeline", "Tseri", 7.2, 25, 7, "Esperia Tseri 2b", "7.5/25 tier", standard_2mv_25mwh_client_price(25), "Tier 2"),
    ("Pipeline", "Tseri 2-A", 2.75, 10, 3, "Galascope 2", "2.5/10 class", G2_RATE * 10, "G2 rate"),
    ("Pipeline", "Tseri 2-B", 7.99, 30, 6, "Esperia Tseri 2b", "7.5/25 €/MWh", standard_2mv_25mwh_client_price(30), "Tier 2 ×30"),
    ("Pipeline", "Tseri 2-C", 6.3, 25, 7, "Esperia Tseri 2b", "7.5/25 tier", standard_2mv_25mwh_client_price(25), "Tier 2"),
    ("Pipeline", "Tseri 3", 4.75, 20, 5, "Esperia Famagusta 2", "4+1 MV", GALASCOPE_LOCKED_EUR_PER_MWH * 20, "G1 rate"),
]

names = {
    "G1": "Galascope 1",
    "G2": "Galascope 2",
    "Famagusta": "Esperia Energy (Famagusta)",
    "Limassol": "Esperia Green Energy (Limassol)",
    "Frenaros": "Esperia Energy (Frenaros)",
    "Famagusta 2": "Esperia Green Energy (Famagusta 2)",
    "Tseri": "Esperia Energy (Tseri)",
    "Tseri 2-A": "Esperia Energy (Tseri 2-A)",
    "Tseri 2-B": "Esperia Energy (Tseri 2-B)",
    "Tseri 2-C": "Esperia Energy (Tseri 2-C)",
    "Tseri 3": "Esperia Energy (Tseri 3)",
}

loi_t = tgt_t = 0
print("PARK SUMMARY — Dino final size | LY CIF | LOI (code now) | Target (agreed)\n")
for ent, short, mw, mwh, cnt, ck, cnote, tgt, tnote in ROWS:
    cif, ckwh, v5t, v5m = v5_at(ck)
    loi = loi_price(names[short])
    if tgt is None:
        tgt = v5t
    loi_t += loi
    tgt_t += tgt
    chg = " *" if loi != tgt else ""
    print(
        f"{ent:9} {short:12} {mw:4.1f}/{mwh:3.0f} cnt{cnt:2} | CIF {cif:>11,.0f} ({ckwh:5.1f}c) | "
        f"v5 {v5m:>7,.0f}/MWh | LOI {loi:>11,}{chg} | TARGET {tgt:>11,} | {tnote}"
    )
print(f"\nLOI total (11): EUR {loi_t:,}  |  Target total: EUR {tgt_t:,}  |  Delta: EUR {tgt_t-loi_t:+,}")
