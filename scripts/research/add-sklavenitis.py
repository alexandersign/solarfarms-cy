# -*- coding: utf-8 -*-
"""Add/update Sklavenitis Cyprus in CRM with both contacts and full intel."""
import json, sys, io, urllib.request
from datetime import datetime, timezone

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
W = {**R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

EXISTING_ID = 'c05bd980-6c42-4a15-8b2b-fe2819fb3a78'
NOW = datetime.now(timezone.utc).isoformat()

NOTE = (
    'SKLAVENITIS CYPRUS — 27 supermarket stores island-wide (south Cyprus).\n'
    'Distribution: 9 Nicosia · 8 Limassol · 7 Paphos · 2 Larnaca · 1 Paralimni\n'
    'Includes 9 former Papantoniou stores acquired Nov 2024 (being renovated under Sklavenitis brand).\n'
    'Avg store size ~3,500 m² — significant rooftop PV potential across entire portfolio.\n'
    'If avg 200 kWp/store: ~5.4 MWp total across 27 stores.\n\n'
    'Referral contact: Mario Polycarpou (internal Sklavenitis contact — referred by Alexander).\n'
    'Contacts provided: Katerina Kitiri (kkitiri@sklavenitis.com) + Maria Tsioullou (mtsioullou@sklavenitis.com)\n'
    'Next step: Email both contacts requesting EAC electricity statements for each store.\n'
    'EAC statements needed to size solar systems per location and calculate ROI.'
)

payload = {
    'company_name': 'Sklavenitis Cyprus Ltd',
    'plant_name': 'Sklavenitis Cyprus — 27 Stores',
    'segment': 'commercial',
    'offer_type': 'rooftop_pv',
    'industry': 'Supermarket / Retail',
    'outreach_status': 'researching',
    'priority': 'high',
    'contact_name': 'Katerina Kitiri',
    'contact_email': 'kkitiri@sklavenitis.com',
    'contact_title': 'Head of Facilities / Operations',
    'secondary_contact_name': 'Maria Tsioullou',
    'secondary_contact_email': 'mtsioullou@sklavenitis.com',
    'assigned_to': 'alexander.papacosta@lighthief.com',
    'assigned_name': 'Alexander',
    'company_website': 'https://sklavenitiscyprus.com.cy',
    'notes': '27 stores across Cyprus. Referred by Mario Polycarpou. EAC statements requested.',
    'tags': ['segment:commercial', 'industry:supermarket', 'multi_site:27_stores', 'referral:mario_polycarpou'],
    'activity_feed': [{'ts': NOW, 'author': 'Alexander', 'type': 'system', 'body': NOTE}],
}

body = json.dumps(payload).encode()
req = urllib.request.Request(f'{URL}?id=eq.{EXISTING_ID}', data=body, headers=W, method='PATCH')
s = urllib.request.urlopen(req, timeout=10).status
print(f'Updated Sklavenitis CRM entry: HTTP {s}')
print('Contacts: Katerina Kitiri + Maria Tsioullou | Assigned to Alexander | Status: researching')
