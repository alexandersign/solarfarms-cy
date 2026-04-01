"""
Balancing Market Connector

Generic connector for TSO balancing markets (FCR, aFRR, mFRR).
Configurable for different EU TSOs.

Supported products:
    - FCR: Frequency Containment Reserve (symmetric/asymmetric)
    - aFRR: Automatic Frequency Restoration Reserve (capacity + energy)
    - mFRR: Manual Frequency Restoration Reserve

GridMind FCR capabilities (from readme Section 14.1):
    - Activation time: <1 second (requirement: <30 seconds)
    - Full response: <10 seconds (requirement: <30 seconds)
    - Droop: Configurable (4-6%)
"""

from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Optional
from enum import Enum
import structlog

logger = structlog.get_logger()


class BalancingProduct(str, Enum):
    FCR = "fcr"
    FCR_UP = "fcr_up"
    FCR_DOWN = "fcr_down"
    AFRR_CAPACITY_UP = "afrr_capacity_up"
    AFRR_CAPACITY_DOWN = "afrr_capacity_down"
    AFRR_ENERGY = "afrr_energy"
    MFRR_CAPACITY = "mfrr_capacity"
    MFRR_ENERGY = "mfrr_energy"


@dataclass
class BalancingBid:
    """A bid for a balancing product."""
    product: BalancingProduct
    delivery_start: datetime
    delivery_end: datetime
    capacity_mw: float
    price_eur_mw_h: float  # EUR per MW per hour (capacity)
    energy_price_eur_mwh: Optional[float] = None  # EUR per MWh (energy)
    site_id: Optional[str] = None
    prequalified: bool = True


@dataclass
class ActivationSignal:
    """AGC or manual activation signal from TSO."""
    timestamp: datetime
    product: BalancingProduct
    requested_power_mw: float
    frequency_hz: Optional[float] = None
    duration_seconds: Optional[float] = None


@dataclass
class BalancingPerformance:
    """Performance metrics for balancing service delivery."""
    product: BalancingProduct
    period_start: datetime
    period_end: datetime
    contracted_capacity_mw: float
    avg_delivered_mw: float
    availability_percent: float
    response_time_ms: float
    accuracy_percent: float
    revenue_capacity_eur: float
    revenue_energy_eur: float
    penalties_eur: float


