"""
Revalidate expected-performance.html figures.
Run: python scripts/validate_performance_numbers.py
"""
from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines
from stochrsi_leveraged import run_leveraged_backtest
from stochrsi_long_short import run, Side

START = 1000.0
TRAIL = 2.0
WINDOWS = [90, 180, 365, 730, 1095]


def slice_df(days: int) -> pd.DataFrame:
    start_ms = int(
        (datetime.now(timezone.utc) - pd.Timedelta(days=days + 60)).timestamp() * 1000
    )
    df = fetch_binance_klines("1d", days + 100, start_ms=start_ms)
    return df[df.index >= df.index.max() - pd.Timedelta(days=days)]


def main() -> None:
    print(f"VALIDATED {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"START=EUR{START} TRAIL={TRAIL}% LEV=10x\n")

    mismatches = []
    for days in WINDOWS:
        df = slice_df(days)
        tr_l, fin_lev, dd_lev = run_leveraged_backtest(
            df, TRAIL, start_eur=START, leverage=10
        )
        tr_lo, fin_lo, dd_lo = run(df, "long_only", TRAIL, START)
        tr_bo, fin_bo, dd_bo = run(df, "both", TRAIL, START)

        if abs(fin_lev - fin_lo) > 0.02:
            mismatches.append(
                (days, "long_only vs leveraged", fin_lev, fin_lo)
            )

        closed_bo = [t for t in tr_bo if t.exit_time]
        L = sum(1 for t in closed_bo if t.side == Side.LONG)
        S = sum(1 for t in closed_bo if t.side == Side.SHORT)

        if abs(fin_bo - fin_lo) < 1.0:
            mismatches.append(
                (days, "both equals long_only (BUG?)", fin_bo, fin_lo)
            )

        mult = fin_bo / fin_lo if fin_lo else 0
        print(
            f"{days:4}d | long_only EUR {fin_lo:>12,.2f} ({(fin_lo/START-1)*100:,.1f}%) "
            f"| both EUR {fin_bo:>12,.2f} ({(fin_bo/START-1)*100:,.1f}%) "
            f"| mult {mult:.2f}x | both trades {len(closed_bo)} ({L}L/{S}S) dd={dd_bo:.1f}%"
        )

    print()
    if mismatches:
        print("MISMATCHES:")
        for m in mismatches:
            print(" ", m)
        sys.exit(1)
    print("OK: long_only == leveraged; both != long_only for all windows.")


if __name__ == "__main__":
    main()
