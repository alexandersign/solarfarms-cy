# -*- coding: utf-8 -*-
"""Patch Esperia/Galascope CRM rows with client-reported curtailment rates."""
import json, sys, io, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
HDRS = {
    'apikey': KEY,
    'Authorization': f'Bearer {KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
}
READ_HDRS = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}

IDS = [
    'e4a9bd65-0561-4e31-90a1-37e6efcce1d1',  # ESPERIA ENERGY (AGLANTZIA 1)
    '78f3eb83-bd7e-4577-b072-02c64024fa37',  # ESPERIA ENERGY (FAMAGUSTA)
    '55892e31-0e67-40cd-86c3-752078c80c01',  # ESPERIA ENERGY (TSERI 2)
    'b41c1e4f-d60d-4c44-85f8-b146d45f95a7',  # GALASCOPE LTD
    'd2909c93-a30a-4f5b-8227-36d04bf0b018',  # ESPERIA ENERGY (TSERI)
    '5e38309c-70a9-4b8f-8bd1-60ff3ef8e06f',  # ESPERIA ENERGY (XYLOTYMBOU 1)
    '6fdc7ebd-7809-4c9b-88bb-52ade8dcd1bd',  # ESPERIA ENERGY (TSERI 3)
    '7bfd3458-e6b1-4007-8661-d774c653105c',  # ESPERIA ENERGY (AYIA NAPA 1)
    '4668bc9f-7ced-46c9-bb0b-32ed7866af36',  # ESPERIA GREEN ENERGY
]

NOW = '2026-06-09T15:45:00+03:00'
NOTE = (
    'CLIENT-REPORTED CURTAILMENT DATA (Alexander briefing, Jun 2026):\n'
    '2025 annual average: 47% curtailment\n'
    '2026 YTD: already reaching ~70% on most days\n'
    'Strongest BESS retrofit urgency in portfolio — curtailment is their primary pain point.\n'
    'At 70% curtailment on a 6.5 MW park: ~4.5 MW of generation is wasted each curtailment day.'
)

def patch(pid, payload):
    body = json.dumps(payload).encode()
    req = urllib.request.Request(f'{URL}?id=eq.{pid}', data=body, headers=HDRS, method='PATCH')
    r = urllib.request.urlopen(req, timeout=8)
    return r.status

def get_row(pid):
    req = urllib.request.Request(f'{URL}?id=eq.{pid}&select=activity_feed,company_name', headers=READ_HDRS)
    return json.loads(urllib.request.urlopen(req, timeout=8).read())[0]

for pid in IDS:
    # Step 1: patch intelligence fields
    s1 = patch(pid, {
        'curtailment_rate': 47,        # 2025 annual average
        'bess_sales_angle': 'retrofit',
        'rtb_status': 'operational',
        'priority': 'urgent',
        'tags': ['curtailment_risk:critical', 'bess_retrofit', 'client_data:curtailment_2025'],
    })

    # Step 2: append activity note
    row = get_row(pid)
    feed = row.get('activity_feed') or []
    entry = {'ts': NOW, 'author': 'Alexander', 'type': 'system', 'body': NOTE}
    feed = [entry] + [e for e in feed if e.get('body','')[:30] != NOTE[:30]]
    s2 = patch(pid, {'activity_feed': feed})

    name = row.get('company_name', pid)
    print(f'  OK  {name}')

print('\nDone: all Esperia/Galascope rows updated with curtailment_rate=47%, rtb=operational, priority=urgent')
