import csv, re
from collections import defaultdict
from datetime import datetime

path = r"c:\Users\alexa\code\solinvest\financial\statements\TransactionHistory_master_boc.csv"

def parse_amount(s):
    if not s or not str(s).strip(): return 0.0
    s = str(s).strip().replace(".", "").replace(",", ".")
    return float(s)

staff_marketing_names = [
    ("ANASTASIA TALALOVA", "Staff — Anastasia Talalova"),
    ("TATIANA IOANNOU", "Staff — Tatiana Ioannou"),
    ("CHRISTOS NIKOLAOU", "Staff — Christos Nikolaou"),
    ("COMISSION ELENA", "Staff — Talalova (commission line)"),
]

rows = []
with open(path, encoding="utf-8", errors="replace") as f:
    for r in csv.reader(f):
        if len(r) < 7 or not re.match(r"^\d{2}/\d{2}/\d{4}$", r[0].strip()):
            continue
        debit = parse_amount(r[4])
        if debit <= 0:
            continue
        rows.append((datetime.strptime(r[0], "%d/%m/%Y"), r[1], debit))

def classify(desc):
    d = desc.upper()
    for needle, label in staff_marketing_names:
        if needle in d:
            return label
    if "GOOGLE ADS" in d:
        return "Marketing — Google Ads (direct)"
    if "FACEBK" in d:
        return "Marketing — Facebook/Meta (direct)"
    if "HYGGE" in d:
        return "Marketing — Hygge (Meta ads agency)"
    return None

by = defaultdict(float)
items = defaultdict(list)
for dt, desc, amt in rows:
    c = classify(desc)
    if c:
        by[c] += amt
        items[c].append((dt, amt, desc[:85]))

print("=== RECLASSIFIED: STAFF vs PURE MARKETING ===\n")
staff_total = sum(v for k, v in by.items() if k.startswith("Staff"))
mkt_total = sum(v for k, v in by.items() if k.startswith("Marketing"))

for k in sorted(by.keys()):
    print(f"{by[k]:>10,.2f}  {k}")

print(f"\nStaff (Talalova + Tatiana + Christos):  EUR {staff_total:,.2f}")
print(f"Pure marketing (Google + FB + Hygge):   EUR {mkt_total:,.2f}")
print(f"  Google direct:                        EUR {by.get('Marketing — Google Ads (direct)', 0):,.2f}")
print(f"  Facebook/Meta direct:                 EUR {by.get('Marketing — Facebook/Meta (direct)', 0):,.2f}")
print(f"  Hygge agency:                         EUR {by.get('Marketing — Hygge (Meta ads agency)', 0):,.2f}")

print("\n=== GOOGLE ADS LINE ITEMS ===")
for dt, amt, desc in sorted(items.get("Marketing — Google Ads (direct)", []), key=lambda x: x[0]):
    print(f"  {dt.strftime('%Y-%m-%d')}  {amt:>8,.2f}")

print("\n=== FACEBOOK DIRECT (sample monthly-ish) ===")
fb = items.get("Marketing — Facebook/Meta (direct)", [])
print(f"  {len(fb)} card charges, total {by.get('Marketing — Facebook/Meta (direct)', 0):,.2f}")

print("\n=== HYGGE AGENCY ===")
for dt, amt, desc in sorted(items.get("Marketing — Hygge (Meta ads agency)", []), key=lambda x: x[0]):
    print(f"  {dt.strftime('%Y-%m-%d')}  {amt:>8,.2f}  {desc}")
