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

const LOGO_FILES: Record<string, { path: string; mime: string }> = {
  'LOGO_LIGHTHIEF': { path: 'public/images/lighthief-commercial-pv_files/lighthief-logo.png', mime: 'image/png' },
  'LOGO_LINYANG':   { path: 'public/logo/linyang_logo.jpg', mime: 'image/jpeg' },
  'LOGO_KEHUA':     { path: 'public/logo/kehua_logo.jpg', mime: 'image/jpeg' },
  'LOGO_VOLTUS':    { path: 'public/logo/VE-logo-white.png.webp', mime: 'image/webp' },
};

function loadLogoVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, { path: relPath, mime }] of Object.entries(LOGO_FILES)) {
    const fullPath = path.join(ROOT, relPath);
    if (fs.existsSync(fullPath)) {
      const b64 = fs.readFileSync(fullPath).toString('base64');
      vars[key] = `data:${mime};base64,${b64}`;
    } else {
      console.warn(`  ⚠ Logo not found: ${relPath}`);
      vars[key] = '';
    }
  }
  return vars;
}
const TEMPLATE_DIRS = [
  'docs/clients',
  'docs/internal',
  'docs/internal/proposals',
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
  if (path.basename(outputPath).startsWith('._')) {
    return { outputPath, replacements: 0 };
  }
  fs.writeFileSync(outputPath, output, 'utf-8');

  return { outputPath, replacements };
}

function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  DOCUMENT GENERATOR — Single Source of Truth     ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();

  const vars = { ...getTemplateVars(), ...loadLogoVars() };
  console.log(`Loaded ${Object.keys(vars).length} template variables (incl. ${Object.keys(LOGO_FILES).length} embedded logos)`);
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
    if (path.basename(tpl).startsWith('._')) {
      console.log(`  ⊘ skip ${path.relative(ROOT, tpl)} (resource fork)`);
      continue;
    }
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
