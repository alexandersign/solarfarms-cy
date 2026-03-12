"""
VPP Portfolio Manager

Manages a portfolio of distributed BESS assets as a Virtual Power Plant.
Aggregates capacity across multiple sites for market participation
and optimal dispatch.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4
import structlog

logger = structlog.get_logger()


@dataclass
class VPPAsset:
    """A BESS asset in the VPP portfolio."""
    site_id: str
    name: str
    market: str
    rated_power_kw: float
    rated_energy_kwh: float
    current_soc_percent: float = 50.0
    current_soh_percent: float = 100.0
    is_online: bool = True
    is_available: bool = True
    current_power_kw: float = 0.0
    max_power_fraction: float = 1.0  # DSO curtailment level
    reserved_capacity_kw: float = 0.0  # Reserved for local services
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    last_update: datetime = field(default_factory=datetime.utcnow)


@dataclass
class PortfolioSummary:
    """Aggregated portfolio statistics."""
    total_assets: int
    online_assets: int
    total_rated_power_kw: float
    available_power_kw: float
    total_rated_energy_kwh: float
    available_energy_kwh: float
    weighted_avg_soc: float
    weighted_avg_soh: float
    total_current_power_kw: float
    markets: list[str]


class VPPPortfolio:
    """
    Virtual Power Plant portfolio manager.

    Maintains real-time state of all BESS assets and computes
    aggregated capacity for market participation.
    """

    def __init__(self):
        self.assets: dict[str, VPPAsset] = {}
        logger.info("VPP portfolio manager initialized")

    def add_asset(self, asset: VPPAsset) -> None:
        """Add a BESS asset to the portfolio."""
        self.assets[asset.site_id] = asset
        logger.info(
            "Asset added to VPP",
            site_id=asset.site_id,
            power_kw=asset.rated_power_kw,
            energy_kwh=asset.rated_energy_kwh,
        )

    def remove_asset(self, site_id: str) -> None:
        """Remove an asset from the portfolio."""
        if site_id in self.assets:
            del self.assets[site_id]
            logger.info("Asset removed from VPP", site_id=site_id)

    def update_asset_state(
        self,
        site_id: str,
        soc_percent: Optional[float] = None,
        soh_percent: Optional[float] = None,
        current_power_kw: Optional[float] = None,
        is_online: Optional[bool] = None,
        is_available: Optional[bool] = None,
        max_power_fraction: Optional[float] = None,
    ) -> None:
        """Update real-time state of an asset."""
        asset = self.assets.get(site_id)
        if not asset:
            return

        if soc_percent is not None:
            asset.current_soc_percent = soc_percent
        if soh_percent is not None:
            asset.current_soh_percent = soh_percent
        if current_power_kw is not None:
            asset.current_power_kw = current_power_kw
        if is_online is not None:
            asset.is_online = is_online
        if is_available is not None:
            asset.is_available = is_available
        if max_power_fraction is not None:
            asset.max_power_fraction = max_power_fraction

        asset.last_update = datetime.utcnow()

    def get_summary(self) -> PortfolioSummary:
        """Get aggregated portfolio summary."""
        online = [a for a in self.assets.values() if a.is_online]
        available = [a for a in online if a.is_available]

        total_rated_power = sum(a.rated_power_kw for a in self.assets.values())
        available_power = sum(
            a.rated_power_kw * a.max_power_fraction - a.reserved_capacity_kw
            for a in available
        )
        total_energy = sum(a.rated_energy_kwh for a in self.assets.values())
        available_energy = sum(
            a.rated_energy_kwh * a.current_soc_percent / 100 * a.current_soh_percent / 100
            for a in available
        )

        # Weighted average SOC/SOH
        if available:
            total_cap = sum(a.rated_energy_kwh for a in available)
            w_soc = sum(a.current_soc_percent * a.rated_energy_kwh for a in available) / total_cap if total_cap > 0 else 0
            w_soh = sum(a.current_soh_percent * a.rated_energy_kwh for a in available) / total_cap if total_cap > 0 else 0
        else:
            w_soc = 0
            w_soh = 0

        markets = list(set(a.market for a in self.assets.values()))

        return PortfolioSummary(
            total_assets=len(self.assets),
            online_assets=len(online),
            total_rated_power_kw=total_rated_power,
            available_power_kw=available_power,
            total_rated_energy_kwh=total_energy,
            available_energy_kwh=available_energy,
            weighted_avg_soc=w_soc,
            weighted_avg_soh=w_soh,
            total_current_power_kw=sum(a.current_power_kw for a in online),
            markets=markets,
        )

    def get_available_for_market(self, min_power_kw: float = 100.0) -> list[VPPAsset]:
        """Get assets available for market participation."""
        return [
            a for a in self.assets.values()
            if a.is_online
            and a.is_available
            and (a.rated_power_kw * a.max_power_fraction - a.reserved_capacity_kw) >= min_power_kw
        ]
