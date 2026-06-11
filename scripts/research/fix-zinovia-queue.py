# Backfill last_contact_date + next_follow_up on Zinovia's proposal_sent prospects
# so her queue populates immediately
import json, urllib.request, sys, io
from datetime import datetime, timezone, timedelta
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
R = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}
W = {**R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

NOW = datetime.now(timezone.utc).isoformat()
TOMORROW = (datetime.now(timezone.utc) + timedelta(days=1)).strftime('%Y-%m-%d')

# Fetch Zinovia's proposal_sent + contacted prospects missing next_follow_up
params = (
    'select=id,company_name,outreach_status,last_contact_date,next_follow_up'
    '&assigned_to=eq.zinovia@lighthief.com'
    '&outreach_status=in.("proposal_sent","negotiating")'
)
rows = json.loads(urllib.request.urlopen(
    urllib.request.Request(f'{URL}?{params}', headers=R), timeout=10
).read())

print(f'proposal_sent/negotiating prospects for Zinovia: {len(rows)}')
for row in rows:
    pid = row['id']
    name = row['company_name']
    # Only backfill if missing
    payload = {}
    if not row.get('last_contact_date'):
        payload['last_contact_date'] = NOW
    if not row.get('next_follow_up'):
        payload['next_follow_up'] = TOMORROW  # triggers as overdue immediately
    
    if payload:
        body = json.dumps(payload).encode()
        req = urllib.request.Request(f'{URL}?id=eq.{pid}', data=body, headers=W, method='PATCH')
        s = urllib.request.urlopen(req, timeout=10).status
        print(f'  OK ({s}) {name}: {list(payload.keys())}')
    else:
        print(f'  SKIP {name}: already has both fields')

print('\nDone. Zinovia should now see these in her Queue tab.')
