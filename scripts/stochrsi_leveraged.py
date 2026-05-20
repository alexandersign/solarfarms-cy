"""
Leveraged account simulation: EUR 1000 start, 10x leverage, trailing stop.
Uses StochRSI system: buy cross-DOWN @25 after overbought, exit @ Stoch 75 OR trailing stop.
"""

from __future__ import annotations

import sys
from dataclasses import dataclass

import numpy as np
import pandas as pd

sys.path.insert(0, __import__("pathlib").Path(__file__).parent.as_posix())
from stochrsi_backtest import fetch_btc, slice_period, stoch_rsi

START_EUR = 1000.0
LEVERAGE = 10
FEE_RATE = 0.0005  # 0.05% per side on notional (approx taker)


@dataclass
class LevTrade:
    entry_time: pd.Timestamp
    exit_time: pd.Timestamp | None
    entry_price: float
    exit_price: float | None
    equity_before: float
    equity_after: float | None
    pnl_eur: float | None
    exit_reason: str = ""
    peak_price: float = 0.0


def run_leveraged_backtest(
    df: pd.DataFrame,
    trail_pct: float,
    start_eur: float = START_EUR,
    leverage: int = LEVERAGE,
    buy_level: float = 25,
    sell_level: float = 75,
    overbought_level: float = 75,
    lookback_bars: int = 30,
) -> tuple[list[LevTrade], float, float]:
    """
    Full margin each trade: notional = equity * leverage.
    Exit on first of: StochRSI cross up through 75 (close), trailing stop (intrabar low).
    Liquidation if equity <= 0 after a trade.
    """
    k, _ = stoch_rsi(df["close"])
    k_vals = k.values
    closes = df["close"].values
    highs = df["high"].values
    lows = df["low"].values
    times = df.index

    equity = start_eur
    peak_equity = equity
    max_dd_pct = 0.0
    trades: list[LevTrade] = []
    in_pos = False
    entry_bar = 0
    entry_price = 0.0
    peak_price = 0.0
    equity_at_entry = 0.0
    entry_time = None

    for i in range(lookback_bars + 1, len(df)):
        if equity <= 0:
            break
        if np.isnan(k_vals[i]) or np.isnan(k_vals[i - 1]):
            continue

        was_ob = np.nanmax(k_vals[max(0, i - lookback_bars) : i]) >= overbought_level

        if not in_pos:
            if not was_ob:
                continue
            if k_vals[i - 1] > buy_level >= k_vals[i]:
                in_pos = True
                entry_bar = i
                entry_price = closes[i]
                peak_price = highs[i]
                equity_at_entry = equity
                entry_time = times[i]
                # entry fee
                equity -= equity * leverage * FEE_RATE
        else:
            peak_price = max(peak_price, highs[i])
            trail_stop = peak_price * (1 - trail_pct / 100)

            exit_price = None
            exit_reason = ""

            # Trailing stop (intrabar)
            if lows[i] <= trail_stop:
                exit_price = trail_stop
                exit_reason = f"trail_{trail_pct:.0f}pct"
            # Stoch exit at close
            elif k_vals[i - 1] < sell_level <= k_vals[i]:
                exit_price = closes[i]
                exit_reason = "stoch_75"

            if exit_price is not None:
                price_ret = (exit_price / entry_price - 1) * 100
                pnl = equity_at_entry * leverage * (price_ret / 100)
                equity = equity_at_entry + pnl
                equity -= abs(equity_at_entry * leverage * FEE_RATE)  # exit fee approx

                trades.append(
                    LevTrade(
                        entry_time=entry_time,
                        exit_time=times[i],
                        entry_price=entry_price,
                        exit_price=exit_price,
                        equity_before=equity_at_entry,
                        equity_after=equity,
                        pnl_eur=equity - equity_at_entry,
                        exit_reason=exit_reason,
                        peak_price=peak_price,
                    )
                )
                peak_equity = max(peak_equity, equity)
                dd = (peak_equity - equity) / peak_equity * 100 if peak_equity > 0 else 0
                max_dd_pct = max(max_dd_pct, dd)
                in_pos = False
                if equity <= 0:
                    equity = 0
                    break

    # Open position MTM
    if in_pos and equity > 0:
        mtm_price = closes[-1]
        price_ret = (mtm_price / entry_price - 1) * 100
        mtm_equity = equity_at_entry + equity_at_entry * leverage * (price_ret / 100)
        trades.append(
            LevTrade(
                entry_time=entry_time,
                exit_time=None,
                entry_price=entry_price,
                exit_price=mtm_price,
                equity_before=equity_at_entry,
                equity_after=mtm_equity,
                pnl_eur=mtm_equity - equity_at_entry,
                exit_reason="open_mtm",
                peak_price=peak_price,
            )
        )
        equity = mtm_equity

    return trades, equity, max_dd_pct


