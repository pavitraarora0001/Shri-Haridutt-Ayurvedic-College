# DATABASE MIGRATION SPECIFICATION & RUNBOOK
## Shri Haridutt Ayurvedic Medical College & Hospital

---

## 1. DUAL-DIALECT COMPATIBILITY (SQLite ⟷ MySQL)

The institutional schema in `prisma/schema.prisma` is written using standard ANSI SQL datatypes supported universally by both SQLite (development & local testing) and MySQL / MariaDB (Hostinger Business Web Hosting).

### Dialect Configuration Toggle:

```prisma
// For Development / SQLite:
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL") // "file:./dev.db"
}

// For Hostinger Production / MySQL:
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL") // "mysql://user:pass@localhost:3306/dbname"
}
```

---

## 2. PRODUCTION MIGRATION PROCEDURE

When transitioning to Hostinger MySQL:

1. **Pre-Migration Integrity Check**:
   Confirm that all models, foreign keys, and indexes compile without syntax conflicts:
   ```bash
   npx prisma validate
   ```

2. **Schema Push**:
   ```bash
   npx prisma db push
   ```
   This generates all 30 database tables, foreign key constraints, composite unique indexes, and defaults without dropping existing data.

3. **Seeding Institutional Baseline**:
   ```bash
   node prisma/seed.mjs
   ```
   This populates:
   - Super Admin, Principal, Admission Officer, and Faculty user accounts with secure salted bcrypt hashes.
   - BAMS, MD (Ayurveda), and Panchakarma degree syllabi.
   - 14 Ayurvedic departmental units.
   - Faculty profiles and clinical designations.
   - Academic calendar entries and initial study compendia.

---

## 3. ZERO-DOWNTIME MIGRATION SAFEGUARDS

- **Idempotency**: All seeding scripts use `prisma.[entity].upsert()` with unique keys (`slug`, `code`, `email`, `key`). Re-running migrations never creates duplicate records.
- **Foreign Key Cascade Safety**: Cascade deletions are strictly confined to dependent transactional entities (e.g., candidate documents tied to an application). System-level accounts and logs use `onDelete: SetNull` to prevent cascading loss of historical records.
- **Rollback Procedure**: In the event of schema discrepancy on MySQL, revert `provider = "sqlite"` and point to the validated snapshot `prisma/backup_dev_production_ready.db`.
