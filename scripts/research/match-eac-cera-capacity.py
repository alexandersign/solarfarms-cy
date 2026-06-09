"""
Match EAC RES connection terms data against CERA plant licences by exact MW capacity.
Decimal-precise capacities (e.g. 7.29 MW, 5.34 MW) are highly unique identifiers.
"""
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

eac_data = json.load(open('marketing/research/eac-res-systems.json', encoding='utf-8'))
plants_data = json.load(open('marketing/cyprus-energy-plants.json', encoding='utf-8'))

eac_rows = eac_data['systems']
cera_plants = plants_data['plants']

# Index EAC by capacity_mw (3dp)
eac_by_mw = {}
for r in eac_rows:
    mw = round(r['capacity_kw'] / 1000, 3)
    eac_by_mw.setdefault(mw, []).append(r)

# Index CERA by capacity MW (3dp)
cera_by_mw = {}
for p in cera_plants:
    kw = p.get('pv_kw') or 0
    if not kw:
        continue
    mw = round(float(kw) / 1000, 3)
    cera_by_mw.setdefault(mw, []).append(p)

print("=== EAC capacity vs CERA matches (Limassol PDF only) ===\n")

matches = []
no_match = []
for mw in sorted(eac_by_mw.keys()):
    eac = eac_by_mw[mw]
    cera = cera_by_mw.get(mw, [])
    if cera:
        matches.append((mw, eac, cera))
    else:
        no_match.append((mw, eac))

print(f"EAC rows: {len(eac_rows)}  |  Distinct MW values: {len(eac_by_mw)}")
print(f"Matched MW values: {len(matches)}  |  Unmatched: {len(no_match)}")
print()

unique_matches = [(mw, e, c) for mw, e, c in matches if len(e) == 1 and len(c) == 1]
print(f"=== UNIQUE 1:1 matches ({len(unique_matches)}) ===")
for mw, e, c in unique_matches:
    erow = e[0]
    crow = c[0]
    print(f"  {mw:.3f} MW")
    print(f"    EAC:  {erow['municipality']:20s}  POS={erow.get('pos_issue_date','?'):12s}  app={erow['application_ref']}")
    print(f"    CERA: {crow['company_name'][:50]:50s}  dist={crow.get('district_en','?')}")
    print()

print(f"=== ALL matches by MW (including multi-match) ===")
for mw, e, c in matches:
    flag = "UNIQUE" if len(e) == 1 and len(c) == 1 else f"EAC:{len(e)} x CERA:{len(c)}"
    muns = ", ".join(set(r['municipality'] for r in e))
    dists = ", ".join(set(p.get('district_en','?') for p in c))
    print(f"  {mw:.3f} MW  [{flag}]  EAC mun: {muns}  |  CERA dist: {dists}")

print()
print("=== EAC rows with NO CERA match ===")
for mw, e in no_match:
    for r in e:
        print(f"  {mw:.3f} MW  {r['municipality']:20s}  app={r['application_ref']}")
