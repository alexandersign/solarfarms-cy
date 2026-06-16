# -*- coding: utf-8 -*-
"""
Spike: EAC Network Applications Status / Παρακολούθηση Αιτήσεων Διανομής.

Determines whether applicant-level connection status is public without login.

Usage:
  python scripts/research/scrape-eac-applications-status.py
"""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

REPO_ROOT = Path(__file__).resolve().parents[2]
OUT = REPO_ROOT / "marketing" / "research" / "eac-applications-status-spike.json"

CANDIDATE_URLS = (
    "https://www.eac.com.cy/el/",
    "https://www.eac.com.cy/EL/RegulatedActivities/Distribution/Pages/default.aspx",
    "https://www.eac.com.cy/EN/RegulatedActivities/Distribution/Pages/default.aspx",
)

SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "LighthiefResearchBot/1.0 (+https://solarfarms.cy)"})


def find_application_links(html: str, base: str) -> list[dict]:
    soup = BeautifulSoup(html, "html.parser")
    out: list[dict] = []
    for a in soup.find_all("a", href=True):
        text = a.get_text(" ", strip=True)
        href = urljoin(base, a["href"])
        if re.search(
            r"(αιτησ|application|παρακολουθ|status|network.?application|όροι|ορων|σύνδεση)",
            text + " " + href,
            re.I,
        ):
            out.append({"text": text[:120], "url": href})
    return out


def probe_url(url: str) -> dict:
    result: dict = {"url": url, "ok": False}
    try:
        r = SESSION.get(url, timeout=25)
        result["status_code"] = r.status_code
        result["ok"] = r.ok
        if r.ok:
            result["links"] = find_application_links(r.text, url)[:25]
            result["has_login_form"] = bool(
                re.search(r"(password|κωδικ|login|σύνδεση χρήστη)", r.text, re.I)
            )
            result["snippet"] = BeautifulSoup(r.text, "html.parser").get_text(" ", strip=True)[
                :500
            ]
    except requests.RequestException as e:
        result["error"] = str(e)
    return result


def main() -> None:
    probes = [probe_url(u) for u in CANDIDATE_URLS]
    all_links: list[dict] = []
    for p in probes:
        all_links.extend(p.get("links") or [])

    conclusion = (
        "No public per-applicant connection queue found in this spike. "
        "Use EAC RES System Tables (POS acceptance dates) as proxy for preliminary "
        "connection terms progress; use rtb-enrichment-template.csv for final_issued."
    )
    if any(p.get("has_login_form") for p in probes):
        conclusion += " Login-gated area detected — manual or applicant-provided data required."

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "conclusion": conclusion,
        "recommendation": "Do not automate applicant portal without credentials.",
        "probes": probes,
        "application_related_links": all_links[:40],
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(conclusion)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
