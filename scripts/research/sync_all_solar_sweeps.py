"""
Sync all solar-sweep CSV files to the CRM (pv_prospects table).
Reads every solar-sweep-*.csv in docs/solar-prospects/, deduplicates,
filters for qualifying south-Cyprus prospects, and upserts to Supabase.

Usage:
    python scripts/research/sync_all_solar_sweeps.py
    python scripts/research/sync_all_solar_sweeps.py --dry-run
    python scripts/research/sync_all_solar_sweeps.py --min-roof 200
"""

import csv
import io
import json
import os
import re
import shutil
import sys
import time
import unicodedata
from datetime import date
from pathlib import Path

import urllib.request
import urllib.parse

# ─────────────────────────── CONFIG ────────────────────────────────────────
ROOT = Path(__file__).resolve().parents[2]
SWEEP_DIR = ROOT / "docs" / "solar-prospects"
ROOFS_OUT = ROOT / "public" / "crm-roofs"

SUPABASE_URL = "https://iipbxwyvlzxthlblayvw.supabase.co"
SUPABASE_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    ".eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0"
    ".-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE"
)

MIN_ROOF = float(next((sys.argv[sys.argv.index("--min-roof") + 1] for i, a in enumerate(sys.argv) if a == "--min-roof"), 200))
DRY_RUN = "--dry-run" in sys.argv
BATCH_DATE = date.today().isoformat()

# ─────────────────────────── NORTH CYPRUS FILTER ───────────────────────────
NORTH_KEYWORDS = [
    "kyrenia", "keryneia", "kerynia", "girne", "lapithos", "karavas", "lapta",
    "bellapais", "ozankoy", "alsancak", "karakum", "morphou", "güzelyurt",
    "famagusta north", "varosha"
]
# lat > ~35.15 and lon in north Cyprus range → north Cyprus
def is_north_cyprus(lat, lon, name="", addr=""):
    text = (name + " " + addr).lower()
    for kw in NORTH_KEYWORDS:
        if kw in text:
            return True
    # Turkish-only name characters (ş, ğ, ı) suggest north
    if re.search(r"[şğı]", name) and not re.search(r"[αβγδεζηθ]", name):
        return True
    if lat is not None and lon is not None:
        # Rough north Cyprus: lat > 35.15 generally north
        if lat > 35.15:
            return True
    return False

# ─────────────────────────── DISTRICT INFERENCE ────────────────────────────
BOXES = [
    {"district": "Paphos",     "south": 34.65, "north": 34.88, "west": 32.25, "east": 32.55},
    {"district": "Limassol",   "south": 34.54, "north": 34.84, "west": 32.82, "east": 33.22},
    {"district": "Larnaca",    "south": 34.76, "north": 35.05, "west": 33.45, "east": 33.82},
    {"district": "Famagusta",  "south": 34.88, "north": 35.18, "west": 33.82, "east": 34.15},
    {"district": "Nicosia",    "south": 34.98, "north": 35.38, "west": 32.88, "east": 33.58},
]

def infer_district(lat, lon):
    if lat is None or lon is None:
        return None
    for b in BOXES:
        if b["south"] <= lat <= b["north"] and b["west"] <= lon <= b["east"]:
            return b["district"]
    return None

# ─────────────────────────── INDUSTRY GUESS ────────────────────────────────
def guess_industry(google_types: str) -> str:
    t = google_types.lower()
    if any(x in t for x in ["lodging", "hotel", "resort"]):
        return "Hotel / Hospitality"
    if any(x in t for x in ["restaurant", "cafe", "food", "bar"]):
        return "Restaurant / Café"
    if any(x in t for x in ["doctor", "dentist", "hospital", "health", "medical", "clinic"]):
        return "Clinic / Medical"
    if any(x in t for x in ["supermarket", "grocery", "store"]):
        return "Supermarket / Retail"
    if any(x in t for x in ["car_dealer", "car_repair", "car_wash", "auto"]):
        return "Car Dealership"
    if any(x in t for x in ["gym", "fitness", "sport"]):
        return "Gym / Sports"
    if any(x in t for x in ["warehouse", "storage", "moving", "logistics"]):
        return "Warehouse / Logistics"
    if any(x in t for x in ["factory", "industrial", "manufacturing"]):
        return "Factory / Manufacturing"
    if any(x in t for x in ["school", "university", "education"]):
        return "Education"
    if any(x in t for x in ["winery", "wine", "distillery"]):
        return "Winery / Agriculture"
    return "Other"

