"""
Thermal Optimization Engine

Predictive cooling control for Linyang Power Atlantic BESS containers.
The system uses 60kW liquid cooling. This module optimizes cooling
to maintain optimal cell temperature while minimizing auxiliary
power consumption.

Operating temperature constraints:
    - Optimal range: 20-35°C
    - Warning: <5°C or >40°C
    - Critical: <-10°C or >50°C
    - Cell accuracy: ±1°C (BMU spec)
"""

import numpy as np
from dataclasses import dataclass
from typing import Optional
import structlog

logger = structlog.get_logger()


@dataclass
class ThermalState:
    """Current thermal state of the BESS."""
    max_cell_temp_c: float
    min_cell_temp_c: float
    avg_cell_temp_c: float
    ambient_temp_c: float
    cooling_power_kw: float
    cooling_active: bool
    heating_active: bool


@dataclass
class ThermalAction:
    """Recommended thermal control action."""
    cooling_setpoint_c: float
    cooling_power_percent: float  # 0-100
    heating_required: bool
    derating_factor: float  # 1.0 = no derating, 0.0 = full stop
    reason: str


class ThermalOptimizer:
    """
    Optimizes BESS thermal management for optimal performance and longevity.

    Key objectives:
    1. Maintain cells within 20-35°C optimal range
    2. Minimize temperature differential between cells (<5°C)
    3. Minimize cooling power consumption
    4. Pre-cool before high-power operations
    5. Prevent thermal runaway conditions
    """

    def __init__(
        self,
        max_cooling_power_kw: float = 60.0,
        optimal_min_c: float = 20.0,
        optimal_max_c: float = 35.0,
        warning_min_c: float = 5.0,
        warning_max_c: float = 40.0,
        critical_min_c: float = -10.0,
        critical_max_c: float = 50.0,
    ):
        self.max_cooling_kw = max_cooling_power_kw
        self.optimal_min = optimal_min_c
        self.optimal_max = optimal_max_c
        self.warning_min = warning_min_c
        self.warning_max = warning_max_c
        self.critical_min = critical_min_c
        self.critical_max = critical_max_c

        # PID controller state for cooling
        self._integral = 0.0
        self._prev_error = 0.0
        self._kp = 10.0
        self._ki = 0.5
        self._kd = 2.0

        logger.info(
            "Thermal optimizer initialized",
            cooling_kw=max_cooling_power_kw,
            optimal_range=f"{optimal_min_c}-{optimal_max_c}°C",
        )

    def optimize(
        self,
        state: ThermalState,
        planned_power_kw: float = 0.0,
        duration_minutes: float = 60.0,
    ) -> ThermalAction:
        """
        Compute optimal thermal control action.

        Args:
            state: Current thermal state
            planned_power_kw: Planned power for upcoming period
            duration_minutes: Planning horizon

        Returns:
            Recommended thermal action
        """
        avg_temp = state.avg_cell_temp_c
        max_temp = state.max_cell_temp_c
        min_temp = state.min_cell_temp_c
        temp_spread = max_temp - min_temp

        # ── Critical temperature handling ──
        if max_temp >= self.critical_max:
            return ThermalAction(
                cooling_setpoint_c=self.optimal_min,
                cooling_power_percent=100.0,
                heating_required=False,
                derating_factor=0.0,  # Full stop
                reason=f"CRITICAL: Max cell temp {max_temp:.1f}°C exceeds {self.critical_max}°C",
            )

        if min_temp <= self.critical_min:
            return ThermalAction(
                cooling_setpoint_c=self.optimal_min,
                cooling_power_percent=0.0,
                heating_required=True,
                derating_factor=0.0,
                reason=f"CRITICAL: Min cell temp {min_temp:.1f}°C below {self.critical_min}°C",
            )

        # ── Warning temperature handling ──
        derating = 1.0
        if max_temp > self.warning_max:
            # Derate power linearly between warning and critical
            derating = max(0.0, 1.0 - (max_temp - self.warning_max) / (self.critical_max - self.warning_max))

        if min_temp < self.warning_min:
            derating = min(derating, max(0.0, (min_temp - self.critical_min) / (self.warning_min - self.critical_min)))

        # ── Calculate target temperature ──
        target_temp = (self.optimal_min + self.optimal_max) / 2  # 27.5°C

        # Pre-cool if high power operation is planned
        if abs(planned_power_kw) > 500:
            # Lower target when heavy load expected
            heat_generation_estimate = abs(planned_power_kw) * 0.02 * (duration_minutes / 60)
            temp_rise_estimate = heat_generation_estimate / 500  # Rough thermal mass
            target_temp -= temp_rise_estimate * 0.5
            target_temp = max(target_temp, self.optimal_min)

        # ── PID cooling control ──
        error = avg_temp - target_temp
        self._integral += error
        self._integral = np.clip(self._integral, -100, 100)
        derivative = error - self._prev_error
        self._prev_error = error

        cooling_percent = (
            self._kp * error
            + self._ki * self._integral
            + self._kd * derivative
        )
        cooling_percent = np.clip(cooling_percent, 0, 100)

        # Reduce cooling if already in optimal range and no high load
        if self.optimal_min <= avg_temp <= self.optimal_max and abs(planned_power_kw) < 200:
            cooling_percent *= 0.3  # Reduce to maintenance level

        # Heating logic
        heating_needed = min_temp < self.optimal_min and avg_temp < self.optimal_min + 2

        reason = (
            f"Avg={avg_temp:.1f}°C, Target={target_temp:.1f}°C, "
            f"Spread={temp_spread:.1f}°C, Cooling={cooling_percent:.0f}%"
        )

        if derating < 1.0:
            reason += f", DERATING to {derating*100:.0f}%"

        return ThermalAction(
            cooling_setpoint_c=target_temp,
            cooling_power_percent=float(cooling_percent),
            heating_required=heating_needed,
            derating_factor=derating,
            reason=reason,
        )

    def estimate_auxiliary_power_kw(self, cooling_percent: float) -> float:
        """Estimate auxiliary power consumption of cooling system."""
        return self.max_cooling_kw * (cooling_percent / 100.0)
