"""EUR 1000 start, 20x, compounding, no deposits. 25/75 + 2% trail."""

import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from stochrsi_backtest import fetch_binance_klines, stoch_rsi

START = 1000.0
LEVERAGE = 20
BUY, SELL, TRAIL = 25, 75, 2.0
LOOKBACK = 30
FEE = 0.0005
DAYS_3Y = 365 * 3


def run(df):
    k, _ = stoch_rsi(df["close"])
    kv = k.values
    c = df["close"].values
    h = df["high"].values
    lo = df["low"].values
    times = df.index

    eq = START
    peak_eq = eq
    max_dd = 0.0
    in_pos = False
    ep = pp = 0.0
    eq0 = START
    entry_time = None
    log = []

    for i in range(LOOKBACK + 1, len(df)):
        if eq <= 0:
            log.append({"date": times[i], "event": "DEAD", "equity": 0})
            break
        if np.isnan(kv[i]) or np.isnan(kv[i - 1]):
            continue

        was_ob = np.nanmax(kv[max(0, i - LOOKBACK) : i]) >= SELL

        if not in_pos:
            if was_ob and kv[i - 1] > BUY >= kv[i]:
                in_pos = True
                ep = c[i]
                pp = h[i]
                eq0 = eq
                entry_time = times[i]
                eq -= eq * LEVERAGE * FEE
                log.append({
                    "date": times[i], "event": "ENTRY", "price": ep,
                    "equity": eq, "margin": eq0,
                })
        else:
            pp = max(pp, h[i])
            ex = reason = None

            liq = ep * (1 - 1 / LEVERAGE)  # -5% at 20x
            if lo[i] <= liq:
                ex, reason = liq, "LIQUIDATED"
            elif lo[i] <= pp * (1 - TRAIL / 100):
                ex, reason = pp * (1 - TRAIL / 100), "TRAIL_2PCT"
            elif kv[i - 1] < SELL <= kv[i]:
                ex, reason = c[i], "STOCH_75"

            if ex is not None:
                ret = (ex / ep - 1) * 100
                eq_before = eq0
                if reason == "LIQUIDATED":
                    eq = 0.0
                else:
                    eq = max(0.0, eq0 + eq0 * LEVERAGE * (ret / 100) - abs(eq0 * LEVERAGE * FEE))
                peak_eq = max(peak_eq, eq)
                dd = (peak_eq - eq) / peak_eq * 100 if peak_eq > 0 else 0
                max_dd = max(max_dd, dd)
                log.append({
                    "date": times[i], "event": "EXIT", "reason": reason,
                    "entry_date": entry_time, "entry": ep, "exit": ex,
                    "btc_pct": ret, "equity_before": eq_before, "equity": eq,
                    "pnl_pct_acct": (eq / eq_before - 1) * 100 if eq_before else -100,
                })
                in_pos = False
                if eq <= 0:
                    log.append({"date": times[i], "event": "BLOWN", "equity": 0})
                    break

    if in_pos and eq > 0:
        ret = (c[-1] / ep - 1) * 100
        eq = eq0 + eq0 * LEVERAGE * (ret / 100)
        log.append({
            "date": times[-1], "event": "OPEN_MTM", "entry": ep,
            "price": c[-1], "btc_pct": ret, "equity": eq,
        })

    return eq, max_dd, log


def report(df, label: str):
    final, max_dd, log = run(df)
    d0, d1 = df.index.min().date(), df.index.max().date()
    exits = [x for x in log if x.get("event") == "EXIT"]
    blown = final <= 0
    liqs = [x for x in exits if x.get("reason") == "LIQUIDATED"]
    trails = [x for x in exits if x.get("reason") == "TRAIL_2PCT"]
    stochs = [x for x in exits if x.get("reason") == "STOCH_75"]

    print("=" * 72)
    print(f"COMPOUNDING SIM | EUR {START:,.0f} start | {LEVERAGE}x | NO deposits")
    print(f"25/75 + 2% trail | {label} ({d0} to {d1})")
    print("=" * 72)
    print(f"\n  Final equity:     EUR {final:,.2f}")
    print(f"  Total return:     {(final/START-1)*100:+,.1f}%")
    print(f"  Max drawdown:     {max_dd:.1f}%")
    print(f"  Account blown?    {'YES' if blown else 'NO'}")
    print(f"  Liquidations:     {len(liqs)}")
    print(f"  Trail exits:      {len(trails)}")
    print(f"  Stoch 75 exits:   {len(stochs)}")
    print(f"  Closed trades:    {len(exits)}")

    if liqs:
        print("\n  LIQUIDATION EVENTS:")
        for x in liqs:
            print(f"    {x['date'].date()} entry ${x['entry']:,.0f} -> liq ${x['exit']:,.0f} | acct EUR {x['equity_before']:,.0f} -> 0")

    print("\n  EQUITY CURVE (after each closed trade):")
    for x in exits:
        d = x["date"].date()
        r = x["reason"]
        e = x["equity"]
        p = x["pnl_pct_acct"]
        print(f"    {d} | {r:<12} | BTC {x['btc_pct']:+.1f}% | acct {p:+.1f}% | EUR {e:,.2f}")

    open_t = [x for x in log if x.get("event") == "OPEN_MTM"]
    if open_t:
        o = open_t[0]
        print(f"\n  OPEN: entry ${o['entry']:,.0f} | MTM EUR {o['equity']:,.2f} ({o['btc_pct']:+.1f}%)")

    worst = min(exits, key=lambda x: x["pnl_pct_acct"]) if exits else None
    if worst:
        print(f"\n  Worst trade: {worst['date'].date()} {worst['reason']} | acct {worst['pnl_pct_acct']:+.1f}% | EUR {worst['equity']:,.2f}")

    print()


def main():
    start_3y = int((datetime.now(timezone.utc) - pd.Timedelta(days=DAYS_3Y)).timestamp() * 1000)
    start_6y = int(datetime(2020, 5, 18, tzinfo=timezone.utc).timestamp() * 1000)
    df_3y = fetch_binance_klines("1d", 1200, start_ms=start_3y)
    df_6y = fetch_binance_klines("1d", 2500, start_ms=start_6y)
    report(df_3y, "3 years")
    report(df_6y, "6 years")
    print("Not financial advice.")


if __name__ == "__main__":
    main()
