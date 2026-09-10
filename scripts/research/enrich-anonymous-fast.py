# -*- coding: utf-8 -*-
"""
Fast enrichment of anonymous "Commercial Site" CRM records.

Uses Nominatim /lookup endpoint (batch by OSM way ID, up to 50 per request)
— no Overpass, no per-record coordinate lookup.
One batch = 50 IDs = 1 API call ~0.3 s  →  1,286 records in ~30 API calls ≈ 1–2 minutes.

Usage:
    python3 scripts/research/enrich-anonymous-fast.py
    python3 scripts/research/enrich-anonymous-fast.py --dry-run
"""
import json, sys, io, urllib.request, urllib.parse, time, re
from datetime import datetime, timezone

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
DRY = '--dry-run' in sys.argv

SB_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
SB_KEY = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
          '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0'
          '.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE')
SB_R = {'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'}
SB_W = {**SB_R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}
NOW  = datetime.now(timezone.utc).isoformat()

NOM  = 'https://nominatim.openstreetmap.org/lookup'
UA   = 'LighthiefCRM-Enrich/2.0 (office@lighthief.com)'


def sb_fetch_anon(page=500, offset=0):
    p = urllib.parse.urlencode({
        'select': 'id,company_name,place_id,district,location',
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


def nom_lookup_batch(way_ids: list[int]) -> dict:
    """
    Nominatim /lookup with up to 50 OSM way IDs.
    Returns {way_id: {'name': str|None, 'address': str|None, 'phone': str|None,
                       'website': str|None, 'industry': str|None}}
    """
    ids_str = ','.join(f'W{i}' for i in way_ids)
    p = urllib.parse.urlencode({'osm_ids': ids_str, 'format': 'jsonv2',
                                 'addressdetails': '1', 'namedetails': '1',
                                 'extratags': '1'})
    req = urllib.request.Request(f'{NOM}?{p}', headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            items = json.loads(resp.read())
    except Exception as e:
        print(f'  Nominatim error: {e}')
        return {}

    result = {}
    for item in items:
        osm_id  = item.get('osm_id')
        if not osm_id:
            continue
        osm_id = int(osm_id)
        addr    = item.get('address', {}) or {}
        names   = item.get('namedetails', {}) or {}
        extra   = item.get('extratags', {}) or {}
        cls     = item.get('class', '')
        typ     = item.get('type', '')

        # Skip if this is a highway/road result
        is_road = cls in ('highway', 'road') or typ in (
            'residential','secondary','primary','tertiary','unclassified',
            'motorway','trunk','service','footway','path','cycleway')

        raw_name = (names.get('name') or names.get('name:en') or
                    extra.get('brand') or extra.get('operator') or
                    addr.get('shop') or addr.get('amenity') or
                    addr.get('tourism') or '').strip()
        is_code  = bool(re.match(r'^[A-ZΑ-Ω]\d{1,4}$', raw_name))
        name     = None if (is_road or is_code) else (raw_name or None)

        phone   = (extra.get('phone') or extra.get('contact:phone') or '').strip() or None
        website = (extra.get('website') or extra.get('contact:website') or '').strip() or None

        road   = addr.get('road') or addr.get('pedestrian') or ''
        number = addr.get('house_number') or ''
        city   = addr.get('city') or addr.get('town') or addr.get('village') or ''
        street = f'{road} {number}'.strip()
        address = ', '.join(p for p in [street, city] if p) or None

        industry = None
        for key in ['shop','amenity','tourism','leisure']:
            val = addr.get(key, '').lower()
            if 'hotel' in val or 'motel' in val or 'resort' in val:
                industry = 'Hotel / Hospitality'; break
            if 'hospital' in val or 'clinic' in val or 'doctor' in val:
                industry = 'Clinic / Medical'; break
            if 'supermarket' in val or 'hypermarket' in val:
                industry = 'Supermarket / Retail'; break
            if 'school' in val or 'university' in val or 'college' in val:
                industry = 'Education'; break
            if 'restaurant' in val or 'cafe' in val or 'bar' in val or 'fast_food' in val:
                industry = 'Restaurant / Café'; break
            if 'gym' in val or 'fitness' in val or 'sports' in val:
                industry = 'Gym / Sports'; break
            if 'warehouse' in val or 'storage' in val or 'industrial' in val:
                industry = 'Warehouse / Logistics'; break

        result[osm_id] = {'name': name, 'address': address,
                           'phone': phone, 'website': website, 'industry': industry}
    return result


def main():
    print(f'{"DRY RUN — " if DRY else ""}Fast Nominatim enrichment [{NOW[:10]}]')

    # Fetch all anonymous records
    print('Fetching anonymous records...')
    records, offset = [], 0
    while True:
        batch = sb_fetch_anon(page=500, offset=offset)
        if not batch: break
        records.extend(batch)
        offset += len(batch)
        if len(batch) < 500: break
    print(f'  {len(records)} anonymous records\n')

    # Extract OSM way IDs
    osm = [(r, int(r['place_id'].replace('osm:', '')))
           for r in records if (r.get('place_id') or '').startswith('osm:')]
    print(f'  {len(osm)} with OSM place_id\n')

    # Batch lookup via Nominatim (50 per call)
    BATCH = 50
    nom_results = {}
    batches = (len(osm) + BATCH - 1) // BATCH
    print(f'Nominatim lookup: {batches} batches of {BATCH}...')
    for i in range(0, len(osm), BATCH):
        chunk    = osm[i:i+BATCH]
        way_ids  = [wid for _, wid in chunk]
        res      = nom_lookup_batch(way_ids)
        nom_results.update(res)
        named    = sum(1 for v in res.values() if v.get('name'))
        print(f'  Batch {i//BATCH+1:3d}/{batches} — {len(res):3d} resolved, {named:3d} named')
        time.sleep(1.1)   # Nominatim policy: ≤1 req/sec

    # Update CRM records
    print(f'\nUpdating CRM...')
    updated = named_count = addr_count = skipped = 0
    for rec, wid in osm:
        info = nom_results.get(wid, {})
        patch = {}

        if info.get('name'):
            patch['company_name'] = info['name']
            patch['plant_name']   = info['name']
            named_count += 1

        existing_loc = rec.get('location') or ''
        generic_loc  = not existing_loc or 'District, Cyprus' in existing_loc or existing_loc == 'Cyprus'
        if info.get('address') and generic_loc:
            patch['location'] = info['address']
            addr_count += 1

        if info.get('phone'):   patch['contact_phone']   = info['phone']
        if info.get('website'): patch['company_website'] = info['website']
        if info.get('industry'): patch['industry']       = info['industry']

        if not patch:
            skipped += 1
            continue

        if DRY:
            name = info.get('name') or '(addr only)'
            addr = info.get('address') or ''
            print(f'  {rec["company_name"][:30]:30} → {name} | {addr}')
        else:
            try:
                sb_patch(rec['id'], patch)
                updated += 1
            except Exception as e:
                print(f'  PATCH error {rec["id"][:8]}: {e}')

    print(f'\n{"="*55}')
    print(f'{"DRY RUN — " if DRY else ""}DONE')
    print(f'  Processed:   {len(osm)}')
    print(f'  Updated:     {updated}')
    print(f'  Named:       {named_count}')
    print(f'  Addressed:   {addr_count}')
    print(f'  Skipped:     {skipped}')
    print(f'{"="*55}')

if __name__ == '__main__':
    main()
