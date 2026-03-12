"""
Trading Engine Core

Manages the complete trade lifecycle from order creation to settlement.
Supports multiple markets and order types.

Trade lifecycle:
    DRAFT -> PENDING -> SUBMITTED -> ACCEPTED/REJECTED -> FILLED/PARTIAL -> SETTLED
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from enum import Enum
from uuid import UUID, uuid4
import structlog

logger = structlog.get_logger()


class OrderStatus(str, Enum):
    DRAFT = "draft"
    PENDING = "pending"
    SUBMITTED = "submitted"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    FILLED = "filled"
    PARTIALLY_FILLED = "partially_filled"
    CANCELLED = "cancelled"
    EXPIRED = "expired"
    SETTLED = "settled"


class OrderSide(str, Enum):
    BUY = "buy"
    SELL = "sell"


class MarketType(str, Enum):
    DAY_AHEAD = "day_ahead"
    INTRADAY_CONTINUOUS = "intraday_continuous"
    INTRADAY_AUCTION = "intraday_auction"
    FCR = "fcr"
    AFRR = "afrr"
    MFRR = "mfrr"
    RR = "rr"
    OTC = "otc"
    PPA = "ppa"


@dataclass
class Order:
    """A trading order."""
    id: UUID = field(default_factory=uuid4)
    site_id: Optional[str] = None
    market: MarketType = MarketType.DAY_AHEAD
    exchange: Optional[str] = None
    product: str = ""
    side: OrderSide = OrderSide.SELL
    quantity_mw: float = 0.0
    price_eur_mwh: float = 0.0
    delivery_start: Optional[datetime] = None
    delivery_end: Optional[datetime] = None
    status: OrderStatus = OrderStatus.DRAFT
    external_order_id: Optional[str] = None
    fill_price: Optional[float] = None
    fill_quantity: Optional[float] = None
    counterparty: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    submitted_at: Optional[datetime] = None
    filled_at: Optional[datetime] = None
    settled_at: Optional[datetime] = None
    created_by: str = "system"
    notes: Optional[str] = None


@dataclass
class Position:
    """An aggregated trading position."""
    market: str
    product: str
    net_quantity_mw: float
    avg_price_eur_mwh: float
    unrealized_pnl_eur: float
    realized_pnl_eur: float
    delivery_start: datetime
    delivery_end: datetime
    orders: list[UUID] = field(default_factory=list)


class TradingEngine:
    """
    Core trading engine managing orders and positions.
    """

    def __init__(self):
        self.orders: dict[UUID, Order] = {}
        self.positions: list[Position] = []
        self._order_history: list[Order] = []
        logger.info("Trading engine initialized")

    def create_order(
        self,
        market: MarketType,
        side: OrderSide,
        quantity_mw: float,
        price_eur_mwh: float,
        delivery_start: datetime,
        delivery_end: datetime,
        site_id: Optional[str] = None,
        product: str = "",
        exchange: Optional[str] = None,
        created_by: str = "system",
    ) -> Order:
        """Create a new trading order."""
        order = Order(
            site_id=site_id,
            market=market,
            exchange=exchange,
            product=product,
            side=side,
            quantity_mw=quantity_mw,
            price_eur_mwh=price_eur_mwh,
            delivery_start=delivery_start,
            delivery_end=delivery_end,
            status=OrderStatus.PENDING,
            created_by=created_by,
        )
        self.orders[order.id] = order
        logger.info(
            "Order created",
            order_id=str(order.id),
            market=market.value,
            side=side.value,
            qty=quantity_mw,
            price=price_eur_mwh,
        )
        return order

    def submit_order(self, order_id: UUID) -> Order:
        """Submit an order to the market."""
        order = self.orders.get(order_id)
        if not order:
            raise ValueError(f"Order {order_id} not found")

        if order.status not in (OrderStatus.PENDING, OrderStatus.DRAFT):
            raise ValueError(f"Cannot submit order in status {order.status}")

        order.status = OrderStatus.SUBMITTED
        order.submitted_at = datetime.utcnow()

        logger.info("Order submitted", order_id=str(order_id))
        return order

    def fill_order(
        self,
        order_id: UUID,
        fill_price: float,
        fill_quantity: Optional[float] = None,
    ) -> Order:
        """Record an order fill (execution)."""
        order = self.orders.get(order_id)
        if not order:
            raise ValueError(f"Order {order_id} not found")

        order.fill_price = fill_price
        order.fill_quantity = fill_quantity or order.quantity_mw
        order.filled_at = datetime.utcnow()

        if order.fill_quantity >= order.quantity_mw:
            order.status = OrderStatus.FILLED
        else:
            order.status = OrderStatus.PARTIALLY_FILLED

        # Update position
        self._update_position(order)

        logger.info(
            "Order filled",
            order_id=str(order_id),
            fill_price=fill_price,
            fill_qty=order.fill_quantity,
        )
        return order

    def cancel_order(self, order_id: UUID, reason: str = "") -> Order:
        """Cancel a pending or submitted order."""
        order = self.orders.get(order_id)
        if not order:
            raise ValueError(f"Order {order_id} not found")

        if order.status not in (OrderStatus.PENDING, OrderStatus.SUBMITTED):
            raise ValueError(f"Cannot cancel order in status {order.status}")

        order.status = OrderStatus.CANCELLED
        order.notes = reason
        logger.info("Order cancelled", order_id=str(order_id), reason=reason)
        return order

    def get_pnl(self, start: Optional[datetime] = None, end: Optional[datetime] = None) -> dict:
        """Calculate P&L for filled orders."""
        total_pnl = 0.0
        by_market: dict[str, float] = {}

        for order in self.orders.values():
            if order.status not in (OrderStatus.FILLED, OrderStatus.SETTLED):
                continue

            if start and order.filled_at and order.filled_at < start:
                continue
            if end and order.filled_at and order.filled_at > end:
                continue

            duration_hours = 1.0
            if order.delivery_start and order.delivery_end:
                duration_hours = (order.delivery_end - order.delivery_start).total_seconds() / 3600

            fill_qty = order.fill_quantity or order.quantity_mw
            fill_price = order.fill_price or order.price_eur_mwh

            if order.side == OrderSide.SELL:
                pnl = fill_qty * duration_hours * fill_price
            else:
                pnl = -fill_qty * duration_hours * fill_price

            total_pnl += pnl
            market_key = order.market.value
            by_market[market_key] = by_market.get(market_key, 0.0) + pnl

        return {
            "total_pnl_eur": total_pnl,
            "by_market": by_market,
            "total_orders": len(self.orders),
            "filled_orders": sum(1 for o in self.orders.values() if o.status in (OrderStatus.FILLED, OrderStatus.SETTLED)),
        }

    def _update_position(self, order: Order) -> None:
        """Update or create position from filled order."""
        # Find existing position for this market/product/delivery period
        for pos in self.positions:
            if (pos.market == order.market.value and
                pos.delivery_start == order.delivery_start and
                pos.delivery_end == order.delivery_end):
                qty = order.fill_quantity or order.quantity_mw
                if order.side == OrderSide.SELL:
                    pos.net_quantity_mw += qty
                else:
                    pos.net_quantity_mw -= qty
                pos.orders.append(order.id)
                return

        # Create new position
        qty = order.fill_quantity or order.quantity_mw
        net_qty = qty if order.side == OrderSide.SELL else -qty
        pos = Position(
            market=order.market.value,
            product=order.product,
            net_quantity_mw=net_qty,
            avg_price_eur_mwh=order.fill_price or order.price_eur_mwh,
            unrealized_pnl_eur=0.0,
            realized_pnl_eur=0.0,
            delivery_start=order.delivery_start or datetime.utcnow(),
            delivery_end=order.delivery_end or datetime.utcnow(),
            orders=[order.id],
        )
        self.positions.append(pos)
