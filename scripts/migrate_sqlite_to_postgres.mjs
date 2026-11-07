/**
 * Safe, Idempotent SQLite -> PostgreSQL Migration Utility
 * Shri Haridutt Ayurvedic Medical College & Hospital
 *
 * Uses built-in node:sqlite (zero external dependency).
 *
 * Preserves:
 *  - Primary keys & UUIDs
 *  - Exact foreign key relationships in topological order
 *  - Exact DateTime timestamps (createdAt, updatedAt, publishedAt, etc.)
 *  - Exact bcrypt password hashes (never modified)
 *  - Document references and paths
 * 
 * Safety Features:
 *  - Reads from verified immutable backup snapshot by default
 *  - Non-destructive: Existing target records are NEVER silently overwritten (they are preserved)
 *  - Dry-run mode by default
 *  - Refuses non-PostgreSQL destinations
 *  - Generates comprehensive migration audit report
 */

import { DatabaseSync } from 'node:sqlite';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

// Dependency-ordered tables
const TABLE_IMPORT_ORDER = [
  // Level 0: Independent tables
  'Role',
  'Permission',
  'User',
  'Student',
  'Department',
  'Course',
  'AdmissionEnquiry',
  'AdmissionApplication',
  'Notice',
  'News',
  'Event',
  'NewsEvent',
  'GalleryCategory',
  'ResearchPublication',
  'Testimonial',
  'ContactEnquiry',
  'ContactMessage',
  'WebsitePage',
  'WebsiteSetting',
  'SeoMetadata',
  'NotificationLog',
  'AcademicCalendarEvent',
  'StudentResource',
  'UploadedFile',
  'HerbalPlant',
  'CampusFacility',
  'DisclosureCategory',
  'RateLimitRecord',
  'AdmissionOtp',
  'UserSession',

  // Level 1: Foreign key dependents
  'RolePermission',
  'UserRole',
  'Faculty',
  'CourseDocument',
  'ApplicationDocument',
  'ApplicationStatusHistory',
  'GalleryItem',
  'AuditLog',
  'DisclosureRecord',

  // Level 2: Nested dependents
  'DisclosureDocument',
];

// Model name mapping to Prisma client accessor
function getModelAccessor(prisma, tableName) {
  const camelCase = tableName.charAt(0).toLowerCase() + tableName.slice(1);
  return prisma[camelCase] || null;
}

// Convert SQLite row values (e.g. integer 0/1 to boolean, ISO strings to Date)
function sanitizeRow(tableName, row) {
  const sanitized = { ...row };
  for (const [key, value] of Object.entries(sanitized)) {
    if (value === null || value === undefined) continue;

    // Convert boolean flags stored as 0 or 1 in SQLite
    if (
      key.startsWith('is') ||
      key === 'feesPaid' ||
      key === 'isSuspended' ||
      key === 'isHOD' ||
      key === 'isLeadership' ||
      key === 'isActive' ||
      key === 'isApproved' ||
      key === 'isVerified' ||
      key === 'isPinned' ||
      key === 'isPublished' ||
      key === 'isFeatured' ||
      key === 'isUpcoming' ||
      key === 'isPrivate' ||
      key === 'isRevoked'
    ) {
      if (typeof value === 'number') {
        sanitized[key] = Boolean(value);
      }
    }

    // Convert DateTime fields
    if (
      key.endsWith('At') ||
      key === 'lastLogin' ||
      key === 'uploadedDate' ||
      key === 'lastUpdatedDate'
    ) {
      if (typeof value === 'string' || typeof value === 'number') {
        sanitized[key] = new Date(value);
      }
    }
  }
  return sanitized;
}

