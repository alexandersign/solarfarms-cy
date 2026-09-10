# -*- coding: utf-8 -*-
"""
Final enrichment pass for remaining "Commercial Site" / "needs_enrichment" records.

Strategy: tiny Overpass batches (10 ways) → reliable centroids → Google Places name.

Timeline: ~1,068 records × (Overpass 0.5s + Places 0.1s) ≈ 10 min total.
Cost: ~$0.032 × 1,068 Places calls ≈ $34.

Usage:
    python3 scripts/research/enrich-remaining-commercial.py
    python3 scripts/research/enrich-remaining-commercial.py --dry-run
    python3 scripts/research/enrich-remaining-commercial.py --limit 50
"""
import json, sys, io, os, urllib.request, urllib.parse, time, re, math
from pathlib import Path
from datetime import datetime, timezone
from dotenv import load_dotenv

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
load_dotenv(Path(__file__).resolve().parents[2] / '.env.local')
sys.stdout.reconfigure(line_buffering=True)

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

OSM_API = 'https://api.openstreetmap.org/api/0.6'
GP_N = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
GP_D = 'https://maps.googleapis.com/maps/api/place/details/json'


# ─── Supabase ────────────────────────────────────────────────────────────────

def sb_fetch(offset=0, page=500):
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


# ─── Overpass: tiny batches (10 ways) ────────────────────────────────────────

