# -*- coding: utf-8 -*-
"""
Reclassify developer prospects < 250 kW to commercial segment.
These are small CERA-licensed rooftop PV installations, not utility parks.
"""
import json, sys, io, urllib.request
from datetime import datetime, timezone

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
W = {**R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

# Fetch all developer prospects < 250 kW
params = 'select=id,company_name,capacity_mwp,offer_type,industry,tags&segment=eq.developer&capacity_mwp=lt.0.25'
rows = json.loads(urllib.request.urlopen(
    urllib.request.Request(f'{URL}?{params}', headers=R), timeout=10
).read())

print(f'Reclassifying {len(rows)} developer prospects < 250 kW to commercial segment...\n')

NOW = datetime.now(timezone.utc).isoformat()
NOTE = (
    'RECLASSIFIED (Jun 2026): Moved from developer to commercial segment.\n'
    'Small CERA-licensed rooftop PV installation (< 250 kW).\n'
    'Suitable for O&M takeover or upgrade proposal, not utility-scale BESS.'
)

batch_size = 50
updated = 0
errors = 0

for i in range(0, len(rows), batch_size):
    batch = rows[i:i+batch_size]
    for row in batch:
        pid = row['id']
        existing_tags = row.get('tags') or []
        # Replace segment:developer tag with segment:commercial
        new_tags = [t for t in existing_tags if t != 'segment:developer']
        if 'segment:commercial' not in new_tags:
            new_tags.append('segment:commercial')
        
        payload = {
            'segment': 'commercial',
            'offer_type': 'rooftop_pv',
            'industry': row.get('industry') or 'Other',
            'bess_sales_angle': None,
            'tags': new_tags,
        }
        
        body = json.dumps(payload).encode()
        req = urllib.request.Request(f'{URL}?id=eq.{pid}', data=body, headers=W, method='PATCH')
        try:
            s = urllib.request.urlopen(req, timeout=10).status
            if s == 204:
                updated += 1
            else:
                errors += 1
        except Exception as e:
            errors += 1
            print(f'  ERROR {row["company_name"]}: {e}')

    print(f'  Processed {min(i+batch_size, len(rows))}/{len(rows)}...')

print(f'\nDone: {updated} reclassified to commercial, {errors} errors')
