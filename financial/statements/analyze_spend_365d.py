import csv
import re
from collections import defaultdict
from datetime import datetime, timedelta

path = r"c:\Users\alexa\code\solinvest\financial\statements\TransactionHistory_1778844425612.csv"

def parse_amount(s):
    if not s or not str(s).strip():
        return 0.0
    s = str(s).strip().replace(".", "").replace(",", ".")
    return float(s)

def categorize(desc, tx_type):
    d = desc.upper()
    t = tx_type.upper()

    # Staff / payroll
    if any(x in d for x in [
        "SALARY", "SALLARY", "ZINO", "COSTAS", "ALEX SALARY", "ALEX SALARY",
        "SALARY JANUARY", "EFESOPOULOU", "ANDREAS CHRIST", "CHRISTOFOROU",
        "CHIAT ERTUGRUL", "JIHA", "CHILAT", "GRS PROFESSIONAL",
    ]) or (("ALEX" in d or "ALEXANDER" in d) and "SALARY" in d):
        return "Staff / payroll"
    if "DEBIT ALEX" in d and "SALARY" not in d and "CREDIT" not in d:
        if "SALARY" in d or "SALLARY" in d:
            return "Staff / payroll"
        # generic "Debit Alex" 1000 - treat as director draw unless salary labeled
        if re.search(r"DEBIT ALEX[^A-Z]", d) or d.endswith("DEBIT ALEX"):
            return "Staff / payroll (Alex — unlabeled)"

    # Named staff invoices
    if "ANASTASIA TALALOVA" in d or "TATIANA IOANNOU" in d:
        return "Staff / sales (Talalova, Tatiana)"
    if "CHRISTOS NIKOLAOU" in d:
        return "Staff / consulting (Chris)"
    if "MARITA KARPETTA" in d:
        return "Staff / production (video)"

    # Subcontractors / site
    if any(x in d for x in [
        "DOMESCA", "FOTSIOS", "KAFKAS", "ELECTRICAL", "FORKLIFT",
        "PANAYI ELECTRICAL", "NIKOS FOTSIOS", "RED STORM",
        "SOLVEST", "GREENLAND REFERRAL", "COMISSION", "COMMISSION",
    ]):
        return "Subcontractors / site / install"

    # Trikkis / kit
    if "SAL00" in d or "DAS PINAK" in d or "DOROS KASSIN" in d:
        return "Trikkis / kit (SAL invoices)"
    if "REVOLUT" in d:
        if "CARDTXNADMIN" in d:
            return "Bank & card fees"
        return "Founder draw (Revolut top-up)"

    # Marketing
    if "FACEBK" in d or "GOOGLE ADS" in d:
        return "Marketing — ads (Meta/Google direct)"
    if "HYGGE" in d:
        return "Marketing — agency (Hygge/Meta mgmt)"

    # AI / software / SaaS
    if any(x in d for x in ["OPENAI", "CURSOR", "CHATGPT"]):
        return "AI tools (OpenAI, Cursor)"
    if any(x in d for x in ["INTUIT", "QBOOKS", "CANVA", "ADOBE"]):
        return "Software / SaaS"
    if "QUICKBOOK" in d:
        return "Software / SaaS"

    # Tax / VAT
    if "TFA PORTAL-TAX" in d or "TAX DEPARTME" in d:
        return "Tax / VAT (portal)"

    # Interco / Poland / internal
    if "LIGHTHIEF SP" in d or "FAKTURA V" in d:
        return "Interco — Poland (Lighthief SP)"
    if "PAYMENT ON LIGHTHIEF CYPRUS" in d or "PAYMENT TOWARDS LIGHTHIEF CYPRUS" in d:
        return "Internal transfers"
    if "ANASTASIA TALALOVA" not in d and "SOLVEST" in d:
        return "Subcontractors / site / install"

    # EAC / admin fees
    if "EAC(" in d or "EASY PRINT" in d:
        return "EAC / permit admin fees"

    # Professional / other consultants
    if "CONSULTING" in d:
        return "Staff / consulting (Chris)"

    # Bank / card fees
    if "COMMISSION" in t or "CARDTXNADMIN" in d or "MAINTENANCE FEES" in d:
        return "Bank & card fees"

    # Fuel / travel
    if any(x in d for x in ["ESSO", "CORAL", "PETROL"]):
        return "Fuel"
    if "WOLT" in d or "JUMBO" in d or "LACALETA" in d:
        return "Office / meals / misc card"

    # Supplier invoices generic
    if "SETTLEMENT OF INVOICE" in d or "PAYMENT OF INVOICE" in d:
        return "Suppliers (other invoices)"

    # ATM
    if "ATM CASH" in t:
        return "ATM / cash"

    # Card purchases catch-all
    if "PURCHASE" in t or "CARD PURCHASE" in t:
        return "Card purchases (misc)"

    if "TIPS OUTWARD" in t or "BOC TRANSFER" in t and "DEBIT" in d:
        return "Transfers (uncategorized)"

    return "Other / uncategorized"

