"""Leverage sweep: 25/75 + 2% trail, last 3 years."""

import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

STAKE = 1000.0
BUY, SELL = 25, 75
TRAIL = 2.0
LOOKBACK = 30
FEE = 0.0005
DAYS_3Y = 365 * 3
LEVERAGE_LEVELS = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 50]


def simulate(df, leverage: int, compound: bool = False):
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values

    eq = STAKE
    peak = eq
    max_dd = 0.0
    trades = wins = 0
    blown = False
    in_pos = False
    ep = pp = 0.0
    eq_at_entry = STAKE

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            blown = True
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL
        if not in_pos:
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                in_pos = True
                ep = c[i]
                pp = h[i]
                eq_at_entry = eq
                if compound:
                    eq -= eq * leverage * FEE
        else:
            pp = max(pp, h[i])
            ex = None
            if lo[i] <= pp * (1 - TRAIL / 100):
                ex = pp * (1 - TRAIL / 100)
            elif leverage > 1 and lo[i] <= ep * (1 - 1 / leverage):
                ex = ep * (1 - 1 / leverage)
            elif kv[i - 1] < SELL <= kv[i]:
                ex = c[i]
            if ex is not None:
                margin = eq_at_entry if compound else STAKE
                ret = (ex / ep - 1) * 100
                pnl = margin * leverage * (ret / 100)
                fee = margin * leverage * FEE * 2
                if compound:
                    eq = max(0.0, eq_at_entry + pnl - fee)
                else:
                    eq = STAKE + (eq - STAKE) + pnl - fee if trades == 0 else eq + pnl - fee
                    # fixed stake: accumulate pnl from start
                if not compound:
                    pass  # handled below
                trades += 1
                trade_pnl = (eq - (eq_at_entry if compound else STAKE + sum_pnl)) if False else pnl - fee
                in_pos = False

    return eq, trades, max_dd, blown


def fixed_stake(df, leverage: int):
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
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL
        if not in_pos:
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                in_pos = True
                ep = c[i]
                pp = h[i]
        else:
            pp = max(pp, h[i])
            ex = None
            if lo[i] <= pp * (1 - TRAIL / 100):
                ex = pp * (1 - TRAIL / 100)
            elif leverage > 1 and lo[i] <= ep * (1 - 1 / leverage):
                ex = ep * (1 - 1 / leverage)
            elif kv[i - 1] < SELL <= kv[i]:
                ex = c[i]
            if ex is not None:
                ret = (ex / ep - 1) * 100
                pnl = STAKE * leverage * (ret / 100) - STAKE * leverage * FEE * 2
                pnl_total += pnl
                eq = STAKE + pnl_total
                trades += 1
                wins += pnl > 0
                peak = max(peak, eq)
                max_dd = max(max_dd, (peak - eq) / peak * 100 if peak else 0)
                in_pos = False

    if in_pos:
        ret = (c[-1] / ep - 1) * 100
        pnl_total += STAKE * leverage * (ret / 100)
        eq = STAKE + pnl_total

    return eq, trades, wins, max_dd, pnl_total <= -STAKE * 0.99


def compound_reinvest(df, leverage: int):
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    eq = STAKE
    peak = eq
    max_dd = 0.0
    trades = wins = 0
    in_pos = False
    ep = pp = 0.0
    eq0 = STAKE

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            return 0.0, trades, wins, max_dd, True
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL
        if not in_pos:
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                in_pos = True
                ep = c[i]
                pp = h[i]
                eq0 = eq
                eq -= eq * leverage * FEE
        else:
            pp = max(pp, h[i])
            ex = None
            if lo[i] <= pp * (1 - TRAIL / 100):
                ex = pp * (1 - TRAIL / 100)
            elif leverage > 1 and lo[i] <= ep * (1 - 1 / leverage):
                ex = ep * (1 - 1 / leverage)
            elif kv[i - 1] < SELL <= kv[i]:
                ex = c[i]
            if ex is not None:
                ret = (ex / ep - 1) * 100
                eq = max(0.0, eq0 + eq0 * leverage * (ret / 100) - abs(eq0 * leverage * FEE))
                trades += 1
                wins += eq > eq0
                peak = max(peak, eq)
                max_dd = max(max_dd, (peak - eq) / peak * 100 if peak else 0)
                in_pos = False

    if in_pos and eq > 0:
        ret = (c[-1] / ep - 1) * 100
        eq = eq0 + eq0 * leverage * (ret / 100)

    return eq, trades, wins, max_dd, eq <= 0


def main():
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=DAYS_3Y)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 1200, start_ms=start_ms)
    d0, d1 = df.index.min().date(), df.index.max().date()

    print("=" * 78)
    print(f"LEVERAGE SWEEP | 25/75 | 2% trailing stop | 3y ({d0} to {d1})")
    print("=" * 78)

    print("\n--- A) FIXED EUR 1000 stake per trade (realistic) ---")
    print(f"{'Lev':>4} {'Trades':>6} {'Win%':>6} {'Net PnL':>10} {'Return':>8} {'MaxDD':>7} {'Blown':>6}")
    print("-" * 52)
    best_fixed = None
    for lev in LEVERAGE_LEVELS:
        eq, tr, w, dd, blown = fixed_stake(df, lev)
        ret = (eq / STAKE - 1) * 100
        wr = 100 * w / tr if tr else 0
        b = "YES" if blown else "no"
        print(f"{lev:>4}x {tr:>6} {wr:>5.1f}% {eq-STAKE:>+10,.0f} {ret:>+7.1f}% {dd:>6.1f}% {b:>6}")
        if best_fixed is None or eq > best_fixed[1]:
            best_fixed = (lev, eq, ret, dd, tr, wr)

    print("\n--- B) FULL REINVEST compounding (theoretical) ---")
    print(f"{'Lev':>4} {'Trades':>6} {'Win%':>6} {'Final EUR':>12} {'Return':>10} {'MaxDD':>7} {'Blown':>6}")
    print("-" * 58)
    best_comp = None
    for lev in LEVERAGE_LEVELS:
        eq, tr, w, dd, blown = compound_reinvest(df, lev)
        ret = (eq / STAKE - 1) * 100 if eq > 0 else -100
        wr = 100 * w / tr if tr else 0
        b = "YES" if blown else "no"
        print(f"{lev:>4}x {tr:>6} {wr:>5.1f}% {eq:>12,.2f} {ret:>+9.1f}% {dd:>6.1f}% {b:>6}")
        if not blown and (best_comp is None or eq > best_comp[1]):
            best_comp = (lev, eq, ret, dd, tr, wr)

    print("\n" + "=" * 78)
    print("ANSWER")
    print("=" * 78)
    if best_fixed:
        print(
            f"  Fixed stake:  {best_fixed[0]}x -> net EUR {best_fixed[1]-STAKE:+,.0f} "
            f"({best_fixed[2]:+.1f}%) | {best_fixed[4]} trades | max DD {best_fixed[3]:.1f}%"
        )
    if best_comp:
        print(
            f"  Compounding:  {best_comp[0]}x -> EUR {best_comp[1]:,.2f} "
            f"({best_comp[2]:+.1f}%) | max DD {best_comp[3]:.1f}%"
        )
    print("\n  Linear scaling: fixed-stake return scales ~linearly with leverage (same trades).")
    print("  Not financial advice.")


if __name__ == "__main__":
    main()
