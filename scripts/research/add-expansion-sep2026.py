# -*- coding: utf-8 -*-
"""
CRM expansion — September 2026

A) Add 5 new proposal clients missing from CRM:
   1. Andreas Ioannides — Larnaca Mall 2 MW / 8.36 MWh BESS
   2. M2 Ventures GmbH (Dr. Mittnik) — Cyprus park investor/acquirer
   3. NG Bailey (Thomas Fisher) — Project ATLAS 1.5 MWp PV + BESS, SBA Cyprus
   4. Ukrhydroenergo (UHE) — 197 MW / 394 MWh hybrid BESS, Ukraine
   5. Uganda NIPC — 2 × 20 MW PV EPC, Busunju & Pader

D) Add 2 new international EU BESS leads from lighthief-eu-bess/:
   6. ETET Engineering GmbH — Mūša 500 MW / 1,000 MWh BESS, Lithuania
   7. PEI Group Sp. z o.o. — 15.28 MW / 62.05 MWh BESS asset management, Gorzyce Poland

C) Activate top 25 commercial 'new' leads — assign to Zinovia + Andreas with follow-ups
   (Hotels flagged for targeted fresh sweep)

Run: python3 scripts/research/add-expansion-sep2026.py
     python3 scripts/research/add-expansion-sep2026.py --dry-run
"""
import json, sys, io, urllib.request, urllib.parse
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
FU30  = (datetime.now(timezone.utc) + timedelta(days=30)).strftime('%Y-%m-%d')


def get(params):
    req = urllib.request.Request(f'{URL}?{params}', headers=RH)
    return json.loads(urllib.request.urlopen(req, timeout=15).read())

def post(payload):
    if DRY:
        print(f'  [DRY] INSERT {payload["company_name"]}')
        return payload
    body = json.dumps(payload).encode()
    req = urllib.request.Request(URL, data=body, headers=WH, method='POST')
    result = json.loads(urllib.request.urlopen(req, timeout=15).read())
    return result[0] if isinstance(result, list) else result

def patch(rid, payload):
    if DRY:
        print(f'  [DRY] PATCH id={rid[:8]}… {list(payload.keys())}')
        return
    body = json.dumps(payload).encode()
    req = urllib.request.Request(f'{URL}?id=eq.{rid}', data=body, headers=PH, method='PATCH')
    urllib.request.urlopen(req, timeout=15)

def ok(r):
    val = f'€{r["estimated_deal_value"]:,.0f}' if r.get('estimated_deal_value') else '—'
    print(f'  ✓ {r["company_name"]} | {r.get("outreach_status")} | {val}')


# ═══════════════════════════════════════════════════════════════════════════
# ── A. NEW PROPOSAL CLIENTS ────────────────────────────────────────────────
# ═══════════════════════════════════════════════════════════════════════════
print('\n' + '='*65)
print('A. NEW PROPOSAL CLIENTS')
print('='*65)

