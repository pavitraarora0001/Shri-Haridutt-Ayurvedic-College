# BACKEND ARCHITECTURE SPECIFICATION
## Shri Haridutt Ayurvedic Medical College & Hospital
### Production-Grade Institutional Backend System

---

## 1. ARCHITECTURAL OVERVIEW

The Shri Haridutt Ayurvedic Medical College & Hospital platform is architected as an institutional-grade, modular, API-first system designed for high reliability, strict academic compliance (NCISM & Ministry of AYUSH), and seamless operations on **Hostinger Business Web Hosting**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (PRESENTATION)                     │
│  Public Portal  │  Admin CMS Portal  │  Student Portal │ Faculty Portal │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / REST JSON
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        EDGE / SECURITY GATEWAY                         │
│  - Security Headers (HSTS, X-Frame, CSP, Referrer-Policy)             │
│  - Rate Limiting (In-Memory IP Bucket + DB Attempt Throttle)           │
│  - HttpOnly Cookie & Bearer JWT Dual Token Validator                  │
│  - Error Sanitization & Audit Interceptor                             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   API ROUTER (/api/v1/ & /api/)                        │
│  /api/v1/health          /api/v1/auth/*         /api/v1/admin/*       │
│  /api/v1/courses         /api/v1/admissions/*   /api/v1/student/*     │
│  /api/v1/departments     /api/v1/faculty/*      /api/v1/cms/*         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MODULAR SERVICE LAYER                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │ AuthModule   │ │ AdmissionMod │ │ AcademicMod  │ │ CmsModule    │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │ EmailModule  │ │ FileStorage  │ │ AuditLogMod  │ │ StudentMod   │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      PERSISTENCE & DATA ACCESS                         │
│                     Prisma ORM (v5.22.0)                               │
│  Dual-Dialect Compatibility: SQLite (Dev/Staging) ⟷ MySQL 8.x (Prod)  │
│  Encrypted Private Dossier Storage (storage/private_documents/)        │
│  Public Assets Storage (public/uploads/)                               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. MODULAR DIRECTORY LAYOUT

```
src/
├── modules/
│   ├── auth/                     # Authentication, Passwords, JWT, RBAC guards
│   ├── users/                    # System accounts, roles & permissions
│   ├── admissions/               # Application workflow, status engine, dossier
│   ├── academics/                # Courses, 14 departments, curricula
│   ├── faculty/                  # Faculty directory, clinical designations
│   ├── students/                 # Scholar portal, records, notices
│   ├── cms/                      # Pages, banners, notices, news, events
│   ├── gallery/                  # Photo & video asset catalog
│   ├── research/                 # Publications, clinical trials, citations
│   ├── notifications/            # Nodemailer SMTP engine, delivery logs
│   ├── files/                    # Secure upload engine, MIME & size guards
│   └── audit/                    # Institutional event logging & audit trail
├── app/
│   └── api/
│       └── v1/                   # Normalized OpenAPI REST API endpoints
│           ├── health/           # System status & database ping
│           ├── docs/             # Swagger OpenAPI 3.0 specification
│           ├── auth/             # Login, logout, session verification
│           ├── institution/      # Heritage, leadership, vision-mission
│           ├── courses/          # Degree programs & syllabi
│           ├── departments/      # 14 Ayurvedic departmental units
│           ├── faculty/          # Profiles & academic publications
│           ├── admissions/       # Enquiries, applications, tracking
│           ├── news/             # Press releases & institutional news
│           ├── notices/          # Official circulars & downloads
│           ├── events/           # Medical camps, conferences, seminars
│           ├── gallery/          # Categorized visual archives
│           ├── research/         # Peer-reviewed journal publications
│           ├── contact/          # Directorate inquiry inbox
│           ├── settings/         # Public metadata & announcements
│           ├── student/          # Private scholar portal APIs
│           ├── faculty-portal/   # Private doctor portal APIs
│           └── admin/            # Protected management endpoints
└── lib/
    ├── auth.ts                   # Token signing & session extraction
    ├── rbac.ts                   # Role & permission matrix
    ├── prisma.ts                 # Singleton Prisma client instance
    ├── email.ts                  # Production SMTP mailer
    └── validation.ts             # Input sanitization and validators
```

---

## 3. CORE SYSTEM PRINCIPLES

1. **Vedic Academic Integrity**: Preserves authentic Sanskrit nomenclatures, NCISM curriculum benchmarks, and institutional authenticity.
2. **Layered Decoupling**: HTTP handlers never execute direct raw database calls; logic is encapsulated in modular reusable service classes.
3. **Defense in Depth**:
   - Zero-trust RBAC at both middleware and service level.
   - Private document isolation: Student KYC and NEET scorecards are never placed in public web roots.
   - Passwords hashed using standard salted bcrypt (10 rounds).
4. **Resilient Production Dual-Driver**:
   - Out-of-the-box local development and automated CI testing run on SQLite.
   - Hostinger deployment seamlessly binds to Hostinger MySQL via a single environment variable change.
