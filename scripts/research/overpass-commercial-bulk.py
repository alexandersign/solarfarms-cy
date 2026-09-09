# -*- coding: utf-8 -*-
"""
Bulk commercial lead generator — OpenStreetMap Overpass API → Supabase CRM.

Queries ALL qualifying commercial/retail/hospitality/industrial buildings in
south Cyprus, estimates rooftop PV potential, and bulk-inserts as commercial
CRM prospects.  No Google/Mapbox/PVGIS API keys required.

Target: fill commercial segment to 2,000 records.

Usage:
    python3 scripts/research/overpass-commercial-bulk.py
    python3 scripts/research/overpass-commercial-bulk.py --dry-run
    python3 scripts/research/overpass-commercial-bulk.py --target 2000
"""
import json, math, re, sys, io, time, urllib.request, urllib.parse, urllib.error
from datetime import datetime, timezone, date

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DRY   = '--dry-run' in sys.argv
TARGET = int(next((sys.argv[sys.argv.index('--target')+1]
                   for i, a in enumerate(sys.argv) if a == '--target'), 2000))

# ─── Supabase ────────────────────────────────────────────────────────────────
SB_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
SB_KEY = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
          '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0'
          '.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE')
SB_H  = {'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}',
         'Content-Type': 'application/json', 'Prefer': 'return=representation'}
SB_RH = {'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'}

TODAY = date.today().isoformat()
NOW   = datetime.now(timezone.utc).isoformat()

# ─── Cyprus district bounding boxes ─────────────────────────────────────────
DISTRICTS = [
    {'name': 'Limassol',  's': 34.54, 'n': 34.84, 'w': 32.82, 'e': 33.22},
    {'name': 'Nicosia',   's': 34.98, 'n': 35.15, 'w': 32.88, 'e': 33.58},
    {'name': 'Larnaca',   's': 34.76, 'n': 35.05, 'w': 33.45, 'e': 33.82},
    {'name': 'Paphos',    's': 34.65, 'n': 34.88, 'w': 32.25, 'e': 32.55},
    {'name': 'Famagusta', 's': 34.88, 'n': 35.15, 'w': 33.82, 'e': 34.15},
]

def infer_district(lat, lon):
    if lat is None or lon is None:
        return None
    for d in DISTRICTS:
        if d['s'] <= lat <= d['n'] and d['w'] <= lon <= d['e']:
            return d['name']
    return None

# ─── Industry classification from OSM tags ───────────────────────────────────
def classify(tags: dict) -> str:
    b  = (tags.get('building') or '').lower()
    am = (tags.get('amenity') or '').lower()
    sh = (tags.get('shop') or '').lower()
    to = (tags.get('tourism') or '').lower()
    le = (tags.get('leisure') or '').lower()
    of = (tags.get('office') or '').lower()
    cr = (tags.get('craft') or '').lower()
    la = (tags.get('landuse') or '').lower()

    if any(x in to for x in ['hotel','motel','hostel','resort','guest_house','chalet']):
        return 'Hotel / Hospitality'
    if any(x in b for x in ['hotel','resort']):
        return 'Hotel / Hospitality'
    if any(x in am for x in ['hospital','clinic','doctors','dentist','pharmacy','health','nursing_home']):
        return 'Clinic / Medical'
    if 'hospital' in b:
        return 'Clinic / Medical'
    if any(x in sh for x in ['supermarket','hypermarket','department_store','mall','convenience']):
        return 'Supermarket / Retail'
    if any(x in sh for x in ['car','auto','vehicle','motorcycle']):
        return 'Car Dealership'
    if any(x in b for x in ['retail','commercial','supermarket']):
        return 'Supermarket / Retail'
    if any(x in am for x in ['school','university','college','kindergarten','library']):
        return 'Education'
    if any(x in b for x in ['school','university','college']):
        return 'Education'
    if any(x in le for x in ['sports_centre','stadium','fitness','gym','swimming_pool','track']):
        return 'Gym / Sports'
    if any(x in am for x in ['restaurant','fast_food','cafe','bar','food_court','pub']):
        return 'Restaurant / Café'
    if any(x in sh for x in ['restaurant','food','bakery','butcher','fishmonger']):
        return 'Restaurant / Café'
    if any(x in b for x in ['warehouse','storage','industrial','factory','manufacture']):
        return 'Warehouse / Logistics'
    if any(x in la for x in ['industrial','commercial']):
        return 'Warehouse / Logistics'
    if any(x in cr for x in ['winery','brewery','distillery']):
        return 'Winery / Agriculture'
    if of:
        return 'Other'
    return 'Other'

