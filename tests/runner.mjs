#!/usr/bin/env node

/**
 * AI INNOVATION CHALLENGE — Unified Test Runner
 * Executes Tier 1, Tier 2, Tier 3, Tier 4, Unit & Data Integrity test suites
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('='.repeat(70));
console.log('🚀 AI INNOVATION CHALLENGE — E2E & SPECIFICATION TEST RUNNER');
console.log('='.repeat(70));
console.log(`📁 Project Root : ${rootDir}`);
console.log(`🕒 Timestamp    : ${new Date().toISOString()}`);
console.log('='.repeat(70));

const testArgs = [
  '--experimental-strip-types',
  '--test',
  'tests/unit/data-integrity.test.ts',
  'tests/unit/validation.test.ts',
  'tests/unit/google-sheets.test.ts',
  'tests/e2e/tier1-features.test.ts',
  'tests/e2e/tier2-boundaries.test.ts',
  'tests/e2e/tier3-combinations.test.ts',
  'tests/e2e/tier4-scenarios.test.ts',
];

const result = spawnSync(process.execPath, testArgs, {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
});

if (result.status !== 0) {
  console.error('\n❌ Test run failed with status code:', result.status);
  process.exit(result.status ?? 1);
} else {
  console.log('\n' + '='.repeat(70));
  console.log('✅ ALL TEST SUITES PASSED SUCCESSFULLY (Tiers 1-4, Unit & Integrity)');
  console.log('='.repeat(70));
  process.exit(0);
}
