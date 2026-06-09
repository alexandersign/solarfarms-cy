# -*- coding: utf-8 -*-
"""
Parse the Hybrid Storage - List of PV plants & owners.pdf
Cross-reference against our CERA plants JSON and CRM prospects.
"""
import sys, io, re, json
from pathlib import Path
from collections import defaultdict

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

try:
    import pdfplumber
except ImportError:
    print("pip install pdfplumber"); exit(1)

REPO = Path(__file__).resolve().parents[2]
PDF  = Path(r"L:\My Drive\LINYANG\BESS CLIENTS\GROUP ORDER CY\Group2_Esperia_Energy\Esperia Energy Group\Hybrid Storage - List of PV plants & owners.pdf")
PLANTS_JSON = REPO / 'marketing' / 'cyprus-energy-plants.json'
OUT = REPO / 'marketing' / 'research' / 'hybrid-storage-pdf-matches.json'

print(f"Reading: {PDF.name}")

# ─── Parse PDF ───────────────────────────────────────────────────────────────
all_rows = []
raw_text_pages = []

with pdfplumber.open(PDF) as pdf:
    print(f"Pages: {len(pdf.pages)}")
    for i, page in enumerate(pdf.pages):
        text = page.extract_text() or ''
        tables = page.extract_tables() or []
        raw_text_pages.append(text)

        print(f"\n--- Page {i+1} ({len(tables)} tables) ---")
        if tables:
            for ti, table in enumerate(tables):
                print(f"  Table {ti+1}: {len(table)} rows x {max(len(r) for r in table if r) if table else 0} cols")
                for row in table[:8]:
                    cleaned = [re.sub(r'\s+', ' ', str(c or '')).strip() for c in row]
                    if any(c for c in cleaned):
                        print(f"    {cleaned}")
                        all_rows.append(cleaned)
        elif text:
            print(f"  Text ({len(text)} chars):")
            print(text[:800])

# ─── Load CERA plants for matching ───────────────────────────────────────────
plants = json.load(open(PLANTS_JSON, encoding='utf-8'))['plants']

def normalize(s):
    return re.sub(r'[^A-Za-z0-9\u0370-\u03FF\u1F00-\u1FFF]', '', str(s).upper())

# Build name index
by_name  = {normalize(p['company_name']): p for p in plants}
by_mw    = defaultdict(list)
for p in plants:
    mw = round((p.get('pv_kw') or 0) / 1000, 2)
    if mw > 0:
        by_mw[mw].append(p)

# ─── Try to extract companies and MWs from PDF text ─────────────────────────
print("\n\n=== Extracted company names / MW values ===\n")
company_pattern = re.compile(r'([A-Z][A-Z\s\-\.&]{3,60}(?:LTD|LIMITED|LLC|SA|S\.A\.|ENERGY|SOLAR|POWER|PV|PARK|ENTERPRISES)[^\n]{0,20})', re.IGNORECASE)
mw_pattern = re.compile(r'(\d[\d\.,]+)\s*(MW[ph]?|kW[ph]?)', re.IGNORECASE)

full_text = '\n'.join(raw_text_pages)
companies_found = []
for m in company_pattern.finditer(full_text):
    name = re.sub(r'\s+', ' ', m.group(1)).strip()
    if 5 < len(name) < 100:
        companies_found.append(name)

companies_found = list(dict.fromkeys(companies_found))
print(f"Company-like names found: {len(companies_found)}")
for c in companies_found:
    print(f"  {c}")

print(f"\nMW values found:")
for m in mw_pattern.finditer(full_text):
    val_str = m.group(1).replace(',','.')
    try:
        val = float(val_str)
        unit = m.group(2).upper()
        if 'K' in unit: val /= 1000
        context = full_text[max(0, m.start()-40):m.end()+40].replace('\n',' ')
        print(f"  {val} MW — context: ...{context}...")
    except: pass

# ─── Match against CERA ───────────────────────────────────────────────────────
print("\n\n=== CERA matches ===\n")
matches = []
for name in companies_found:
    norm = normalize(name)
    cera = by_name.get(norm)
    if not cera:
        # Fuzzy: check if any CERA name contains our extracted name or vice versa
        for cname, plant in by_name.items():
            if len(norm) > 6 and (norm in cname or cname in norm):
                cera = plant
                break
    if cera:
        matches.append({'pdf_name': name, 'cera_name': cera['company_name'],
                        'mwp': round((cera.get('pv_kw') or 0)/1000,3),
                        'district': cera.get('district_en',''),
                        'status': cera.get('license_status','')})
        print(f"  MATCH: {name}")
        print(f"    CERA: {cera['company_name']} | {round((cera.get('pv_kw',0) or 0)/1000,3)} MWp | {cera.get('district_en','')} | {cera.get('license_status','')}")

print(f"\n{len(matches)} CERA matches from {len(companies_found)} PDF names\n")

# Save
OUT.write_text(json.dumps({
    'pdf': str(PDF.name),
    'companies_in_pdf': companies_found,
    'all_table_rows': all_rows[:200],
    'cera_matches': matches,
}, indent=2, ensure_ascii=False), encoding='utf-8')
print(f"Saved to {OUT}")
