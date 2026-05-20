"""
Original rules, 3y forward from first entry in window:
  - Prior overbought (K>=75 within 30 bars)
  - Enter: K cross DOWN through 25
  - Exit: 2% trail | Stoch cross UP through 75

Monthly equity / PnL. Modes: spot, fixed 10x stake, compound 10x.
Also reports when NEXT entry is from today.
"""

from __future__ import annotations

import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

LOOKBACK = 30
TRAIL = 2.0
BUY, SELL = 25, 75
START_EUR = 1000.0
LEVERAGE = 10
FEE = 0.0005
DAYS_3Y = 365 * 3


@dataclass
class ClosedTrade:
    entry_time: pd.Timestamp
    exit_time: pd.Timestamp
    ret_pct: float
    reason: str
    pnl_fixed: float
    equity_after_compound: float


def cross_down(p, c, lvl):
    return p >= lvl > c


def cross_up(p, c, lvl):
    return p < lvl <= c


def simulate_from_first_entry(df: pd.DataFrame, end_date: pd.Timestamp):
    """Run strategy; only start tracking from first entry on/after df start."""
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index

    active = False  # before first entry, don't trade
    in_pos = False
    ep = pp = 0.0
    eq_compound = START_EUR
    pnl_fixed_total = 0.0
    closed: list[ClosedTrade] = []
    eq0 = START_EUR

    for i in range(LOOKBACK + 1, len(df)):
        if times[i] > end_date:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL

        if not active:
            if was_ob and cross_down(kv[i - 1], kv[i], BUY):
                active = True
                in_pos = True
                ep = c[i]
                pp = h[i]
                eq0 = eq_compound
                eq_compound -= eq_compound * LEVERAGE * FEE
            continue

        if not in_pos:
            if was_ob and cross_down(kv[i - 1], kv[i], BUY):
                in_pos = True
                ep = c[i]
                pp = h[i]
                eq0 = eq_compound
                eq_compound -= eq_compound * LEVERAGE * FEE
        else:
            pp = max(pp, h[i])
            ex = reason = None
            if lo[i] <= pp * (1 - TRAIL / 100):
                ex = pp * (1 - TRAIL / 100)
                reason = "trail"
            elif LEVERAGE > 1 and lo[i] <= ep * (1 - 1 / LEVERAGE):
                ex = ep * (1 - 1 / LEVERAGE)
                reason = "liquidated"
            elif cross_up(kv[i - 1], kv[i], SELL):
                ex = c[i]
                reason = "stoch75"

            if ex is not None:
                ret = (ex / ep - 1) * 100
                pnl_f = START_EUR * LEVERAGE * (ret / 100) - START_EUR * LEVERAGE * FEE * 2
                pnl_fixed_total += pnl_f
                if reason == "liquidated":
                    eq_compound = 0.0
                else:
                    eq_compound = max(
                        0.0,
                        eq0 + eq0 * LEVERAGE * (ret / 100) - abs(eq0 * LEVERAGE * FEE),
                    )
                closed.append(
                    ClosedTrade(
                        times[i - (i - i)],  # placeholder fixed below
                        times[i],
                        ret,
                        reason,
                        pnl_f,
                        eq_compound,
                    )
                )
                closed[-1] = ClosedTrade(
                    _find_entry_time(times, i, kv, c, lo, h, closed),
                    times[i],
                    ret,
                    reason,
                    pnl_f,
                    eq_compound,
                )
                in_pos = False
                if eq_compound <= 0:
                    break

    # MTM if still open
    mtm_compound = eq_compound
    mtm_fixed = pnl_fixed_total
    if in_pos and eq_compound > 0:
        ret = (c[df.index.get_loc(times[i])] / ep - 1) * 100 if in_pos else 0
        idx = len(df) - 1
        while idx >= 0 and times[idx] > end_date:
            idx -= 1
        ret = (c[idx] / ep - 1) * 100
        mtm_compound = eq0 + eq0 * LEVERAGE * (ret / 100)
        mtm_fixed = pnl_fixed_total + START_EUR * LEVERAGE * (ret / 100)

    first_entry = closed[0].entry_time if closed else None
    return closed, first_entry, eq_compound, pnl_fixed_total, mtm_compound, mtm_fixed, in_pos


