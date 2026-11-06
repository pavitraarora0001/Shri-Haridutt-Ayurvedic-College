# OWASP TOP 10 (2021) & ASVS COMPREHENSIVE SECURITY CHECKLIST
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Standard:** OWASP Top 10 Web Application Vulnerabilities (2021)  
**Date:** November 5, 2026  

---

| OWASP Vulnerability Category | Status | Finding Summary | Severity |
| :--- | :---: | :--- | :---: |
| **A01:2021 – Broken Access Control** | ❌ **FAIL** | - `/api/admissions/status` exposes sensitive candidate PII with no auth.<br>- `/api/admin/settings` allows non-superadmins to update configuration.<br>- `/api/admin/courses`, `/api/admin/faculty`, `/api/admin/notices`, `/api/admin/gallery`, `/api/admin/settings` allow unauthenticated GET. | **CRITICAL** |
| **A02:2021 – Cryptographic Failures** | ❌ **FAIL** | - Hardcoded JWT fallback secret in `src/lib/auth.ts` and `src/modules/auth/auth.service.ts`.<br>- Plaintext fallback in student password validation (`student.password !== password`).<br>- Missing HSTS (`Strict-Transport-Security`) header. | **CRITICAL** |
| **A03:2021 – Injection** | ✅ **PASS** | - All database queries are executed via parameterized Prisma ORM.<br>- Zero unsafe raw SQL queries detected.<br>- Command injection: No user input passed to child processes. | **LOW / PASS** |
| **A04:2021 – Insecure Design** | ❌ **FAIL** | - No rate limiting or brute force protection on `/api/auth/login`.<br>- No password reset / self-service recovery mechanism (404).<br>- Unauthenticated file upload endpoint `/api/admissions/upload` without CAPTCHA. | **HIGH** |
| **A05:2021 – Security Misconfiguration** | ❌ **FAIL** | - Missing `Content-Security-Policy` (CSP) in `next.config.mjs`.<br>- Missing Next.js `middleware.ts` for Edge route protection.<br>- Default seed passwords provisioned in database. | **HIGH** |
| **A06:2021 – Vulnerable and Outdated Components** | ⚠️ **WARN** | - `npm audit` flagged high severity PostCSS advisory (arbitrary file read via source maps in `postcss <= 8.5.22`). | **MEDIUM** |
| **A07:2021 – Identification and Authentication Failures** | ❌ **FAIL** | - User account enumeration on `/api/auth/login` (reveals user existence).<br>- Stateless 7-day JWT tokens without server-side invalidation/revocation on logout. | **HIGH** |
| **A08:2021 – Software and Data Integrity Failures** | ✅ **PASS** | - Standalone build configured cleanly with package lock verification.<br>- Private documents stored outside public root with random UUID names. | **PASS** |
| **A09:2021 – Security Logging and Monitoring Failures** | ⚠️ **WARN** | - `AuditLog` records administrative modifications (`CREATE_FACULTY`, `UPDATE_STATUS`), but fails to log failed login attempts, authentication anomalies, or security-sensitive configuration reads. | **MEDIUM** |
| **A10:2021 – Server-Side Request Forgery (SSRF)** | ✅ **PASS** | - Application does not fetch arbitrary external URLs based on user input.<br>- Image domains strictly whitelisted in `next.config.mjs`. | **PASS** |

---

## OWASP ASVS v4.0.3 SECTION AUDIT SUMMARY

- **V1 Architecture, Design and Threat Modeling:** 60% Compliant (Dual-layer architecture creates split security surfaces).
- **V2 Authentication Verification:** 55% Compliant (Fails brute-force lockout, user enumeration, fallback secret).
- **V3 Session Management Verification:** 70% Compliant (HttpOnly and SameSite cookies configured, fails server-side revocation).
- **V4 Access Control Verification:** 45% Compliant (IDOR in candidate status, loose administrative guards in unversioned endpoints).
- **V5 Validation, Sanitization and Encoding:** 80% Compliant (MIME type checks on uploads, no SQLi).
- **V14 Configuration Verification:** 65% Compliant (Missing CSP and HSTS).
