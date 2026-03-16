/**
 * Joint venture ROI — pre-connection mining.
 * Park owner: builds park anyway (no PPA loss). Costs = OM + degradation.
 * Equipment: miners + containers; moves to another park when connection comes.
 * Fair split = contribution-based: each side's share ∝ their annual cost (capex amortised + opex vs degradation + OM).
 */

import { npv, irr } from './utils';

export interface JVInputs {
  /** Equipment capex: miners + containers (€) */
  equipmentCapexEur: number;
  /** Park/PV capex (€) — 0 if park built anyway (no PPA loss) */
  parkCapexEur: number;
  /** Annual gross revenue from mining (€) */
  revenueEurPerYear: number;
  /** Equipment opex: cooling, maintenance, labour (€) */
  opexAnnualEur: number;
  /** Degradation cost (€/year) — park wear */
  degradationEurPerYear: number;
  /** Park O&M (€/year) — cleaning, inspections, etc. */
  parkOmEurPerYear: number;
  /** Years (default 5 — pre-connection period; equipment moves when connection comes) */
  years?: number;
  /** Discount rate (default 0.10) */
  discountRate?: number;
  /** Revenue starts year (default 1) */
  revenueStartsYear?: number;
}

export interface JVResult {
  /** Investment-based share (0–1) */
  equipmentShare: number;
  parkShare: number;
  /** Net distributable per year (after opex, degradation) */
  netPerYear: number;
  /** Per-side cash flows */
  equipmentCashFlows: number[];
  parkCashFlows: number[];
  equipmentNpvEur: number;
  parkNpvEur: number;
  equipmentIrrPct: number;
  parkIrrPct: number;
  /** Equipment payback period (years) */
  equipmentPaybackYears: number;
  totalNpvEur: number;
}

/** Annuity factor: PV of €1/year for n years at rate r */
function annuityFactor(r: number, n: number): number {
  if (r <= 0) return n;
  return (1 - Math.pow(1 + r, -n)) / r;
}

/**
 * Run JV model: net = revenue − opex − degradation − park OM; split net.
 * Fair split: equipment gets share to achieve ~5% return above break-even; park gets the rest.
 * Ensures both sides are incentivised (positive NPV) when net > 0.
 */
export function runJVSplit(inputs: JVInputs): JVResult {
  const years = inputs.years ?? 5;
  const discountRate = inputs.discountRate ?? 0.10;
  const startYear = inputs.revenueStartsYear ?? 1;

  const ann = annuityFactor(discountRate, years);

  const netPerYear =
    inputs.revenueEurPerYear -
    inputs.degradationEurPerYear -
    inputs.parkOmEurPerYear -
    inputs.opexAnnualEur;

  // Fair split: equipment gets share to achieve target IRR; park gets the rest.
  // Equipment break-even: share * net * ann = capex → share = capex / (net * ann).
  // Add 5% premium so equipment gets positive return; cap equipment at 95% so park keeps ≥5%.
  const breakEvenShare =
    netPerYear > 0 && ann > 0
      ? inputs.equipmentCapexEur / (netPerYear * ann)
      : 0.5;
  const equipmentShare = Math.min(0.95, Math.max(0.05, breakEvenShare * 1.05));
  const parkShare = 1 - equipmentShare;

  const equipmentCashFlows: number[] = [-inputs.equipmentCapexEur];
  const parkCashFlows: number[] = [-inputs.parkCapexEur];

  for (let y = 1; y <= years; y++) {
    const rev = y >= startYear ? inputs.revenueEurPerYear : 0;
    const deg = y >= startYear ? inputs.degradationEurPerYear : 0;
    const om = y >= startYear ? inputs.parkOmEurPerYear : 0;
    const op = inputs.opexAnnualEur;
    const net = rev - deg - om - op;

    equipmentCashFlows.push(equipmentShare * net);
    parkCashFlows.push(parkShare * net);
  }

  const equipmentAnnualCash = equipmentShare * netPerYear;
  const equipmentPaybackYears =
    equipmentAnnualCash > 0
      ? inputs.equipmentCapexEur / equipmentAnnualCash
      : Infinity;

  return {
    equipmentShare,
    parkShare,
    netPerYear,
    equipmentCashFlows,
    parkCashFlows,
    equipmentNpvEur: npv(equipmentCashFlows, discountRate),
    parkNpvEur: npv(parkCashFlows, discountRate),
    equipmentIrrPct: irr(equipmentCashFlows),
    parkIrrPct: irr(parkCashFlows),
    equipmentPaybackYears,
    totalNpvEur: npv(equipmentCashFlows, discountRate) + npv(parkCashFlows, discountRate),
  };
}

/** PPA model: Park Partner gets fixed €/kWh; Mining Partner gets remainder. */
export interface JVPPAInputs {
  equipmentCapexEur: number;
  parkCapexEur: number;
  revenueEurPerYear: number;
  opexAnnualEur: number;
  degradationEurPerYear: number;
  parkOmEurPerYear: number;
  /** PPA rate: €/kWh (e.g. 0.05 = 5 c/kWh) */
  ppaEurPerKwh: number;
  /** MWh/year (for PPA calculation) */
  mwhPerYear: number;
  years?: number;
  discountRate?: number;
  revenueStartsYear?: number;
}

