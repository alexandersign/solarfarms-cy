"""
Full compound reinvest @10x, original rules (cross-down 25, 2% trail, stoch 75).
  - LAST 3 years: actual BTC daily
  - PRIOR 3 years: actual (May 2020 - May 2023) for comparison
  - NEXT 3 years: Monte Carlo bootstrap of last-3y trade returns (NOT forecast)
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
N_MC = 2000
MC_SEED = 42


@dataclass
class Trade:
    entry: pd.Timestamp
    exit: pd.Timestamp
    ret_pct: float
    reason: str
    equity_after: float


def cross_down(p, c, lvl):
    return p >= lvl > c


def cross_up(p, c, lvl):
    return p < lvl <= c


def run_compound(df: pd.DataFrame) -> tuple[list[Trade], float, bool]:
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index

    eq = START
    eq0 = START
    started = in_pos = False
    ep = pp = 0.0
    entry_t = None
    trades: list[Trade] = []

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            return trades, 0.0, True
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL

        if not in_pos:
            if was_ob and cross_down(kv[i - 1], kv[i], BUY):
                started = True
                in_pos = True
                ep = c[i]
                pp = h[i]
                entry_t = times[i]
                eq0 = eq
                eq -= eq * LEVERAGE * FEE
            elif not started:
                continue
        else:
            pp = max(pp, h[i])
            ex = reason = None
            if lo[i] <= pp * (1 - TRAIL / 100):
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
                if reason == "liquidated":
                    eq = 0.0
                else:
                    eq = max(0.0, eq0 + eq0 * LEVERAGE * (ret / 100) - abs(eq0 * LEVERAGE * FEE))
                trades.append(Trade(entry_t, times[i], ret, reason, eq))
                in_pos = False
                if eq <= 0:
                    return trades, 0.0, True

    if in_pos and eq > 0:
        ret = (c[-1] / ep - 1) * 100
        eq = eq0 + eq0 * LEVERAGE * (ret / 100)

    return trades, eq, False


def account_ret_from_btc_ret(btc_ret_pct: float) -> float:
    """Account return % on one compound trade at 10x (approx fees)."""
    return LEVERAGE * btc_ret_pct - LEVERAGE * FEE * 100 * 2  # rough fee drag on account


def compound_path(trades: list[Trade]) -> pd.DataFrame:
    rows = [{"date": START, "event": "start", "equity": START, "trade": 0}]
    for n, t in enumerate(trades, 1):
        rows.append({"date": t.exit, "event": t.reason, "equity": t.equity_after, "trade": n})
    return pd.DataFrame(rows)


def monthly_from_trades(trades: list[Trade], label: str) -> pd.DataFrame:
    if not trades:
        return pd.DataFrame()
    start = trades[0].entry.to_period("M")
    end = trades[-1].exit.to_period("M")
    months = pd.period_range(start, end, freq="M")
    eq = START
    rows = []
    for m in months:
        m_end = pd.Timestamp(m.end_time, tz="UTC") + pd.Timedelta(hours=23, minutes=59)
        month_tr = [t for t in trades if t.exit <= m_end]
        if month_tr:
            eq = month_tr[-1].equity_after
        n_new = len([t for t in trades if t.exit.to_period("M") == m])
        prev_eq = rows[-1]["equity_eur"] if rows else START
        rows.append({
            "period": label,
            "month": str(m),
            "trades_closed": n_new,
            "equity_eur": round(eq, 2),
            "month_chg_pct": round((eq / prev_eq - 1) * 100, 1) if prev_eq else 0,
        })
    return pd.DataFrame(rows)


def monte_carlo_next_3y(trade_rets: list[float], n_trades: int, n_sims: int = N_MC) -> dict:
    """Bootstrap BTC % returns; apply compound 10x rules including liquidation."""
    rng = np.random.default_rng(MC_SEED)
    finals = []
    blown = 0
    max_dds = []

    for _ in range(n_sims):
        eq = START
        peak = eq
        max_dd = 0
        for _ in range(n_trades):
            if eq <= 0:
                break
            btc_r = rng.choice(trade_rets)
            eq0 = eq
            eq -= eq * LEVERAGE * FEE
            if btc_r <= -10:  # liquidation at 10x
                eq = 0.0
                blown += 1
                break
            eq = max(0.0, eq0 + eq0 * LEVERAGE * (btc_r / 100) - abs(eq0 * LEVERAGE * FEE))
            peak = max(peak, eq)
            if peak > 0:
                max_dd = max(max_dd, (peak - eq) / peak * 100)
        finals.append(eq)
        max_dds.append(max_dd)

    finals = np.array(finals)
    return {
        "n_trades": n_trades,
        "n_sims": n_sims,
        "pct_blown": round(100 * blown / n_sims, 1),
        "p10": round(float(np.percentile(finals, 10)), 2),
        "p25": round(float(np.percentile(finals, 25)), 2),
        "p50": round(float(np.percentile(finals, 50)), 2),
        "p75": round(float(np.percentile(finals, 75)), 2),
        "p90": round(float(np.percentile(finals, 90)), 2),
        "mean": round(float(np.mean(finals)), 2),
        "max_dd_median": round(float(np.median(max_dds)), 1),
    }


def main():
    now = datetime.now(timezone.utc)
    t6 = int((now - pd.Timedelta(days=365 * 6)).timestamp() * 1000)
    df_all = fetch_binance_klines("1d", 2500, start_ms=t6)
    split = df_all.index.max() - pd.Timedelta(days=365 * 3)
    df_prior = df_all[df_all.index < split]
    df_last = df_all[df_all.index >= split]

    tr_last, eq_last, blown_last = run_compound(df_last)
    tr_prior, eq_prior, blown_prior = run_compound(df_prior)

    print("=" * 78)
    print("FULL COMPOUND REINVEST @10x | Original rules | EUR 1,000 start")
    print("=" * 78)

    def print_block(label, df, trades, eq, blown):
        d0, d1 = df.index.min().date(), df.index.max().date()
        print(f"\n{'='*78}")
        print(f"{label}")
        print(f"  {d0} to {d1} | {len(trades)} trades | blown={blown}")
        print(f"  Final equity: EUR {eq:,.2f} ({(eq/START-1)*100:+,.1f}%)")
        if trades:
            print(f"  First entry: {trades[0].entry.date()} | Last exit: {trades[-1].exit.date()}")
        m = monthly_from_trades(trades, label)
        if len(m):
            print(f"\n  {'Month':<10} {'Trades':>6} {'Equity EUR':>14} {'MoM %':>8}")
            print("  " + "-" * 42)
            for _, r in m.iterrows():
                print(f"  {r['month']:<10} {int(r['trades_closed']):>6} {r['equity_eur']:>14,.0f} {r['month_chg_pct']:>+7.1f}%")

    print_block("LAST 3 YEARS (actual BTC)", df_last, tr_last, eq_last, blown_last)
    print_block("PRIOR 3 YEARS (actual BTC, for context — not future)", df_prior, tr_prior, eq_prior, blown_prior)

    # NEXT 3 years = Monte Carlo
    rets = [t.ret_pct for t in tr_last]
    mc = monte_carlo_next_3y(rets, n_trades=len(tr_last))

    print(f"\n{'='*78}")
    print("NEXT 3 YEARS — MONTE CARLO PROJECTION (NOT REAL FUTURE DATA)")
    print("=" * 78)
    print("  Method: randomly resample the 52 trade outcomes from LAST 3y, 2000 paths")
    print("  Same trade count (~52), same compound 10x rules, liquidation at -10% BTC")
    print(f"\n  Starting equity: EUR {START:,.0f}")
    print(f"  Simulations where account hits ZERO: {mc['pct_blown']}%")
    print(f"\n  Final equity after ~3y (percentiles):")
    print(f"    Worst 10%:  EUR {mc['p10']:>12,.0f}")
    print(f"    25th:         EUR {mc['p25']:>12,.0f}")
    print(f"    MEDIAN:       EUR {mc['p50']:>12,.0f}")
    print(f"    75th:         EUR {mc['p75']:>12,.0f}")
    print(f"    Best 10%:     EUR {mc['p90']:>12,.0f}")
    print(f"    Mean:         EUR {mc['mean']:>12,.0f}")
    print(f"  Median max drawdown during path: {mc['max_dd_median']:.1f}%")

    print("\n  IMPORTANT:")
    print("  - NEXT 3y cannot be known; this is statistical fan, not a forecast.")
    print("  - Full compound @10x CAN go to zero (see prior 3y or 6y full sim).")
    print("  - Past 3y was strong; resampling assumes similar trade mix continues.")
    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
