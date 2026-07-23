"""Shareholder loan IN vs loan return OUT — monthly breakdown.

Rules (confirmed):
- Shareholder loan IN: Arkadiusz Sybaris labelled shareholder loans only
- Revolut OUT (BOC card -> Revolut): founder return / drawdown of shareholder loans
- Revolut IN (Sent from Revolut): client payments — NOT founder, NOT loan accounting
- Alex salary / ATM: separate payroll/cash — not loan return
"""
import csv
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path

STATEMENT_DIR = Path(__file__).parent
# Prefer merged master (12m BOC export 23-07-2026 + prior unique rows)
FILES = [
    STATEMENT_DIR / "TransactionHistory_master_boc.csv",
    STATEMENT_DIR / "TransactionHistory_12m_20260723.csv",
    STATEMENT_DIR / "TransactionHistory_1778844425612.csv",
    STATEMENT_DIR / "TransactionHistory_1781688445424.csv",
]


def parse_amount(s):
    if not s or not str(s).strip():
        return 0.0
    return float(str(s).strip().replace(".", "").replace(",", "."))


def load_rows():
    seen = set()
    rows = []
    for path in FILES:
        if not path.exists():
            continue
        with open(path, encoding="utf-8", errors="replace") as f:
            for r in csv.reader(f):
                if len(r) < 7 or not re.match(r"^\d{2}/\d{2}/\d{4}$", r[0].strip()):
                    continue
                ref = r[8].strip() if len(r) > 8 else ""
                key = (r[0].strip(), ref, r[1].strip(), r[4].strip(), r[5].strip())
                if key in seen:
                    continue
                seen.add(key)
                dt = datetime.strptime(r[0].strip(), "%d/%m/%Y")
                rows.append(
                    {
                        "date": dt,
                        "ym": dt.strftime("%Y-%m"),
                        "desc": r[1],
                        "type": r[2],
                        "debit": parse_amount(r[4]),
                        "credit": parse_amount(r[5]),
                    }
                )
    rows.sort(key=lambda x: x["date"])
    return rows


def is_shareholder_loan_in(desc):
    d = desc.upper()
    return "SHAREHOLDER" in d and "LOAN" in d


def is_loan_return_out(desc, tx_type):
    d = desc.upper()
    t = tx_type.upper()
    return "REVOLUT" in d and "PURCHASE" in t


def classify_other_founder_out(desc, tx_type):
    d = desc.upper()
    t = tx_type.upper()
    if "ATM CASH WITHDRAWAL" in t:
        return "ATM cash"
    if "PENDING COMS" in d or "PENDING COM" in d:
        return "Alex salary / commission"
    if ("SALARY" in d or "SALLARY" in d) and (" ALEX" in d or "ALEX " in d or "ALEXANDER" in d):
        return "Alex salary / commission"
    if "ALEX MAY" in d or "ALEX SALARY" in d or "ALEX SALLARY" in d or "ALEX NOVEMBER" in d:
        return "Alex salary / commission"
    if re.search(r"DEBIT ALEX(?:\s|$)", d) or re.search(r"DEBIT ALEXANDER", d):
        if "SALARY" not in d and "SALLARY" not in d:
            return "Alex unlabeled draw"
    return None


def main():
    rows = load_rows()
    if not rows:
        print("No transaction rows found.")
        return

    min_d, max_d = rows[0]["date"].date(), rows[-1]["date"].date()

    loan_in = defaultdict(float)
    loan_return = defaultdict(float)
    client_revolut_in = defaultdict(float)
    other_out = defaultdict(lambda: defaultdict(float))

    loan_in_items = []
    loan_return_items = []
    client_in_items = []

    for r in rows:
        if is_shareholder_loan_in(r["desc"]) and r["credit"] > 0:
            loan_in[r["ym"]] += r["credit"]
            loan_in_items.append((r["date"], r["credit"], r["desc"][:85]))

        elif (
            "REVOLUT" in r["desc"].upper()
            and r["credit"] > 0
            and any(x in r["desc"].upper() for x in ["INWARD", "SENT FROM REVOLUT"])
        ):
            client_revolut_in[r["ym"]] += r["credit"]
            client_in_items.append((r["date"], r["credit"], r["desc"][:85]))

        elif is_loan_return_out(r["desc"], r["type"]) and r["debit"] > 0:
            loan_return[r["ym"]] += r["debit"]
            loan_return_items.append((r["date"], r["debit"], r["desc"][:85]))

        else:
            cat = classify_other_founder_out(r["desc"], r["type"])
            if cat and r["debit"] > 0:
                other_out[r["ym"]][cat] += r["debit"]

    all_months = sorted({r["ym"] for r in rows})
    total_loan_in = sum(loan_in.values())
    total_loan_return = sum(loan_return.values())
    total_client_revolut = sum(client_revolut_in.values())
    outstanding = total_loan_in - total_loan_return

    print("SHAREHOLDER LOAN ACCOUNTING (corrected)")
    print(f"Period: {min_d} to {max_d}  ({len(rows)} transactions, deduped)")
    print()
    print(f"Shareholder loans IN (Sybaris):           EUR {total_loan_in:>12,.2f}")
    print(f"Loan return OUT (Revolut top-ups):          EUR {total_loan_return:>12,.2f}")
    print(f"Outstanding shareholder loan balance:       EUR {outstanding:>12,.2f}")
    print()
    print(f"Client payments via Revolut (excluded):     EUR {total_client_revolut:>12,.2f}")
    print()
    print("=" * 72)
    print(f"{'Month':<8} {'Loan IN':>10} {'Loan OUT':>10} {'Net loan':>10} {'Client Rev IN':>14}")
    print("-" * 72)

    running = 0.0
    for ym in all_months:
        li = loan_in.get(ym, 0)
        lo = loan_return.get(ym, 0)
        cri = client_revolut_in.get(ym, 0)
        net = li - lo
        running += net
        if li or lo or cri:
            print(f"{ym:<8} {li:>10,.0f} {lo:>10,.0f} {net:>+10,.0f} {cri:>14,.0f}")

    print("-" * 72)
    print(
        f"{'TOTAL':<8} {total_loan_in:>10,.0f} {total_loan_return:>10,.0f} "
        f"{total_loan_in - total_loan_return:>+10,.0f} {total_client_revolut:>14,.0f}"
    )
    print(f"{'':8} {'':>10} {'':>10} {'(outstanding)':>10}")

    print()
    print("=" * 60)
    print("OTHER FOUNDER OUT (not loan return — payroll / ATM)")
    print("=" * 60)
    cats = ["Alex salary / commission", "Alex unlabeled draw", "ATM cash"]
    for ym in all_months:
        m = other_out[ym]
        if not any(m.get(c, 0) for c in cats):
            continue
        parts = "  ".join(f"{c.split('/')[0].strip()}: EUR {m.get(c,0):,.0f}" for c in cats if m.get(c, 0))
        print(f"  {ym}  {parts}")

    print()
    print("SHAREHOLDER LOAN IN — detail")
    for dt, amt, desc in loan_in_items:
        print(f"  {dt.date()}  {amt:>10,.2f}  {desc}")

    print()
    print("LOAN RETURN (Revolut OUT) — detail")
    for dt, amt, desc in loan_return_items:
        print(f"  {dt.date()}  {amt:>10,.2f}  {desc}")

    print()
    print("CLIENT PAYMENTS (Revolut IN) — detail")
    for dt, amt, desc in client_in_items:
        print(f"  {dt.date()}  {amt:>10,.2f}  {desc}")


if __name__ == "__main__":
    main()
