/**
 * Extended RTB segments from license-level plants + EAC matches.
 *
 * Usage:
 *   npx tsx scripts/generate-cyprus-rtb-segments.ts
 */

import { mergePlantLevelIntoSegmentsFile } from '../lib/cyprus-rtb-segments-merge'

if (mergePlantLevelIntoSegmentsFile()) {
  console.log('Merged plant-level segments into marketing/cera-rtb-segments.json')
} else {
  console.error('Missing cyprus-energy-plants.json or cera-rtb-segments.json')
  process.exit(1)
}
