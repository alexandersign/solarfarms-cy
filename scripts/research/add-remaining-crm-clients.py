# -*- coding: utf-8 -*-
"""
Add remaining missing proposal clients to CRM + update existing records.

Run: python3 scripts/research/add-remaining-crm-clients.py
     python3 scripts/research/add-remaining-crm-clients.py --dry-run

Clients being added (confirmed NOT in CRM after live audit 18 Jun 2026):
  1.  Christos Nicosia            — 3.3 MWp PV + 10 MWh BESS (developer, proposal_sent Feb 2026)
  2.  AE Alternative Energy GmbH  — SA 12 MW/50 MWh + Zambia 150 MW/1,204 MWh (international BESS)
  3.  Western Greece BTM          — 15 MW / 30 MWh BESS BTM (international, partner enquiry)
  4.  Shapiro / MLP Poland        — 14 BESS offers, 7 logistics sites, C&I BESS Poland
  5.  GreenVolt Power Group (PL)  — 200 MW / 800 MWh BESS O&M, Elk Poland (≠ Cyprus Greenvolt CERA)
  6.  Habanay / Trozena           — Off-grid PV+BESS resort (commercial, proposal_sent Mar 2026)
  7.  Pavlos Pavlou               — C&I PV+BESS scenarios (commercial, proposal_sent Apr 2026)
  8.  Pavlou Koulla               — C&I PV+BESS scenarios (commercial, proposal_sent Apr 2026)
  9.  Uganda 20MW Solar           — Early-stage RFI enquiry (developer, Jun 2026)

Records being updated:
  U1. ABIO GREENERGY LTD     — re-engaged Jun 2026; status → responded; add Waneron task
  U2. S.S.H. Scandinavian    — assign to Alexander, status → proposal_sent (proposal sent Mar 2026)

All assigned to Alexander Papacosta.
"""
import json, sys, io, urllib.request, urllib.error
from datetime import datetime, timezone, timedelta

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DRY = '--dry-run' in sys.argv

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
RH = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
WH = {**RH, 'Content-Type': 'application/json', 'Prefer': 'return=representation'}
PH = {**RH, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

NOW   = datetime.now(timezone.utc).isoformat()
TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
FU7   = (datetime.now(timezone.utc) + timedelta(days=7)).strftime('%Y-%m-%d')
FU14  = (datetime.now(timezone.utc) + timedelta(days=14)).strftime('%Y-%m-%d')


# ─── Helpers ─────────────────────────────────────────────────────────────────

def get(params: str):
    req = urllib.request.Request(f'{URL}?{params}', headers=RH)
    return json.loads(urllib.request.urlopen(req, timeout=15).read())

def post(payload: dict) -> dict:
    if DRY:
        print(f'  [DRY-RUN] Would insert: {payload["company_name"]}')
        return payload
    body = json.dumps(payload).encode()
    req = urllib.request.Request(URL, data=body, headers=WH, method='POST')
    result = json.loads(urllib.request.urlopen(req, timeout=15).read())
    return result[0] if isinstance(result, list) and result else result

def patch(record_id: str, payload: dict):
    if DRY:
        print(f'  [DRY-RUN] Would patch id={record_id}: {list(payload.keys())}')
        return
    body = json.dumps(payload).encode()
    req = urllib.request.Request(f'{URL}?id=eq.{record_id}', data=body, headers=PH, method='PATCH')
    urllib.request.urlopen(req, timeout=15)

def find(keyword: str) -> dict | None:
    """Find first CRM row where company_name or plant_name contains keyword (case-insensitive)."""
    rows = get(f'select=id,company_name,plant_name,outreach_status,activity_feed,tasks&limit=2000')
    kw = keyword.upper()
    for r in rows:
        if kw in (r.get('company_name') or '').upper() or kw in (r.get('plant_name') or '').upper():
            return r
    return None

def ok(r: dict):
    print(f'  ✓ {r["company_name"]} | {r.get("outreach_status")} | deal=€{r.get("estimated_deal_value") or "—"}')


# ═══════════════════════════════════════════════════════════════════════════════
# 1. CHRISTOS NICOSIA — 3.3 MWp PV + 10 MWh BESS (developer, Cyprus)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[1/9] Christos Nicosia — 3.3 MWp / 10 MWh BESS')
r = post({
    'plant_name':          'Christos Nicosia — 3.3 MWp PV + 10 MWh BESS',
    'company_name':        'CHRISTOS NICOSIA (PV PARK)',
    'segment':             'developer',
    'offer_type':          'bess_retrofit',
    'technology':          'PV',
    'location':            'Nicosia District',
    'district':            'Nicosia',
    'capacity_mwp':        3.3,
    'bess_potential_mwh':  10.0,
    'contact_name':        'Christos',
    'contact_title':       'Park Owner',
    'outreach_status':     'proposal_sent',
    'priority':            'high',
    'estimated_deal_value': 1447800,
    'rtb_status':          'operational',
    'bess_sales_angle':    'retrofit',
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-02-01',
    'next_follow_up':      FU7,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'bess_retrofit', 'nicosia', '10mwh', '3_3mwp'],
    'notes':               'BESS + PV proposal Feb 2026 (ref: LCY-IND-CHRISTOS-2026-02). Park: 3.3 MWp, Nicosia. BESS: 2.5 MW / 10.03 MWh. Price: €1,447,800 ex VAT (€144,780/MWh). Also Solhash JV proposal sent Mar 2026 (PV + crypto mining angle).',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSAL SENT (Feb 2026) — Christos Nicosia BESS Turnkey\n'
        'Ref: LCY-IND-CHRISTOS-2026-02 | Client presentation also sent Mar 2026\n\n'
        'PARK: 3.3 MWp operational, Nicosia District\n'
        'BESS: 2.5 MW / 10.03 MWh (2 × 5 MWh containers, Linyang)\n'
        'PRICE: €1,447,800 ex VAT (€144,780/MWh)\n'
        'O&M: €32,200/yr (15-year LTSA available)\n\n'
        'SOLHASH JV: Separate JV proposal sent Mar 2026 — PV mining area + crypto hash revenue angle.\n'
        f'Follow-up: {FU7}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 2. AE ALTERNATIVE ENERGY GMBH — South Africa + Zambia BESS (international)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[2/9] AE Alternative Energy GmbH — SA 12 MW/50 MWh + Zambia 150 MW/1,204 MWh')
r = post({
    'plant_name':          'AE Alternative Energy — DMSH Geelvloer SA + Zambia BESS Portfolio',
    'company_name':        'AE ALTERNATIVE ENERGY GMBH',
    'segment':             'developer',
    'offer_type':          'epc',
    'technology':          'BESS',
    'location':            'International — South Africa & Zambia',
    'district':            None,
    'capacity_mwp':        162.0,        # 12 MW SA + 150 MW Zambia
    'bess_potential_mwh':  1254.0,       # 50 MWh SA + 1,204 MWh Zambia
    'contact_name':        'AE Alternative Energy GmbH',
    'contact_title':       'Client',
    'outreach_status':     'proposal_sent',
    'priority':            'high',
    'estimated_deal_value': 96200000,    # Zambia ~€176M + SA €7.9M; rough combined
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-03-01',
    'next_follow_up':      FU7,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'international', 'south_africa', 'zambia', 'bess_epc', 'large_scale', '1204mwh'],
    'notes':               'Two separate offers to same client (AE Alternative Energy GmbH):\n1) DMSH Geelvloer, Kenhardt, Northern Cape, SA — 12 MW / 50 MWh BESS. Offer sent Mar 2026.\n2) Zambia — 150 MW / 1,204 MWh (Linyang) + 215 MW / 1,204 MWh (Gotion alternative). Offers sent Apr 2026. FAT milestone: 70% payment trigger. Import duties and taxes by client.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSALS SENT — AE Alternative Energy GmbH (International)\n\n'
        'OFFER 1 (Mar 2026) — DMSH Geelvloer, South Africa\n'
        '  Project: Kenhardt, Northern Cape, 12 MW / 50 MWh BESS\n'
        '  T8 configuration: 8 × 1.25 MW + T2: 2 × 1.0 MW = 12 MW total\n'
        '  Payment: 70% on FAT (client invited to witness at factory)\n'
        '  Duties/taxes: South African import duties by client\n\n'
        'OFFER 2 (Apr 2026) — Zambia BESS\n'
        '  Option A (Linyang): 150 MW / 1,204 MWh — ~€176M\n'
        '  Option B (Gotion): 215 MW / 1,204 MWh — alternative config\n'
        '  Payment: 70% on FAT (client invited to Linyang factory, China)\n\n'
        f'Follow-up: {FU7}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 3. WESTERN GREECE BTM — 15 MW / 30 MWh BESS (international, partner enquiry)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[3/9] Western Greece BTM — 15 MW / 30 MWh BESS')
r = post({
    'plant_name':          'Western Greece BTM BESS — 15 MW / 30 MWh',
    'company_name':        'WESTERN GREECE PV OPERATOR (CONFIDENTIAL)',
    'segment':             'developer',
    'offer_type':          'epc',
    'technology':          'BESS',
    'location':            'Western Greece (BTM)',
    'district':            None,
    'capacity_mwp':        15.0,
    'bess_potential_mwh':  30.0,
    'contact_name':        'Via partner enquiry',
    'contact_title':       'Partner channel',
    'outreach_status':     'proposal_sent',
    'priority':            'high',
    'estimated_deal_value': 3750000,    # ~€125k/MWh × 30 MWh estimate
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-05-15',
    'next_follow_up':      FU7,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'international', 'greece', 'btm', 'bess_epc', '30mwh', 'behind_the_meter', 'partner_channel'],
    'notes':               'Final offer sent 15 May 2026. Client: Confidential — Western Greece PV operator introduced via partner enquiry. BTM (behind-the-meter) BESS configuration. Client identity to be confirmed. Engage via introducing partner.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSAL SENT (15 May 2026) — Western Greece BTM BESS\n'
        'Ref: bess-western-greece-final-offer-15mw-30mwh-15may2026\n\n'
        'Config: 15 MW / 30 MWh BTM BESS (behind-the-meter, Western Greece PV park)\n'
        'Source: Partner channel introduction — end client identity confidential\n'
        'PDF final offer also prepared and sent\n\n'
        f'Follow-up: {FU7} — contact via introducing partner to confirm receipt and arrange call'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 4. SHAPIRO / MLP POLAND — C&I BESS portfolio, 7 logistics sites
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[4/9] Shapiro / MLP Poland — 14 BESS offers, 7 logistics sites')
r = post({
    'plant_name':          'Shapiro / MLP Poland — 7-Site C&I BESS Portfolio',
    'company_name':        'SHAPIRO MLP POLAND',
    'segment':             'developer',
    'offer_type':          'epc',
    'technology':          'BESS',
    'location':            'Poland — Gliwice, Lublin, Poznań, Pruszków, Wrocław',
    'district':            None,
    'capacity_mwp':        8.4,          # total MW across all sites
    'bess_potential_mwh':  41.3,         # approximate total MWh (14 offers combined)
    'contact_name':        'Shapiro',
    'contact_title':       'Project Developer',
    'outreach_status':     'proposal_sent',
    'priority':            'medium',
    'estimated_deal_value': 4893900,    # sum of 14 Linyang ST quotes (see portfolio summary)
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-01-01',
    'next_follow_up':      FU14,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'international', 'poland', 'ci_bess', 'mlp', 'logistics', '7_sites', '14_offers'],
    'notes':               '14 Linyang BESS ST quotes across 7 MLP logistics sites in Poland. Sites: MLP Gliwice (×2), MLP Lublin (×2), MLP Poznań (×3), MLP Pruszków (×2), MLP Wrocław (×2). Sizes: 0.5–3 MW / 1.5–12.5 MWh per site. Cabinet and container options. C&I behind-the-meter BESS.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSALS SENT — Shapiro / MLP Poland C&I BESS Portfolio\n\n'
        '14 individual Linyang ST quotations across 7 MLP logistics sites:\n'
        '  MLP Gliwice: 0.75 MW/2.0 MWh (cab €296k) + 0.75 MW/3.34 MWh (con €374k)\n'
        '  MLP Lublin: 1.0 MW/3.34 MWh (con €374k) + 1.0 MW/4.18 MWh (con €460k)\n'
        '  MLP Poznań: 0.75 MW/2.0 MWh (cab €296k) + 1.0 MW/3.34 MWh (con €374k)\n'
        '  MLP Poznań West ACDF: 1.25 MW/5.0 MWh (con €552k) + 1.0 MW/3.34 MWh (con €374k)\n'
        '  MLP Poznań West EF: 0.65 MW/2.0 MWh (cab €296k) + 0.65 MW/3.34 MWh (con €374k)\n'
        '  MLP Pruszków: 3.0 MW/10 MWh (con €1,122k) + 3.0 MW/12.5 MWh (n/a)\n'
        '  MLP Wrocław: 0.5 MW/1.5 MWh (cab €222k) + 0.5 MW/2.0 MWh (cab €296k)\n\n'
        'All Linyang ST format. C&I behind-the-meter installation.\n'
        f'Follow-up: {FU14}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 5. GREENVOLT POWER GROUP — Elk Poland BESS O&M (distinct from Cyprus CERA entity)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[5/9] GreenVolt Power Group (Poland) — Elk BESS O&M')
r = post({
    'plant_name':          'Greenvolt Elk — MEE Ełk 220/110/33 kV BESS O&M',
    'company_name':        'GREENVOLT POWER GROUP SP. Z O.O. (POLAND)',
    'segment':             'developer',
    'offer_type':          'o_and_m',
    'technology':          'BESS',
    'location':            'Ełk, Warmia-Masuria, Poland',
    'district':            None,
    'capacity_mwp':        200.0,
    'bess_potential_mwh':  800.0,
    'contact_name':        'Greenvolt Power Group sp. z o.o.',
    'contact_title':       'O&M Procurement',
    'outreach_status':     'proposal_sent',
    'priority':            'high',
    'estimated_deal_value': 2400000,   # ~€3k/MWh/yr × 800 MWh × 1yr estimate
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-03-01',
    'next_follow_up':      FU7,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'international', 'poland', 'bess_om', 'elk', 'hv_station', '800mwh', 'greenvolt_pl'],
    'notes':               'O&M proposal sent Mar 2026. Ref: LTH-GV-ELK-OM-MAR2026. Client: Greenvolt Power Group sp. z o.o. / Magazyn EE Ełk sp. z o.o. Scope: HV Station MEE Ełk 220/110/33 kV O&M. 200 MW / 800 MWh BESS system. Validity: 90 days from Mar 2026. NOTE: This is the Polish entity — distinct from GREENVOLTS ELECTRICITY CO. LTD (Cyprus CERA company, different group).',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSAL SENT (Mar 2026) — Greenvolt Elk, Poland BESS O&M\n'
        'Ref: LTH-GV-ELK-OM-MAR2026 | Validity: 90 days\n\n'
        'Client: Greenvolt Power Group sp. z o.o. / Magazyn EE Ełk sp. z o.o.\n'
        'Scope: HV Station MEE Ełk 220/110/33 kV — O&M services\n'
        'System: 200 MW / 800 MWh BESS\n\n'
        'NOTE: The Polish Greenvolt is a separate entity from the Cyprus CERA company\n'
        '"GREENVOLTS ELECTRICITY CO. LTD" which is in the CRM via CERA sync.\n\n'
        f'Follow-up: {FU7} — 90-day validity expired ~Jun 2026, confirm status'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 6. HABANAY / TROZENA WELLNESS RESORT — Off-grid C&I PV+BESS (commercial)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[6/9] Habanay / Trozena Wellness Resort — off-grid PV+BESS (commercial)')
r = post({
    'plant_name':          'Trozena Wellness Resort — Off-Grid Energy System',
    'company_name':        'HABANAY (TROZENA WELLNESS RESORT)',
    'segment':             'commercial',
    'offer_type':          'rooftop_pv',
    'industry':            'Hotel / Hospitality',
    'technology':          'PV',
    'location':            'Trozena Village, Troodos, ~800m elevation',
    'district':            'Limassol',
    'capacity_mwp':        0.050,        # off-grid system, ~50 kWp estimated
    'contact_name':        'Uri',
    'contact_title':       'Owner / Representative',
    'outreach_status':     'proposal_sent',
    'priority':            'medium',
    'estimated_deal_value': 85000,       # off-grid turnkey estimate
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-03-01',
    'next_follow_up':      FU14,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'off_grid', 'trozena', 'troodos', 'hospitality', 'resort', 'pv_bess', 'habanay'],
    'notes':               'Turnkey off-grid energy proposal sent Mar 2026. Resort: 28 studios + common amenities, ~800m elevation, Troodos. Grid-code compliant (EN 50549-1, VDE 4105) — native grid port enables future grid-connected transition when EAC reaches Trozena. Second offer Apr 2026: Deye retail materials option.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSAL SENT (Mar 2026) — Trozena Wellness Resort Off-Grid PV+BESS\n'
        'Contact: Habanay — Uri (first name)\n\n'
        'Resort: 28 studios + common amenities, Trozena village, ~800m elevation\n'
        'System: Off-grid PV + battery — full energy independence\n'
        'Design: grid-code compliant (EN 50549-1), Jinko Suntank inverters with native grid port\n'
        'Future path: seamless switch to grid-connected when EAC reaches Trozena\n\n'
        'Apr 2026: Follow-up offer — Deye retail materials option also sent.\n'
        f'Follow-up: {FU14}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 7. PAVLOS PAVLOU — C&I PV+BESS scenarios (commercial)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[7/9] Pavlos Pavlou — C&I PV+BESS scenarios (commercial)')
r = post({
    'plant_name':          'Pavlos Pavlou — PV+BESS Scenario Analysis',
    'company_name':        'PAVLOS PAVLOU',
    'segment':             'commercial',
    'offer_type':          'rooftop_pv',
    'technology':          'PV',
    'location':            'Larnaca plot',
    'district':            'Larnaca',
    'capacity_mwp':        0.150,        # up to 150 kWp scenario
    'bess_potential_mwh':  0.60,         # up to 0.60 MWh BESS
    'contact_name':        'Pavlos Pavlou',
    'contact_title':       'Owner',
    'outreach_status':     'proposal_sent',
    'priority':            'medium',
    'estimated_deal_value': 219200,      # max scenario CAPEX
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-04-01',
    'next_follow_up':      FU14,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'ci_pv_bess', 'larnaca', 'scenarios', 'pavlos_pavlou'],
    'notes':               'PV+BESS scenario analysis sent Apr 2026. Scenarios: 95 kWp (€151,660) to 150 kWp (€219,200) with 0.38–0.60 MWh BESS. Larnaca plot.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSAL SENT (Apr 2026) — Pavlos Pavlou PV+BESS Scenarios\n\n'
        'Location: Larnaca plot\n'
        'Scenario A: 95 kWp PV + 0.38 MWh BESS — CAPEX €151,660\n'
        'Scenario B: 150 kWp PV + 0.60 MWh BESS — CAPEX €219,200\n'
        f'Follow-up: {FU14}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 8. PAVLOU KOULLA — C&I PV+BESS scenarios (commercial)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[8/9] Pavlou Koulla — C&I PV+BESS scenarios (commercial)')
r = post({
    'plant_name':          'Pavlou Koulla — PV+BESS Scenario Analysis',
    'company_name':        'PAVLOU KOULLA',
    'segment':             'commercial',
    'offer_type':          'rooftop_pv',
    'technology':          'PV',
    'location':            'Cyprus',
    'district':            None,
    'capacity_mwp':        0.150,
    'bess_potential_mwh':  0.60,
    'contact_name':        'Pavlou Koulla',
    'contact_title':       'Owner',
    'outreach_status':     'proposal_sent',
    'priority':            'medium',
    'estimated_deal_value': 219200,
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-04-01',
    'next_follow_up':      FU14,
    'data_source':         'manual',
    'tags':                ['proposal_sent', 'ci_pv_bess', 'scenarios', 'pavlou_koulla'],
    'notes':               'PV+BESS scenario analysis sent Apr 2026. Same model as Pavlos Pavlou scenarios. Scenarios: 95 kWp (€151,660) to 150 kWp (€219,200) with 0.38–0.60 MWh BESS.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSAL SENT (Apr 2026) — Pavlou Koulla PV+BESS Scenarios\n\n'
        'Scenario A: 95 kWp PV + 0.38 MWh BESS — CAPEX €151,660\n'
        'Scenario B: 150 kWp PV + 0.60 MWh BESS — CAPEX €219,200\n'
        f'Follow-up: {FU14}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# 9. UGANDA 20MW SOLAR — Early-stage RFI enquiry (developer, Jun 2026)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[9/9] Uganda 20MW Solar — Early-stage RFI enquiry')
r = post({
    'plant_name':          'Uganda 2×20 MW Solar PV — AGOGA & MISOZI Sites',
    'company_name':        'UGANDA SOLAR 20MW (DEVELOPER UNIDENTIFIED)',
    'segment':             'developer',
    'offer_type':          'epc',
    'technology':          'PV',
    'location':            'AGOGA & MISOZI sites, West Nile region, Uganda',
    'district':            None,
    'capacity_mwp':        40.0,
    'contact_name':        'Unknown — developer not identified',
    'contact_title':       None,
    'outreach_status':     'researching',
    'priority':            'low',
    'estimated_deal_value': None,
    'assigned_to':         'alexander.papacosta@lighthief.com',
    'assigned_name':       'Alexander Papacosta',
    'last_contact_date':   TODAY,
    'first_contact_date':  '2026-06-10',
    'next_follow_up':      FU14,
    'data_source':         'manual',
    'tags':                ['researching', 'international', 'africa', 'uganda', 'pv_epc', 'developer_unknown', 'low_priority'],
    'notes':               'RFI received Jun 2026. Spec doc: solar-plant-20mw-technical-spec-uganda.pdf (18pp, no letterhead, no developer name). Sites: AGOGA (24.28 ha, ~2.85°N 33.11°E) and MISOZI (polygon incomplete). Seriousness: LOW — no developer, no land title, no PPA, recycled Indian tender terminology. Do NOT issue binding EPC price until developer identity, land tenure, grid path, and funding confirmed. Task: identify the developer/SPV.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'RFI RECEIVED (Jun 2026) — Uganda 2×20 MW Solar PV\n'
        'Sites: AGOGA (~24 ha) + MISOZI, West Nile region, Uganda\n'
        'Spec doc: solar-plant-20mw-technical-spec-uganda.pdf\n\n'
        'SERIOUSNESS ASSESSMENT: LOW\n'
        '- No developer name, no contact details, no letterhead\n'
        '- No PPA, no land title, no grid agreement, no funding source\n'
        '- Spec recycled from Indian tender (IS/BIS/DISCOM/ABT terminology)\n'
        '- Single central inverter for 20MW is outdated practice\n\n'
        'NEXT STEPS: Identify developer/SPV before any pricing response.\n'
        f'Research task due: {FU14}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════════
# UPDATE U1: ABIO — Re-engaged Jun 2026 (came back asking for Waneron quote)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[U1] Updating ABIO GREENERGY — re-engaged, Waneron quote task')
abio = find('ABIO')
if abio:
    new_activity = {
        'ts': NOW,
        'author': 'Alexander Papacosta',
        'type': 'note',
        'body': (
            'RE-ENGAGEMENT (Jun 2026) — ABIO came back after previously choosing CATL.\n\n'
            'ABIO is now asking for a BESS quote for Waneron Enterprises Ltd\n'
            '(3 MW / 12 MWh, Nicosia — a separate company they are connected to).\n\n'
            'NOTE: Waneron Enterprises Ltd is already in CRM as a separate prospect (proposal_sent, Alexander).\n'
            'Coordinate ABIO re-engagement with Waneron quote to maximise deal probability.\n\n'
            f'Action: Prepare Waneron BESS quote. Follow-up: {FU7}'
        ),
    }
    existing_feed = abio.get('activity_feed') or []
    new_task = {
        'id': f'abio-waneron-{TODAY}',
        'type': 'proposal',
        'text': 'Prepare BESS EPC quote for Waneron Enterprises Ltd (3 MW / 12 MWh, Nicosia) — requested by ABIO / Iacovos Charalambous (re-engagement Jun 2026)',
        'due': FU7,
        'done': False,
        'author': 'Alexander Papacosta',
        'created_at': NOW,
    }
    existing_tasks = abio.get('tasks') or []
    patch(abio['id'], {
        'outreach_status': 'responded',
        'next_follow_up': FU7,
        'last_contact_date': TODAY,
        'assigned_to': 'alexander.papacosta@lighthief.com',
        'assigned_name': 'Alexander Papacosta',
        'activity_feed': existing_feed + [new_activity],
        'tasks': existing_tasks + [new_task],
    })
    print(f'  ✓ ABIO updated → responded | task added | follow-up {FU7}')
else:
    print('  ✗ ABIO not found in CRM')


# ═══════════════════════════════════════════════════════════════════════════════
# UPDATE U2: S.S.H. SCANDINAVIAN SOLARPARKS — assign + proposal_sent
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[U2] Updating S.S.H. Scandinavian Solarparks — assign to Alexander + proposal_sent')
ssh = find('SCANDINAVIAN')
if ssh:
    activity_entry = {
        'ts': NOW,
        'author': 'Alexander Papacosta',
        'type': 'system',
        'body': (
            'PROPOSAL SENT (Mar 2026) — Scandinavian Solar Parks BESS\n'
            'Contact: Mr. Hakan Henriksson | +46 70 788 58 22 | +357 96 490050\n\n'
            'Group proposal: multiple Cyprus parks — BESS turnkey using group-order economics\n'
            'Client presentation also sent Mar 2026.\n'
            'Quote uses same island-wide BESS programme economics as confirmed group clients.\n'
            'Final prices firm after site review, grid connection sizing, and batch placement.\n\n'
            f'Follow-up: {FU7}'
        ),
    }
    follow_up_task = {
        'id': f'ssh-followup-{TODAY}',
        'type': 'call',
        'text': 'Follow up with Mr. Hakan Henriksson (+46 70 788 58 22 / +357 96 490050) on BESS proposal sent Mar 2026. Confirm interest and site review dates.',
        'due': FU7,
        'done': False,
        'author': 'Alexander Papacosta',
        'created_at': NOW,
    }
    existing_feed = ssh.get('activity_feed') or []
    existing_tasks = ssh.get('tasks') or []
    patch(ssh['id'], {
        'outreach_status': 'proposal_sent',
        'next_follow_up': FU7,
        'last_contact_date': TODAY,
        'assigned_to': 'alexander.papacosta@lighthief.com',
        'assigned_name': 'Alexander Papacosta',
        'contact_name': 'Mr. Hakan Henriksson',
        'contact_title': 'Owner / Representative',
        'contact_phone': '+46 70 788 58 22',
        'secondary_contact_phone': '+357 96 490050',
        'activity_feed': existing_feed + [activity_entry],
        'tasks': existing_tasks + [follow_up_task],
    })
    print(f'  ✓ SSH Scandinavian updated → proposal_sent | Hakan Henriksson | follow-up {FU7}')
else:
    print('  ✗ S.S.H. Scandinavian not found in CRM')


print('\n' + '='*60)
print(f'Done. {"DRY RUN — no writes made." if DRY else "All records written to Supabase."}')
print('='*60)