class BalancingMarketConnector:
    """
    Connector for TSO balancing markets.

    Handles:
    1. Bid submission for FCR, aFRR, mFRR capacity/energy
    2. AGC signal reception and response
    3. Performance monitoring and reporting
    4. SOC management for continuous availability
    """

    def __init__(
        self,
        tso_name: str = "TSOC",
        rated_power_kw: float = 1250.0,
        rated_energy_kwh: float = 5015.0,
    ):
        self.tso_name = tso_name
        self.rated_power_kw = rated_power_kw
        self.rated_energy_kwh = rated_energy_kwh

        # Active commitments
        self.active_bids: list[BalancingBid] = []
        self.performance_history: list[BalancingPerformance] = []

        # SOC management for balancing
        self.target_soc_percent = 50.0  # Optimal for symmetric FCR
        self.soc_headroom_min = 20.0  # Minimum SOC for availability
        self.soc_headroom_max = 80.0  # Maximum SOC for availability

        logger.info(
            "Balancing market connector initialized",
            tso=tso_name,
            power_kw=rated_power_kw,
        )

    def calculate_available_capacity(
        self,
        soc_percent: float,
        max_power_fraction: float = 1.0,
    ) -> dict:
        """
        Calculate available capacity for each balancing product
        based on current SOC and power limits.
        """
        available_power_kw = self.rated_power_kw * max_power_fraction

        # FCR requires symmetric capacity
        # Need enough SOC headroom for both charge and discharge
        soc_up_headroom = max(0, soc_percent - self.soc_headroom_min)
        soc_down_headroom = max(0, self.soc_headroom_max - soc_percent)

        # Available energy for sustained delivery (30min at full power)
        energy_up_kwh = soc_up_headroom / 100 * self.rated_energy_kwh
        energy_down_kwh = soc_down_headroom / 100 * self.rated_energy_kwh

        # FCR: symmetric, so limited by smaller direction
        fcr_energy_kwh = min(energy_up_kwh, energy_down_kwh)
        fcr_max_power_kw = min(
            available_power_kw,
            fcr_energy_kwh / 0.5 if fcr_energy_kwh > 0 else 0  # 30min sustained
        )

        # aFRR: can be asymmetric
        afrr_up_kw = min(available_power_kw, energy_up_kwh / 0.25 if energy_up_kwh > 0 else 0)
        afrr_down_kw = min(available_power_kw, energy_down_kwh / 0.25 if energy_down_kwh > 0 else 0)

        return {
            "fcr_symmetric_kw": fcr_max_power_kw,
            "afrr_up_kw": afrr_up_kw,
            "afrr_down_kw": afrr_down_kw,
            "mfrr_up_kw": afrr_up_kw,  # Same as aFRR for now
            "mfrr_down_kw": afrr_down_kw,
            "soc_percent": soc_percent,
            "target_soc_percent": self.target_soc_percent,
        }

    def create_fcr_bid(
        self,
        delivery_start: datetime,
        delivery_end: datetime,
        capacity_mw: float,
        price_eur_mw_h: float,
        symmetric: bool = True,
    ) -> BalancingBid:
        """Create an FCR capacity bid."""
        bid = BalancingBid(
            product=BalancingProduct.FCR,
            delivery_start=delivery_start,
            delivery_end=delivery_end,
            capacity_mw=capacity_mw,
            price_eur_mw_h=price_eur_mw_h,
        )
        self.active_bids.append(bid)
        logger.info(
            "FCR bid created",
            capacity_mw=capacity_mw,
            price=price_eur_mw_h,
            period=f"{delivery_start.isoformat()} to {delivery_end.isoformat()}",
        )
        return bid

    def process_activation(
        self,
        signal: ActivationSignal,
        current_soc: float,
    ) -> float:
        """
        Process an activation signal from the TSO.

        For FCR: respond proportionally to frequency deviation.
        For aFRR: follow AGC setpoint.
        For mFRR: step to requested power level.

        Returns:
            Power setpoint to send to the PCS (kW)
        """
        if signal.product == BalancingProduct.FCR:
            # FCR droop response
            if signal.frequency_hz:
                freq_deviation = signal.frequency_hz - 50.0
                droop = 0.05  # 5% droop
                response_fraction = -freq_deviation / (50.0 * droop)
                response_fraction = max(-1.0, min(1.0, response_fraction))
                power_kw = response_fraction * signal.requested_power_mw * 1000
                return power_kw

        elif signal.product in (BalancingProduct.AFRR_ENERGY, BalancingProduct.AFRR_CAPACITY_UP):
            # aFRR: follow AGC signal directly
            return signal.requested_power_mw * 1000  # MW to kW

        elif signal.product in (BalancingProduct.MFRR_ENERGY, BalancingProduct.MFRR_CAPACITY):
            # mFRR: step response
            return signal.requested_power_mw * 1000

        return 0.0

    def get_soc_management_setpoint(
        self,
        current_soc: float,
        active_products: list[BalancingProduct],
    ) -> Optional[float]:
        """
        Calculate SOC management setpoint to maintain availability.

        If SOC drifts from target during FCR delivery, inject small
        charge/discharge to restore SOC during idle periods.
        """
        if not active_products:
            return None

        soc_error = current_soc - self.target_soc_percent

        # Only correct if deviation is significant (>5%)
        if abs(soc_error) < 5.0:
            return None

        # Gentle correction: max 10% of rated power
        correction_kw = -soc_error / 100 * self.rated_power_kw * 0.1
        correction_kw = max(-self.rated_power_kw * 0.1, min(self.rated_power_kw * 0.1, correction_kw))

        logger.debug(
            "SOC management",
            soc=f"{current_soc:.1f}%",
            target=f"{self.target_soc_percent:.1f}%",
            correction_kw=f"{correction_kw:.1f}",
        )
        return correction_kw
