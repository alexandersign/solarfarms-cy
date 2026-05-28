"""
CLI: dry-run signals or testnet paper trading.

  python -m stochrsi_bot.engine.runner --dry-run
  python -m stochrsi_bot.engine.runner --testnet --once
"""

from __future__ import annotations

import argparse
import sys
from datetime import datetime, timezone

from ..config import load_config
from ..exchange import BinanceFuturesClient, round_qty
from ..indicators import closed_daily_bars, fetch_futures_klines
from ..signals import Action, evaluate_signals, evaluate_stoch_exit
from .state import StateStore


def log(msg: str) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"[{ts}] {msg}")


def friday_losing_close(cfg, client, store, pos_side: str, entry_price: float) -> bool:
    now = datetime.now(timezone.utc)
    if now.weekday() != 4 or now.hour < cfg.friday_hour_utc:
        return False
    if not cfg.friday_close_if_losing:
        return False
    mark = float(client.position(cfg.symbol)["markPrice"]) if client.position(cfg.symbol) else 0
    if pos_side == "LONG" and mark >= entry_price:
        log("Friday check: long in profit — keep position")
        return False
    if pos_side == "SHORT" and mark <= entry_price:
        log("Friday check: short in profit — keep position")
        return False
    log(f"Friday close: losing {pos_side} (entry {entry_price}, mark {mark})")
    return True


def run_once(dry_run: bool, testnet: bool) -> int:
    cfg = load_config()
    cfg.dry_run = dry_run
    cfg.testnet = testnet

    if cfg.kill_switch_file.exists():
        log(f"KILL SWITCH active ({cfg.kill_switch_file}) — exiting")
        return 1

    df = fetch_futures_klines(cfg.base_url, cfg.symbol, cfg.interval, limit=80)
    df = closed_daily_bars(df)
    sig = evaluate_signals(cfg, df)

    log("=" * 60)
    log(f"Mode: {cfg.mode} | {'DRY-RUN' if dry_run else 'TESTNET'} | {cfg.symbol} {cfg.interval}")
    log(f"Bar: {sig.bar_time.date()} | Close ${sig.close:,.0f} | K={sig.k:.1f} D={sig.d:.1f}")
    log(f"Signal: {sig.action.value} — {sig.message}")
    log("=" * 60)

    if dry_run:
        return 0

    if not cfg.api_key or not cfg.api_secret:
        log("ERROR: Set BINANCE_API_KEY and BINANCE_API_SECRET in trading-bot/.env")
        return 1

    client = BinanceFuturesClient(cfg.base_url, cfg.api_key, cfg.api_secret)
    store = StateStore(cfg.state_db)
    info = client.exchange_info(cfg.symbol)
    lot = next(f for f in info["filters"] if f["filterType"] == "LOT_SIZE")
    step = float(lot["stepSize"])

    balance = client.balance_usdt()
    log(f"USDT balance: {balance:,.2f}")

    pos = client.position(cfg.symbol)
    open_local = store.open_trade()

    # Sync: exchange flat but DB thinks open
    if pos is None and open_local:
        log("Position closed on exchange (trail hit?) — updating DB")
        store.close_trade(
            open_local["id"],
            datetime.now(timezone.utc).isoformat(),
            0.0,
            "trail_or_external",
        )
        open_local = None

    if pos is not None:
        amt = float(pos["positionAmt"])
        side = "LONG" if amt > 0 else "SHORT"
        entry_price = float(pos["entryPrice"])
        log(f"Open position: {side} qty={abs(amt)} entry=${entry_price:,.0f}")

        if friday_losing_close(cfg, client, store, side, entry_price):
            client.cancel_all(cfg.symbol)
            close_side = "SELL" if side == "LONG" else "BUY"
            client.market_order(cfg.symbol, close_side, abs(amt), reduce_only=True)
            if open_local:
                store.close_trade(
                    open_local["id"],
                    datetime.now(timezone.utc).isoformat(),
                    float(pos["markPrice"]),
                    "friday_losing",
                )
            return 0

        # Stoch exit on closed bar
        from ..indicators import stoch_rsi
        import numpy as np

        k, _ = stoch_rsi(df["close"], cfg.rsi_len, cfg.stoch_len, cfg.smooth_k, cfg.smooth_d)
        kv = k.values
        i = len(df) - 1
        ex = evaluate_stoch_exit(cfg, kv, i, side)
        if ex != Action.NONE:
            log(f"Stoch exit: {ex.value}")
            client.cancel_all(cfg.symbol)
            close_side = "SELL" if side == "LONG" else "BUY"
            client.market_order(cfg.symbol, close_side, abs(amt), reduce_only=True)
            if open_local:
                store.close_trade(
                    open_local["id"],
                    datetime.now(timezone.utc).isoformat(),
                    float(df["close"].iloc[i]),
                    ex.value,
                )
        else:
            orders = client.open_orders(cfg.symbol)
            if not orders:
                log("WARNING: No open orders — re-placing trailing stop")
                trail_side = "SELL" if side == "LONG" else "BUY"
                client.trailing_stop(
                    cfg.symbol,
                    trail_side,
                    abs(amt),
                    cfg.trail_callback_pct,
                )
        return 0

    # Flat — check entry
    if sig.action == Action.ENTER_LONG:
        client.set_margin_type(cfg.symbol, cfg.margin_type)
        client.set_leverage(cfg.symbol, cfg.leverage)
        notional = balance * cfg.leverage
        qty = round_qty(notional / sig.close, step)
        if qty <= 0:
            log("ERROR: quantity too small")
            return 1
        log(f"ENTER LONG qty={qty} @ ~${sig.close:,.0f}")
        client.market_order(cfg.symbol, "BUY", qty)
        trail = client.trailing_stop(cfg.symbol, "SELL", qty, cfg.trail_callback_pct)
        store.start_trade(
            "LONG",
            sig.bar_time.isoformat(),
            sig.close,
            qty,
            str(trail.get("orderId", "")),
        )
        log(f"Trailing stop placed (orderId={trail.get('orderId')})")

    elif sig.action == Action.ENTER_SHORT:
        if cfg.mode == "long_only":
            log("Short signal ignored (mode=long_only)")
            return 0
        client.set_margin_type(cfg.symbol, cfg.margin_type)
        client.set_leverage(cfg.symbol, cfg.leverage)
        notional = balance * cfg.leverage
        qty = round_qty(notional / sig.close, step)
        log(f"ENTER SHORT qty={qty} @ ~${sig.close:,.0f}")
        client.market_order(cfg.symbol, "SELL", qty)
        trail = client.trailing_stop(cfg.symbol, "BUY", qty, cfg.trail_callback_pct)
        store.start_trade(
            "SHORT",
            sig.bar_time.isoformat(),
            sig.close,
            qty,
            str(trail.get("orderId", "")),
        )
        log(f"Trailing stop placed (orderId={trail.get('orderId')})")

    return 0


def main() -> None:
    parser = argparse.ArgumentParser(description="StochRSI BTC daily bot")
    parser.add_argument("--dry-run", action="store_true", help="Signals only, no orders")
    parser.add_argument("--testnet", action="store_true", help="Binance Futures testnet")
    parser.add_argument("--once", action="store_true", help="Run once and exit")
    args = parser.parse_args()

    if not args.dry_run and not args.testnet:
        print("Specify --dry-run or --testnet (mainnet not enabled in v0.1)")
        sys.exit(1)

    code = run_once(dry_run=args.dry_run, testnet=args.testnet)
    sys.exit(code)


if __name__ == "__main__":
    main()
