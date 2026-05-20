"""
Fix Friday flat: compare safer variants over 5y compound 10x.
"""

import sys
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START = 1000.0
LEV = 10
FEE = 0.0005
BUY, SELL, TRAIL = 25, 75, 2.0
LB = 30


class FriMode(str, Enum):
    NONE = "none"
    ALWAYS = "always_close"  # broken: force Fri close
    IF_LOSING = "if_losing"  # flat Fri only if close < entry
    IF_NOT_IN_PROFIT = "if_not_green_2pct"  # flat if ret from entry < +2%
    HALF_SIZE = "half_size"  # close 50% Fri, keep 50% (approx: half account risk)
    TRAIL_ONLY = "trail_only"  # no special Fri rule; trail handles it
    FRI_TIGHT_TRAIL = "fri_tight_trail"  # on Fri use 1% trail instead of 2%


def simulate(df: pd.DataFrame, fri: FriMode) -> dict:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index
    dow = pd.Series(times).dt.dayofweek.values

    eq = START
    eq0 = START
    started = in_pos = False
    ep = pp = 0.0
    n = 0
    exits: dict[str, int] = {}

    def close_trade(ex_price: float, reason: str, size_frac: float = 1.0):
        nonlocal eq, in_pos, n, eq0
        ret = (ex_price / ep - 1) * 100
        if reason == "liq":
            eq = 0.0
        else:
            # partial close: only size_frac of position PnL applies
            pnl = eq0 * LEV * (ret / 100) * size_frac
            fee = abs(eq0 * LEV * FEE) * (2 if size_frac >= 1 else 1)
            eq = max(0.0, eq0 + pnl - fee)
        exits[reason] = exits.get(reason, 0) + 1
        n += 1
        if size_frac >= 1.0 or eq <= 0:
            in_pos = False
        else:
            # half size: treat as reduced exposure — simplify: full close half PnL, stay in with half eq0
            eq0 = eq  # re-base for remaining half
            in_pos = True

    for i in range(LB + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LB) : i]) >= SELL

        if not in_pos:
            if dow[i] in (5, 6) and fri != FriMode.NONE:
                continue
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                started = in_pos = True
                ep = c[i]
                pp = h[i]
                eq0 = eq
                eq -= eq * LEV * FEE
            elif not started:
                continue
        else:
            pp = max(pp, h[i])
            trail_pct = TRAIL
            if fri == FriMode.FRI_TIGHT_TRAIL and dow[i] == 4:
                trail_pct = 1.0

            ex = reason = None
            ret_from_entry = (c[i] / ep - 1) * 100

            if fri == FriMode.ALWAYS and dow[i] == 4:
                ex, reason = c[i], "fri_always"
            elif fri == FriMode.IF_LOSING and dow[i] == 4 and ret_from_entry < 0:
                ex, reason = c[i], "fri_if_losing"
            elif fri == FriMode.IF_NOT_IN_PROFIT and dow[i] == 4 and ret_from_entry < 2.0:
                ex, reason = c[i], "fri_not_2pct"
            elif fri == FriMode.HALF_SIZE and dow[i] == 4:
                close_trade(c[i], "fri_half", 0.5)
                continue
            elif fri == FriMode.TRAIL_ONLY:
                pass  # only trail/stoch/liq
            elif fri == FriMode.FRI_TIGHT_TRAIL:
                pass

            if in_pos:
                if lo[i] <= pp * (1 - trail_pct / 100):
                    ex = pp * (1 - trail_pct / 100)
                    reason = "trail"
                elif lo[i] <= ep * (1 - 1 / LEV):
                    ex = ep * (1 - 1 / LEV)
                    reason = "liq"
                elif kv[i - 1] < SELL <= kv[i]:
                    ex = c[i]
                    reason = "stoch75"

            if ex is not None and in_pos:
                close_trade(ex, reason, 1.0)
                if eq <= 0:
                    break

    return {"trades": n, "final": eq, "blown": eq <= 0, "exits": exits}


def main():
    start_ms = int((datetime.now(timezone.utc) - pd.Timedelta(days=365 * 5)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 2200, start_ms=start_ms)
    d0, d1 = df.index.min().date(), df.index.max().date()

    modes = [
        (FriMode.TRAIL_ONLY, "No Fri rule (trail only)"),
        (FriMode.ALWAYS, "BROKEN: always flat Fri close"),
        (FriMode.IF_LOSING, "Flat Fri ONLY if losing vs entry"),
        (FriMode.IF_NOT_IN_PROFIT, "Flat Fri if not at least +2% vs entry"),
        (FriMode.FRI_TIGHT_TRAIL, "Fri: tighten trail to 1% (stay in)"),
        (FriMode.HALF_SIZE, "Fri: close half position"),
    ]

    print("=" * 78)
    print(f"FRIDAY RULE FIXES | 5y {d0} -> {d1} | compound {LEV}x | EUR {START:.0f}")
    print("=" * 78)
    print(f"\n{'Rule':<42} {'Trades':>6} {'Final EUR':>14} {'Return':>10} {'Blown':>6}")
    print("-" * 78)

    for mode, label in modes:
        r = simulate(df, mode)
        ret = (r["final"] / START - 1) * 100
        blown = "YES" if r["blown"] else "no"
        print(f"{label:<42} {r['trades']:>6} {r['final']:>14,.0f} {ret:>+9.0f}% {blown:>6}")
        print(f"    exits: {r['exits']}")

    print("\nRECOMMENDED FIX (plain English):")
    print("  Do NOT force market close every Friday.")
    print("  Use: flat Fri ONLY if trade is losing OR tighten trail to 1% on Fri.")
    print("  Let the 2% trail protect winners through the weekend.")
    print("\nNot financial advice.")


def compare_horizons():
    rules = [
        (FriMode.TRAIL_ONLY, "Trail only (no Fri rule)"),
        (FriMode.IF_LOSING, "Flat Fri IF losing"),
        (FriMode.FRI_TIGHT_TRAIL, "Fri 1% trail (stay in)"),
        (FriMode.ALWAYS, "Always flat Fri (broken)"),
    ]
    for years in [3, 5]:
        start_ms = int(
            (datetime.now(timezone.utc) - pd.Timedelta(days=365 * years)).timestamp() * 1000
        )
        df = fetch_binance_klines("1d", 500 + years * 400, start_ms=start_ms)
        d0, d1 = df.index.min().date(), df.index.max().date()
        print("=" * 72)
        print(f"{years} YEARS | {d0} -> {d1} | compound 10x | EUR {START:.0f}")
        print("=" * 72)
        print(f"{'Rule':<32} {'Trades':>6} {'Final EUR':>14} {'Return':>10} {'Blown':>5}")
        print("-" * 72)
        for mode, label in rules:
            r = simulate(df, mode)
            ret = (r["final"] / START - 1) * 100
            blown = "YES" if r["blown"] else "no"
            print(
                f"{label:<32} {r['trades']:>6} {r['final']:>14,.0f} "
                f"{ret:>+9.0f}% {blown:>5}"
            )
            print(f"    exits: {r['exits']}")
        print()


if __name__ == "__main__":
    compare_horizons()
    print()
    main()
