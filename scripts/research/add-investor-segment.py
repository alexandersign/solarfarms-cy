# -*- coding: utf-8 -*-
"""
1. Find existing acquisition/investor leads
2. Reclassify them as segment='investor'
3. Create Christos Papalouka investor record
"""
import json, sys, io, urllib.request
from datetime import datetime, timezone, timedelta

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
W = {**R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}
CR = {**R, 'Content-Type': 'application/json', 'Prefer': 'return=representation'}

NOW = datetime.now(timezone.utc).isoformat()
TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
FOLLOW_UP = (datetime.now(timezone.utc) + timedelta(days=3)).strftime('%Y-%m-%d')

# ─── 1. Find existing acquisition leads ──────────────────────────────────────
params = 'select=id,company_name,contact_name,outreach_status,offer_type,estimated_deal_value,segment&offer_type=eq.acquisition'
acq = json.loads(urllib.request.urlopen(urllib.request.Request(f'{URL}?{params}', headers=R), timeout=10).read())
print(f'Existing acquisition leads: {len(acq)}')
for a in acq:
    print(f'  [{a["segment"]:10}] {a["company_name"][:40]:40} {a["contact_name"] or "":20} {a["outreach_status"]:15} val={a.get("estimated_deal_value") or "—"}')

# ─── 2. Reclassify all acquisition leads to segment='investor' ────────────────
print(f'\nReclassifying {len(acq)} records to segment=investor...')
for a in acq:
    if a.get('segment') != 'investor':
        body = json.dumps({'segment': 'investor'}).encode()
        req = urllib.request.Request(f'{URL}?id=eq.{a["id"]}', data=body, headers=W, method='PATCH')
        s = urllib.request.urlopen(req, timeout=10).status
        print(f'  {s} {a["company_name"]}')
    else:
        print(f'  SKIP (already investor): {a["company_name"]}')

# ─── 3. Create Christos Papalouka investor record ──────────────────────────────
print('\nCreating Christos Papalouka investor record...')

NOTE = (
    'INVESTOR LEAD — Christos Papalouka (Jun 2026)\n\n'
    'INVESTOR PROFILE:\n'
    '- Represents an investor group (mandate to acquire operational PV parks in Cyprus)\n'
    '- Budget: up to €20M\n'
    '- Criteria: RTB-ready or fully operational parks (ideally with connection terms + planning)\n'
    '- Preference: clean, connected, income-generating assets\n\n'
    'ASSETS BEING SENT:\n'
    '1. Nicosia 3.3 MW — operational since July 2025 (fully connected).\n'
    '   Additional 1.7 MW on same grounds with building permit only (no connection terms).\n'
    '   Suggested angle: datacenter power anchor for the 1.7 MW unlicensed portion.\n'
    '2. Galascope 5 MW (Famagusta) — operational, with BESS augmentation financials.\n'
    '3. Novikov 3.3 MW east-west — RTB status park (from another Christos).\n\n'
    'NEXT STEPS:\n'
    '- Christos to send investor mandate / NDA\n'
    '- We to send: Nicosia 3.3 MW info pack + Galascope BESS financials + Novikov RTB teaser\n'
    '- Follow up: ' + FOLLOW_UP
)

payload = {
    'plant_name': 'Investor — Cyprus PV Portfolio',
    'company_name': 'Graduate Institute Investor Group',
    'segment': 'investor',
    'offer_type': 'acquisition',
    'contact_name': 'Christos Papalouka',
    'contact_email': 'christos.papalouka@graduateinstitute.ch',
    'contact_phone': '+357 99 243131',
    'contact_title': 'Investor Representative',
    'outreach_status': 'responded',
    'priority': 'urgent',
    'estimated_deal_value': 20000000,   # up to €20M budget
    'assigned_to': 'alexander.papacosta@lighthief.com',
    'assigned_name': 'Alexander Papacosta',
    'next_follow_up': FOLLOW_UP,
    'last_contact_date': TODAY,
    'first_contact_date': TODAY,
    'data_source': 'manual',
    'notes': 'Represents investor group. Budget €20M. Wants RTB/operational parks. Interested in: Nicosia 3.3MW, Galascope 5MW, Novikov 3.3MW.',
    'tags': ['investor', 'acquisition', 'rtb_buyer', 'budget_20m', 'nicosia_3_3mw', 'galascope', 'novikov'],
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': NOTE}],
}

body = json.dumps(payload).encode()
req = urllib.request.Request(URL, data=body, headers=CR, method='POST')
result = json.loads(urllib.request.urlopen(req, timeout=10).read())
if isinstance(result, list) and result:
    r = result[0]
    print(f'Created: {r["id"]}')
    print(f'Contact: {r["contact_name"]} | {r["contact_email"]} | {r["contact_phone"]}')
    print(f'Budget: €{r["estimated_deal_value"]:,} | Follow-up: {r["next_follow_up"]}')
else:
    print(f'Result: {result}')

print('\nDone.')
