# DATABASE AUDIT & SCHEMA INTEGRITY REPORT
## Shri Haridutt Ayurvedic Medical College & Hospital

---

## 1. CURRENT DATABASE INVENTORY

- **Current Active Dialect**: SQLite (`prisma/dev.db`)
- **Prisma ORM Version**: 5.22.0
- **Database File Size**: ~240 KB
- **Seeded Records**:
  - System Users: 4 (Super Admin, Principal, Admission Admin, Faculty)
  - Student Scholars: 1
  - Academic Courses: 3 (BAMS, MD-Kayachikitsa, Certificate Panchakarma)
  - Ayurvedic Departments: 7 classical departments
  - Faculty Members: 4 senior Vaidyas & Professors
  - Dravyaguna Medicinal Flora: 3 species
  - Institutional Circulars: 3 notices
  - Press Releases: 1 event
  - Student Applications: 1 (with 2 attached documents)
  - Photo Gallery Items: 4 images
  - Research Publications: 2 peer-reviewed papers

---

## 2. 30-ENTITY NORMALIZATION GAP ANALYSIS

To meet the complete institutional requirements of Part 3, the database schema is expanded from 16 basic tables to the comprehensive 30-entity normalized architecture:

| # | Entity Name | Status | Purpose & Relations |
|---|---|---|---|
| 1 | `User` | **Active** | System authentication, password hash, status |
| 2 | `Role` | **Added** | RBAC roles (SUPER_ADMIN, ADMISSION_OFFICER, etc.) |
| 3 | `Permission` | **Added** | Granular access control permissions (`admissions:approve`) |
| 4 | `RolePermission` | **Added** | Join table linking roles to permissions |
| 5 | `UserRole` | **Added** | Join table supporting multi-role user accounts |
| 6 | `Student` | **Active** | Scholar profiles, enrollments, credentials |
| 7 | `Faculty` | **Active** | Professor directory, clinical appointments |
| 8 | `Department` | **Active** | 14 Ayurvedic departmental units |
| 9 | `Course` | **Active** | Degree & certificate academic offerings |
| 10 | `CourseDocument` | **Added** | Curricular syllabi and NCISM regulations |
| 11 | `AdmissionEnquiry` | **Active** | Prospective student inquiry leads |
| 12 | `AdmissionApplication` | **Active** | Multi-step candidate admission dossier |
| 13 | `ApplicationDocument` | **Active** | Encrypted verification attachments (NEET, 10+2, Aadhar) |
| 14 | `ApplicationStatusHistory` | **Added** | Formal audit trail of admission state transitions |
| 15 | `Notice` | **Active** | Official gazette and academic circulars |
| 16 | `News` | **Added** | Institutional press releases & achievements |
| 17 | `Event` | **Added** | Medical camps, symposiums, convocation schedule |
| 18 | `GalleryCategory` | **Added** | Categorization taxonomy for campus archives |
| 19 | `GalleryItem` | **Active** | High-definition media items & captions |
| 20 | `ResearchPublication` | **Active** | Peer-reviewed studies, clinical trials, citations |
| 21 | `Testimonial` | **Active** | Alumni, scholar, and hospital patient feedback |
| 22 | `ContactEnquiry` | **Active** | Public institutional inquiries |
| 23 | `WebsitePage` | **Added** | Content management system for dynamic static pages |
| 24 | `WebsiteSetting` | **Active** | Dynamic global configuration, banners, contacts |
| 25 | `SeoMetadata` | **Added** | Search engine optimization tags per URL slug |
| 26 | `NotificationLog` | **Added** | Audited dispatch history for SMTP emails & SMS |
| 27 | `AuditLog` | **Active** | Administrative activity logging & forensic trail |
| 28 | `AcademicCalendarEvent` | **Added** | Examination dates, festivals, term schedules |
| 29 | `StudentResource` | **Added** | Lecture notes, question banks, clinical manuals |
| 30 | `UploadedFile` | **Added** | Central file catalog with size, MIME, and private flag |

---

## 3. DATA INTEGRITY & REFERENTIAL CONSTRAINTS

- All entity primary keys use UUID v4 strings for high entropy and zero sequence predictability.
- Child relations (`ApplicationDocument`, `ApplicationStatusHistory`) employ `onDelete: Cascade` to avoid orphan records upon authorized deletion.
- User relationships (`AuditLog.performedBy`, `Faculty.departmentId`) employ `onDelete: SetNull` to maintain historical audit validity if an individual profile is deactivated.
- Composite unique indexes enforce business rules:
  - `Course.code` is unique.
  - `AdmissionApplication.applicationNumber` is unique.
  - `AdmissionApplication(email, courseCode)` unique prevention against accidental duplicate submissions.
  - `User.email` and `Student.studentId` are unique.
