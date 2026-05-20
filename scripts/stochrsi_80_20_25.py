"""
StochRSI variant: must hit >=80, dip <20, then enter @25, exit @75 (+ 2% trail).
Tests cross-UP vs cross-DOWN through 25 after the 80->20 cycle.
"""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START_EUR = 1000.0
LEVERAGE = 10
FEE = 0.0005
LOOKBACK = 30
TRAIL = 2.0
OB = 80.0
DEEP = 20.0
ENTRY = 25.0
EXIT = 75.0


class EntryMode(str, Enum):
    CROSS_UP_25 = "cross_up_25"       # 80 -> <20 -> K crosses UP through 25
    CROSS_DOWN_25 = "cross_down_25"   # 80 -> <20 -> K crosses DOWN through 25 (after rebound)
    BASELINE_75_25 = "baseline_75_25" # was >=75, cross DOWN 25 (no 20 req)


def cycle_ok(kv: np.ndarray, i: int, mode: EntryMode) -> bool:
    """Check 80 and sub-20 conditions in recent cycle before bar i."""
    window_start = max(0, i - LOOKBACK)
    seg = kv[window_start:i]
    if len(seg) == 0 or np.all(np.isnan(seg)):
        return False

    if mode == EntryMode.BASELINE_75_25:
        return float(np.nanmax(seg)) >= 75.0

    if float(np.nanmax(seg)) < OB:
        return False

    # Find last bar in window where K >= OB
    ob_bar = None
    for j in range(i - 1, window_start - 1, -1):
        if not np.isnan(kv[j]) and kv[j] >= OB:
            ob_bar = j
            break
    if ob_bar is None:
        return False

    # Must have dipped below DEEP at some point after that OB peak, before entry bar i
    after_ob = kv[ob_bar:i]
    if len(after_ob) == 0 or float(np.nanmin(after_ob)) >= DEEP:
        return False
    return True


def entry_signal(kv: np.ndarray, i: int, mode: EntryMode) -> bool:
    if not cycle_ok(kv, i, mode):
        return False
    if mode == EntryMode.CROSS_UP_25:
        return kv[i - 1] < ENTRY <= kv[i]
    if mode == EntryMode.CROSS_DOWN_25:
        return kv[i - 1] > ENTRY >= kv[i]
    # baseline
    return kv[i - 1] > ENTRY >= kv[i]


def simulate(
    df: pd.DataFrame,
    mode: EntryMode,
    trail: float | None = TRAIL,
    exit_level: float = EXIT,
) -> dict:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    closes = df["close"].values
    highs, lows = df["high"].values, df["low"].values

    eq = START_EUR
    peak = max_dd = 0.0
    trades = wins = stoch_ex = trail_ex = 0
    in_pos = False
    ep = eq0 = 0.0
    peak_price = 0.0

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        if not in_pos:
            if entry_signal(kv, i, mode):
                in_pos = True
                ep = closes[i]
                peak_price = highs[i]
                eq0 = eq
                eq -= eq * LEVERAGE * FEE
        else:
            peak_price = max(peak_price, highs[i])
            exit_price = None
            reason = ""

            if trail is not None:
                ts = peak_price * (1 - trail / 100)
                if lows[i] <= ts:
                    exit_price = ts
                    reason = "trail"

            if exit_price is None and kv[i - 1] < exit_level <= kv[i]:
                exit_price = closes[i]
                reason = "stoch"

            if exit_price is not None:
                new_eq = max(
                    0.0,
                    eq0 + eq0 * LEVERAGE * ((exit_price / ep - 1))
                    - abs(eq0 * LEVERAGE * FEE),
                )
                trades += 1
                if new_eq > eq0:
                    wins += 1
                if reason == "stoch":
                    stoch_ex += 1
                else:
                    trail_ex += 1
                eq = new_eq
                peak = max(peak, eq)
                if peak > 0:
                    max_dd = max(max_dd, (peak - eq) / peak * 100)
                in_pos = False

    if in_pos and eq > 0:
        eq = max(0.0, eq0 + eq0 * LEVERAGE * ((closes[-1] / ep - 1)))

    return {
        "mode": mode.value,
        "trades": trades,
        "win_rate": round(100 * wins / trades, 1) if trades else 0,
        "stoch_exits": stoch_ex,
        "trail_exits": trail_ex,
        "final_eur": round(eq, 2),
        "return_pct": round((eq / START_EUR - 1) * 100, 1),
        "max_dd": round(max_dd, 1),
    }


def load(days: int) -> pd.DataFrame:
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=days + 250)).timestamp() * 1000)
    df = fetch_binance_klines("1d", days + 300, start_ms=start_ms)
    return df[df.index >= df.index.max() - pd.Timedelta(days=days)]


def main() -> None:
    modes = [
        (EntryMode.BASELINE_75_25, "Baseline: was 75, cross DOWN 25"),
        (EntryMode.CROSS_UP_25, "New: was 80, dipped <20, cross UP 25"),
        (EntryMode.CROSS_DOWN_25, "Alt: was 80, dipped <20, cross DOWN 25"),
    ]

    for days, label in [(365, "1 YEAR"), (365 * 3, "3 YEARS"), (365 * 6, "6 YEARS")]:
        df = load(days)
        print(f"\n{'=' * 85}")
        print(f"{label} | daily | exit @75 + 2% trail | 10x compound | {df.index.min().date()} -> {df.index.max().date()}")
        print(f"{'=' * 85}")
        hdr = f"{'Rule':<45} {'Trades':>6} {'Win%':>6} {'Stoch':>5} {'Trail':>5} {'Final EUR':>12} {'Return':>9} {'MaxDD':>7}"
        print(hdr)
        print("-" * len(hdr))
        for mode, desc in modes:
            r = simulate(df, mode)
            print(
                f"{desc:<45} {r['trades']:>6} {r['win_rate']:>5.1f}% "
                f"{r['stoch_exits']:>5} {r['trail_exits']:>5} "
                f"{r['final_eur']:>12,.2f} {r['return_pct']:>+8.1f}% {r['max_dd']:>6.1f}%"
            )

        # no trail spot-style for new rule only
        r_spot = simulate(df, EntryMode.CROSS_UP_25, trail=None)
        print(f"\n  New rule WITHOUT trail (stoch exit only, 10x): {r_spot['trades']} trades, EUR {r_spot['final_eur']:,.2f}")

    # How often does 80->20 cycle happen?
    df3 = load(365 * 3)
    k, _ = stoch_rsi(df3["close"])
    kv = k.values
    signals_up = signals_down = baseline = 0
    for i in range(LOOKBACK + 1, len(df3)):
        if entry_signal(kv, i, EntryMode.CROSS_UP_25):
            signals_up += 1
        if entry_signal(kv, i, EntryMode.CROSS_DOWN_25):
            signals_down += 1
        if entry_signal(kv, i, EntryMode.BASELINE_75_25):
            baseline += 1
    print(f"\n--- Signal frequency (3y daily bars) ---")
    print(f"  Baseline (75 / cross down 25):     {baseline}")
    print(f"  New (80, <20, cross UP 25):        {signals_up}")
    print(f"  Alt (80, <20, cross DOWN 25):      {signals_down}")

    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
