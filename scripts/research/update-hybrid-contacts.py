# -*- coding: utf-8 -*-
"""
1. Add Iacovos Charalambous (ic@abio.com.cy) as secondary contact on all Abio rows
2. Create/update Esperia Energy (Frenaros) with signed LOI 25 MW / 100 MWh BESS
"""
import json, sys, io, urllib.request
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
W = {**R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

def get(params):
    req = urllib.request.Request(f'{URL}?{params}', headers=R)
    return json.loads(urllib.request.urlopen(req, timeout=10).read())

def patch(pid, payload):
    body = json.dumps(payload).encode()
    req = urllib.request.Request(f'{URL}?id=eq.{pid}', data=body, headers=W, method='PATCH')
    return urllib.request.urlopen(req, timeout=10).status

def post(payload):
    body = json.dumps(payload).encode()
    req = urllib.request.Request(URL, data=body, headers={**W, 'Prefer': 'return=representation'}, method='POST')
    return json.loads(urllib.request.urlopen(req, timeout=10).read())

NOW = datetime.now().strftime('%Y-%m-%dT%H:%M:%S+03:00')

# ─── 1. Update all Abio rows: add Iacovos as secondary contact ───────────────
print("=== Step 1: Add Iacovos Charalambous to all Abio rows ===\n")

abio_rows = get(
    'select=id,company_name,activity_feed'
    '&or=(company_name.ilike.*easy+power*,company_name.ilike.*abio*,'
    'company_name.ilike.*greendorado*,company_name.ilike.*waneron*,'
    'company_name.ilike.*renergetic*,company_name.ilike.*dianary*,'
    'company_name.ilike.*galascope*)'
)

# Exclude Galascope (Esperia group, not Abio)
abio_rows = [r for r in abio_rows if 'galascope' not in r['company_name'].lower()]

print(f"Abio-group rows: {len(abio_rows)}")
for r in abio_rows:
    feed = r.get('activity_feed') or []
    note = (
        'SECONDARY CONTACT ADDED: Iacovos Charalambous — Cyprus Operations, Abio Group.\n'
        'Email: ic@abio.com.cy\n'
        'Primary: Irakli Bukhiashvili (CEO/Founder) — info@abio.com.cy\n'
        'LinkedIn: https://www.linkedin.com/in/iraklibukhiashvili/'
    )
    entry = {'ts': NOW, 'author': 'Alexander', 'type': 'system', 'body': note}
    feed = [entry] + [e for e in feed if 'SECONDARY CONTACT' not in e.get('body', '')[:25]]

    s = patch(r['id'], {
        'secondary_contact_name': 'Iacovos Charalambous',
        'secondary_contact_email': 'ic@abio.com.cy',
        'secondary_contact_title': 'Cyprus Operations',
        'activity_feed': feed,
    })
    print(f"  {'OK' if s == 204 else s}  {r['company_name']}")

# ─── 2. Esperia Energy (Frenaros) — signed LOI, 25 MW / 100 MWh ─────────────
print("\n=== Step 2: Esperia Energy (Frenaros) — signed LOI ===\n")

frenaros_rows = get(
    'select=id,company_name,plant_name,capacity_mwp,bess_potential_mwh,outreach_status'
    '&company_name=ilike.*frenaros*'
)

LOI_NOTE = (
    'SIGNED LOI (Dino Constantinou, Jun 2026):\n'
    'PV park: Esperia Energy (Frenaros) — 8.75 MWp, Famagusta district\n'
    'BESS scope: 25 MW / 100 MWh — Q4 2026 target delivery\n'
    'This is the largest single BESS order in the Esperia group pipeline.\n'
    'Source: Hybrid Storage list of PV plants & owners PDF (Linyang, Nov 2025)\n'
    'LOI signed by Dino Constantinou — Alexander confirmed Jun 2026.'
)

if frenaros_rows:
    print(f"Found existing row: {frenaros_rows[0]['company_name']}")
    pid = frenaros_rows[0]['id']
    feed = get(f'select=activity_feed&id=eq.{pid}')[0].get('activity_feed') or []
    entry = {'ts': NOW, 'author': 'Alexander', 'type': 'system', 'body': LOI_NOTE}
    feed = [entry] + [e for e in feed if 'SIGNED LOI' not in e.get('body', '')[:11]]
    s = patch(pid, {
        'capacity_mwp': 8.75,
        'bess_potential_mwh': 100,
        'offer_type': 'bess_retrofit',
        'outreach_status': 'negotiating',
        'estimated_deal_value': 10000000,  # ~€100/MWh × 100 MWh
        'priority': 'urgent',
        'rtb_status': 'operational',
        'bess_sales_angle': 'retrofit',
        'parent_group': 'Esperia Energy Group',
        'contact_name': 'Dino Constantinou',
        'district': 'Famagusta',
        'tags': ['loi_signed', 'bess_100mwh', 'q4_2026', 'esperia_group'],
        'activity_feed': feed,
    })
    print(f"  Updated: {'OK' if s == 204 else s}")
else:
    print("Not found in CRM — creating new row...")
    new_row = {
        'plant_name': 'Esperia Energy (Frenaros)',
        'company_name': 'ESPERIA ENERGY (FRENAROS) LTD',
        'segment': 'developer',
        'capacity_mwp': 8.75,
        'bess_potential_mwh': 100,
        'offer_type': 'bess_retrofit',
        'outreach_status': 'negotiating',
        'estimated_deal_value': 10000000,
        'priority': 'urgent',
        'rtb_status': 'operational',
        'bess_sales_angle': 'retrofit',
        'parent_group': 'Esperia Energy Group',
        'contact_name': 'Dino Constantinou',
        'district': 'Famagusta',
        'technology': 'PV',
        'data_source': 'hybrid_storage_pdf',
        'tags': ['loi_signed', 'bess_100mwh', 'q4_2026', 'esperia_group'],
        'activity_feed': [{'ts': NOW, 'author': 'Alexander', 'type': 'system', 'body': LOI_NOTE}],
    }
    result = post([new_row])
    if result:
        print(f"  Created: {result[0]['id']} — {result[0]['company_name']}")

# ─── 3. Ensure all Esperia rows have Dino Constantinou ───────────────────────
print("\n=== Step 3: Confirm Dino Constantinou on all Esperia rows ===\n")
esperia_rows = get(
    'select=id,company_name,contact_name&or=(company_name.ilike.*esperia*,company_name.ilike.*galascope*)'
)
for r in esperia_rows:
    if r.get('contact_name') in [None, '', 'Dino Constantinou']:
        if not r.get('contact_name'):
            s = patch(r['id'], {
                'contact_name': 'Dino Constantinou',
                'contact_title': 'Director',
                'parent_group': 'Esperia Energy Group',
            })
            print(f"  Set Dino on: {r['company_name']} — {'OK' if s == 204 else s}")
        else:
            print(f"  Already set: {r['company_name']} ({r['contact_name']})")

print("\nAll done.")
