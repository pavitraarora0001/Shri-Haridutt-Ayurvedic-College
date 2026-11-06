# CRITICAL & HIGH VULNERABILITY ADVISORY REGISTER
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Classification:** Security Vulnerability Advisory  
**Date:** November 5, 2026  

---

## SUMMARY OF DISCOVERED VULNERABILITIES

| ID | Title | Severity | CWE | CVSS v3.1 | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **SEC-01** | Hardcoded JWT Fallback Secret in Source Code | **CRITICAL** | CWE-798 | **9.8** | Unfixed |
| **SEC-02** | Insecure Direct Object Reference (IDOR) & PII Exposure on Application Status | **CRITICAL** | CWE-639 / CWE-200 | **9.1** | Unfixed |
| **SEC-03** | Unauthenticated Public Access to Administrative Data Endpoints | **CRITICAL** | CWE-306 | **8.6** | Unfixed |
| **SEC-04** | Broken Function Level Authorization / Privilege Escalation in Admin Settings | **HIGH** | CWE-285 | **7.5** | Unfixed |
| **SEC-05** | Lack of Rate Limiting & Brute-Force Throttling on Authentication | **HIGH** | CWE-307 | **7.5** | Unfixed |
| **SEC-06** | User Account & Student Enumeration via Detailed Login Errors | **HIGH** | CWE-204 | **6.5** | Unfixed |
| **SEC-07** | Plaintext Password Comparison Fallback for Students | **HIGH** | CWE-256 | **7.0** | Unfixed |
| **SEC-08** | Unauthenticated Arbitrary File Upload Staging | **MEDIUM** | CWE-434 | **5.3** | Unfixed |
| **SEC-09** | Missing Server-Side Session Invalidation & Token Revocation | **MEDIUM** | CWE-613 | **5.3** | Unfixed |
| **SEC-10** | Missing Edge Route Protection Middleware (`middleware.ts`) | **MEDIUM** | CWE-284 | **5.3** | Unfixed |
| **SEC-11** | Missing HTTP Security Headers (CSP & HSTS) | **MEDIUM** | CWE-1021 | **4.8** | Unfixed |
| **SEC-12** | High Severity Component Vulnerability (`postcss <= 8.5.22`) | **MEDIUM** | CWE-22 | **5.5** | Unfixed |

---

## DETAILED VULNERABILITY DOSSIERS

### 🔴 SEC-01: Hardcoded JWT Fallback Secret in Source Code
- **CWE:** CWE-798 (Use of Hard-coded Credentials)
- **CVSS Score:** **9.8 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)**
- **Affected Files:**
  - `src/lib/auth.ts` (Line 4)
  - `src/modules/auth/auth.service.ts` (Line 6)
- **Code Extract:**
  ```typescript
  const JWT_SECRET = process.env.JWT_SECRET || 'haridutt-ayurveda-jwt-secret-key-2026-production';
  ```
- **Exploitation Scenario:**
  If an environment misconfiguration occurs on Hostinger where `JWT_SECRET` is not injected, the application defaults to this string. Any external attacker possessing this repository or guessing the string can sign arbitrary tokens with `{ role: "SUPER_ADMIN", type: "ADMIN" }` and gain permanent unrestricted root access.
- **Required Fix:** Remove fallback. Enforce strict server startup guard requiring `process.env.JWT_SECRET` with minimum 64 characters.

---

### 🔴 SEC-02: IDOR & Candidate PII Exposure on `/api/admissions/status`
- **CWE:** CWE-639 (Authorization Bypass Through User-Controlled Key)
- **CVSS Score:** **9.1 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N)**
- **Affected File:** `src/app/api/admissions/status/route.ts` (Lines 16–59)
- **Code Extract:**
  ```typescript
  const application = await prisma.admissionApplication.findFirst({
    where: {
      OR: [
        { applicationNumber: { equals: query } },
        { email: { equals: query.toLowerCase() } },
        { phone: { equals: query } },
      ],
    },
    ...
  ```
- **Exploitation Scenario:**
  An unauthenticated visitor can supply arbitrary phone numbers or scraped email addresses as `?q=...`. The endpoint returns candidate full name, course, caste reservation category, NEET score, NEET rank, marks percentage, status, and confidential administrative notes (`adminNotes`).
- **Required Fix:** Require combined verification (`applicationNumber` AND candidate `dob` or OTP verification), suppress internal `adminNotes` from public response, and mask phone/email.

---

### 🔴 SEC-03: Unauthenticated Public Access to Administrative Data Endpoints
- **CWE:** CWE-306 (Missing Authentication for Critical Function)
- **CVSS Score:** **8.6 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N)**
- **Affected Endpoints:**
  - `GET /api/admin/settings` ([`src/app/api/admin/settings/route.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/api/admin/settings/route.ts#L5))
  - `GET /api/admin/courses` ([`src/app/api/admin/courses/route.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/api/admin/courses/route.ts#L5))
  - `GET /api/admin/faculty` ([`src/app/api/admin/faculty/route.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/api/admin/faculty/route.ts#L5))
  - `GET /api/admin/notices` ([`src/app/api/admin/notices/route.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/api/admin/notices/route.ts#L5))
  - `GET /api/admin/gallery` ([`src/app/api/admin/gallery/route.ts`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/api/admin/gallery/route.ts#L5))
- **Technical Explanation:**
  While the POST/DELETE mutation handlers in these routes check `user.type === 'ADMIN'`, the `GET` functions contain no authentication check.
- **Evidence:** Verified in benchmark tests: all five administrative GET routes returned `HTTP 200 OK` to unauthenticated requests.
- **Required Fix:** Add session verification (`getCurrentUser()`) to every GET handler in `src/app/api/admin/*`.

---

### 🟠 SEC-04: Privilege Escalation in `/api/admin/settings`
- **CWE:** CWE-285 (Improper Authorization)
- **CVSS Score:** **7.5 (CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N)**
- **Affected File:** `src/app/api/admin/settings/route.ts` (Line 17)
- **Technical Explanation:**
  The endpoint verifies authorization using `if (!user || user.type !== 'ADMIN')`. Because any staff account other than `FACULTY` receives `type: 'ADMIN'` during login, an Admission Officer or Content Editor can POST arbitrary configuration data to `/api/admin/settings` and overwrite site-wide settings.
- **Evidence:** Tested in Scenario 12: Admission Officer account successfully modified settings via `/api/admin/settings` (HTTP 200).
- **Required Fix:** Enforce `user.role === 'SUPER_ADMIN'` on `/api/admin/settings`.
