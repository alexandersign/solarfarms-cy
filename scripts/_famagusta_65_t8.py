# -*- coding: utf-8 -*-
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent))
p = Path(__file__).parent / "generate-adders-v5.py"
src = p.read_text(encoding="utf-8").split("\u2500\u2500\u2500 BUILD WORKBOOK")[0]
ns = {"__name__": "x", "__file__": str(p)}
exec(compile(src, "a", "exec"), ns)
g, M = ns, 0.115
CIF_5_20 = 1_848_712.43


def full(mw, mwh, bess, mv, cnt, cif, label):
    a = g["calc_adders"]("x", mw, mwh, bess, mv, cnt, cif)
    hw = g["EMS_HW"].get((bess, mv), 11263)
    ems = hw + g["SCADA_LOCAL"]
    inst = cif + a["phys_total"] + ems
    cl = round(inst / (1 - M))
    print(label)
    print(f"  {mw} MW / {mwh} MWh | {bess} BESS + {mv} MV | {cnt} containers")
    print(f"  CIF EUR {cif:,.2f} ({cif/mwh/1000:.2f} EUR/kWh) | +vs 5/20: EUR {cif-CIF_5_20:+,.0f}")
    print(f"  Adders EUR {a['phys_total']:,.0f} | EMS EUR {ems:,.0f} | Installed EUR {inst:,.0f}")
    print(f"  Client @ 11.5%: EUR {cl:,} = EUR {cl/mwh:,.0f}/MWh\n")
    return cl


print("Famagusta Ph1 — 6.5/20 T8 skid (8x1MW PCS, 2 PCS per BESS)\n")
full(5, 20, 4, 1, 5, CIF_5_20, "A) Baseline 5/20 (4 BESS + T4 MV)")
ly = g["CIF"]["Esperia Famagusta"]
full(*ly[:6], "B) LY Esperia Famagusta 6.5/20 (quoted)")
full(6.5, 20, 4, 1, 5, CIF_5_20 + 150_000, "C) Your estimate: 5/20 CIF + EUR 150k (T8)")
print("LY note:", ly[6])
print("CLIENT_PRICE dict (older target):", g["CLIENT_PRICE"]["Esperia Famagusta"])
print("Current pipeline LOI:", 2_316_815)
