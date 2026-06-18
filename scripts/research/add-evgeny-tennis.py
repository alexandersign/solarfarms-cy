# -*- coding: utf-8 -*-
"""Add Limassol Tennis Center (Evgeny) to CRM — Solar Carport proposal sent Jun 2026."""
import json, sys, io, urllib.request
from datetime import datetime, timezone, timedelta

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
W = {**R, 'Content-Type': 'application/json', 'Prefer': 'return=representation'}

NOW = datetime.now(timezone.utc).isoformat()
TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
FOLLOW_UP = (datetime.now(timezone.utc) + timedelta(days=7)).strftime('%Y-%m-%d')

NOTE = (
    'PROPOSAL SENT (Jun 2026) — Solar Carport PV, Limassol Tennis Center, Parekklisia.\n\n'
    'PROPOSAL DETAILS:\n'
    '- Option A: 84.96 kWp (144 × 590W bifacial) — €174,945 ex VAT / €208,185 inc VAT\n'
    '  Annual solar value: ~€36,000/yr | Payback: ~4.9 years\n'
    '- Option B (RECOMMENDED): 84.96 kWp PV + 264 kWh BESS — €218,695 ex VAT / €260,247 inc VAT\n'
    '  Annual solar value: ~€39,400/yr | Payback: ~5.6 years\n'
    '  Battery stores ~4h peak summer production, maximises €0.28/kWh value\n\n'
    'SYSTEM: 144 × 590W bifacial panels | 2 × Deye 50kW inverters (100kW AC) | 18 carport foundations\n'
    'Specific yield: ~1,617 kWh/kWp·year | Annual output: ~137 MWh\n'
    'O&M option: €1,400/year\n\n'
    'NOTE: No EAC billing history yet — model assumes club ops until 22:00 with high evening floodlit load.\n'
    'Next step: client to provide EAC energy statement to refine the financial model.\n'
    'Follow-up scheduled: ' + FOLLOW_UP
)

payload = {
    'plant_name': 'Limassol Tennis Center — Solar Carport',
    'company_name': 'Limassol Tennis Center',
    'segment': 'commercial',
    'offer_type': 'rooftop_pv',
    'industry': 'Gym / Sports',
    'technology': 'PV',
    'location': 'Parekklisia, Limassol',
    'district': 'Limassol',
    'capacity_mwp': 0.08496,           # 84.96 kWp
    'annual_kwh': 137000,              # ~137 MWh
    'annual_savings_eur': 39400,       # Option B (recommended)
    'payback_years': 5.6,              # Option B payback
    'estimated_deal_value': 218695,    # Option B ex VAT (recommended)
    'contact_name': 'Evgeny',
    'contact_title': 'Owner / Manager',
    'contact_phone': '+357 99 620 618',
    'outreach_status': 'proposal_sent',
    'priority': 'high',
    'assigned_to': 'alexander.papacosta@lighthief.com',
    'assigned_name': 'Alexander Papacosta',
    'next_follow_up': FOLLOW_UP,
    'last_contact_date': TODAY,
    'first_contact_date': TODAY,
    'data_source': 'manual',
    'tags': ['proposal_sent', 'solar_carport', 'parekklisia', 'tennis_club', 'option_b_recommended'],
    'notes': 'Solar carport PV proposal sent Jun 2026. Option B (PV + 264 kWh BESS) recommended.',
    'activity_feed': [{
        'ts': NOW,
        'author': 'Alexander Papacosta',
        'type': 'system',
        'body': NOTE,
    }],
}

body = json.dumps(payload).encode()
req = urllib.request.Request(URL, data=body, headers=W, method='POST')
result = json.loads(urllib.request.urlopen(req, timeout=10).read())
if isinstance(result, list) and result:
    print(f"Created: {result[0]['id']}")
    print(f"Company: {result[0]['company_name']}")
    print(f"Status: {result[0]['outreach_status']}")
    print(f"Deal value: €{result[0]['estimated_deal_value']:,}")
    print(f"Follow-up: {result[0]['next_follow_up']}")
    print(f"Assigned to: {result[0]['assigned_name']}")
else:
    print(f"Response: {result}")
