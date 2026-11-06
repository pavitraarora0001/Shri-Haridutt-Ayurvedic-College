# COMPREHENSIVE BACKEND ARCHITECTURE & SYSTEM AUDIT
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Date:** November 5, 2026  
**Auditor:** Senior Backend Architect & Application Security Auditor  
**Environment Audited:** Next.js 15.1.7 (App Router) · React 19 · Prisma 5.22.0 · SQLite / Hostinger Node.js  

---

## 1. EXECUTIVE SUMMARY

An exhaustive architectural and security audit of the backend infrastructure powering **Shri Haridutt Ayurvedic Medical College & Hospital** was conducted. The audit inspected the application architecture, folder hierarchy, REST APIs, authentication layers, Prisma ORM schema, role-based access control, and Hostinger deployment readiness.

### Key Audit Verdict
- **Architecture Maturity:** **Hybrid / Transitional (B-)**. The codebase contains a dual-layer implementation: a modern modular architecture (`src/modules/*` and `/api/v1/*`) existing alongside legacy unversioned routes (`/api/admin/*`, `/api/admissions/*`, `/api/auth/*`).
- **Authentication Robustness:** **Conditional (C+)**. Features HttpOnly cookies and bcrypt password hashing (10 salt rounds), but exhibits critical flaws including a hardcoded JWT fallback secret in source code, user enumeration, and absence of rate limiting on login.
- **Role-Based Access Control:** **Partially Implemented (C)**. While versioned routes (`/api/v1/*`) enforce role guards via `AuthService.hasRole()`, the legacy `/api/admin/*` routes currently utilized by the frontend dashboard loosely check binary flags (`user.type !== 'ADMIN'`), allowing horizontal privilege escalation across administrative roles.
- **Database & Data Integrity:** **Good (B+)**. Relational schema in Prisma is comprehensive with 33 models, foreign keys, cascades, and composite indexes. However, SQLite is currently configured in `schema.prisma`, which is unsuitable for concurrent production workloads on Hostinger.
- **Production Deployment Readiness:** **Action Required**. Several critical security vulnerabilities and configuration mismatches must be resolved prior to production launch on Hostinger Business Web Hosting.

---

## 2. BACKEND ARCHITECTURE & FOLDER STRUCTURE AUDIT

```
src/
├── app/
│   ├── admin/                  # Admin Dashboard UI
│   ├── api/
│   │   ├── admin/              # Legacy unversioned admin endpoints (Used by UI)
│   │   ├── admissions/         # Public application & document upload endpoints
│   │   ├── auth/               # Login & Logout endpoints
│   │   ├── disclosures/        # NCISM Disclosures public endpoint
│   │   ├── faculty/            # Faculty profile endpoint
│   │   ├── student/            # Student scholar profile endpoint
│   │   └── v1/                 # Modern REST API v1 (Enterprise Modular Architecture)
│   │       ├── admin/          # RBAC-guarded administrative endpoints
│   │       ├── admissions/     # Versioned admissions pipeline
│   │       ├── courses/        # Public academic courses
│   │       ├── faculty/        # Public faculty directory
│   │       ├── gallery/        # Media archives
│   │       └── ...             # Institutional APIs
├── components/                 # Frontend UI components
├── lib/                        # Shared utility layer (prisma.ts, auth.ts, email.ts)
└── modules/                    # Enterprise Service Layer
    ├── academics/
    ├── admissions/
    ├── audit/
    ├── auth/
    ├── cms/
    ├── faculty/
    ├── gallery/
    ├── research/
    └── users/
```

### 2.1 Dual Layer Architecture Finding
The audit revealed two distinct backend paradigms coexisting in the project:
1. **Legacy Unversioned API Routes (`/api/admin/*`, `/api/auth/*`)**:
   - Tightly coupled to simple helpers in `src/lib/auth.ts`.
   - Used directly by `src/app/admin/page.tsx` and login portals.
   - Suffers from missing authentication guards on GET handlers (`courses`, `faculty`, `notices`, `gallery`, `settings`).
   - Binary role checks (`user.type !== 'ADMIN'`) rather than granular RBAC.
2. **Modern Versioned API Routes (`/api/v1/*`)**:
   - Follows Service-Repository pattern under `src/modules/*`.
   - Utilizes `AuthService.hasRole()` with explicit role arrays (`SUPER_ADMIN`, `ADMIN`, etc.).
   - Includes pagination, structured JSON responses, and automatic audit logging via `AuditService`.
   - **Architectural Disconnect:** The frontend admin dashboard (`src/app/admin/page.tsx`) currently calls the unversioned `/api/admin/*` routes rather than the secure `/api/v1/*` services.

---

## 3. PRISMA ORM & DATABASE SCHEMA REVIEW

