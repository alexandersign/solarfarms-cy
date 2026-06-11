"""Organise the HESS HV transformer RFP folder into anonymised supplier subfolders.

Structure (anonymised — producer identities live ONLY in _supplier-key.md):

  HV Transformer/
    client/                         <- client Transformer Requirements.xlsx
    RFP/                            <- master RFP (created separately)
    Supplier-1/ source|T1-main|T2-earthing-aux
    Supplier-2/ source|T1-main|T2-earthing-aux
    Supplier-3/ source|T1-main|T2-earthing-aux
    _archive/                       <- superseded root prefills (kept, not deleted)

Idempotent: safe to re-run. Only MOVES files that are still at the folder root.
"""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:  # noqa: BLE001
    pass

BASE = Path(
    r"L:\My Drive\LINYANG\BESS CLIENTS\Individual_60-120-standalone\HV Transformer"
)
SUPPLIERS = ["Supplier-1", "Supplier-2", "Supplier-3"]
SUBDIRS = ["source", "T1-main", "T2-earthing-aux"]

# Root file -> destination (relative to BASE). None dest = archive.
MOVES = {
    "Transformer Requirements.xlsx": "client/Transformer Requirements.xlsx",
    "PT Technical information.xlsx": "Supplier-1/source/PT Technical information.xlsx",
    "5e4ad8877caafb6afc6df2a4aaeba5e1_7191052872099440793_m.xlsx": (
        "Supplier-2/source/POWER-Transformer-blank.xlsx"
    ),
}
# Reproducible prefilled outputs at root -> archive (regenerated into T1-main folders).
ARCHIVE = [
    "PT Technical information-HESS-prefilled-may2026.xlsx",
    "PT Technical information-HESS-prefilled-jun2026.xlsx",
    "PT Technical information-HESS-prefilled-jun2026-rev2.xlsx",
    "POWER-Transformer-HESS-prefilled-jun2026.xlsx",
]


def ensure_dirs() -> None:
    (BASE / "client").mkdir(exist_ok=True)
    (BASE / "RFP").mkdir(exist_ok=True)
    (BASE / "_archive").mkdir(exist_ok=True)
    for s in SUPPLIERS:
        for d in SUBDIRS:
            (BASE / s / d).mkdir(parents=True, exist_ok=True)
    print("dirs ready")


def move(src: Path, dst: Path) -> None:
    if src.exists():
        dst.parent.mkdir(parents=True, exist_ok=True)
        if dst.exists():
            dst.unlink()
        shutil.move(str(src), str(dst))
        print(f"  moved  {src.name}  ->  {dst.relative_to(BASE)}")
    elif dst.exists():
        print(f"  ok     already in place: {dst.relative_to(BASE)}")
    else:
        print(f"  WARN   missing (not at root, not at dest): {src.name}")


def main() -> None:
    ensure_dirs()
    for root_name, rel_dst in MOVES.items():
        move(BASE / root_name, BASE / rel_dst)
    for name in ARCHIVE:
        move(BASE / name, BASE / "_archive" / name)
    print("done")


if __name__ == "__main__":
    main()
