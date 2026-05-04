# -*- coding: utf-8 -*-
"""
EAC (ΑΗΚ) — probe public site for grid / connection application listings.

There is typically no open machine-readable queue of preliminary connection terms.
This script:
  1) Crawls a few high-value EAC URLs for keywords (σύνδεση, αίτηση, ΔΔΔ, distribution).
  2) Emits marketing/research/eac-connection-status.json
  3) When --from-cera-rtb is set, merges companies from marketing/cera-rtb-segments.json
     into `manual_checklist` for desk research / calls to DSO.

Usage:
  pip install -r scripts/research/requirements.txt
  python scripts/research/scrape-eac-connection-queue.py
  python scripts/research/scrape-eac-connection-queue.py --from-cera-rtb
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests
from bs4 import BeautifulSoup

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_JSON = REPO_ROOT / "marketing" / "research" / "eac-connection-status.json"
RTB_JSON = REPO_ROOT / "marketing" / "cera-rtb-segments.json"

EAC_SEEDS = (
    "https://www.eac.com.cy/",
    "https://www.eac.com.cy/el/",
    "https://www.eac.com.cy/en/",
)

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "LighthiefResearchBot/1.0 (+https://lighthief.cy)",
        "Accept-Language": "el-CY,el;q=0.9,en;q=0.8",
    }
)

CONN_KW = re.compile(
    r"(σύνδεση|διανομή|δίκτυο|αιτηση|αίτηση|application|connection|generator|παραγωγ|άδεια)",
    re.I,
)


def fetch(url: str) -> str | None:
    try:
        r = SESSION.get(url, timeout=25)
        r.raise_for_status()
        return r.text
    except requests.RequestException as e:
        print(f"[warn] {url}: {e}", file=sys.stderr)
        return None


def extract_lines(html: str, url: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    lines: list[str] = []
    for tag in soup.find_all(["p", "li", "td"]):
        t = tag.get_text(" ", strip=True)
        if len(t) < 25:
            continue
        if CONN_KW.search(t):
            lines.append(t[:600])
        if len(lines) > 80:
            break
    return lines


def load_rtb_manual_targets() -> list[dict[str, Any]]:
    if not RTB_JSON.exists():
        return []
    data = json.loads(RTB_JSON.read_text(encoding="utf-8"))
    checklist: list[dict[str, Any]] = []
    for bucket in ("rtbCandidates", "bessPreSaleTargets", "mixedConstructionPipeline"):
        for row in data.get(bucket) or []:
            checklist.append(
                {
                    "company": row.get("company"),
                    "construction_mwp": row.get("constructionMwp"),
                    "operational_mwp": row.get("operationalMwp"),
                    "segment_bucket": bucket,
                    "manual_actions": [
                        "Confirm preliminary/final connection terms with applicant or EAC account manager",
                        "Cross-check TSOC if HV / large injection",
                        "Record outcome in marketing/research/rtb-enrichment-template.csv",
                    ],
                }
            )
    # de-dupe company
    seen: set[str] = set()
    deduped: list[dict[str, Any]] = []
    for item in checklist:
        key = (item.get("company") or "").upper()
        if key in seen:
            continue
        seen.add(key)
        deduped.append(item)
    return deduped


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--from-cera-rtb", action="store_true")
    args = parser.parse_args()

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)

    pages: list[dict[str, Any]] = []
    for url in EAC_SEEDS:
        html = fetch(url)
        if not html:
            pages.append({"url": url, "error": "fetch_failed"})
            continue
        pages.append({"url": url, "keyword_snippets": extract_lines(html, url)})

    payload: dict[str, Any] = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "EAC public website keyword crawl",
        "limitation": "DSO does not publish applicant-level connection offers. "
        "Use manual_checklist + enrichment CSV + industry contacts.",
        "pages": pages,
        "manual_checklist": load_rtb_manual_targets() if args.from_cera_rtb else [],
    }

    if args.from_cera_rtb and not payload["manual_checklist"]:
        payload["note"] = f"Run scripts/import-cera-prospects.ts --dry-run --min-mwp 1 first to create {RTB_JSON.name}"

    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT_JSON}")


if __name__ == "__main__":
    main()
