"""CLI entrypoint — dry-run, testnet, status."""

from __future__ import annotations

import argparse
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from stochrsi_bot.config import BotConfig, load_config
from stochrsi_bot.data.klines import fetch_klines
from stochrsi_bot.engine.state import StateStore
from stochrsi_bot.notify.console import log, log_signal, log_snapshot
from stochrsi_bot.risk.friday import should_friday_close
from stochrsi_bot.risk.limits import can_open_position
from stochrsi_bot.signals import (
    Action,
    PositionState,
    Side,
    latest_snapshot,
    run_simulation,
)


def _root() -> Path:
    return Path(__file__).resolve().parents[3]


def _db_path() -> Path:
    return _root() / "logs" / "bot_state.db"


def cmd_dry_run(cfg: BotConfig, bars: int = 120) -> int:
    df = fetch_klines(cfg.symbol, cfg.interval, limit=bars)
    snap = latest_snapshot(df, cfg, closed_only=True)
    log_snapshot(snap)

    trades, final, max_dd, pos = run_simulation(df, cfg)
    closed = trades
    log(f"\nSimulation ({cfg.mode}, {len(df)} bars): {len(closed)} closed trades")
    log(f"  Final equity: ${final:,.2f} | Max DD: {max_dd:.1f}%")
    if closed:
        log("  Last 5 trades:")
        for t in closed[-5:]:
            log(
                f"    {t.side.value} {t.entry_time.date()} -> {t.exit_time.date()} "
                f"${t.entry_price:,.0f}->${t.exit_price:,.0f} ${t.pnl:+,.0f} {t.reason}"
            )
    if pos.side:
        log(f"  Open: {pos.side.value} since {pos.entry_time.date()} @ ${pos.entry_price:,.0f}")
    return 0


def cmd_status(cfg: BotConfig) -> int:
    if not cfg.binance_api_key:
        log("No API keys — use --dry-run for signal-only mode")
        return 1
    from stochrsi_bot.exchange.account import get_position, get_usdt_balance
    from stochrsi_bot.exchange.binance_client import make_client

    client = make_client(cfg)
    bal = get_usdt_balance(client)
    pos = get_position(client, cfg.symbol)
    log(f"Mode: {'testnet' if cfg.binance_testnet else 'MAINNET'}")
    log(f"USDT balance: ${bal:,.2f}")
    if pos.side:
        log(f"Position: {pos.side} qty={pos.qty} entry=${pos.entry_price:,.2f} uPnL=${pos.unrealized_pnl:+,.2f}")
    else:
        log("Position: FLAT")
    df = fetch_klines(cfg.symbol, cfg.interval, limit=80, futures=True, testnet=cfg.binance_testnet)
    snap = latest_snapshot(df, cfg)
    log_snapshot(snap)
    return 0


def _execute_signal(cfg: BotConfig, action: Action, price: float, store: StateStore, confirm: bool) -> None:
    if confirm:
        log(f"CONFIRM required — would execute {action.value} @ ${price:,.2f}")
        return
    if not cfg.binance_api_key:
        log("No API keys configured")
        return

    from stochrsi_bot.exchange.account import ensure_leverage, get_position, get_usdt_balance
    from stochrsi_bot.exchange.binance_client import make_client
    from stochrsi_bot.exchange.orders import (
        attach_trailing_stop,
        close_position_market,
        open_long,
        open_short,
    )

    client = make_client(cfg)
    ensure_leverage(client, cfg)
    equity = get_usdt_balance(client)
    mode_label = "testnet" if cfg.binance_testnet else "mainnet"

    if action in (Action.ENTER_LONG, Action.ENTER_SHORT):
        risk = can_open_position(cfg, equity, equity, equity, _root())
        if not risk.ok:
            log(f"Risk block: {risk.reason}")
            return
        pos = get_position(client, cfg.symbol)
        if pos.side:
            log(f"Already in position ({pos.side}) — skip entry")
            return
        if action == Action.ENTER_LONG:
            open_long(client, cfg, equity, price)
            side = Side.LONG
        else:
            open_short(client, cfg, equity, price)
            side = Side.SHORT
        pos = get_position(client, cfg.symbol)
        trail = attach_trailing_stop(client, cfg, side, pos.qty)
        tid = store.log_trade_open(
            side.value, datetime.now(timezone.utc), price, pos.qty, equity, mode_label
        )
        store.set("open_trade_id", str(tid))
        store.set("trail_order_id", str(trail.get("orderId", "")))
        log(f"Opened {side.value} qty={pos.qty} trail order={trail.get('orderId')}")

    elif action in (Action.EXIT_LONG, Action.EXIT_SHORT, Action.FRIDAY_CLOSE):
        tid = store.open_trade_id()
        result = close_position_market(client, cfg.symbol)
        if result:
            log(f"Closed position: orderId={result.get('orderId')}")
            if tid:
                store.log_trade_close(tid, datetime.now(timezone.utc), price, 0.0, action.value)
        store.set("open_trade_id", "")
        store.set("trail_order_id", "")


