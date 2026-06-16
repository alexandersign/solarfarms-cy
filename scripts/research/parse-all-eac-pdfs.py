# -*- coding: utf-8 -*-
"""
Parse all available EAC RES district PDFs and write a combined JSON.
Run: python scripts/research/parse-all-eac-pdfs.py
"""
import sys, io, json, hashlib, re
from pathlib import Path
from datetime import datetime, timezone

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

try:
    import pdfplumber
except ImportError:
    print("pip install pdfplumber", file=sys.stderr)
    sys.exit(1)

REPO = Path(__file__).resolve().parents[2]
PDF_DIR = REPO / "marketing" / "research" / "pdfs"
OUT = REPO / "marketing" / "research" / "eac-res-systems.json"

DISTRICT_MAP = {
    "Limassol": ["RES_Systems_Table_Limassol.pdf"],
    "Nicosia": ["RES_Systems_Table_Nicosia.pdf"],
    "Paphos": ["RES_Systems_Table_Paphos.pdf"],
    "Larnaca": ["RES_Systems_Table_Larnaca_Famagusta.pdf"],
    "Famagusta": ["RES_Systems_Table_Larnaca_Famagusta.pdf"],
}

def parse_mw(v):
    try:
        return float((v or "").strip().replace(",", "."))
    except ValueError:
        return None

def detect_format(header_row: list) -> str:
    """Detect column format: 'old' (8-col, kW) or 'new' (9-col, MW + storage)."""
    joined = " ".join(str(c or "") for c in header_row).upper()
    if "ΑΠΟΘΗΚΕΥΣΗ" in joined or len(header_row) >= 9:
        return "new"   # 9 cols: mw@4, storage@5, municipality@6, pos_issue@7, pos_accept@8
    return "old"       # 8 cols: kw@4, municipality@5, pos_issue@6, pos_accept@7

def parse_pdf(path: Path, district: str) -> list:
    sha = hashlib.sha256(path.read_bytes()).hexdigest()
    rows = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in (page.extract_tables() or []):
                if not table:
                    continue
                fmt = detect_format(table[0])
                for cells in table:
                    if not cells:
                        continue
                    aa = (cells[0] or "").strip()
                    if not aa or not re.match(r"^\d+$", aa):
                        continue
                    if fmt == "new":
                        # 9-col: values already in MW
                        if len(cells) < 7:
                            continue
                        mw = parse_mw(cells[4])
                        storage_mw = parse_mw(cells[5]) if cells[5] else None
                        mun = re.sub(r"\s+", " ", (cells[6] or "").strip().upper())
                        pos_issue = (cells[7] or "").strip() if len(cells) > 7 else ""
                        pos_accept = (cells[8] or "").strip() if len(cells) > 8 else ""
                    else:
                        # 8-col Limassol format: values already in MW (same as new format)
                        if len(cells) < 6:
                            continue
                        mw = parse_mw(cells[4])
                        storage_mw = None
                        mun = re.sub(r"\s+", " ", (cells[5] or "").strip().upper())
                        pos_issue = (cells[6] or "").strip() if len(cells) > 6 else ""
                        pos_accept = (cells[7] or "").strip() if len(cells) > 7 else ""

                    if mw is None or not mun:
                        continue
                    rows.append({
                        "district": district,
                        "row_index": int(aa),
                        "application_date": (cells[1] or "").strip(),
                        "application_ref": (cells[2] or "").strip().replace("\n", " "),
                        "entity_type": (cells[3] or "").strip(),
                        "capacity_kw": round(mw * 1000, 3),
                        "capacity_mw": round(mw, 4),
                        "storage_mw": storage_mw,
                        "municipality": mun,
                        "pos_issue_date": pos_issue,
                        "pos_acceptance_date": pos_accept,
                        "pos_accepted": bool(pos_accept and re.match(r"\d{2}/\d{2}/\d{4}", pos_accept)),
                        "source_pdf": path.name,
                        "source_pdf_sha256": sha,
                    })
    return rows

# Parse all available PDFs
all_rows = []
seen_pdfs = set()  # avoid double-counting Larnaca/Famagusta
for district, filenames in DISTRICT_MAP.items():
    for fname in filenames:
        path = PDF_DIR / fname
        if not path.exists():
            print(f"  MISSING: {fname}")
            continue
        if fname in seen_pdfs:
            continue
        seen_pdfs.add(fname)
        rows = parse_pdf(path, district)
        print(f"  {fname}: {len(rows)} rows")
        all_rows.extend(rows)

print(f"\nTOTAL: {len(all_rows)} rows")

OUT.write_text(
    json.dumps({
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "rowCount": len(all_rows),
        "systems": all_rows,
    }, indent=2, ensure_ascii=False),
    encoding="utf-8",
)
print(f"Saved to {OUT}")