def osm_way_centroid(way_id: int) -> tuple | None:
    """
    Get centroid of an OSM way via the official REST API /way/{id}/full.json
    Returns (lat, lon) or None. Fast, reliable, no rate limit for read access.
    """
    url = f'{OSM_API}/way/{way_id}/full.json'
    req = urllib.request.Request(url, headers={'User-Agent': 'LighthiefCRM/2.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            elements = json.loads(resp.read()).get('elements', [])
        nodes = [(e['lat'], e['lon']) for e in elements if e.get('type') == 'node']
        if not nodes:
            return None
        return (sum(n[0] for n in nodes) / len(nodes),
                sum(n[1] for n in nodes) / len(nodes))
    except Exception:
        return None


# ─── Google Places ────────────────────────────────────────────────────────────

SKIP_TYPES = {'street_address','route','locality','political','country',
              'administrative_area_level_1','administrative_area_level_2','postal_code',
              'sublocality','sublocality_level_1','neighborhood','natural_feature',
              'administrative_area_level_3','administrative_area_level_4'}

def places_nearby(lat, lon) -> dict | None:
    for radius in (40, 80, 150):
        p = urllib.parse.urlencode({
            'location': f'{lat},{lon}', 'radius': radius,
            'rankby': 'prominence', 'key': GOOGLE_KEY,
        })
        try:
            data = json.loads(urllib.request.urlopen(
                urllib.request.Request(f'{GP_N}?{p}'), timeout=10).read())
        except Exception:
            return None
        for r in data.get('results', []):
            if set(r.get('types', [])) <= SKIP_TYPES:
                continue
            name = (r.get('name') or '').strip()
            if len(name) < 3:
                continue
            return {'name': name, 'place_id': r.get('place_id'),
                    'types': r.get('types', []), 'vicinity': r.get('vicinity', '')}
    return None

def places_details(pid) -> dict:
    p = urllib.parse.urlencode({
        'place_id': pid, 'key': GOOGLE_KEY,
        'fields': 'formatted_phone_number,website,formatted_address',
    })
    try:
        r = json.loads(urllib.request.urlopen(
            urllib.request.Request(f'{GP_D}?{p}'), timeout=10).read()).get('result', {})
        return {'phone': r.get('formatted_phone_number'),
                'website': r.get('website'),
                'address': r.get('formatted_address')}
    except Exception:
        return {}

def classify(types):
    t = ' '.join(types).lower()
    if any(x in t for x in ['lodging','hotel','resort']):         return 'Hotel / Hospitality'
    if any(x in t for x in ['hospital','doctor','dentist','pharmacy']): return 'Clinic / Medical'
    if any(x in t for x in ['supermarket','grocery','department']): return 'Supermarket / Retail'
    if any(x in t for x in ['school','university','secondary_school']): return 'Education'
    if any(x in t for x in ['restaurant','cafe','bar','food']):   return 'Restaurant / Café'
    if any(x in t for x in ['gym','fitness','sports_complex','stadium']): return 'Gym / Sports'
    if any(x in t for x in ['car_dealer','car_repair']):          return 'Car Dealership'
    if any(x in t for x in ['storage','warehouse']):              return 'Warehouse / Logistics'
    return None


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    print(f'{"DRY RUN — " if DRY else ""}Remaining commercial enrichment [{NOW[:10]}]',
          flush=True)

    # Fetch records
    print('Fetching anonymous records...', flush=True)
    records, offset = [], 0
    while len(records) < LIMIT:
        batch = sb_fetch(offset=offset)
        if not batch: break
        records.extend(batch)
        offset += len(batch)
        if len(batch) < 500: break
    records = records[:LIMIT]
    osm = [(r, int(r['place_id'].replace('osm:', '')))
           for r in records if (r.get('place_id') or '').startswith('osm:')]
    print(f'  {len(records)} anonymous | {len(osm)} with OSM IDs\n', flush=True)

    # Get centroids via OSM REST API (one call per way — reliable, no rate limit)
    coords = {}
    print(f'Getting centroids via OSM REST API ({len(osm)} ways)...', flush=True)
    for i, (rec, wid) in enumerate(osm):
        c = osm_way_centroid(wid)
        if c:
            coords[wid] = c
        time.sleep(0.05)   # polite: 20 req/sec max
        if (i+1) % 100 == 0:
            print(f'  OSM API {i+1}/{len(osm)} — {len(coords)} coords so far', flush=True)

    print(f'  Got {len(coords)} coordinates for {len(osm)} records\n', flush=True)

    # Google Places + CRM update
    print('Running Google Places + updating CRM...', flush=True)
    updated = named = api_calls = skipped = 0

    for idx, (rec, wid) in enumerate(osm):
        if wid not in coords:
            skipped += 1
            continue

        lat, lon = coords[wid]
        place = places_nearby(lat, lon)
        api_calls += 1

        if not place:
            skipped += 1
            continue

        detail = {}
        if place.get('place_id'):
            detail = places_details(place['place_id'])
            api_calls += 1

        industry = classify(place.get('types', []))
        address  = (detail.get('address') or place.get('vicinity') or '')
        address  = re.sub(r',\s*Cyprus\s*$', '', address).strip() or None

        existing_loc = rec.get('location') or ''
        generic_loc  = not existing_loc or 'District, Cyprus' in existing_loc

        patch = {
            'company_name': place['name'],
            'plant_name':   place['name'],
            'tags': ['google_places_enriched', 'source:osm', 'segment:commercial'],
        }
        if address and generic_loc: patch['location']        = address
        if detail.get('phone'):     patch['contact_phone']   = detail['phone']
        if detail.get('website'):   patch['company_website'] = detail['website']
        if industry:                patch['industry']        = industry

        named += 1
        if DRY:
            print(f'  [{idx+1:5d}] {place["name"][:42]:42} | '
                  f'{address or "":.35}', flush=True)
        else:
            try:
                sb_patch(rec['id'], patch)
                updated += 1
            except Exception as e:
                print(f'  PATCH error: {e}', flush=True)

        if (idx+1) % 100 == 0:
            print(f'  [{idx+1}/{len(osm)}] updated={updated} named={named} '
                  f'skipped={skipped} api=${api_calls*0.032:.2f}', flush=True)

    print(f'\n{"="*55}', flush=True)
    print(f'{"DRY RUN — " if DRY else ""}DONE', flush=True)
    print(f'  Processed:   {len(osm)}', flush=True)
    print(f'  Updated:     {updated}', flush=True)
    print(f'  Named:       {named}', flush=True)
    print(f'  Skipped:     {skipped}', flush=True)
    print(f'  API cost:    ~${api_calls * 0.032:.2f}', flush=True)
    print(f'{"="*55}', flush=True)

if __name__ == '__main__':
    main()
