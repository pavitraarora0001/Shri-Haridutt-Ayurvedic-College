# FUNCTIONAL & SECURITY TEST EXECUTION RESULTS
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Test Suite Script:** [`scripts/audit-security-test.mjs`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/scripts/audit-security-test.mjs)  
**Execution Environment:** Node.js v24.14.1 · Next.js 15.1.7 on `http://localhost:3000`  
**Execution Timestamp:** November 5, 2026  

---

## 1. CONTROLLED SCENARIO TEST MATRIX

| # | Test Scenario | Target Endpoint | Expected Outcome | Actual Result | Status | Technical Details |
| :-: | :--- | :--- | :--- | :--- | :-: | :--- |
| **1** | Valid Super Admin Login | `POST /api/auth/login` | HTTP 200 + Cookie | HTTP 200 | ✅ **PASS** | Sets `auth_token` cookie with `HttpOnly: true` and `SameSite: lax`. |
| **2** | Invalid Password | `POST /api/auth/login` | HTTP 401 | HTTP 401 | ✅ **PASS** | Returns `{ error: "Incorrect email or password." }`. |
| **3** | Non-existent Account Check | `POST /api/auth/login` | Generic HTTP 401 | HTTP 401 | ❌ **FAIL** | Returns `{ error: "User account not found or deactivated." }` (User Enumeration). |
| **4** | Inactive Account Handling | `POST /api/auth/login` | HTTP 401 | HTTP 401 | ✅ **PASS** | `if (!user \|\| !user.isActive)` blocks deactivated users. |
| **5** | Session Logout | `POST /api/auth/logout` | HTTP 200 + Cookie clear | HTTP 200 | ✅ **PASS** | Returns `auth_token` with `Max-Age: 0`. |
| **6** | Expired Session Token | `GET /api/admin/overview` | HTTP 401 | HTTP 401 | ✅ **PASS** | `jwt.verify` rejects expired timestamp and returns 401. |
| **7** | Access Without Login | `GET /api/admin/overview` | HTTP 401 | HTTP 401 | ✅ **PASS** | Blocks request when cookie is absent. |
| **8** | Access With Corrupted Token | `GET /api/admin/overview` | HTTP 401 | HTTP 401 | ✅ **PASS** | Blocks malformed JWT strings. |
| **9** | Rogue-Signed JWT Token | `GET /api/admin/overview` | HTTP 401 | HTTP 401 | ✅ **PASS** | Signature verification rejects tokens signed with arbitrary third-party secret. |
| **10**| Student Accessing Admin Overview | `GET /api/admin/overview` | HTTP 401/403 | HTTP 401 | ✅ **PASS** | Student token rejected by admin check. |
| **11**| Faculty Accessing Users API | `GET /api/v1/admin/users` | HTTP 403 | HTTP 403 | ✅ **PASS** | `AuthService.hasRole()` correctly enforces `['SUPER_ADMIN', 'ADMIN']`. |
| **12**| Admission Officer Updating Settings | `POST /api/admin/settings`<br>`GET /api/v1/admin/settings` | HTTP 403 on both | v1: HTTP 403<br>Unversioned: HTTP 200 | ❌ **FAIL** | **Privilege Escalation**: Legacy `/api/admin/settings` accepts changes because it only checks `type === 'ADMIN'`. |
| **13**| Password Reset Workflow | `POST /api/auth/reset-password` | Implemented (Not 404) | HTTP 404 | ❌ **FAIL** | Endpoint missing. |
| **14**| Password Change Workflow | `POST /api/auth/change-password` | Implemented (Not 404) | HTTP 404 | ❌ **FAIL** | Endpoint missing. |
| **15**| Unauthenticated Document Access | `GET /api/admin/documents/[id]` | HTTP 401/403 | HTTP 403 | ✅ **PASS** | Unauthenticated callers cannot stream private admission documents. |
| **16**| Brute-Force Rate Limiting | `POST /api/auth/login` (15 rapid attempts) | HTTP 429 after threshold | All 15 returned HTTP 401 | ❌ **FAIL** | **No Rate Limiting**: All 15 failed logins processed without throttling. |
| **17**| Server-Side Session Invalidation | Revocation Check | Revocation table | Stateless JWT | ❌ **FAIL** | JWT remains valid for 7 days even if user logs out or is modified. |

---

## 2. PUBLIC ADMINISTRATIVE GET HANDLERS TEST

| Endpoint | Intended Access Level | Actual Response Code | Status | Finding |
| :--- | :---: | :---: | :-: | :--- |
| `GET /api/admin/courses` | Administrative | **HTTP 200** | ❌ **FAIL** | Completely unauthenticated; exposes internal course registry. |
| `GET /api/admin/faculty` | Administrative | **HTTP 200** | ❌ **FAIL** | Completely unauthenticated. |
| `GET /api/admin/notices` | Administrative | **HTTP 200** | ❌ **FAIL** | Completely unauthenticated; exposes unpinned/internal circulars. |
| `GET /api/admin/gallery` | Administrative | **HTTP 200** | ❌ **FAIL** | Completely unauthenticated. |
| `GET /api/admin/settings`| Administrative | **HTTP 200** | ❌ **FAIL** | Completely unauthenticated; leaks website configuration keys. |

---

## 3. BENCHMARK & LATENCY PERFORMANCE TEST RESULTS

| Endpoint | Cold Startup (ms) | Warm Latency (ms) | Database Queries | Concurrency Rating |
| :--- | :---: | :---: | :---: | :---: |
| `/api/health` | 1,158 ms | **170 ms** | 1 (`$queryRaw SELECT 1`) | High |
| `/api/disclosures` | 1,007 ms | **93 ms** | 1 (`findMany` with 16 nested categories) | High |
| `/api/v1/courses` | 1,076 ms | **86 ms** | 1 (`course.findMany`) | High |
| `/api/admin/overview` | 131 ms | **108 ms** | 12 parallel `Promise.all` count/find queries | Moderate |
| `/api/v1/admin/overview` | 949 ms | **66 ms** | 10 parallel queries + audit logs | High |
