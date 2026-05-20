"""
Compare StochRSI strategy across timeframes — last 365 days.
Calendar-equivalent 30-day overbought lookback per TF.
Same rules: cross-DOWN @25, exit @75 or 2% trail, EUR 1000 @ 10x.
"""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, run_backtest
from stochrsi_leveraged import START_EUR, run_leveraged_backtest

DAYS = 365
TRAIL = 2.0
LOOKBACK_DAYS = 30

# (label, binance interval, hours per bar)
TIMEFRAMES = [
    ("1h", "1h", 1),
    ("2h", "2h", 2),
    ("4h", "4h", 4),
    ("6h", "6h", 6),
    ("8h", "8h", 8),
    ("12h", "12h", 12),
    ("1d", "1d", 24),
    ("3d", "3d", 72),
    ("1w", "1w", 168),
]


def lookback_bars(hours_per_bar: int) -> int:
    return max(4, LOOKBACK_DAYS * 24 // hours_per_bar)


def fetch_window(interval: str, hours_per_bar: int) -> pd.DataFrame:
    lb = lookback_bars(hours_per_bar)
    warmup = lb + 500
    end = datetime.now(timezone.utc)
    start = end - pd.Timedelta(days=DAYS, hours=warmup * hours_per_bar)
    need = DAYS * 24 // hours_per_bar + warmup + 50
    df = fetch_binance_klines(interval, limit=need, start_ms=int(start.timestamp() * 1000))
    cutoff = end - pd.Timedelta(days=DAYS)
    return df[df.index >= cutoff]


def spot_compound_pct(trades) -> float:
    closed = [t for t in trades if t.return_pct is not None]
    compound = 1.0
    for t in closed:
        compound *= 1 + t.return_pct / 100
    return round((compound - 1) * 100, 1)


def main() -> None:
    print("=" * 88)
    print(f"TIMEFRAME SWEEP | last {DAYS}d | StochRSI(14,14,3,3) | 30d lookback | 2% trail | 10x compound")
    print("=" * 88)

    rows = []
    for label, interval, hpb in TIMEFRAMES:
        try:
            df = fetch_window(interval, hpb)
            lb = lookback_bars(hpb)
            if len(df) < lb + 50:
                print(f"  SKIP {label}: only {len(df)} bars")
                continue

            spot_trades = run_backtest(df, lookback_bars=lb)
            spot_ret = spot_compound_pct(spot_trades)
            spot_n = len([t for t in spot_trades if t.return_pct is not None])

            lev_trades, final, max_dd = run_leveraged_backtest(df, TRAIL, lookback_bars=lb)
            closed = [t for t in lev_trades if t.exit_reason != "open_mtm"]
            wins = sum(1 for t in closed if t.pnl_eur and t.pnl_eur > 0)

            rows.append({
                "tf": label,
                "bars": len(df),
                "lookback": lb,
                "trades": len(closed),
                "win_pct": round(100 * wins / len(closed), 1) if closed else 0,
                "spot_pct": spot_ret,
                "final_eur": round(final, 2),
                "lev_ret": round((final / START_EUR - 1) * 100, 1),
                "max_dd": round(max_dd, 1),
                "blown": final <= 50,
            })
        except Exception as e:
            print(f"  SKIP {label}: {e}")

    rows.sort(key=lambda r: r["lev_ret"], reverse=True)

    hdr = f"{'TF':>4} {'Bars':>6} {'LB':>4} {'Trades':>6} {'Win%':>6} {'Spot%':>8} {'FinalEUR':>10} {'10xRet':>9} {'MaxDD':>7}"
    print(hdr)
    print("-" * len(hdr))
    for r in rows:
        flag = " *" if r["tf"] == "1d" else ""
        print(
            f"{r['tf']:>4} {r['bars']:>6} {r['lookback']:>4} {r['trades']:>6} {r['win_pct']:>5.1f}% "
            f"{r['spot_pct']:>+7.1f}% {r['final_eur']:>10,.2f} {r['lev_ret']:>+8.1f}% {r['max_dd']:>6.1f}%{flag}"
        )

    if rows:
        best = rows[0]
        daily = next((r for r in rows if r["tf"] == "1d"), None)
        print(f"\nBest by 10x return: {best['tf']} -> EUR {best['final_eur']:,.2f} ({best['lev_ret']:+.1f}%)")
        if daily:
            print(f"Daily reference:     EUR {daily['final_eur']:,.2f} ({daily['lev_ret']:+.1f}%) | {daily['trades']} trades")

    # Trail sweep on top candidates
    print("\n--- TRAIL SWEEP on promising TFs (same 1y window) ---")
    candidates = ["4h", "6h", "12h", "1d", "3d"]
    for label, interval, hpb in TIMEFRAMES:
        if label not in candidates:
            continue
        df = fetch_window(interval, hpb)
        lb = lookback_bars(hpb)
        print(f"\n  {label} (lookback={lb}):")
        print(f"  {'Trail':>5} {'Trades':>6} {'FinalEUR':>10} {'10xRet':>9} {'MaxDD':>7}")
        for trail in [1.5, 2.0, 3.0, 4.0, 5.0]:
            trades, final, dd = run_leveraged_backtest(df, trail, lookback_bars=lb)
            ret = (final / START_EUR - 1) * 100
            n = len([t for t in trades if t.exit_reason != "open_mtm"])
            print(f"  {trail:>4.1f}% {n:>6} {final:>10,.2f} {ret:>+8.1f}% {dd:>6.1f}%")

    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
