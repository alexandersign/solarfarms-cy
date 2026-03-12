"""
Abstract Market Connector Base

All power exchange and balancing market connectors inherit from this
base class, providing a consistent interface for order submission,
market data retrieval, and settlement.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from enum import Enum


class ConnectionStatus(str, Enum):
    DISCONNECTED = "disconnected"
    CONNECTING = "connecting"
    CONNECTED = "connected"
    ERROR = "error"


@dataclass
class MarketProduct:
    """Definition of a market product."""
    product_id: str
    name: str
    delivery_start: datetime
    delivery_end: datetime
    resolution_minutes: int
    min_quantity_mw: float
    max_quantity_mw: float
    tick_size_eur: float
    gate_closure: datetime
    is_tradable: bool


@dataclass
class OrderBook:
    """Market order book snapshot."""
    product_id: str
    timestamp: datetime
    bids: list[tuple[float, float]]  # (price, quantity) sorted descending
    asks: list[tuple[float, float]]  # (price, quantity) sorted ascending
    last_price: Optional[float] = None
    volume_mwh: Optional[float] = None


@dataclass
class MarketOrder:
    """An order to be submitted to the market."""
    product_id: str
    side: str  # "buy" or "sell"
    quantity_mw: float
    price_eur_mwh: float
    order_type: str = "limit"  # "limit", "market", "block"
    validity: str = "gtc"  # "gtc", "ioc", "fok"


@dataclass
class MarketFill:
    """A trade execution confirmation from the market."""
    order_id: str
    external_trade_id: str
    fill_price: float
    fill_quantity: float
    fill_time: datetime
    counterparty: Optional[str] = None
    fees_eur: float = 0.0


class MarketConnector(ABC):
    """
    Abstract base class for power exchange connectors.

    Implementations:
        - EPEXConnector (EPEX SPOT: DE, FR, AT, BE, NL, CH)
        - NordPoolConnector (Nord Pool: Nordics, Baltics)
        - HEnExConnector (HEnEx: Greece, Cyprus region)
        - OMIEConnector (OMIE: Spain, Portugal)
        - BalancingConnector (TSO balancing markets)
        - OTCConnector (Over-the-counter bilateral)
    """

    @abstractmethod
    async def connect(self) -> None:
        """Establish connection to the market."""
        pass

    @abstractmethod
    async def disconnect(self) -> None:
        """Disconnect from the market."""
        pass

    @abstractmethod
    def status(self) -> ConnectionStatus:
        """Get current connection status."""
        pass

    @abstractmethod
    async def get_products(self) -> list[MarketProduct]:
        """Get available products for trading."""
        pass

    @abstractmethod
    async def get_order_book(self, product_id: str) -> OrderBook:
        """Get current order book for a product."""
        pass

    @abstractmethod
    async def submit_order(self, order: MarketOrder) -> str:
        """Submit an order. Returns external order ID."""
        pass

    @abstractmethod
    async def cancel_order(self, external_order_id: str) -> bool:
        """Cancel a pending order. Returns success."""
        pass

    @abstractmethod
    async def get_fills(self, since: Optional[datetime] = None) -> list[MarketFill]:
        """Get recent trade fills."""
        pass

    @abstractmethod
    async def get_market_prices(
        self,
        start: datetime,
        end: datetime,
    ) -> list[tuple[datetime, float]]:
        """Get historical market prices."""
        pass