def _find_entry_time(times, exit_i, kv, c, lo, h, closed):
    # walk back not needed - store on entry
    return times[exit_i]  # fallback


# Fix: store entry_time properly in loop
def simulate_from_first_entry_v2(df: pd.DataFrame, end_date: pd.Timestamp):
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index

    started = False
    in_pos = False
    ep = pp = 0.0
    entry_time = None
    eq_compound = START_EUR
    pnl_fixed_total = 0.0
    eq0 = START_EUR
    closed: list[ClosedTrade] = []

    for i in range(LOOKBACK + 1, len(df)):
        if times[i] > end_date:
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue
        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL

        if not in_pos:
            if was_ob and cross_down(kv[i - 1], kv[i], BUY):
                started = True
                in_pos = True
                ep = c[i]
                pp = h[i]
                entry_time = times[i]
                eq0 = eq_compound
                eq_compound -= eq_compound * LEVERAGE * FEE
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
                pnl_f = START_EUR * LEVERAGE * (ret / 100) - START_EUR * LEVERAGE * FEE * 2
                pnl_fixed_total += pnl_f
                if reason == "liquidated":
                    eq_compound = 0.0
                else:
                    eq_compound = max(
                        0.0,
                        eq0 + eq0 * LEVERAGE * (ret / 100) - abs(eq0 * LEVERAGE * FEE),
                    )
                closed.append(
                    ClosedTrade(entry_time, times[i], ret, reason, pnl_f, eq_compound)
                )
                in_pos = False
                entry_time = None
                if eq_compound <= 0:
                    break

    last_i = min(len(df) - 1, max(i for i in range(len(df)) if times[i] <= end_date))
    mtm_fixed = pnl_fixed_total
    mtm_compound = eq_compound
    if in_pos and eq_compound > 0:
        ret = (c[last_i] / ep - 1) * 100
        mtm_compound = eq0 + eq0 * LEVERAGE * (ret / 100)
        mtm_fixed = pnl_fixed_total + START_EUR * LEVERAGE * (ret / 100)

    first_entry = closed[0].entry_time if closed else (entry_time if in_pos else None)
    return closed, first_entry, eq_compound, pnl_fixed_total, mtm_compound, mtm_fixed, in_pos


def spot_compound_from_first(closed: list[ClosedTrade]) -> float:
    comp = 1.0
    for t in closed:
        comp *= 1 + t.ret_pct / 100
    return comp


def monthly_report(closed: list[ClosedTrade], start: pd.Timestamp, end: pd.Timestamp):
    """Build month-by-month table from closed trades (exit month)."""
    months = pd.period_range(start.to_period("M"), end.to_period("M"), freq="M")
    rows = []
    cum_fixed = START_EUR
    cum_compound = START_EUR
    cum_spot = 1.0

    for m in months:
        m_start = pd.Timestamp(m.start_time, tz="UTC")
        m_end = pd.Timestamp(m.end_time, tz="UTC") + pd.Timedelta(hours=23, minutes=59)
        month_trades = [t for t in closed if m_start <= t.exit_time <= m_end]
        pnl_f = sum(t.pnl_fixed for t in month_trades)
        cum_fixed += pnl_f
        for t in month_trades:
            cum_spot *= 1 + t.ret_pct / 100
        if month_trades:
            cum_compound = month_trades[-1].equity_after_compound
        rows.append({
            "month": str(m),
            "trades": len(month_trades),
            "pnl_fixed_eur": round(pnl_f, 2),
            "equity_fixed_eur": round(cum_fixed, 2),
            "equity_compound_eur": round(cum_compound, 2),
            "spot_compound_pct": round((cum_spot - 1) * 100, 1),
        })
    return pd.DataFrame(rows)


