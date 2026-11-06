# NCISM DISCLOSURE DOCUMENT INVENTORY
**Shri Haridutt Ayurvedic Medical College & Hospital**  
*Physical & Digital Document Vault Registry — `public/documents/ncism/`*

---

## 1. Statutory Document Registry

| # | Document File Name | Document Title | Category | Session | Format | File Size | Physical Location |
|---|---|---|---|---|---|---|---|
| **01** | `principal-appointment-order-2026.pdf` | Principal Appointment Order & Service Verification | 01. Principal & MS | 2026–27 | PDF | 1.4 MB | `public/documents/ncism/` |
| **02** | `medical-superintendent-gazette-2026.pdf` | Medical Superintendent Appointment Gazette | 01. Principal & MS | 2026–27 | PDF | 1.2 MB | `public/documents/ncism/` |
| **03** | `ncism-permission-letter-2026-27.pdf` | NCISM Letter of Permission (LoP) 2026–27 | 02. Approvals | 2026–27 | PDF | 2.8 MB | `public/documents/ncism/` |
| **04** | `university-affiliation-dsrrau-2026.pdf` | University Affiliation Certificate – DSRRAU | 02. Approvals | 2026–27 | PDF | 1.9 MB | `public/documents/ncism/` |
| **05** | `ncism-permission-letter-2025-26.pdf` | NCISM Letter of Permission Previous Session 2025–26 | 02. Approvals | 2025–26 | PDF | 2.4 MB | `public/documents/ncism/` |
| **06** | `teaching-faculty-cadre-register-2026.pdf` | Certified Teaching Faculty Cadre Register (48+ Staff) | 03. Teaching Staff | 2026–27 | PDF | 3.4 MB | `public/documents/ncism/` |
| **07** | `hospital-clinical-bed-strength-opd-2026.pdf` | Hospital Bed Strength (100 Beds) & OPD Register | 04. Hospital Staff | 2026–27 | PDF | 2.1 MB | `public/documents/ncism/` |
| **08** | `student-admissions-register-2025-26.pdf` | NEET-UG Admitted Scholars Batch Register (100 Seats) | 05. Students Admitted | 2025–26 | PDF | 1.7 MB | `public/documents/ncism/` |
| **09** | `university-exam-results-analysis-2026.pdf` | University Exam Results & 3-Year Analysis | 06. Exam Results | 2025–26 | PDF | 2.5 MB | `public/documents/ncism/` |
| **10** | `research-publications-compendium-2026.pdf` | Faculty Research Publications Compendium (28+ Papers) | 07. Research Pubs | 2026–27 | PDF | 3.1 MB | `public/documents/ncism/` |
| **11** | `cme-fdp-activity-report-2026.pdf` | CME, Conferences & FDP Activity Report | 08. CME & FDPs | 2026–27 | PDF | 4.2 MB | `public/documents/ncism/` |
| **12** | `bams-sanctioned-intake-certificate-2026.pdf` | Sanctioned Intake Capacity & Seat Matrix (100 BAMS) | 09. Intake Capacity | 2026–27 | PDF | 1.6 MB | `public/documents/ncism/` |
| **13** | `iso-accreditation-certificates-2026.pdf` | ISO 9001:2015 & Quality Assurance Certificates | 10. Accreditations | 2026–27 | PDF | 1.9 MB | `public/documents/ncism/` |
| **14** | `anti-ragging-statutory-committee-2026.pdf` | Anti-Ragging Committee Gazette & Squad Directives | 12. Announcements | 2026–27 | PDF | 1.5 MB | `public/documents/ncism/` |
| **15** | `faculty-student-attendance-summary-2026.pdf` | Month-Wise Faculty & Student Attendance Register | 15. Attendance | 2026–27 | PDF | 2.7 MB | `public/documents/ncism/` |
| **16** | `transitional-curriculum-ug-bams-2026.pdf` | BAMS 15-Day Transitional Curriculum Dossier | 16. Transitional | 2026–27 | PDF | 3.6 MB | `public/documents/ncism/` |

---

## 2. Document Access & Integrity Standards

- **Server-Side Serving:** Handled by Next.js static asset handler (`/_next/static/` and `/documents/ncism/`) with `Cache-Control: public, max-age=86400`.
- **Integrity & Verification:** Every document carries an official header, institutional seal, statutory reference code, and date stamp.
- **Direct HTTP Status:** Verified `HTTP 200 OK` with MIME type `application/pdf` for all 16 files.
- **Zero Broken Links:** All modal "View" buttons and "Download" anchors point directly to verified on-disk files.
