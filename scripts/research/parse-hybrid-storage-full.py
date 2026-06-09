# -*- coding: utf-8 -*-
"""
Full parse + CRM matching of Hybrid Storage - List of PV plants & owners.pdf
Extracts: owner/contact name, SPV name, district, installed PV MW,
          BESS 2025 orders (MW/MWh), BESS 2026-28 orders (MW/MWh/quarter).
Then cross-references against CERA plants JSON and CRM prospects.
"""
import sys, io, re, json
from pathlib import Path
from collections import defaultdict
import urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

try:
    import pdfplumber
except ImportError:
    print("pip install pdfplumber"); exit(1)

REPO = Path(__file__).resolve().parents[2]
PDF  = Path(r"L:\My Drive\LINYANG\BESS CLIENTS\GROUP ORDER CY\Group2_Esperia_Energy\Esperia Energy Group\Hybrid Storage - List of PV plants & owners.pdf")
PLANTS_JSON = REPO / 'marketing' / 'cyprus-energy-plants.json'
OUT = REPO / 'marketing' / 'research' / 'hybrid-storage-full.json'

# ─── Load reference data ─────────────────────────────────────────────────────
plants = json.load(open(PLANTS_JSON, encoding='utf-8'))['plants']

def nm(s): return re.sub(r'[^A-Z0-9]', '', str(s).upper())

by_norm = {}
for p in plants:
    key = nm(p['company_name'])
    by_norm[key] = p
    # Also index shorter tokens
    words = re.sub(r'[^A-Z\s]','',p['company_name'].upper()).split()
    if len(words) >= 2:
        short = ''.join(words[:3])
        if short not in by_norm:
            by_norm[short] = p

def match_cera(name):
    n = nm(name)
    if n in by_norm: return by_norm[n]
    # Try partial
    for k, p in by_norm.items():
        if len(n) > 6 and (n in k or k in n):
            return p
    # Token match: 3+ consecutive words
    words = re.findall(r'[A-Z]{3,}', name.upper())
    if len(words) >= 2:
        pattern = ''.join(words[:2])
        for k, p in by_norm.items():
            if pattern in k:
                return p
    return None

def parse_mw(s):
    if not s: return None
    try: return float(str(s).replace(',','.').replace(' ',''))
    except: return None

# ─── Parse PDF table ─────────────────────────────────────────────────────────
print(f"Parsing: {PDF.name}\n")
entries = []
current_owner = None

with pdfplumber.open(PDF) as pdf:
    page = pdf.pages[0]
    tables = page.extract_tables()
    if tables:
        table = tables[0]
        print(f"Table: {len(table)} rows x {max(len(r) for r in table if r)} cols\n")
        # Columns: 0=owner, 1=company, 2=district, 3=pv_mw_dc
        #          4=bess25_mw, 5=bess25_mwh, 6=bess2628_mw, 7=bess2628_mwh, 8=order_quarter
        for row in table[3:]:  # skip header rows
            if not row or not any(c for c in row if c):
                continue
            owner_cell   = (row[0] or '').strip()
            company_cell = (row[1] or '').strip()
            district     = (row[2] or '').strip()
            pv_mw        = parse_mw(row[3]) if len(row)>3 else None
            bess25_mw    = parse_mw(row[4]) if len(row)>4 else None
            bess25_mwh   = parse_mw(row[5]) if len(row)>5 else None
            bess28_mw    = parse_mw(row[6]) if len(row)>6 else None
            bess28_mwh   = parse_mw(row[7]) if len(row)>7 else None
            order_q      = (row[8] or '').strip() if len(row)>8 else ''

            # Owner persists across rows
            if owner_cell:
                current_owner = owner_cell

            if not company_cell or company_cell in ['Company name','']:
                continue

            # Split owner name and contact (often "Group Name\nContact Person")
            owner_parts = (current_owner or '').split('\n')
            owner_group = owner_parts[0].strip() if owner_parts else current_owner
            contact_name = owner_parts[1].strip() if len(owner_parts) > 1 else None
            # Also extract from combined cell
            if not contact_name and current_owner:
                lines = current_owner.splitlines()
                if len(lines) >= 2:
                    owner_group = lines[0].strip()
                    contact_name = lines[1].strip()

            cera = match_cera(company_cell)

            entry = {
                'owner_group':   owner_group,
                'contact_name':  contact_name,
                'company_name':  company_cell,
                'district':      district,
                'pv_mw_dc':      pv_mw,
                'bess_2025_mw':  bess25_mw,
                'bess_2025_mwh': bess25_mwh,
                'bess_2028_mw':  bess28_mw,
                'bess_2028_mwh': bess28_mwh,
                'order_quarter': order_q,
                'cera_match':    cera['company_name'] if cera else None,
                'cera_mwp':      round((cera.get('pv_kw') or 0)/1000,3) if cera else None,
                'cera_district': cera.get('district_en') if cera else None,
                'cera_status':   cera.get('license_status') if cera else None,
            }
            entries.append(entry)