# ── A1. Andreas Ioannides — Larnaca Mall 2 MW / 8.36 MWh BESS ─────────────
print('\n[A1] Andreas Ioannides — Larnaca Mall 2 MW / 8.36 MWh BESS')
r = post({
    'plant_name':           'Larnaca Mall — 2 MW / 8.36 MWh BESS Add-on',
    'company_name':         'ANDREAS IOANNIDES (LARNACA MALL)',
    'segment':              'developer',
    'offer_type':           'bess_retrofit',
    'technology':           'PV',
    'location':             'Larnaca Mall, Industrial Area, Larnaca',
    'district':             'Larnaca',
    'capacity_mwp':         2.0,
    'bess_potential_mwh':   8.36,
    'contact_name':         'Andreas Ioannides',
    'contact_title':        'Director',
    'secondary_contact_name': 'Alkis Kailos',
    'outreach_status':      'proposal_sent',
    'priority':             'high',
    'estimated_deal_value': 1136000,
    'rtb_status':           'operational',
    'bess_sales_angle':     'retrofit',
    'curtailment_rate':     55,
    'assigned_to':          'alexander.papacosta@lighthief.com',
    'assigned_name':        'Alexander Papacosta',
    'last_contact_date':    TODAY,
    'first_contact_date':   '2026-06-01',
    'next_follow_up':       FU7,
    'data_source':          'manual',
    'tags':                 ['proposal_sent', 'bess_retrofit', 'larnaca_mall', '8mwh', 'net_billing', 'grid_forming'],
    'notes':                'BESS add-on to existing 2 MW net-billing PV at Larnaca Mall Industrial Area. 2 × Linyang ME 4.179 MWh + T2 MV skid (2 × BCS1000K-C-HUD). Voltus EMS for net-billing optimisation + curtailment recovery. Price €1,136,000 ex VAT (€142k/MWh × 8 MWh). Grid-forming capable. Secondary contact: Alkis Kailos.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'PROPOSAL SENT (Jun 2026) — Larnaca Mall BESS Add-on\n'
        'Ref: bess-ioannides-larnaca-mall-2mw-8mwh-jun2026\n\n'
        'CONFIG: 2 MW / 8.36 MWh (2 × Linyang ME 4.179 MWh, 1 × T2 MV skid)\n'
        '  - 2 × Kehua BCS1000K-C-HUD PCS (2.0 MW total)\n'
        '  - Voltus EMS: IEC 60870-5-104 DSO interface, net-billing optimisation\n'
        '  - Grid-forming capable\n'
        'PRICE: €1,136,000 ex VAT (€142,000/MWh × 8 MWh)\n'
        'PROJECT: Addon to existing 2 MW net-billing PV installation at Larnaca Mall\n'
        'SOH at Year 10: 6.64 MWh usable (79.58%)\n'
        f'CONTACTS: Andreas Ioannides (Director) + Alkis Kailos (secondary)\n'
        f'Follow-up: {FU7}'
    )}],
})
ok(r)

