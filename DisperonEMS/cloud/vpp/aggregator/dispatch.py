"""
VPP Optimal Fleet Dispatch

Distributes a total power setpoint across multiple BESS assets
while considering individual constraints, degradation costs,
and communication latency.
"""

from dataclasses import dataclass
from typing import Optional
import numpy as np
import structlog

from cloud.vpp.aggregator.portfolio import VPPAsset, VPPPortfolio

logger = structlog.get_logger()


@dataclass
class DispatchAllocation:
    """Power allocation for a single asset."""
    site_id: str
    power_kw: float
    reason: str


@dataclass
class FleetDispatch:
    """Complete fleet dispatch result."""
    total_requested_kw: float
    total_allocated_kw: float
    allocations: list[DispatchAllocation]
    shortfall_kw: float
    timestamp: str


class FleetDispatcher:
    """
    Optimal dispatch across a fleet of BESS assets.

    Dispatch strategies:
    1. Pro-rata: Distribute proportionally to available capacity
    2. Merit-order: Prioritize assets with lowest marginal cost (degradation)
    3. SOC-balancing: Equalize SOC across fleet
    4. Minimum-degradation: Minimize total fleet degradation
    """

    def __init__(self, portfolio: VPPPortfolio):
        self.portfolio = portfolio
        logger.info("Fleet dispatcher initialized")

    def dispatch(
        self,
        total_power_kw: float,
        strategy: str = "merit_order",
    ) -> FleetDispatch:
        """
        Compute optimal power allocation across fleet.

        Args:
            total_power_kw: Total power to dispatch (positive = discharge)
            strategy: Dispatch strategy

        Returns:
            Fleet dispatch with per-asset allocations
        """
        available = self.portfolio.get_available_for_market()
        if not available:
            return FleetDispatch(
                total_requested_kw=total_power_kw,
                total_allocated_kw=0,
                allocations=[],
                shortfall_kw=abs(total_power_kw),
                timestamp=str(np.datetime64("now")),
            )

        if strategy == "pro_rata":
            return self._dispatch_pro_rata(total_power_kw, available)
        elif strategy == "merit_order":
            return self._dispatch_merit_order(total_power_kw, available)
        elif strategy == "soc_balancing":
            return self._dispatch_soc_balancing(total_power_kw, available)
        else:
            return self._dispatch_pro_rata(total_power_kw, available)

    def _dispatch_pro_rata(
        self,
        total_kw: float,
        assets: list[VPPAsset],
    ) -> FleetDispatch:
        """Distribute power proportionally to available capacity."""
        total_available = sum(
            a.rated_power_kw * a.max_power_fraction - a.reserved_capacity_kw
            for a in assets
        )

        allocations = []
        total_allocated = 0.0

        for asset in assets:
            available = asset.rated_power_kw * asset.max_power_fraction - asset.reserved_capacity_kw
            if total_available > 0:
                fraction = available / total_available
                power = total_kw * fraction

                # SOC constraints
                if power > 0 and asset.current_soc_percent < 5:
                    power = 0  # Can't discharge
                elif power < 0 and asset.current_soc_percent > 95:
                    power = 0  # Can't charge

                power = np.clip(power, -available, available)
            else:
                power = 0

            allocations.append(DispatchAllocation(
                site_id=asset.site_id,
                power_kw=float(power),
                reason=f"pro_rata: {power:.0f}kW / {available:.0f}kW available",
            ))
            total_allocated += power

        return FleetDispatch(
            total_requested_kw=total_kw,
            total_allocated_kw=total_allocated,
            allocations=allocations,
            shortfall_kw=abs(total_kw - total_allocated),
            timestamp=str(np.datetime64("now")),
        )

    def _dispatch_merit_order(
        self,
        total_kw: float,
        assets: list[VPPAsset],
    ) -> FleetDispatch:
        """Dispatch by merit order (lowest degradation cost first)."""
        # Sort by SOH descending (healthier batteries first = lower degradation cost)
        sorted_assets = sorted(assets, key=lambda a: a.current_soh_percent, reverse=True)

        allocations = []
        remaining = abs(total_kw)
        sign = 1 if total_kw > 0 else -1
        total_allocated = 0.0

        for asset in sorted_assets:
            if remaining <= 0:
                allocations.append(DispatchAllocation(
                    site_id=asset.site_id, power_kw=0, reason="not needed"
                ))
                continue

            available = asset.rated_power_kw * asset.max_power_fraction - asset.reserved_capacity_kw
            power = min(remaining, available) * sign

            # SOC check
            if sign > 0 and asset.current_soc_percent < 5:
                power = 0
            elif sign < 0 and asset.current_soc_percent > 95:
                power = 0

            allocations.append(DispatchAllocation(
                site_id=asset.site_id,
                power_kw=float(power),
                reason=f"merit_order: SOH={asset.current_soh_percent:.1f}%",
            ))
            remaining -= abs(power)
            total_allocated += power

        return FleetDispatch(
            total_requested_kw=total_kw,
            total_allocated_kw=total_allocated,
            allocations=allocations,
            shortfall_kw=max(0, remaining),
            timestamp=str(np.datetime64("now")),
        )

    def _dispatch_soc_balancing(
        self,
        total_kw: float,
        assets: list[VPPAsset],
    ) -> FleetDispatch:
        """Dispatch to equalize SOC across fleet."""
        avg_soc = np.mean([a.current_soc_percent for a in assets])

        allocations = []
        total_allocated = 0.0

        for asset in assets:
            available = asset.rated_power_kw * asset.max_power_fraction - asset.reserved_capacity_kw
            soc_diff = asset.current_soc_percent - avg_soc

            # Assets with higher SOC get more discharge, lower SOC get more charge
            if total_kw > 0:  # Discharging
                # Higher SOC = more discharge
                weight = max(0, asset.current_soc_percent - 10) / 100
            else:  # Charging
                # Lower SOC = more charge
                weight = max(0, 100 - asset.current_soc_percent) / 100

            total_weight = sum(
                max(0, a.current_soc_percent - 10) / 100 if total_kw > 0
                else max(0, 100 - a.current_soc_percent) / 100
                for a in assets
            )

            if total_weight > 0:
                power = total_kw * weight / total_weight
            else:
                power = total_kw / len(assets)

            power = np.clip(power, -available, available)

            allocations.append(DispatchAllocation(
                site_id=asset.site_id,
                power_kw=float(power),
                reason=f"soc_balance: SOC={asset.current_soc_percent:.1f}%, avg={avg_soc:.1f}%",
            ))
            total_allocated += power

        return FleetDispatch(
            total_requested_kw=total_kw,
            total_allocated_kw=total_allocated,
            allocations=allocations,
            shortfall_kw=abs(total_kw - total_allocated),
            timestamp=str(np.datetime64("now")),
        )
