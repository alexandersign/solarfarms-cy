# -*- coding: utf-8 -*-
"""Pipeline LOI indicative price = nearest installed EUR/MWh x final MWh, then LOI margin."""
import importlib.util
from pathlib import Path

path = Path(__file__).parent / "generate-adders-v5.py"
spec = importlib.util.spec_from_file_location("adders", path)
# Load only definitions (avoid workbook build at import)
src = path.read_text(encoding="utf-8")
src = src.split("# ─── BUILD WORKBOOK")[0]
ns = {"__name__": "adders_defs", "__file__": str(path)}
exec(compile(src, str(path), "exec"), ns)
g = ns

EMS_HW = g["EMS_HW"]
SCADA_LOCAL = g["SCADA_LOCAL"]
SCADA_GLOBAL = g["SCADA_GLOBAL"]

# LY202601271 nearest configs (name -> tuple)
LY = {k: v for k, v in g["CIF"].items()}

# esperia-energy.md installed + client (LOI track)
LOI_TRACK = {
    "Esperia Famagusta": (1_951_711, 2_316_815, 20),
    "Esperia Limassol": (4_937_363, 5_644_044, 60),  # approx installed from doc
    "Esperia Frenaros": (8_782_302, 10_088_014, 100),
    "Esperia Famagusta 2": (1_864_920, 2_189_416, 20),
    "Esperia Tseri": (2_028_997, 2_382_035, 20),
    "Esperia Tseri 2a": (923_697, 1_084_620, 7.5),
    "Esperia Tseri 2b": (2_481_255, 2_912_993, 25),
    "Esperia Tseri 2c": (1_321_812, 1_551_848, 20),
    "Esperia Tseri 3": (1_596_374, 1_874_143, 15),
}


def installed_cost(mw, mwh, bess, mv, cnt, cif, scada_global=False):
    a = g["calc_adders"]("x", mw, mwh, bess, mv, cnt, cif)
    hw = EMS_HW.get((bess, mv), EMS_HW.get((bess, 1), 11_263))
    sg = SCADA_GLOBAL if scada_global else 0
    ems = hw + SCADA_LOCAL + sg
    return cif + a["phys_total"] + ems, a["phys_total"], ems


def from_ly(key):
    mw, mwh, bess, mv, cnt, cif, _ = LY[key]
    inst, phys, ems = installed_cost(mw, mwh, bess, mv, cnt, cif)
    return dict(key=key, mw=mw, mwh=mwh, bess=bess, mv=mv, cnt=cnt, cif=cif,
                installed=inst, phys=phys, ems=ems)


# Pipeline LOI parks: final size + nearest LY key + current LOI price
PARKS = [
    {
        "loi_name": "Esperia Energy (Famagusta)",
        "final_mw": 6.5, "final_mwh": 20,
        "nearest": "Esperia Famagusta",
        "loi_price": 2_316_815,
        "status": "confirmed",
    },
    {
        "loi_name": "Esperia Green Energy (Limassol)",
        "final_mw": 8.0, "final_mwh": 60,
        "nearest": "Esperia Limassol",
        "loi_price": 5_644_044,
        "status": "confirmed",
    },
    {
        "loi_name": "Esperia Energy (Frenaros)",
        "final_mw": 25.0, "final_mwh": 100,
        "nearest": "Esperia Frenaros",
        "loi_price": 10_088_014,
        "status": "confirmed",
    },
    {
        "loi_name": "Esperia Green Energy (Famagusta 2)",
        "final_mw": 7.0, "final_mwh": 25,
        "nearest": "Esperia Tseri 2b",
        "alt_nearest": "Esperia Famagusta 2",
        "loi_price": 2_189_416,
        "status": "repriced",
    },
    {
        "loi_name": "Esperia Energy (Tseri)",
        "final_mw": 7.2, "final_mwh": 25,
        "nearest": "Esperia Tseri 2b",
        "alt_nearest": "Esperia Tseri",
        "loi_price": 2_382_035,
        "status": "repriced",
    },
    {
        "loi_name": "Esperia Energy (Tseri 2-A)",
        "final_mw": 2.75, "final_mwh": 10,
        "nearest": "Esperia Tseri 2a",
        "alt_nearest": "Galascope 2",
        "loi_price": 1_084_620,
        "status": "check",
    },
    {
        "loi_name": "Esperia Energy (Tseri 2-B)",
        "final_mw": 7.99, "final_mwh": 30,
        "nearest": "Esperia Tseri 2b",
        "loi_price": 2_912_993,
        "status": "confirmed",
    },
    {
        "loi_name": "Esperia Energy (Tseri 2-C)",
        "final_mw": 6.3, "final_mwh": 25,
        "nearest": "Esperia Tseri 2c",
        "alt_nearest": "Esperia Tseri 2b",
        "loi_price": 1_551_848,
        "status": "repriced",
    },
    {
        "loi_name": "Esperia Energy (Tseri 3)",
        "final_mw": 4.75, "final_mwh": 20,
        "nearest": "Esperia Tseri 3",
        "loi_price": 1_874_143,
        "status": "repriced",
    },
]


