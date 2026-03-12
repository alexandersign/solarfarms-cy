"""
State of Health (SOH) Prediction

Degradation modeling for Linyang Power Atlantic BESS with EVE LF314 cells.
Uses empirical degradation curves from readme Section 17.2 to predict
remaining useful life and SOH trajectory.

Degradation data (from readme):
    0.25P, 1 CPD: First year drop 3.88%, annual 1.52%, ~18 years to EOL
    0.25P, 2 CPD: First year drop 4.59%, annual 2.37%, ~12 years to EOL
    0.5P,  1 CPD: First year drop 4.04%, annual 1.59%, ~17 years to EOL
    0.5P,  2 CPD: First year drop 4.72%, annual 2.72%, ~10 years to EOL

EOL definition: 70% SOH
"""

import numpy as np
from dataclasses import dataclass
from typing import Optional
from datetime import datetime, timedelta
import structlog

logger = structlog.get_logger()


@dataclass
class DegradationProfile:
    """Degradation characteristics for a specific operating condition."""
    c_rate: float  # 0.25 or 0.5
    cycles_per_day: float  # 1 or 2
    first_year_drop_percent: float
    annual_degradation_percent: float
    years_to_eol: float  # Years to reach 70% SOH


# Empirical degradation profiles from Linyang data
DEGRADATION_PROFILES = [
    DegradationProfile(0.25, 1.0, 3.88, 1.52, 18.0),
    DegradationProfile(0.25, 2.0, 4.59, 2.37, 12.0),
    DegradationProfile(0.50, 1.0, 4.04, 1.59, 17.0),
    DegradationProfile(0.50, 2.0, 4.72, 2.72, 10.0),
]


@dataclass
class SOHPrediction:
    """SOH prediction result."""
    current_soh_percent: float
    predicted_soh_1year: float
    predicted_soh_5year: float
    remaining_useful_life_years: float
    equivalent_full_cycles: float
    annual_degradation_rate: float
    estimated_eol_date: Optional[datetime]
    degradation_cost_per_cycle_eur: float


