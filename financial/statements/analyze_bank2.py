import csv, re
from collections import defaultdict
from datetime import datetime

path = r"c:\Users\alexa\code\solinvest\financial\statements\TransactionHistory_1778844425612.csv"

def parse_amount(s):
    if not s or not str(s).strip(): return 0.0
    s = str(s).strip().strip('"').replace(".", "").replace(",", ".")
    return float(s)

def cat(desc):
    d = desc.upper()
    rules = [
        ("Trikkis / kit (SAL ref)", lambda: "SAL00" in d or "DAS PINAK" in d or "DOROS KASSIN" in d),
        ("Trikkis / kit (Solvest installs)", lambda: "SOLVEST" in d),
        ("Interco / Poland (Lighthief SP)", lambda: "LIGHTHIEF SP" in d or "FAKTURA V" in d),
        ("Internal account transfers", lambda: "PAYMENT ON LIGHTHIEF CYPRUS" in d or "PAYMENT TOWARDS LIGHTHIEF CYPRUS" in d),
        ("Payroll — Alexander", lambda: "ALEX" in d and ("SALARY" in d or "SALLARY" in d)),
        ("Payroll — Costas", lambda: "COSTAS" in d),
        ("Payroll — Zinovia / Novia", lambda: "ZINO" in d or "EFESOPOULOU" in d),
        ("Payroll — Andreas Christoforou", lambda: "ANDREAS CHRIST" in d),
        ("Payroll — Chilat (Jihat)", lambda: "CHIAT" in d or "JIHA" in d or "CHILAT" in d),
        ("Sales commissions (Talalova etc)", lambda: "ANASTASIA TALALOVA" in d or "TATIANA IOANNOU" in d or "COMISSION" in d or "COMMISSION" in d),
        ("Advertising — Hygge/Meta agency", lambda: "HYGGE" in d),
        ("Advertising — Meta/Facebook direct", lambda: "FACEBK" in d),
        ("Advertising — Google Ads", lambda: "GOOGLE ADS" in d),
        ("VAT / Tax payments", lambda: "TFA PORTAL-TAX" in d),
        ("Consulting — Christos Nikolaou", lambda: "CHRISTOS NIKOLAOU" in d),
        ("Consulting — GRS recruitment", lambda: "GRS PROFESSIONAL" in d),
        ("Revolut (kit/subs/cards)", lambda: "REVOLUT" in d),
        ("Subcontractors / site", lambda: any(x in d for x in ["DOMESCA", "FOTSIOS", "KAFKAS", "ELECTRICAL", "FORKLIFT", "RED STORM", "MARITA KARPETTA"])),
        ("Damir / Greenland", lambda: "GREENLAND" in d),
        ("EAC / admin fees", lambda: "EAC(" in d or "EASY PRINT" in d),
        ("Software / SaaS", lambda: any(x in d for x in ["INTUIT", "OPENAI", "CURSOR", "CANVA", "ADOBE"])),
        ("Fuel", lambda: "ESSO" in d or "CORAL" in d),
    ]
    for name, fn in rules:
        if fn():
            return name
    return "Other (cards, small suppliers, fees)"

rows = []
with open(path, encoding="utf-8", errors="replace") as f:
    for r in csv.reader(f):
        if len(r) < 7 or not re.match(r"^\d{2}/\d{2}/\d{4}$", r[0].strip()):
            continue
        rows.append((datetime.strptime(r[0], "%d/%m/%Y"), r[1], parse_amount(r[4]), parse_amount(r[5])))

by_cat = defaultdict(float)
credits = 0
for dt, desc, debit, credit in rows:
    credits += credit
    if debit > 0:
        by_cat[cat(desc)] += debit

total_out = sum(by_cat.values())
print("BANK: Aug 2025 - May 2026")
print(f"Total OUT: EUR {total_out:,.2f}")
print(f"Total IN:  EUR {credits:,.2f}")
print(f"Net:       EUR {credits-total_out:,.2f}\n")
print("ACTUAL SPEND BY CATEGORY")
for c, a in sorted(by_cat.items(), key=lambda x: -x[1]):
    print(f"  {a:>10,.2f}  ({100*a/total_out:5.1f}%)  {c}")

# Group into buckets
buckets = {
    "People (payroll + recruitment)": sum(by_cat[k] for k in by_cat if k.startswith("Payroll") or "GRS" in k),
    "Kit / installs / Trikkis / Solvest": sum(by_cat[k] for k in by_cat if "Trikkis" in k or "Solvest" in k or "Revolut" in k),
    "Sales & marketing (ads + commissions)": sum(by_cat[k] for k in by_cat if "Advertising" in k or "Sales comm" in k),
    "Professional / consulting": sum(by_cat[k] for k in by_cat if "Consulting" in k),
    "Tax (VAT)": by_cat.get("VAT / Tax payments", 0),
    "Interco / internal / Poland": sum(by_cat[k] for k in by_cat if "Interco" in k or "Internal" in k),
    "Site subs & materials": sum(by_cat[k] for k in by_cat if "Subcontractors" in k or "Damir" in k or "EAC" in k),
    "Other": sum(by_cat[k] for k in by_cat if k == "Other (cards, small suppliers, fees)" or "Software" in k or "Fuel" in k),
}
print("\nROLLED UP")
for b, a in sorted(buckets.items(), key=lambda x: -x[1]):
    print(f"  {a:>10,.2f}  ({100*a/total_out:5.1f}%)  {b}")
