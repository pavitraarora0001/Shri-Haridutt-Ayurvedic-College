/**
 * Database Provider Switcher Utility
 * Shri Haridutt Ayurvedic Medical College & Hospital
 *
 * Safely toggles between PostgreSQL (Production / Staging) and SQLite (Local Offline Development)
 * without losing data or schema changes.
 *
 * Usage:
 *   node scripts/switch_db_provider.mjs postgresql
 *   node scripts/switch_db_provider.mjs sqlite
 */

import fs from 'fs';
import { execSync } from 'child_process';

const targetProvider = process.argv[2]?.toLowerCase();

if (!['postgresql', 'sqlite'].includes(targetProvider)) {
  console.error('Invalid provider specified. Please use:');
  console.error('  node scripts/switch_db_provider.mjs postgresql');
  console.error('  node scripts/switch_db_provider.mjs sqlite');
  process.exit(1);
}

const sourceFile = targetProvider === 'postgresql'
  ? 'prisma/schema.postgresql.prisma'
  : 'prisma/schema.sqlite.prisma';

if (!fs.existsSync(sourceFile)) {
  console.error(`Source schema file not found: ${sourceFile}`);
  process.exit(1);
}

console.log(`Switching database provider to: ${targetProvider.toUpperCase()}`);
fs.copyFileSync(sourceFile, 'prisma/schema.prisma');
console.log(`Copied ${sourceFile} -> prisma/schema.prisma`);

console.log('Regenerating Prisma Client...');
const env = { ...process.env };
if (targetProvider === 'postgresql') {
  env.DATABASE_URL = env.DATABASE_URL?.startsWith('postgres')
    ? env.DATABASE_URL
    : 'postgresql://placeholder_user:placeholder_pass@localhost:5432/placeholder_db';
} else {
  env.DATABASE_URL = 'file:./dev.db';
}

try {
  execSync('npx prisma generate', { stdio: 'inherit', env });
  console.log(`Successfully configured and generated Prisma Client for ${targetProvider.toUpperCase()}!`);
} catch (err) {
  console.error('Prisma generate failed:', err.message);
  process.exit(1);
}
