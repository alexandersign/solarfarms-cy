"""
Warranty Condition Tracker

Monitors operating conditions against warranty terms from
Linyang Power Atlantic warranty document (readme Section 17.3).

Warranty-voiding conditions:
    - Cell voltage ≤2.5V: Immediate alarm, warranty void risk
    - Cell voltage <2.8V sustained 120h: Warning, charge immediately
    - SOC = 0% for 120h: Warning, charge to ≥15%
    - SOC = 0% for 2h operational: Warning, charge to ≥5%
"""

from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Optional
import structlog

logger = structlog.get_logger()


@dataclass
class WarrantyCondition:
    """A tracked warranty condition."""
    name: str
    threshold: float
    unit: str
    max_duration_hours: float
    current_value: float = 0.0
    violation_start: Optional[datetime] = None
    total_violation_hours: float = 0.0
    violation_count: int = 0
    is_violated: bool = False
    is_critical: bool = False
    description: str = ""


@dataclass
class WarrantyStatus:
    """Overall warranty health status."""
    warranty_valid: bool
    conditions: list[WarrantyCondition]
    critical_violations: int
    warning_violations: int
    total_violation_hours: float
    recommendations: list[str]


class WarrantyTracker:
    """
    Tracks BESS operating conditions against warranty requirements.

    Continuously monitors cell voltages, SOC levels, temperatures,
    and cycling patterns to ensure warranty compliance.
    """

    def __init__(self):
        self.conditions: list[WarrantyCondition] = [
            WarrantyCondition(
                name="cell_voltage_critical",
                threshold=2500,  # mV
                unit="mV",
                max_duration_hours=0.0,  # Immediate
                is_critical=True,
                description="Cell voltage ≤2.5V - warranty void risk",
            ),
            WarrantyCondition(
                name="cell_voltage_sustained_low",
                threshold=2800,  # mV
                unit="mV",
                max_duration_hours=120.0,  # 5 days
                description="Cell voltage <2.8V sustained - charge immediately",
            ),
            WarrantyCondition(
                name="soc_zero_extended",
                threshold=0.5,  # percent
                unit="%",
                max_duration_hours=120.0,
                description="SOC at 0% for >120h - charge to ≥15%",
            ),
            WarrantyCondition(
                name="soc_zero_operational",
                threshold=0.5,  # percent
                unit="%",
                max_duration_hours=2.0,
                description="SOC at 0% during operation for >2h - charge to ≥5%",
            ),
            WarrantyCondition(
                name="cell_overtemperature",
                threshold=55.0,  # °C
                unit="°C",
                max_duration_hours=0.5,
                is_critical=True,
                description="Cell temperature >55°C - thermal runaway risk",
            ),
            WarrantyCondition(
                name="cell_undertemperature",
                threshold=-20.0,  # °C (below this)
                unit="°C",
                max_duration_hours=1.0,
                description="Cell temperature <-20°C during charging",
            ),
        ]

        self._cycle_count = 0
        self._max_cycles_warranty = 6000  # Standard warranty cycles
        self._last_check = datetime.utcnow()

        logger.info(
            "Warranty tracker initialized",
            conditions=len(self.conditions),
        )

    def check(
        self,
        min_cell_voltage_mv: int,
        max_cell_voltage_mv: int,
        soc_percent: float,
        min_cell_temp_c: float,
        max_cell_temp_c: float,
        is_operational: bool = True,
    ) -> WarrantyStatus:
        """
        Check all warranty conditions against current measurements.

        Args:
            min_cell_voltage_mv: Minimum cell voltage in mV
            max_cell_voltage_mv: Maximum cell voltage in mV
            soc_percent: Current SOC percentage
            min_cell_temp_c: Minimum cell temperature
            max_cell_temp_c: Maximum cell temperature
            is_operational: Whether the system is actively operating

        Returns:
            Current warranty status
        """
        now = datetime.utcnow()
        dt_hours = (now - self._last_check).total_seconds() / 3600
        self._last_check = now

        recommendations = []
        critical_count = 0
        warning_count = 0

        # ── Cell Voltage Critical (≤2.5V) ──
        cond = self._get_condition("cell_voltage_critical")
        cond.current_value = min_cell_voltage_mv
        if min_cell_voltage_mv <= 2500:
            self._start_violation(cond, dt_hours)
            critical_count += 1
            recommendations.append(
                f"CRITICAL: Cell voltage {min_cell_voltage_mv}mV ≤ 2500mV! "
                "Warranty void risk. Immediately charge battery."
            )
        else:
            self._clear_violation(cond)

        # ── Cell Voltage Sustained Low (<2.8V) ──
        cond = self._get_condition("cell_voltage_sustained_low")
        cond.current_value = min_cell_voltage_mv
        if min_cell_voltage_mv < 2800:
            self._start_violation(cond, dt_hours)
            if cond.total_violation_hours > 24:
                warning_count += 1
                remaining = max(0, cond.max_duration_hours - cond.total_violation_hours)
                recommendations.append(
                    f"WARNING: Cell voltage {min_cell_voltage_mv}mV < 2800mV "
                    f"for {cond.total_violation_hours:.1f}h "
                    f"(warranty limit: {cond.max_duration_hours}h, "
                    f"remaining: {remaining:.1f}h). Charge immediately!"
                )
        else:
            self._clear_violation(cond)

        # ── SOC Zero Extended ──
        cond = self._get_condition("soc_zero_extended")
        cond.current_value = soc_percent
        if soc_percent <= 0.5:
            self._start_violation(cond, dt_hours)
            if cond.total_violation_hours > 12:
                warning_count += 1
                recommendations.append(
                    f"WARNING: SOC at {soc_percent:.1f}% for "
                    f"{cond.total_violation_hours:.1f}h. "
                    "Charge to ≥15% to protect battery."
                )
        else:
            self._clear_violation(cond)

        # ── SOC Zero Operational ──
        cond = self._get_condition("soc_zero_operational")
        cond.current_value = soc_percent
        if soc_percent <= 0.5 and is_operational:
            self._start_violation(cond, dt_hours)
            if cond.total_violation_hours > 1:
                warning_count += 1
                recommendations.append(
                    f"WARNING: SOC at 0% during operation for "
                    f"{cond.total_violation_hours:.1f}h. Charge to ≥5%."
                )
        else:
            self._clear_violation(cond)

        # ── Cell Overtemperature ──
        cond = self._get_condition("cell_overtemperature")
        cond.current_value = max_cell_temp_c
        if max_cell_temp_c > 55.0:
            self._start_violation(cond, dt_hours)
            critical_count += 1
            recommendations.append(
                f"CRITICAL: Cell temperature {max_cell_temp_c:.1f}°C > 55°C! "
                "Reduce power and activate emergency cooling."
            )
        else:
            self._clear_violation(cond)

        # ── Cycle Count ──
        remaining_cycles = self._max_cycles_warranty - self._cycle_count
        if remaining_cycles < 500:
            recommendations.append(
                f"INFO: {remaining_cycles} warranty cycles remaining "
                f"({self._cycle_count}/{self._max_cycles_warranty})"
            )

        # Determine overall warranty validity
        warranty_valid = critical_count == 0 and all(
            c.total_violation_hours <= c.max_duration_hours
            for c in self.conditions
            if c.max_duration_hours > 0
        )

        total_violation_hours = sum(c.total_violation_hours for c in self.conditions)

        return WarrantyStatus(
            warranty_valid=warranty_valid,
            conditions=list(self.conditions),
            critical_violations=critical_count,
            warning_violations=warning_count,
            total_violation_hours=total_violation_hours,
            recommendations=recommendations,
        )

    def record_cycle(self) -> None:
        """Record completion of one full equivalent cycle."""
        self._cycle_count += 1

    def _get_condition(self, name: str) -> WarrantyCondition:
        """Get a warranty condition by name."""
        for c in self.conditions:
            if c.name == name:
                return c
        raise ValueError(f"Unknown condition: {name}")

    def _start_violation(self, cond: WarrantyCondition, dt_hours: float) -> None:
        """Start or continue a warranty violation."""
        if not cond.is_violated:
            cond.is_violated = True
            cond.violation_start = datetime.utcnow()
            cond.violation_count += 1
            logger.warning(
                "Warranty violation started",
                condition=cond.name,
                value=cond.current_value,
                threshold=cond.threshold,
            )
        cond.total_violation_hours += dt_hours

    def _clear_violation(self, cond: WarrantyCondition) -> None:
        """Clear a warranty violation."""
        if cond.is_violated:
            cond.is_violated = False
            cond.violation_start = None
            logger.info("Warranty violation cleared", condition=cond.name)
