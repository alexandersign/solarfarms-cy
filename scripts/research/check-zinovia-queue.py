# Check Zinovia's assigned prospects and why queue might be empty
import json, urllib.request, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'
H = {'apikey': KEY, 'Authorization': f'Bearer {KEY}'}

from datetime import datetime, timezone, timedelta
TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
THRESHOLD_DAYS = {'proposal_sent': 5, 'negotiating': 3, 'responded': 3, 'meeting_set': 1, 'contacted': 7}

def days_since(dt_str):
    if not dt_str: return None
    try:
        dt = datetime.fromisoformat(dt_str.replace('Z', '+00:00'))
        return (datetime.now(timezone.utc) - dt).days
    except: return None

# 1. Check assigned_to = zinovia
params = 'select=id,company_name,outreach_status,assigned_to,next_follow_up,last_contact_date,tasks&assigned_to=eq.zinovia@lighthief.com'
r = urllib.request.urlopen(urllib.request.Request(f'{URL}?{params}', headers=H), timeout=10)
data = json.loads(r.read())
print(f'Prospects assigned to zinovia@lighthief.com: {len(data)}\n')
for d in data:
    stage = d.get('outreach_status') or ''
    ds = days_since(d.get('last_contact_date'))
    nf = d.get('next_follow_up') or 'null'
    thr = THRESHOLD_DAYS.get(stage)
    tasks = d.get('tasks') or []
    open_tasks = [t for t in tasks if not t.get('done') and (not t.get('due') or t.get('due') <= TODAY)]
    
    # Queue logic analysis
    would_show = []
    if open_tasks: would_show.append(f'TASKS({len(open_tasks)})')
    if nf != 'null' and nf <= TODAY and not open_tasks: would_show.append('FOLLOW-UP')
    if thr and ds is not None and ds >= thr and not open_tasks and (nf == 'null' or nf > TODAY):
        would_show.append(f'STALE({ds}d>{thr}d)')
    
    status_q = 'IN QUEUE: ' + ', '.join(would_show) if would_show else 'NOT IN QUEUE'
    print(f"  {d['company_name'][:40]:40} {stage:15} last={ds}d nf={nf} [{status_q}]")

print()
# 2. Check if proposal_sent prospects have last_contact_date that would trigger stale
proposal = [d for d in data if d.get('outreach_status') == 'proposal_sent']
print(f'Proposal sent count: {len(proposal)}')
for p in proposal:
    ds = days_since(p.get('last_contact_date'))
    nf = p.get('next_follow_up') or 'null'
    print(f"  {p['company_name'][:40]:40} last_contact_days={ds} next_follow_up={nf}")
    if ds is None: print('    *** last_contact_date is NULL — stale check uses created_at instead')
    elif ds < 5: print(f'    *** Only {ds} days since contact — stale threshold is 5 days (not yet stale)')
    if nf == 'null': print('    *** next_follow_up not set — follow-up section will not show')
    elif nf > TODAY: print(f'    *** next_follow_up is in future ({nf}) — not overdue yet')
