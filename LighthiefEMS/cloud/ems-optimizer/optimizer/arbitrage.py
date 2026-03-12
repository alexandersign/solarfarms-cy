"""
Arbitrage Optimization Engine

Identifies and exploits price spreads between charge and discharge
periods. Incorporates degradation costs to ensure only truly
profitable cycles are executed.

Key consideration: Battery degradation cost per cycle must be
factored into every arbitrage decision to prevent
revenue-destroying deep cycling.
"""

import numpy as np
from dataclasses import dataclass
from typing import Optional
from datetime import datetime
import structlog

logger = structlog.get_logger()


@dataclass
class ArbitrageOpportunity:
    """An identified arbitrage opportunity."""
    charge_hour: int
    discharge_hour: int
    charge_price_eur_mwh: float
    discharge_price_eur_mwh: float
    spread_eur_mwh: float
    net_profit_eur_mwh: float  # After efficiency and degradation
    energy_mwh: float
    profit_eur: float
    is_profitable: bool


class ArbitrageEngine:
    """
    Identifies profitable arbitrage opportunities in electricity prices.

    For each potential charge-discharge pair:
        Net profit = (P_sell * eta_discharge - P_buy / eta_charge) * E - degradation_cost

    Only executes trades where net profit exceeds minimum threshold.
    """

    def __init__(
        self,
        rated_power_kw: float = 1250.0,
        rated_energy_kwh: float = 5015.0,
        system_rte: float = 0.878,
        degradation_cost_per_mwh: float = 3.0,  # EUR per MWh throughput
        min_profit_threshold_eur: float = 5.0,
    ):
        self.rated_power_kw = rated_power_kw
        self.rated_energy_kwh = rated_energy_kwh
        self.charge_eff = np.sqrt(system_rte)
        self.discharge_eff = np.sqrt(system_rte)
        self.degradation_cost_per_mwh = degradation_cost_per_mwh
        self.min_profit = min_profit_threshold_eur

        # Minimum price spread to be profitable
        self.min_spread = self._calculate_min_spread()
        logger.info(
            "Arbitrage engine initialized",
            min_spread=f"EUR {self.min_spread:.2f}/MWh",
            rte=f"{system_rte*100:.1f}%",
        )

    def _calculate_min_spread(self) -> float:
        """Calculate minimum price spread for profitable arbitrage."""
        # Break-even: P_sell * eta_d = P_buy / eta_c + degradation
        # Assuming P_buy = avg_price, solve for spread
        # Spread = P_buy * (1/(eta_c * eta_d) - 1) + degradation/eta_d
        efficiency_cost_factor = 1.0 / (self.charge_eff * self.discharge_eff) - 1.0
        # For an average price of ~80 EUR/MWh
        avg_price = 80.0
        return avg_price * efficiency_cost_factor + self.degradation_cost_per_mwh / self.discharge_eff

    def find_opportunities(
        self,
        prices: list[float],
        soc_percent: float = 50.0,
        max_cycles: int = 2,
    ) -> list[ArbitrageOpportunity]:
        """
        Find arbitrage opportunities in a price series.

        Args:
            prices: Hourly price forecast (EUR/MWh)
            soc_percent: Current SOC
            max_cycles: Maximum number of cycles to plan

        Returns:
            List of identified opportunities, sorted by profitability
        """
        n = len(prices)
        if n < 2:
            return []

        opportunities = []
        energy_per_cycle_mwh = self.rated_power_kw / 1000.0  # 1 hour at rated power

        # Find all charge-discharge pairs
        for charge_h in range(n):
            for discharge_h in range(charge_h + 1, min(charge_h + 24, n)):
                charge_price = prices[charge_h]
                discharge_price = prices[discharge_h]

                # Effective prices after efficiency
                effective_charge_cost = charge_price / self.charge_eff
                effective_discharge_revenue = discharge_price * self.discharge_eff

                spread = effective_discharge_revenue - effective_charge_cost
                net_profit_mwh = spread - self.degradation_cost_per_mwh
                profit_eur = net_profit_mwh * energy_per_cycle_mwh

                opportunities.append(ArbitrageOpportunity(
                    charge_hour=charge_h,
                    discharge_hour=discharge_h,
                    charge_price_eur_mwh=charge_price,
                    discharge_price_eur_mwh=discharge_price,
                    spread_eur_mwh=discharge_price - charge_price,
                    net_profit_eur_mwh=net_profit_mwh,
                    energy_mwh=energy_per_cycle_mwh,
                    profit_eur=profit_eur,
                    is_profitable=profit_eur > self.min_profit,
                ))

        # Filter profitable and sort by net profit
        profitable = [o for o in opportunities if o.is_profitable]
        profitable.sort(key=lambda x: x.profit_eur, reverse=True)

        # Select non-overlapping top opportunities
        selected = []
        used_hours: set[int] = set()
        for opp in profitable:
            if len(selected) >= max_cycles:
                break
            # Check for time overlap
            hours_needed = set(range(opp.charge_hour, opp.discharge_hour + 1))
            if not hours_needed & used_hours:
                selected.append(opp)
                used_hours |= hours_needed

        if selected:
            total_profit = sum(o.profit_eur for o in selected)
            logger.info(
                "Arbitrage opportunities found",
                count=len(selected),
                total_profit=f"EUR {total_profit:.2f}",
                best_spread=f"EUR {selected[0].spread_eur_mwh:.2f}/MWh",
            )

        return selected
