# -*- coding: utf-8 -*-
"""Add missing individual client proposals to CRM, all assigned to Alexander."""
import json, sys, io, urllib.request
from datetime import datetime, timezone, timedelta

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
CR = {'apikey': KEY, 'Authorization': f'Bearer {KEY}', 'Content-Type': 'application/json', 'Prefer': 'return=representation'}

NOW = datetime.now(timezone.utc).isoformat()
TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
FU7  = (datetime.now(timezone.utc) + timedelta(days=7)).strftime('%Y-%m-%d')
FU14 = (datetime.now(timezone.utc) + timedelta(days=14)).strftime('%Y-%m-%d')

def post(payload):
    body = json.dumps(payload).encode()
    req = urllib.request.Request(URL, data=body, headers=CR, method='POST')
    result = json.loads(urllib.request.urlopen(req, timeout=10).read())
    return result[0] if isinstance(result, list) and result else result

# ─── 1. TOTALCON LTD (Qiu) — Konia 825 kWp EPC proposal ────────────────────
print('Adding TOTALCON LTD (Qiu) / Konia PV EPC...')
r1 = post({
    'plant_name':        'TOTALCON Konia — 825 kWp Solar Park EPC',
    'company_name':      'TOTALCON LTD',
    'segment':           'developer',
    'offer_type':        'epc',
    'technology':        'PV',
    'location':          'Konia, Temachio 150, Ierokipia, Paphos',
    'district':          'Paphos',
    'capacity_mwp':      0.825,
    'contact_name':      'Mr. Qiu',
    'contact_title':     'Group Director',
    'outreach_status':   'proposal_sent',
    'priority':          'high',
    'estimated_deal_value': 597500,   # Option A PV+BESS install subtotal ex VAT
    'cera_license_no':   None,
    'rtb_status':        'operational',
    'bess_sales_angle':  'pre_sale',
    'assigned_to':       'alexander.papacosta@lighthief.com',
    'assigned_name':     'Alexander Papacosta',
    'last_contact_date': TODAY,
    'first_contact_date': TODAY,
    'next_follow_up':    FU7,
    'data_source':       'manual',
    'tags':              ['proposal_sent', 'epc', 'konia', 'paphos', 'totalcon', '825kwp'],
    'notes':             'EPC proposal Jun 2026. Ref: epc-qiu-1mw-konia. Two options: A=fixed-tilt 825kWp €539,500 EPC or B=trackers 809kWp €584,500. BESS works (client-supplied equip) add €58k. No client contact email/phone on file — follow up via Mr. Qiu.',
    'activity_feed': [{
        'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system',
        'body': (
            'PROPOSAL SENT (Jun 2026) — TOTALCON LTD, Konia Solar Park EPC.\n\n'
            'OPTION A — Fixed-Tilt 825 kWp (RECOM 750W):\n'
            '  PV Equipment + EPC: €539,500 ex VAT (€0.65/Wp)\n'
            '  BESS EPC works only (client equip): €58,000\n'
            '  Total PV + BESS install: €597,500 ex VAT\n'
            '  O&M optional: €6,600/yr\n\n'
            'OPTION B — Single-Axis Trackers 809 kWp (AIKO 700W):\n'
            '  PV Equipment + EPC: €584,500 ex VAT (€0.72/Wp)\n'
            '  BESS EPC works only: €58,000\n'
            '  Total PV + BESS install: €642,500 ex VAT\n\n'
            'BESS: CERA authorises up to 4 MWh footprint. Client supplies BESS equipment.\n'
            'Next steps: TOTALCON confirms option → EAC connection terms review → site visit → firm contract\n'
            'Contact: Mr. Qiu, Group Director. No email/phone on proposal — follow up directly.\n'
            f'Follow-up: {FU7}'
        ),
    }],
})
print(f'  Created: {r1["id"]} | {r1["company_name"]} | €{r1["estimated_deal_value"]:,} | {r1["outreach_status"]}')

# ─── 2. Subarrow Investments / Maltezos — BESS 2.5MW/10MWh Agios Theodoros ──
print('Adding Subarrow Investments (Maltezos) / BESS proposal...')
r2 = post({
    'plant_name':        'Subarrow Investments — 2.64 MWp Agios Theodoros BESS',
    'company_name':      'SUBARROW INVESTMENTS LTD',
    'segment':           'developer',
    'offer_type':        'bess_retrofit',
    'technology':        'PV',
    'location':          'Agios Theodoros, Larnaca District',
    'district':          'Larnaca',
    'capacity_mwp':      2.64,
    'bess_potential_mwh': 10.03,
    'contact_name':      'Antonis Maltezos',
    'contact_title':     'Director',
    'outreach_status':   'proposal_sent',
    'priority':          'high',
    'estimated_deal_value': 1447800,   # BESS turnkey ex VAT
    'curtailment_rate':  55,
    'rtb_status':        'operational',
    'bess_sales_angle':  'retrofit',
    'assigned_to':       'alexander.papacosta@lighthief.com',
    'assigned_name':     'Alexander Papacosta',
    'last_contact_date': TODAY,
    'first_contact_date': TODAY,
    'next_follow_up':    FU14,
    'data_source':       'manual',
    'tags':              ['proposal_sent', 'bess_retrofit', 'agios_theodoros', 'larnaca', 'maltezos', '10mwh'],
    'notes':             'BESS turnkey proposal Feb 2026. Ref: LCY-IND-MALTEZOS-2026-02. Park energise target Dec 2026. 55% curtailment projected = €368k/yr lost → BESS recovers €360k/yr net.',
    'activity_feed': [{
        'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system',
        'body': (
            'PROPOSAL SENT (Feb 2026) — Subarrow Investments Ltd, BESS Turnkey.\n'
            'Ref: LCY-IND-MALTEZOS-2026-02\n\n'
            'PARK: 2.64 MWp, Agios Theodoros, Larnaca | Energise target: Dec 2026\n'
            'BESS PROPOSED: 2.5 MW / 10.03 MWh (2 × 5 MWh containers)\n'
            'PRICE: €1,447,800 ex VAT (€144,780/MWh)\n\n'
            'FINANCIALS:\n'
            '  Curtailment: 55% projected = 2,614 MWh/yr wasted = €368,300/yr lost\n'
            '  BESS captures: 2,483 MWh → 2,143 MWh discharged @ €183/MWh\n'
            '  Gross revenue: €392,200/yr | Less O&M €32,200 = €360,000/yr net\n'
            '  Payback: ~4 years | 15-year profit: €2,863,000\n\n'
            f'Follow-up: {FU14}'
        ),
    }],
})
print(f'  Created: {r2["id"]} | {r2["company_name"]} | €{r2["estimated_deal_value"]:,} | {r2["outreach_status"]}')

print('\nDone. Both prospects assigned to Alexander Papacosta.')
