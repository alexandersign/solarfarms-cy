# -*- coding: utf-8 -*-
"""
TSOC / Cyprus TSO — discover Grid / Ten-Year Development Plan PDFs and extract RES-related snippets.

Targets (mirrors may change):
  - https://www.tsoc.org.cy
  - https://www.dsmc.com.cy

Outputs:
  marketing/research/tsoc-connection-pipeline.json

Cross-reference (optional):
  --match-cera  loads marketing/ALL Cyprus PV plants.csv - Website Registry.csv
                and scores fuzzy token overlap with extracted lines.

Usage:
  pip install -r scripts/research/requirements.txt
  python scripts/research/scrape-tsoc-development-plan.py
  python scripts/research/scrape-tsoc-development-plan.py --match-cera --max-pdfs 3
"""

from __future__ import annotations

import argparse
import io
import json
import re
import sys
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_JSON = REPO_ROOT / "marketing" / "research" / "tsoc-connection-pipeline.json"
CERA_CSV = REPO_ROOT / "marketing" / "ALL Cyprus PV plants.csv - Website Registry.csv"

TSOC_SEEDS = (
    "https://www.tsoc.org.cy/",
    "https://www.tsoc.org.cy/en/",
    "https://www.dsmc.com.cy/",
)

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "LighthiefResearchBot/1.0 (+https://lighthief.cy; research)",
        "Accept-Language": "en-GB,el;q=0.9",
    }
)

RES_KEYWORDS = re.compile(
    r"(photovoltaic|φωτοβολται|PV\b|solar|ΑΠΕ|RES\b|renewable|battery|BESS|αποθήκευση|storage|MW\b|MVA)",
    re.I,
)


def fetch_html(url: str, timeout: float = 25.0) -> str | None:
    try:
        r = SESSION.get(url, timeout=timeout)
        r.raise_for_status()
        return r.text
    except requests.RequestException as e:
        print(f"[warn] GET {url} failed: {e}", file=sys.stderr)
        return None