def price_row(park):
    ref = from_ly(park["nearest"])
    final_mwh = park["final_mwh"]
    inst_per_mwh = ref["installed"] / ref["mwh"]
    scaled_inst = inst_per_mwh * final_mwh

    # Margin from calc_adders installed at nearest config (not stale doc installed)
    loi_client_ref = park.get("loi_client_ref")
    if loi_client_ref is None:
        track_map = {
            "Esperia Famagusta": "Esperia Famagusta",
            "Esperia Limassol": "Esperia Limassol",
            "Esperia Frenaros": "Esperia Frenaros",
            "Esperia Famagusta 2": "Esperia Famagusta 2",
            "Esperia Tseri": "Esperia Tseri",
            "Esperia Tseri 2a": "Esperia Tseri 2a",
            "Esperia Tseri 2b": "Esperia Tseri 2b",
            "Esperia Tseri 2c": "Esperia Tseri 2c",
            "Esperia Tseri 3": "Esperia Tseri 3",
        }
        tk = track_map.get(park["nearest"])
        if tk:
            loi_client_ref = LOI_TRACK[tk][1]

    margin = (loi_client_ref - ref["installed"]) / loi_client_ref
    client_per_mwh = loi_client_ref / ref["mwh"]
    calc_client = round(client_per_mwh * final_mwh)
    calc_client_margin = round(scaled_inst / (1 - margin))

    alt = None
    if park.get("alt_nearest"):
        alt_ref = from_ly(park["alt_nearest"])
        alt_inst_pmwh = alt_ref["installed"] / alt_ref["mwh"]
        alt_scaled = alt_inst_pmwh * final_mwh
        if park["alt_nearest"] in LOI_TRACK:
            _, lc, lm = LOI_TRACK[park["alt_nearest"]]
            m = (lc - LOI_TRACK[park["alt_nearest"]][0]) / lc
            alt_client = round((lc / lm) * final_mwh)
        else:
            m = margin
            alt_client = round(alt_scaled / (1 - m))
        alt = dict(name=park["alt_nearest"], installed_pmwh=alt_inst_pmwh,
                   scaled_installed=alt_scaled, client=alt_client)

    return dict(
        **park,
        ref=ref,
        inst_per_mwh=inst_per_mwh,
        scaled_installed=scaled_inst,
        margin_pct=margin * 100,
        client_per_mwh=client_per_mwh,
        calc_client=calc_client,
        calc_client_margin=calc_client_margin,
        loi_client_ref=loi_client_ref,
        alt=alt,
    )


print("=" * 100)
print("PIPELINE LOI pricing formula:")
print("  (1) installed_EUR/MWh = nearest_LY_installed / nearest_LY_MWh  [v5 calc_adders]")
print("  (2) scaled_installed  = installed_EUR/MWh x final_MWh")
print("  (3) client_price      = client_EUR/MWh_nearest x final_MWh")
print("      where client_EUR/MWh_nearest = LOI_track_price / nearest_MWh")
print("=" * 100)

total_calc = 0
total_loi = 0
for p in PARKS:
    r = price_row(p)
    ref = r["ref"]
    print()
    print(f"### {r['loi_name']}  [{r['status']}]")
    print(f"  Final size: {r['final_mw']} MW / {r['final_mwh']} MWh")
    print(f"  Nearest LY: {ref['key']} ({ref['mw']} MW / {ref['mwh']} MWh, {ref['cnt']} cnt)")
    print(f"    CIF {ref['cif']:,.0f} + phys + EMS => installed {ref['installed']:,.0f}")
    print(f"    Installed EUR/MWh = {ref['installed']:,.0f} / {ref['mwh']} = {r['inst_per_mwh']:,.2f}")
    print(f"  Scaled installed = {r['inst_per_mwh']:,.2f} x {r['final_mwh']} = {r['scaled_installed']:,.0f}")
    print(f"  Nearest LOI client/MWh = {r['loi_client_ref']:,} / {ref['mwh']} = {r['client_per_mwh']:,.2f}")
    print(f"  CALC LOI = {r['client_per_mwh']:,.2f} x {r['final_mwh']} = EUR {r['calc_client']:,}")
    print(f"  Check: scaled/(1-{r['margin_pct']:.1f}%) = EUR {r['calc_client_margin']:,}")
    print(f"  CURRENT LOI: {r['loi_price']:,}  |  Delta: {r['calc_client'] - r['loi_price']:+,}")
    if r["alt"]:
        a = r["alt"]
        print(f"  Alt nearest: {a['name']} => client {a['client']:,}")
    total_calc += r["calc_client"]
    total_loi += r["loi_price"]

print()
print("=" * 100)
print(f"TOTAL calc (formula):  EUR {total_calc:,}")
print(f"TOTAL current LOI:     EUR {total_loi:,}")
print(f"Delta:                 EUR {total_calc - total_loi:+,}")