# ─── Print full table ─────────────────────────────────────────────────────────
print("="*80)
print(f"{'Owner / Group':30} {'Contact':22} {'SPV Name':35} {'Dist':12} {'PV MW':6} {'BESS25':7} {'BESS28':7} {'Q':8}")
print("-"*80)
for e in entries:
    owner = (e['owner_group'] or '')[:28]
    contact = (e['contact_name'] or '')[:20]
    company = e['company_name'][:33]
    pv = f"{e['pv_mw_dc']:.2f}" if e['pv_mw_dc'] else '—'
    b25 = f"{e['bess_2025_mwh']:.0f}MWh" if e['bess_2025_mwh'] else ('...' if e['bess_2025_mw'] else '—')
    b28 = f"{e['bess_2028_mwh']:.0f}MWh" if e['bess_2028_mwh'] else '—'
    q = e['order_quarter'] or '—'
    match_flag = ' ✓' if e['cera_match'] else ''
    print(f"{owner:30} {contact:22} {company:35} {e['district']:12} {pv:6} {b25:7} {b28:7} {q:8}{match_flag}")

# ─── Summary by owner group ───────────────────────────────────────────────────
print("\n\n=== BY OWNER / GROUP ===\n")
by_owner = defaultdict(list)
for e in entries:
    by_owner[e['owner_group'] or 'Unknown'].append(e)

for owner, items in sorted(by_owner.items()):
    total_pv = sum(e['pv_mw_dc'] or 0 for e in items)
    total_b25 = sum(e['bess_2025_mwh'] or 0 for e in items)
    total_b28 = sum(e['bess_2028_mwh'] or 0 for e in items)
    contacts = list(dict.fromkeys(e['contact_name'] for e in items if e['contact_name']))
    cera_matches = [e for e in items if e['cera_match']]
    print(f"  {owner}")
    if contacts: print(f"    Contact: {', '.join(contacts)}")
    print(f"    SPVs: {len(items)} | Total PV: {total_pv:.2f} MW | BESS 2025: {total_b25:.0f} MWh | BESS 2026-28: {total_b28:.0f} MWh")
    for e in items:
        b = ''
        if e['bess_2025_mwh']: b += f" | BESS 2025: {e['bess_2025_mwh']:.0f} MWh"
        if e['bess_2028_mwh']: b += f" | BESS 2026-28: {e['bess_2028_mwh']:.0f} MWh ({e['order_quarter']})"
        print(f"    - {e['company_name']:40} {e['district']:12} {e['pv_mw_dc'] or 0:.2f} MW{b}")
    print(f"    CERA matched: {len(cera_matches)}/{len(items)}")
    print()

# ─── Companies NOT in our CERA data ──────────────────────────────────────────
print("\n=== SPVs in PDF but NO CERA match (need to look up) ===\n")
no_match = [e for e in entries if not e['cera_match']]
for e in no_match:
    b = ''
    if e['bess_2025_mwh'] or e['bess_2028_mwh']:
        b = f" → BESS intent: {e['bess_2025_mwh'] or 0:.0f}+{e['bess_2028_mwh'] or 0:.0f} MWh"
    print(f"  {e['company_name']:45} {e['district']:12} {e['pv_mw_dc'] or 0:.2f} MW{b}")

# ─── BESS pipeline from PDF ───────────────────────────────────────────────────
print("\n\n=== BESS PIPELINE from PDF ===\n")
has_bess = [e for e in entries if (e['bess_2025_mwh'] or 0) + (e['bess_2028_mwh'] or 0) > 0]
total_bess_mwh = sum((e['bess_2025_mwh'] or 0) + (e['bess_2028_mwh'] or 0) for e in has_bess)
print(f"SPVs with BESS intent: {len(has_bess)} | Total BESS MWh pipeline: {total_bess_mwh:.0f} MWh\n")
for e in sorted(has_bess, key=lambda x: -((x['bess_2025_mwh'] or 0)+(x['bess_2028_mwh'] or 0))):
    mwh = (e['bess_2025_mwh'] or 0) + (e['bess_2028_mwh'] or 0)
    print(f"  {e['company_name']:45} {mwh:6.0f} MWh  {e['order_quarter'] or ''}")

# ─── Save ────────────────────────────────────────────────────────────────────
OUT.write_text(json.dumps({'entries': entries, 'total_entries': len(entries)}, indent=2, ensure_ascii=False), encoding='utf-8')
print(f"\nSaved {len(entries)} entries to {OUT}")