### 3.1 Datasource Configuration
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
- **SQLite Assessment:** SQLite operates on file-level locking. Under concurrent admissions registration and application document uploads, write operations are queued and may trigger `SQLITE_BUSY: database is locked` errors.
- **Hostinger Target:** Hostinger Business Web Hosting provides managed MySQL 8.0 instances. The schema must be prepared for seamless migration to MySQL.

### 3.2 Relational Model Analysis (33 Models)
- **RBAC Entities:** `User`, `Role`, `Permission`, `RolePermission`, `UserRole`. Well-structured many-to-many relationship supporting granular permission slugs (e.g. `admissions:approve`, `settings:manage`).
- **Admissions Pipeline:** `AdmissionApplication`, `ApplicationDocument`, `ApplicationStatusHistory`, `AdmissionEnquiry`. Properly configured with cascade deletes and indexes on `email`, `phone`, and `applicationNumber`.
- **Statutory Disclosures:** `DisclosureCategory`, `DisclosureRecord`, `DisclosureDocument`. Modeled with 1-to-16 category indexing and NCISM reference codes.
- **Audit & Governance:** `AuditLog` captures `action`, `entity`, `entityId`, `details`, and `performedBy` linked to `User`.
- **Missing Models Identified:**
  - No `HospitalStaff` or `Appointment` model (Hospital OPD/IPD appointment management is currently informational only).
  - No `PasswordResetToken` or `Session` model for server-side token management.

---

## 4. API VALIDATION & ERROR HANDLING AUDIT

| Aspect | Current Implementation | Audit Finding | Severity |
| :--- | :--- | :--- | :--- |
| **Request Validation** | Ad-hoc manual `if (!body.field)` checks | Lacks unified schema validation library (e.g. Zod). Malformed payloads may produce unhandled runtime errors. | Medium |
| **HTTP Method Filtering** | Next.js App Router route handlers (`GET`, `POST`, `PATCH`, `DELETE`) | Unimplemented methods automatically return 405 Method Not Allowed. | Pass |
| **Error Leakage** | `console.error(error)` + `NextResponse.json({ error: error.message })` | In development/production, raw error messages could potentially reveal database schema details. | Low |
| **User Enumeration** | Explicit error responses on invalid login | Returns `"User account not found or deactivated."` on `/api/auth/login`. Allows automated account discovery. | High |

---

## 5. FILE UPLOAD & STORAGE AUDIT

### 5.1 Public Media Uploads (`/api/admin/upload`)
- **Destination:** `public/uploads/`
- **MIME Whitelist:** `image/jpeg`, `image/png`, `image/webp`, `application/pdf`
- **Size Limit:** 5 MB
- **Filename Sanitization:** Generates cryptographically random UUID/hex strings (`media_${Date.now()}_${randomBytes}.ext`).
- **Security Guard:** Strictly requires `user.type === 'ADMIN'`.

### 5.2 Private Admission Documents (`/api/admissions/upload`)
- **Destination:** `storage/private_documents/` (Outside public web root)
- **Serving Route:** `/api/admin/documents/[id]` (Streams with `X-Content-Type-Options: nosniff` and `Content-Disposition: inline`).
- **Vulnerabilities Identified:**
  - The upload endpoint `/api/admissions/upload` is completely unauthenticated and has no rate limiting or CAPTCHA, making it vulnerable to automated storage exhaustion attacks.
  - Path traversal check: The serving route concatenates `document.storagePath` with the storage directory without explicit canonical path verification (`path.resolve`).

---

## 6. EMAIL NOTIFICATION SYSTEM AUDIT (`src/lib/email.ts`)
- **Engine:** `nodemailer` with SMTP transport.
- **Config:** Configured via `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
- **Failover / Fallback:** Graceful fallback logging when SMTP credentials are not configured, preventing unhandled promise rejections during applicant submissions.
- **Templates:** Includes institutional HTML email layouts for:
  - Admission application received confirmation.
  - Candidate status updates (Approved, Under Review, Documents Required).
  - General admission enquiries.

---

## 7. HOSTINGER PRODUCTION COMPATIBILITY AUDIT

1. **Node.js Runtime:** Hostinger Cloud / Business Hosting supports Node.js 18.x and 20.x via CloudLinux Passenger. The application builds cleanly with `output: 'standalone'`.
2. **Process Management:** `ecosystem.config.cjs` is already configured for PM2 clustering.
3. **Storage Volumes:** `storage/private_documents` and `public/uploads` must have appropriate directory permissions (`0755` / `0775`) on Hostinger's Linux filesystem.
4. **Prisma Engine:** When deploying to Hostinger Linux environments, `prisma generate` must compile with `binaryTargets = ["native", "debian-openssl-1.1.x", "debian-openssl-3.0.x"]`.
5. **Database Migration:** Hostinger remote MySQL connection requires switching `provider = "mysql"` in `schema.prisma`.
