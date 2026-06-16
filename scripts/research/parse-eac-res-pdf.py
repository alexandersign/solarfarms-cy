# -*- coding: utf-8 -*-
"""
Parse EAC RES System Table PDFs (preliminary connection terms accepted — POS).

Columns: A/A, application date, study ref, entity type, MW, municipality,
         POS issue date, POS payment & acceptance date.

Usage:
  python scripts/research/parse-eac-res-pdf.py --district Limassol
  python scripts/research/parse-eac-res-pdf.py --all
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print("Install: pip install pdfplumber", file=sys.stderr)
    sys.exit(1)

REPO_ROOT = Path(__file__).resolve().parents[2]
PDF_DIR = REPO_ROOT / "marketing" / "research" / "pdfs"
MANIFEST = REPO_ROOT / "marketing" / "research" / "eac-res-pdf-manifest.json"
OUT_JSON = REPO_ROOT / "marketing" / "research" / "eac-res-systems.json"

SKIP_ROWS = {"ΣΥΝΟΛΟ", "A/A", "AA"}


def normalize_municipality(m: str) -> str:
    return re.sub(r"\s+", " ", (m or "").strip().upper())


def parse_mw(val: str) -> float | None:
    if not val:
        return None
    cleaned = val.strip().replace(",", ".")
    try:
        return float(cleaned)
    except ValueError:
        return None


def row_from_table(cells: list, district: str, source_url: str, sha: str) -> dict | None:
    if len(cells) < 6:
        return None
    aa = (cells[0] or "").strip()
    if not aa or aa in SKIP_ROWS or not re.match(r"^\d+$", aa):
        return None
    application_date = (cells[1] or "").strip()
    application_ref = (cells[2] or "").strip().replace("\n", " ")
    entity_type = (cells[3] or "").strip()
    mw = parse_mw(cells[4] or "")
    municipality = normalize_municipality(cells[5] or "")
    pos_issue_date = (cells[6] or "").strip() if len(cells) > 6 else ""
    pos_acceptance_date = (cells[7] or "").strip() if len(cells) > 7 else ""

    if mw is None or not municipality:
        return None

    pos_accepted = bool(pos_acceptance_date and re.match(r"\d{2}/\d{2}/\d{4}", pos_acceptance_date))

    return {
        "district": district,
        "row_index": int(aa),
        "application_date": application_date,
        "application_ref": application_ref,
        "applicant_name": entity_type,
        "entity_type": entity_type,
        "capacity_kw": round(mw * 1000, 3),
        "capacity_mw": mw,
        "municipality": municipality,
        "pos_issue_date": pos_issue_date,
        "pos_acceptance_date": pos_acceptance_date,
        "pos_accepted": pos_accepted,
        "technology": "RES",
        "source_pdf_url": source_url,
        "source_pdf_sha256": sha,
        "raw_row": {
            "cells": [c or "" for c in cells],
        },
    }


def parse_pdf(path: Path, district: str, source_url: str) -> list[dict]:
    sha = hashlib.sha256(path.read_bytes()).hexdigest()
    rows: list[dict] = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables() or []:
                for cells in table:
                    if not cells:
                        continue
                    rec = row_from_table(cells, district, source_url, sha)
                    if rec:
                        rows.append(rec)
    return rows


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--district", type=str, help="e.g. Limassol")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    manifest = {}
    if MANIFEST.exists():
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))

    districts: list[tuple[str, str, Path]] = []
    if args.all or not args.district:
        for entry in manifest.get("pdfs", []):
            d = entry["district"]
            p = PDF_DIR / entry.get("filename", f"RES_Systems_Table_{d}.pdf")
            if p.exists():
                districts.append((d, entry.get("url", ""), p))
        if not districts:
            for p in sorted(PDF_DIR.glob("RES_Systems_Table_*.pdf")):
                d = p.stem.replace("RES_Systems_Table_", "")
                districts.append((d, "", p))
    else:
        d = args.district
        p = PDF_DIR / f"RES_Systems_Table_{d}.pdf"
        if not p.exists():
            print(f"Missing {p}", file=sys.stderr)
            sys.exit(1)
        url = next(
            (e.get("url", "") for e in manifest.get("pdfs", []) if e.get("district") == d),
            "",
        )
        districts = [(d, url, p)]

    all_rows: list[dict] = []
    for district, url, path in districts:
        parsed = parse_pdf(path, district, url)
        print(f"  {district}: {len(parsed)} rows from {path.name}")
        all_rows.extend(parsed)

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "limitation": "EAC tables use legal/natural person — match CERA SPVs by municipality + capacity.",
        "rowCount": len(all_rows),
        "systems": all_rows,
    }
    OUT_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT_JSON} ({len(all_rows)} systems)")


if __name__ == "__main__":
    main()