# ── A2. M2 Ventures GmbH — Cyprus park investor/acquirer ──────────────────
print('\n[A2] M2 Ventures GmbH (Dr. Stefan Mittnik) — Cyprus park investor')
r = post({
    'plant_name':           'M2 Ventures — Cyprus PV+BESS Portfolio Acquisition (3 parks under NDA)',
    'company_name':         'M2 VENTURES GMBH',
    'segment':              'investor',
    'offer_type':           'acquisition',
    'technology':           'PV',
    'location':             'Germany (investor) — projects in Cyprus',
    'district':             None,
    'bess_potential_mwh':   45.5,   # 10.56 MWh + ~13.2 MWh + 22.9 MWh across 3 parks
    'contact_name':         'Dr. Stefan Mittnik',
    'contact_title':        'Managing Partner',
    'contact_email':        'm2ventures@mail.gmx',
    'outreach_status':      'proposal_sent',
    'priority':             'urgent',
    'estimated_deal_value': 24100000,  # combined: €4.59M AT + €8.74M Margí + €10.77M Sotira (approx)
    'assigned_to':          'alexander.papacosta@lighthief.com',
    'assigned_name':        'Alexander Papacosta',
    'last_contact_date':    TODAY,
    'first_contact_date':   '2026-07-01',
    'next_follow_up':       FU7,
    'data_source':          'manual',
    'tags':                 ['proposal_sent', 'investor', 'acquisition', 'nda', 'three_parks', 'germany', 'high_value', 'curtailment_arbitrage'],
    'notes':                'German investor group under NDA LCY-NDA-M2V-2026-001. Brief: up to 5 MWp / 5 MWh (expanded to ~20 MWh 4h storage in our recommendation). Three parks under NDA: (1) Agios Theodoros 2.64 MWp + 10.56 MWh — €4.59M all-in, 13.4% Y1 EBITDA; (2) Margí 5.0 MWp (3.3 operational + 1.7 RTB) — €8.74M all-in, €751k Y1 merchant; (3) Sotira 6.53 MWp east–west + 22.9 MWh — €10.76M all-in, 11.1% Y1. Referral from Dr. Sybaris (CEO). Data room to be opened on execution.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'INVESTOR PACK SENT (Jul 2026) — M2 Ventures GmbH\n'
        'NDA: LCY-NDA-M2V-2026-001 | Referred by Dr. Sybaris (CEO)\n'
        'Contact: Dr. Stefan Mittnik — m2ventures@mail.gmx\n\n'
        '3 PARKS INTRODUCED UNDER NDA:\n'
        '1. AGIOS THEODOROS (Ref LCY-M2V-2026-02)\n'
        '   CERA Ε004576/2024 | 2.64 MWp + 10.56 MWh BESS | Larnaca District\n'
        '   All-in: €4.59M | Y1 EBITDA: €614,900 (13.4% on cost)\n'
        '   Structure: share transfer of project company + Lighthief EPC for BESS\n\n'
        '2. MARGÍ (Ref LCY-M2V-2026-03)\n'
        '   CERA Ε004836/2025 | 3.3 MWp operational (Jul 2025) + 1.7 MWp RTB captive\n'
        '   Nicosia District | All-in €8.74M | Y1 merchant EBITDA: €751,600 (8.6%)\n'
        '   + 13.2 MWh BESS retrofit on operating park\n\n'
        '3. SOTIRA (Ref LCY-M2V-2026-04)\n'
        '   6.53 MWp east–west 12.5° + 22.9 MWh BESS | Famagusta District\n'
        '   All-in: €10.76M (incl. RTB €2.29M) | Y1 yield: 11.1%\n'
        '   TMY: 1,806 kWh/kWp (e/w); 2,194 kWh/kWp (south optimum)\n\n'
        'THESIS: 65% grid curtailment in Cyprus (Jan–May 2026) inverts the RTB premium.\n'
        '4-hour batteries earn 35% return on their own cost vs 1-hour storage.\n\n'
        f'Next: Dr. Mittnik to confirm receipt + open data room. Follow-up: {FU7}'
    )}],
})
ok(r)

# ── A3. NG Bailey / Thomas Fisher — Project ATLAS, SBA Cyprus ─────────────
print('\n[A3] NG Bailey (Thomas Fisher) — Project ATLAS PV+BESS, SBA Cyprus')
r = post({
    'plant_name':           'Project ATLAS S365 — 1.5 MWp PV + 3.45 MWh BESS (Budget Quotation)',
    'company_name':         'NG BAILEY (PROJECT ATLAS)',
    'segment':              'developer',
    'offer_type':           'epc',
    'technology':           'PV',
    'location':             'Sovereign Base Area (SBA), Cyprus — RAF site',
    'district':             None,
    'capacity_mwp':         1.5,
    'bess_potential_mwh':   3.45,
    'contact_name':         'Thomas Fisher',
    'contact_title':        'Senior Electrical Cost Engineer',
    'outreach_status':      'proposal_sent',
    'priority':             'high',
    'estimated_deal_value': 3057000,
    'assigned_to':          'alexander.papacosta@lighthief.com',
    'assigned_name':        'Alexander Papacosta',
    'last_contact_date':    TODAY,
    'first_contact_date':   '2026-08-25',
    'next_follow_up':       FU7,
    'data_source':          'manual',
    'tags':                 ['proposal_sent', 'epc', 'sba_cyprus', 'raf', 'uk_defence', 'ng_bailey', 'budget_quotation', 'dio', 'project_atlas'],
    'notes':                'Budget quotation sent 25 Aug 2026. Ref: LCY-BQ-ATLAS-S365-2026-08-25. Client: NG Bailey as main contractor for DIO Project ATLAS (Z9M2270Y24) — UK Ministry of Defence RAF site in SBA Cyprus. Scope: 1.5 MWp ground-mount PV + 3.45 MWh BESS + 500m dual 11kV circuit + 1,000kVA transformer. Budget €3,057,000 ex VAT (Option A, 1.5 MWp). Option B (0.76 MWp, 1.33 GWh/yr target): €2,582,000. NOT a fixed-price offer — budget figure for NG Bailey Pricing Document. NG Bailey is Principal Contractor; Lighthief is specialist EPC subcontractor.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'BUDGET QUOTATION SENT (25 Aug 2026) — NG Bailey, Project ATLAS S365\n'
        'Ref: LCY-BQ-ATLAS-S365-2026-08-25 | Attn: Thomas Fisher\n\n'
        'CLIENT CHAIN: DIO (UK MoD) → NG Bailey (main contractor) → Lighthief (specialist EPC sub)\n'
        'PROJECT: ATLAS Z9M2270Y24 — RAF site, Sovereign Base Area, Cyprus\n\n'
        'OPTION A (budget): 1.5 MWp + 3,450 kWh BESS + 11 kV ring main\n'
        '  Budget: €3,057,000 ex VAT (≈ £2,629,000 @ €1=£0.86)\n'
        '  Annual yield: ~2.6 GWh/yr at SBA latitude\n'
        'OPTION B: 0.76 MWp (UK yield 1.33 GWh/yr target) → €2,582,000\n'
        'OPTION A (no road if in main civils): €2,523,400\n\n'
        'SITING NOTE: Recommended energy compound outside Generator Compound +\n'
        'PV field on open ground outside RADHAZ fence (west/north-west of T-House).\n'
        'T-House and Generator compounds have insufficient area for 5,900 m² panels.\n\n'
        f'Next: NG Bailey to lock number and confirm option. Follow-up: {FU7}'
    )}],
})
ok(r)

