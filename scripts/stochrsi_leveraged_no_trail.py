"""EUR 1000, 10x leverage, NO trailing stop - exit Stoch 75 only."""

import sys
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_btc, slice_period, stoch_rsi
from stochrsi_leveraged import START_EUR, LEVERAGE, FEE_RATE


def run_no_trail(df: pd.DataFrame) -> tuple[list[tuple], float, float]:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    closes = df["close"].values
    times = df.index
    eq = START_EUR
    peak = eq
    max_dd = 0.0
    trades: list[tuple] = []
    in_pos = False
    entry_price = 0.0
    eq_at_entry = 0.0
    entry_time = None
    lookback = 30

    for i in range(lookback + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - lookback) : i]) >= 75

        if not in_pos:
            if was_ob and kv[i - 1] > 25 >= kv[i]:
                in_pos = True
                entry_price = closes[i]
                eq_at_entry = eq
                entry_time = times[i]
                eq -= eq * LEVERAGE * FEE_RATE
        else:
            # Liquidation ~10% adverse move at 10x full margin
            liq_price = entry_price * (1 - 1 / LEVERAGE)
            if df["low"].values[i] <= liq_price:
                eq = 0.0
                trades.append(
                    (entry_time.date(), times[i].date(), entry_price, liq_price, -10.0, eq_at_entry, 0.0, -eq_at_entry)
                )
                in_pos = False
                break
            if kv[i - 1] < 75 <= kv[i]:
                ret = (closes[i] / entry_price - 1) * 100
                pnl = eq_at_entry * LEVERAGE * (ret / 100)
                eq = max(0.0, eq_at_entry + pnl - abs(eq_at_entry * LEVERAGE * FEE_RATE))
                trades.append(
                    (entry_time.date(), times[i].date(), entry_price, closes[i], ret, eq_at_entry, eq, eq - eq_at_entry)
                )
                peak = max(peak, eq)
                max_dd = max(max_dd, (peak - eq) / peak * 100 if peak else 0)
                in_pos = False

    if in_pos and eq > 0:
        ret = (closes[-1] / entry_price - 1) * 100
        mtm = eq_at_entry + eq_at_entry * LEVERAGE * (ret / 100)
        trades.append(
            (entry_time.date(), None, entry_price, closes[-1], ret, eq_at_entry, mtm, mtm - eq_at_entry)
        )
        eq = mtm

    return trades, eq, max_dd


def main() -> None:
    df_full = fetch_btc("1d", 1500)
    periods = [("90d", 90), ("180d", 180), ("365d", 365), ("730d", 730), ("all", None)]

    print("=" * 72)
    print("LEVERAGED: EUR 1,000 | 10x | NO trailing stop | exit Stoch 75 only")
    print("Fees 0.05% per side | full margin each trade")
    print("=" * 72)
    print(f"{'Period':<6} {'Trades':>6} {'Win%':>6} {'Final EUR':>11} {'Return':>8} {'MaxDD':>7} {'Blown':>6}")
    print("-" * 60)

    for plabel, days in periods:
        df = slice_period(df_full, days)
        trades, final, dd = run_no_trail(df)
        closed = [t for t in trades if t[1] is not None]
        wins = sum(1 for t in closed if t[7] > 0)
        wr = 100 * wins / len(closed) if closed else 0
        ret = (final / START_EUR - 1) * 100
        blown = "YES" if final <= 0 else "no"
        print(f"{plabel:<6} {len(closed):>6} {wr:>5.1f}% {final:>11,.2f} {ret:>+7.1f}% {dd:>6.1f}% {blown:>6}")

    print("\n90d trade log:")
    df90 = slice_period(df_full, 90)
    trades, final, _ = run_no_trail(df90)
    for row in trades:
        ex = str(row[1]) if row[1] else "OPEN"
        print(
            f"  {row[0]} -> {ex} | ${row[2]:,.0f}->${row[3]:,.0f} | "
            f"BTC {row[4]:+.1f}% | EUR{row[5]:,.0f}->EUR{row[6]:,.0f} ({row[7]:+,.0f})"
        )
    print(f"  Final: EUR {final:,.2f} (started EUR {START_EUR:,.0f})")

    print("\nCompare vs 5% trailing stop (from prior run):")
    print("  90d:  no trail +77.9% vs 5% trail +14.9%  (10% trail was +77.9% with 2 trades)")
    print("  all:  no trail see above vs 5% trail -54.7%")
    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
