# SYSTEMATIC BACKEND REMEDIATION PLAN & RECOMMENDED FIXES
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Remediation Phase:** Phase 11  
**Date:** November 5, 2026  

---

## 1. PRIORITIZED REMEDIATION ROADMAP

```
+---------------------------------------------------------------------------------+
| TIER 1: CRITICAL (IMMEDIATE DEPLOYMENT BLOCKERS — FIX BEFORE PRODUCTION)        |
+---------------------------------------------------------------------------------+
  1. Remove Hardcoded JWT Fallback Secret (SEC-01)
  2. Remediate IDOR & PII Leakage in Admissions Status Endpoint (SEC-02)
  3. Enforce Authentication on All Administrative GET Endpoints (SEC-03)
  4. Fix Privilege Escalation in Administrative Settings & Notices (SEC-04)
  5. Enforce Rate Limiting & Account Lockout on /api/auth/login (SEC-05)
  6. Standardize Generic Authentication Error Responses (SEC-06)
  7. Remove Plaintext Student Password Fallback (SEC-07)

+---------------------------------------------------------------------------------+
| TIER 2: HIGH & MEDIUM (SYSTEM SECURITY HARDENING — NEXT RELEASE SPRINT)         |
+---------------------------------------------------------------------------------+
  8. Implement Edge Route Protection via Next.js middleware.ts (SEC-10)
  9. Add Missing Security Headers: CSP and HSTS in next.config.mjs (SEC-11)
  10. Implement Password Reset & Change Workflow Endpoints (SEC-09)
  11. Add Rate Limiting to Public Document Uploads /api/admissions/upload (SEC-08)
  12. Upgrade Vulnerable PostCSS Dependency via npm audit (SEC-12)

+---------------------------------------------------------------------------------+
| TIER 3: INFRASTRUCTURE & ARCHITECTURAL ENHANCEMENTS                             |
+---------------------------------------------------------------------------------+
  13. Transition Database Datasource from SQLite to MySQL for Hostinger (SEC-14)
  14. Unify Frontend Admin Dashboard to Call Modular /api/v1/* Endpoints
  15. Rotate Demo Passwords and Remove Seed Accounts in Production (SEC-15)
```

---

## 2. CODE REMEDIATION SPECIFICATIONS

### Fix 1: Eliminate Hardcoded JWT Secret (`src/lib/auth.ts` & `src/modules/auth/auth.service.ts`)
```typescript
// Replace:
const JWT_SECRET = process.env.JWT_SECRET || 'haridutt-ayurveda-jwt-secret-key-2026-production';

// With:
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('FATAL SECURITY ERROR: JWT_SECRET environment variable is mandatory in production.');
}
const ACTIVE_JWT_SECRET = JWT_SECRET || 'dev-only-local-secret-do-not-use-in-production';
```

---

### Fix 2: Secure Public Admission Status Lookup (`src/app/api/admissions/status/route.ts`)
```typescript
// Replace open OR query with Dual-Factor Verification:
const applicationNumber = searchParams.get('appNo')?.trim();
const dob = searchParams.get('dob')?.trim(); // DD-MM-YYYY

if (!applicationNumber || !dob) {
  return NextResponse.json(
    { error: 'Both Application Reference Number and Date of Birth are required for verification.' },
    { status: 400 }
  );
}

const application = await prisma.admissionApplication.findFirst({
  where: {
    applicationNumber,
    dob,
  },
  select: {
    applicationNumber: true,
    fullName: true,
    courseCode: true,
    status: true,
    createdAt: true,
    // NEVER expose adminNotes, caste category, or raw marks to unauthenticated public API!
  }
});
```

---

### Fix 3: Enforce Authentication on Administrative GET Handlers (`src/app/api/admin/*`)
Add session guard to:
- `src/app/api/admin/courses/route.ts`
- `src/app/api/admin/faculty/route.ts`
- `src/app/api/admin/notices/route.ts`
- `src/app/api/admin/gallery/route.ts`
- `src/app/api/admin/settings/route.ts`

```typescript
export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
  }
  // ... execute query
}
```

---

### Fix 4: Implement Edge Route Middleware (`src/middleware.ts`)
Create `src/middleware.ts` to intercept unauthorized browser requests before rendering:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const path = request.nextUrl.pathname;

  // Protect /admin dashboard routes
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect /student/dashboard routes
  if (path.startsWith('/student') && !path.startsWith('/student/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/student/login', request.url));
    }
  }

  // Protect /faculty-portal/dashboard routes
  if (path.startsWith('/faculty-portal') && !path.startsWith('/faculty-portal/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/faculty-portal/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/student/:path*', '/faculty-portal/:path*'],
};
```

---

### Fix 5: Add Strict Security Headers (`next.config.mjs`)
Add HSTS and CSP headers:
```javascript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload'
},
{
  key: 'X-XSS-Protection',
  value: '1; mode=block'
}
```

---

## 3. PROPOSED NEXT STEPS & APPROVAL REQUEST

Per the strict instructions in the Master Prompt:
> *"AUDIT FIRST. PROVIDE EVIDENCE. IDENTIFY RISKS. WAIT FOR APPROVAL BEFORE MAJOR CHANGES. You may fix isolated, clearly understood non-destructive issues only when they do not alter existing business logic or production data. Document every modification."*

The complete audit and empirical testing are finished, and all 10 reports have been documented in the repository. We await user authorization to apply the Tier 1 security remediations.
