#!/usr/bin/env python3
"""
Park solar yield estimator — no PVsyst licence required.

Methods:
  1. PVGIS API (EU JRC) — primary; models E-W as 50% east + 50% west sub-arrays.
  2. NREL PySAM PVWatts v8 — optional cross-check if nrel-pysam is installed.

Usage:
  python scripts/pvgis-park-yield.py --park shia-sia
  python scripts/pvgis-park-yield.py --lat 34.957 --lon 33.377 --mwp 3.2 --layout east-west --tilt 10

Output: JSON to stdout; optional --out path for audit file.
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import asdict, dataclass
from datetime import date
from typing import Literal

import requests

PVGIS_URL = "https://re.jrc.ec.europa.eu/api/v5_2/PVcalc"

# Park presets — refine coords from DD topographic plan when available
PARK_PRESETS: dict[str, dict] = {
    "shia-sia": {
        "name": "Sia Solar Park (Shia-Sia / Novikov)",
        "lat": 34.957,
        "lon": 33.377,
        "mwp": 3.2,
        "layout": "east-west",
        "tilt_deg": 10,
        "loss_pct": 14,
        "bifacial_gain_pct": 5.0,  # Softades rule for E-W + white albedo
    },
}

Layout = Literal["south", "east-west"]


@dataclass
class YieldResult:
    method: str
    layout: str
    tilt_deg: float
    mwp: float
    loss_pct: float
    annual_kwh: float
    specific_yield_kwh_kwp: float
    bifacial_gain_pct: float
    notes: str


def pvgis_fixed(
    lat: float,
    lon: float,
    kw: float,
    tilt_deg: float,
    aspect_deg: float,
    loss_pct: float,
) -> float:
    params = {
        "lat": lat,
        "lon": lon,
        "peakpower": kw,
        "loss": loss_pct,
        "angle": tilt_deg,
        "aspect": aspect_deg,
        "outputformat": "json",
        "browser": 0,
        "pvtechchoice": "crystSi",
        "mountingplace": "free",
    }
    r = requests.get(PVGIS_URL, params=params, timeout=90)
    r.raise_for_status()
    return float(r.json()["outputs"]["totals"]["fixed"]["E_y"])


def pvgis_layout(
    lat: float,
    lon: float,
    mwp: float,
    layout: Layout,
    tilt_deg: float,
    loss_pct: float,
    bifacial_gain_pct: float,
) -> YieldResult:
    kw = mwp * 1000
    if layout == "south":
        annual = pvgis_fixed(lat, lon, kw, tilt_deg, 0, loss_pct)
        notes = f"PVGIS fixed south, tilt {tilt_deg}°, aspect 0°"
    else:
        half = kw / 2
        east = pvgis_fixed(lat, lon, half, tilt_deg, -90, loss_pct)
        west = pvgis_fixed(lat, lon, half, tilt_deg, 90, loss_pct)
        annual = east + west
        notes = (
            f"PVGIS E-W split: 50% @ aspect -90° + 50% @ aspect +90°, tilt {tilt_deg}°"
        )
    if bifacial_gain_pct > 0:
        annual *= 1 + bifacial_gain_pct / 100
        notes += f"; +{bifacial_gain_pct}% bifacial rear-gain uplift"
    return YieldResult(
        method="PVGIS",
        layout=layout,
        tilt_deg=tilt_deg,
        mwp=mwp,
        loss_pct=loss_pct,
        annual_kwh=round(annual),
        specific_yield_kwh_kwp=round(annual / kw),
        bifacial_gain_pct=bifacial_gain_pct,
        notes=notes,
    )


def pvgis_tmy_hourly(lat: float, lon: float) -> dict:
    """Fetch hourly TMY from PVGIS — used as PySAM solar_resource_data input."""
    url = "https://re.jrc.ec.europa.eu/api/v5_2/tmy"
    r = requests.get(
        url,
        params={"lat": lat, "lon": lon, "outputformat": "json", "browser": 0},
        timeout=120,
    )
    r.raise_for_status()
    raw = r.json()["outputs"]["tmy_hourly"]
    # PySAM expects keys: year, month, day, hour, ghi, dni, dhi, temp, wspd
    return {
        "lat": lat,
        "lon": lon,
        "tz": 2.0,
        "elev": 0,
        "year": [row["time"][0:4] for row in raw],
        "month": [int(row["time"][4:6]) for row in raw],
        "day": [int(row["time"][6:8]) for row in raw],
        "hour": [int(row["time"][9:11]) for row in raw],
        "ghi": [row["G(h)"] for row in raw],
        "dni": [row["Gb(n)"] for row in raw],
        "dhi": [row["Gd(h)"] for row in raw],
        "temp": [row["T2m"] for row in raw],
        "wspd": [row["WS10m"] for row in raw],
    }


def pysam_pvwatts(
    lat: float,
    lon: float,
    mwp: float,
    layout: Layout,
    tilt_deg: float,
    loss_pct: float,
    bifacial_gain_pct: float,
) -> YieldResult | None:
    try:
        import PySAM.Pvwattsv8 as pvwatts  # type: ignore
        weather = pvgis_tmy_hourly(lat, lon)
    except Exception as exc:  # noqa: BLE001 — optional cross-check
        print(f"PySAM skipped: {exc}", file=sys.stderr)
        return None

    def run_half(kw: float, azimuth: float) -> float:
        m = pvwatts.default("PVWattsNone")
        m.SolarResource.solar_resource_data = weather
        m.SystemDesign.system_capacity = kw
        m.SystemDesign.tilt = tilt_deg
        m.SystemDesign.azimuth = azimuth
        m.SystemDesign.array_type = 0  # fixed open rack
        m.SystemDesign.module_type = 0  # standard
        m.SystemDesign.losses = loss_pct
        m.execute()
        return float(m.Outputs.annual_energy)

    kw = mwp * 1000
    try:
        if layout == "south":
            annual = run_half(kw, 180)
            notes = f"PySAM PVWatts v8 south, tilt {tilt_deg}°, azimuth 180°; TMY from PVGIS"
        else:
            annual = run_half(kw / 2, 90) + run_half(kw / 2, 270)
            notes = (
                f"PySAM PVWatts E-W: 50% azimuth 90° + 50% azimuth 270°, "
                f"tilt {tilt_deg}°; TMY from PVGIS"
            )
        if bifacial_gain_pct > 0:
            annual *= 1 + bifacial_gain_pct / 100
            notes += f"; +{bifacial_gain_pct}% bifacial uplift"
    except Exception as exc:  # noqa: BLE001
        print(f"PySAM skipped: {exc}", file=sys.stderr)
        return None

    return YieldResult(
        method="PySAM-PVWatts",
        layout=layout,
        tilt_deg=tilt_deg,
        mwp=mwp,
        loss_pct=loss_pct,
        annual_kwh=round(annual),
        specific_yield_kwh_kwp=round(annual / kw),
        bifacial_gain_pct=bifacial_gain_pct,
        notes=notes,
    )


def recommended_yield(results: list[YieldResult]) -> int:
    """Conservative rounded kWh/kWp for deal file — floor of PVGIS, mid if PySAM agrees."""
    pvgis = next((r for r in results if r.method == "PVGIS"), None)
    if not pvgis:
        return 1500
    y = pvgis.specific_yield_kwh_kwp
    # Round down to nearest 10 for investor-facing conservatism
    return (y // 10) * 10


def main() -> int:
    parser = argparse.ArgumentParser(description="Park yield via PVGIS (+ optional PySAM)")
    parser.add_argument("--park", choices=list(PARK_PRESETS.keys()), help="Named park preset")
    parser.add_argument("--lat", type=float)
    parser.add_argument("--lon", type=float)
    parser.add_argument("--mwp", type=float)
    parser.add_argument("--layout", choices=["south", "east-west"], default="east-west")
    parser.add_argument("--tilt", type=float, default=10)
    parser.add_argument("--loss", type=float, default=14, help="System loss %%")
    parser.add_argument("--bifacial-gain", type=float, default=5.0, help="Bifacial uplift %%")
    parser.add_argument("--out", help="Write JSON audit file")
    parser.add_argument("--compare-south", action="store_true", help="Also run south-facing reference")
    args = parser.parse_args()

    if args.park:
        preset = PARK_PRESETS[args.park]
        lat = preset["lat"]
        lon = preset["lon"]
        mwp = preset["mwp"]
        layout = preset.get("layout", args.layout)
        tilt = preset.get("tilt_deg", args.tilt)
        loss = preset.get("loss_pct", args.loss)
        bifacial = preset.get("bifacial_gain_pct", args.bifacial_gain)
        park_name = preset["name"]
    else:
        if args.lat is None or args.lon is None or args.mwp is None:
            parser.error("--lat, --lon, --mwp required without --park")
        lat, lon, mwp = args.lat, args.lon, args.mwp
        layout = args.layout
        tilt = args.tilt
        loss = args.loss
        bifacial = args.bifacial_gain
        park_name = "custom"

    results: list[YieldResult] = []
    results.append(pvgis_layout(lat, lon, mwp, layout, tilt, loss, bifacial))

    pysam = pysam_pvwatts(lat, lon, mwp, layout, tilt, loss, bifacial)
    if pysam:
        results.append(pysam)

    if args.compare_south:
        results.append(pvgis_layout(lat, lon, mwp, "south", 15, loss, bifacial))

    payload = {
        "date": date.today().isoformat(),
        "park": park_name,
        "coords": {"lat": lat, "lon": lon},
        "recommended_kwh_kwp": recommended_yield(results),
        "results": [asdict(r) for r in results],
    }

    text = json.dumps(payload, indent=2)
    print(text)

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"\nWrote {args.out}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
