/**
 * GPU mining ROI for solhash pre-connection utilization.
 * Revenue from GPU mining (e.g. ETH or other); costs: degradation, opex, capex.
 */

import type { ParkInput, SharedROIInputs, ROIResult } from './types';
import { npv, irr } from './utils';

export interface GPUMiningInputs {
  /** Revenue per MWh consumed (€/MWh) — from GPU revenue / power draw */
  revenueEurPerMwh: number;
  /** Total capex (containers + GPUs, networking) in € */
  capexEur: number;
  /** Revenue starts in year (default 1) */
  revenueStartsYear?: number;
}

/**
 * Single run: aggregate MWh/year across parks; one capex; annual revenue − degradation − opex.
 */
export function runGpuMiningROI(
  parks: ParkInput[],
  shared: SharedROIInputs,
  gpu: GPUMiningInputs
): ROIResult {
  const totalMwhPerYear = parks.reduce((s, p) => s + p.mwhPerYear, 0);
  const degradationEurPerYear = totalMwhPerYear * shared.degradationEurPerMwh;
  const revenueEurPerYear = totalMwhPerYear * gpu.revenueEurPerMwh;
  const startYear = gpu.revenueStartsYear ?? 1;

  const cashFlows: number[] = [];
  cashFlows[0] = -gpu.capexEur;
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
    capexEur: gpu.capexEur,
    label: 'GPU mining',
    meta: undefined,
  };
}