# ── A4. Ukrhydroenergo (UHE) — 197 MW / 394 MWh hybrid BESS Ukraine ───────
print('\n[A4] Ukrhydroenergo (UHE) — 197 MW / 394 MWh hybrid BESS, Ukraine')
r = post({
    'plant_name':           'UHE Hybrid BESS Programme — 197 MW / 394 MWh (4 HPP sites)',
    'company_name':         'UKRHYDROENERGO (UHE)',
    'segment':              'developer',
    'offer_type':           'epc',
    'technology':           'Hybrid',
    'location':             'Ukraine — 4 hydropower sites (PSP + 3 HPP)',
    'district':             None,
    'capacity_mwp':         205.0,
    'bess_potential_mwh':   411.0,
    'contact_name':         'Ukrhydroenergo Procurement',
    'contact_title':        'National Hydropower Company of Ukraine',
    'outreach_status':      'proposal_sent',
    'priority':             'medium',
    'estimated_deal_value': 44800000,   # ~411 MWh × €109k/MWh installed
    'assigned_to':          'alexander.papacosta@lighthief.com',
    'assigned_name':        'Alexander Papacosta',
    'last_contact_date':    TODAY,
    'first_contact_date':   '2026-06-01',
    'next_follow_up':       FU30,
    'data_source':          'manual',
    'tags':                 ['proposal_sent', 'international', 'ukraine', 'hybrid_bess', 'hydropower', 'large_scale', '394mwh', 'indicative'],
    'notes':                'INDICATIVE offer — not binding until formal bid. 197 MW / 394 MWh hybrid BESS at 4 sites (PSP + 3 HPP). Installed config: 205 MW / 411.2 MWh (nearest full block). Linyang ME 5.015 MWh containers, Kehua BCS1250K PCS, T8/T4 MV skids. Litgrid/Ukrenergo SCADA integration, cybersecurity IEC 62443. Revenue stack: FCR, aFRR, mFRR, DA, intraday, capacity market. COD target Q4 2028/Q1 2029. Pricing €109k/MWh installed + EPC adders. Note: wartime delivery risk — subject to site survey, lot structure confirmation, Ukrainian import duty treatment.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'INDICATIVE OFFER (Jun 2026) — Ukrhydroenergo (UHE) Hybrid BESS\n\n'
        'PROGRAMME: 197 MW / 394 MWh BESS at 4 Ukrainian hydropower sites\n'
        '  Installed: 205 MW / 411.2 MWh (sized to nearest full block)\n'
        '  Sites: Pumped Storage Plant (PSP) + 3 Run-of-River HPPs\n\n'
        'CONFIG: Linyang ME 5.015 MWh (LFP, IP55, liquid cooling, fire suppression)\n'
        '  + Kehua BCS1250K-C-HUD PCS (grid-forming + grid-following)\n'
        '  + T8 blocks (10 MW/20.06 MWh) + T4 blocks (5 MW/10.03 MWh)\n'
        '  + HV switchyard works (110/330 kV step-up per site POC)\n'
        '  + Hybrid EMS: UHE SCADA + Ukrenergo telecontrol + IEC 62443 cybersec\n\n'
        'PRICING: Indicative €109,000/MWh × 411.2 MWh = ~€44.8M (EPC)\n'
        'COD: Q4 2028 / Q1 2029 | Specs: −25°C to +60°C, C5, IEEE 693 seismic\n\n'
        'NOTE: Wartime delivery — final pricing subject to site survey, import duty,\n'
        'grid-forming/overload confirmation, and lot structure. Not a binding offer.\n'
        f'Follow-up: {FU30} (wartime context — verify procurement status)'
    )}],
})
ok(r)

