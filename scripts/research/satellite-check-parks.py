# -*- coding: utf-8 -*-
"""
Geocode RTB / pipeline prospects (municipality + Cyprus) via Nominatim and attach map URLs.

Mapbox URLs are never written to disk (tokens would leak into git). Each row includes
`mapbox_static_overlay` (lon,lat,zoom/bounds fragment). Build the Static Images URL locally:
  https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/{overlay}?access_token=$MAPBOX_TOKEN

Does NOT auto-classify panel presence (needs CV / manual review). Sets satellite_check suggestion to `unknown`
with coordinates for human verification.

Inputs:
  marketing/cera-rtb-segments.json  (run import-cera-prospects.ts --dry-run --min-mwp 1 first)

Output:
  marketing/research/satellite-hints.json

Usage:
  pip install -r scripts/research/requirements.txt
  python scripts/research/satellite-check-parks.py --limit 40
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import quote_plus

import requests

REPO_ROOT = Path(__file__).resolve().parents[2]

RTB_JSON = REPO_ROOT / "marketing" / "cera-rtb-segments.json"
OUT_JSON = REPO_ROOT / "marketing" / "research" / "satellite-hints.json"

NOMINATIM = "https://nominatim.openstreetmap.org/search"


def geocode(query: str, session: requests.Session) -> dict[str, Any] | None:
    params = {"q": query, "format": "json", "limit": 1}
    try:
        r = session.get(NOMINATIM, params=params, timeout=20)
        r.raise_for_status()
        data = r.json()
        if not data:
            return None
        hit = data[0]
        return {
            "lat": float(hit["lat"]),
            "lon": float(hit["lon"]),
            "display_name": hit.get("display_name"),
        }
    except (requests.RequestException, KeyError, ValueError, TypeError) as e:
        print(f"[warn] geocode failed {query!r}: {e}", file=sys.stderr)
        return None


def mapbox_static_overlay(lat: float, lon: float, zoom: int = 16, size: str = "800x600") -> str:
    """Fragment only — never embed MAPBOX_TOKEN in JSON output."""
    lon_max = min(max(lon, -180), 180)
    lat_max = min(max(lat, -85), 85)
    return f"{lon_max},{lat_max},{zoom},0/{size}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=50, help="Max companies across segments")
    args = parser.parse_args()

    if not RTB_JSON.exists():
        print(f"Missing {RTB_JSON}. Run: npx tsx scripts/import-cera-prospects.ts --dry-run --min-mwp 1", file=sys.stderr)
        sys.exit(1)

    data = json.loads(RTB_JSON.read_text(encoding="utf-8"))
    session = requests.Session()
    session.headers["User-Agent"] = "LighthiefSatelliteHint/1.0 (research@lighthief.cy)"

    rows_out: list[dict[str, Any]] = []
    seen: set[str] = set()

    def consume(entries: list[dict[str, Any]], segment: str) -> None:
        nonlocal rows_out
        for row in entries:
            if len(rows_out) >= args.limit:
                return
            company = row.get("company") or ""
            key = company.upper()
            if key in seen:
                continue
            seen.add(key)
            mun = (row.get("municipalities") or [""])[0] if isinstance(row.get("municipalities"), list) else ""
            districts = row.get("districts") or []
            district = districts[0] if districts else ""
            query_parts = [mun, district, "Cyprus"]
            query = ", ".join(p for p in query_parts if p)
            time.sleep(1.05)  # Nominatim usage policy
            geo = geocode(query, session) if query.strip() else None
            lat = geo["lat"] if geo else None
            lon = geo["lon"] if geo else None
            rows_out.append(
                {
                    "company": company,
                    "segment": segment,
                    "construction_mwp": row.get("constructionMwp"),
                    "operational_mwp": row.get("operationalMwp"),
                    "geocode_query": query,
                    "lat": lat,
                    "lon": lon,
                    "display_name": geo.get("display_name") if geo else None,
                    "osm_url": f"https://www.openstreetmap.org/search?query={quote_plus(query)}" if query else None,
                    "mapbox_static_overlay": mapbox_static_overlay(lat, lon) if lat is not None else None,
                    "satellite_check": "unknown",
                    "note": "Inspect imagery manually; compare with CERA operational vs construction status.",
                }
            )

    consume(data.get("rtbCandidates") or [], "rtbCandidates")
    consume(data.get("bessRetrofitTargets") or [], "bessRetrofitTargets")
    consume(data.get("bessPreSaleTargets") or [], "bessPreSaleTargets")

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "OpenStreetMap Nominatim geocoding + optional Mapbox static satellite URL",
        "rows": rows_out,
    }
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT_JSON} ({len(rows_out)} rows)")


if __name__ == "__main__":
    main()
