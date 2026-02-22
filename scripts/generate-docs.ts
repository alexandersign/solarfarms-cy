#!/usr/bin/env tsx
// ===================================================================
// DOCUMENT GENERATOR
// Reads .template.html / .template.md files, replaces {{VARIABLE}}
// placeholders with values from lib/portfolio-data.ts, and writes
// the output to the corresponding .html / .md file.
//
// Usage: npx tsx scripts/generate-docs.ts
// ===================================================================

import * as fs from 'fs';
import * as path from 'path';
import { getTemplateVars } from '../lib/portfolio-data';

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE_DIRS = [
  'docs/clients',
  'docs/internal',
  'docs/internal/proposals',
  'docs/internal/proposals/group-order/clients',
  'docs/internal/proposals/individual/clients',
  'docs/quotations/internal-analysis',
  'business-plan',
];

function findTemplates(dir: string): string[] {
  const results: string[] = [];
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return results;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);
    if (entry.isDirectory()) {
      const relChild = path.relative(ROOT, fullPath);
      results.push(...findTemplates(relChild));
    } else if (entry.name.includes('.template.')) {
      results.push(fullPath);
    }
  }
  return results;
}

function generateFromTemplate(templatePath: string, vars: Record<string, string>): { outputPath: string; replacements: number } {
  const content = fs.readFileSync(templatePath, 'utf-8');
  let replacements = 0;

  const output = content.replace(/\{\{([A-Za-z0-9_.]+)\}\}/g, (_match, key: string) => {
    if (key in vars) {
      replacements++;
      return vars[key];
    }
    console.warn(`  ⚠ Unknown variable: {{${key}}} in ${path.relative(ROOT, templatePath)}`);
    return _match;
  });

  const outputPath = templatePath.replace('.template.html', '.html').replace('.template.md', '.md');
  fs.writeFileSync(outputPath, output, 'utf-8');

  return { outputPath, replacements };
}

function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  DOCUMENT GENERATOR — Single Source of Truth     ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();

  const vars = getTemplateVars();
  console.log(`Loaded ${Object.keys(vars).length} template variables from lib/portfolio-data.ts`);
  console.log();

  let allTemplates: string[] = [];
  for (const dir of TEMPLATE_DIRS) {
    allTemplates.push(...findTemplates(dir));
  }

  if (allTemplates.length === 0) {
    console.log('No .template.html or .template.md files found.');
    console.log('Convert documents by renaming e.g. doc.html → doc.template.html');
    console.log('and replacing hardcoded values with {{VARIABLE}} placeholders.');
    return;
  }

  console.log(`Found ${allTemplates.length} template(s):`);
  console.log();

  let totalReplacements = 0;
  let totalFiles = 0;

  for (const tpl of allTemplates) {
    const rel = path.relative(ROOT, tpl);
    const { outputPath, replacements } = generateFromTemplate(tpl, vars);
    const outRel = path.relative(ROOT, outputPath);
    console.log(`  ✓ ${rel}`);
    console.log(`    → ${outRel} (${replacements} replacements)`);
    totalReplacements += replacements;
    totalFiles++;
  }

  console.log();
  console.log(`Done: ${totalFiles} file(s) generated, ${totalReplacements} total replacements.`);
}

main();
