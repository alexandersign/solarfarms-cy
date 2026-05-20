"""
Extra risk rules on original system (3y, compound 10x):
  A) Baseline: cross-down 25, 2% trail, stoch 75
  B) + Close all positions Friday daily close (no weekend hold)
  C) + B + crash exit: if bar return <= -3% while long, exit at close (news-gap proxy)
  D) + B + tighter crash: bar return <= -2%
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START = 1000.0
LEVERAGE = 10
FEE = 0.0005
BUY, SELL, TRAIL = 25, 75, 2.0
LOOKBACK = 30


@dataclass
class Stats:
    trades: int
    final: float
    blown: bool
    exits: dict[str, int]
    max_dd: float


def cross_down(p, c, lvl):
    return p >= lvl > c


def cross_up(p, c, lvl):
    return p < lvl <= c


def run(
    df: pd.DataFrame,
    no_weekend: bool = False,
    crash_pct: float | None = None,
) -> Stats:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    o = df["open"].values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index
    dow = pd.Series(times).dt.dayofweek.values  # Mon=0 .. Sun=6

    eq = START
    eq0 = START
    peak_eq = eq
    max_dd = 0.0
    started = in_pos = False
    ep = pp = 0.0
    exits: dict[str, int] = {}
    n = 0

    def x(reason: str, ret: float):
        nonlocal eq, in_pos, n, peak_eq, max_dd
        if reason == "liquidated":
            eq = 0.0
        else:
            eq = max(0.0, eq0 + eq0 * LEVERAGE * (ret / 100) - abs(eq0 * LEVERAGE * FEE))
        exits[reason] = exits.get(reason, 0) + 1
        n += 1
        peak_eq = max(peak_eq, eq)
        if peak_eq > 0:
            max_dd = max(max_dd, (peak_eq - eq) / peak_eq * 100)
        in_pos = False

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            return Stats(n, 0.0, True, exits, max_dd)
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL
        bar_ret = (c[i] / o[i] - 1) * 100 if o[i] else 0

        if not in_pos:
            if dow[i] in (5, 6):  # Sat/Sun no new entries
                continue
            if was_ob and cross_down(kv[i - 1], kv[i], BUY):
                started = True
                in_pos = True
                ep = c[i]
                pp = h[i]
                eq0 = eq
                eq -= eq * LEVERAGE * FEE
            elif not started:
                continue
        else:
            pp = max(pp, h[i])
            ex = reason = None

            # Crash / news proxy (same-bar dump)
            if crash_pct is not None and bar_ret <= crash_pct:
                ex = c[i]
                reason = "crash_exit"

            # Friday flat before weekend
            elif no_weekend and dow[i] == 4:
                ex = c[i]
                reason = "friday_flat"

            elif lo[i] <= pp * (1 - TRAIL / 100):
                ex = pp * (1 - TRAIL / 100)
                reason = "trail"
            elif lo[i] <= ep * (1 - 1 / LEVERAGE):
                ex = ep * (1 - 1 / LEVERAGE)
                reason = "liquidated"
            elif cross_up(kv[i - 1], kv[i], SELL):
                ex = c[i]
                reason = "stoch75"

            if ex is not None:
                ret = (ex / ep - 1) * 100
                x(reason, ret)
                if eq <= 0:
                    return Stats(n, 0.0, True, exits, max_dd)

    if in_pos and eq > 0:
        ret = (c[-1] / ep - 1) * 100
        eq = eq0 + eq0 * LEVERAGE * (ret / 100)

    return Stats(n, eq, eq <= 0, exits, max_dd)


def main():
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=365 * 3)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 1300, start_ms=start_ms)

    configs = [
        ("A) Baseline", False, None),
        ("B) + No weekend hold (exit Fri close)", True, None),
        ("C) + Fri flat + crash exit if day <= -3%", True, -3.0),
        ("D) + Fri flat + crash exit if day <= -2%", True, -2.0),
    ]

    print("=" * 78)
    print("RISK ADD-ONS | 3y | Full compound 10x | EUR 1,000 start")
    print("Original: cross-down 25, 2% trail, stoch 75")
    print("=" * 78)
    print(f"\n{'Config':<42} {'Trades':>6} {'Final EUR':>12} {'Return':>9} {'MaxDD':>7} {'Blown':>6}")
    print("-" * 78)

    for name, nw, crash in configs:
        s = run(df, no_weekend=nw, crash_pct=crash)
        ret = (s.final / START - 1) * 100
        blown = "YES" if s.blown else "no"
        print(f"{name:<42} {s.trades:>6} {s.final:>12,.0f} {ret:>+8.0f}% {s.max_dd:>6.1f}% {blown:>6}")
        print(f"    exits: {s.exits}")

    # Count weekend exposures baseline
    print("\n--- Weekend exposure (baseline, last 3y) ---")
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    o = df["open"].values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index
    dow = pd.Series(times).dt.dayofweek.values
    in_pos = False
    ep = pp = 0.0
    weekend_holds = 0
    fri_forced = 0
    crash_days = 0
    for i in range(LOOKBACK + 1, len(df)):
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL
        bar_ret = (c[i] / o[i] - 1) * 100 if o[i] else 0
        if not in_pos:
            if was_ob and cross_down(kv[i - 1], kv[i], BUY):
                in_pos = True
                ep = c[i]
                pp = h[i]
        else:
            pp = max(pp, h[i])
            if dow[i] in (5, 6):
                weekend_holds += 1
            if bar_ret <= -3:
                crash_days += 1
            if lo[i] <= pp * (1 - TRAIL / 100) or cross_up(kv[i - 1], kv[i], SELL):
                in_pos = False

    print(f"  Long positions held over Sat/Sun bars: {weekend_holds}")
    print(f"  Days in trade with daily drop <= -3%: {crash_days}")

    print("\n--- NEWS MONITOR (not in backtest) ---")
    print("  Real news feed: CPI, FOMC, NFP, ETF rulings, exchange hacks, war headlines")
    print("  Instant exit helps when: gap > trail before stop fills (Jun 2022-type events)")
    print("  Limitation: false positives (exit before rip); latency; calendar != all dumps")
    # 6y blow-up check on best risk config vs baseline
    print("\n--- 6 YEAR BLOW-UP CHECK ---")
    t6 = int(datetime(2020, 5, 18, tzinfo=timezone.utc).timestamp() * 1000)
    df6 = fetch_binance_klines("1d", 2500, start_ms=t6)
    for name, nw, crash in [("Baseline 6y", False, None), ("Fri flat + -3% crash 6y", True, -3.0)]:
        s = run(df6, nw, crash)
        print(f"  {name}: EUR {s.final:,.0f} | blown={s.blown} | {s.exits}")

    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
