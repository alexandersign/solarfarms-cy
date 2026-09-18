# -*- coding: utf-8 -*-
"""
Hunter.io email enrichment for target industries:
  Hotel / Hospitality · Clinic / Medical · Warehouse / Logistics
  Supermarket / Retail · Factory / Manufacturing

Strategy:
  1. Fetch all CRM commercial records in target industries with website but no email
  2. Deduplicate by domain (one Hunter search covers all branches of a chain)
  3. Hunter Domain Search → pick best email (info@, sales@, contact@ preferred)
  4. Also run Hunter Company Domain Lookup for records without websites
  5. Store: contact_email, email_confidence, contact_name, contact_title

Hunter.io Starter plan: 2,000 searches/month — enough for all targets.

Usage:
    python3 scripts/research/hunter-target-industries.py
    python3 scripts/research/hunter-target-industries.py --dry-run
    python3 scripts/research/hunter-target-industries.py --industry "Hotel / Hospitality"
    python3 scripts/research/hunter-target-industries.py --no-website   # also try name-only lookup
"""
import json, sys, io, os, re, urllib.request, urllib.parse, time
from pathlib import Path
from datetime import datetime, timezone
from dotenv import load_dotenv

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
load_dotenv(Path(__file__).resolve().parents[2] / '.env.local')
sys.stdout.reconfigure(line_buffering=True)

DRY        = '--dry-run' in sys.argv
NO_WEBSITE = '--no-website' in sys.argv
IND_FILTER = next((sys.argv[sys.argv.index('--industry')+1]
                   for i,a in enumerate(sys.argv) if a == '--industry'), None)

HUNTER_KEY = os.getenv('HUNTER_API_KEY', '')
if not HUNTER_KEY:
    sys.exit('ERROR: HUNTER_API_KEY not set in .env.local')

SB_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co/rest/v1/pv_prospects'
SB_KEY = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
          '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0'
          '.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE')
SB_R = {'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'}
SB_W = {**SB_R, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}

TARGET_INDUSTRIES = [
    'Hotel / Hospitality',
    'Clinic / Medical',
    'Warehouse / Logistics',
    'Supermarket / Retail',
    'Factory / Manufacturing',
]
if IND_FILTER:
    TARGET_INDUSTRIES = [IND_FILTER]

HUNTER = 'https://api.hunter.io/v2'


# ─── Helpers ─────────────────────────────────────────────────────────────────

def extract_domain(url: str) -> str | None:
    if not url:
        return None
    try:
        u = url if url.startswith('http') else f'https://{url}'
        host = urllib.parse.urlparse(u).hostname or ''
        host = re.sub(r'^www\.', '', host)
        return host if '.' in host else None
    except Exception:
        return None

def hunter_get(endpoint: str, params: dict) -> dict:
    p = urllib.parse.urlencode({**params, 'api_key': HUNTER_KEY})
    try:
        with urllib.request.urlopen(f'{HUNTER}/{endpoint}?{p}', timeout=15) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:200]
        return {'error': f'HTTP {e.code}: {body}'}
    except Exception as e:
        return {'error': str(e)}

def pick_email(emails: list) -> dict | None:
    if not emails:
        return None
    # Prefer generic/contact addresses, then highest confidence
    generic_re = re.compile(r'^(info|contact|sales|office|hello|mail|admin|support|enquiries|reservations|bookings)@', re.I)
    sorted_e = sorted(emails, key=lambda e: (
        0 if generic_re.match(e.get('value', '')) else 1,
        -(e.get('confidence') or 0)
    ))
    best = sorted_e[0]
    return {
        'email':      best.get('value'),
        'confidence': best.get('confidence') or 0,
        'name':       f'{best.get("first_name","")} {best.get("last_name","")}'.strip() or None,
        'title':      best.get('position') or None,
    }

def hunter_domain_search(domain: str) -> dict | None:
    res = hunter_get('domain-search', {'domain': domain, 'limit': 10})
    emails = (res.get('data') or {}).get('emails', [])
    return pick_email(emails)

def hunter_company_lookup(company_name: str) -> str | None:
    """Find domain from company name via Hunter company lookup."""
    res = hunter_get('companies', {'query': company_name, 'limit': 1})
    companies = res.get('data', {}).get('companies', [])
    if companies:
        return companies[0].get('domain')
    return None

def sb_fetch_targets() -> list:
    rows = []
    for ind in TARGET_INDUSTRIES:
        offset = 0
        while True:
            p = urllib.parse.urlencode({
                'select': 'id,company_name,plant_name,company_website,contact_email,contact_name,industry',
                'segment': 'eq.commercial',
                'industry': f'eq.{ind}',
                'contact_email': 'is.null',
                'limit': '1000', 'offset': str(offset),
                'order': 'estimated_deal_value.desc',
            })
            batch = json.loads(urllib.request.urlopen(
                urllib.request.Request(f'{SB_URL}?{p}', headers=SB_R), timeout=20).read())
            rows.extend(batch)
            if len(batch) < 1000: break
            offset += 1000
    return rows

def sb_patch(rid, patch):
    body = json.dumps(patch).encode()
    urllib.request.urlopen(urllib.request.Request(
        f'{SB_URL}?id=eq.{rid}', data=body, headers=SB_W, method='PATCH'), timeout=15)

