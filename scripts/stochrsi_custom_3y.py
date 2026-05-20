"""
Custom rules (3y backtest):
  1. K must cross UNDER 20 first (in current setup cycle)
  2. Enter when K crosses UP through 25 (after the under-20 event)
  3. Exit: Stoch 75 cross up | 2% trailing stop | mid-cycle turn:
     K crosses BELOW D while K < 75 (turns down before overbought)

Also tests prior rule (cross DOWN @25 after OB) for comparison.
Leveraged: fixed EUR 1000/trade @ 10x + compounding @ 10x.
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

DAYS_3Y = 365 * 3
LOOKBACK = 30
TRAIL = 2.0
FEE = 0.0005
STAKE = 1000.0
LEVERAGE = 10


@dataclass
class Trade:
    entry_time: pd.Timestamp
    exit_time: pd.Timestamp
    entry: float
    exit: float
    ret_pct: float
    reason: str
    bars: int


def cross_down(prev: float, curr: float, level: float) -> bool:
    return prev >= level > curr


def cross_up(prev: float, curr: float, level: float) -> bool:
    return prev < level <= curr


def run_custom(
    df: pd.DataFrame,
    require_overbought: bool = True,
    mid_turn: str = "k_x_d",
) -> list[Trade]:
    k, d = stoch_rsi(df["close"])
    kv, dv = k.values, d.values
    c, h, lo = df["close"].values, df["high"].values, df["low"].values
    times = df.index
    trades: list[Trade] = []

    in_pos = False
    ep = pp = 0.0
    entry_i = 0
    entry_time = None
    saw_under_20 = False  # reset each cycle

    for i in range(LOOKBACK + 1, len(df)):
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]) or np.isnan(dv[i]) or np.isnan(dv[i - 1]):
            continue

        if not in_pos:
            was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= 75
            if cross_down(kv[i - 1], kv[i], 20):
                saw_under_20 = True
            if require_overbought and not was_ob:
                saw_under_20 = False
                continue
            if saw_under_20 and cross_up(kv[i - 1], kv[i], 25):
                in_pos = True
                ep = c[i]
                pp = h[i]
                entry_i = i
                entry_time = times[i]
                saw_under_20 = False
        else:
            pp = max(pp, h[i])
            ex = reason = None

            if lo[i] <= pp * (1 - TRAIL / 100):
                ex = pp * (1 - TRAIL / 100)
                reason = "trail_2pct"
            elif cross_up(kv[i - 1], kv[i], 75):
                ex = c[i]
                reason = "stoch_75"
            elif _mid_turn(i, kv, dv, mid_turn):
                ex = c[i]
                reason = f"mid_{mid_turn}"

            if ex is not None:
                ret = (ex / ep - 1) * 100
                trades.append(
                    Trade(entry_time, times[i], ep, ex, ret, reason, i - entry_i)
                )
                in_pos = False

    return trades


def _mid_turn(i: int, kv, dv, mode: str) -> bool:
    if mode == "none":
        return False
    if mode == "k_x_d":
        return kv[i - 1] >= dv[i - 1] and kv[i] < dv[i] and kv[i] < 75
    if mode == "cross_50":
        return cross_down(kv[i - 1], kv[i], 50) and kv[i] < 75
    if mode == "cross_60":
        return cross_down(kv[i - 1], kv[i], 60) and kv[i] < 75
    if mode == "peak":
        return i >= 2 and kv[i - 1] > kv[i - 2] and kv[i - 1] > kv[i] and kv[i - 1] < 75
    return False


def run_old_cross_down_25(df: pd.DataFrame) -> list[Trade]:
    """Original: OB in lookback, cross DOWN through 25, same exits without mid-turn."""
    k, d = stoch_rsi(df["close"])
    kv = k.values
    c, h, lo = df["close"].values, df["high"].values, df["low"].values
    times = df.index
    trades: list[Trade] = []
    in_pos = False
    ep = pp = 0.0
    entry_i = entry_time = 0

    for i in range(LOOKBACK + 1, len(df)):
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= 75
        if not in_pos:
            if was_ob and cross_down(kv[i - 1], kv[i], 25):
                in_pos = True
                ep = c[i]
                pp = h[i]
                entry_i = i
                entry_time = times[i]
        else:
            pp = max(pp, h[i])
            ex = reason = None
            if lo[i] <= pp * (1 - TRAIL / 100):
                ex, reason = pp * (1 - TRAIL / 100), "trail_2pct"
            elif cross_up(kv[i - 1], kv[i], 75):
                ex, reason = c[i], "stoch_75"
            if ex is not None:
                trades.append(
                    Trade(entry_time, times[i], ep, ex, (ex / ep - 1) * 100, reason, i - entry_i)
                )
                in_pos = False
    return trades


def stats(trades: list[Trade]) -> dict:
    if not trades:
        return {"n": 0}
    rets = [t.ret_pct for t in trades]
    wins = [r for r in rets if r > 0]
    comp = 1.0
    for r in rets:
        comp *= 1 + r / 100
    reasons: dict[str, int] = {}
    for t in trades:
        reasons[t.reason] = reasons.get(t.reason, 0) + 1
    return {
        "n": len(trades),
        "win_pct": round(100 * len(wins) / len(trades), 1),
        "avg": round(float(np.mean(rets)), 2),
        "compound": round((comp - 1) * 100, 1),
        "pf": round(sum(wins) / abs(sum(r for r in rets if r <= 0)), 2) if any(r <= 0 for r in rets) else float("inf"),
        "reasons": reasons,
    }


def fixed_lev(trades: list[Trade]) -> dict:
    pnl = 0.0
    wins = 0
    for t in trades:
        p = STAKE * LEVERAGE * (t.ret_pct / 100) - STAKE * LEVERAGE * FEE * 2
        pnl += p
        wins += p > 0
    eq = STAKE + pnl
    return {
        "final": round(eq, 2),
        "ret": round((eq / STAKE - 1) * 100, 1),
        "win_pct": round(100 * wins / len(trades), 1) if trades else 0,
    }


def compound_lev(trades: list[Trade]) -> dict:
    eq = STAKE
    blown = False
    for t in trades:
        if eq <= 0:
            blown = True
            break
        eq0 = eq
        eq -= eq * LEVERAGE * FEE
        pnl = eq0 * LEVERAGE * (t.ret_pct / 100)
        eq = max(0.0, eq0 + pnl - abs(eq0 * LEVERAGE * FEE))
        if t.ret_pct <= -10:
            eq = 0.0
            blown = True
            break
    return {
        "final": round(eq, 2),
        "ret": round((eq / STAKE - 1) * 100, 1) if eq > 0 else -100.0,
        "blown": blown or eq <= 0,
    }


def print_trades(label: str, trades: list[Trade], last: int = 8):
    print(f"\n  Last {last} trades ({label}):")
    for t in trades[-last:]:
        print(
            f"    {t.entry_time.date()} -> {t.exit_time.date()} | "
            f"{t.ret_pct:+.1f}% | {t.reason} | {t.bars}d"
        )


def main():
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=DAYS_3Y)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 1200, start_ms=start_ms)
    d0, d1 = df.index.min().date(), df.index.max().date()

    old = run_old_cross_down_25(df)
    new = run_custom(df, require_overbought=True, mid_turn="k_x_d")
    new_no_ob = run_custom(df, require_overbought=False, mid_turn="k_x_d")

    print("=" * 78)
    print(f"CUSTOM RULES BACKTEST | 3y ({d0} to {d1}) | daily BTCUSDT")
    print("=" * 78)
    print("\nNEW RULES:")
    print("  - K crosses UNDER 20 first")
    print("  - Enter on K crossing UP through 25")
    print("  - Exit: 2% trail | Stoch 75 | K crosses below D while K<75 (mid-cycle turn)")
    print("\nOLD RULES (comparison): cross DOWN through 25 after OB, exit trail/75 only")

    for name, tr in [
        ("OLD: cross-DOWN @25", old),
        ("NEW: under-20 then cross-UP @25 (+ mid-turn exit)", new),
        ("NEW (no OB required)", new_no_ob),
    ]:
        s = stats(tr)
        fl = fixed_lev(tr)
        cl = compound_lev(tr)
        print(f"\n--- {name} ---")
        if s["n"] == 0:
            print("  No trades")
            continue
        print(f"  Trades: {s['n']} | Win: {s['win_pct']}% | Avg/trade: {s['avg']}% | Spot compound: {s['compound']}% | PF: {s['pf']}")
        print(f"  Exit mix: {s['reasons']}")
        print(f"  Fixed EUR1000 @10x: EUR {fl['final']:,.0f} ({fl['ret']:+.1f}%) win {fl['win_pct']}%")
        print(f"  Full compound @10x:  EUR {cl['final']:,.0f} ({cl['ret']:+.1f}%) blown={cl['blown']}")

    print_trades("NEW", new)

    print("\n--- MID-TURN EXIT VARIANTS (same entry: under-20, cross-up @25) ---")
    for mode, label in [
        ("none", "No mid-turn (trail + 75 only)"),
        ("k_x_d", "K crosses below D (<75)"),
        ("cross_50", "K crosses down through 50"),
        ("cross_60", "K crosses down through 60"),
        ("peak", "K local peak (<75)"),
    ]:
        tr = run_custom(df, True, mid_turn=mode)
        s = stats(tr)
        fl = fixed_lev(tr)
        if s["n"]:
            print(f"  {label}: {s['n']} trades | spot {s['compound']:+.1f}% | fixed10x EUR {fl['final']:,.0f} ({fl['ret']:+.0f}%) | {s['reasons']}")

    print("\nNot financial advice. Mid-turn = K crosses below D while K<75 (default).")


if __name__ == "__main__":
    main()