# ── A5. Uganda NIPC — Busunju & Pader 2×20 MW PV EPC ─────────────────────
print('\n[A5] Uganda NIPC — Busunju & Pader 2×20 MW PV EPC (Aug 2026 RFI)')
r = post({
    'plant_name':           'NIPC Uganda — 2×20 MW PV EPC (Busunju & Pader)',
    'company_name':         'NATIONAL INFRASTRUCTURE AND PROCUREMENT COMMISSION (NIPC UGANDA)',
    'segment':              'developer',
    'offer_type':           'epc',
    'technology':           'PV',
    'location':             'Busunju & Pader District, Uganda',
    'district':             None,
    'capacity_mwp':         52.0,   # 2 × 26 MWp (DC/AC 1.30)
    'contact_name':         'NIPC Procurement',
    'contact_email':        'procurement@nipc.or.ug',
    'contact_title':        'Procurement Officer',
    'outreach_status':      'contacted',
    'priority':             'medium',
    'estimated_deal_value': 22000000,  # lower end of USD 22-28M range
    'assigned_to':          'alexander.papacosta@lighthief.com',
    'assigned_name':        'Alexander Papacosta',
    'last_contact_date':    '2026-08-25',
    'first_contact_date':   '2026-08-25',
    'next_follow_up':       FU14,
    'data_source':          'manual',
    'tags':                 ['contacted', 'international', 'africa', 'uganda', 'pv_epc', 'nipc', 'government_tender', 'two_sites', 'busunju', 'pader'],
    'notes':                'RFI response sent 25 Aug 2026. Ref: LH-RFI-NIPC-UG-20MW-2026-08. RFP: NIPC/UG/SUPLS/DHG0249. INDICATIVE ONLY — not a commercial offer. Range USD 22–28M (both plants, ex VAT + duties). Scope: 2 × 20 MWAC grid-connected PV (Busunju + Pader), fixed-tilt, string inverters, 33 kV. BESS not included (not specified in RFP). Clarifications required before firm bid. Contact: procurement@nipc.or.ug. NOTE: Different from the previous anonymous Uganda 20MW RFI — this is an official government NIPC tender.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'RFI RESPONSE SENT (25 Aug 2026) — NIPC Uganda 2×20 MW PV EPC\n'
        'Ref: LH-RFI-NIPC-UG-20MW-2026-08 | RFP: NIPC/UG/SUPLS/DHG0249\n'
        'To: procurement@nipc.or.ug\n\n'
        'SCOPE: 2 × 20 MWAC grid-connected PV — Busunju + Pader District, Uganda\n'
        '  DC/AC 1.30 → ~26 MWp per plant / 52 MWp total\n'
        '  Fixed-tilt ground mount, string inverters, 33 kV step-up + switchyard\n'
        '  BESS: NOT INCLUDED (not specified in current RFP)\n\n'
        'INDICATIVE RANGE (both plants, ex VAT + duties, USD):\n'
        '  Full EPC 40 MWAC: USD 22–28M (USD 550–700/kWac)\n'
        '  Per 20 MWAC plant: USD 11–14M\n'
        '  O&M 5yr option: USD 2.4–3.6M\n'
        '  Trackers (if confirmed): +~15%\n\n'
        'VALIDITY: 30 days from 25 Aug 2026\n'
        'STATUS: Indicative only — 4 clarifications required for firm bid:\n'
        '  (1) DC/AC ratio confirmation  (2) Mounting: fixed vs trackers\n'
        '  (3) Grid code / interconnection point  (4) LDs and bond rates\n'
        f'Follow-up: {FU14} — confirm procurement timeline and clarification responses'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════
# ── D. INTERNATIONAL EU BESS LEADS ────────────────────────────────────────
# ═══════════════════════════════════════════════════════════════════════════
print('\n' + '='*65)
print('D. INTERNATIONAL EU BESS LEADS')
print('='*65)

# ── D1. ETET Engineering GmbH — Mūša 500 MW / 1,000 MWh BESS Lithuania ───
print('\n[D1] ETET Engineering GmbH — Mūša 500 MW / 1,000 MWh BESS, Lithuania')
r = post({
    'plant_name':           'Mūša BESS — 500 MW / 1,000 MWh (Litgrid 330 kV, Lithuania)',
    'company_name':         'ETET ENGINEERING GMBH',
    'segment':              'developer',
    'offer_type':           'epc',
    'technology':           'BESS',
    'location':             'Mūša, Lithuania — Litgrid 330 kV connection',
    'district':             None,
    'capacity_mwp':         500.0,
    'bess_potential_mwh':   1000.0,
    'contact_name':         'ETET Engineering GmbH',
    'contact_title':        'Project Developer (Germany)',
    'outreach_status':      'proposal_sent',
    'priority':             'urgent',
    'estimated_deal_value': 109000000,  # 1,000 MWh × ~€109k/MWh indicative
    'assigned_to':          'alexander.papacosta@lighthief.com',
    'assigned_name':        'Alexander Papacosta',
    'last_contact_date':    '2026-07-06',
    'first_contact_date':   '2026-07-06',
    'next_follow_up':       FU7,
    'data_source':          'manual',
    'tags':                 ['proposal_sent', 'international', 'lithuania', 'bess_epc', '1000mwh', '500mw', 'largest_deal', 'entso_e', 'litgrid', 'fcr_afrr'],
    'notes':                'LARGEST DEAL IN PIPELINE. Ref: LTH-ETET-MUSA-EPC-JUL2026. Turnkey EPC quotation sent 6 Jul 2026, validity 60 days (expired ~5 Sep — renew). Config: 200 MW + 300 MW blocks at Mūša 330 kV Litgrid substation. Linyang ME 5.015 MWh containers, Kehua BCS1250K PCS, DDP project-site basis. Full Lithuanian revenue stack: FCR, aFRR, mFRR, day-ahead, intraday, capacity market. COD Q4 2028/Q1 2029. Spec: −25°C to +60°C, C5, IEEE 693-2018 seismic. Lighthief EU HQ and 3,500 m² warehouse in Poland for Lithuania delivery. IMPORTANT: 60-day validity EXPIRED ~5 Sep — reconfirm pricing immediately.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'EPC QUOTATION SENT (6 Jul 2026) — ETET Engineering GmbH / Mūša BESS\n'
        'Ref: LTH-ETET-MUSA-EPC-JUL2026 | Validity: 60 days → EXPIRED ~5 Sep 2026\n\n'
        '⚠️  ACTION REQUIRED: Reconfirm pricing and extend validity with client.\n\n'
        'PROJECT: Mūša BESS, Lithuania — two-block configuration\n'
        '  Block A: 200 MW / 400 MWh (200 × T8 modules)\n'
        '  Block B: 300 MW / 600 MWh (300 × T8 modules)\n'
        '  Total: 500 MW AC / 1,000 MWh usable @ POC (BoL)\n'
        '  Grid connection: Litgrid 330 kV existing substation (2 producer step-up)\n\n'
        'EQUIPMENT: Linyang ME 5.015 MWh (IP55, liquid cooling, EVE LF314 cells)\n'
        '           Kehua BCS1250K-C-HUD (grid-forming + grid-following, 1.25 MW each)\n'
        'DELIVERY: DDP project site, Lithuania (3,500 m² Lighthief PL warehouse logistics)\n\n'
        'REVENUE STACK (ENTSO-E): FCR · aFRR · mFRR · day-ahead · intraday · capacity\n'
        'COD: Q4 2028 / Q1 2029 | Ambient: −25°C to +60°C | C5 | IEEE 693 seismic\n\n'
        f'⚠️  URGENT: Contact ETET to renew quotation. Follow-up: {FU7}'
    )}],
})
ok(r)

