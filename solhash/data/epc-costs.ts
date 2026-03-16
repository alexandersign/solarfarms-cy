/**
 * EPC costs for Solhash behind-the-meter mining deployment.
 * Platforms, civil works, transport — managed by Solhash as EPC.
 */

/** Platform/foundation per 20ft container (€) — concrete pad, levelling */
export const PLATFORM_EUR_PER_CONTAINER = 15_000;

/** Civil works per MW (€) — cabling, fencing, access roads, LV tie-in to PV */
export const CIVIL_WORKS_EUR_PER_MW = 25_000;

/** Transport per container (€) — local delivery to site in Cyprus */
export const TRANSPORT_EUR_PER_CONTAINER = 10_000;

export function epcCostsEur(mwPv: number, containerCount: number): {
  platformEur: number;
  civilEur: number;
  transportEur: number;
  totalEur: number;
} {
  const platformEur = containerCount * PLATFORM_EUR_PER_CONTAINER;
  const civilEur = mwPv * CIVIL_WORKS_EUR_PER_MW;
  const transportEur = containerCount * TRANSPORT_EUR_PER_CONTAINER;
  return {
    platformEur,
    civilEur,
    transportEur,
    totalEur: platformEur + civilEur + transportEur,
  };
}
