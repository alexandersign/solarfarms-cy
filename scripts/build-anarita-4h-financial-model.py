"""
Clone Spanercom Anarita financial model for 4-hour (2×5/20) offer:
- Commercial price €119k/MWh (€4.76M total) in Inputs
- Scenario Matrix: curtailment columns B–D only (50%, 60%, 70%); E–F cleared
"""
from __future__ import annotations

import shutil
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "docs/clients/Individual_Spanercom/anarita-10mw-bess-financial-model.xlsx"
DST = ROOT / "docs/clients/Individual_Spanercom/anarita-10mw-bess-financial-model-4h-5-20-mar2026.xlsx"


def main() -> None:
    shutil.copy2(SRC, DST)
    wb = openpyxl.load_workbook(DST)

    inp = wb["Inputs"]
    inp["A1"] = "ANARITA 10 MW BESS — FINANCIAL MODEL (4-HOUR, 2×5/20)"
    inp["A2"] = (
        "Prepared for: Muminjon (Spanercom) | Lighthief Cyprus Ltd | "
        "24 March 2026 — matches commercial offer €119k/MWh turnkey (€4.76M, 40 MWh total)"
    )
    inp["A26"] = "Selected offer (this workbook)"
    inp["D26"] = 4_760_000
    # E26 is formula =D26/(C26*1000) -> 119

    sm = wb["Scenario Matrix"]
    sm["A2"] = (
        "Primary curtailment cases: B=50%, C=60%, D=70%. "
        "E and F repeat 50% and 70% so legacy option-block formulas stay valid."
    )
    sm["B4"] = 0.5
    sm["C4"] = 0.6
    sm["D4"] = 0.7
    sm["E4"] = 0.5
    sm["F4"] = 0.7

    sm["A36"] = "OPTION: 2 × 5 MW / 20 MWh (40 MWh total, 4-hour)"

    wb.save(DST)
    print(f"Wrote {DST}")


if __name__ == "__main__":
    main()