# ── D2. PEI Group Sp. z o.o. — 15.28 MW / 62.05 MWh BESS, Gorzyce Poland ─
print('\n[D2] PEI Group Sp. z o.o. — 15.28 MW / 62.05 MWh BESS, Gorzyce Poland')
r = post({
    'plant_name':           'PEI Group Gorzyce — 15.28 MW / 62.05 MWh BESS Asset Management',
    'company_name':         'PEI GROUP SP. Z O.O.',
    'segment':              'developer',
    'offer_type':           'o_and_m',
    'technology':           'BESS',
    'location':             'Gorzyce, Podkarpackie, Poland',
    'district':             None,
    'capacity_mwp':         15.28,
    'bess_potential_mwh':   62.05,
    'contact_name':         'PEI Group',
    'contact_email':        None,
    'contact_title':        'Asset Owner',
    'company_website':      None,
    'outreach_status':      'proposal_sent',
    'priority':             'high',
    'estimated_deal_value': 1860000,   # ~€30k/MWh/yr × 62 MWh × 1yr AM estimate
    'assigned_to':          'alexander.papacosta@lighthief.com',
    'assigned_name':        'Alexander Papacosta',
    'last_contact_date':    '2026-03-13',
    'first_contact_date':   '2026-03-13',
    'next_follow_up':       FU7,
    'data_source':          'manual',
    'tags':                 ['proposal_sent', 'international', 'poland', 'bess_am', 'asset_management', 'gorzyce', '62mwh', 'commissioning_nov2026'],
    'notes':                'RFQ received 13 Mar 2026. Asset management RFQ for 15.28 MW / 62.05 MWh BESS (+ 0.15 MW PV auxiliary) at Gorzyce, Podkarpackie. Commission date: 1 Nov 2026. Services: full operational, technical, financial, and commercial asset management for operational life. Pre-operation phase start possible. Address: ul. Żelazna 69A lok. 25, 00-871 Warsaw, Poland. Local delivery via Maciej Krzyżanowski (Poland Director). NOTE: Plant commissioning Nov 2026 — AM contract window is now urgent.',
    'activity_feed': [{'ts': NOW, 'author': 'Alexander Papacosta', 'type': 'system', 'body': (
        'RFQ RESPONSE SUBMITTED (Mar 2026) — PEI Group Gorzyce BESS Asset Management\n\n'
        'CLIENT: PEI Group Sp. z o.o. | ul. Żelazna 69A lok. 25, 00-871 Warsaw\n'
        'ASSET: 15.28 MW / 62.05 MWh BESS + 0.15 MW PV (Gorzyce, Podkarpackie)\n'
        'COMMISSION: 1 November 2026 → AM contract window is NOW URGENT\n\n'
        'SCOPE REQUESTED: Full AM — operational, technical, financial, commercial\n'
        '  Management of asset throughout operational life\n'
        '  Pre-operation phase start possible\n\n'
        'LOCAL: Maciej Krzyżanowski (Poland Director) coordinates on-site delivery\n\n'
        f'⚠️  URGENT: COD Nov 2026 — confirm AM contract award. Follow-up: {FU7}'
    )}],
})
ok(r)


