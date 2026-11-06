# CYBERSECURITY AUDIT & HARDENING REPORT
## Shri Haridutt Ayurvedic Medical College & Hospital

---

## 1. THREAT MODELING & COMPLIANCE SUMMARY

This backend has been audited and hardened according to OWASP Top 10 Web Application Security Standards:

| Security Vector | Implementation Mechanism | Audit Result |
|---|---|---|
| **A01: Broken Access Control** | Role-Based Access Control (RBAC) enforced in middleware and services; IDOR protection prevents cross-tenant access to confidential documents | **PASS** |
| **A02: Cryptographic Failures** | Passwords hashed using standard salted bcrypt (10 rounds); Session JWTs signed using HMAC-SHA256 with 64-char keys; Private student KYC stored outside web root | **PASS** |
| **A03: Injection (SQL/NoSQL)** | All database operations execute through Prisma ORM with strict prepared statements and parameterized inputs; Malicious SQL payloads escaped | **PASS** |
| **A04: Insecure Design** | Duplicate submission prevention prevents race conditions in admission allotments; Multi-step status history guarantees non-repudiation | **PASS** |
| **A05: Security Misconfiguration** | HTTP Security Headers enforced via Next.js middleware (CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy); Stack traces stripped in production | **PASS** |
| **A06: Vulnerable Components** | All dependencies inspected and free of high/critical CVEs | **PASS** |
| **A07: Identification & Auth** | Rate limiting protects against brute force attacks (max 10 submissions/min per IP); HttpOnly, Secure, SameSite=Lax cookies protect against XSS token theft | **PASS** |
| **A08: Software & Data Integrity** | File upload validator verifies real MIME types (PDF, JPEG, PNG, WebP) and restricts file sizes to <= 5MB | **PASS** |
| **A09: Logging & Monitoring** | AuditLog records all administrative mutations (logins, status changes, course creations) with timestamps and user IDs | **PASS** |
| **A10: Server-Side Request Forgery** | Document streaming proxy exclusively accesses internal validated paths (`storage/private_documents/`); External URL fetches forbidden | **PASS** |

---

## 2. PRODUCTION HARDENING CHECKLIST

1. **Change Default Administrator Credentials**:
   - Immediate task upon first production login: Navigate to `/admin` and update the password for `admin@hariduttayurveda.edu.in`.
2. **Rotate JWT Secret**:
   - Replace default `JWT_SECRET` in `.env` with a unique 64-character entropy string generated via `openssl rand -hex 32`.
3. **Private Document Storage Permissions**:
   - Ensure the directory `storage/private_documents/` has Linux permissions `0750` so that web processes can write, but public HTTP visitors cannot browse files directly.
4. **Enforce HTTPS**:
   - Hostinger Free Let's Encrypt SSL active with automated 301 HTTPS redirection.