def print_report(trail_pct: float, period: str, df: pd.DataFrame) -> dict:
    trades, final, max_dd = run_leveraged_backtest(df, trail_pct)
    closed = [t for t in trades if t.exit_reason not in ("open_mtm",)]
    open_t = [t for t in trades if t.exit_reason == "open_mtm"]
    start = START_EUR
    ret_pct = (final / start - 1) * 100
    wins = sum(1 for t in closed if t.pnl_eur and t.pnl_eur > 0)
    trail_exits = sum(1 for t in closed if t.exit_reason.startswith("trail"))
    stoch_exits = sum(1 for t in closed if t.exit_reason == "stoch_75")
    blown = final <= 0

    return {
        "period": period,
        "trail_pct": trail_pct,
        "trades": len(closed),
        "wins": wins,
        "win_rate": round(100 * wins / len(closed), 1) if closed else 0,
        "trail_exits": trail_exits,
        "stoch_exits": stoch_exits,
        "start_eur": start,
        "final_eur": round(final, 2),
        "return_pct": round(ret_pct, 1),
        "max_dd_pct": round(max_dd, 1),
        "blown": blown,
        "open_pnl": round(open_t[0].pnl_eur, 2) if open_t else 0,
    }


def main() -> None:
    print("=" * 78)
    print("LEVERAGED SIMULATION: EUR 1000 | 10x | StochRSI buy@25 sell@75 + trailing stop")
    print(f"Fees: {FEE_RATE*100:.2f}% per side on notional | Full margin each trade")
    print("=" * 78)

    df_full = fetch_btc("1d", 1500)
    trails = [3.0, 5.0, 8.0, 10.0]
    periods = [("90d", 90), ("180d", 180), ("365d", 365), ("730d", 730), ("all", None)]

    rows: list[dict] = []
    for plabel, days in periods:
        df = slice_period(df_full, days)
        if len(df) < 50:
            continue
        for trail in trails:
            rows.append(print_report(trail, plabel, df))

    hdr = (
        f"{'Period':<6} {'Trail%':>6} {'Trades':>6} {'Win%':>6} "
        f"{'TrailEx':>7} {'StochEx':>7} {'Final EUR':>10} {'Return':>8} {'MaxDD':>7} {'Blown':>6}"
    )
    print("\n" + hdr)
    print("-" * len(hdr))
    for r in rows:
        blown = "YES" if r["blown"] else "no"
        print(
            f"{r['period']:<6} {r['trail_pct']:>5.0f}% {r['trades']:>6} {r['win_rate']:>5.1f}% "
            f"{r['trail_exits']:>7} {r['stoch_exits']:>7} {r['final_eur']:>10,.2f} "
            f"{r['return_pct']:>+7.1f}% {r['max_dd_pct']:>6.1f}% {blown:>6}"
        )

    # Detail best/worst + current open trade for 5% trail (common default)
    print("\n" + "=" * 78)
    print("TRADE LOG: 1d / 90d / 5% trailing stop")
    print("=" * 78)
    df90 = slice_period(df_full, 90)
    trades, final, _ = run_leveraged_backtest(df90, 5.0)
    for t in trades:
        status = t.exit_reason
        ex = t.exit_time.date() if t.exit_time else "OPEN"
        pnl = t.pnl_eur if t.pnl_eur is not None else 0
        print(
            f"  {t.entry_time.date()} EUR{t.equity_before:,.0f} @ ${t.entry_price:,.0f} -> "
            f"{ex} @ ${t.exit_price:,.0f} | PnL EUR{pnl:+,.0f} | {status}"
        )
    print(f"  => Final balance: EUR {final:,.2f} (started EUR {START_EUR:,.0f})")

    print("\n" + "=" * 78)
    print("KEY TAKEAWAY")
    print("=" * 78)
    pos_90_5 = next(r for r in rows if r["period"] == "90d" and r["trail_pct"] == 5.0)
    pos_all_5 = next(r for r in rows if r["period"] == "all" and r["trail_pct"] == 5.0)
    neg_all_5 = pos_all_5["final_eur"] < START_EUR
    print(
        f"  90d + 5% trail: EUR {pos_90_5['final_eur']:,.0f} ({pos_90_5['return_pct']:+.0f}%)"
    )
    print(
        f"  All history + 5% trail: EUR {pos_all_5['final_eur']:,.0f} ({pos_all_5['return_pct']:+.0f}%)"
    )
    print(
        f"  Tight trails (3%) often stop out before Stoch 75; wide trails (10%) behave like no stop."
    )
    print("\nNot financial advice. Leverage magnifies losses; real fills/slippage/funding differ.")


if __name__ == "__main__":
    main()
