#!/usr/bin/env tsx
// ===================================================================
// DOCUMENT VALIDATOR
// Scans all .html and .md files for stale/incorrect values and
// reports mismatches with line numbers. Skips historical documents.
//
// Usage: npx tsx scripts/validate-docs.ts
// ===================================================================

import * as fs from 'fs';
import * as path from 'path';
import { STALE_VALUES, HISTORICAL_PATHS, PORTFOLIO, FINANCIALS } from '../lib/portfolio-data';

const ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['docs', 'legal', 'business-plan', 'components'];
const EXTENSIONS = ['.html', '.md'];

// Skip templates (they get generated), resource forks, and backups
const SKIP_PATTERNS = ['.template.', '._', '.backup', '.bak', 'node_modules'];

interface Finding {
  file: string;
  line: number;
  pattern: string;
  context: string;
  correct: string;
  isHistorical: boolean;
}

function isHistoricalPath(relPath: string): boolean {
  return HISTORICAL_PATHS.some(hp => relPath.startsWith(hp));
}

function scanFile(filePath: string): Finding[] {
  const findings: Finding[] = [];
  const relPath = path.relative(ROOT, filePath);

  if (SKIP_PATTERNS.some(p => relPath.includes(p))) return findings;

  const ext = path.extname(filePath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return findings;

  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return findings;
  }

  const lines = content.split('\n');
  const historical = isHistoricalPath(relPath);

  for (const stale of STALE_VALUES) {
    for (let i = 0; i < lines.length; i++) {
      // Skip CSS margin properties
      if (lines[i].match(/margin\s*:/i) && stale.context.includes('margin')) continue;
      // Skip lines that are just HTML/CSS style
      if (lines[i].trim().startsWith('margin:') || lines[i].trim().startsWith('margin-')) continue;

      if (stale.regex.test(lines[i])) {
        findings.push({
          file: relPath,
          line: i + 1,
          pattern: stale.pattern,
          context: stale.context,
          correct: stale.correct,
          isHistorical: historical,
        });
      }
      stale.regex.lastIndex = 0;
    }
  }

  return findings;
}

function scanDir(dir: string): Finding[] {
  const findings: Finding[] = [];
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return findings;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      const relChild = path.relative(ROOT, fullPath);
      findings.push(...scanDir(relChild));
    } else {
      findings.push(...scanFile(fullPath));
    }
  }
  return findings;
}

function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  DOCUMENT VALIDATOR — Stale Data Checker         ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();
  console.log(`Canonical values: ${PORTFOLIO.parks} parks | ${PORTFOLIO.mwh} MWh | ${FINANCIALS.netMarginRounded}% margin`);
  console.log(`Checking ${STALE_VALUES.length} stale patterns across ${SCAN_DIRS.join(', ')}`);
  console.log();

  const allFindings: Finding[] = [];
  for (const dir of SCAN_DIRS) {
    allFindings.push(...scanDir(dir));
  }

  const living = allFindings.filter(f => !f.isHistorical);
  const historical = allFindings.filter(f => f.isHistorical);

  if (living.length === 0 && historical.length === 0) {
    console.log('✅ All documents are consistent with the data registry. No stale values found.');
    return;
  }

  if (living.length > 0) {
    console.log(`🔴 LIVING DOCUMENTS — ${living.length} stale value(s) found (MUST FIX):`);
    console.log('─'.repeat(80));

    const byFile = new Map<string, Finding[]>();
    for (const f of living) {
      const arr = byFile.get(f.file) || [];
      arr.push(f);
      byFile.set(f.file, arr);
    }

    for (const [file, finds] of byFile) {
      console.log(`\n  ${file}:`);
      for (const f of finds) {
        console.log(`    L${f.line}: "${f.pattern}" → should be "${f.correct}" (${f.context})`);
      }
    }
  }

  if (historical.length > 0) {
    console.log();
    console.log(`⚪ HISTORICAL DOCUMENTS — ${historical.length} stale value(s) (OK to leave as-is):`);
    console.log('─'.repeat(80));

    const byFile = new Map<string, number>();
    for (const f of historical) {
      byFile.set(f.file, (byFile.get(f.file) || 0) + 1);
    }

    for (const [file, count] of byFile) {
      console.log(`  ${file} (${count} stale values — historical record)`);
    }
  }

  console.log();
  console.log('─'.repeat(80));
  console.log(`Summary: ${living.length} living + ${historical.length} historical stale values`);

  if (living.length > 0) {
    console.log();
    console.log('To fix living documents:');
    console.log('  1. Convert to templates and run: npm run docs:generate');
    console.log('  2. Or manually update the stale values shown above');
    process.exit(1);
  }
}

main();
