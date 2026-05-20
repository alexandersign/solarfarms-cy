"""1-year trade log: long only vs long+short, compound speed comparison."""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines
from stochrsi_long_short import START, TRAIL, Side, run

DAYS = 365


def print_trades(label: str, trades: list, final: float, max_dd: float, d0, d1) -> tuple[float, list]:
    closed = [t for t in trades if t.exit_time]
    print()
    print("=" * 100)
    print(f"{label} | {d0} -> {d1} | EUR {START:,.0f} start | {TRAIL:.0f}% trail | 10x compound")
    print("=" * 100)
    hdr = f"{'#':<3} {'Side':<5} {'Entry':<12} {'Exit':<12} {'Entry$':>9} {'Exit$':>9} {'PnL EUR':>11} {'Equity':>12} {'Days':>4}  Reason"
    print(hdr)
    print("-" * 100)
    for n, t in enumerate(closed, 1):
        eq_after = t.equity_before + (t.pnl or 0)
        days = (t.exit_time - t.entry_time).days if t.exit_time and t.entry_time else 0
        print(
            f"{n:<3} {t.side.value:<5} {str(t.entry_time.date()):<12} "
            f"{str(t.exit_time.date()) if t.exit_time else '?':<12} "
            f"${t.entry_price:>8,.0f} ${(t.exit_price or 0):>8,.0f} "
            f"{(t.pnl or 0):>+11,.0f} {eq_after:>12,.0f} {days:>4}  {t.reason}"
        )
    wins = sum(1 for t in closed if t.pnl and t.pnl > 0)
    longs = sum(1 for t in closed if t.side == Side.LONG)
    shorts = sum(1 for t in closed if t.side == Side.SHORT)
    ret = (final / START - 1) * 100
    print("-" * 100)
    print(
        f"TOTAL: {len(closed)} trades ({longs}L / {shorts}S) | Win {100 * wins / len(closed):.1f}% | "
        f"Final EUR {final:,.2f} ({ret:+.1f}%) | MaxDD {max_dd:.1f}%"
    )
    return final, closed


def milestones(trades: list) -> dict[int, tuple[int, str, float]]:
    closed = [t for t in trades if t.exit_time]
    marks = [2, 3, 5, 10]
    hit: dict[int, tuple[int, str, float]] = {}
    for n, t in enumerate(closed, 1):
        eq = t.equity_before + (t.pnl or 0)
        for m in marks:
            if m not in hit and eq >= START * m:
                hit[m] = (n, str(t.exit_time.date()), eq)
    return hit


def avg_gap_days(trades: list) -> float:
    closed = [t for t in trades if t.exit_time]
    if len(closed) < 2:
        return 0.0
    gaps = [(closed[i].entry_time - closed[i - 1].exit_time).days for i in range(1, len(closed))]
    return sum(gaps) / len(gaps) if gaps else 0.0


def main() -> None:
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=DAYS + 60)).timestamp() * 1000)
    df = fetch_binance_klines("1d", DAYS + 100, start_ms=start_ms)
    df = df[df.index >= df.index.max() - pd.Timedelta(days=DAYS)]
    d0, d1 = df.index.min().date(), df.index.max().date()

    tr_l, fin_l, dd_l = run(df, "long_only")
    tr_b, fin_b, dd_b = run(df, "both")

    print_trades("LONG ONLY", tr_l, fin_l, dd_l, d0, d1)
    print_trades("LONG + SHORT (one position at a time)", tr_b, fin_b, dd_b, d0, d1)

    mult_l = fin_l / START
    mult_b = fin_b / START
    ratio = fin_b / fin_l if fin_l > 0 else 0

    print()
    print("=" * 100)
    print("HOW MUCH FASTER DOES LONG + SHORT COMPOUND? (last 1 year)")
    print("=" * 100)
    print(f"  Long only:        EUR {fin_l:>14,.2f}  =  {mult_l:.2f}x  ({(mult_l - 1) * 100:+.1f}%)")
    print(f"  Long + short:     EUR {fin_b:>14,.2f}  =  {mult_b:.2f}x  ({(mult_b - 1) * 100:+.1f}%)")
    print()
    print(f"  Long+short ends at {ratio:.2f}x the long-only final balance")
    print(f"  Extra profit vs long-only: EUR {fin_b - fin_l:+,.2f}")
    print(f"  Compound speed: ~{ratio:.1f}x faster endpoint (same 365 days, same start)")

    ml, mb = milestones(tr_l), milestones(tr_b)
    print()
    print(f"  {'Milestone':<22} {'Long only':<28} {'Long + short':<28}")
    print("  " + "-" * 78)
    for m in [2, 3, 5, 10]:
        a = ml.get(m)
        b = mb.get(m)
        la = f"trade #{a[0]} on {a[1]}" if a else "not reached"
        lb = f"trade #{b[0]} on {b[1]}" if b else "not reached"
        print(f"  EUR {START * m / 1000:.0f}k ({m}x)          {la:<28} {lb:<28}")

    cl = [t for t in tr_l if t.exit_time]
    cb = [t for t in tr_b if t.exit_time]
    print()
    print(f"  Trades in year:       {len(cl):<6}                 {len(cb)}")
    print(f"  Avg days between:     {avg_gap_days(tr_l):.0f}                      {avg_gap_days(tr_b):.0f}")
    print()
    print("Not financial advice.")


if __name__ == "__main__":
    main()