rows = []
with open(path, encoding="utf-8", errors="replace") as f:
    for r in csv.reader(f):
        if len(r) < 7 or not re.match(r"^\d{2}/\d{2}/\d{4}$", r[0].strip()):
            continue
        dt = datetime.strptime(r[0].strip(), "%d/%m/%Y")
        rows.append((dt, r[1], r[2], parse_amount(r[4]), parse_amount(r[5])))

rows.sort(key=lambda x: x[0])
min_d, max_d = rows[0][0], rows[-1][0]
days = (max_d - min_d).days + 1

by_cat = defaultdict(float)
by_month = defaultdict(lambda: defaultdict(float))
items_by_cat = defaultdict(list)

total_out = 0
total_in = 0

for dt, desc, tx_type, debit, credit in rows:
    total_in += credit
    if debit > 0:
        cat = categorize(desc, tx_type)
        by_cat[cat] += debit
        by_month[dt.strftime("%Y-%m")][cat] += debit
        total_out += debit
        if debit >= 500:
            items_by_cat[cat].append((dt, debit, desc[:90]))

print(f"BANK STATEMENT SPEND BREAKDOWN")
print(f"Period: {min_d.date()} to {max_d.date()} ({days} days)")
print(f"NOTE: File is 'Last 12 Months' export — actual span is {days} days, not full 365 if account newer")
print()
print(f"Total OUT:  EUR {total_out:,.2f}")
print(f"Total IN:   EUR {total_in:,.2f}")
print(f"Net:        EUR {total_in - total_out:,.2f}")
print()
print("=" * 60)
print("BY CATEGORY (all debits)")
print("=" * 60)

# Roll up for cleaner display
rollup = {
    "Staff (payroll + named staff)": 0,
    "Subcontractors / install / site": 0,
    "Trikkis / kit (SAL via bank)": 0,
    "Marketing (ads + agency)": 0,
    "AI & software": 0,
    "Tax / VAT": 0,
    "Interco & internal": 0,
    "EAC / admin fees": 0,
    "Bank & card fees": 0,
    "Fuel & travel misc": 0,
    "Other / card misc / transfers": 0,
    "Founder draw (Revolut)": 0,
}

mapping = {
    "Staff / payroll": "Staff (payroll + named staff)",
    "Staff / payroll (Alex — unlabeled)": "Staff (payroll + named staff)",
    "Staff / sales (Talalova, Tatiana)": "Staff (payroll + named staff)",
    "Staff / consulting (Chris)": "Staff (payroll + named staff)",
    "Staff / production (video)": "Staff (payroll + named staff)",
    "Subcontractors / site / install": "Subcontractors / install / site",
    "Trikkis / kit (SAL invoices)": "Trikkis / kit (SAL via bank)",
    "Founder draw (Revolut top-up)": "Founder draw (Revolut)",
    "Marketing — ads (Meta/Google direct)": "Marketing (ads + agency)",
    "Marketing — agency (Hygge/Meta mgmt)": "Marketing (ads + agency)",
    "AI tools (OpenAI, Cursor)": "AI & software",
    "Software / SaaS": "AI & software",
    "Tax / VAT (portal)": "Tax / VAT",
    "Interco — Poland (Lighthief SP)": "Interco & internal",
    "Internal transfers": "Interco & internal",
    "EAC / permit admin fees": "EAC / admin fees",
    "Bank & card fees": "Bank & card fees",
    "Fuel": "Fuel & travel misc",
    "Office / meals / misc card": "Other / card misc / transfers",
    "Card purchases (misc)": "Other / card misc / transfers",
    "Transfers (uncategorized)": "Other / card misc / transfers",
    "Suppliers (other invoices)": "Other / card misc / transfers",
    "ATM / cash": "Other / card misc / transfers",
    "Other / uncategorized": "Other / card misc / transfers",
}

for cat, amt in by_cat.items():
    key = mapping.get(cat, "Other / card misc / transfers")
    rollup[key] += amt

for label, amt in sorted(rollup.items(), key=lambda x: -x[1]):
    if amt > 0:
        pct = 100 * amt / total_out
        monthly = amt / (days / 30.44)
        print(f"  {amt:>10,.2f}  ({pct:5.1f}%)  ~{monthly:>8,.0f}/mo  {label}")

print()
print("=" * 60)
print("DETAIL — subcategories")
print("=" * 60)
for cat, amt in sorted(by_cat.items(), key=lambda x: -x[1]):
    print(f"  {amt:>10,.2f}  {cat}")

print()
print("=" * 60)
print("TOP ITEMS >= EUR 500 by rollup group")
print("=" * 60)
for label in sorted(rollup.keys(), key=lambda x: -rollup[x]):
    if rollup[label] < 500:
        continue
    print(f"\n--- {label} ---")
    combined = []
    for cat, amt in by_cat.items():
        if mapping.get(cat) == label:
            combined.extend(items_by_cat[cat])
    for dt, amt, desc in sorted(combined, key=lambda x: -x[1])[:8]:
        print(f"  {dt.strftime('%Y-%m-%d')}  {amt:>10,.2f}  {desc}")

print()
print("=" * 60)
print("MONTHLY TOTAL OUT")
print("=" * 60)
for ym in sorted(by_month.keys()):
    m_total = sum(by_month[ym].values())
    print(f"  {ym}  EUR {m_total:>10,.2f}")
