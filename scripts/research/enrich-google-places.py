# -*- coding: utf-8 -*-
"""
Enrich anonymous "needs_enrichment" commercial CRM records using Google Places API.

For each anonymous building:
  1. Get centroid lat/lon via Nominatim /lookup (OSM way ID, free, batch of 50)
  2. Query Google Places Nearby Search (30 m radius) for the business at that point
  3. PATCH the CRM record with: name, phone, website, address, industry

Cost: ~$0.032 / Places call × ~1,277 records ≈ $41 total.

Usage:
    python3 scripts/research/enrich-google-places.py
    python3 scripts/research/enrich-google-places.py --dry-run
    python3 scripts/research/enrich-google-places.py --limit 50
"""
import json, sys, io, os, urllib.request, urllib.parse, time, re
from pathlib import Path
from datetime import datetime, timezone
from dotenv import load_dotenv

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
load_dotenv(Path(__file__).resolve().parents[2] / '.env.local')

DRY   = '--dry-run' in sys.argv
LIMIT = int(next((sys.argv[sys.argv.index('--limit')+1]
                  for i,a in enumerate(sys.argv) if a == '--limit'), 99999))

GOOGLE_KEY = os.getenv('GOOGLE_MAPS_KEY', '')
if not GOOGLE_KEY:
    sys.exit('ERROR: GOOGLE_MAPS_KEY not set in .env.local')

SB_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
SB_KEY = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
          '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0'
          '.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE')
SB_R = {'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'}
SB_W = {**SB_R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}
NOW  = datetime.now(timezone.utc).isoformat()

NOM_LOOKUP = 'https://nominatim.openstreetmap.org/lookup'
GP_NEARBY  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
GP_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json'


# ─── Helpers ─────────────────────────────────────────────────────────────────

def sb_fetch(page=500, offset=0):
    p = urllib.parse.urlencode({
        'select': 'id,company_name,place_id,district,location,industry',
        'segment': 'eq.commercial',
        'or': '(company_name.like.Commercial Site*,company_name.like.Building at*)',
        'limit': str(page), 'offset': str(offset),
        'order': 'estimated_deal_value.desc',
    })
    return json.loads(urllib.request.urlopen(
        urllib.request.Request(f'{SB_URL}?{p}', headers=SB_R), timeout=20).read())

def sb_patch(rid, patch):
    body = json.dumps(patch).encode()
    urllib.request.urlopen(urllib.request.Request(
        f'{SB_URL}?id=eq.{rid}', data=body, headers=SB_W, method='PATCH'), timeout=15)


def nom_get_coords(way_ids: list[int]) -> dict:
    """Batch Nominatim lookup → {way_id: (lat, lon)}"""
    ids_str = ','.join(f'W{i}' for i in way_ids)
    p = urllib.parse.urlencode({'osm_ids': ids_str, 'format': 'jsonv2'})
    req = urllib.request.Request(
        f'{NOM_LOOKUP}?{p}',
        headers={'User-Agent': 'LighthiefCRM-Places/1.0 (office@lighthief.com)'})
    try:
        items = json.loads(urllib.request.urlopen(req, timeout=15).read())
        return {int(it['osm_id']): (float(it['lat']), float(it['lon']))
                for it in items if it.get('osm_id') and it.get('lat')}
    except Exception as e:
        print(f'  Nominatim error: {e}')
        return {}


def classify_types(types: list) -> str | None:
    t = ' '.join(types).lower()
    if any(x in t for x in ['lodging', 'hotel', 'resort']):
        return 'Hotel / Hospitality'
    if any(x in t for x in ['hospital', 'doctor', 'dentist', 'pharmacy', 'health']):
        return 'Clinic / Medical'
    if any(x in t for x in ['supermarket', 'grocery', 'department_store']):
        return 'Supermarket / Retail'
    if any(x in t for x in ['school', 'university', 'secondary_school']):
        return 'Education'
    if any(x in t for x in ['restaurant', 'cafe', 'bar', 'food', 'bakery']):
        return 'Restaurant / Café'
    if any(x in t for x in ['gym', 'fitness', 'stadium', 'sports_complex']):
        return 'Gym / Sports'
    if any(x in t for x in ['car_dealer', 'car_repair']):
        return 'Car Dealership'
    if any(x in t for x in ['storage', 'warehouse', 'moving_company']):
        return 'Warehouse / Logistics'
    return None


def places_nearby(lat: float, lon: float) -> dict | None:
    """
    Google Places Nearby Search — returns the closest named business within 50 m.
    Falls back to 100 m if nothing found at 50 m.
    """
    for radius in (50, 100):
        p = urllib.parse.urlencode({
            'location': f'{lat},{lon}',
            'radius': radius,
            'rankby': 'prominence',
            'key': GOOGLE_KEY,
        })
        try:
            data = json.loads(urllib.request.urlopen(
                urllib.request.Request(f'{GP_NEARBY}?{p}'), timeout=10).read())
        except Exception as e:
            print(f'    Places error: {e}')
            return None

        results = data.get('results', [])
        # Filter out generic/unhelpful types
        skip_types = {'street_address', 'route', 'locality', 'political',
                      'country', 'administrative_area_level_1',
                      'administrative_area_level_2', 'postal_code'}
        for r in results:
            types = set(r.get('types', []))
            if types <= skip_types:
                continue
            name = r.get('name', '').strip()
            if not name or len(name) < 3:
                continue
            return {
                'name':         name,
                'place_id':     r.get('place_id'),
                'types':        r.get('types', []),
                'vicinity':     r.get('vicinity', ''),
                'rating':       r.get('rating'),
            }
    return None


