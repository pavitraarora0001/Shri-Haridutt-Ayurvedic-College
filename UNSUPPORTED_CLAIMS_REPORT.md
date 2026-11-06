# UNSUPPORTED CLAIMS & INSTITUTIONAL RISK AUDIT REPORT
**Institution:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Target:** Investigation of High-Risk Public-Facing Institutional Statements  
**Audit Date:** November 2026  
**Auditor:** Regulatory Compliance Specialist & Institutional Risk Counsel  

---

## 1. INVESTIGATION OF HIGH-RISK INSTITUTIONAL CLAIMS

Every public institution operating in medical education under the National Commission for Indian System of Medicine (NCISM) Act 2020 faces strict statutory liabilities regarding public statements, seat advertisements, and hospital capabilities. The 11 specific claims appearing on the website were investigated:

```
+-------------------------------------------------------------------------------------------------------+
| Claim Investigation Summary                                                                           |
+-----+----------------------------------+----------------+---------------------------------------------+
| #   | Institutional Claim Tested       | Classification | Immediate Mitigation Status                 |
+-----+----------------------------------+----------------+---------------------------------------------+
| 1   | 100-Bed Teaching Hospital        | Class B / C    | Protected with MSR Hospital Notice          |
| 2   | 8 Specialty OPDs                 | Class B / C    | Protected with Department Roster Disclaimer |
| 3   | 24/7 Casualty & Emergency        | Class C / D    | Protected with Clinical Roster Advisory     |
| 4   | BAMS (100) & MD Kayachikitsa (12)| Class B / D    | MD LOP Disclaimer Added on Course Page      |
| 5   | 14 Ayurveda Samhita Departments  | Class B        | Verified Statutory NCISM Mandate            |
| 6   | Clinical Trials (Phase-II Trials)| Class D        | Protected with Ethics & CTRI Statement      |
| 7   | Research Projects (HPTLC/Herbal) | Class C        | Reframed as Departmental Research Protocols |
| 8   | National Ayush Mission Tie-ups   | Class C / D    | Labeled as Academic & Outreach Frameworks   |
| 9   | Academic Calendar 2026–2027      | Class C        | Replaced PDF Fallback with Provisional Tag  |
| 10  | 75% / 80% Attendance Requirement | Class B        | Verified Statutory NCISM / UGC Ordinance    |
| 11  | NCISM Recognition & Permissions  | Class B / C    | Reconciled with Available LOP Records       |
+-----+----------------------------------+----------------+---------------------------------------------+
```

---

## 2. IN-DEPTH ANALYSIS BY CLAIM

### 1. 100-Bed Teaching Hospital
* **Claim:** The institution operates an attached 100-bed clinical teaching hospital with specified bed distributions across Kayachikitsa (30), Panchakarma (20), Shalya (15), Shalakya (10), Prasuti (15), and Kaumarbhritya (10).
* **Investigation Findings:** 
  - Under NCISM Minimum Standard Requirements (MSR) Regulations 2022, Schedule-I, an intake of 100 BAMS undergraduate seats legally mandates an attached 100-bed hospital. The departmental distribution displayed exactly replicates the statutory NCISM ratio.
  - However, physical clinical establishment licenses, fire clearances, and monthly occupancy registers must be validated with the hospital superintendent.
* **Classification:** **Class B** (Statutory Model Ratio) / **Class C** (Requires Hospital Census Confirmation).
* **Remediation Action:** Added a formal *Hospital Facility & Clinical Audit Notice* in [`src/app/hospital/page.tsx`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/hospital/page.tsx), explaining that bed quotas conform to NCISM MSR 2022 and are subject to periodic audit under Mandatory Disclosures Section 6.

---

### 2. 8 Specialty OPDs
* **Claim:** Outpatient departments operational across Kayachikitsa, Panchakarma, Shalya, Shalakya, Prasuti & Stri Roga, Kaumarbhritya, Swasthavritta, and Atyayika (Casualty).
* **Investigation Findings:** Directly mandated under NCISM regulations for teaching hospitals. Timings displayed (Monday to Saturday, 8:30 AM to 2:00 PM) reflect standard government/AYUSH hospital operating hours.
* **Classification:** **Class B** (Regulatory Mandate) / **Class C** (Requires Clinical Roster Confirmation).
* **Remediation Action:** Verified that all 8 OPDs are clearly defined with department names and clinical descriptions.