# ─── Solar estimation (Cyprus, south-facing, no shading) ────────────────────
# PVGIS Cyprus median: ~1,750 kWh/kWp/yr for fixed optimum tilt
# Rule of thumb: 1 kWp ≈ 7 m² (bifacial panels, ~20% efficiency)
# €/kWp installed (rooftop C&I turnkey, 2026): €950/kWp
# Grid tariff (net metering / net billing): ~€0.22/kWh blended
# O&M excluded from savings calc here

KWP_PER_M2      = 1 / 7       # kWp per m² of roof used
YIELD_KWH_PER_KWP = 1750      # kWh/kWp/year (Cyprus south-facing)
TARIFF_EUR_KWH  = 0.22        # blended grid + ToU value
EUR_PER_KWP     = 950         # installed cost ex VAT
USABLE_FRACTION = 0.65        # fraction of roof area usable for panels

def solar_estimate(roof_m2: float):
    usable   = roof_m2 * USABLE_FRACTION
    kwp      = usable * KWP_PER_M2
    kwh_yr   = kwp * YIELD_KWH_PER_KWP
    savings  = kwh_yr * TARIFF_EUR_KWH
    cost     = kwp * EUR_PER_KWP
    payback  = cost / savings if savings > 0 else None
    return {
        'capacity_mwp':     round(kwp / 1000, 4),
        'annual_kwh':       round(kwh_yr),
        'annual_savings_eur': round(savings),
        'estimated_deal_value': round(cost),
        'payback_years':    round(payback, 1) if payback else None,
    }

def priority(payback):
    if payback and payback < 5:  return 'high'
    if payback and payback < 8:  return 'medium'
    return 'low'

# ─── Polygon area (Shoelace formula, degrees → m²) ───────────────────────────
def poly_area_m2(coords: list[list]) -> float:
    """Shoelace formula on lat/lon nodes, converted to m² using equirectangular."""
    if len(coords) < 3:
        return 0.0
    cx = sum(c[0] for c in coords) / len(coords)
    cy = sum(c[1] for c in coords) / len(coords)
    R = 6_371_000
    lat_m = math.radians(1) * R
    lon_m = math.radians(1) * R * math.cos(math.radians(cy))
    pts = [(c[1] * lon_m, c[0] * lat_m) for c in coords]
    n = len(pts)
    area = abs(sum(pts[i][0]*pts[(i+1)%n][1] - pts[(i+1)%n][0]*pts[i][1]
                   for i in range(n))) / 2
    return area

# ─── Overpass query ──────────────────────────────────────────────────────────
OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