def places_details(place_id: str) -> dict:
    """Fetch phone + website from Places Details API."""
    p = urllib.parse.urlencode({
        'place_id': place_id,
        'fields': 'formatted_phone_number,website,formatted_address',
        'key': GOOGLE_KEY,
    })
    try:
        data = json.loads(urllib.request.urlopen(
            urllib.request.Request(f'{GP_DETAILS}?{p}'), timeout=10).read())
        r = data.get('result', {})
        return {
            'phone':   r.get('formatted_phone_number'),
            'website': r.get('website'),
            'address': r.get('formatted_address'),
        }
    except Exception:
        return {}


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    print(f'{"DRY RUN — " if DRY else ""}Google Places enrichment [{NOW[:10]}]')
    print(f'API key: {GOOGLE_KEY[:12]}...\n')

    # 1. Fetch all anonymous records
    print('Fetching anonymous records...')
    records, offset = [], 0
    while len(records) < LIMIT:
        batch = sb_fetch(page=500, offset=offset)
        if not batch: break
        records.extend(batch)
        offset += len(batch)
        if len(batch) < 500: break
    records = records[:LIMIT]
    osm = [(r, int(r['place_id'].replace('osm:', '')))
           for r in records if (r.get('place_id') or '').startswith('osm:')]
    print(f'  {len(records)} anonymous | {len(osm)} with OSM IDs\n')

    # 2. Get coordinates via Nominatim batch (50 per call, free)
    print('Getting coordinates from Nominatim...')
    coords: dict = {}
    NOM_BATCH = 50
    nom_batches = (len(osm) + NOM_BATCH - 1) // NOM_BATCH
    for i in range(0, len(osm), NOM_BATCH):
        chunk = osm[i:i+NOM_BATCH]
        way_ids = [wid for _, wid in chunk]
        res = nom_get_coords(way_ids)
        coords.update(res)
        time.sleep(1.1)
        if (i // NOM_BATCH + 1) % 5 == 0:
            print(f'  Nominatim batch {i//NOM_BATCH+1}/{nom_batches} — {len(coords)} coords so far')
    print(f'  Got coordinates for {len(coords)} / {len(osm)} records\n')

    # 3. Google Places lookup + CRM update
    print('Running Google Places Nearby Search...')
    updated = named = details_fetched = skipped = 0
    api_calls = 0

    for idx, (rec, wid) in enumerate(osm):
        if wid not in coords:
            skipped += 1
            continue

        lat, lon = coords[wid]
        place = places_nearby(lat, lon)
        api_calls += 1
        time.sleep(0.05)   # Places API: no strict rate limit but be polite

        if not place:
            skipped += 1
            continue

        # Fetch details (phone + website) — only if we have a good match
        detail = {}
        if place.get('place_id'):
            detail = places_details(place['place_id'])
            api_calls += 1
            time.sleep(0.05)

        industry = classify_types(place.get('types', []))
        address  = (detail.get('address') or place.get('vicinity') or
                    rec.get('location') or '')
        # Clean address: strip country suffix if Cyprus
        address  = re.sub(r',\s*Cyprus\s*$', '', address).strip() or None

        patch = {
            'company_name': place['name'],
            'plant_name':   place['name'],
            'tags': ['google_places_enriched', 'source:osm', 'segment:commercial'],
        }
        if place.get('place_id'):   patch['place_id']        = place['place_id']
        if address:
            existing_loc = rec.get('location') or ''
            if not existing_loc or 'District, Cyprus' in existing_loc:
                patch['location'] = address
        if detail.get('phone'):   patch['contact_phone']   = detail['phone']
        if detail.get('website'): patch['company_website'] = detail['website']
        if industry:              patch['industry']        = industry

        named += 1
        if DRY:
            print(f'  [{idx+1:5d}] → {place["name"][:40]:40} | '
                  f'{address[:35] if address else ""}')
        else:
            try:
                sb_patch(rec['id'], patch)
                updated += 1
            except Exception as e:
                print(f'    PATCH error {rec["id"][:8]}: {e}')

        if (idx+1) % 100 == 0:
            print(f'  Progress: {idx+1}/{len(osm)} | updated={updated} '
                  f'named={named} api_calls={api_calls}')

    print(f'\n{"="*60}')
    print(f'{"DRY RUN — " if DRY else ""}DONE')
    print(f'  Records processed:  {len(osm)}')
    print(f'  Updated in CRM:     {updated}')
    print(f'  Named businesses:   {named}')
    print(f'  Skipped (no coord): {skipped}')
    print(f'  Places API calls:   {api_calls}  (~${api_calls * 0.032:.2f})')
    print(f'{"="*60}')

if __name__ == '__main__':
    main()