def resolve_industry(row: dict) -> str:
    ind = guess_industry(row.get("google_types", ""))
    if ind != "Other":
        return ind
    roof = safe_float(row.get("roof_area_m2"))
    if roof and roof >= 200:
        return "Warehouse / Logistics"
    return "Other"

# ─────────────────────────── HELPERS ───────────────────────────────────────
def safe_float(v):
    if v is None:
        return None
    try:
        f = float(str(v).strip())
        return f if f == f else None  # nan check
    except Exception:
        return None

def company_key(name: str) -> str:
    return re.sub(r"\s+", " ", name.strip().upper())

def normalize_phone(p: str) -> str:
    if not p:
        return ""
    return re.sub(r"[\s\-\(\)]+", "", p.strip())

def read_csv_file(path: Path) -> list[dict]:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        print(f"  WARN: could not read {path.name}: {e}")
        return []
    reader = csv.DictReader(io.StringIO(text))
    return [row for row in reader]

def find_roof_image(name: str, gmb_name: str) -> Path | None:
    """Find best matching roof image in SWEEP_DIR."""
    for candidate in [gmb_name, name]:
        if not candidate:
            continue
        safe = re.sub(r'[\\/:*?"<>|()\'"]+', '', candidate)[:40].replace(" ", "_")
        # Look for files matching roof_NNNN_<safe>.png
        matches = list(SWEEP_DIR.glob(f"roof_*{safe}*.png"))
        if matches:
            return matches[0]
    return None

# ─────────────────────────── SUPABASE HELPERS ──────────────────────────────
def sb_get(path: str, params: dict = None) -> list:
    """GET from Supabase REST, paginating if needed."""
    url_base = f"{SUPABASE_URL}/rest/v1{path}"
    all_data = []
    offset = 0
    limit = 1000
    while True:
        qp = dict(params or {})
        qp["limit"] = str(limit)
        qp["offset"] = str(offset)
        full_url = url_base + "?" + urllib.parse.urlencode(qp)
        req = urllib.request.Request(
            full_url,
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Content-Type": "application/json",
                "Prefer": "count=exact",
            },
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read())
        all_data.extend(data)
        if len(data) < limit:
            break
        offset += limit
    return all_data

def sb_post(path: str, payload: list) -> dict:
    url = f"{SUPABASE_URL}/rest/v1{path}"
    body = json.dumps(payload).encode()
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return {"ok": True, "data": json.loads(resp.read())}
    except urllib.error.HTTPError as e:
        return {"ok": False, "error": e.read().decode()}

def sb_patch(path: str, payload: dict) -> dict:
    url = f"{SUPABASE_URL}/rest/v1{path}"
    body = json.dumps(payload).encode()
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
        method="PATCH",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return {"ok": True}
    except urllib.error.HTTPError as e:
        return {"ok": False, "error": e.read().decode()}

