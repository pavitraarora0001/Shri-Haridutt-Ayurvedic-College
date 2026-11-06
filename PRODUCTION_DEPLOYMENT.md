# PRODUCTION DEPLOYMENT RUNBOOK
## Hostinger Business Web Hosting — Shri Haridutt Ayurvedic Medical College

---

## 1. TARGET INFRASTRUCTURE SPECIFICATION

- **Hosting Platform**: Hostinger Business Web Hosting
- **Server OS**: CloudLinux 8 / 9 with CageFS isolation
- **Web Server**: LiteSpeed Web Server with Apache Reverse Proxy module
- **Node.js Runtime**: v20.x or v22.x LTS (compatible with Node 20–24)
- **Database**: Hostinger MySQL 8.0.x / MariaDB 10.11.x (or persistent SQLite)
- **SSL**: Let's Encrypt Wildcard SSL (automated renewal)
- **Process Manager**: Hostinger Node.js Application Manager (Passenger) or PM2

---

## 2. PRE-DEPLOYMENT ARCHIVE PACKAGING

The Next.js application has been compiled using `output: 'standalone'`, creating a minimal, self-contained production bundle in `.next/standalone`.

### Files to Deploy:
```
shri-haridutt-ayurvedic-college/
├── .next/
│   ├── standalone/          # Minimal runtime server & compiled chunks
│   └── static/              # Client-side JS, CSS & font bundles
├── prisma/
│   ├── schema.prisma        # Normalized 30-entity schema
│   ├── seed.mjs             # Idempotent database seeder
│   └── dev.db               # Database snapshot (if utilizing SQLite)
├── public/                  # Public assets, logos, favicon, swagger.json
├── storage/
│   └── private_documents/   # Protected encrypted dossier vault
├── ecosystem.config.cjs     # PM2 process configuration
├── package.json
└── .env                     # Production environment secrets
```

---

## 3. HOSTINGER HPANEL DEPLOYMENT STEPS

### Step 1: Create MySQL Database in Hostinger hPanel
1. Navigate to **hPanel** > **Databases** > **MySQL Databases**.
2. Create database:
   - **DB Name**: `u123456789_shamc`
   - **DB User**: `u123456789_admin`
   - **Password**: `[SECURE_DB_PASSWORD]`
3. Note Hostinger database host (typically `localhost` or `127.0.0.1:3306`).

### Step 2: Configure Environment Variables (`.env`)
Create `.env` in the application root:
```env
# Database Connection (MySQL on Hostinger)
DATABASE_URL="mysql://u123456789_admin:[SECURE_DB_PASSWORD]@localhost:3306/u123456789_shamc"

# If choosing to run SQLite persistently on Hostinger NVMe SSD:
# DATABASE_URL="file:./prisma/dev.db"

# JWT Authentication Secret (High-entropy 64-char key)
JWT_SECRET="64_CHAR_CRYPTOGRAPHIC_SECRET_HERE"

# Institutional Canonical URL
NEXT_PUBLIC_APP_URL="https://hariduttayurveda.edu.in"

# Administrative Alert Recipient
ADMIN_NOTIFICATION_EMAIL="admissions@hariduttayurveda.edu.in"

# Hostinger SMTP Mail Configuration
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_USER="admissions@hariduttayurveda.edu.in"
SMTP_PASS="[HOSTINGER_MAILBOX_PASSWORD]"
SMTP_FROM="Shri Haridutt Ayurvedic Medical College <admissions@hariduttayurveda.edu.in>"
```

### Step 3: Run Migrations & Seeding
From the Hostinger SSH Terminal:
```bash
# Push schema to MySQL database
npx prisma db push

# Seed institutional administrator accounts, courses, and departments
node prisma/seed.mjs
```

### Step 4: Launch Application with PM2 or hPanel Node Selector
```bash
# Start Next.js standalone server
pm2 start ecosystem.config.cjs --env production

# Persist across server reboots
pm2 save
```

### Step 5: Verification & Health Check
Test the live health endpoint:
```bash
curl -i https://hariduttayurveda.edu.in/api/v1/health
```
Expected response: `200 OK` with `"status": "healthy"`, `"services": { "database": { "status": "CONNECTED" } }`.