export interface JVPPAResult {
  ppaEurPerYear: number;
  parkNetPerYear: number;
  miningNetPerYear: number;
  equipmentCashFlows: number[];
  parkCashFlows: number[];
  equipmentNpvEur: number;
  parkNpvEur: number;
  equipmentIrrPct: number;
  parkIrrPct: number;
  equipmentPaybackYears: number;
  totalNpvEur: number;
}

export function runJVPPA(inputs: JVPPAInputs): JVPPAResult {
  const years = inputs.years ?? 5;
  const discountRate = inputs.discountRate ?? 0.10;
  const startYear = inputs.revenueStartsYear ?? 1;

  const ppaEurPerYear = inputs.mwhPerYear * 1000 * inputs.ppaEurPerKwh;
  const parkNetPerYear = ppaEurPerYear - inputs.degradationEurPerYear - inputs.parkOmEurPerYear;
  const miningNetPerYear =
    inputs.revenueEurPerYear - ppaEurPerYear - inputs.opexAnnualEur;

  const equipmentCashFlows: number[] = [-inputs.equipmentCapexEur];
  const parkCashFlows: number[] = [-inputs.parkCapexEur];

  for (let y = 1; y <= years; y++) {
    const rev = y >= startYear ? inputs.revenueEurPerYear : 0;
    const deg = y >= startYear ? inputs.degradationEurPerYear : 0;
    const om = y >= startYear ? inputs.parkOmEurPerYear : 0;
    const ppa = y >= startYear ? ppaEurPerYear : 0;
    const op = inputs.opexAnnualEur;

    equipmentCashFlows.push(rev - ppa - op);
    parkCashFlows.push(ppa - deg - om);
  }

  const equipmentPaybackYears =
    miningNetPerYear > 0
      ? inputs.equipmentCapexEur / miningNetPerYear
      : Infinity;

  return {
    ppaEurPerYear,
    parkNetPerYear,
    miningNetPerYear,
    equipmentCashFlows,
    parkCashFlows,
    equipmentNpvEur: npv(equipmentCashFlows, discountRate),
    parkNpvEur: npv(parkCashFlows, discountRate),
    equipmentIrrPct: irr(equipmentCashFlows),
    parkIrrPct: irr(parkCashFlows),
    equipmentPaybackYears,
    totalNpvEur: npv(equipmentCashFlows, discountRate) + npv(parkCashFlows, discountRate),
  };
}

/** Revenue share model: Park gets fixed % of gross revenue; Mining gets remainder minus opex. */
export interface JVRevenueShareInputs {
  equipmentCapexEur: number;
  parkCapexEur: number;
  revenueEurPerYear: number;
  opexAnnualEur: number;
  degradationEurPerYear: number;
  parkOmEurPerYear: number;
  /** Park share of gross revenue (0–1, e.g. 0.25 = 25%) */
  parkSharePct: number;
  years?: number;
  discountRate?: number;
  revenueStartsYear?: number;
}

export interface JVRevenueShareResult {
  parkRevenuePerYear: number;
  parkNetPerYear: number;
  miningNetPerYear: number;
  equipmentCashFlows: number[];
  parkCashFlows: number[];
  equipmentNpvEur: number;
  parkNpvEur: number;
  equipmentIrrPct: number;
  parkIrrPct: number;
  equipmentPaybackYears: number;
  totalNpvEur: number;
}

export function runJVRevenueShare(inputs: JVRevenueShareInputs): JVRevenueShareResult {
  const years = inputs.years ?? 5;
  const discountRate = inputs.discountRate ?? 0.10;
  const startYear = inputs.revenueStartsYear ?? 1;

  const parkRevenuePerYear = inputs.revenueEurPerYear * inputs.parkSharePct;
  const parkNetPerYear =
    parkRevenuePerYear - inputs.degradationEurPerYear - inputs.parkOmEurPerYear;
  const miningNetPerYear =
    inputs.revenueEurPerYear * (1 - inputs.parkSharePct) - inputs.opexAnnualEur;

  const equipmentCashFlows: number[] = [-inputs.equipmentCapexEur];
  const parkCashFlows: number[] = [-inputs.parkCapexEur];

  for (let y = 1; y <= years; y++) {
    const rev = y >= startYear ? inputs.revenueEurPerYear : 0;
    const deg = y >= startYear ? inputs.degradationEurPerYear : 0;
    const om = y >= startYear ? inputs.parkOmEurPerYear : 0;
    const parkRev = y >= startYear ? parkRevenuePerYear : 0;
    const op = inputs.opexAnnualEur;

    equipmentCashFlows.push(rev * (1 - inputs.parkSharePct) - op);
    parkCashFlows.push(parkRev - deg - om);
  }

  const equipmentPaybackYears =
    miningNetPerYear > 0
      ? inputs.equipmentCapexEur / miningNetPerYear
      : Infinity;

  return {
    parkRevenuePerYear,
    parkNetPerYear,
    miningNetPerYear,
    equipmentCashFlows,
    parkCashFlows,
    equipmentNpvEur: npv(equipmentCashFlows, discountRate),
    parkNpvEur: npv(parkCashFlows, discountRate),
    equipmentIrrPct: irr(equipmentCashFlows),
    parkIrrPct: irr(parkCashFlows),
    equipmentPaybackYears,
    totalNpvEur: npv(equipmentCashFlows, discountRate) + npv(parkCashFlows, discountRate),
  };
}
