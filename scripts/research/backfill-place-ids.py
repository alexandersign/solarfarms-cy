# -*- coding: utf-8 -*-
"""
Backfill Google place_id for records tagged 'google_places_enriched' that
still have no place_id. Uses OSM REST API for coordinates + Places Nearby Search.

Usage: python3 scripts/research/backfill-place-ids.py [--dry-run] [--limit N]
"""
import json, sys, io, os, urllib.request, urllib.parse, time
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
    sys.exit('ERROR: GOOGLE_MAPS_KEY not in .env.local')

SB_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
SB_KEY = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
          '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0'
          '.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE')
SB_R = {'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'}
SB_W = {**SB_R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}
OSM  = 'https://api.openstreetmap.org/api/0.6'
GP_N = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

SKIP = {'street_address','route','locality','political','country',
        'administrative_area_level_1','administrative_area_level_2','postal_code',
        'sublocality','sublocality_level_1','neighborhood','natural_feature'}


def sb_fetch(offset=0, page=500):
    # Records that are enriched but still have no place_id
    p = urllib.parse.urlencode({
        'select': 'id,company_name,plant_name,place_id',
        'segment': 'eq.commercial',
        'tags': 'cs.{"google_places_enriched"}',
        'place_id': 'is.null',
        'limit': str(page), 'offset': str(offset),
    })
    return json.loads(urllib.request.urlopen(
        urllib.request.Request(f'{SB_URL}?{p}', headers=SB_R), timeout=20).read())

def sb_patch(rid, patch):
    body = json.dumps(patch).encode()
    req = urllib.request.Request(
        f'{SB_URL}?id=eq.{rid}', data=body, headers=SB_W, method='PATCH')
    try:
        urllib.request.urlopen(req, timeout=15)
        return True
    except urllib.error.HTTPError as e:
        if e.code == 409:
            return False   # duplicate place_id — skip silently
        raise

def osm_centroid(way_id):
    try:
        url = f'{OSM}/way/{way_id}/full.json'
        with urllib.request.urlopen(urllib.request.Request(
                url, headers={'User-Agent': 'LighthiefCRM/2.0'}), timeout=15) as r:
            els = json.loads(r.read()).get('elements', [])
        nodes = [(e['lat'], e['lon']) for e in els if e.get('type') == 'node']
        return (sum(n[0] for n in nodes)/len(nodes), sum(n[1] for n in nodes)/len(nodes)) if nodes else None
    except Exception:
        return None

def places_pid(lat, lon, name):
    """Return Google place_id for the named business closest to lat/lon."""
    for radius in (50, 100, 200):
        p = urllib.parse.urlencode({'location': f'{lat},{lon}', 'radius': radius,
                                     'rankby': 'prominence', 'keyword': name, 'key': GOOGLE_KEY})
        try:
            results = json.loads(urllib.request.urlopen(
                urllib.request.Request(f'{GP_N}?{p}'), timeout=10).read()).get('results', [])
            for r in results:
                if set(r.get('types', [])) <= SKIP:
                    continue
                pid = r.get('place_id')
                if pid:
                    return pid
        except Exception:
            pass
    return None


def main():
    print(f'{"DRY RUN — " if DRY else ""}Backfill Google place_id')
    records, offset = [], 0
    while len(records) < LIMIT:
        batch = sb_fetch(offset=offset)
        if not batch: break
        records.extend(batch); offset += len(batch)
        if len(batch) < 500: break
    records = records[:LIMIT]
    print(f'Records missing place_id: {len(records)}\n')

    updated = skipped = 0
    for idx, rec in enumerate(records):
        # Extract OSM way ID from the original place_id we cleared (now null)
        # We need another way to get coords — use the company name + Places Text Search
        # OR: try to look up by name alone using Places Find Place API
        name = rec.get('plant_name') or rec.get('company_name') or ''

        # Try Places Text Search to find the business by name
        p = urllib.parse.urlencode({
            'input': f'{name} Limassol Cyprus',
            'inputtype': 'textquery',
            'fields': 'place_id',
            'key': GOOGLE_KEY,
        })
        url = f'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?{p}'
        try:
            data = json.loads(urllib.request.urlopen(
                urllib.request.Request(url), timeout=10).read())
            candidates = data.get('candidates', [])
            pid = candidates[0].get('place_id') if candidates else None
        except Exception:
            pid = None

        if pid:
            if DRY:
                print(f'  [{idx+1}] {name[:45]:45} → {pid}')
            else:
                try:
                    ok = sb_patch(rec['id'], {'place_id': pid})
                    if ok:
                        updated += 1
                    else:
                        skipped += 1   # 409 duplicate — already assigned to another record
                except Exception as e:
                    print(f'  PATCH error: {e}')
        else:
            skipped += 1

        time.sleep(0.05)
        if (idx+1) % 100 == 0:
            print(f'  [{idx+1}/{len(records)}] updated={updated} skipped={skipped}', flush=True)

    print(f'\n{"="*50}')
    print(f'{"DRY RUN — " if DRY else ""}DONE')
    print(f'  Updated: {updated}  |  Skipped: {skipped}')
    print(f'  API cost: ~${(len(records)-skipped)*0.017:.2f} (Find Place = $0.017/call)')
    print(f'{"="*50}')

if __name__ == '__main__':
    main()
