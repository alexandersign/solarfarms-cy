# -*- coding: utf-8 -*-
"""Find client folders with proposals not yet in the CRM."""
import json, sys, io, urllib.request, re
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}

# Fetch all CRM company names
params = 'select=id,company_name,plant_name,contact_name,outreach_status,segment,offer_type,assigned_to&limit=2000'
rows = json.loads(urllib.request.urlopen(urllib.request.Request(f'{URL}?{params}', headers=R), timeout=10).read())
crm_names = set(r['company_name'].strip().upper() for r in rows if r.get('company_name'))
crm_plant = set(r['plant_name'].strip().upper() for r in rows if r.get('plant_name'))
print(f'CRM rows: {len(rows)} | Unique company names: {len(crm_names)}\n')

# Map folder names to expected company names + proposal info
CLIENT_FOLDERS = {
    'Individual_Evgeny_Limassol_Tennis':    {'company': 'Limassol Tennis Center', 'contact': 'Evgeny', 'doc': 'carport-pv-proposal-jun2026.html', 'deal': 218695, 'type': 'commercial'},
    'Individual_Qiu_Konia':                  {'company': 'Qiu Konia', 'contact': 'Qiu', 'doc': 'epc-qiu-1mw-konia-proposal-jun2026.html', 'deal': None, 'type': 'developer'},
    'Individual_Africa_20MW_Uganda':         {'company': 'Uganda Solar 20MW', 'contact': None, 'doc': 'rfi-uganda-africa-20mw-jun2026.html', 'deal': None, 'type': 'developer'},
    'Individual_Spanercom':                  {'company': 'Spanercom', 'contact': None, 'doc': 'client-presentation-mar2026.html', 'deal': None, 'type': 'developer'},
    'Individual_Maltezos_Agios_Theodoros':   {'company': 'Maltezos', 'contact': 'Maltezos', 'doc': 'client-presentation-mar2026.html', 'deal': None, 'type': 'developer'},
    'Individual_Christos_Nicosia':           {'company': 'Christos Nicosia', 'contact': 'Christos', 'doc': 'client-presentation-mar2026.html', 'deal': None, 'type': 'developer'},
    'Individual_Aeolian_Dynamics_Larnaca':   {'company': 'TP Aeolian Dynamics', 'contact': None, 'doc': 'client-presentation-mar2026.html', 'deal': None, 'type': 'developer'},
    'Individual_Aristoklia_Solar':           {'company': 'Aristoklia Solar', 'contact': None, 'doc': 'commercial-offer-mar2026.html', 'deal': None, 'type': 'commercial'},
    'Individual_60-120-standalone':          {'company': 'Standalone 60-120 kWh', 'contact': None, 'doc': None, 'deal': None, 'type': 'developer'},
}

GROUP_FOLDERS = ['Group1_ABIO_Power', 'Group2_Esperia_Energy', 'Group3_Lampros_Andreadis',
                 'Group4_A_Kerasi', 'Group5_Ioannis_Karis', 'Group6_Timotheos_Timotheou']

print('=== Individual client folder check ===\n')
missing = []
found = []
for folder, info in CLIENT_FOLDERS.items():
    company = info['company'].upper()
    # Fuzzy check: any CRM name contains key words from company
    keywords = [w for w in company.split() if len(w) > 3]
    in_crm = any(
        any(kw in name for kw in keywords)
        for name in crm_names | crm_plant
    )
    status = 'IN CRM' if in_crm else 'MISSING'
    print(f'  [{status:7}] {folder}')
    print(f'           Company: {info["company"]} | Doc: {info["doc"] or "—"} | Type: {info["type"]}')
    if info['deal']: print(f'           Deal: €{info["deal"]:,}')
    print()
    if not in_crm:
        missing.append((folder, info))
    else:
        found.append((folder, info))

print(f'Summary: {len(found)} in CRM, {len(missing)} missing\n')
print('=== Missing from CRM ===')
for f, i in missing:
    print(f'  {f}: {i["company"]}')

# Check specific matches for Qiu and Uganda
print('\n=== Specific CRM searches ===')
for kw in ['qiu', 'uganda', 'malta', 'maltez', 'christos', 'aeolian', 'aristoklia', 'spanercom', 'tennis', 'limassol tennis']:
    matches = [r for r in rows if kw.lower() in (r.get('company_name') or '').lower() or kw.lower() in (r.get('plant_name') or '').lower()]
    if matches:
        print(f'  "{kw}": {len(matches)} matches — {[m["company_name"] for m in matches[:3]]}')
    else:
        print(f'  "{kw}": NOT FOUND')
