# -*- coding: utf-8 -*-
"""
Enrich anonymous "Commercial Site — *" CRM records with real business names
and proper street addresses.

Strategy (fully free, no API keys):
  1. Fetch all anonymous commercial records from Supabase
  2. Batch-query Overpass for:
     a. The way's own tags (some may have name:en, brand, addr:housename etc.)
     b. Named POI NODES within 40 m of the way's centroid
        (common OSM pattern: building way + named shop/amenity node)
  3. Nominatim reverse geocoding for proper street address on each centroid
  4. PATCH records with best available: name → phone/website → proper address

Rate limits respected:
  - Overpass: ≤1 req / 2 sec (batch 400 ways per query to minimise calls)
  - Nominatim: ≤1 req / 1.1 sec (free tier policy)

Usage:
    python3 scripts/research/enrich-anonymous-commercial.py
    python3 scripts/research/enrich-anonymous-commercial.py --dry-run
    python3 scripts/research/enrich-anonymous-commercial.py --limit 200
"""
import json, sys, io, urllib.request, urllib.parse, time, re, math
from datetime import datetime, timezone

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DRY   = '--dry-run' in sys.argv
LIMIT = int(next((sys.argv[sys.argv.index('--limit')+1]
                  for i,a in enumerate(sys.argv) if a == '--limit'), 99999))

SB_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
SB_KEY = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
          '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0'
          '.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE')
SB_R  = {'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'}
SB_W  = {**SB_R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

OV_URLS  = ['https://overpass-api.de/api/interpreter',
            'https://lz4.overpass-api.de/api/interpreter']
NOM_URL  = 'https://nominatim.openstreetmap.org/reverse'
NOW      = datetime.now(timezone.utc).isoformat()


# ─── Supabase helpers ────────────────────────────────────────────────────────

def sb_get_anon(offset=0, page=500) -> list:
    params = urllib.parse.urlencode({
        'select': 'id,company_name,place_id,district,location,contact_phone,company_website',
        'segment': 'eq.commercial',
        'or': '(company_name.like.Commercial Site*,company_name.like.Building at*)',
        'limit': str(page),
        'offset': str(offset),
        'order': 'estimated_deal_value.desc',
    })
    req = urllib.request.Request(f'{SB_URL}?{params}', headers=SB_R)
    return json.loads(urllib.request.urlopen(req, timeout=20).read())

def sb_patch(rid: str, patch: dict):
    body = json.dumps(patch).encode()
    req  = urllib.request.Request(
        f'{SB_URL}?id=eq.{rid}', data=body, headers=SB_W, method='PATCH')
    urllib.request.urlopen(req, timeout=15)


# ─── Overpass: get centroids + nearby named POIs for a batch of way IDs ──────

def overpass_enrich_batch(way_ids: list[int]) -> dict:
    """
    Returns {way_id: {'lat': float, 'lon': float, 'name': str|None,
                       'phone': str|None, 'website': str|None,
                       'addr': str|None, 'industry_hint': str|None}}
    """
    ids_str = ','.join(str(i) for i in way_ids)

    # Simple query: just get way centroids + their own tags
    q   = f'[out:json][timeout:60];way(id:{ids_str});out center tags;'
    enc = urllib.parse.quote(q)
    data = None
    for attempt, base in enumerate(OV_URLS * 2):
        url = base + '?data=' + enc
        req = urllib.request.Request(url, headers={'User-Agent': 'LighthiefCRM/1.0'})
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read())
            break
        except urllib.error.HTTPError as e:
            wait = 5 * (attempt + 1)
            print(f'    Overpass HTTP {e.code} (attempt {attempt+1}) — wait {wait}s...')
            time.sleep(wait)
        except Exception as e:
            print(f'    Overpass error: {e} — wait 5s...')
            time.sleep(5)
    if data is None:
        return {}

    # Build result map
    result = {}

    # First pass: extract way centroids and their own tags
    for el in data.get('elements', []):
        if el.get('type') == 'way':
            wid = el['id']
            center = el.get('center', {})
            lat = center.get('lat')
            lon = center.get('lon')
            tags = el.get('tags', {})
            name = (tags.get('name') or tags.get('name:en') or tags.get('brand') or
                    tags.get('operator') or tags.get('addr:housename') or
                    tags.get('official_name') or '').strip() or None
            phone   = (tags.get('phone') or tags.get('contact:phone') or
                       tags.get('contact:mobile') or '').strip() or None
            website = (tags.get('website') or tags.get('contact:website') or '').strip() or None
            addr_parts = [tags.get('addr:street'), tags.get('addr:housenumber'),
                          tags.get('addr:city')]
            addr = ' '.join(p for p in addr_parts if p) or None
            result[wid] = {
                'lat': lat, 'lon': lon,
                'name': name, 'phone': phone,
                'website': website, 'addr': addr,
                'industry_hint': None,
            }

    return result


