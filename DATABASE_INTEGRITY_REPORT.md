# DATABASE INTEGRITY, SCHEMA & PRISMA AUDIT REPORT
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**ORM:** Prisma 5.22.0  
**Active Database File:** `prisma/dev.db` (SQLite 3.x)  
**Production Target:** MySQL 8.0 on Hostinger Business Web Hosting  
**Audit Date:** November 5, 2026  

---

## 1. SCHEMA INTEGRITY ANALYSIS (`prisma/schema.prisma`)

### 1.1 Model Inventory (33 Total Models)
1. **Identity & Governance:** `User`, `Role`, `Permission`, `RolePermission`, `UserRole`, `AuditLog`.
2. **Admissions Management:** `AdmissionApplication`, `ApplicationDocument`, `ApplicationStatusHistory`, `AdmissionEnquiry`.
3. **Academics & Departmental Infrastructure:** `Course`, `CourseDocument`, `Department`, `Faculty`, `AcademicCalendarEvent`, `StudentResource`.
4. **Student Body:** `Student`.
5. **Hospital & Clinical Facilities:** `CampusFacility`, `HerbalPlant`.
6. **Communications & Media:** `Notice`, `News`, `Event`, `NewsEvent`, `GalleryCategory`, `GalleryItem`, `ResearchPublication`, `Testimonial`, `ContactEnquiry`, `ContactMessage`.
7. **CMS & Metadata:** `WebsitePage`, `WebsiteSetting`, `SeoMetadata`, `NotificationLog`, `UploadedFile`.
8. **NCISM Regulatory Disclosures:** `DisclosureCategory`, `DisclosureRecord`, `DisclosureDocument`.

---

## 2. REFERENTIAL INTEGRITY & RELATIONSHIP CHECKS

- **Cascade Deletes:** Correctly configured on parent-child relations:
  - `UserRole` -> `onDelete: Cascade` on `User` and `Role`.
  - `RolePermission` -> `onDelete: Cascade` on `Role` and `Permission`.
  - `ApplicationDocument` -> `onDelete: Cascade` on `AdmissionApplication`.
  - `ApplicationStatusHistory` -> `onDelete: Cascade` on `AdmissionApplication`.
  - `DisclosureRecord` & `DisclosureDocument` -> `onDelete: Cascade` on `DisclosureCategory`.
- **SetNull on Audit Records:**
  - `AuditLog.user` -> `onDelete: SetNull` ensures that deleting a temporary user does not erase statutory institutional audit logs.
  - `Faculty.department` -> `onDelete: SetNull` prevents deletion of faculty members if a department is reorganized.
- **Unique Constraints:**
  - `User.email` (Unique)
  - `Student.studentId` and `Student.email` (Unique)
  - `Faculty.facultyId` and `Faculty.email` (Unique)
  - `Course.code` (Unique)
  - `AdmissionApplication.applicationNumber` (Unique)
  - `AdmissionEnquiry.enquiryNumber` (Unique)
  - `DisclosureCategory.categoryNumber` (1..16 Unique)

---

## 3. SQLITE VS MYSQL PRODUCTION COMPATIBILITY EVALUATION

| Operational Dimension | SQLite (`prisma/dev.db`) | Hostinger MySQL 8.0 | Assessment & Risk |
| :--- | :--- | :--- | :--- |
| **Concurrency & Write Locks** | Single-writer file lock. Concurrent writes block with `SQLITE_BUSY`. | Row-level locking (InnoDB) with high concurrent write throughput. | **CRITICAL RISK** on SQLite under simultaneous admission submissions. |
| **Connection Pooling** | Local file access (No pooling needed). | Network socket / TCP connection pool (Prisma defaults to 10 connections). | Recommended on Hostinger. |
| **Data Types** | Weak typing (String, Integer, Real, Blob). | Strict typing (VARCHAR, TEXT, INT, DATETIME, JSON). | Schema models use standard Prisma types compatible with MySQL. |
| **Backup & Export** | File copy (`copyFile prisma/dev.db backup.db`). | Automated `mysqldump` / Hostinger automated snapshots. | MySQL is enterprise ready. |
| **Data Persistence on Deploy** | Risk of overwrite if `dev.db` is tracked in git or wiped during deploy. | External MySQL service persists across frontend deployments. | MySQL prevents accidental data wipe. |

---

## 4. SQL INJECTION AUDIT
- **Query Mechanism:** All database interactions in the codebase use Prisma Client strongly-typed methods:
  - `prisma.user.findUnique()`
  - `prisma.admissionApplication.findMany()`
  - `prisma.admissionApplication.update()`
- **Raw SQL Check:** An audit of all repository files confirmed **ZERO** instances of `$queryRaw`, `$executeRaw`, or raw SQL concatenation.
- **Verdict:** **SAFE** against standard SQL injection vulnerabilities.

---

## 5. SEEDING & DATABASE INTEGRITY FINDINGS

1. **Duplicate Alias Models:**
   - `ContactMessage` vs `ContactEnquiry` (redundant alias models).
   - `NewsEvent` vs `News` + `Event` (redundant legacy models).
2. **Missing Production Tables:**
   - No `HospitalAppointment` model for patient booking.
   - No `PasswordResetToken` table for expiring OTP/reset tokens.
3. **Backup Status:**
   - Active database size: ~528 KB (`prisma/dev.db`).
   - Backup file exists: `prisma/backup_dev_production_ready.db` (241 KB).