def overpass_query(bbox_str: str) -> list:
    """Query all tagged commercial/industrial/hospitality ways in bbox."""
    building_re = 'commercial|retail|supermarket|hotel|hospital|school|university|warehouse|industrial|factory|office|civic|public|sport|church|yes'
    amenity_re  = 'hospital|clinic|doctors|school|university|restaurant|cafe|bar|fast_food|pub|pharmacy|kindergarten|college'
    tourism_re  = 'hotel|motel|hostel|resort|guest_house'
    leisure_re  = 'sports_centre|stadium|fitness_centre|swimming_pool'

    q = (
        f'[out:json][timeout:90];'
        f'('
        f'way["building"~"{building_re}"]({bbox_str});'
        f'way["shop"]({bbox_str});'
        f'way["amenity"~"{amenity_re}"]({bbox_str});'
        f'way["tourism"~"{tourism_re}"]({bbox_str});'
        f'way["leisure"~"{leisure_re}"]({bbox_str});'
        f');'
        f'out body;>;out skel qt;'
    )
    get_url = OVERPASS_URL + '?data=' + urllib.parse.quote(q)
    req = urllib.request.Request(get_url,
                                  headers={'User-Agent': 'LighthiefSolarCRM/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read())['elements']
    except Exception as e:
        print(f'    Overpass error: {e}')
        return []

def parse_buildings(elements: list, district: str) -> list:
    """Extract ways with polygon area ≥ 150 m²."""
    nodes = {e['id']: (e['lat'], e['lon']) for e in elements if e['type'] == 'node'}
    buildings = []
    for el in elements:
        if el['type'] != 'way':
            continue
        tags = el.get('tags', {})
        if not tags:
            continue
        coords = [nodes[n] for n in el.get('nodes', []) if n in nodes]
        if len(coords) < 3:
            continue
        area = poly_area_m2(coords)
        if area < 150:
            continue
        lat = sum(c[0] for c in coords) / len(coords)
        lon = sum(c[1] for c in coords) / len(coords)
        # Skip north Cyprus
        if lat > 35.15:
            continue
        name = (tags.get('name') or tags.get('name:en') or tags.get('brand') or
                tags.get('operator') or '').strip()
        addr = ' '.join(filter(None, [
            tags.get('addr:street'), tags.get('addr:housenumber'),
            tags.get('addr:city') or district,
        ]))
        buildings.append({
            'osm_id': el['id'],
            'name': name,
            'addr': addr,
            'lat': round(lat, 6),
            'lon': round(lon, 6),
            'roof_area_m2': round(area),
            'tags': tags,
            'district': infer_district(lat, lon) or district,
        })
    return buildings

# ─── Fetch existing CRM names to dedup ───────────────────────────────────────
def fetch_existing_names() -> set:
    existing = set()
    offset = 0
    while True:
        req = urllib.request.Request(
            f'{SB_URL}?select=company_name,place_id&segment=eq.commercial'
            f'&limit=1000&offset={offset}',
            headers=SB_RH)
        rows = json.loads(urllib.request.urlopen(req, timeout=20).read())
        for r in rows:
            n = (r.get('company_name') or '').strip().upper()
            if n:
                existing.add(n)
            # Also add OSM-id based key if place_id looks like an osm id
            pid = r.get('place_id') or ''
            if pid.startswith('osm:'):
                existing.add(pid)
        if len(rows) < 1000:
            break
        offset += 1000
    return existing

# ─── Build CRM record ─────────────────────────────────────────────────────────
def build_record(b: dict) -> dict:
    area     = b['roof_area_m2']
    industry = classify(b['tags'])
    sol      = solar_estimate(area)
    name     = b['name'] or f"Commercial Site — {b['district']}"
    website  = b['tags'].get('website') or b['tags'].get('contact:website') or None
    phone    = b['tags'].get('phone') or b['tags'].get('contact:phone') or None
    email    = b['tags'].get('email') or b['tags'].get('contact:email') or None

    tags_list = [
        f'batch:{TODAY}',
        'segment:commercial',
        f'district:{b["district"]}' if b['district'] else None,
        f'industry:{re.sub(r"\\s*/\\s*", "-", industry)}',
        'source:osm',
    ]

    rec = {
        'segment':              'commercial',
        'offer_type':           'rooftop_pv',
        'technology':           'PV',
        'company_name':         name,
        'plant_name':           name,
        'location':             b['addr'] or f'{b["district"]} District, Cyprus',
        'district':             b['district'],
        'place_id':             f'osm:{b["osm_id"]}',
        'roof_area_m2':         area,
        'industry':             industry,
        'outreach_status':      'new',
        'data_source':          'google_places',   # keep consistent with existing records
        'priority':             priority(sol['payback_years']),
        'tags':                 [t for t in tags_list if t],
        **sol,
    }
    if website: rec['company_website'] = website
    if phone:   rec['contact_phone']   = phone
    if email:   rec['contact_email']   = email
    return rec

# ─── Supabase bulk insert ─────────────────────────────────────────────────────
def insert_batch(records: list) -> int:
    if not records:
        return 0
    # Normalise keys across all records in the batch
    all_keys = sorted({k for r in records for k in r})
    normalised = [{k: r.get(k) for k in all_keys} for r in records]
    body = json.dumps(normalised).encode()
    req  = urllib.request.Request(SB_URL, data=body, headers=SB_H, method='POST')
    try:
        result = json.loads(urllib.request.urlopen(req, timeout=30).read())
        return len(result) if isinstance(result, list) else 0
    except urllib.error.HTTPError as e:
        err = e.read().decode()[:200]
        print(f'    INSERT ERROR: {err}')
        return 0

# ─── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    print(f'{"DRY RUN — " if DRY else ""}Overpass commercial bulk sweep → CRM [{TODAY}]')
    print(f'Target: {TARGET} commercial records total\n')

    # ── 1. Check current count ────────────────────────────────────────────────
    req = urllib.request.Request(
        f'{SB_URL}?select=id&segment=eq.commercial&limit=1',
        headers={**SB_RH, 'Prefer': 'count=exact', 'Range-Unit': 'items', 'Range': '0-0'})
    resp = urllib.request.urlopen(req, timeout=15)
    current = int(resp.headers.get('Content-Range', '0/0').split('/')[-1])
    needed  = max(0, TARGET - current)
    print(f'Current commercial records: {current}')
    print(f'Needed to reach {TARGET}: {needed}\n')
    if needed == 0:
        print('Already at target. Done.')
        return

    # ── 2. Load existing names for dedup ──────────────────────────────────────
    print('Fetching existing CRM names for deduplication...')
    existing = fetch_existing_names()
    print(f'  Existing: {len(existing)} commercial records\n')

    # ── 3. Sweep each district ────────────────────────────────────────────────
    to_insert = []
    total_raw = 0

    for dist in DISTRICTS:
        if len(to_insert) >= needed + 200:  # buffer; stop early if we have enough
            break
        # Split large districts into quadrants to avoid Overpass timeouts
        mid_lat = (dist['s'] + dist['n']) / 2
        mid_lon = (dist['w'] + dist['e']) / 2
        sub_bboxes = [
            f'{dist["s"]},{dist["w"]},{mid_lat},{mid_lon}',
            f'{dist["s"]},{mid_lon},{mid_lat},{dist["e"]}',
            f'{mid_lat},{dist["w"]},{dist["n"]},{mid_lon}',
            f'{mid_lat},{dist["n"]-0.001},{dist["n"]},{dist["e"]}',
        ]
        print(f'Querying Overpass: {dist["name"]} (4 quadrants)...')
        buildings_all = []
        for bbox in sub_bboxes:
            elements = overpass_query(bbox)
            buildings_all.extend(parse_buildings(elements, dist['name']))
            time.sleep(1.0)
        # Deduplicate within district by osm_id
        seen_osm = set()
        buildings = []
        for b in buildings_all:
            if b['osm_id'] not in seen_osm:
                seen_osm.add(b['osm_id'])
                buildings.append(b)
        # Apply tighter roof filter: 150 m² min, 15,000 m² max (avoids campuses/industrial parks)
        buildings = [b for b in buildings if 150 <= b['roof_area_m2'] <= 15000]
        # Prioritise: named buildings first, then anonymous sorted by area desc
        buildings.sort(key=lambda b: (0 if b['name'] else 1, -b['roof_area_m2']))
        total_raw += len(buildings)
        print(f'  Raw buildings (filtered): {len(buildings)}')

        new_count = 0
        for b in buildings:
            # Dedup: skip if OSM id already in CRM
            osm_key = f'osm:{b["osm_id"]}'.upper()
            name_key = (b['name'] or '').strip().upper()
            if osm_key in existing:
                continue
            if name_key and name_key in existing:
                continue
            rec = build_record(b)
            to_insert.append(rec)
            existing.add(osm_key)
            if name_key:
                existing.add(name_key)
            new_count += 1

        print(f'  New to insert from {dist["name"]}: {new_count}')
        time.sleep(1.5)   # be polite to Overpass

    print(f'\nTotal raw buildings scraped: {total_raw}')
    print(f'New records to insert: {len(to_insert)}')
    print(f'After insert total will be: {current + len(to_insert)}')

    if DRY:
        print('\n-- DRY RUN — sample records --')
        for r in to_insert[:10]:
            print(f'  {r["company_name"][:40]:40} {r["industry"][:20]:20} {r["district"]:10} '
                  f'roof={r["roof_area_m2"]}m² deal=€{r.get("estimated_deal_value") or 0:,.0f}')
        print(f'\n  (+ {max(0, len(to_insert)-10)} more)')
        return

    # ── 4. Insert in chunks of 100 ────────────────────────────────────────────
    inserted = 0
    cap      = min(len(to_insert), needed)
    chunk    = 100
    for i in range(0, cap, chunk):
        batch = to_insert[i:i+chunk]
        n = insert_batch(batch)
        inserted += n
        print(f'  Inserted batch {i//chunk + 1}: {n} records (total so far: {inserted})')
        if inserted >= needed:
            break
        time.sleep(0.3)

    print(f'\n{"="*60}')
    print(f'DONE — inserted {inserted} new commercial records')
    print(f'New CRM commercial total: ~{current + inserted}')
    print(f'{"="*60}')

if __name__ == '__main__':
    main()
