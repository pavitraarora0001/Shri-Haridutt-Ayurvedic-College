# API SECURITY AUDIT & ENDPOINT END-TO-END INVENTORY
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Standard:** OWASP API Security Top 10 (2023)  
**Date:** November 5, 2026  

---

## 1. ENDPOINT INVENTORY & SECURITY CONTROLS

### Group A: Authentication & Session APIs
| Route | Methods | Auth Required | Role / Guard | Security Finding |
| :--- | :--- | :---: | :---: | :--- |
| `/api/auth/login` | POST | No | Public | **Vulnerable**: No rate limit; user enumeration. |
| `/api/auth/logout` | POST | No | Public | Sets Max-Age=0; no server token revocation. |

---

### Group B: Administrative Endpoints (Unversioned - Used by UI)
| Route | Methods | Auth Required | Role / Guard | Security Finding |
| :--- | :--- | :---: | :---: | :--- |
| `/api/admin/overview` | GET | Yes | `user.type === 'ADMIN'` | Protected correctly against non-admins. |
| `/api/admin/applications` | GET, PATCH | Yes | `user.type === 'ADMIN'` | Loose check; any admin can change admissions. |
| `/api/admin/enquiries` | GET, PATCH, DELETE | Yes | `user.type === 'ADMIN'` | Protected. |
| `/api/admin/courses` | GET, POST, PUT, DELETE | Partial | GET is Public; POST/PUT/DELETE checks `type === 'ADMIN'` | **Vulnerable**: GET exposes course management metadata without auth. |
| `/api/admin/faculty` | GET, POST, PUT, DELETE | Partial | GET is Public; POST/PUT/DELETE checks `type === 'ADMIN'` | **Vulnerable**: GET is unauthenticated. |
| `/api/admin/notices` | GET, POST, DELETE | Partial | GET is Public; POST checks `role !== 'STUDENT'` | **Vulnerable**: Any non-student (including faculty) can create notices. |
| `/api/admin/gallery` | GET, POST, DELETE | Partial | GET is Public; POST/DELETE checks `type === 'ADMIN'` | **Vulnerable**: GET is unauthenticated. |
| `/api/admin/research` | GET, POST, DELETE | Partial | GET is Public; POST/DELETE checks `type === 'ADMIN'` | **Vulnerable**: GET is unauthenticated. |
| `/api/admin/settings` | GET, POST | Partial | GET is Public; POST checks `type === 'ADMIN'` | **Critical**: GET is unauthenticated; POST allows privilege escalation. |
| `/api/admin/upload` | POST | Yes | `user.type === 'ADMIN'` | Protected with MIME and 5MB validation. |
| `/api/admin/documents/[id]` | GET | Yes | `user.type === 'ADMIN'` | Protected; path traversal risk if storagePath manipulated. |
| `/api/admin/disclosures` | GET, POST | Yes | `user.type === 'ADMIN'` | Protected. |

---

### Group C: Enterprise Versioned APIs (`/api/v1/...`)
| Route | Methods | Auth Required | Role / Guard | Security Finding |
| :--- | :--- | :---: | :---: | :--- |
| `/api/v1/admin/overview` | GET | Yes | `['SUPER_ADMIN', 'ADMIN', ...]` | Proper RBAC. |
| `/api/v1/admin/users` | GET, POST | Yes | GET: `['SUPER_ADMIN', 'ADMIN']`<br>POST: `['SUPER_ADMIN']` | Robust privilege separation. |
| `/api/v1/admin/users/[id]` | GET, PATCH, DELETE | Yes | `['SUPER_ADMIN']` | Robust privilege separation. |
| `/api/v1/admin/settings` | GET, PATCH | Yes | `['SUPER_ADMIN', 'ADMIN']` | Proper RBAC guard (403 on Admission Officers). |
| `/api/v1/admin/admissions` | GET | Yes | `['SUPER_ADMIN', 'ADMISSION_ADMIN', ...]` | Proper RBAC. |
| `/api/v1/admin/courses` | GET, POST | Yes (POST) | `['SUPER_ADMIN', 'ACADEMIC_ADMIN', ...]` | Proper RBAC. |
| `/api/v1/admin/news` | GET, POST | Yes (POST) | `['SUPER_ADMIN', 'CONTENT_MANAGER', ...]` | Proper RBAC. |
| `/api/v1/admin/notices` | GET, POST | Yes (POST) | `['SUPER_ADMIN', 'PRINCIPAL', 'ADMIN']` | Proper RBAC. |

---

### Group D: Public Student & Applicant APIs
| Route | Methods | Auth Required | Role / Guard | Security Finding |
| :--- | :--- | :---: | :---: | :--- |
| `/api/admissions/apply` | POST | No | Public | Validates required fields; dispatches email. |
| `/api/admissions/upload` | POST | No | Public | **Vulnerable**: Unauthenticated upload without rate limit. |
| `/api/admissions/status` | GET | No | Public | **Critical**: IDOR & PII leakage on candidate query. |
| `/api/student/profile` | GET | Yes | `role === 'STUDENT'` | Properly bound to session user ID. |
| `/api/faculty/profile` | GET | Yes | `role === 'FACULTY' \|\| type === 'ADMIN'` | Bound to session email. |
| `/api/contact` | POST | No | Public | Stores contact message in database. |
| `/api/disclosures` | GET | No | Public | Public statutory data. |

---

## 2. OWASP API SECURITY TOP 10 (2023) ASSESSMENT

| OWASP Risk | Category | Project Status | Explanation |
| :--- | :--- | :---: | :--- |
| **API1:2023** | Broken Object Level Authorization (BOLA / IDOR) | **VULNERABLE** | `/api/admissions/status` returns full student dossier and NEET scores with just email or phone. |
| **API2:2023** | Broken Authentication | **VULNERABLE** | Hardcoded JWT fallback secret in code; missing rate limiting on `/api/auth/login`. |
| **API3:2023** | Broken Object Property Level Authorization | **VULNERABLE** | Status endpoint exposes admin internal notes (`adminNotes`) to unauthenticated callers. |
| **API4:2023** | Unrestricted Resource Consumption | **VULNERABLE** | No rate limiting on `/api/auth/login` and `/api/admissions/upload`. |
| **API5:2023** | Broken Function Level Authorization (BFLA) | **VULNERABLE** | `/api/admin/settings` permits non-superadmins to overwrite website settings. |
| **API6:2023** | Unrestricted Access to Sensitive Business Flows | **VULNERABLE** | `/api/admissions/upload` allows automated bot scripts to dump files into disk storage. |
| **API7:2023** | Server Side Request Forgery (SSRF) | **SAFE** | No user-controlled URLs are fetched server-side. |
| **API8:2023** | Security Misconfiguration | **VULNERABLE** | Missing CSP and HSTS headers; unauthenticated GET handlers on `/api/admin/*`. |
| **API9:2023** | Improper Inventory Management | **VULNERABLE** | Dual endpoints (unversioned vs versioned v1) create shadow API paths. |
| **API10:2023**| Unsafe Consumption of APIs | **SAFE** | External API consumption is limited to Nodemailer SMTP and static assets. |
