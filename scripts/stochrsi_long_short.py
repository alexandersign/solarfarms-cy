"""
Long + mirrored SHORT StochRSI daily backtest.
Long:  was >=75, cross DOWN 25, exit trail or cross UP 75
Short: was <=25, cross UP 75, exit trail or cross DOWN 25
One position at a time (long OR short OR flat).
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START = 10000.0
LEV = 10
FEE = 0.0005
LB = 30
LOW, HIGH = 25.0, 75.0
TRAIL = 2.0


class Side(str, Enum):
    LONG = "long"
    SHORT = "short"


@dataclass
class Trade:
    side: Side
    entry_time: pd.Timestamp
    exit_time: pd.Timestamp | None
    entry_price: float
    exit_price: float | None
    equity_before: float
    pnl: float | None
    reason: str = ""


def run(
    df: pd.DataFrame,
    mode: str,  # "long_only" | "short_only" | "both"
    trail: float = TRAIL,
    start: float = START,
) -> tuple[list[Trade], float, float]:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c, h, l = df["close"].values, df["high"].values, df["low"].values
    times = df.index

    eq = start
    peak_eq = eq
    max_dd = 0.0
    trades: list[Trade] = []
    side: Side | None = None
    ep = eq0 = 0.0
    extreme = 0.0  # peak for long, trough for short
    et = None

    for i in range(LB + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        was_ob = np.nanmax(kv[max(0, i - LB) : i]) >= HIGH
        was_os = np.nanmin(kv[max(0, i - LB) : i]) <= LOW

        if side is None:
            # --- LONG entry ---
            if mode in ("long_only", "both") and was_ob and kv[i - 1] > LOW >= kv[i]:
                side = Side.LONG
                ep, extreme, eq0, et = c[i], h[i], eq, times[i]
                eq -= eq * LEV * FEE
            # --- SHORT entry (mirror) ---
            elif mode in ("short_only", "both") and was_os and kv[i - 1] < HIGH <= kv[i]:
                side = Side.SHORT
                ep, extreme, eq0, et = c[i], l[i], eq, times[i]
                eq -= eq * LEV * FEE

        elif side == Side.LONG:
            extreme = max(extreme, h[i])
            trail_stop = extreme * (1 - trail / 100)
            ex_p, reason = None, ""
            if l[i] <= trail_stop:
                ex_p, reason = trail_stop, f"trail_{trail:.0f}pct"
            elif kv[i - 1] < HIGH <= kv[i]:
                ex_p, reason = c[i], "stoch_75"

            if ex_p is not None:
                ret = (ex_p / ep - 1) * 100
                new_eq = max(0.0, eq0 + eq0 * LEV * (ret / 100) - abs(eq0 * LEV * FEE))
                trades.append(
                    Trade(Side.LONG, et, times[i], ep, ex_p, eq0, new_eq - eq0, reason)
                )
                eq = new_eq
                side = None
                peak_eq = max(peak_eq, eq)
                max_dd = max(max_dd, (peak_eq - eq) / peak_eq * 100 if peak_eq else 0)

        elif side == Side.SHORT:
            extreme = min(extreme, l[i])
            trail_stop = extreme * (1 + trail / 100)
            ex_p, reason = None, ""
            if h[i] >= trail_stop:
                ex_p, reason = trail_stop, f"trail_{trail:.0f}pct"
            elif kv[i - 1] > LOW >= kv[i]:
                ex_p, reason = c[i], "stoch_25"

            if ex_p is not None:
                ret = (ep / ex_p - 1) * 100  # short PnL
                new_eq = max(0.0, eq0 + eq0 * LEV * (ret / 100) - abs(eq0 * LEV * FEE))
                trades.append(
                    Trade(Side.SHORT, et, times[i], ep, ex_p, eq0, new_eq - eq0, reason)
                )
                eq = new_eq
                side = None
                peak_eq = max(peak_eq, eq)
                max_dd = max(max_dd, (peak_eq - eq) / peak_eq * 100 if peak_eq else 0)

    return trades, eq, max_dd


def report(label: str, trades: list[Trade], final: float, max_dd: float) -> None:
    closed = [t for t in trades if t.exit_time]
    wins = sum(1 for t in closed if t.pnl and t.pnl > 0)
    longs = [t for t in closed if t.side == Side.LONG]
    shorts = [t for t in closed if t.side == Side.SHORT]
    print(f"\n{label}")
    print(f"  Final EUR {final:,.2f} ({(final/START-1)*100:+.1f}%) | MaxDD {max_dd:.1f}%")
    print(f"  Trades {len(closed)} ({len(longs)}L / {len(shorts)}S) | Win {100*wins/len(closed):.1f}%" if closed else "  No trades")


def main() -> None:
    days = 730
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=days + 60)).timestamp() * 1000)
    df = fetch_binance_klines("1d", days + 100, start_ms=start_ms)
    df = df[df.index >= df.index.max() - pd.Timedelta(days=days)]
    d0, d1 = df.index.min().date(), df.index.max().date()

    print("=" * 72)
    print(f"LONG vs SHORT (mirror 25/75) | 2y | EUR {START:,.0f} | 10x | {TRAIL}% trail")
    print(f"{d0} -> {d1} | one position at a time")
    print("=" * 72)

    for mode in ("long_only", "short_only", "both"):
        tr, fin, dd = run(df, mode)
        report(mode.upper().replace("_", " "), tr, fin, dd)

    tr_both, _, _ = run(df, "both")
    print("\n--- BOTH: last 10 trades ---")
    for t in tr_both[-10:]:
        print(
            f"  {t.side.value:5} {t.entry_time.date()} -> {t.exit_time.date() if t.exit_time else '?'} "
            f"${t.entry_price:,.0f}->${t.exit_price:,.0f} EUR{t.pnl:+,.0f} {t.reason}"
        )
    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
