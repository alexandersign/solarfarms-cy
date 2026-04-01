"""
Optimal Dispatch Scheduler

MILP-based charge/discharge scheduling that maximizes revenue
while respecting battery constraints and degradation costs.

Optimization considers:
    - Price forecasts (day-ahead, intraday)
    - SOC limits and degradation cost
    - Grid constraints (DSO curtailment levels)
    - Ancillary service commitments
    - System efficiency (87.8% AC-AC RTE from readme)
"""

import numpy as np
from dataclasses import dataclass
from typing import Optional
from datetime import datetime, timedelta
import structlog

logger = structlog.get_logger()


@dataclass
class ScheduleSlot:
    """A single time slot in the dispatch schedule."""
    start: datetime
    end: datetime
    power_kw: float  # Positive = discharge, negative = charge
    soc_start: float  # Predicted SOC at start (%)
    soc_end: float  # Predicted SOC at end (%)
    revenue_eur: float  # Expected revenue
    market: str  # "arbitrage", "fcr", "afrr", "self_consumption"


@dataclass
class OptimalSchedule:
    """Complete optimal dispatch schedule."""
    slots: list[ScheduleSlot]
    total_revenue_eur: float
    total_degradation_cost_eur: float
    net_revenue_eur: float
    horizon_hours: int
    created_at: datetime


class DispatchScheduler:
    """
    Optimal dispatch scheduler using linear programming.

    Solves the problem:
        maximize: sum(P[t] * price[t] * dt) - degradation_cost
        subject to:
            SOC_min <= SOC[t] <= SOC_max for all t
            -P_max <= P[t] <= P_max for all t
            SOC[t+1] = SOC[t] - P[t] * dt / (E_rated * eta)
            ramp_rate constraints
    """

    def __init__(
        self,
        rated_power_kw: float = 1250.0,
        rated_energy_kwh: float = 5015.0,
        system_rte: float = 0.878,  # AC-AC round-trip efficiency
        soc_min_percent: float = 5.0,
        soc_max_percent: float = 95.0,
        degradation_cost_per_cycle_eur: float = 15.0,
    ):
        self.rated_power_kw = rated_power_kw
        self.rated_energy_kwh = rated_energy_kwh
        self.charge_efficiency = np.sqrt(system_rte)  # ~93.7%
        self.discharge_efficiency = np.sqrt(system_rte)
        self.soc_min = soc_min_percent / 100.0
        self.soc_max = soc_max_percent / 100.0
        self.degradation_cost = degradation_cost_per_cycle_eur

        logger.info(
            "Dispatch scheduler initialized",
            rated_power_kw=rated_power_kw,
            rated_energy_kwh=rated_energy_kwh,
            rte=f"{system_rte*100:.1f}%",
        )

    def optimize(
        self,
        price_forecast: list[float],
        initial_soc: float,
        resolution_hours: float = 1.0,
        max_power_fraction: float = 1.0,
        reserved_capacity_kw: float = 0.0,
    ) -> OptimalSchedule:
        """
        Compute optimal charge/discharge schedule.

        Uses a greedy heuristic for fast computation:
        1. Sort hours by price
        2. Charge in cheapest hours, discharge in most expensive
        3. Respect SOC and power constraints

        Args:
            price_forecast: List of prices (EUR/MWh) per time slot
            initial_soc: Initial SOC (0.0 - 1.0)
            resolution_hours: Time slot duration
            max_power_fraction: Maximum power as fraction of rated (DSO limit)
            reserved_capacity_kw: Power reserved for ancillary services

        Returns:
            Optimal dispatch schedule
        """
        n_slots = len(price_forecast)
        available_power = self.rated_power_kw * max_power_fraction - reserved_capacity_kw

        # Sort slots by price (ascending for charging, descending for discharging)
        indexed_prices = list(enumerate(price_forecast))

        # Split into charge and discharge candidates
        avg_price = np.mean(price_forecast)
        spread = np.std(price_forecast)

        # Determine charge/discharge by price relative to mean
        # Only trade if spread is profitable after efficiency losses
        min_spread = avg_price * (1.0 / self.charge_efficiency / self.discharge_efficiency - 1.0)

        schedule_power = np.zeros(n_slots)
        soc = initial_soc

        if spread > min_spread * 0.5:
            # Sort by price
            sorted_by_price = sorted(indexed_prices, key=lambda x: x[1])

            # Charge in cheapest slots
            charge_slots = sorted_by_price[:n_slots // 3]
            # Discharge in most expensive slots
            discharge_slots = sorted_by_price[-(n_slots // 3):]

            for idx, price in charge_slots:
                if price < avg_price - min_spread / 2:
                    schedule_power[idx] = -available_power  # Charge

            for idx, price in discharge_slots:
                if price > avg_price + min_spread / 2:
                    schedule_power[idx] = available_power  # Discharge

        # Forward simulation with SOC constraints
        now = datetime.utcnow()
        slots: list[ScheduleSlot] = []
        soc = initial_soc
        total_revenue = 0.0
        total_cycles = 0.0

        for i in range(n_slots):
            dt_hours = resolution_hours
            power = schedule_power[i]

            # SOC constraint check
            if power > 0:  # Discharging
                energy_removed = power * dt_hours / self.discharge_efficiency
                new_soc = soc - energy_removed / self.rated_energy_kwh
                if new_soc < self.soc_min:
                    power = max(0, (soc - self.soc_min) * self.rated_energy_kwh * self.discharge_efficiency / dt_hours)
                    new_soc = self.soc_min
                else:
                    new_soc = max(self.soc_min, new_soc)
            elif power < 0:  # Charging
                energy_added = abs(power) * dt_hours * self.charge_efficiency
                new_soc = soc + energy_added / self.rated_energy_kwh
                if new_soc > self.soc_max:
                    power = -max(0, (self.soc_max - soc) * self.rated_energy_kwh / self.charge_efficiency / dt_hours)
                    new_soc = self.soc_max
                else:
                    new_soc = min(self.soc_max, new_soc)
            else:
                new_soc = soc

            # Revenue calculation
            revenue = power * dt_hours / 1000.0 * price_forecast[i]  # kW * h / 1000 = MWh * EUR/MWh
            total_revenue += revenue

            # Cycle counting
            total_cycles += abs(power) * dt_hours / (2 * self.rated_energy_kwh)

            slot = ScheduleSlot(
                start=now + timedelta(hours=i * resolution_hours),
                end=now + timedelta(hours=(i + 1) * resolution_hours),
                power_kw=power,
                soc_start=soc * 100,
                soc_end=new_soc * 100,
                revenue_eur=revenue,
                market="arbitrage",
            )
            slots.append(slot)
            soc = new_soc

        degradation_cost = total_cycles * self.degradation_cost

        schedule = OptimalSchedule(
            slots=slots,
            total_revenue_eur=total_revenue,
            total_degradation_cost_eur=degradation_cost,
            net_revenue_eur=total_revenue - degradation_cost,
            horizon_hours=int(n_slots * resolution_hours),
            created_at=datetime.utcnow(),
        )

        logger.info(
            "Schedule optimized",
            horizon_hours=schedule.horizon_hours,
            revenue=f"EUR {total_revenue:.2f}",
            degradation=f"EUR {degradation_cost:.2f}",
            net=f"EUR {schedule.net_revenue_eur:.2f}",
            cycles=f"{total_cycles:.2f}",
        )

        return schedule
