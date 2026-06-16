#!/usr/bin/env npx ts-node
/**
 * Cyprus BESS market saturation analysis.
 *
 * Usage:
 *   npx ts-node scripts/analyze-bess-market-saturation.ts
 *   npx ts-node scripts/analyze-bess-market-saturation.ts --json
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  computeBessSaturation,
  CYPRUS_GRID,
  EVENING_HOURS,
  NIGHT_HOURS,
  NON_SOLAR_HOURS,
} from '../lib/market/cyprus-demand-model'

const OUT_JSON = path.join(process.cwd(), 'market', 'data', 'bess-saturation.json')

function main() {
  const jsonOnly = process.argv.includes('--json')
  const result = computeBessSaturation()

  fs.writeFileSync(OUT_JSON, JSON.stringify(result, null, 2))

  if (jsonOnly) {
    console.log(JSON.stringify(result, null, 2))
    return
  }

  const { inputs, windows, bessPools, saturation } = result

  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  Cyprus BESS Market Saturation Analysis                  ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log('')
  console.log('Grid anchors')
  console.log(`  Peak demand:     ${inputs.peakDemandMW} MW`)
  console.log(`  Must-run thermal: ${inputs.mustRunMW} MW`)
  console.log(`  TSOC BESS:       ${CYPRUS_GRID.tsoBessMW} MW / ${CYPRUS_GRID.tsoBessMWh} MWh`)
  console.log('')
  console.log('DAM energy (processed-summaries.json)')
  console.log(`  Sample days:     ${inputs.processedSummaryDays}`)
  console.log(`  Avg daily:       ${inputs.avgDailyMWh.toLocaleString()} MWh`)
  console.log(`  Avg solar:       ${inputs.avgSolarMWh.toLocaleString()} MWh`)
  console.log(`  Avg non-solar:   ${inputs.avgNonSolarMWh.toLocaleString()} MWh`)
  console.log('')
  console.log('Demand windows (modeled load shape, MWh/day)')
  console.log(
    `  16h non-solar (${NON_SOLAR_HOURS[0]}:00–${NON_SOLAR_HOURS[NON_SOLAR_HOURS.length - 1]}:00):` +
      ` ${windows.nonSolar16h.totalDemandMWh.toLocaleString()} total,` +
      ` ${windows.nonSolar16h.mustRunMWh.toLocaleString()} must-run,` +
      ` ${windows.nonSolar16h.addressableMWh.toLocaleString()} addressable`
  )
  console.log(
    `  Evening (${EVENING_HOURS[0]}:00–${EVENING_HOURS[EVENING_HOURS.length - 1]}:00):` +
      ` ${windows.evening17to21.totalDemandMWh.toLocaleString()} total,` +
      ` ${windows.evening17to21.addressableMWh.toLocaleString()} addressable`
  )
  console.log(
    `  Night (${NIGHT_HOURS[0]}:00–${NIGHT_HOURS[NIGHT_HOURS.length - 1]}:00):` +
      ` ${windows.night00to05.totalDemandMWh.toLocaleString()} total,` +
      ` ${windows.night00to05.addressableMWh.toLocaleString()} addressable`
  )
  console.log('')
  console.log('Licensed BESS (CERA registry)')
  console.log(`  Licensed:        ${bessPools.ceraLicensedMW.toLocaleString()} MW / ${bessPools.ceraLicensedMWh.toLocaleString()} MWh`)
  console.log(`  + TSOC:          ${bessPools.totalLicensedPlusTsoMWh.toLocaleString()} MWh total`)
  console.log(`  Lighthief pipe:  ${bessPools.lighthiefPipelineMWh.toLocaleString()} MWh`)
  console.log('')
  console.log('Saturation vs 16h addressable demand')
  console.log(`  CERA licensed:   ${saturation.licensedVs16hAddressablePct}%`)
  console.log(`  CERA + TSOC:     ${saturation.licensedPlusTsoVs16hAddressablePct}%`)
  console.log(`  Lighthief only:  ${saturation.lighthiefVs16hAddressablePct}%`)
  console.log(`  Evening only:    ${saturation.licensedVsEveningAddressablePct}% (licensed vs evening addressable)`)
  console.log(`  Gap to saturate: ${saturation.gapMWhToSaturate16h.toLocaleString()} MWh (if licensed+TSOC < addressable)`)
  console.log('')
  console.log(`Written: ${OUT_JSON}`)
}

main()
