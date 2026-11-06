# DATABASE BACKUP & RECOVERY PROTOCOL
## Shri Haridutt Ayurvedic Medical College & Hospital

---

## 1. BACKUP SCHEDULE & RETENTION POLICY

| Backup Tier | Frequency | Tool | Retention | Storage Location |
|---|---|---|---|---|
| **Hourly Transactional** | Every 60 mins | Hostinger Automated Snapshots | 7 Days | Hostinger Cloud Backup Vault |
| **Daily Full Dump** | Every 24 hours (02:00 IST) | `mysqldump` / SQLite Snapshot | 30 Days | Off-site Cold Storage / Encrypted S3 |
| **Pre-Deployment Freeze** | Prior to code release | Manual Snapshot | Indefinite | `prisma/backup_dev_production_ready.db` |

---

## 2. BACKUP PROCEDURES

### A. Hostinger MySQL Backup via Terminal / Cron
Execute `mysqldump` to create a gzipped SQL snapshot:
```bash
mysqldump -u u123456789_admin -p -h localhost u123456789_shamc | gzip > /home/u123456789/backups/shamc_db_$(date +%Y%m%d_%H%M%S).sql.gz
```

### B. SQLite Snapshot (Local / Single-File Hostinger)
```bash
# Safely snapshot SQLite without locking writes
sqlite3 prisma/dev.db ".backup 'prisma/backup_$(date +%Y%m%d_%H%M%S).db'"
```

---

## 3. DISASTER RECOVERY & RESTORATION

### To Restore MySQL from Gzipped Backup:
```bash
gunzip < /home/u123456789/backups/shamc_db_20261104.sql.gz | mysql -u u123456789_admin -p -h localhost u123456789_shamc
```

### To Restore SQLite:
```bash
cp prisma/backup_dev_production_ready.db prisma/dev.db
```

### Post-Restoration Verification:
Run the automated system test suite to verify table integrity and foreign keys:
```bash
node scripts/backend-e2e-test.mjs
```