class SOHPredictor:
    """
    Predicts battery State of Health and remaining useful life.

    Uses a semi-empirical model calibrated to Linyang/EVE degradation data,
    with interpolation for operating conditions between measured profiles.
    """

    def __init__(
        self,
        rated_energy_kwh: float = 5015.0,
        battery_cost_eur: float = 500000.0,  # Estimated battery replacement cost
        commissioning_date: Optional[datetime] = None,
    ):
        self.rated_energy_kwh = rated_energy_kwh
        self.battery_cost_eur = battery_cost_eur
        self.commissioning_date = commissioning_date or datetime.utcnow()
        self.eol_soh_percent = 70.0

        # Cycle counting
        self.total_energy_throughput_kwh = 0.0
        self.equivalent_full_cycles = 0.0
        self.cycle_history: list[dict] = []

        logger.info(
            "SOH Predictor initialized",
            rated_energy_kwh=rated_energy_kwh,
            commissioned=self.commissioning_date.isoformat(),
        )

    def get_degradation_profile(
        self, avg_c_rate: float, avg_cycles_per_day: float
    ) -> DegradationProfile:
        """
        Interpolate degradation parameters for given operating conditions.

        Uses bilinear interpolation between the four measured profiles.
        """
        # Simple weighted interpolation
        total_weight = 0.0
        weighted_first_year = 0.0
        weighted_annual = 0.0
        weighted_eol = 0.0

        for profile in DEGRADATION_PROFILES:
            # Distance-based weighting
            dc = abs(avg_c_rate - profile.c_rate)
            dd = abs(avg_cycles_per_day - profile.cycles_per_day)
            distance = np.sqrt(dc**2 + dd**2) + 1e-6
            weight = 1.0 / distance

            total_weight += weight
            weighted_first_year += weight * profile.first_year_drop_percent
            weighted_annual += weight * profile.annual_degradation_percent
            weighted_eol += weight * profile.years_to_eol

        return DegradationProfile(
            c_rate=avg_c_rate,
            cycles_per_day=avg_cycles_per_day,
            first_year_drop_percent=weighted_first_year / total_weight,
            annual_degradation_percent=weighted_annual / total_weight,
            years_to_eol=weighted_eol / total_weight,
        )

    def record_cycle(
        self,
        energy_kwh: float,
        depth_of_discharge: float,
        c_rate: float,
        avg_temperature_c: float,
    ) -> None:
        """Record a charge/discharge cycle for degradation tracking."""
        self.total_energy_throughput_kwh += energy_kwh
        self.equivalent_full_cycles = (
            self.total_energy_throughput_kwh / self.rated_energy_kwh
        )

        self.cycle_history.append({
            "timestamp": datetime.utcnow().isoformat(),
            "energy_kwh": energy_kwh,
            "dod": depth_of_discharge,
            "c_rate": c_rate,
            "temperature_c": avg_temperature_c,
        })

        # Keep last 10000 cycles
        if len(self.cycle_history) > 10000:
            self.cycle_history = self.cycle_history[-10000:]

    def predict(
        self,
        current_soh_percent: float,
        avg_c_rate: float = 0.5,
        avg_cycles_per_day: float = 1.5,
    ) -> SOHPrediction:
        """
        Predict future SOH trajectory and remaining useful life.

        Args:
            current_soh_percent: Current SOH from BMS (0-100)
            avg_c_rate: Average C-rate over recent operation
            avg_cycles_per_day: Average cycles per day

        Returns:
            SOH prediction with remaining life and cost estimates
        """
        profile = self.get_degradation_profile(avg_c_rate, avg_cycles_per_day)

        # Calculate age
        age_years = (datetime.utcnow() - self.commissioning_date).days / 365.25

        # Predict future SOH
        # Model: SOH(t) = 100 - first_year_drop * min(t, 1) - annual_rate * max(t - 1, 0)
        def soh_at_year(t: float) -> float:
            if t <= 1.0:
                return 100.0 - profile.first_year_drop_percent * t
            else:
                return (
                    100.0
                    - profile.first_year_drop_percent
                    - profile.annual_degradation_percent * (t - 1.0)
                )

        soh_1year = soh_at_year(age_years + 1.0)
        soh_5year = soh_at_year(age_years + 5.0)

        # Remaining useful life
        # Solve for t where SOH(t) = eol_soh_percent
        remaining_capacity = current_soh_percent - self.eol_soh_percent
        if profile.annual_degradation_percent > 0:
            remaining_years = remaining_capacity / profile.annual_degradation_percent
        else:
            remaining_years = 30.0  # Default if no degradation data

        eol_date = datetime.utcnow() + timedelta(days=remaining_years * 365.25)

        # Degradation cost per cycle
        # Cost = battery_cost * (SOH_drop_per_cycle / (100 - eol_soh))
        if avg_cycles_per_day > 0:
            cycles_per_year = avg_cycles_per_day * 365.25
            soh_drop_per_year = profile.annual_degradation_percent
            soh_drop_per_cycle = soh_drop_per_year / cycles_per_year
            usable_soh_range = 100.0 - self.eol_soh_percent
            cost_per_cycle = self.battery_cost_eur * (soh_drop_per_cycle / usable_soh_range)
        else:
            cost_per_cycle = 0.0

        prediction = SOHPrediction(
            current_soh_percent=current_soh_percent,
            predicted_soh_1year=max(soh_1year, self.eol_soh_percent),
            predicted_soh_5year=max(soh_5year, self.eol_soh_percent),
            remaining_useful_life_years=max(remaining_years, 0.0),
            equivalent_full_cycles=self.equivalent_full_cycles,
            annual_degradation_rate=profile.annual_degradation_percent,
            estimated_eol_date=eol_date,
            degradation_cost_per_cycle_eur=cost_per_cycle,
        )

        logger.info(
            "SOH prediction",
            current=f"{current_soh_percent:.1f}%",
            rul_years=f"{remaining_years:.1f}",
            cost_per_cycle=f"EUR {cost_per_cycle:.2f}",
        )

        return prediction
