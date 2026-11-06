# PRODUCTION READINESS ASSESSMENT & HOSTINGER DEPLOYMENT VERDICT
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Hosting Target:** Hostinger Business Web Hosting (CloudLinux / cPanel / hPanel)  
**Date:** November 5, 2026  
**Auditor:** Senior Backend Architect & Production Release Engineer  

---

## 1. PRODUCTION READINESS SCORECARD

```
+-------------------------------------------------------------+
| OVERALL PRODUCTION READINESS SCORE: 68 / 100               |
| STATUS: CONDITIONALLY READY — REMEDIATION REQUIRED         |
+-------------------------------------------------------------+
```

| Dimension | Weight | Score | Verdict | Key Blocker |
| :--- | :---: | :---: | :---: | :--- |
| **1. Application Core & Next.js 15 Build** | 15% | 14 / 15 | **PASS** | Standalone build succeeds; type checks pass with 0 errors. |
| **2. Authentication Security** | 20% | 10 / 20 | **FAIL** | Hardcoded JWT fallback secret in code; missing rate limiting. |
| **3. Authorization & RBAC** | 15% | 8 / 15 | **FAIL** | Unversioned admin routes have broken privilege checks & unauthenticated GETs. |
| **4. Data Privacy & IDOR** | 15% | 7 / 15 | **FAIL** | Public `/api/admissions/status` exposes applicant PII and scores without auth. |
| **5. Database & Concurrency** | 15% | 10 / 15 | **WARN** | SQLite active in schema; needs MySQL configuration for Hostinger production. |
| **6. File & Media Storage** | 10% | 8 / 10 | **PASS** | Private documents stored outside public root; requires permission verification. |
| **7. Production Infrastructure & Headers** | 10% | 7 / 10 | **WARN** | Missing CSP and HSTS headers; missing `middleware.ts`. |

---

## 2. HOSTINGER HOSTING REQUIREMENTS VERIFICATION

### 2.1 Supported Node.js Version
- **Requirement:** Next.js 15 requires Node.js >= 18.18.0 or >= 20.9.0.
- **Hostinger Capability:** Hostinger Cloud / Business Hosting offers Node.js 18.x and 20.x through the hPanel Node.js Application Manager.
- **Verification:** Compatible. Select Node.js 20.x in Hostinger hPanel.

### 2.2 Application Startup & Process Management
- **Startup Command:** `node server.js` (produced by Next.js `output: 'standalone'` in `.next/standalone/`).
- **Process Manager:** `ecosystem.config.cjs` is already configured for PM2 clustering.
- **Verification:** Verified.

### 2.3 Database Connectivity (SQLite vs MySQL)
- **Current State:** SQLite (`file:./dev.db`).
- **Hostinger Constraint:** Hostinger Business Web Hosting runs multiple PHP/Node.js web workers. Under high traffic (NEET counseling and admissions deadlines), concurrent writes to SQLite will cause `SQLITE_BUSY: database is locked` timeouts.
- **Verdict:** Must migrate to Hostinger Cloud MySQL prior to accepting public admissions traffic.

### 2.4 File System Permissions
- **Paths Required:**
  - `public/uploads` (for CMS and gallery media)
  - `storage/private_documents` (for applicant marksheet and NEET scorecards)
- **Hostinger Requirement:** Must set permissions to `755` (`drwxr-xr-x`) via File Manager or SSH.

### 2.5 SMTP Email Delivery
- **Hostinger Titan Email:** Hostinger provides SMTP on `smtp.titan.email` (Port 465 SSL or 587 TLS).
- **Code Readiness:** `src/lib/email.ts` is fully compatible with Hostinger SMTP credentials.

---

## 3. GO / NO-GO PRODUCTION DECISION

### ⛔ CURRENT VERDICT: NO-GO FOR PUBLIC LAUNCH
The backend MUST NOT be deployed to production in its current state until the **Critical Security Fixes** (SEC-01, SEC-02, SEC-03, and SEC-04) are remediated. Deploying with the current hardcoded JWT fallback secret and public candidate data exposure exposes the institution to immediate data breach risks and regulatory non-compliance with the Digital Personal Data Protection (DPDP) Act.
