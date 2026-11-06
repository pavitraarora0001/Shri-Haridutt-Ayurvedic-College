# REST API SPECIFICATION REFERENCE
## Shri Haridutt Ayurvedic Medical College & Hospital — API v1

---

## 1. GATEWAY & AUTHENTICATION OVERVIEW

- **Base URL**: `/api/v1`
- **Format**: JSON (`Content-Type: application/json`)
- **Authentication**:
  - **Browser**: HttpOnly, Secure, SameSite=Lax Cookie (`auth_token`)
  - **CLI / Machine**: `Authorization: Bearer <JWT_TOKEN>`
- **Interactive Documentation**: `https://yourdomain.edu.in/api/v1/docs` (Swagger UI)
- **Machine-Readable OpenAPI Spec**: `public/swagger.json` or `/api/v1/docs?format=json`

---

## 2. PUBLIC ENDPOINT CATALOG

### Health & Monitoring
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/v1/health` | System status, DB connectivity latency, uptime | None |
| `GET` | `/api/v1/docs` | Interactive Swagger UI / OpenAPI 3.0 specification | None |

### Institutional Profile & Governance
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/v1/institution` | Statutory status, heritage, accreditations, intake | None |
| `GET` | `/api/v1/institution/leadership` | Principal, Governing Council, Medical Superintendent | None |
| `GET` | `/api/v1/institution/vision-mission` | Institutional vision, mission, and Vedic principles | None |

### Academic Programs & Departments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/v1/courses` | List approved courses (BAMS, MD, Panchakarma) | None |
| `GET` | `/api/v1/courses/:slug` | Curricula overview, intake, fee structure, syllabi | None |
| `GET` | `/api/v1/departments` | 14 Ayurvedic departmental units and laboratories | None |
| `GET` | `/api/v1/departments/:slug` | Departmental profile and faculty roster | None |
| `GET` | `/api/v1/faculty` | Faculty directory (filters: department, leadership) | None |
| `GET` | `/api/v1/faculty/:slug` | Detailed doctor/professor CV & publications | None |

### Admissions & Prospective Students
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/v1/admissions/information` | Admissions 2026-27 statutory counseling overview | None |
| `GET` | `/api/v1/admissions/eligibility` | NEET-UG cutoff percentiles & 10+2 prerequisites | None |
| `GET` | `/api/v1/admissions/fees` | Approved tuition, hostel, and clinical fee schedule | None |
| `POST` | `/api/v1/admissions/enquiries` | Submit prospective candidate inquiry lead | None |
| `POST` | `/api/v1/admissions/applications` | Submit formal candidate admission dossier | None |
| `GET` | `/api/v1/admissions/status?appNo=...` | Live candidate application tracking & review notes | None |

### Communications & Archives
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/v1/notices` | Published administrative & examination circulars | None |
| `GET` | `/api/v1/news` | Press releases & symposium reports | None |
| `GET` | `/api/v1/events` | Medical camps, convocation, cultural calendar | None |
| `GET` | `/api/v1/gallery` | Filtered photographic archives | None |
| `GET` | `/api/v1/gallery/categories` | Gallery category taxonomy | None |
| `GET` | `/api/v1/research` | Peer-reviewed clinical & pharmacognostical papers | None |
| `POST` | `/api/v1/contact` | Public contact inquiry submission | None |
| `GET` | `/api/v1/settings/public` | Live announcement bar text & emergency helplines | None |

---

## 3. ADMINISTRATIVE ENDPOINT CATALOG (`/api/v1/admin/*`)

| Method | Endpoint | Description | Required Role |
|---|---|---|---|
| `GET` | `/api/v1/admin/overview` | Aggregated executive statistics & recent audit logs | `ADMIN`, `SUPER_ADMIN` |
| `GET` | `/api/v1/admin/users` | List system administrative accounts with pagination | `SUPER_ADMIN` |
| `POST` | `/api/v1/admin/users` | Provision new administrator account | `SUPER_ADMIN` |
| `PATCH` | `/api/v1/admin/users/:id` | Update user role or reset password | `SUPER_ADMIN` |
| `DELETE`| `/api/v1/admin/users/:id` | Deactivate administrative access | `SUPER_ADMIN` |
| `GET` | `/api/v1/admin/admissions` | Review candidate admission applications with filters| `ADMISSION_ADMIN`, `SUPER_ADMIN` |
| `GET` | `/api/v1/admin/admissions/:id` | Full dossier inspection including private docs | `ADMISSION_ADMIN`, `SUPER_ADMIN` |
| `PATCH` | `/api/v1/admin/admissions/:id/status`| Update application status with audit remarks | `ADMISSION_ADMIN`, `SUPER_ADMIN` |
| `POST` | `/api/v1/admin/admissions/:id/notes` | Append internal admissions committee notes | `ADMISSION_ADMIN`, `SUPER_ADMIN` |
| `POST` | `/api/v1/admin/courses` | Register new academic course | `ADMIN`, `SUPER_ADMIN` |
| `PATCH` | `/api/v1/admin/courses/:id` | Modify intake, duration, or curriculum | `ADMIN`, `SUPER_ADMIN` |
| `DELETE`| `/api/v1/admin/courses/:id` | Remove academic course | `SUPER_ADMIN` |
| `POST` | `/api/v1/admin/notices` | Publish gazette notice or upload circular PDF | `CONTENT_MANAGER`, `SUPER_ADMIN` |
| `DELETE`| `/api/v1/admin/notices/:id` | Archive / unpublish circular | `CONTENT_MANAGER`, `SUPER_ADMIN` |
| `GET` | `/api/v1/admin/settings` | Retrieve all system configuration parameters | `ADMIN`, `SUPER_ADMIN` |
| `PATCH` | `/api/v1/admin/settings` | Update live announcement text, helplines, etc. | `ADMIN`, `SUPER_ADMIN` |
