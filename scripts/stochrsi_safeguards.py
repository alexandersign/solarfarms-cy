"""
Test entry safeguards on daily StochRSI 25/75 + 2% trail + 10x compound.
Includes K/D crossover filters (user: blue/orange should not cross on last cycle).
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START_EUR = 1000.0
LEVERAGE = 10
FEE = 0.0005
LOOKBACK = 30
BUY, SELL, TRAIL = 25.0, 75.0, 2.0


@dataclass
class Filters:
    k_above_d_at_entry: bool = False
    no_bearish_kd_cross_since_ob: bool = False
    both_kd_overbought: bool = False
    d_below_buy_at_entry: bool = False
    price_above_ma50: bool = False
    price_above_ma200: bool = False
    min_bars_since_ob: int = 0
    k_turning_up: bool = False  # K[i] > K[i-1] on entry bar


def bearish_kd_cross(kv: np.ndarray, dv: np.ndarray, start: int, end: int) -> bool:
    """True if K crossed below D anywhere in [start, end]."""
    for j in range(max(start + 1, 1), end + 1):
        if np.isnan(kv[j]) or np.isnan(dv[j]) or np.isnan(kv[j - 1]) or np.isnan(dv[j - 1]):
            continue
        if kv[j - 1] >= dv[j - 1] and kv[j] < dv[j]:
            return True
    return False


def last_overbought_bar(kv: np.ndarray, i: int, level: float) -> int | None:
    """Most recent bar before i where K >= level."""
    for j in range(i - 1, max(0, i - LOOKBACK - 1), -1):
        if not np.isnan(kv[j]) and kv[j] >= level:
            return j
    return None


def entry_ok(
    i: int,
    df: pd.DataFrame,
    kv: np.ndarray,
    dv: np.ndarray,
    ma50: np.ndarray,
    ma200: np.ndarray,
    f: Filters,
) -> bool:
    if f.k_above_d_at_entry and not (kv[i] > dv[i]):
        return False
    if f.d_below_buy_at_entry and not (dv[i] <= BUY):
        return False
    if f.k_turning_up and not (kv[i] > kv[i - 1]):
        return False
    if f.price_above_ma50 and not (df["close"].values[i] > ma50[i]):
        return False
    if f.price_above_ma200 and not (df["close"].values[i] > ma200[i]):
        return False

    ob_bar = last_overbought_bar(kv, i, SELL)
    if ob_bar is None:
        return False

    if f.min_bars_since_ob and (i - ob_bar) < f.min_bars_since_ob:
        return False

    if f.both_kd_overbought:
        if np.nanmax(dv[max(0, i - LOOKBACK) : i]) < SELL:
            return False

    if f.no_bearish_kd_cross_since_ob:
        if bearish_kd_cross(kv, dv, ob_bar, i):
            return False

    return True


def simulate(df: pd.DataFrame, f: Filters) -> dict:
    k, d = stoch_rsi(df["close"])
    kv, dv = k.values, d.values
    closes = df["close"].values
    highs, lows = df["high"].values, df["low"].values
    ma50 = df["close"].rolling(50).mean().values
    ma200 = df["close"].rolling(200).mean().values

    eq = START_EUR
    peak = max_dd = 0.0
    trades = wins = skipped = 0
    in_pos = False
    ep = eq0 = 0.0
    peak_price = 0.0

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL

        if not in_pos:
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                if entry_ok(i, df, kv, dv, ma50, ma200, f):
                    in_pos = True
                    ep = closes[i]
                    peak_price = highs[i]
                    eq0 = eq
                    eq -= eq * LEVERAGE * FEE
                else:
                    skipped += 1
        else:
            peak_price = max(peak_price, highs[i])
            trail_stop = peak_price * (1 - TRAIL / 100)
            exit_price = None
            if lows[i] <= trail_stop:
                exit_price = trail_stop
            elif kv[i - 1] < SELL <= kv[i]:
                exit_price = closes[i]

            if exit_price is not None:
                new_eq = max(
                    0.0,
                    eq0 + eq0 * LEVERAGE * ((exit_price / ep - 1) * 100 / 100)
                    - abs(eq0 * LEVERAGE * FEE),
                )
                trades += 1
                if new_eq > eq0:
                    wins += 1
                eq = new_eq
                peak = max(peak, eq)
                if peak > 0:
                    max_dd = max(max_dd, (peak - eq) / peak * 100)
                in_pos = False

    if in_pos and eq > 0:
        eq = max(0.0, eq0 + eq0 * LEVERAGE * ((closes[-1] / ep - 1) * 100 / 100))

    return {
        "trades": trades,
        "skipped": skipped,
        "win_rate": round(100 * wins / trades, 1) if trades else 0,
        "final_eur": round(eq, 2),
        "return_pct": round((eq / START_EUR - 1) * 100, 1),
        "max_dd": round(max_dd, 1),
        "blown": eq <= 0,
    }


def run_suite(days: int) -> None:
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=days + 250)).timestamp() * 1000)
    df = fetch_binance_klines("1d", days + 300, start_ms=start_ms)
    df = df[df.index >= df.index.max() - pd.Timedelta(days=days)]

    configs: list[tuple[str, Filters]] = [
        ("baseline (no extra filters)", Filters()),
        ("K > D at entry", Filters(k_above_d_at_entry=True)),
        ("NO bearish K/D cross since OB", Filters(no_bearish_kd_cross_since_ob=True)),
        ("K>D + no bearish cross since OB", Filters(k_above_d_at_entry=True, no_bearish_kd_cross_since_ob=True)),
        ("Both K & D reached 75 in lookback", Filters(both_kd_overbought=True)),
        ("D also below 25 at entry", Filters(d_below_buy_at_entry=True)),
        ("Price above 50 MA", Filters(price_above_ma50=True)),
        ("Price above 200 MA", Filters(price_above_ma200=True)),
        ("K turning up on entry bar", Filters(k_turning_up=True)),
        (">=3 bars since overbought", Filters(min_bars_since_ob=3)),
        (">=5 bars since overbought", Filters(min_bars_since_ob=5)),
        ("STACK: no KD cross + K>D + above 50MA", Filters(
            no_bearish_kd_cross_since_ob=True,
            k_above_d_at_entry=True,
            price_above_ma50=True,
        )),
        ("STACK: no KD cross + both OB + above 200MA", Filters(
            no_bearish_kd_cross_since_ob=True,
            both_kd_overbought=True,
            price_above_ma200=True,
        )),
    ]

    print(f"\n{'=' * 88}")
    print(f"SAFEGUARD SWEEP | {days}d | 25/75 | 2% trail | 10x compound | {df.index.min().date()} -> {df.index.max().date()}")
    print(f"{'=' * 88}")
    hdr = f"{'Filter':<42} {'Trades':>6} {'Skip':>5} {'Win%':>6} {'Final EUR':>11} {'Return':>9} {'MaxDD':>7}"
    print(hdr)
    print("-" * len(hdr))

    baseline = simulate(df, Filters())
    results = []
    for name, filt in configs:
        r = simulate(df, filt)
        r["name"] = name
        results.append(r)
        print(
            f"{name:<42} {r['trades']:>6} {r['skipped']:>5} {r['win_rate']:>5.1f}% "
            f"{r['final_eur']:>11,.2f} {r['return_pct']:>+8.1f}% {r['max_dd']:>6.1f}%"
        )

    best = max(results, key=lambda x: x["final_eur"])
    print(f"\n  Baseline: EUR {baseline['final_eur']:,.2f} ({baseline['return_pct']:+.1f}%) | {baseline['trades']} trades")
    print(f"  Best:     {best['name']}")
    print(f"            EUR {best['final_eur']:,.2f} ({best['return_pct']:+.1f}%) | {best['trades']} trades")


def current_signal_check() -> None:
    df = fetch_binance_klines("1d", 120)
    k, d = stoch_rsi(df["close"])
    kv, dv = k.values, d.values
    i = len(df) - 1
    ma50 = df["close"].rolling(50).mean().values

    ob_bar = last_overbought_bar(kv, i, SELL)
    had_cross = bearish_kd_cross(kv, dv, ob_bar, i) if ob_bar else None

    print(f"\n--- CURRENT BAR ({df.index[i].date()}) ---")
    print(f"  Close: ${df['close'].iloc[-1]:,.0f} | K={kv[i]:.1f} D={dv[i]:.1f} | K>D: {kv[i] > dv[i]}")
    print(f"  Last K>=75 bar: {df.index[ob_bar].date() if ob_bar else 'none'}")
    print(f"  Bearish K/D cross since that OB bar: {had_cross}")
    print(f"  Above 50 MA: {df['close'].iloc[-1] > ma50[i] if not np.isnan(ma50[i]) else 'n/a'}")
    print(f"  'No bearish cross' filter would ALLOW entry: {not had_cross if had_cross is not None else 'n/a'}")


def main() -> None:
    print("StochRSI safeguard filters — K/D crossover + trend/confirmation")
    for days in (365, 365 * 3):
        run_suite(days)
    current_signal_check()
    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