# ─────────────────────────── MAIN ──────────────────────────────────────────
def main():
    print(f"{'DRY RUN - ' if DRY_RUN else ''}Sync solar sweeps -> CRM  [{BATCH_DATE}]")
    print(f"Min roof: {MIN_ROOF} m²\n")

    # ── Step 1: Read all CSVs ──────────────────────────────────────────────
    all_rows: list[dict] = []
    csv_files = sorted(SWEEP_DIR.glob("solar-sweep-*.csv"))
    print(f"Found {len(csv_files)} CSV files")
    for f in csv_files:
        rows = read_csv_file(f)
        print(f"  {f.name}: {len(rows)} rows")
        all_rows.extend(rows)
    print(f"\nTotal raw rows: {len(all_rows)}")

    # ── Step 2: Deduplicate on place_id then company_key ──────────────────
    seen_place_ids: set[str] = set()
    seen_company_keys: set[str] = set()
    unique_rows: list[dict] = []
    for r in all_rows:
        pid = r.get("place_id", "").strip()
        name = (r.get("gmb_name") or r.get("name") or "").strip()
        ck = company_key(name)
        if pid and pid in seen_place_ids:
            continue
        if ck and ck in seen_company_keys:
            continue
        if pid:
            seen_place_ids.add(pid)
        if ck:
            seen_company_keys.add(ck)
        unique_rows.append(r)
    print(f"After CSV-level dedup: {len(unique_rows)} unique rows")

    # ── Step 3: Filter qualifying prospects ───────────────────────────────
    qualified = []
    skipped_roof = 0
    skipped_name = 0
    skipped_pv = 0
    skipped_north = 0

    for r in unique_rows:
        name = (r.get("gmb_name") or r.get("name") or "").strip()
        addr = r.get("gmb_address") or r.get("addr") or ""
        roof = safe_float(r.get("roof_area_m2"))
        pv_status = (r.get("pv_status") or "").lower()
        lat = safe_float(r.get("lat"))
        lon = safe_float(r.get("lon"))

        if not name:
            skipped_name += 1
            continue
        if not roof or roof < MIN_ROOF:
            skipped_roof += 1
            continue
        if pv_status in ("confirmed", "likely", "partial"):
            skipped_pv += 1
            continue
        if is_north_cyprus(lat, lon, name, addr):
            skipped_north += 1
            continue
        qualified.append(r)

    print(f"\nQualification filter:")
    print(f"  No name: {skipped_name}")
    print(f"  Roof < {MIN_ROOF} m²: {skipped_roof}")
    print(f"  Has existing PV: {skipped_pv}")
    print(f"  North Cyprus: {skipped_north}")
    print(f"  QUALIFIED: {len(qualified)}")

    # ── Step 4: Fetch existing CRM records ────────────────────────────────
    print("\nFetching existing CRM commercial prospects...")
    existing = sb_get(
        "/pv_prospects",
        {"select": "id,company_name,plant_name,place_id", "segment": "eq.commercial"},
    )
    existing_by_place_id: dict[str, str] = {}
    existing_by_company: dict[str, str] = {}
    for rec in existing:
        pid = (rec.get("place_id") or "").strip()
        if pid:
            existing_by_place_id[pid] = rec["id"]
        ck = company_key(rec.get("company_name") or rec.get("plant_name") or "")
        if ck and ck not in existing_by_company:
            existing_by_company[ck] = rec["id"]
    print(f"Existing CRM records: {len(existing)} (unique by place_id: {len(existing_by_place_id)}, by name: {len(existing_by_company)})")

    # ── Step 5: Build insert/update lists ────────────────────────────────
    to_insert: list[dict] = []
    to_update: list[tuple[str, dict]] = []
    images_copied = 0

    if not DRY_RUN:
        ROOFS_OUT.mkdir(parents=True, exist_ok=True)

    for r in qualified:
        pid = r.get("place_id", "").strip()
        raw_name = r.get("name", "").strip()
        gmb_name = r.get("gmb_name", "").strip()
        addr = r.get("addr", "").strip()
        gmb_addr = r.get("gmb_address", "").strip()
        lat = safe_float(r.get("lat"))
        lon = safe_float(r.get("lon"))

        is_building_coords = bool(re.match(r"^Building\s+at\s+\d", raw_name))
        district = infer_district(lat, lon)
        display_name = gmb_name or (
            f"Commercial Site — {district or 'Cyprus'}" if is_building_coords else raw_name
        )
        location = (
            gmb_addr
            or (None if addr.lower() == "cyprus" else addr or None)
            or (f"{district} District, Cyprus" if district else None)
        )

        payback = safe_float(r.get("payback_yrs"))
        if payback is not None and payback < 5:
            priority = "high"
        elif payback is not None and payback < 7:
            priority = "medium"
        else:
            priority = "low"

        industry = resolve_industry(r)
        has_pv = (r.get("pv_status") or "").lower() in ("confirmed", "likely", "partial")

        # Roof image
        roof_url = None
        img_src = find_roof_image(raw_name, gmb_name)
        if img_src:
            safe_id = re.sub(r"[^A-Za-z0-9_-]", "", pid or display_name)[:60] or f"c{int(time.time())}"
            dest = ROOFS_OUT / f"{safe_id}.png"
            if not DRY_RUN:
                try:
                    shutil.copy2(img_src, dest)
                    images_copied += 1
                except Exception:
                    pass
            roof_url = f"/crm-roofs/{safe_id}.png"

        tags = [
            f"batch:{BATCH_DATE}",
            "segment:commercial",
            f"district:{district}" if district else "",
            f"industry:{re.sub(r'\\s*/\\s*', '-', industry)}" if industry else "",
            "has_pv" if has_pv else "",
        ]
        tags = [t for t in tags if t]

        # Build search aliases (simplified — just common forms)
        aliases = list({display_name, display_name.upper(), display_name.lower()})
        if location:
            aliases.append(location)

        record = {
            "segment": "commercial",
            "company_name": display_name,
            "plant_name": display_name,
            "location": location,
            "district": district,
            "technology": "PV",
            "capacity_mwp": (safe_float(r.get("peak_kw")) or 0) / 1000 or None,
            "roof_area_m2": safe_float(r.get("roof_area_m2")),
            "annual_kwh": safe_float(r.get("annual_kwh")),
            "annual_savings_eur": safe_float(r.get("savings_eur")),
            "payback_years": payback,
            "estimated_deal_value": safe_float(r.get("system_cost")),
            "has_existing_pv": has_pv,
            "bess_sales_angle": "retrofit" if has_pv else "pre_sale",
            "contact_email": r.get("email_found") or None,
            "contact_phone": normalize_phone(r.get("gmb_phone") or r.get("phone") or "") or None,
            "company_website": r.get("gmb_website") or r.get("website") or None,
            "place_id": pid or None,
            "roof_image_url": roof_url,
            "offer_type": "rooftop_pv",
            "data_source": "google_places",
            "priority": priority,
            "industry": industry,
            "search_aliases": aliases,
        }
        # Remove None values for cleanliness
        record = {k: v for k, v in record.items() if v is not None}

        exist_id = (
            (existing_by_place_id.get(pid) if pid else None)
            or existing_by_company.get(company_key(display_name))
        )
        if exist_id:
            to_update.append((exist_id, record))
        else:
            to_insert.append({**record, "outreach_status": "new", "tags": tags})

    print(f"\nTo insert: {len(to_insert)} | To update: {len(to_update)}")

    # Show 3F Warehouse status
    three_f = next((r for r in to_insert + [u for _, u in to_update]
                    if "3f" in (r.get("company_name") or "").lower() or "3f" in (r.get("plant_name") or "").lower()), None)
    if three_f:
        print(f"\n3F Warehouse: found → {'INSERT' if three_f in to_insert else 'UPDATE'}")
    else:
        print("\n3F Warehouse: already in CRM or not in qualified set")

    # Normalize all insert records to the same key set (PostgREST requires uniform keys)
    if to_insert:
        all_keys: set[str] = set()
        for r in to_insert:
            all_keys.update(r.keys())
        normalized_inserts = []
        for r in to_insert:
            normalized_inserts.append({k: r.get(k) for k in sorted(all_keys)})
        to_insert = normalized_inserts

    if DRY_RUN:
        print("\n-- DRY RUN - no writes --")
        print("Sample inserts:")
        for r in to_insert[:10]:
            print(f"  + {r.get('company_name')} | {r.get('district')} | roof={r.get('roof_area_m2')} | {r.get('contact_email') or '-'}")
        return

    # ── Step 6: Write to Supabase ─────────────────────────────────────────
    inserted = 0
    CHUNK = 50
    for i in range(0, len(to_insert), CHUNK):
        chunk = to_insert[i:i + CHUNK]
        result = sb_post("/pv_prospects", chunk)
        if result["ok"]:
            inserted += len(chunk)
            print(f"  Inserted chunk {i//CHUNK + 1}: {len(chunk)} records")
        else:
            print(f"  INSERT ERROR (chunk {i//CHUNK + 1}): {result['error'][:300]}")

    updated = 0
    for (rec_id, patch) in to_update:
        res = sb_patch(f"/pv_prospects?id=eq.{rec_id}", patch)
        if res["ok"]:
            updated += 1

    print(f"\n{'='*60}")
    print(f"DONE")
    print(f"  Inserted: {inserted}")
    print(f"  Updated:  {updated}")
    print(f"  Images:   {images_copied}")
    print(f"\nCommit public/crm-roofs/ with new roof images.")

if __name__ == "__main__":
    main()
