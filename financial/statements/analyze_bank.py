import csv
import re
from collections import defaultdict
from datetime import datetime

path = r"c:\Users\alexa\code\solinvest\financial\statements\TransactionHistory_1778844425612.csv"


def parse_amount(s):
    if not s or not str(s).strip():
        return 0.0
    s = str(s).strip().strip('"')
    if re.match(r"^-?\d+\.\d{2}$", s.replace(",", "")):
        return float(s.replace(",", ""))
    s = s.replace(".", "").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def categorize(desc, tx_type):
    d = desc.upper()
    if "SAL00" in d or "TRIKKIS" in d or "DAS PINAK" in d or "DOROS KASSIN" in d:
        return "Trikkis / kit (SAL invoices)"
    if "SALARY" in d or "SALARY" in d or "ZINO" in d or "COSTAS" in d or "ALEX" in d and "SALARY" in d:
        return "Payroll / salaries"
    if "COSTAS" in d:
        return "Payroll / salaries"
    if "JIHA" in d or "CHIAT" in d or "CHILAT" in d:
        return "Payroll / subcontractors (Chilat)"
    if "ANDREAS CHRIST" in d:
        return "Payroll / salaries"
    if "CHRISTOS NIKOLAOU" in d or "CONSULTING" in d:
        return "Consulting / professional"
    if "FACEBK" in d or "GOOGLE ADS" in d:
        return "Advertising (Meta/Google)"
    if "REVOLUT" in d:
        return "Revolut transfers (often kit/subs)"
    if "DOMESCA" in d or "FORKLIFT" in d or "NIKOS FOTSIOS" in d or "FOTSIOS" in d:
        return "Subcontractors / site costs"
    if "EAC(" in d or "EASY PRINT" in d:
        return "EAC / admin fees"
    if "INTUIT" in d or "OPENAI" in d or "CURSOR" in d or "CANVA" in d or "ADOBE" in d:
        return "Software / SaaS"
    if "ESSO" in d or "CORAL" in d or "PURCHASE CY" in d and ("CARD" in d):
        if "ESSO" in d or "CORAL" in d or "PETROL" in d:
            return "Fuel / cars"
    if "PURCHASE" in tx_type.upper() or "CARD" in tx_type.upper():
        if "ESSO" in d or "CORAL" in d:
            return "Fuel / cars"
        return "Card purchases (misc)"
    if "COMMISSION" in tx_type.upper() or "FEE" in d:
        return "Bank fees"
    if "SOCIAL" in d or "GRSI" in d:
        return "Social insurance"
    if "SETTLEMENT OF INVOICE" in d or "PAYMENT OF INVOICE" in d:
        return "Supplier invoices (general)"
    if "TIPS OUTWARD" in tx_type.upper() or "BOC TRANSFER" in tx_type.upper() and "DEBIT" in d.upper():
        return "Outward transfers (review)"
    if "ATM" in tx_type.upper():
        return "ATM cash"
    if "CHEQUE" in tx_type.upper() and "DEPOSIT" not in tx_type.upper():
        return "Cheque payments"
    return "Other transfers / uncategorized"


rows = []
with open(path, encoding="utf-8", errors="replace") as f:
    reader = csv.reader(f)
    for r in reader:
        if len(r) < 7:
            continue
        if not re.match(r"^\d{2}/\d{2}/\d{4}$", r[0].strip()):
            continue
        dt = datetime.strptime(r[0].strip(), "%d/%m/%Y")
        desc = r[1]
        tx_type = r[2] if len(r) > 2 else ""
        debit = parse_amount(r[4]) if len(r) > 4 else 0
        credit = parse_amount(r[5]) if len(r) > 5 else 0
        rows.append((dt, desc, tx_type, debit, credit))

rows.sort(key=lambda x: x[0])
min_d, max_d = rows[0][0], rows[-1][0]

total_debit = sum(d for _, _, _, d, _ in rows)
total_credit = sum(c for _, _, _, _, c in rows)

by_cat = defaultdict(float)
by_month = defaultdict(lambda: {"in": 0, "out": 0})
trikkis_lines = []
salary_lines = []
large_out = []

for dt, desc, tx_type, debit, credit in rows:
    ym = dt.strftime("%Y-%m")
    by_month[ym]["in"] += credit
    by_month[ym]["out"] += debit
    if debit > 0:
        cat = categorize(desc, tx_type)
        by_cat[cat] += debit
        if "SAL00" in desc.upper() or "DAS PINAK" in desc.upper() or "DOROS" in desc.upper():
            trikkis_lines.append((dt, debit, desc[:80]))
        if "SALARY" in desc.upper() or "COSTAS" in desc.upper() or "ZINO" in desc.upper():
            salary_lines.append((dt, debit, desc[:80]))
        if debit >= 2000:
            large_out.append((dt, debit, desc[:90], categorize(desc, tx_type)))

print(f"Period: {min_d.date()} to {max_d.date()}")
print(f"Transactions: {len(rows)}")
print(f"Total OUT: {total_debit:,.2f}")
print(f"Total IN:  {total_credit:,.2f}")
print(f"Net:       {total_credit - total_debit:,.2f}")
print()
print("=== SPEND BY CATEGORY ===")
for cat, amt in sorted(by_cat.items(), key=lambda x: -x[1]):
    pct = 100 * amt / total_debit if total_debit else 0
    print(f"{amt:>12,.2f}  ({pct:5.1f}%)  {cat}")

print()
print("=== MONTHLY CASH FLOW ===")
for ym in sorted(by_month.keys()):
    m = by_month[ym]
    print(f"{ym}  IN {m['in']:>10,.2f}  OUT {m['out']:>10,.2f}  NET {m['in']-m['out']:>10,.2f}")

print()
print("=== TOP 25 OUTFLOWS ===")
for dt, amt, desc, cat in sorted(large_out, key=lambda x: -x[1])[:25]:
    print(f"{dt.strftime('%Y-%m-%d')}  {amt:>10,.2f}  [{cat}]  {desc}")

print()
print("=== TRIKKIS / SAL INVOICE PAYMENTS ===")
trikkis_total = sum(a for _, a, _ in trikkis_lines)
print(f"Count: {len(trikkis_lines)}  Total: {trikkis_total:,.2f}")
for dt, amt, desc in sorted(trikkis_lines, key=lambda x: -x[1])[:20]:
    print(f"  {dt.strftime('%Y-%m-%d')}  {amt:>10,.2f}  {desc}")

print()
print("=== SALARY PAYMENTS ===")
sal_total = sum(a for _, a, _ in salary_lines)
print(f"Count: {len(salary_lines)}  Total: {sal_total:,.2f}")