def cmd_evaluate(cfg: BotConfig, *, confirm: bool = False, execute: bool = False) -> int:
    df = fetch_klines(
        cfg.symbol, cfg.interval, limit=120,
        futures=True, testnet=cfg.binance_testnet,
    )
    snap = latest_snapshot(df, cfg, closed_only=True)
    log_snapshot(snap)
    store = StateStore(_db_path())

    event = snap["signal"]
    if event.action != Action.NONE:
        log_signal(event)
        if execute and cfg.binance_api_key:
            _execute_signal(cfg, event.action, event.price, store, confirm)

    # Friday rule (intraday, not tied to daily close)
    pos_state = PositionState(
        Side(snap["position"]) if snap["position"] else None,
        snap["entry_price"] or 0.0,
        snap["entry_time"],
    )
    if should_friday_close(pos_state, snap["price"], cfg):
        log("FRIDAY CLOSE: position is losing — would market close")
        if execute and cfg.binance_api_key:
            _execute_signal(cfg, Action.FRIDAY_CLOSE, snap["price"], store, confirm)

    store.set("last_candle_ts", str(snap["bar_time"]))
    return 0


def cmd_flat(cfg: BotConfig, confirm: bool = False) -> int:
    if not cfg.binance_api_key:
        log("No API keys")
        return 1
    if confirm:
        log("CONFIRM mode — would close all positions")
        return 0
    store = StateStore(_db_path())
    from stochrsi_bot.exchange.binance_client import make_client
    from stochrsi_bot.exchange.orders import close_position_market

    client = make_client(cfg)
    result = close_position_market(client, cfg)
    if result:
        tid = store.open_trade_id()
        if tid:
            store.log_trade_close(tid, datetime.now(timezone.utc), 0.0, 0.0, "manual_flat")
        store.set("open_trade_id", "")
        store.set("trail_order_id", "")
        log(f"Flat command sent: orderId={result.get('orderId')}")
    else:
        log("Already flat")
    return 0


def cmd_loop(cfg: BotConfig, confirm: bool, execute: bool, poll_sec: int = 60) -> int:
    log(f"Loop mode — poll every {poll_sec}s (Ctrl+C to stop)")
    while True:
        try:
            cmd_evaluate(cfg, confirm=confirm, execute=execute)
            time.sleep(poll_sec)
        except KeyboardInterrupt:
            log("Stopped.")
            return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="StochRSI BTC daily bot")
    p.add_argument("--dry-run", action="store_true", help="Signal + sim only (no API)")
    p.add_argument("--testnet", action="store_true", help="Use Binance futures testnet")
    p.add_argument("--mainnet", action="store_true", help="Use Binance futures mainnet")
    p.add_argument("--once", action="store_true", help="Single evaluation then exit")
    p.add_argument("--loop", action="store_true", help="Poll loop")
    p.add_argument("--confirm", action="store_true", help="Log actions but do not place orders")
    p.add_argument("--execute", action="store_true", help="Auto-place orders (testnet/mainnet)")
    p.add_argument("--status", action="store_true", help="Account + signal status")
    p.add_argument("--flat", action="store_true", help="Close all positions")
    p.add_argument("--mode", choices=["long_only", "short_only", "both"], help="Override config mode")
    p.add_argument("--config", type=Path, help="Path to YAML config")
    return p


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    cfg = load_config(config_path=args.config, mode_override=args.mode)

    if args.testnet:
        cfg.binance_testnet = True
    if args.mainnet:
        cfg.binance_testnet = False

    if args.status:
        return cmd_status(cfg)
    if args.flat:
        return cmd_flat(cfg, confirm=args.confirm)
    if args.dry_run:
        return cmd_dry_run(cfg)
    if args.once or args.loop:
        execute = args.execute and not args.confirm
        if args.loop:
            return cmd_loop(cfg, confirm=args.confirm, execute=execute)
        return cmd_evaluate(cfg, confirm=args.confirm, execute=execute)

    # Default: dry-run
    return cmd_dry_run(cfg)


if __name__ == "__main__":
    sys.exit(main())
