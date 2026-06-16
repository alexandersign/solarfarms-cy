"""Account queries — balance, position, leverage."""

from __future__ import annotations

from dataclasses import dataclass

from binance.client import Client

from stochrsi_bot.config import BotConfig


@dataclass
class PositionInfo:
    side: str | None  # LONG | SHORT | None
    qty: float
    entry_price: float
    unrealized_pnl: float


def get_usdt_balance(client: Client) -> float:
    balances = client.futures_account_balance()
    for b in balances:
        if b["asset"] == "USDT":
            return float(b["balance"])
    return 0.0


def get_position(client: Client, symbol: str) -> PositionInfo:
    positions = client.futures_position_information(symbol=symbol)
    if not positions:
        return PositionInfo(None, 0.0, 0.0, 0.0)
    p = positions[0]
    amt = float(p["positionAmt"])
    if amt == 0:
        return PositionInfo(None, 0.0, 0.0, 0.0)
    side = "LONG" if amt > 0 else "SHORT"
    return PositionInfo(
        side=side,
        qty=abs(amt),
        entry_price=float(p["entryPrice"]),
        unrealized_pnl=float(p["unRealizedProfit"]),
    )


def ensure_leverage(client: Client, cfg: BotConfig) -> None:
    client.futures_change_leverage(symbol=cfg.symbol, leverage=cfg.leverage)
    margin = cfg.margin_type
    client.futures_change_margin_type(symbol=cfg.symbol, marginType=margin)


def round_qty(qty: float, step: float) -> float:
    if step <= 0:
        return qty
    precision = max(0, len(str(step).rstrip("0").split(".")[-1]) if "." in str(step) else 0)
    rounded = (qty // step) * step
    return float(f"{rounded:.{precision}f}")