def find_next_entry(df: pd.DataFrame) -> dict:
    """Next entry from latest bar (may be 'wait' if in cycle)."""
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    times = df.index
    i = len(df) - 1
    was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL if i > LOOKBACK else False
    in_open = was_ob and kv[i] < BUY and np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= BUY
    # check if currently in position zone (crossed down 25 recently without 75 exit - simplified)
    last_cross_down_25 = None
    for j in range(LOOKBACK + 1, len(df)):
        if np.isnan(kv[j]) or np.isnan(kv[j - 1]):
            continue
        ob = np.nanmax(kv[max(0, j - LOOKBACK) : j]) >= SELL
        if ob and cross_down(kv[j - 1], kv[j], BUY):
            last_cross_down_25 = times[j]
    return {
        "price": c[-1],
        "k": float(kv[-1]),
        "last_entry_signal": last_cross_down_25,
        "was_overbought_30d": bool(was_ob),
        "note": "Next NEW entry = after current trade exits, then K cross-down thru 25 after OB",
    }


def main():
    now = datetime.now(timezone.utc)
    start_ms = int((now - pd.Timedelta(days=DAYS_3Y)).timestamp() * 1000)
    df = fetch_binance_klines("1d", 1300, start_ms=start_ms)
    end_date = pd.Timestamp(now).tz_convert("UTC").normalize()

    closed, first_entry, eq_c, pnl_f, mtm_c, mtm_f, open_pos = simulate_from_first_entry_v2(
        df, end_date
    )

    if not closed and not open_pos:
        print("No entry in window.")
        return

    sim_start = first_entry if first_entry is not None else closed[0].entry_time
    sim_end = closed[-1].exit_time if closed else end_date

    print("=" * 78)
    print("ORIGINAL RULES | 3Y FROM FIRST ENTRY IN WINDOW")
    print("Entry: cross-DOWN @25 after OB | Exit: 2% trail or Stoch 75")
    print("=" * 78)
    print(f"\n  Simulation start (1st entry): {sim_start.date()}")
    print(f"  Through:                      {sim_end.date()}")
    print(f"  Closed trades:                {len(closed)}")
    print(f"  Open position at end:         {'yes' if open_pos else 'no'}")

    nxt = find_next_entry(df)
    print(f"\n  TODAY ({df.index[-1].date()}): BTC {nxt['price']:,.0f} | K={nxt['k']:.1f}")
    if nxt["last_entry_signal"]:
        print(f"  Last entry signal:            {nxt['last_entry_signal'].date()} (current cycle)")
    print(f"  Fresh 'next entry' from now:  wait for this trade to finish, then new cross-down @25")

    spot = (spot_compound_from_first(closed) - 1) * 100
    print(f"\n  TOTALS (from first entry {sim_start.date()}):")
    print(f"    Spot compound (1x):           {spot:+.1f}%")
    print(f"    Fixed EUR1000 @10x:           EUR {START_EUR + pnl_f:,.2f} ({pnl_f / START_EUR * 100:+.1f}%)")
    if open_pos:
        print(f"    Fixed incl. open MTM:         EUR {START_EUR + mtm_f:,.2f}")
    print(f"    Compound @10x (realized):     EUR {eq_c:,.2f} ({(eq_c/START_EUR-1)*100:+,.1f}%)")
    if open_pos:
        print(f"    Compound incl. open MTM:      EUR {mtm_c:,.2f}")

    print("\n" + "=" * 78)
    print("MONTHLY RESULTS (realized on trade EXIT date)")
    print("=" * 78)
    monthly = monthly_report(closed, sim_start, end_date)
    print(f"\n{'Month':<10} {'Trades':>6} {'PnL fixed':>12} {'Equity fixed':>14} {'Equity compound':>16} {'Spot cum%':>10}")
    print("-" * 72)
    for _, r in monthly.iterrows():
        if r["trades"] == 0 and r["month"] > str(sim_start.to_period("M")):
            # still show equity carry
            pass
        print(
            f"{r['month']:<10} {int(r['trades']):>6} {r['pnl_fixed_eur']:>+12,.0f} "
            f"{r['equity_fixed_eur']:>14,.0f} {r['equity_compound_eur']:>16,.0f} "
            f"{r['spot_compound_pct']:>+9.1f}%"
        )

    print("\n  equity_fixed    = EUR 1000 + cumulative fixed-stake PnL (@10x, EUR1000/trade)")
    print("  equity_compound = full reinvest @10x after each closed trade")
    print("\nNot financial advice.")


if __name__ == "__main__":
    main()
