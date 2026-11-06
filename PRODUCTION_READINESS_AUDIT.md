# PRODUCTION READINESS AUDIT REPORT
## Shri Haridutt Ayurvedic Medical College & Hospital
### Vedic Heritage × Modern Academic Luxury Digital Platform

**Audit Date:** November 4, 2026  
**Auditor:** Senior Full-Stack Software Architect, DevOps & Security Engineer  
**Status:** In Progress / Remediating  

---

## 1. Executive Summary

This audit assesses the production readiness of the digital portal for **Shri Haridutt Ayurvedic Medical College & Hospital**. The frontend layout, styling, typography, and motion graphic systems are exemplary and fully aligned with the *Vedic Heritage × Modern Academic Luxury* creative vision.

However, moving from a visual demonstration to a **real institutional digital platform** requires resolving several critical backend, database, authentication, file management, and admin operational gaps before production deployment.

---

## 2. Comprehensive Subsystem Audit

| Subsystem | Current State | Deficiencies / Gaps Identified | Severity |
|---|---|---|---|
| **1. Database & Schema** | Prisma ORM with 16 models in SQLite `dev.db`. | Missing `ApplicationDocument` model for candidate document uploads (NEET scorecards, marksheets, IDs). Missing `GalleryItem` model for CMS gallery management. | **HIGH** |
| **2. Admissions Application Workflow** | `/admissions/apply` collects textual fields; generates reference numbers. | No document upload mechanism (10th/12th marksheets, NEET scorecards). No duplicate submission guard (by email, phone, or NEET roll number). | **CRITICAL** |
| **3. File Upload & Document Security** | No file upload endpoints or storage infrastructure. | Candidates cannot upload verification dossiers. Gallery images and notice circulars cannot be uploaded via CMS. Uploaded documents risk public exposure if stored in `/public`. | **CRITICAL** |
| **4. Admin Control Center** | Overview, Admissions, and Notices tabs partially active. | Missing Courses CMS, Faculty CMS, Gallery CMS, Research CMS, and Enquiries Management tabs. Overview metrics rely on partial hardcoded cards rather than live database aggregations. | **CRITICAL** |
| **5. Student & Faculty Portals** | Login endpoints authenticate against DB (`Student` and `User` models). | Dashboards (`/student/dashboard` and `/faculty-portal/dashboard`) render hardcoded student and doctor profiles rather than dynamic session-hydrated records from `/api/student/profile` or `/api/faculty/profile`. | **HIGH** |
| **6. Email & Notification System** | No SMTP email sender configured (`ADMIN_NOTIFICATION_EMAIL` defined in `.env` but not invoked). | Candidates do not receive formal confirmation emails upon submitting applications or status changes. College administration does not receive instant enquiry dispatches. | **HIGH** |
| **7. Security & HTTP Headers** | Passwords hashed with bcrypt; JWT stored in `httpOnly` cookie. | Missing comprehensive Content Security Policy (CSP), anti-clickjacking headers (`X-Frame-Options`), MIME-sniffing prevention (`X-Content-Type-Options`), and private upload permission guards. | **HIGH** |
| **8. Dynamic Public Hydration** | Some public pages rely on static array data from `src/lib/data.ts`. | Changes made by administrators in CMS (courses, faculty, circulars, herbarium) do not automatically reflect on public pages unless backed by real DB endpoints with fallback hydration. | **MEDIUM** |
| **9. Hostinger Deployment Compatibility** | Next.js 15 App Router requiring Node.js runtime. | Hostinger Web Hosting supports Node.js via CloudLinux / cPanel or VPS. Configuration needs standalone build output (`output: 'standalone'`) and environment variable documentation. | **MEDIUM** |
| **10. SEO & Metadata** | Basic title/meta tags and dynamic sitemap present. | Missing JSON-LD structured schemas (`CollegeOrUniversity`, `MedicalBusiness`), OpenGraph image fallbacks, and robots meta restrictions for admin/portal routes. | **MEDIUM** |

---

## 3. Prioritized Issue Categorization

### Critical (Must be resolved immediately)
1. **Document Upload Architecture:** Implement private, secure document storage outside public root for admission files with MIME/size validation and an authenticated viewing proxy (`/api/admin/documents/[id]`).
2. **Complete Admin Dashboard CRUD:** Build functional modules for Course Management, Faculty Management, Enquiries, News/Notices, Gallery, Research, and Website Settings.
3. **Application Duplicate Protection:** Prevent duplicate applications using the same NEET roll number, email, or mobile.

### High (Core Operational Requirements)
4. **Student & Faculty Dynamic Dashboards:** Create `/api/student/profile` and `/api/faculty/profile` so portals display real database records.
5. **Branded Email Notification Engine:** Implement an SMTP delivery module with luxury Ayurvedic branded HTML templates for student confirmations and admissions alerts, with safe logging fallbacks.
6. **Security Hardening:** Implement security HTTP headers in Next.js config and verify session timeouts and role authorization checks.

### Medium (Quality & SEO Enhancements)
7. **Public Dynamic Data Hydration:** Connect public course showcases and faculty directories to database APIs with fallback data.
8. **JSON-LD Schema & OpenGraph:** Add structured data markup for Google Search Rich Results.
9. **Deployment & Standalone Packaging:** Configure Next.js standalone output and deployment guide for Hostinger Node.js environment.

### Low (Refinements)
10. UI polishing of empty states and loading skeletons across admin and portal tables.

---

## 4. Remediation Plan

We will systematically execute Phases 2 through 16 to resolve every identified gap, build automated E2E test suites, and generate the final production report.
