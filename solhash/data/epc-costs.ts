/**
 * EPC costs for Solhash behind-the-meter mining deployment.
 * Platforms, civil works, transport — managed by Solhash as EPC.
 */

/** Platform/foundation per 20ft container (€) — concrete pad, levelling */
export const PLATFORM_EUR_PER_CONTAINER = 15_000;

/** Civil works per MW (€) — cabling, fencing, access roads, LV tie-in to PV */
export const CIVIL_WORKS_EUR_PER_MW = 25_000;

/** Transport + crane per container (€) — A. Soulis confirmed V3, flat rate all routes/types */
export const TRANSPORT_EUR_PER_CONTAINER = 2_500;

/** Land lease per hectare per year (€) — typical Cyprus agricultural solar lease */
export const LAND_LEASE_EUR_PER_HA_PER_YEAR = 2_500;

/** Land use per MW (ha) — typical utility-scale PV */
export const LAND_HA_PER_MW = 1.5;

/** Grid-forming BESS base cost (€) — PCS + battery + controller + enclosure for smallest site */
export const BESS_MICROGRID_BASE_EUR = 35_000;

/** Grid-forming BESS cost per MW of mining capacity (€) — scales with site size */
export const BESS_MICROGRID_EUR_PER_MW = 14_000;

/** Starlink + 4G backup annual cost per site (€) — one dish serves all containers */
export const INTERNET_STARLINK_EUR_PER_YEAR = 1_560;

/** Starlink hardware one-time per site (€) — dish + Peplink router + 4G SIM module */
export const INTERNET_HARDWARE_EUR = 500;

export function epcCostsEur(mwPv: number, containerCount: number): {
  platformEur: number;
  civilEur: number;
  transportEur: number;
  bessMicrogridEur: number;
  internetHardwareEur: number;
  totalEur: number;
  landLeaseEurPerYear: number;
  internetAnnualEur: number;
} {
  const platformEur = containerCount * PLATFORM_EUR_PER_CONTAINER;
  const civilEur = mwPv * CIVIL_WORKS_EUR_PER_MW;
  const transportEur = containerCount * TRANSPORT_EUR_PER_CONTAINER;
  const bessMicrogridEur = BESS_MICROGRID_BASE_EUR + mwPv * BESS_MICROGRID_EUR_PER_MW;
  const internetHardwareEur = INTERNET_HARDWARE_EUR;
  const landLeaseEurPerYear = mwPv * LAND_HA_PER_MW * LAND_LEASE_EUR_PER_HA_PER_YEAR;
  const internetAnnualEur = INTERNET_STARLINK_EUR_PER_YEAR;
  return {
    platformEur,
    civilEur,
    transportEur,
    bessMicrogridEur,
    internetHardwareEur,
    totalEur: platformEur + civilEur + transportEur + bessMicrogridEur + internetHardwareEur,
    landLeaseEurPerYear,
    internetAnnualEur,
  };
}
