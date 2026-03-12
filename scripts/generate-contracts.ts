#!/usr/bin/env tsx
// ===================================================================
// CONTRACT GENERATOR
// Reads team-data.ts and the contract template, generates individual
// employment contracts for each team member.
//
// Usage: npx tsx scripts/generate-contracts.ts
//        npx tsx scripts/generate-contracts.ts --employee costas-hadjikyriacou
// ===================================================================

import * as fs from 'fs';
import * as path from 'path';
import { TEAM, COMMISSION, TARGET_MODEL, calcSalesTargets, type Employee } from '../team/team-data';
import { COMPANY } from '../lib/portfolio-data';

const ROOT = path.resolve(__dirname, '..');
const SALES_TEMPLATE = path.join(ROOT, 'team/contracts/templates/employment-contract.template.md');

function buildEtekSection(employee: Employee): string {
  if (!employee.hasEtek) return '';
  return `## 5A. ETEK Licensed Electrician — BESS Sign-Off

Where legally permitted and subject to holding a valid registration with the Cyprus Scientific and Technical Chamber (ETEK), the Employee may act as the Employer's ETEK licensed electrician for inspection, validation, and professional sign-off of BESS installations.

The Employee shall ensure compliance with applicable laws, directives, EAC and DSO requirements, standards, and manufacturer specifications. The Employee shall not sign off any non-compliant installation and shall report deficiencies promptly.

Nothing in this Agreement requires the Employee to assume personal liability beyond mandatory law or professional regulation.

---

`;
}

function buildDutiesList(employee: Employee): string {
  return employee.duties.map(d => `- ${d}`).join('\n');
}

function buildAddressBlock(employee: Employee): string {
  const parts: string[] = [];
  if (employee.address) parts.push(`Residential Address: ${employee.address}`);
  if (employee.mobile) parts.push(`Mobile: ${employee.mobile}`);
  if (employee.email) parts.push(`Email: ${employee.email}`);
  if (parts.length === 0) return '';
  return ', ' + parts.join('. ');
}

function buildAdditionalAnnexes(employee: Employee): string {
  if (employee.annexes.length <= 1) return '';
  return employee.annexes.slice(1).map(a => `- ${a}`).join('\n');
}

function fmtEur(n: number): string {
  return `€${n.toLocaleString('en-IE')}`;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateSalesContract(employee: Employee): string {
  if (!fs.existsSync(SALES_TEMPLATE)) {
    console.error(`Template not found: ${SALES_TEMPLATE}`);
    process.exit(1);
  }

  let content = fs.readFileSync(SALES_TEMPLATE, 'utf-8');

  const targets = calcSalesTargets(employee.monthlyGross);

  const replacements: Record<string, string> = {
    '{{DATE_OF_AGREEMENT}}': employee.contractDate,
    '{{EMPLOYEE_FULL_NAME}}': employee.fullName,
    '{{EMPLOYEE_ID}}': employee.cyprusId,
    '{{EMPLOYEE_SI}}': employee.socialInsurance,
    '{{EMPLOYEE_ADDRESS_BLOCK}}': buildAddressBlock(employee),
    '{{EMPLOYEE_TITLE}}': employee.title,
    '{{START_DATE}}': employee.startDate,
    '{{DUTIES_LIST}}': buildDutiesList(employee),
    '{{ETEK_SECTION}}': buildEtekSection(employee),
    '{{MONTHLY_SALARY}}': employee.salaryDisplay,
    '{{ANNUAL_SALES_TARGET}}': fmtEur(targets.annualTarget),
    '{{ANNUAL_MIN_TARGET}}': fmtEur(targets.annualMinimum),
    '{{SIX_MONTH_MIN_TARGET}}': fmtEur(targets.sixMonthMinimum),
    '{{ADDITIONAL_ANNEXES}}': buildAdditionalAnnexes(employee),
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(escapeRegex(placeholder), 'g'), value);
  }

  return content;
}

function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  CONTRACT GENERATOR — Team Registry              ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();

  const args = process.argv.slice(2);
  const employeeFilter = args.indexOf('--employee') !== -1
    ? args[args.indexOf('--employee') + 1]
    : null;

  const employees = employeeFilter
    ? TEAM.filter(e => e.id === employeeFilter)
    : TEAM.filter(e => e.role !== 'director');

  if (employees.length === 0) {
    console.log(employeeFilter
      ? `No employee found with ID: ${employeeFilter}`
      : 'No employees found in team registry.');
    return;
  }

  console.log(`Company: ${COMPANY.legalName}`);
  console.log(`Director: ${COMPANY.cyprusDirector}`);
  console.log(`Target model: ${TARGET_MODEL.salesTargetMultiplier}× target / ${TARGET_MODEL.minTargetMultiplier}× minimum`);
  console.log(`Generating contracts for ${employees.length} team member(s)...`);
  console.log();

  let generated = 0;

  for (const emp of employees) {
    if (emp.role === 'director') continue;

    const outputDir = path.join(ROOT, `team/contracts/${emp.id}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'employment-contract.md');

    if (emp.role === 'sales') {
      const contract = generateSalesContract(emp);
      fs.writeFileSync(outputPath, contract, 'utf-8');

      const targets = calcSalesTargets(emp.monthlyGross);
      const rel = path.relative(ROOT, outputPath);
      console.log(`  ✓ ${emp.fullName} (${emp.title})`);
      console.log(`    Salary: ${emp.salaryDisplay}/mo | Target: ${fmtEur(targets.annualTarget)} | 6-mo min: ${fmtEur(targets.sixMonthMinimum)}`);
      console.log(`    → ${rel}`);
    } else {
      // Field and back office contracts are maintained directly (not templated)
      const rel = path.relative(ROOT, outputPath);
      const contractType = emp.compensationType === 'subcontractor' ? 'SUBCONTRACTOR' : 'EMPLOYEE';
      console.log(`  ✓ ${emp.fullName} (${emp.title}) [${contractType}]`);
      console.log(`    Fee: ${emp.salaryDisplay}/mo | KPI-based`);
      console.log(`    → ${rel} (manual — not overwritten)`);
    }

    generated++;
  }

  console.log();
  console.log('─────────────────────────────────────────────');
  console.log('SALES TEAM TARGETS SUMMARY');
  console.log('─────────────────────────────────────────────');

  const salesTeam = TEAM.filter(e => e.role === 'sales');
  for (const emp of salesTeam) {
    const t = calcSalesTargets(emp.monthlyGross);
    console.log(`  ${emp.fullName.padEnd(25)} ${emp.salaryDisplay.padEnd(12)} Target: ${fmtEur(t.annualTarget).padEnd(10)} 6-mo min: ${fmtEur(t.sixMonthMinimum)}`);
  }

  console.log();
  console.log(`Done: ${generated} contract(s) processed.`);
}

main();
