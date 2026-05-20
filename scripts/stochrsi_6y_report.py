"""StochRSI system analysis — last 6 years only."""

import sys
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_btc, slice_period, stoch_rsi, run_backtest, BacktestResult
from stochrsi_leveraged import run_leveraged_backtest, START_EUR, LEVERAGE

DAYS_6Y = 365 * 6  # 2190 days


def run_no_trail_lev(df: pd.DataFrame) -> tuple[list, float, float, bool]:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    closes = df["close"].values
    lows = df["low"].values
    times = df.index
    FEE = 0.0005
    eq = START_EUR
    peak = eq
    max_dd = 0.0
    trades = []
    in_pos = False
    ep = eq0 = 0.0
    et = None
    lb = 30

    for i in range(lb + 1, len(df)):
        if eq <= 0:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - lb) : i]) >= 75
        if not in_pos:
            if was_ob and kv[i - 1] > 25 >= kv[i]:
                in_pos = True
                ep = closes[i]
                eq0 = eq
                et = times[i]
                eq -= eq * LEVERAGE * FEE
        else:
            liq = ep * (1 - 1 / LEVERAGE)
            if lows[i] <= liq:
                trades.append((et.date(), times[i].date(), ep, liq, -10.0, eq0, 0.0, "liquidated"))
                eq = 0.0
                in_pos = False
                break
            if kv[i - 1] < 75 <= kv[i]:
                ret = (closes[i] / ep - 1) * 100
                eq = max(0.0, eq0 + eq0 * LEVERAGE * (ret / 100) - abs(eq0 * LEVERAGE * FEE))
                trades.append((et.date(), times[i].date(), ep, closes[i], ret, eq0, eq, "stoch_75"))
                peak = max(peak, eq)
                max_dd = max(max_dd, (peak - eq) / peak * 100 if peak else 0)
                in_pos = False

    if in_pos and eq > 0:
        ret = (closes[-1] / ep - 1) * 100
        mtm = eq0 + eq0 * LEVERAGE * (ret / 100)
        trades.append((et.date(), None, ep, closes[-1], ret, eq0, mtm, "open"))
        eq = mtm

    return trades, eq, max_dd, eq <= 0 and not in_pos


def main() -> None:
    # Paginate from 6 years ago (Binance 1000-bar limit per request)
    from datetime import datetime, timezone
    from stochrsi_backtest import fetch_binance_klines

    start_ms = int(datetime(2020, 5, 18, tzinfo=timezone.utc).timestamp() * 1000)
    df_full = fetch_binance_klines("1d", limit=2500, start_ms=start_ms)
    df = df_full  # already scoped to ~6y window
    start = df.index.min().date()
    end = df.index.max().date()

    print("=" * 76)
    print(f"BTC StochRSI ANALYSIS — LAST 6 YEARS ({start} to {end})")
    print("System: overbought within 30 bars -> buy cross-DOWN @25 -> sell @75")
    print("StochRSI(14,14,3,3) | daily | Binance BTCUSDT")
    print("=" * 76)

    # 1) Spot (no leverage)
    trades = run_backtest(df, entry_mode="cross_down_25")
    closed = [t for t in trades if t.return_pct is not None]
    open_t = [t for t in trades if t.return_pct is None]
    result = BacktestResult("1d", "6y", len(df), str(start), str(end), closed)
    st = result.stats()

    print("\n--- SPOT (1x, no fees) ---")
    print(f"  Trades:        {st['trades']}")
    print(f"  Win rate:      {st['win_rate']}%")
    print(f"  Avg/trade:     {st['avg_return_pct']}%")
    print(f"  Median/trade:  {st['median_return_pct']}%")
    print(f"  Compound:      {st['total_return_pct']}%")
    print(f"  Profit factor: {st['profit_factor']}")
    print(f"  Best trade:    {st['max_win_pct']}%")
    print(f"  Worst trade:   {st['max_loss_pct']}%")
    print(f"  Avg hold:      {st['avg_bars_held']} days")
    if open_t:
        t = open_t[0]
        u = (df["close"].iloc[-1] / t.entry_price - 1) * 100
        print(f"  Open trade:    {t.entry_time.date()} @ ${t.entry_price:,.0f} ({u:+.1f}% unrealized)")

    # Year-by-year spot
    print("\n--- SPOT BY CALENDAR YEAR ---")
    print(f"  {'Year':<6} {'Trades':>6} {'Win%':>6} {'Compound':>10}")
    for yr in sorted(set(t.exit_time.year for t in closed if t.exit_time)):
        yr_trades = [t for t in closed if t.exit_time and t.exit_time.year == yr]
        wins = sum(1 for t in yr_trades if t.return_pct > 0)
        comp = 1.0
        for t in yr_trades:
            comp *= 1 + t.return_pct / 100
        wr = 100 * wins / len(yr_trades) if yr_trades else 0
        print(f"  {yr:<6} {len(yr_trades):>6} {wr:>5.1f}% {(comp-1)*100:>+9.1f}%")

    # 2) Leveraged with trailing stops
    print("\n--- LEVERAGED: EUR 1,000 | 10x | fees 0.05%/side | full margin ---")
    print(f"  {'Trail':>6} {'Trades':>6} {'Win%':>6} {'Final EUR':>11} {'Return':>8} {'MaxDD':>7} {'Blown':>6}")
    for trail in [3, 5, 8, 10]:
        lt, final, dd = run_leveraged_backtest(df, float(trail))
        cl = [t for t in lt if t.exit_reason != "open_mtm"]
        wins = sum(1 for t in cl if t.pnl_eur and t.pnl_eur > 0)
        wr = 100 * wins / len(cl) if cl else 0
        ret = (final / START_EUR - 1) * 100
        blown = "YES" if final <= 0 else "no"
        print(f"  {trail:>5}% {len(cl):>6} {wr:>5.1f}% {final:>11,.2f} {ret:>+7.1f}% {dd:>6.1f}% {blown:>6}")

    # 3) Leveraged no trail
    lt, final, dd, blown = run_no_trail_lev(df)
    cl = [t for t in lt if t[1] is not None]
    wins = sum(1 for t in cl if t[6] > t[5])
    wr = 100 * wins / len(cl) if cl else 0
    ret = (final / START_EUR - 1) * 100
    print("\n--- LEVERAGED: NO trailing stop (exit Stoch 75 or liquidation) ---")
    print(f"  Trades: {len(cl)} | Win: {wr:.1f}% | Final: EUR {final:,.2f} ({ret:+.1f}%) | MaxDD: {dd:.1f}% | Blown: {'YES' if final<=0 else 'no'}")

    # Trade log spot last 10
    print("\n--- LAST 10 SPOT TRADES ---")
    for t in closed[-10:]:
        print(
            f"  {t.entry_time.date()} ${t.entry_price:,.0f} -> {t.exit_time.date()} ${t.exit_price:,.0f} | "
            f"{t.return_pct:+.1f}% | {t.bars_held}d"
        )

    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
