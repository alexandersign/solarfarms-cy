/**
 * Datacenter GPU ROI for solhash pre-connection utilization.
 * Revenue from cloud/AI inference (e.g. $/GPU-hour); costs: degradation, opex, capex.
 */

import type { ParkInput, SharedROIInputs, ROIResult } from './types';
import { npv, irr } from './utils';

export interface DatacenterGPUInputs {
  /** Revenue per MWh consumed (€/MWh) — from GPU-hour revenue / power */
  revenueEurPerMwh: number;
  /** Total capex (containers + servers/GPUs, networking) in € */
  capexEur: number;
  /** Revenue starts in year (default 1) */
  revenueStartsYear?: number;
}

/**
 * Single run: aggregate MWh/year across parks; one capex; annual revenue − degradation − opex.
 */
export function runDatacenterGPUROI(
  parks: ParkInput[],
  shared: SharedROIInputs,
  dc: DatacenterGPUInputs
): ROIResult {
  const totalMwhPerYear = parks.reduce((s, p) => s + p.mwhPerYear, 0);
  const degradationEurPerYear = totalMwhPerYear * shared.degradationEurPerMwh;
  const revFactor = shared.daytimeOnly ? (shared.daytimeOnlyDatacenterRevenueFactor ?? 0.6) : 1.0;
  const revenueEurPerYear = totalMwhPerYear * dc.revenueEurPerMwh * revFactor;
  const startYear = dc.revenueStartsYear ?? 1;

  const cashFlows: number[] = [];
  cashFlows[0] = -dc.capexEur;
  let totalRevenue = 0;
  let totalDegradation = 0;
  let totalOpex = 0;

  for (let y = 1; y <= shared.years; y++) {
    const rev = y >= startYear ? revenueEurPerYear : 0;
    const deg = y >= startYear ? degradationEurPerYear : 0;
    const op = shared.opexAnnualEur;
    const net = rev - deg - op;
    cashFlows.push(net);
    totalRevenue += rev;
    totalDegradation += deg;
    totalOpex += op;
  }

  return {
    npvEur: npv(cashFlows, shared.discountRate),
    irrPct: irr(cashFlows),
    cashFlows,
    totalRevenueEur: totalRevenue,
    totalDegradationCostEur: totalDegradation,
    totalOpexEur: totalOpex,
    capexEur: dc.capexEur,
    label: 'Datacenter GPU',
    meta: undefined,
  };
}