def extract_pdf_links(html: str, base_url: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    links: list[str] = []
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if href.lower().endswith(".pdf"):
            links.append(urljoin(base_url, href))
    # de-dupe preserve order
    seen: set[str] = set()
    out: list[str] = []
    for u in links:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out


def crawl_pdf_urls(max_pages: int = 40) -> list[dict[str, Any]]:
    """BFS from seed URLs; collect PDF links with source page."""
    seed_hosts = {urlparse(u).netloc for u in TSOC_SEEDS if urlparse(u).netloc}
    found: list[dict[str, Any]] = []
    seen_pages: set[str] = set()
    queue: list[str] = list(TSOC_SEEDS)

    while queue and len(seen_pages) < max_pages:
        url = queue.pop(0)
        if url in seen_pages:
            continue
        host = urlparse(url).netloc
        if host not in seed_hosts:
            continue
        seen_pages.add(url)
        html = fetch_html(url)
        if not html:
            continue
        for pdf in extract_pdf_links(html, url):
            found.append({"pdf_url": pdf, "discovered_from": url})
        soup = BeautifulSoup(html, "html.parser")
        for a in soup.find_all("a", href=True):
            next_url = urljoin(url, a["href"])
            if next_url.startswith("mailto:") or next_url.startswith("tel:"):
                continue
            if "/cdn-cgi/" in next_url:
                continue
            if urlparse(next_url).path.lower().endswith(".pdf"):
                continue
            if next_url not in seen_pages and len(seen_pages) + len(queue) < max_pages * 3:
                if urlparse(next_url).netloc in seed_hosts:
                    queue.append(next_url)

    # de-dupe pdf_url
    by_pdf: dict[str, dict[str, Any]] = {}
    for item in found:
        by_pdf.setdefault(item["pdf_url"], item)
    return list(by_pdf.values())


def extract_pdf_text(pdf_url: str, max_pages: int = 30) -> str:
    try:
        from pypdf import PdfReader
    except ImportError:
        print("[warn] pypdf not installed; skipping text extraction", file=sys.stderr)
        return ""

    try:
        r = SESSION.get(pdf_url, timeout=60)
        r.raise_for_status()
        reader = PdfReader(io.BytesIO(r.content))
        parts: list[str] = []
        for i, page in enumerate(reader.pages[:max_pages]):
            t = page.extract_text() or ""
            parts.append(t)
        return "\n".join(parts)
    except Exception as e:
        print(f"[warn] PDF read failed {pdf_url}: {e}", file=sys.stderr)
        return ""


def lines_with_res(text: str, limit: int = 400) -> list[str]:
    lines_out: list[str] = []
    for line in text.splitlines():
        line = line.strip()
        if len(line) < 12:
            continue
        if RES_KEYWORDS.search(line):
            lines_out.append(line[:500])
        if len(lines_out) >= limit:
            break
    return lines_out


def load_cera_company_tokens() -> list[str]:
    if not CERA_CSV.exists():
        return []
    import csv

    names: set[str] = set()
    with CERA_CSV.open(encoding="utf-8", errors="replace", newline="") as f:
        rows = list(csv.reader(f))
    for row in rows[2:]:
        if len(row) < 2:
            continue
        name = row[0].strip().upper()
        if name and name != "ΦΥΣΙΚΟ ΠΡΟΣΩΠΟ":
            names.add(name)
    return sorted(names)


def fuzzy_best_match(line: str, corpus: list[str], min_score: float = 0.62) -> tuple[str, float] | None:
    best: tuple[str, float] | None = None
    uline = line.upper()
    for name in corpus:
        # token shortcut
        tok = name.replace(" LTD", "").replace(" ΛΤΔ", "")
        if len(tok) > 4 and tok in uline:
            return (name, 1.0)
        score = SequenceMatcher(None, uline[: min(len(uline), 200)], name[:200]).ratio()
        if best is None or score > best[1]:
            best = (name, score)
    if best and best[1] >= min_score:
        return best
    return None


def main() -> None:
    parser = argparse.ArgumentParser(description="TSOC development plan / PDF RES scrape")
    parser.add_argument("--max-pdfs", type=int, default=5, help="Max PDFs to download & parse")
    parser.add_argument("--match-cera", action="store_true", help="Fuzzy match lines to CERA company names")
    parser.add_argument("--max-pages", type=int, default=25, help="Max PDF pages each")
    args = parser.parse_args()

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)

    pdf_records = crawl_pdf_urls()
    # Prefer URLs that look like development / planning / annual reports
    priority_kw = re.compile(r"(development|plan|ten.year|annual|report|network|system|ΔΕΔΠ|ΔΣΜΚ)", re.I)

    def sort_key(rec: dict[str, Any]) -> tuple[int, str]:
        u = rec["pdf_url"]
        return (0 if priority_kw.search(u) else 1, u)

    pdf_records.sort(key=sort_key)

    cera_names = load_cera_company_tokens() if args.match_cera else []

    documents: list[dict[str, Any]] = []
    for rec in pdf_records[: args.max_pdfs]:
        text = extract_pdf_text(rec["pdf_url"], max_pages=args.max_pages)
        lines = lines_with_res(text)
        matched: list[dict[str, Any]] = []
        if cera_names:
            for ln in lines[:80]:
                m = fuzzy_best_match(ln, cera_names)
                if m:
                    matched.append({"line": ln, "company": m[0], "score": round(m[1], 3)})
        documents.append(
            {
                **rec,
                "res_snippet_count": len(lines),
                "res_snippets": lines[:120],
                "cera_fuzzy_hits": matched[:40],
            }
        )

    payload: dict[str, Any] = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "TSOC/dsmc public web crawl + PDF text extraction",
        "limitation": "Connection offer letters are not public; this is a weak signal from published plans only.",
        "pdf_documents": documents,
        "discovered_pdf_count": len(pdf_records),
    }

    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT_JSON}")


if __name__ == "__main__":
    main()
