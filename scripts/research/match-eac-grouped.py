# -*- coding: utf-8 -*-
"""
Extend EAC↔CERA matching to include:
1. Multi-licence per company (sum of MWp per SPV grouped by company name)
2. Multi-licence per director group (same director across multiple SPVs)

Galascope example: 2.5 + 5 = 7.5 MW total → look for EAC entry at 7.5 MW
Easy Power example: potentially 3 licences summing to ~18-20 MW total
"""
import json, sys, io, re
from collections import defaultdict

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

eac_data   = json.load(open('marketing/research/eac-res-systems.json', encoding='utf-8'))
plant_data = json.load(open('marketing/cyprus-energy-plants.json', encoding='utf-8'))

eac_rows   = eac_data['systems']
plants     = plant_data['plants']

def round_mw(kw, dp=3):
    return round(float(kw) / 1000, dp) if kw else 0.0

# ─── Index EAC by MW ─────────────────────────────────────────────────────────
eac_by_mw = defaultdict(list)
for r in eac_rows:
    mw = round(r['capacity_mw'], 3)
    eac_by_mw[mw].append(r)

# ─── Group CERA by company name → sum all licences ───────────────────────────
by_company = defaultdict(list)
for p in plants:
    key = p['company_name'].strip().upper()
    by_company[key].append(p)

# ─── Show known companies ─────────────────────────────────────────────────────
print("=== Licence breakdown for key companies ===\n")
TARGETS = ['EASY POWER', 'GALASCOPE', 'WANERON', 'RENERGETIC', 'ABIO']
for target in TARGETS:
    matches = {k: v for k, v in by_company.items() if target in k}
    for name, rows in sorted(matches.items()):
        total_mw = sum(round_mw(r.get('pv_kw',0)) for r in rows)
        indiv_mw = [round_mw(r.get('pv_kw',0)) for r in rows]
        licences = [r.get('cera_license_no','?') for r in rows]
        eac_match_indiv = [mw for mw in indiv_mw if len(eac_by_mw.get(mw,[])) == 1 and len([p for p in plants if round_mw(p.get('pv_kw',0)) == mw]) == 1]
        eac_match_sum = eac_by_mw.get(round(total_mw, 3), [])
        print(f"{name}")
        print(f"  Licences: {len(rows)} | Individual MW: {indiv_mw} | SUM: {round(total_mw,3)} MW")
        print(f"  CERA refs: {licences}")
        if eac_match_indiv:
            print(f"  EAC individual match(es): {eac_match_indiv} MW")
        if eac_match_sum:
            print(f"  EAC SUM MATCH at {round(total_mw,3)} MW: {[r['municipality']+' POS='+r['pos_issue_date'] for r in eac_match_sum]}")
        else:
            print(f"  EAC sum match at {round(total_mw,3)} MW: NONE")
        # Check near matches (±0.5 MW)
        near = [(mw, eac_by_mw[mw]) for mw in eac_by_mw
                if abs(mw - total_mw) < 0.5 and mw != round(total_mw,3)]
        if near:
            print(f"  Near EAC matches (±0.5 MW):")
            for mw, ers in near:
                print(f"    {mw} MW: {[r['municipality'] for r in ers]}")
        print()

# ─── Broader: find ALL companies with 2+ licences and try sum matching ───────
print("\n=== Companies with multiple CERA licences — EAC sum matching ===\n")
multi = {name: rows for name, rows in by_company.items() if len(rows) >= 2}
print(f"Total SPVs with 2+ licences: {len(multi)}")

sum_matches = []
for name, rows in sorted(multi.items(), key=lambda x: -len(x[1])):
    total_mw = sum(round_mw(r.get('pv_kw',0)) for r in rows)
    total_r = round(total_mw, 3)
    eac_hits = eac_by_mw.get(total_r, [])
    if eac_hits:
        n_cera = len([p for p in plants if round_mw(p.get('pv_kw',0)) == total_r])
        sum_matches.append({
            'company': name,
            'licences': len(rows),
            'individual_mw': [round_mw(r.get('pv_kw',0)) for r in rows],
            'sum_mw': total_r,
            'eac': [{'mun': r['municipality'], 'pos': r['pos_issue_date'], 'ref': r['application_ref']} for r in eac_hits],
            'cera_also_at_sum': n_cera,
            'unique': len(eac_hits) == 1 and n_cera == 0,
        })

print(f"\nCompanies where SUM of licences matches an EAC entry: {len(sum_matches)}")
unique_sum = [m for m in sum_matches if m['unique']]
print(f"Unique (1 EAC entry, no other CERA company at same MW): {len(unique_sum)}\n")

for m in sum_matches:
    flag = " <-- UNIQUE" if m['unique'] else ""
    print(f"  {m['company']}")
    print(f"    {m['licences']} licences: {m['individual_mw']} = {m['sum_mw']} MW{flag}")
    for e in m['eac']:
        print(f"    EAC: {e['mun']:20} POS={e['pos']:12} ref={e['ref']}")
    print()

# Save results
out = {
    'sum_matches': sum_matches,
    'unique_sum_matches': unique_sum,
    'total_multi_licence_spvs': len(multi),
}
import json as J
open('marketing/research/eac-cera-grouped-matches.json','w').write(J.dumps(out, indent=2, ensure_ascii=False))
print("Saved to marketing/research/eac-cera-grouped-matches.json")