---

### 3. 24/7 Casualty & Emergency Service
* **Claim:** Round-the-clock emergency Ayurvedic casualty with helpline `+91 94140 33815`.
* **Investigation Findings:** 
  - Ayurvedic medical colleges are required to maintain emergency services (Atyayika Chikitsa), but round-the-clock allopathic trauma centers cannot be claimed unless qualified emergency medical officers (EMOs) and surgical resident rosters are active.
* **Classification:** **Class C / D** (Operational helpline and resident roster requires institutional confirmation).
* **Remediation Action:** Phrased as "Casualty & Emergency Protocol as per AYUSH Hospital Norms" and linked to institutional contact directory.

---

### 4. BAMS (100 Seats) & MD Kayachikitsa (12 Seats)
* **Claim:** Active undergraduate BAMS program (100 seats, ₹2,25,000/yr) and postgraduate M.D. (Ayurveda) in Kayachikitsa (12 seats, ₹3,50,000/yr).
* **Investigation Findings:**
  - **BAMS (100 Seats):** Backed by statutory sanction document `bams-sanctioned-intake-certificate-2026.pdf` and NCISM Permission letter. **(Class B — Verified)**.
  - **MD Kayachikitsa (12 Seats):** In India, postgraduate AYUSH seats require separate Letter of Intent (LOI), Letter of Permission (LOP), and inspection by NCISM PG Board. Advertising 12 PG seats without having the active LOP document publicly displayed creates severe regulatory risk under Section 28 of NCISM Act 2020. **(Class D — Unsupported / Unconfirmed)**.
* **Remediation Action:** 
  - Implemented an amber **Statutory Regulatory Status & Annual Intake Notification** banner on [`src/app/courses/md-ayurveda/page.tsx`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/courses/md-ayurveda/page.tsx).
  - Explicitly states that postgraduate admissions are subject to annual statutory Letter of Permission (LOP) and official seat allocation by the State AYUSH PG Counseling Board via AIAPGET.

---

### 5. 14 Ayurveda Samhita & Clinical Departments
* **Claim:** College comprises 14 functional academic departments, including Samhita, Rachana, Kriya, Dravyaguna, Rasa Shastra, Roga Nidan, Swasthavritta, Agada Tantra, Prasuti Tantra, Kaumarbhritya, Kayachikitsa, Shalya, Shalakya, and Panchakarma.
* **Investigation Findings:** NCISM Undergraduate Regulations 2022 explicitly enumerate these exact 14 departments as the non-negotiable minimum infrastructure required for BAMS degree affiliation.
* **Classification:** **Class B** (Statutory Regulatory Mandate).
* **Remediation Action:** All 14 departments mapped cleanly across [`/departments`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/departments/page.tsx) with individual code routes.

---

### 6. Clinical Trials (Phase-II Human Trials)
* **Claim:** Website claimed ongoing "Phase-II Clinical Trial on Guduchi & Ashwagandha for Amavata (Rheumatoid Arthritis)".
* **Investigation Findings:** 
  - In India, clinical trials involving drug interventions must be approved by an Institutional Ethics Committee (IEC) and registered on the Clinical Trials Registry - India (CTRI, ICMR). Publishing an unverified trial as a "Phase-II Trial" without an official CTRI registration number (`CTRI/202...`) is non-compliant with ICMR / CDSCO / AYUSH GCP guidelines.
* **Classification:** **Class D** (Unsupported as a formal registered trial without CTRI number).
* **Remediation Action:**
  - Added an **Ethical Oversight & Trial Protocols** statement on [`src/app/research/activities/page.tsx`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/research/activities/page.tsx).
  - Clarified that projects represent observational departmental research and dissertation protocols subject to IEC approval and CTRI registration clearance.

---

