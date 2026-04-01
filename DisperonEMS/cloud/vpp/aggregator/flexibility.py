"""
Flexibility Quantification

Calculates available flexibility (upward/downward) for the VPP
portfolio, considering current SOC, power limits, and ancillary
service commitments.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional
import structlog

from cloud.vpp.aggregator.portfolio import VPPPortfolio

logger = structlog.get_logger()


@dataclass
class FlexibilityOffer:
    """Available flexibility from the VPP."""
    timestamp: datetime
    upward_mw: float  # Available increase in generation (discharge)
    downward_mw: float  # Available decrease / increase consumption (charge)
    upward_energy_mwh: float  # Available for sustained upward
    downward_energy_mwh: float  # Available for sustained downward
    duration_hours: float  # How long flexibility can be sustained
    confidence_percent: float  # Confidence in availability


class FlexibilityCalculator:
    """
    Calculates and offers flexibility from the VPP portfolio.
    """

    def __init__(self, portfolio: VPPPortfolio):
        self.portfolio = portfolio

    def calculate(self, duration_hours: float = 1.0) -> FlexibilityOffer:
        """
        Calculate current available flexibility.

        Args:
            duration_hours: Required sustained duration

        Returns:
            FlexibilityOffer with available capacity and energy
        """
        summary = self.portfolio.get_summary()
        available = self.portfolio.get_available_for_market()

        upward_kw = 0.0  # Discharge capacity
        downward_kw = 0.0  # Charge capacity
        upward_energy_kwh = 0.0
        downward_energy_kwh = 0.0

        for asset in available:
            avail_power = (
                asset.rated_power_kw * asset.max_power_fraction
                - asset.reserved_capacity_kw
            )

            # Upward: can discharge from current SOC to minimum
            soc_headroom_up = max(0, asset.current_soc_percent - 5.0) / 100
            energy_up = soc_headroom_up * asset.rated_energy_kwh * asset.current_soh_percent / 100
            max_discharge_for_duration = energy_up / duration_hours if duration_hours > 0 else avail_power
            actual_up = min(avail_power, max_discharge_for_duration) - asset.current_power_kw

            # Downward: can charge from current SOC to maximum
            soc_headroom_down = max(0, 95.0 - asset.current_soc_percent) / 100
            energy_down = soc_headroom_down * asset.rated_energy_kwh * asset.current_soh_percent / 100
            max_charge_for_duration = energy_down / duration_hours if duration_hours > 0 else avail_power
            actual_down = min(avail_power, max_charge_for_duration) + asset.current_power_kw

            upward_kw += max(0, actual_up)
            downward_kw += max(0, actual_down)
            upward_energy_kwh += energy_up
            downward_energy_kwh += energy_down

        # Confidence based on number of available assets
        confidence = min(100, len(available) / max(len(self.portfolio.assets), 1) * 100)

        offer = FlexibilityOffer(
            timestamp=datetime.utcnow(),
            upward_mw=upward_kw / 1000,
            downward_mw=downward_kw / 1000,
            upward_energy_mwh=upward_energy_kwh / 1000,
            downward_energy_mwh=downward_energy_kwh / 1000,
            duration_hours=duration_hours,
            confidence_percent=confidence,
        )

        logger.info(
            "Flexibility calculated",
            upward_mw=f"{offer.upward_mw:.2f}",
            downward_mw=f"{offer.downward_mw:.2f}",
            assets=len(available),
        )

        return offer