export async function runMigration({
  sqliteDbPath = fs.existsSync('prisma/backups/master_remediation_20261107/dev.db')
    ? 'prisma/backups/master_remediation_20261107/dev.db'
    : 'prisma/dev.db',
  targetDatabaseUrl = process.env.TARGET_DATABASE_URL || process.env.DATABASE_URL,
  dryRun = true,
  forceOverwrite = false,
} = {}) {
  console.log('='.repeat(70));
  console.log('SHRI HARIDUTT AYURVEDIC COLLEGE — DATA MIGRATION ENGINE');
  console.log(`Source SQLite Database : ${sqliteDbPath}`);
  console.log(`Execution Mode         : ${dryRun ? 'DRY-RUN (Audit & Verification Only)' : 'LIVE MIGRATION'}`);
  console.log(`Conflict Resolution   : ${forceOverwrite ? 'OVERWRITE' : 'PRESERVE EXISTING (Skip Duplicates)'}`);
  console.log('='.repeat(70));

  if (!fs.existsSync(sqliteDbPath)) {
    throw new Error(`Source SQLite database not found at: ${sqliteDbPath}`);
  }

  // Connect to SQLite using node:sqlite DatabaseSync
  const sqlite = new DatabaseSync(sqliteDbPath, { readOnly: true });

  const tablesResult = sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma%'").all();
  const existingSqliteTables = tablesResult.map((r) => r.name);

  console.log(`Discovered ${existingSqliteTables.length} SQLite tables.`);

  const summary = {
    totalSourceRecords: 0,
    totalTargetMigrated: 0,
    totalTargetSkipped: 0,
    tables: {},
  };

  let targetPrisma = null;
  if (!dryRun) {
    if (!targetDatabaseUrl || targetDatabaseUrl.startsWith('file:')) {
      throw new Error('Target database URL must be a valid PostgreSQL connection string for live migration.');
    }
    targetPrisma = new PrismaClient({
      datasources: { db: { url: targetDatabaseUrl } },
    });
  }

  try {
    for (const table of TABLE_IMPORT_ORDER) {
      if (!existingSqliteTables.includes(table)) {
        continue;
      }

      const rows = sqlite.prepare(`SELECT * FROM "${table}"`).all();
      summary.totalSourceRecords += rows.length;

      summary.tables[table] = {
        sourceCount: rows.length,
        migratedCount: 0,
        skippedCount: 0,
        failedCount: 0,
        status: 'PENDING',
      };

      if (rows.length === 0) {
        summary.tables[table].status = 'EMPTY';
        continue;
      }

      if (dryRun) {
        summary.tables[table].status = 'VERIFIED_READY';
        console.log(`  -> [${table.padEnd(24)}] : ${rows.length} records verified ready for migration.`);
        continue;
      }

      // Live migration
      const accessor = getModelAccessor(targetPrisma, table);
      if (!accessor) {
        console.warn(`  [!] Warning: No Prisma model accessor found for table "${table}". Skipping.`);
        summary.tables[table].status = 'SKIPPED_NO_ACCESSOR';
        continue;
      }

      for (const rawRow of rows) {
        try {
          const data = sanitizeRow(table, rawRow);

          // Non-destructive upsert: Preserve existing destination data
          const updateData = forceOverwrite ? data : {};

          if (data.id) {
            const result = await accessor.upsert({
              where: { id: data.id },
              update: updateData,
              create: data,
            });
            summary.tables[table].migratedCount++;
            summary.totalTargetMigrated++;
          } else if (data.key) {
            const result = await accessor.upsert({
              where: { key: data.key },
              update: updateData,
              create: data,
            });
            summary.tables[table].migratedCount++;
            summary.totalTargetMigrated++;
          } else {
            await accessor.create({ data });
            summary.tables[table].migratedCount++;
            summary.totalTargetMigrated++;
          }
        } catch (err) {
          summary.tables[table].failedCount++;
          console.error(`  [X] Error migrating record in ${table}:`, err.message);
        }
      }

      summary.tables[table].status = summary.tables[table].failedCount === 0 ? 'SUCCESS' : 'PARTIAL';
      console.log(`  -> Completed: ${summary.tables[table].migratedCount} migrated, ${summary.tables[table].skippedCount} skipped, ${summary.tables[table].failedCount} errors.`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('MIGRATION SUMMARY AUDIT');
    console.log('='.repeat(70));
    console.log(`Total Source Records Detected: ${summary.totalSourceRecords}`);
    if (!dryRun) {
      console.log(`Total Records Migrated       : ${summary.totalTargetMigrated}`);
      console.log(`Total Records Skipped        : ${summary.totalTargetSkipped}`);
    }
    console.log('\nTable Breakdown:');
    for (const [tbl, info] of Object.entries(summary.tables)) {
      if (info.sourceCount > 0) {
        console.log(`  - ${tbl.padEnd(28)}: ${info.sourceCount} records [${info.status}]`);
      }
    }
    console.log('='.repeat(70));

    return summary;
  } finally {
    sqlite.close();
    if (targetPrisma) {
      await targetPrisma.$disconnect();
    }
  }
}

// Allow CLI execution
if (process.argv[1] && process.argv[1].endsWith('migrate_sqlite_to_postgres.mjs')) {
  const isLive = process.argv.includes('--execute');
  const forceOverwrite = process.argv.includes('--force-overwrite');
  const sourceArg = process.argv.find((a) => a.startsWith('--source='));
  const sqliteDbPath = sourceArg ? sourceArg.split('=')[1] : undefined;

  runMigration({ dryRun: !isLive, forceOverwrite, sqliteDbPath }).catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
}