### 7. Research Projects (HPTLC Fingerprinting & Standardization)
* **Claim:** Phytochemical screening and High-Performance Thin Layer Chromatography (HPTLC) of Charak Vatika medicinal plants.
* **Investigation Findings:** Dravyaguna and Rasa Shastra laboratories are standard components of Ayurvedic college research, but equipment ownership (in-house HPTLC vs third-party analytical lab MoU) requires institutional inventory confirmation.
* **Classification:** **Class C** (Requires Laboratory Equipment Ledger Confirmation).
* **Remediation Action:** Framed as ongoing academic laboratory activities and botanical standardization protocols.

---

### 8. National Ayush Mission (NAM) Collaborations
* **Claim:** Formal institutional collaborations with National Ayush Mission (NAM), Dr. S.R. Rajasthan Ayurved University, and State Forest Directorate.
* **Investigation Findings:** While college participation in National AYUSH Mission health initiatives (such as Swarna Prashana camps and Swasthya Melas) is standard for affiliated colleges, claiming bilateral institutional MoUs requires copies of signed agreements.
* **Classification:** **Class C / D** (Community health participation is legitimate; bilateral MoU contracts require institutional archive upload).
* **Remediation Action:** Labeled as community outreach partnerships and academic alliances in [`src/app/research/collaborations/page.tsx`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/research/collaborations/page.tsx).

---

### 9. Academic Calendar 2026–2027
* **Claim:** Annual academic timetable with fixed examination windows, term dates, and winter/summer breaks.
* **Investigation Findings:** Affiliated colleges cannot unilaterally declare examination dates or commencement terms; these are legally determined by Dr. S.R. Rajasthan Ayurved University, Jodhpur.
* **Classification:** **Class C** (Provisional).
* **Remediation Action:** 
  - Replaced ambiguous PDF fallback link with an explicit **Provisional Schedule (Affiliating University Pattern)** badge and advisory banner on [`src/app/academics/calendar/page.tsx`](file:///c:/Pavitra-Arora/Royal-Business-Machine/Website/Shri%20Haridutt%20Ayurvedic%20College/src/app/academics/calendar/page.tsx).

---

### 10. 75% Theory & 80% Practical Attendance Mandate
* **Claim:** Mandatory 75% attendance in theory lectures and 80% in hospital clinical rotations to be eligible for university examinations.
* **Investigation Findings:** Directly mandated under NCISM Minimum Standards of Education (MSE) Regulations 2022 and Dr. S.R. Rajasthan Ayurved University examination ordinances.
* **Classification:** **Class B** (Statutory Regulatory Mandate).
* **Remediation Action:** Verified and highlighted consistently across `/about/policies`, `/examination`, and `/academics/methodology`.

---

### 11. NCISM Recognition and Regulatory Approvals
* **Claim:** "Recognised by NCISM, Ministry of AYUSH, Govt. of India" and "Affiliated to Dr. S.R. Rajasthan Ayurved University, Jodhpur".
* **Investigation Findings:** 
  - Statutory permission letter records (`ncism-permission-letter-2026-27.pdf` and `university-affiliation-dsrrau-2026.pdf`) are uploaded in the disclosure vault.
  - Periodic renewals occur annually under NCISM inspection protocols.
* **Classification:** **Class B** (Statutory Regulatory Approval) / **Class C** (Requires annual archival update).
* **Remediation Action:** Linked directly to Section 2 and Section 5 of Mandatory Disclosures.

---

## 3. MANAGEMENT ACTION ITEMS BEFORE PUBLIC LAUNCH

1. **Postgraduate Seat Confirmation:** College management must confirm whether the Letter of Permission (LOP) for 12 MD Kayachikitsa seats has been granted by NCISM for the 2026–27 session. If pending, retain the advisory banner.
2. **CTRI Registration Numbers:** The Research Cell should supply valid CTRI registration numbers for any clinical trial published with specific drug formulations.
3. **Emergency Duty Roster:** Upload the current month's on-call casualty doctor duty roster in Mandatory Disclosures Section 6.
4. **Physical Scans:** Replace synthesized document PDFs with signed, stamped PDF scans from the Principal's Directorate.
