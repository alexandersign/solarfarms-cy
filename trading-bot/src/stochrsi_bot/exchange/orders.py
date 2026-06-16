"""Order placement — market entry, trailing stop, close."""

from __future__ import annotations

from binance.client import Client

from stochrsi_bot.config import BotConfig
from stochrsi_bot.exchange.account import get_position, round_qty
from stochrsi_bot.signals import Side


def _symbol_filters(client: Client, symbol: str) -> tuple[float, float]:
    info = client.futures_exchange_info()
    for s in info["symbols"]:
        if s["symbol"] == symbol:
            step = min_qty = 0.0
            for f in s["filters"]:
                if f["filterType"] == "LOT_SIZE":
                    step = float(f["stepSize"])
                    min_qty = float(f["minQty"])
            return step, min_qty
    return 0.001, 0.001


def calc_qty(client: Client, cfg: BotConfig, price: float, equity: float) -> float:
    step, min_qty = _symbol_filters(client, cfg.symbol)
    notional = equity * cfg.leverage
    qty = round_qty(notional / price, step)
    return max(qty, min_qty)


def open_long(client: Client, cfg: BotConfig, equity: float, price: float) -> dict:
    qty = calc_qty(client, cfg, price, equity)
    return client.futures_create_order(
        symbol=cfg.symbol,
        side="BUY",
        type="MARKET",
        quantity=qty,
    )


def open_short(client: Client, cfg: BotConfig, equity: float, price: float) -> dict:
    qty = calc_qty(client, cfg, price, equity)
    return client.futures_create_order(
        symbol=cfg.symbol,
        side="SELL",
        type="MARKET",
        quantity=qty,
    )


def attach_trailing_stop(client: Client, cfg: BotConfig, side: Side, qty: float) -> dict:
    close_side = "SELL" if side == Side.LONG else "BUY"
    step, _ = _symbol_filters(client, cfg.symbol)
    qty = round_qty(qty, step)
    return client.futures_create_order(
        symbol=cfg.symbol,
        side=close_side,
        type="TRAILING_STOP_MARKET",
        quantity=qty,
        callbackRate=cfg.trail.callback_pct,
        reduceOnly=True,
    )


def cancel_all_open_orders(client: Client, symbol: str) -> None:
    client.futures_cancel_all_open_orders(symbol=symbol)


def close_position_market(client: Client, cfg: BotConfig) -> dict | None:
    pos = get_position(client, cfg.symbol)
    if not pos.side or pos.qty <= 0:
        return None
    side = "SELL" if pos.side == "LONG" else "BUY"
    step, _ = _symbol_filters(client, cfg.symbol)
    qty = round_qty(pos.qty, step)
    cancel_all_open_orders(client, cfg.symbol)
    return client.futures_create_order(
        symbol=cfg.symbol,
        side=side,
        type="MARKET",
        quantity=qty,
        reduceOnly=True,
    )
