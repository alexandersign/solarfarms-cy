"""Alexander Papacosta bank payouts — month by month."""
import csv
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path

FILES = [
    Path(__file__).parent / "TransactionHistory_master_boc.csv",
    Path(__file__).parent / "TransactionHistory_12m_20260723.csv",
    Path(__file__).parent / "TransactionHistory_1778844425612.csv",
    Path(__file__).parent / "TransactionHistory_1781688445424.csv",
]


def parse_amount(s):
    if not s or not str(s).strip():
        return 0.0
    return float(str(s).strip().replace(".", "").replace(",", "."))


def is_alex_payout(desc):
    d = desc.upper()
    if "CREDIT ADVICE" in d:
        return False
    if "ALEXANDRA" in d and "PARASCHOU" in d:
        return False
    if "PENDING COMS" in d or "PENDING COM" in d:
        return True
    if ("SALARY" in d or "SALLARY" in d) and (" ALEX" in d or "ALEX " in d or "ALEXANDER" in d):
        return True
    if any(x in d for x in ["ALEX MAY", "ALEX SALARY", "ALEX SALLARY", "ALEX NOVEMBER"]):
        return True
    if re.search(r"DEBIT ALEX(?:\s|$)", d) or re.search(r"DEBIT ALEXANDER", d):
        return True
    return False


def main():
    seen = set()
    items = []
    for path in FILES:
        if not path.exists():
            continue
        with open(path, encoding="utf-8", errors="replace") as f:
            for r in csv.reader(f):
                if len(r) < 7 or not re.match(r"^\d{2}/\d{2}/\d{4}$", r[0].strip()):
                    continue
                ref = r[8].strip() if len(r) > 8 else ""
                key = (r[0], ref, r[1], r[4], r[5])
                if key in seen:
                    continue
                seen.add(key)
                debit = parse_amount(r[4])
                if debit <= 0:
                    continue
                desc = r[1]
                if not is_alex_payout(desc):
                    continue
                dt = datetime.strptime(r[0].strip(), "%d/%m/%Y")
                items.append((dt, debit, desc))

    items.sort(key=lambda x: x[0])
    by_month = defaultdict(float)
    for dt, amt, _ in items:
        by_month[dt.strftime("%Y-%m")] += amt

    print("ALEXANDER PAPACOSTA — BOC PAYOUTS")
    print(f"Period: {items[0][0].date()} to {items[-1][0].date()}")
    print("(Excludes Revolut loan returns, ATM, client credits)")
    print()
    for ym in sorted(by_month):
        print(f"  {ym}  EUR {by_month[ym]:>10,.2f}")
    print(f"  TOTAL  EUR {sum(by_month.values()):>10,.2f}")
    print()
    print("Detail:")
    for dt, amt, desc in items:
        print(f"  {dt.date()}  EUR {amt:>8,.2f}  {desc[:80]}")


if __name__ == "__main__":
    main()
