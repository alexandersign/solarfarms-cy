# -*- coding: utf-8 -*-
"""
Cyprus Department of Environment — public pages mentioning EIA / development projects.

Official URLs shift between ministries; this script probes likely hosts and extracts
table/list snippets mentioning PV / ΑΠΕ / BESS / storage Greek keywords.

Output:
  marketing/research/doe-eia-projects.json

Usage:
  pip install -r scripts/research/requirements.txt
  python scripts/research/scrape-doe-eia-registry.py
"""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_JSON = REPO_ROOT / "marketing" / "research" / "doe-eia-projects.json"

PROBE_URLS = (
    "https://www.eia.gov.cy/",
    "https://eia.gov.cy/el/",
    "https://www.environment.gov.cy/",
    "https://environment.gov.cy/el/",
    "https://www.moec.gov.cy/",
)

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "LighthiefResearchBot/1.0 (+https://lighthief.cy)",
        "Accept-Language": "el-CY,el;q=0.9,en;q=0.8",
    }
)

PROJECT_HINT = re.compile(
    r"(φωτοβολται|α.π.ε|απε|ηλιακ|pv\b|solar|battery|bess|αποθήκευση|wind|αιολικ)",
    re.I,
)


def fetch(url: str, timeout: float = 25.0) -> tuple[str | None, str | None]:
    try:
        r = SESSION.get(url, timeout=timeout)
        r.raise_for_status()
        return r.text, None
    except requests.RequestException as e:
        return None, str(e)


def extract_snippets(html: str, base_url: str, limit: int = 120) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "html.parser")
    out: list[dict[str, Any]] = []

    for table in soup.find_all("table"):
        for row in table.find_all("tr"):
            text = " ".join(cell.get_text(" ", strip=True) for cell in row.find_all(["td", "th"]))
            if len(text) < 20:
                continue
            if PROJECT_HINT.search(text):
                out.append({"type": "table_row", "text": text[:800], "context_url": base_url})
            if len(out) >= limit:
                return out

    for li in soup.find_all(["li", "p", "article"]):
        text = li.get_text(" ", strip=True)
        if len(text) < 40:
            continue
        if PROJECT_HINT.search(text):
            out.append({"type": li.name, "text": text[:800], "context_url": base_url})
        if len(out) >= limit:
            break

    return out


def discover_more_links(html: str, base_url: str, limit: int = 25) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    keywords = re.compile(r"(eia|περιβαλλ|μελετη|environment|αδειοδ)", re.I)
    urls: list[str] = []
    for a in soup.find_all("a", href=True):
        label = (a.get_text() or "") + " " + a["href"]
        if not keywords.search(label):
            continue
        u = urljoin(base_url, a["href"])
        if u.startswith("http") and u not in urls:
            urls.append(u)
        if len(urls) >= limit:
            break
    return urls


def main() -> None:
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    pages_scanned: list[dict[str, Any]] = []

    for seed in PROBE_URLS:
        html, err = fetch(seed)
        if not html:
            pages_scanned.append({"url": seed, "error": err})
            continue
        snippets = extract_snippets(html, seed)
        pages_scanned.append(
            {
                "url": seed,
                "snippet_count": len(snippets),
                "snippets": snippets[:60],
                "follow_links": discover_more_links(html, seed),
            }
        )

    # shallow follow (depth 1) on first successful seed's links
    extra_snippets: list[dict[str, Any]] = []
    for page in pages_scanned:
        if page.get("error"):
            continue
        for link in page.get("follow_links") or []:
            html, err = fetch(link)
            if not html:
                continue
            extra_snippets.extend(extract_snippets(html, link, limit=40))
            if len(extra_snippets) >= 100:
                break
        if extra_snippets:
            break

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "Public DoE / Environment ministry HTML crawl (best-effort)",
        "limitation": "Official project registers may require manual portal navigation; "
        "use marketing/research/rtb-enrichment-template.csv for confirmed env permit rows.",
        "pages": pages_scanned,
        "extra_snippets": extra_snippets[:80],
    }

    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT_JSON}", file=sys.stderr)


if __name__ == "__main__":
    main()
