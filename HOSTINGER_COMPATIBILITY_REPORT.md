# HOSTINGER BUSINESS WEB HOSTING COMPATIBILITY REPORT
## Shri Haridutt Ayurvedic Medical College & Hospital

---

## 1. HOSTING PLAN SPECIFICATIONS

- **Target Hosting Tier**: Hostinger Business Web Hosting
- **Server OS**: CloudLinux / AlmaLinux
- **Web Server Architecture**: LiteSpeed Web Server / Apache Reverse Proxy
- **Supported Application Runtimes**: Node.js (via CloudLinux Node.js Selector / Passenger) or Standalone PM2
- **Database Engine**: MySQL 8.0.x / MariaDB 10.11.x

---

## 2. RUNTIME & APPLICATION COMPATIBILITY MATRIX

| Component | Required by Platform | Hostinger Business Support | Verification Status | Mitigation / Strategy |
|---|---|---|---|---|
| **Node.js** | v20.x or v22.x LTS | Hostinger supports Node.js 18.x, 20.x, 22.x in hPanel Node.js Selector | **PASS** | Selected Node 20.x / 22.x LTS in application settings. |
| **Framework** | Next.js 15+ App Router | Standalone build (`output: 'standalone'`) supported | **PASS** | `next.config.mjs` configured with `output: 'standalone'`. Produces lightweight single-folder deployment bundle. |
| **Database** | MySQL 8.x / SQLite | Hostinger includes Unlimited MySQL databases with phpMyAdmin | **PASS** | Dual-compatible schema. Hostinger MySQL provides remote/local connection strings. |
| **Process Manager** | PM2 / Passenger | Passenger built into Hostinger cPanel/hPanel; PM2 available via SSH | **PASS** | `ecosystem.config.cjs` provided for PM2; `server.js` fallback compatible with Passenger. |
| **SSL / HTTPS** | TLS 1.3 / Strict-Transport | Free Hostinger Let's Encrypt Wildcard SSL included | **PASS** | Configured automated redirect and HSTS headers. |
| **File Storage** | Public images + Private docs | Hostinger NVMe SSD storage with customizable file permissions | **PASS** | Public assets stored in `public/uploads/`; private files secured in `storage/private_documents/` with 0750 permissions. |
| **SMTP Mail** | TLS / STARTTLS SMTP | Hostinger Business includes 100 free business email mailboxes | **PASS** | `src/lib/email.ts` connects via Hostinger SMTP (`smtp.hostinger.com:465` SSL or port 587 TLS). |

---

## 3. HOSTINGER DEPLOYMENT OPTIONS COMPARED

### Option A: Hostinger hPanel "Node.js Application" (Recommended)
- **Pros**: Direct graphical interface in hPanel, zero PM2 configuration required, automatic restart on crash, native SSL termination.
- **Root Directory**: `public_html/` or `/home/u123456789/shri-haridutt-ayurvedic-college`
- **Application Startup File**: `server.js` (from `.next/standalone`)

### Option B: Hostinger SSH Shell + PM2
- **Pros**: Full developer control, live log monitoring via `pm2 logs`, zero downtime reloads (`pm2 reload`).
- **Command**:
  ```bash
  pm2 start ecosystem.config.cjs --env production
  ```

---

## 4. COMPATIBILITY CONCLUSION
Hostinger Business Web Hosting meets all technical requirements for running the Shri Haridutt Ayurvedic Medical College backend. Full operational readiness verified.
