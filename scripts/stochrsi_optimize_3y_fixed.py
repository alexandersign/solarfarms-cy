"""Fixed EUR 1000 stake per trade (no compounding) — 3y grid."""

import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi
from stochrsi_optimize_3y import LEVEL_SETS, TRAIL_GRID, DAYS_3Y, LOOKBACK, FEE, LEVERAGE

STAKE = 1000.0


def fixed_sim(df, buy, sell, trail):
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    pnl_total = 0.0
    trades = wins = 0
    eq = STAKE
    peak = eq
    max_dd = 0.0
    in_pos = False
    ep = pp = 0.0

    for i in range(LOOKBACK + 1, len(df)):
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= sell
        if not in_pos:
            if was_ob and kv[i - 1] > buy >= kv[i]:
                in_pos = True
                ep = c[i]
                pp = h[i]
        else:
            pp = max(pp, h[i])
            ex = None
            if trail is not None and lo[i] <= pp * (1 - trail / 100):
                ex = pp * (1 - trail / 100)
            elif trail is None and lo[i] <= ep * (1 - 1 / LEVERAGE):
                ex = ep * (1 - 1 / LEVERAGE)
            elif kv[i - 1] < sell <= kv[i]:
                ex = c[i]
            if ex is not None:
                ret = (ex / ep - 1) * 100
                pnl = STAKE * LEVERAGE * (ret / 100) - STAKE * LEVERAGE * FEE * 2
                pnl_total += pnl
                eq = STAKE + pnl_total
                trades += 1
                wins += pnl > 0
                peak = max(peak, eq)
                max_dd = max(max_dd, (peak - eq) / peak * 100 if peak else 0)
                in_pos = False

    if in_pos:
        ret = (c[-1] / ep - 1) * 100
        pnl_total += STAKE * LEVERAGE * (ret / 100)
        eq = STAKE + pnl_total

    return trades, wins, eq, (eq / STAKE - 1) * 100, max_dd


def spot_compound(df, buy, sell):
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    comp = 1.0
    n = wins = 0
    in_pos = False
    ep = 0.0
    for i in range(LOOKBACK + 1, len(df)):
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= sell
        if not in_pos:
            if was_ob and kv[i - 1] > buy >= kv[i]:
                in_pos = True
                ep = c[i]
        elif kv[i - 1] < sell <= kv[i]:
            r = (c[i] / ep - 1) * 100
            comp *= 1 + r / 100
            n += 1
            wins += r > 0
            in_pos = False
    return n, wins, (comp - 1) * 100


def main():
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=DAYS_3Y)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 1200, start_ms=start_ms)
    d0, d1 = df.index.min().date(), df.index.max().date()

    print("=" * 72)
    print(f"FIXED STAKE EUR {STAKE:.0f}/trade (no compounding) | 10x | 3y ({d0} to {d1})")
    print("=" * 72)

    best_global = None
    print(f"\n{'Levels':<8} {'BestTrail':>9} {'Trades':>6} {'Win%':>6} {'Net PnL':>10} {'Return':>8} {'MaxDD':>7}")
    print("-" * 58)

    for label, buy, sell in LEVEL_SETS:
        best = None
        for trail in TRAIL_GRID:
            tr, w, eq, ret, dd = fixed_sim(df, buy, sell, trail)
            if best is None or eq > best[3]:
                best = (trail, tr, w, eq, ret, dd)
        trail, tr, w, eq, ret, dd = best
        wr = 100 * w / tr if tr else 0
        print(f"{label:<8} {trail:>8.1f}% {tr:>6} {wr:>5.1f}% {eq-STAKE:>+10,.0f} {ret:>+7.1f}% {dd:>6.1f}%")
        if best_global is None or eq > best_global[3]:
            best_global = (label, trail, tr, eq, ret, dd, wr)

    print("\n--- NO TRAIL (fixed stake, liquidation at -10%) ---")
    for label, buy, sell in LEVEL_SETS:
        tr, w, eq, ret, dd = fixed_sim(df, buy, sell, None)
        print(f"  {label}: net PnL EUR {eq-STAKE:+,.0f} ({ret:+.1f}%) | {tr} trades")

    print("\n--- SPOT compound (1x, no trail) ---")
    spot_best = None
    for label, buy, sell in LEVEL_SETS:
        n, w, ret = spot_compound(df, buy, sell)
        wr = 100 * w / n if n else 0
        print(f"  {label}: {ret:+.1f}% | {n} trades | win {wr:.1f}%")
        if spot_best is None or ret > spot_best[2]:
            spot_best = (label, n, ret, wr)

    print("\n--- TOP 5 TRAIL % BY LEVEL (fixed stake) ---")
    for label, buy, sell in LEVEL_SETS:
        rows = []
        for trail in TRAIL_GRID:
            tr, w, eq, ret, dd = fixed_sim(df, buy, sell, trail)
            rows.append((trail, eq, ret, tr, dd))
        rows.sort(key=lambda x: x[1], reverse=True)
        print(f"\n  {label}:")
        for trail, eq, ret, tr, dd in rows[:5]:
            print(f"    {trail:.1f}% -> net EUR {eq-STAKE:+,.0f} ({ret:+.0f}%) | {tr} trades | DD {dd:.0f}%")

    print("\n" + "=" * 72)
    print("WINNERS (realistic fixed stake)")
    print("=" * 72)
    if best_global:
        print(f"  Leveraged: {best_global[0]} + {best_global[1]}% trail -> EUR {best_global[3]:,.0f} ({best_global[4]:+.1f}%)")
    if spot_best:
        print(f"  Spot:      {spot_best[0]} -> {spot_best[2]:+.1f}% compound")


if __name__ == "__main__":
    main()
