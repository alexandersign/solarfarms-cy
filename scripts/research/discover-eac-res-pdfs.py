# -*- coding: utf-8 -*-
"""
Discover EAC RES System Table PDFs per district.

Usage:
  python scripts/research/discover-eac-res-pdfs.py
  python scripts/research/discover-eac-res-pdfs.py --download
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, unquote

import requests
from bs4 import BeautifulSoup

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_MANIFEST = REPO_ROOT / "marketing" / "research" / "eac-res-pdf-manifest.json"
PDF_DIR = REPO_ROOT / "marketing" / "research" / "pdfs"

SEED_URLS = (
    "https://www.eac.com.cy/EL/RegulatedActivities/Distribution/renewableenergy/Pages/default.aspx",
    "https://www.eac.com.cy/en/RegulatedActivities/Distribution/renewableenergy/Pages/default.aspx",
)

# Verified URL; other districts vary — discovered via crawl only
KNOWN_PDFS: dict[str, str] = {
    "Limassol": "https://www.eac.com.cy/EL/RegulatedActivities/Distribution/renewableenergy/Documents/RES%20System%20Tables/RES_Systems_Table_Limassol.pdf",
}

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "LighthiefResearchBot/1.0 (+https://solarfarms.cy)",
        "Accept-Language": "el-CY,el;q=0.9,en;q=0.8",
    }
)


def district_from_filename(name: str) -> str | None:
    m = re.search(r"RES_Systems_Table_(\w+)\.pdf", name, re.I)
    if m:
        return m.group(1).capitalize()
    return None


def crawl_pdf_links() -> dict[str, str]:
    found: dict[str, str] = dict(KNOWN_PDFS)
    for seed in SEED_URLS:
        try:
            r = SESSION.get(seed, timeout=30)
            r.raise_for_status()
        except requests.RequestException as e:
            print(f"[warn] {seed}: {e}", file=sys.stderr)
            continue
        soup = BeautifulSoup(r.text, "html.parser")
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if "RES_Systems_Table" not in href or ".pdf" not in href.lower():
                continue
            url = urljoin(seed, href)
            fname = unquote(url.split("/")[-1])
            district = district_from_filename(fname)
            if district:
                found[district] = url
    return found


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def download_pdfs(manifest: dict) -> None:
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    for entry in manifest["pdfs"]:
        url = entry["url"]
        fname = f"RES_Systems_Table_{entry['district']}.pdf"
        dest = PDF_DIR / fname
        try:
            r = SESSION.get(url, timeout=60)
            r.raise_for_status()
            dest.write_bytes(r.content)
            entry["local_path"] = str(dest.relative_to(REPO_ROOT)).replace("\\", "/")
            entry["sha256"] = sha256_file(dest)
            entry["bytes"] = dest.stat().st_size
            print(f"  downloaded {fname} ({entry['bytes']} bytes)")
        except requests.RequestException as e:
            entry["download_error"] = str(e)
            print(f"  [fail] {fname}: {e}", file=sys.stderr)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--download", action="store_true")
    args = ap.parse_args()

    pdfs = crawl_pdf_links()
    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "note": "EAC RES tables list legal/natural person type — not SPV names. Match via municipality + capacity.",
        "pdfs": [
            {"district": d, "url": u, "filename": f"RES_Systems_Table_{d}.pdf"}
            for d, u in sorted(pdfs.items())
        ],
    }

    if args.download:
        download_pdfs(manifest)

    OUT_MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    OUT_MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT_MANIFEST} ({len(manifest['pdfs'])} districts)")


if __name__ == "__main__":
    main()
