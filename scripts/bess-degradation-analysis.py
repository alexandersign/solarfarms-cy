"""BESS degradation analysis — interpolate between CPD data points and check duration / warranty.

Usage:
    python scripts/bess-degradation-analysis.py
"""
from __future__ import annotations
import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ── Raw data from OCR of Linyang degradation curve PDFs ──────────────────────

# 5 MWh — 0.5P
DATA_5MWH = {
    "1cpd": {  # (year, SOH%)
        0: 98.50, 1: 94.46, 2: 91.50, 3: 89.55, 4: 87.56,
        5: 86.26, 6: 84.37, 7: 83.17, 8: 81.51, 9: 80.26,
        10: 78.70, 11: 77.60, 12: 76.11, 13: 75.01, 14: 73.92,
        15: 72.45, 16: 71.36, 17: 70.27, 18: 69.18, 19: 67.74, 20: 66.66,
    },
    "2cpd": {
        0: 98.50, 1: 93.78, 2: 90.17, 3: 87.53, 4: 84.93,
        5: 82.95, 6: 80.50, 7: 78.47, 8: 75.94, 9: 73.83, 10: 71.34,
    },
}

# 4 MWh — 0.5P
DATA_4MWH = {
    "1cpd": {
        0: 98.50, 1: 95.22, 2: 92.61, 3: 90.46, 4: 88.91,
        5: 87.59, 6: 86.11, 7: 84.88, 8: 83.62, 9: 82.33,
        10: 81.32, 11: 80.20, 12: 79.08, 13: 77.96, 14: 76.84,
        15: 75.72, 16: 74.60, 17: 73.48, 18: 72.36, 19: 71.25, 20: 70.13,
    },
    "2cpd": {
        0: 98.50, 1: 93.51, 2: 90.02, 3: 87.12, 4: 84.72,
        5: 82.50, 6: 80.41, 7: 78.54, 8: 76.40, 9: 74.27, 10: 72.14,
    },
}

# System parameters
SYSTEMS = {
    "5 MWh": {"rated_kwh": 5015, "power_05c_kw": 1250, "data": DATA_5MWH},
    "4 MWh": {"rated_kwh": 4179, "power_05c_kw": 1045, "data": DATA_4MWH},
}
DOD = 0.90
WARRANTY_CYCLES = 7000
WARRANTY_YEARS = 15
EOL_SOH = 70.0


def interp(data: dict[str, dict[int, float]], cpd: float, year: int) -> float:
    """Linear interpolation between 1 CPD and 2 CPD at a given year."""
    lo = data["1cpd"]
    hi = data["2cpd"]
    max_yr_hi = max(hi.keys())

    def val_at(d: dict, yr: int) -> float:
        if yr in d:
            return d[yr]
        # Extrapolate linearly from last two known points
        yrs = sorted(d.keys())
        if yr > max(yrs):
            y1, y2 = yrs[-2], yrs[-1]
            rate = d[y2] - d[y1]
            return d[y2] + (yr - y2) * rate
        return d[yr]

    soh_lo = val_at(lo, year)
    soh_hi = val_at(hi, year)
    # Weight: fraction between 1 and 2 CPD
    t = (cpd - 1.0) / (2.0 - 1.0)
    return soh_lo * (1 - t) + soh_hi * t


def duration_hours(rated_kwh: float, soh_pct: float, dod: float, power_kw: float) -> float:
    usable = rated_kwh * (soh_pct / 100) * dod
    return usable / power_kw


def warranty_end_year(cpd: float) -> float:
    """Year when cycle count hits WARRANTY_CYCLES."""
    return WARRANTY_CYCLES / (cpd * 365)


def analyse(name: str, sys: dict, cpd: float) -> None:
    rated = sys["rated_kwh"]
    pwr = sys["power_05c_kw"]
    data = sys["data"]

    wrnt_yr = min(WARRANTY_YEARS, warranty_end_year(cpd))
    cycle_limit_yr = warranty_end_year(cpd)

    print(f"\n{'━'*70}")
    print(f"  {name}  |  0.5P  |  {cpd} CPD")
    print(f"{'━'*70}")
    print(f"  Warranty expires at: min(15 yrs, {cycle_limit_yr:.1f} yrs) = {wrnt_yr:.1f} yrs")
    print(f"  ({cpd:.1f} CPD × 365 × {wrnt_yr:.1f} yrs = {int(cpd*365*wrnt_yr):,} cycles)")
    print()
    print(f"  {'Year':>5}  {'SOH':>7}  {'Δ from BoL':>11}  {'Usable kWh':>11}  {'Duration':>10}  {'≥2h?':>6}  {'DSO <20%?':>10}")
    print(f"  {'':->5}  {'':->7}  {'':->11}  {'':->11}  {'':->10}  {'':->6}  {'':->10}")

    bol_soh = interp(data, cpd, 0)
    hits_eol_yr = None

    for yr in range(0, 21):
        soh = interp(data, cpd, yr)
        delta = bol_soh - soh
        usable = rated * (soh / 100) * DOD
        dur = usable / pwr
        ok_2h = "✓" if dur >= 2.0 else "✗ FAIL"
        ok_20 = "✓" if delta < 20.0 else "✗ >20%"

        # mark warranty expiry year
        marker = ""
        if abs(yr - wrnt_yr) < 0.5 and yr == round(wrnt_yr):
            marker = " ← warranty end"
        if soh <= EOL_SOH and hits_eol_yr is None:
            hits_eol_yr = yr
            marker += " ← EOL (70%)"

        print(f"  {yr:>5}  {soh:>6.2f}%  {delta:>+10.2f}%  {usable:>10.0f}  {dur:>9.2f}h  {ok_2h:>6}  {ok_20:>10}{marker}")

    if hits_eol_yr is None:
        print(f"\n  EOL (70% SOH) not reached within 20 years at {cpd} CPD")
    else:
        print(f"\n  EOL (70% SOH) reached at year {hits_eol_yr} ({int(cpd*365*hits_eol_yr):,} cycles)")

    # Warranty-end SOH
    wrnt_yr_int = round(wrnt_yr)
    soh_at_wrnt = interp(data, cpd, wrnt_yr_int)
    dur_at_wrnt = duration_hours(rated, soh_at_wrnt, DOD, pwr)
    print(f"\n  AT WARRANTY END (yr {wrnt_yr:.1f}):")
    print(f"    SOH       = {soh_at_wrnt:.2f}%")
    print(f"    Duration  = {dur_at_wrnt:.2f} hours at 0.5C  {'✓' if dur_at_wrnt >= 2 else '✗ FAIL'}")
    print(f"    Usable    = {rated*(soh_at_wrnt/100)*DOD:,.0f} kWh  (need ≥ {pwr*2:,.0f} kWh for 2h)")


if __name__ == "__main__":
    print("\nLinyang Power Atlantic — Degradation Analysis at 1.5 CPD (0.5P)")
    print("=" * 70)
    for cpd in [1.0, 1.5, 2.0]:
        for name, sys in SYSTEMS.items():
            analyse(name, sys, cpd)
    print()
