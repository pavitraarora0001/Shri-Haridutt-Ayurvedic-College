# AUTHENTICATION & SESSION SECURITY AUDIT REPORT
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Standard:** OWASP ASVS v4.0.3 (Section V2 - Authentication & V3 - Session Management)  
**Date:** November 5, 2026  
**Auditor:** Senior Application Security & Authentication Engineer  

---

## 1. AUTHENTICATION ARCHITECTURE OVERVIEW

The website implements cookie-based JSON Web Token (JWT) authentication across three user segments:
1. **Administrative Staff & Officers** (Super Admin, Principal, Admission Officers, Content Managers)
2. **Ayurvedic Teaching Faculty** (Professors, Readers, Lecturers, Medical Officers)
3. **Student Scholars** (Enrolled BAMS Scholars)

Authentication entry points:
- `/admin/login` ➔ calls `POST /api/auth/login` (portalType: `ADMIN`)
- `/faculty-portal/login` ➔ calls `POST /api/auth/login` (portalType: `FACULTY`)
- `/student/login` ➔ calls `POST /api/auth/login` (portalType: `STUDENT`)
- Logout ➔ calls `POST /api/auth/logout`

---

## 2. DETAILED AUDIT FINDINGS

### Finding AUTH-01: Hardcoded JWT Fallback Secret in Source Code
- **Severity:** **CRITICAL**
- **Affected Files:**
  - [`src/lib/auth.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/lib/auth.ts#L4)
  - [`src/modules/auth/auth.service.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/modules/auth/auth.service.ts#L6)
- **Technical Explanation:**
  Both authentication modules define the JWT signature secret as:
  ```typescript
  const JWT_SECRET = process.env.JWT_SECRET || 'haridutt-ayurveda-jwt-secret-key-2026-production';
  ```
  If `JWT_SECRET` is omitted from the deployment environment or misconfigured in `.env`, the application silently defaults to the public string hardcoded in the repository.
- **Evidence:** Tested with `scripts/audit-security-test.mjs` Scenario 9. Any token signed with this static string is accepted as authentic.
- **Business Impact:** Complete institutional compromise. An external attacker can forge a valid JWT token with `role: "SUPER_ADMIN"`, grant themselves root administrative access, alter admission decisions, or extract private student records.
- **Remediation:** Remove the fallback string entirely. Throw a fatal initialization exception if `process.env.JWT_SECRET` is missing or shorter than 64 characters.

---

### Finding AUTH-02: Missing Rate Limiting & Brute-Force Protection
- **Severity:** **HIGH**
- **Affected Route:** `POST /api/auth/login` ([`src/app/api/auth/login/route.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/api/auth/login/route.ts))
- **Technical Explanation:**
  The login endpoint does not enforce IP-based or account-based rate limiting. While `AuthService` in `src/modules/auth/auth.service.ts` contains an in-memory `checkRateLimit()` method, `POST /api/auth/login` does not invoke it.
- **Evidence:** Tested with 15 rapid consecutive failed login attempts in Scenario 16. All 15 requests executed and returned HTTP 401 without receiving HTTP 429 Too Many Requests or account lockout.
- **Business Impact:** Susceptible to automated credential stuffing, dictionary attacks, and CPU exhaustion from repeated `bcrypt.compare()` hash computations.
- **Remediation:** Implement sliding-window rate limiting on `/api/auth/login` (maximum 5 failed attempts per 15 minutes per IP/identifier before enforcing temporary cooldown).

---

### Finding AUTH-03: User Account Enumeration via Detailed Error Messages
- **Severity:** **HIGH**
- **Affected Route:** `POST /api/auth/login`
- **Technical Explanation:**
  The login handler returns distinct error messages depending on whether an account exists:
  - If user email does not exist: returns `{ error: 'User account not found or deactivated.' }` (status 401)
  - If student ID does not exist: returns `{ error: 'Student record not found.' }` (status 401)
  - If password is wrong: returns `{ error: 'Incorrect email or password.' }` (status 401)
- **Evidence:** Scenario 3 returned `HTTP 401 ("User account not found or deactivated.")`.
- **Business Impact:** Malicious actors can systematically query lists of student IDs, faculty names, or email addresses to enumerate valid institutional accounts.
- **Remediation:** Standardize all invalid authentication responses to a uniform, generic message: `"Invalid institutional credentials."`

---

### Finding AUTH-04: Insecure Plaintext Password Comparison Fallback
- **Severity:** **HIGH**
- **Affected Route:** `POST /api/auth/login` (lines 30–33)
- **Technical Explanation:**
  ```typescript
  const isValid = await bcrypt.compare(password, student.password);
  if (!isValid && student.password !== password) {
    return NextResponse.json({ error: 'Invalid student credentials.' }, { status: 401 });
  }
  ```
  The condition `student.password !== password` allows students to authenticate if their password in the database is stored in raw plaintext rather than a bcrypt hash.
- **Business Impact:** Bypasses cryptographic hashing standards and encourages plaintext password storage.
- **Remediation:** Remove `&& student.password !== password`. Enforce bcrypt comparison exclusively.

---

### Finding AUTH-05: Stateless JWT with No Server-Side Session Revocation
- **Severity:** **MEDIUM**
- **Affected Route:** `POST /api/auth/logout` ([`src/app/api/auth/logout/route.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/api/auth/logout/route.ts))
- **Technical Explanation:**
  Logout merely sets `Max-Age: 0` on the client cookie. Because JWTs are stateless and expire after 7 days (`expiresIn: '7d'`), any captured or copied token remains valid against all protected APIs until the full 7-day expiration period lapses.
- **Business Impact:** Compromised tokens or tokens on shared institutional library terminals cannot be revoked server-side upon logout or password reset.
- **Remediation:** Introduce a database-backed session token or a lightweight Redis/SQLite token revocation table tracking invalidation timestamps.

---

### Finding AUTH-06: Missing Password Reset & Password Change Workflows
- **Severity:** **MEDIUM**
- **Affected Endpoints:** Missing `/api/auth/reset-password` and `/api/auth/change-password`
- **Technical Explanation:**
  Scenarios 13 and 14 returned HTTP 404. Neither students nor faculty have an automated self-service mechanism to change or reset their passwords.
- **Business Impact:** Stale passwords remain unchanged; users who suspect credential compromise must contact database administrators manually.
- **Remediation:** Implement secure password reset with cryptographically random one-time tokens (`crypto.randomBytes(32)`), 15-minute token TTL, and email dispatch.

---

## 3. SESSION COOKIE ATTRIBUTES AUDIT

| Attribute | Configured State | Audit Finding | Standard |
| :--- | :--- | :--- | :--- |
| **HttpOnly** | `true` | Prevents client-side JavaScript access via `document.cookie`. Protects against XSS token theft. | Pass |
| **Secure** | `process.env.NODE_ENV === 'production'` | Enabled in production HTTPS; disabled on local HTTP dev. | Pass |
| **SameSite** | `lax` | Protects against cross-site request forgery while permitting top-level navigation. | Pass |
| **Max-Age** | `604800` (7 Days) | 7 days is excessive for high-privilege administrative sessions. | Recommend 12 Hours for Admin, 7 Days for Students |
| **Path** | `/` | Cookie transmitted across entire domain. | Pass |
| **Domain** | Not explicitly set | Bound to host domain. | Pass |

---

## 4. SEEDED DEMO CREDENTIALS AUDIT
- **Risk:** High
- **Observation:** `prisma/seed.mjs` provisions demo accounts with known, predictable passwords for `SUPER_ADMIN`, `PRINCIPAL`, `ADMISSION_ADMIN`, `FACULTY`, and `STUDENT`.
- **Recommendation:** Immediately rotate all passwords in production, delete unused demo profiles, and ensure seed scripts require environment variables (`SEED_ADMIN_PASSWORD`) before executing in production.
