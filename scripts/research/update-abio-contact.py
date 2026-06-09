# -*- coding: utf-8 -*-
"""Find all Abio / Easy Power CRM rows and update contact to Irakli Bukhiashvili."""
import json, sys, io, urllib.request, urllib.parse
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R_HDR = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
W_HDR = {**R_HDR, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

def get(params):
    req = urllib.request.Request(f'{URL}?{params}', headers=R_HDR)
    return json.loads(urllib.request.urlopen(req, timeout=10).read())

def patch(pid, payload):
    body = json.dumps(payload).encode()
    req = urllib.request.Request(f'{URL}?id=eq.{pid}', data=body, headers=W_HDR, method='PATCH')
    r = urllib.request.urlopen(req, timeout=10)
    return r.status

# ─── Find all Abio / Easy Power rows ───────────────────────────────────────
rows = get(
    'select=id,company_name,plant_name,contact_name,contact_email,contact_linkedin,'
    'contact_phone,company_website,capacity_mwp,district,activity_feed,tags'
    '&or=(company_name.ilike.*abio*,company_name.ilike.*easy%20power*,'
    'company_name.ilike.*abiogreen*,plant_name.ilike.*abio*)'
)

print(f"Found {len(rows)} Abio/Easy Power rows:")
for r in rows:
    print(f"  {r['company_name']} | {r.get('capacity_mwp','')} MWp | {r.get('district','')} | contact: {r.get('contact_name','—')}")

# ─── Contact details from LinkedIn + website ────────────────────────────────
CONTACT = {
    'contact_name':     'Irakli Bukhiashvili',
    'contact_title':    'CEO / Founder',
    'contact_linkedin': 'https://www.linkedin.com/in/iraklibukhiashvili/',
    'contact_email':    'info@abio.com.cy',
    'company_website':  'https://www.abiogreen.com',
    'registered_address': 'Tetrick Larnakos Avenue 62, 2101, Aglantzia, Nicosia, Cyprus',
}

# Activity note
NOW = datetime.now().strftime('%Y-%m-%dT%H:%M:%S+03:00')
NOTE = (
    'CONTACT UPDATED (Jun 2026): Irakli Bukhiashvili — CEO/Founder, Abio Group.\n'
    'LinkedIn: https://www.linkedin.com/in/iraklibukhiashvili/\n'
    'Email: info@abio.com.cy | Website: abiogreen.com\n'
    'Abio parks in Cyprus: EASY POWER (CYPRUS) 20 MWp\n'
    'Abio group parks (int\'l): Borbalo 7 MWp, Waneron 3 MWp, Signaghi 3 MWp, Solartek 2.5 MWp\n'
    'Group stats: €236M+ AUM, 500 MW+ under development/construction, active 10+ countries\n'
    'ABIO Power: 66 GWh traded in Cyprus electricity market (liberalized, Oct 2025)'
)

print(f"\nPatching {len(rows)} rows with Irakli Bukhiashvili contact details...")
for r in rows:
    feed = r.get('activity_feed') or []
    entry = {'ts': NOW, 'author': 'Alexander', 'type': 'system', 'body': NOTE}
    feed = [entry] + [e for e in feed if 'CONTACT UPDATED' not in e.get('body','')[:30]]

    s = patch(r['id'], {**CONTACT, 'activity_feed': feed})
    print(f"  {'OK' if s == 204 else s}  {r['company_name']}")

print("\nDone.")

# ─── Also update Renergetic + Waneron (same Abio group) ─────────────────────
ABIO_SUBSIDIARIES = [
    '5bbcdb87-5657-496a-abe6-541226f4330d',   # RENERGETIC LTD
    '29146563-d9d8-4507-9bbe-49bd3ebcc3fe',   # WANERON ENTERPRISES LTD
]

NOTE2 = (
    'CONTACT UPDATED (Jun 2026): Irakli Bukhiashvili — CEO/Founder, Abio Group.\n'
    'LinkedIn: https://www.linkedin.com/in/iraklibukhiashvili/\n'
    'Email: info@abio.com.cy | Website: abiogreen.com\n'
    'Company is part of Abio Group — active in Cyprus PV + energy trading (ABIO Power: 66 GWh traded).\n'
    'Parent group website: https://www.abiogreen.com'
)

print("\nPatching Renergetic + Waneron (Abio subsidiaries)...")
for pid in ABIO_SUBSIDIARIES:
    row = get(f'id=eq.{pid}&select=company_name,activity_feed')[0]
    feed = row.get('activity_feed') or []
    entry = {'ts': NOW, 'author': 'Alexander', 'type': 'system', 'body': NOTE2}
    feed = [entry] + [e for e in feed if 'CONTACT UPDATED' not in e.get('body','')[:30]]
    s = patch(pid, {**CONTACT, 'parent_group': 'Abio Group', 'activity_feed': feed})
    print(f"  {'OK' if s == 204 else s}  {row['company_name']}")

print("Done.")