# ─── Nominatim: reverse geocode a coordinate ─────────────────────────────────

_nom_cache: dict = {}

def nominatim_reverse(lat: float, lon: float) -> dict:
    """Returns {'display_name', 'road', 'house_number', 'city', 'name'}"""
    key = f'{lat:.5f},{lon:.5f}'
    if key in _nom_cache:
        return _nom_cache[key]
    params = urllib.parse.urlencode({
        'lat': lat, 'lon': lon,
        'format': 'jsonv2',
        'addressdetails': 1,
        'zoom': 18,
        'namedetails': 1,
    })
    req = urllib.request.Request(
        f'{NOM_URL}?{params}',
        headers={'User-Agent': 'LighthiefCRM-Enrichment/1.0 (office@lighthief.com)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
    except Exception:
        data = {}
    _nom_cache[key] = data
    return data


def format_address(nom: dict, district: str):
    """Returns (address_str | None, business_name | None)."""
    if not nom:
        return None, None
    nom_class = nom.get('class', '')
    nom_type  = nom.get('type', '')
    addr  = nom.get('address', {}) or {}
    names = nom.get('namedetails', {}) or {}
    # Reject road/highway names as business names
    is_road = nom_class in ('highway', 'road') or nom_type in (
        'residential', 'secondary', 'primary', 'tertiary', 'unclassified',
        'motorway', 'trunk', 'service', 'footway', 'path', 'cycleway')
    raw_name = (names.get('name') or names.get('name:en') or
                addr.get('shop') or addr.get('amenity') or
                addr.get('tourism') or '').strip()
    is_road_code = bool(re.match(r'^[A-ZΑ-Ω]\d{1,4}$', raw_name))
    place_name = None if (is_road or is_road_code) else (raw_name or None)
    road   = addr.get('road') or addr.get('pedestrian') or addr.get('path') or ''
    number = addr.get('house_number') or ''
    city   = addr.get('city') or addr.get('town') or addr.get('village') or district or ''
    street = f'{road} {number}'.strip()
    parts  = [p for p in [street, city] if p]
    return ', '.join(parts) or None, place_name


def classify_nom(nom: dict) -> str | None:
    """Extract industry hint from Nominatim result."""
    addr = nom.get('address', {})
    for key in ['shop','amenity','tourism','leisure','office']:
        val = addr.get(key, '').lower()
        if not val:
            continue
        if any(x in val for x in ['hotel','motel','hostel','resort']):
            return 'Hotel / Hospitality'
        if any(x in val for x in ['hospital','clinic','doctor','pharmacy']):
            return 'Clinic / Medical'
        if any(x in val for x in ['supermarket','hypermarket','department_store']):
            return 'Supermarket / Retail'
        if any(x in val for x in ['school','university','college']):
            return 'Education'
        if any(x in val for x in ['restaurant','cafe','bar','fast_food','pub']):
            return 'Restaurant / Café'
        if any(x in val for x in ['sports','gym','fitness','stadium','swimming']):
            return 'Gym / Sports'
        if any(x in val for x in ['warehouse','storage','logistics','industrial']):
            return 'Warehouse / Logistics'
    return None


# ─── MAIN ────────────────────────────────────────────────────────────────────

def main():
    print(f'{"DRY RUN — " if DRY else ""}Enrich anonymous commercial CRM records [{NOW[:10]}]')

    # ── 1. Fetch all anonymous records ───────────────────────────────────────
    print('\nFetching anonymous records from CRM...')
    all_records = []
    offset = 0
    while len(all_records) < LIMIT:
        batch = sb_get_anon(offset=offset, page=500)
        if not batch:
            break
        all_records.extend(batch)
        offset += len(batch)
        if len(batch) < 500:
            break
    records = all_records[:LIMIT]
    print(f'  Found {len(records)} anonymous records to enrich')

    # Extract osm way IDs
    osm_records = [(r, int(r['place_id'].replace('osm:','')))
                   for r in records if (r.get('place_id') or '').startswith('osm:')]
    print(f'  With OSM place_id: {len(osm_records)}\n')

    # ── 2. Overpass enrichment in batches of 300 ────────────────────────────
    BATCH = 100
    ov_results: dict = {}
    for i in range(0, len(osm_records), BATCH):
        chunk = osm_records[i:i+BATCH]
        way_ids = [wid for _, wid in chunk]
        print(f'  Overpass batch {i//BATCH + 1} ({len(way_ids)} ways)...')
        res = overpass_enrich_batch(way_ids)
        ov_results.update(res)
        named = sum(1 for v in res.values() if v.get('name'))
        print(f'    → {len(res)} ways resolved, {named} with names found')
        time.sleep(2.5)

    # ── 3. Nominatim + update each record ────────────────────────────────────
    updated = 0
    named_count = 0
    addr_count = 0
    skipped = 0

    for idx, (rec, wid) in enumerate(osm_records):
        ov = ov_results.get(wid, {})
        lat = ov.get('lat')
        lon = ov.get('lon')

        # Start with what Overpass gave us
        new_name    = ov.get('name')
        new_phone   = ov.get('phone') or rec.get('contact_phone')
        new_website = ov.get('website') or rec.get('company_website')
        new_addr    = ov.get('addr')
        new_industry = None

        # Nominatim reverse geocode for address and possibly name
        nom_name = None
        if lat and lon:
            nom = nominatim_reverse(lat, lon)
            nom_addr, nom_name = format_address(nom, rec.get('district', 'Cyprus'))
            nom_industry = classify_nom(nom)
            if not new_addr and nom_addr:
                new_addr = nom_addr
            if not new_name and nom_name:
                new_name = nom_name
            if nom_industry:
                new_industry = nom_industry
            time.sleep(1.1)   # Nominatim rate limit

        # Skip if nothing useful was found
        if not new_name and not new_addr:
            skipped += 1
            continue

        # Build patch
        patch: dict = {}
        if new_name:
            patch['company_name'] = new_name
            patch['plant_name']   = new_name
            named_count += 1
        existing_loc = rec.get('location') or ''
        is_generic_loc = (not existing_loc or
                          'District, Cyprus' in existing_loc or
                          existing_loc == 'Cyprus')
        if new_addr and is_generic_loc:
            patch['location'] = new_addr
            addr_count += 1
        if new_phone:
            patch['contact_phone'] = new_phone
        if new_website:
            patch['company_website'] = new_website
        if new_industry:
            patch['industry'] = new_industry

        if not patch:
            skipped += 1
            continue

        if DRY:
            print(f'  [{idx+1:5d}] {rec["company_name"][:30]:30} → '
                  f'{new_name or "(addr only)"} | {new_addr or ""}')
        else:
            try:
                sb_patch(rec['id'], patch)
                updated += 1
            except Exception as e:
                print(f'    PATCH error {rec["id"][:8]}: {e}')

        if (idx+1) % 50 == 0:
            print(f'  Progress: {idx+1}/{len(osm_records)} | '
                  f'updated={updated} named={named_count} addr={addr_count} skipped={skipped}')

    print(f'\n{"="*60}')
    print(f'{"DRY RUN — " if DRY else ""}DONE')
    print(f'  Records processed: {len(osm_records)}')
    print(f'  Updated:           {updated}')
    print(f'  Got business name: {named_count}')
    print(f'  Got address:       {addr_count}')
    print(f'  Skipped (no data): {skipped}')
    print(f'{"="*60}')


if __name__ == '__main__':
    main()