def hunter_quota() -> dict:
    res = hunter_get('account', {})
    reqs = (res.get('data') or {}).get('requests', {})
    return {
        'remaining': (reqs.get('searches') or {}).get('remaining', '?'),
        'available': (reqs.get('searches') or {}).get('available', '?'),
    }


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    print(f'{"DRY RUN — " if DRY else ""}Hunter.io enrichment — target industries')

    # Check quota
    q = hunter_quota()
    print(f'Hunter quota: {q["remaining"]} / {q["available"]} searches remaining\n')
    if not DRY and isinstance(q["remaining"], int) and q["remaining"] < 5:
        sys.exit('Insufficient Hunter searches remaining.')

    # Fetch all target records
    rows = sb_fetch_targets()
    # Filter: with website (primary) or without (if --no-website flag)
    with_site    = [r for r in rows if r.get('company_website')]
    without_site = [r for r in rows if not r.get('company_website')]

    print(f'Target records (no email):')
    for ind in TARGET_INDUSTRIES:
        n_site = sum(1 for r in with_site if r.get('industry') == ind)
        n_none = sum(1 for r in without_site if r.get('industry') == ind)
        print(f'  {ind:<28}  {n_site:>3} with website  |  {n_none:>3} without')
    print()

    # ── Pass 1: Domain Search (records with websites) ──────────────────────────
    print('PASS 1 — Domain Search (records with websites)')
    print('─'*55)

    # Deduplicate by domain — one Hunter call per unique domain
    domain_cache: dict[str, dict | None] = {}  # domain → result
    domain_to_records: dict[str, list] = {}

    for r in with_site:
        domain = extract_domain(r['company_website'])
        if not domain:
            continue
        if domain not in domain_to_records:
            domain_to_records[domain] = []
        domain_to_records[domain].append(r)

    print(f'Unique domains: {len(domain_to_records)} (from {len(with_site)} records)')
    print(f'API calls saved by dedup: {len(with_site) - len(domain_to_records)}\n')

    p1_updated = p1_not_found = p1_errors = 0

    for domain, records in domain_to_records.items():
        names = ', '.join(r.get('company_name','') for r in records[:2])
        extra = f' (+{len(records)-2} more)' if len(records) > 2 else ''

        if DRY:
            print(f'  [dry] {domain:<35} → {names}{extra}')
            continue

        result = hunter_domain_search(domain)
        time.sleep(1.1)  # Hunter rate limit: ~1 req/sec

        if result:
            patch = {'contact_email': result['email'], 'email_confidence': result['confidence']}
            if result.get('name'):   patch['contact_name']  = result['name']
            if result.get('title'):  patch['contact_title'] = result['title']
            for r in records:
                try:
                    sb_patch(r['id'], patch)
                    p1_updated += 1
                except Exception as e:
                    p1_errors += 1
                    print(f'    PATCH error {r["id"][:8]}: {e}')
            print(f'  ✓ {domain:<35} → {result["email"]} ({result["confidence"]}%)'
                  f'  [{len(records)} record{"s" if len(records)>1 else ""}]')
        else:
            p1_not_found += len(records)
            print(f'  ✗ {domain:<35} no emails found  [{names}{extra}]')

    print(f'\nPass 1 done: {p1_updated} updated, {p1_not_found} not found, {p1_errors} errors')

    # ── Pass 2: Company Name Lookup (no website, optional) ────────────────────
    if not NO_WEBSITE:
        print('\nRun with --no-website to also try domain lookup by company name for the',
              len(without_site), 'records without websites.')
        print('Pass 2 skipped.')
    else:
        print(f'\nPASS 2 — Company name lookup for {len(without_site)} records without websites')
        print('─'*55)
        p2_updated = p2_not_found = 0

        for r in without_site:
            name = r.get('plant_name') or r.get('company_name') or ''
            if not name:
                p2_not_found += 1
                continue

            if DRY:
                print(f'  [dry] lookup: {name}')
                continue

            domain = hunter_company_lookup(f'{name} Cyprus')
            time.sleep(1.1)

            if not domain:
                p2_not_found += 1
                continue

            result = hunter_domain_search(domain)
            time.sleep(1.1)

            if result:
                patch = {'company_website': f'https://{domain}',
                         'contact_email': result['email'], 'email_confidence': result['confidence']}
                if result.get('name'):  patch['contact_name']  = result['name']
                if result.get('title'): patch['contact_title'] = result['title']
                try:
                    sb_patch(r['id'], patch)
                    p2_updated += 1
                    print(f'  ✓ {name[:40]:40} → {domain} → {result["email"]}')
                except Exception as e:
                    print(f'  PATCH error: {e}')
            else:
                p2_not_found += 1
                print(f'  ✗ {name[:40]:40} → {domain} (no emails)')

        print(f'Pass 2 done: {p2_updated} updated, {p2_not_found} not found')

    # ── Summary ───────────────────────────────────────────────────────────────
    q_after = hunter_quota()
    searches_used = (q["remaining"] if isinstance(q["remaining"], int) else 0) - \
                    (q_after["remaining"] if isinstance(q_after["remaining"], int) else 0)
    print(f'\n{"="*55}')
    print(f'{"DRY RUN — " if DRY else ""}DONE')
    print(f'  Pass 1 (domain): {p1_updated} updated, {p1_not_found} no results')
    print(f'  Hunter searches used: ~{max(0, searches_used)} (quota left: {q_after["remaining"]})')
    print(f'{"="*55}')

if __name__ == '__main__':
    main()
