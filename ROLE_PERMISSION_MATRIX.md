# ROLE-BASED ACCESS CONTROL (RBAC) AUDIT & PERMISSION MATRIX
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Standard:** NIST SP 800-162 / Principle of Least Privilege  
**Date:** November 5, 2026  

---

## 1. EXISTING ROLE MODEL IN CODEBASE

The application defines roles across two schemas:

### A. Core Schema (`User.role` in `prisma/schema.prisma`)
The primary `User` model currently uses the following enum string values:
1. `SUPER_ADMIN` – Full root administrative control.
2. `PRINCIPAL` – Institutional leadership, notices, academic approvals.
3. `ADMISSION_ADMIN` – Scrutiny of NEET scores, application document verification.
4. `ACADEMIC_ADMIN` – Curriculum, course syllabi, departmental oversight.
5. `CONTENT_MANAGER` – Website CMS, news, events, gallery curation.
6. `FACULTY` – Teaching directory, clinical schedules, academic notices.
7. `STUDENT` – Scholar portal, marksheet review, personal profile.

### B. Dynamic RBAC Models (`Role`, `Permission`, `RolePermission`, `UserRole`)
The schema contains granular tables for enterprise permission mappings:
- `admissions:view`, `admissions:approve`, `admissions:export`
- `courses:create`, `courses:edit`, `courses:delete`
- `users:create`, `users:manage_roles`
- `settings:edit`, `audit:view`

---

## 2. PRIVILEGE ENFORCEMENT AUDIT: VERSIONED VS UNVERSIONED ROUTES

An evaluation was performed comparing how permissions are actually checked across endpoints:

| Endpoint | Versioned (`/api/v1/...`) | Legacy Unversioned (`/api/admin/...`) | Observed Vulnerability in Legacy |
| :--- | :--- | :--- | :--- |
| **User Provisioning** | Requires `SUPER_ADMIN` only | N/A (Not present in unversioned) | None |
| **Site Settings** | Requires `['SUPER_ADMIN', 'ADMIN']` | Checks only `user.type !== 'ADMIN'` | **Privilege Escalation:** Any user with `ADMISSION_ADMIN` or `CONTENT_MANAGER` can modify core site settings. |
| **Admission Applications** | Requires `['SUPER_ADMIN', 'ADMISSION_ADMIN', 'PRINCIPAL']` | Checks only `user.type !== 'ADMIN'` | Any non-faculty admin can approve or reject applications. |
| **Course Curriculum** | Requires `['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'PRINCIPAL']` | GET is completely unauthenticated; POST checks `user.type !== 'ADMIN'` | Unauthorized course deletion or creation possible. |
| **Notices & Circulars** | Requires `['SUPER_ADMIN', 'PRINCIPAL', 'ADMIN']` | Checks `user.role !== 'STUDENT'` | **Privilege Escalation:** Teaching faculty can publish official administrative notices. |
| **Research Papers** | Requires `['SUPER_ADMIN', 'PRINCIPAL']` | Checks `user.type !== 'ADMIN'` | Loose permission check. |

---

## 3. ROLE-PERMISSION MATRIX (AUDITED STATE VS RECOMMENDED LEAST PRIVILEGE)

| Module / Action | SUPER_ADMIN | PRINCIPAL | ADMISSION_ADMIN | ACADEMIC_ADMIN | CONTENT_MANAGER | FACULTY | STUDENT |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **User Provisioning (`/api/v1/admin/users`)** | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied |
| **System Settings (`/api/v1/admin/settings`)** | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied |
| **Audit Logs Inspection** | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied |
| **Admissions: View Dossiers** | ✅ Allowed | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied |
| **Admissions: Approve/Reject Status** | ✅ Allowed | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied |
| **Admissions: View Candidate PII** | ✅ Allowed | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | 🔒 Own Only |
| **Courses: Create & Edit** | ✅ Allowed | ✅ Allowed | ❌ Denied | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied |
| **Faculty Directory: Edit** | ✅ Allowed | ✅ Allowed | ❌ Denied | ✅ Allowed | ❌ Denied | 🔒 Own Profile | ❌ Denied |
| **Publish Notices & Circulars** | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ✅ Allowed | ❌ Denied | ❌ Denied |
| **News & Events Management** | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ✅ Allowed | ❌ Denied | ❌ Denied |
| **Gallery Media Upload** | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | ✅ Allowed | ❌ Denied | ❌ Denied |
| **NCISM Mandatory Disclosures** | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied | ❌ Denied |
| **Student Private Academic Data** | ✅ Allowed | ✅ Allowed | ❌ Denied | ❌ Denied | ❌ Denied | 🔒 Assigned Class | 🔒 Own Profile |

---

## 4. CRITICAL RBAC BOUNDARY TESTS

### Test RBAC-01: Student Accessing Admin Endpoint
- **Test:** Authenticated student (`SHAMC-2025-014`) attempted `GET /api/admin/overview`.
- **Result:** **PASS**. Handled with `HTTP 401 Unauthorized`.

### Test RBAC-02: Faculty Accessing User Provisioning
- **Test:** Authenticated faculty (`faculty@hariduttayurveda.edu.in`) attempted `GET /api/v1/admin/users`.
- **Result:** **PASS**. Handled with `HTTP 403 Forbidden`.

### Test RBAC-03: Admission Officer Accessing Restricted Settings
- **Test:** Authenticated admission officer attempted `POST /api/admin/settings`.
- **Result:** **FAIL (Privilege Escalation)**. The versioned route `/api/v1/admin/settings` correctly returned 403, but the legacy `/api/admin/settings` returned `HTTP 200 OK` and accepted changes because it only checks `user.type !== 'ADMIN'`.

### Test RBAC-04: IDOR in Candidate Status Lookup
- **Test:** Unauthenticated user queried `GET /api/admissions/status?q=pooja.verma@student.hariduttayurveda.edu.in`.
- **Result:** **FAIL (IDOR & PII Leakage)**. Returned candidate full name, NEET score, rank, and reservation category without authentication or identity verification.
