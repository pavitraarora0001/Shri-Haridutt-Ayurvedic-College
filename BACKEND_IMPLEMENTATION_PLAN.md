# BACKEND IMPLEMENTATION & EXECUTION PLAN
## Shri Haridutt Ayurvedic Medical College & Hospital

---

## 1. PHASED EXECUTION ROADMAP

```
[Phase 1] Schema & Data Modeling (30 Entities, Prisma, DB Push, Seed)
   │
   ▼
[Phase 2] Modular Service Engine (src/modules/ for Auth, Admissions, CMS, etc.)
   │
   ▼
[Phase 3] Public REST API Suite (/api/v1/ public endpoints)
   │
   ▼
[Phase 4] Admin & Governance REST APIs (/api/v1/admin/* protected endpoints)
   │
   ▼
[Phase 5] OpenAPI 3.0 / Swagger Specification (/api/v1/docs & swagger.json)
   │
   ▼
[Phase 6] Automated System Integration & Security Test Suite
   │
   ▼
[Phase 7] Hostinger Packaging & Verification Reports
```

---

## 2. DETAILED ACTION ITEMS

### Step 1: Database Schema Expansion
- Update `prisma/schema.prisma` with all 30 normalized entities.
- Execute `npx prisma db push` to generate the new tables and indexes.
- Expand `prisma/seed.mjs` to populate:
  - Default RBAC Roles & Permissions.
  - Academic Calendar entries.
  - Student study resources.
  - Initial dynamic CMS pages & settings.
- Run `npm run prisma:seed`.

### Step 2: Modular Architecture Layer
- Create `src/modules/`:
  - `auth/`: Authentication service, RBAC validator, permission matrix.
  - `admissions/`: Admission processing, duplicate prevention, status transitions.
  - `academics/`: Course and department directory queries.
  - `cms/`: Pages, settings, notices, news, and events.
  - `files/`: File validation, private vs. public asset router.
  - `notifications/`: SMTP dispatcher, template renderer, notification logger.
  - `audit/`: Institutional audit trail logger.

### Step 3: Implement Public REST APIs (`/api/v1/*`)
- Health ping: `GET /api/v1/health`
- Academic endpoints:
  - `GET /api/v1/institution`, `/api/v1/institution/leadership`, `/api/v1/institution/vision-mission`
  - `GET /api/v1/courses`, `GET /api/v1/courses/[slug]`
  - `GET /api/v1/departments`, `GET /api/v1/departments/[slug]`
  - `GET /api/v1/faculty`, `GET /api/v1/faculty/[slug]`
- Admissions:
  - `GET /api/v1/admissions/information`, `/eligibility`, `/fees`
  - `POST /api/v1/admissions/enquiries`
  - `POST /api/v1/admissions/applications`
- Media & Communications:
  - `GET /api/v1/news`, `/api/v1/news/[slug]`
  - `GET /api/v1/notices`, `/api/v1/notices/[slug]`
  - `GET /api/v1/events`, `/api/v1/events/[slug]`
  - `GET /api/v1/gallery`, `/api/v1/gallery/categories`
  - `GET /api/v1/research`, `/api/v1/research/[slug]`
  - `POST /api/v1/contact`
  - `GET /api/v1/settings/public`

### Step 4: Implement Protected Admin REST APIs (`/api/v1/admin/*`)
- User management: `GET`, `POST`, `PATCH`, `DELETE /api/v1/admin/users`
- Courses & Faculty management: CRUD endpoints
- Admissions management: Status updater, notes, report export
- Notices & Content management: CRUD endpoints
- Settings management: Read/Write system key-values

### Step 5: Interactive OpenAPI / Swagger Documentation
- Implement `GET /api/v1/docs` delivering clean HTML with Swagger UI or interactive OpenAPI explorer.
- Generate `public/swagger.json` with complete request/response schemas.

### Step 6: Testing & Quality Assurance
- Automated E2E verification script (`scripts/backend-e2e-test.mjs`).
- Verify rate limiting, role guards, invalid inputs, SQL injection protection, and transaction rollbacks.
- Confirm full production build (`npm run build`).

### Step 7: Final Hostinger Documentation
- Generate all remaining reports requested in Part 17 and Part 19.