# ═══════════════════════════════════════════════════════════════════════════
# ── C. COMMERCIAL ACTIVATION — Top 25 'new' leads by deal value ────────────
# ═══════════════════════════════════════════════════════════════════════════
print('\n' + '='*65)
print('C. COMMERCIAL ACTIVATION (top 25 new leads → assign + follow-up)')
print('='*65)

# Fetch top commercial 'new' records by annual_savings_eur (proxy for roof size)
comm_new = get(
    'select=id,company_name,plant_name,industry,district,annual_savings_eur,'
    'estimated_deal_value,contact_name,contact_email'
    '&segment=eq.commercial&outreach_status=eq.new'
    '&order=annual_savings_eur.desc.nullslast&limit=25'
)
print(f'\nTop 25 uncontacted commercial leads (of 319 total "new"):')

# Alternate assignment: Zinovia (commercial specialist) + Andreas (office)
ZINOVIA = ('zinovia@lighthief.com', 'Zinovia Efesopoulou')
ANDREAS = ('office@lighthief.com', 'Andreas Christoforou')

activated = 0
hotels_flagged = 0
for i, lead in enumerate(comm_new):
    assignee = ZINOVIA if i % 2 == 0 else ANDREAS
    industry = lead.get('industry') or 'Unknown'
    savings = lead.get('annual_savings_eur') or 0
    val = lead.get('estimated_deal_value') or 0
    contact = lead.get('contact_name') or '—'
    email = lead.get('contact_email') or '—'

    task_text = (
        f'Initial outreach — {industry} | {lead.get("district","—")} district | '
        f'annual savings ~€{savings:,.0f}/yr | deal ~€{val:,.0f}. '
        f'Contact: {contact} ({email}). Send commercial solar intro email.'
    )
    patch(lead['id'], {
        'outreach_status':  'new',   # keep new but assign + add task + follow-up
        'assigned_to':      assignee[0],
        'assigned_name':    assignee[1],
        'next_follow_up':   FU7,
        'tasks': [{
            'id':         f'activation-{lead["id"][:8]}',
            'type':       'email',
            'text':       task_text,
            'due':        FU7,
            'done':       False,
            'author':     'Alexander Papacosta',
            'created_at': NOW,
        }],
    })
    flag = ' 🏨' if 'Hotel' in industry or 'Hospitality' in industry else ''
    district = lead.get('district') or '—'
    print(f'  [{i+1:2d}] {(lead.get("company_name") or lead.get("plant_name") or "—")[:38]:38} {industry[:22]:22} {district:10} → {assignee[1].split()[0]}{flag}')
    activated += 1
    if 'Hotel' in industry or 'Hospitality' in industry:
        hotels_flagged += 1

print(f'\n  Activated: {activated} leads | Hotels found: {hotels_flagged}')
print('\n  ⚠️  HOTEL SWEEP RECOMMENDATION:')
print('  Only 5 hotel/hospitality records in CRM vs Cyprus\'s 300+ beach hotels.')
print('  Run: python3 scripts/solar-prospect-sweep.py --type "Hotel / Hospitality"')
print('       (requires GOOGLE_PLACES_API_KEY in .env.local)')

print('\n' + '='*65)
print(f'Done. {"DRY RUN — no writes." if DRY else "All records written to Supabase."}')
print('='*65)
