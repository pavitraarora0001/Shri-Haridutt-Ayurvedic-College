# RAJASTHAN AYURVED UNIVERSITY (RAU) NAVIGATION & STRUCTURE ANALYSIS
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Reference Model:** Rajasthan Ayurved University (RAU), Jodhpur / Institutional Medical Portal  
**Date:** November 5, 2026  
**Author:** Senior Frontend Architect & Information Architecture Specialist  

---

## 1. PURPOSE & STRUCTURAL BENCHMARK

The objective of this analysis is to evaluate the institutional information architecture and navigation hierarchy of Rajasthan Ayurved University (RAU), Jodhpur, and translate its structural strengths into a prestigious, modern, college-appropriate website for **Shri Haridutt Ayurvedic Medical College & Hospital (SHAMC)**.

### Core Principles Observed:
1. **Clear Institutional Categorization:** The reference site organizes massive statutory, academic, and clinical information into distinct, predictable top-level domains.
2. **Dedicated Regulatory Transparency:** Prominent placement for regulatory documents, NCISM disclosures, university affiliations, and government circulars.
3. **Clinical Integration:** Prominent visibility for the hospital, OPD/IPD facilities, Panchakarma departments, and patient welfare.
4. **Examination & Student Life:** Clear demarcation of examination notices, schedules, and university results, preventing clutter on the general homepage.
5. **Vedic Academic Heritage:** High-contrast aesthetic with deep traditional backgrounds (navy/deep green), antique gold accents, and clean white content typography.

---

## 2. STRUCTURAL ADAPTATION FOR AN AYURVEDIC MEDICAL COLLEGE

While RAU is a state university with university-specific divisions (Constituent Colleges, Academic Senate, Registrar Office, Affiliation Directorate), **Shri Haridutt Ayurvedic Medical College & Hospital** is an affiliated Ayurvedic medical college (affiliated with Dr. S.R. Rajasthan Ayurved University, approved by NCISM & Ministry of AYUSH).

Therefore, the navigation must reflect a premier **Medical College & Teaching Hospital**:
- College Governance & Administration (Governing Council, Principal, Medical Superintendent)
- Undergraduate (BAMS 100 Seats) and Postgraduate programmes
- Attached 100-Bed Clinical Teaching Hospital & Charak Vatika Herbarium
- Examination and University Notice Center
- Comprehensive Statutory & NCISM Document Vault

---

## 3. NINE MASTER NAVIGATION PILLARS

| # | Master Pillar | Primary Scope & Role | Dropdown Structure |
| :-: | :--- | :--- | :--- |
| **1** | **Home** | Institutional gateway, live ticker, highlights, announcements. | Direct pillar |
| **2** | **About Us** | Heritage, leadership, governance, committee charters, policies. | Multi-column (Overview, Governance, Committees) |
| **3** | **Documents** | Fee structures, syllabus, approvals, prospectus, tenders, downloads. | Multi-column (Admissions & Fees, Regulatory, Institutional) |
| **4** | **Academics** | BAMS, MD, 14 departments, faculty directory, academic calendar. | Multi-column (Programmes, Departments & Faculty, Facilities) |
| **5** | **Research** | Publications, clinical trials, IEC committee, MoUs, conferences. | Multi-column (Activities & Papers, Committees, Collaborations) |
| **6** | **Hospital** | 100-bed teaching hospital, OPD/IPD, Panchakarma, diagnostic labs. | Multi-column (Clinical Services, Facilities & Staff, Patient Guide) |
| **7** | **News & Events** | College news, notices, workshops, cultural/sports, photo/video gallery. | Two-column (Announcements, Media & Life) |
| **8** | **Examination** | Notifications, datesheets, university examination results, archives. | Single wide column (Schedules, Results, Notifications) |
| **9** | **Miscellaneous** | IQAC, student grievances, scholarships, alumni, RTI, directory. | Two-column (Student Welfare, Statutory & Quick Links) |

---

## 4. VISUAL & INTERACTIVE IDENTITY SPECIFICATION

- **Desktop Navigation Bar:**
  - Full-width container (`max-w-[1440px]`).
  - Height: `70px` (compact, professional).
  - Background: Deep Vedic Forest Green `#0F2821` / Antique Gold border `#C5A46D`/30.
- **Dropdown Panels:**
  - Background: Deep Vedic Navy/Green `#0B2B4A` / `#0A1B16` with backdrop blur.
  - Borders: Antique Gold `#C5A46D` (1px subtle).
  - Submenu Items: `#F6F2E9` with `#C5A46D` active hover state and left border highlight.
  - Multi-column grid for complex sections (`Documents`, `Academics`, `Hospital`, `About Us`).
- **Mobile Navigation:**
  - Off-canvas animated drawer with expandable accordions for all 9 sections.
  - Instant one-click phone helplines and quick portal links.
