"""
Cell Balancing Optimization

Optimizes passive balancing across battery cells to minimize
voltage spread and improve pack uniformity. Works with the
Linyang BMS's passive equalization at BMU level.

Target: Keep cell voltage spread < 50mV across all cells.
"""

from dataclasses import dataclass
from typing import Optional
import numpy as np
import structlog

logger = structlog.get_logger()


@dataclass
class BalancingRecommendation:
    """Recommended balancing action."""
    balancing_needed: bool
    max_voltage_spread_mv: float
    estimated_balancing_time_hours: float
    recommended_soc_for_balancing: float
    strategy: str
    details: str


class CellBalancingOptimizer:
    """
    Optimizes cell balancing for minimum voltage spread.

    LFP cells have a very flat OCV curve in the 20-80% SOC range,
    making mid-SOC balancing less effective. Best balancing occurs
    at high SOC (>90%) or low SOC (<10%) where the OCV curve is steeper.
    """

    def __init__(
        self,
        num_cells_series: int = 416,
        num_clusters: int = 12,
        max_acceptable_spread_mv: float = 50.0,
        balancing_current_ma: float = 100.0,  # Passive balancing current
    ):
        self.num_cells = num_cells_series
        self.num_clusters = num_clusters
        self.max_spread_mv = max_acceptable_spread_mv
        self.balancing_current_ma = balancing_current_ma

        # Track voltage statistics
        self.voltage_spread_history: list[float] = []

        logger.info(
            "Cell balancing optimizer initialized",
            cells=num_cells_series,
            clusters=num_clusters,
            max_spread_mv=max_acceptable_spread_mv,
        )

    def analyze(
        self,
        max_cell_voltage_mv: int,
        min_cell_voltage_mv: int,
        soc_percent: float,
        is_idle: bool = False,
    ) -> BalancingRecommendation:
        """
        Analyze current cell state and recommend balancing action.

        Args:
            max_cell_voltage_mv: Maximum cell voltage
            min_cell_voltage_mv: Minimum cell voltage
            soc_percent: Current SOC
            is_idle: Whether the battery is idle (best time to balance)

        Returns:
            Balancing recommendation
        """
        spread_mv = max_cell_voltage_mv - min_cell_voltage_mv
        self.voltage_spread_history.append(spread_mv)
        if len(self.voltage_spread_history) > 1000:
            self.voltage_spread_history.pop(0)

        balancing_needed = spread_mv > self.max_spread_mv

        # Estimate balancing time
        if spread_mv > 0 and self.balancing_current_ma > 0:
            # Very rough estimate: charge to equalize = spread * capacity / voltage
            # For 314Ah cells, 1mV spread ≈ 0.1Ah imbalance
            imbalance_ah = spread_mv * 0.1 / 1000  # rough estimate
            balancing_time_hours = imbalance_ah / (self.balancing_current_ma / 1000)
        else:
            balancing_time_hours = 0.0

        # Recommend optimal SOC for balancing
        # LFP curve is steepest at >90% SOC - best for balancing
        if soc_percent > 90:
            recommended_soc = soc_percent  # Already at good balancing SOC
            strategy = "high_soc_balancing"
            details = (
                f"Voltage spread: {spread_mv}mV. "
                f"SOC at {soc_percent:.0f}% - optimal for passive balancing. "
                f"Estimated balancing time: {balancing_time_hours:.1f}h."
            )
        elif soc_percent < 10:
            recommended_soc = soc_percent
            strategy = "low_soc_balancing"
            details = (
                f"Voltage spread: {spread_mv}mV. "
                f"SOC at {soc_percent:.0f}% - steep OCV region, balancing possible. "
                f"Estimated balancing time: {balancing_time_hours:.1f}h."
            )
        elif balancing_needed:
            recommended_soc = 95.0
            strategy = "charge_to_balance"
            details = (
                f"Voltage spread: {spread_mv}mV exceeds {self.max_spread_mv}mV limit. "
                f"Recommend charging to {recommended_soc:.0f}% SOC for balancing. "
                f"Estimated balancing time: {balancing_time_hours:.1f}h."
            )
        else:
            recommended_soc = soc_percent
            strategy = "no_action"
            details = (
                f"Voltage spread: {spread_mv}mV within {self.max_spread_mv}mV limit. "
                "No balancing action needed."
            )

        return BalancingRecommendation(
            balancing_needed=balancing_needed,
            max_voltage_spread_mv=float(spread_mv),
            estimated_balancing_time_hours=balancing_time_hours,
            recommended_soc_for_balancing=recommended_soc,
            strategy=strategy,
            details=details,
        )
