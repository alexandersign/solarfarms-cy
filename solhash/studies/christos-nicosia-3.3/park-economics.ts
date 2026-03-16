/**
 * Christos Nicosia 3.3 MW — PPA and revenue-share economics.
 * PPA: Park gets fixed 5 c/kWh. Revenue share: Park gets 25% of gross mining revenue.
 */

import {
  CHRISTOS_NICOSIA_PRE_CONNECTION_MWP,
  CHRISTOS_NICOSIA_MWH_PER_YEAR,
} from './park-config';
import { deriveBtcParamsFromS21 } from '../../data/antminer-s21';
import { epcCostsEur } from '../../data/epc-costs';
import { runJVPPA, runJVRevenueShare } from '../../model/roi-jv-split';
import { PARK_OM_EUR_PER_KW_PER_YEAR } from '../../data/modular-parks';

/** PPA rate: 5 c/kWh (fixed) */
export const PPA_EUR_PER_KWH = 0.05;

/** Park revenue share (25%) — calibrated to ~5 c/kWh at BTC €100k */
export const PARK_REVENUE_SHARE_PCT = 0.25;

/** Degradation cost €/MWh */
const DEGRADATION_EUR_PER_MWH = 10;

/** Equipment opex €/MW/year */
const OPEX_EUR_PER_MW = 12_000;

const derived = deriveBtcParamsFromS21(CHRISTOS_NICOSIA_MWH_PER_YEAR);
const epc = epcCostsEur(CHRISTOS_NICOSIA_PRE_CONNECTION_MWP, derived.containerCount);

const degradationEurPerYear = CHRISTOS_NICOSIA_MWH_PER_YEAR * DEGRADATION_EUR_PER_MWH;
const parkOmEurPerYear =
  CHRISTOS_NICOSIA_PRE_CONNECTION_MWP * 1000 * PARK_OM_EUR_PER_KW_PER_YEAR;
const opexEur = CHRISTOS_NICOSIA_PRE_CONNECTION_MWP * OPEX_EUR_PER_MW;
const revenueEurPerYear = CHRISTOS_NICOSIA_MWH_PER_YEAR * derived.revenueEurPerMwh;

const jvPpa = runJVPPA({
  equipmentCapexEur: derived.capexEur + epc.totalEur,
  parkCapexEur: 0,
  revenueEurPerYear,
  opexAnnualEur: opexEur,
  degradationEurPerYear,
  parkOmEurPerYear,
  ppaEurPerKwh: PPA_EUR_PER_KWH,
  mwhPerYear: CHRISTOS_NICOSIA_MWH_PER_YEAR,
  years: 5,
  discountRate: 0.10,
  revenueStartsYear: 1,
});

const jvRevShare = runJVRevenueShare({
  equipmentCapexEur: derived.capexEur + epc.totalEur,
  parkCapexEur: 0,
  revenueEurPerYear,
  opexAnnualEur: opexEur,
  degradationEurPerYear,
  parkOmEurPerYear,
  parkSharePct: PARK_REVENUE_SHARE_PCT,
  years: 5,
  discountRate: 0.10,
  revenueStartsYear: 1,
});

export const CHRISTOS_NICOSIA_PPA_ECONOMICS = {
  s21Count: derived.s21Count,
  containerCount: derived.containerCount,
  mwhPerYear: CHRISTOS_NICOSIA_MWH_PER_YEAR,
  ppaEurPerKwh: PPA_EUR_PER_KWH,
  ppaEurPerYear: jvPpa.ppaEurPerYear,
  parkNetPerYear: jvPpa.parkNetPerYear,
  miningNetPerYear: jvPpa.miningNetPerYear,
  equipmentCapex: derived.capexEur,
  epcTotal: epc.totalEur,
  totalCapex: derived.capexEur + epc.totalEur,
  equipmentNpv: jvPpa.equipmentNpvEur,
  parkNpv: jvPpa.parkNpvEur,
  equipmentIrr: jvPpa.equipmentIrrPct,
  parkIrr: jvPpa.parkIrrPct,
  equipmentPaybackYears: jvPpa.equipmentPaybackYears,
};

/** 25% revenue share model (base revenue at €60K BTC hash price) */
export const CHRISTOS_NICOSIA_REV_SHARE_ECONOMICS = {
  s21Count: derived.s21Count,
  containerCount: derived.containerCount,
  mwhPerYear: CHRISTOS_NICOSIA_MWH_PER_YEAR,
  parkSharePct: PARK_REVENUE_SHARE_PCT,
  revenueEurPerYear,
  parkRevenuePerYear: jvRevShare.parkRevenuePerYear,
  parkNetPerYear: jvRevShare.parkNetPerYear,
  miningNetPerYear: jvRevShare.miningNetPerYear,
  parkCentsPerKwh: (jvRevShare.parkRevenuePerYear / (CHRISTOS_NICOSIA_MWH_PER_YEAR * 1000)) * 100,
  equipmentCapex: derived.capexEur,
  epcTotal: epc.totalEur,
  totalCapex: derived.capexEur + epc.totalEur,
  equipmentNpv: jvRevShare.equipmentNpvEur,
  parkNpv: jvRevShare.parkNpvEur,
  equipmentIrr: jvRevShare.equipmentIrrPct,
  parkIrr: jvRevShare.parkIrrPct,
  equipmentPaybackYears: jvRevShare.equipmentPaybackYears,
};

/** BTC scenario scaling: revenue scales with BTC price (hash price ∝ BTC). */
const HASH_CALIBRATION_BTC = 60_000;
export function revShareAtBtc(btcEur: number): {
  revenueEurPerYear: number;
  parkRevenuePerYear: number;
  parkCentsPerKwh: number;
  parkNetPerYear: number;
  miningNetPerYear: number;
  equipmentPaybackYears: number;
} {
  const mult = btcEur / HASH_CALIBRATION_BTC;
  const rev = revenueEurPerYear * mult;
  const parkRev = rev * PARK_REVENUE_SHARE_PCT;
  const parkNet = parkRev - degradationEurPerYear - parkOmEurPerYear;
  const miningNet = rev * (1 - PARK_REVENUE_SHARE_PCT) - opexEur;
  const totalCapex = derived.capexEur + epc.totalEur;
  return {
    revenueEurPerYear: rev,
    parkRevenuePerYear: parkRev,
    parkCentsPerKwh: (parkRev / (CHRISTOS_NICOSIA_MWH_PER_YEAR * 1000)) * 100,
    parkNetPerYear: parkNet,
    miningNetPerYear: miningNet,
    equipmentPaybackYears: miningNet > 0 ? totalCapex / miningNet : Infinity,
  };
}
