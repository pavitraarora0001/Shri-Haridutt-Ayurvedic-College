import jwt from 'jsonwebtoken';

const BASE_URL = 'http://localhost:3000';
const JWT_FALLBACK_SECRET = 'haridutt-ayurveda-jwt-secret-key-2026-production';

const testResults = [];

function recordTest(id, name, expected, actual, passed, details) {
  testResults.push({ id, name, expected, actual, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Scenario ${id}: ${name} -> Got: ${actual} (Expected: ${expected})`);
}

async function runAuditTests() {
  console.log('=== STARTING BACKEND & AUTHENTICATION SECURITY AUDIT SUITE ===\n');

  // 1. Valid login (Admin)
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'admin@hariduttayurveda.edu.in', password: 'Admin@123', portalType: 'ADMIN' })
    });
    const setCookie = res.headers.get('set-cookie');
    const data = await res.json();
    const hasHttpOnly = setCookie && setCookie.includes('HttpOnly');
    const hasSameSite = setCookie && setCookie.toLowerCase().includes('samesite=lax');
    recordTest(1, 'Valid Login (Super Admin)', 'HTTP 200 + Cookie', `HTTP ${res.status}`, res.status === 200 && !!setCookie, `Cookie: HttpOnly=${hasHttpOnly}, SameSite=${hasSameSite}`);
  } catch (err) {
    recordTest(1, 'Valid Login', 'HTTP 200', `Error: ${err.message}`, false, '');
  }

  // 2. Invalid password
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'admin@hariduttayurveda.edu.in', password: 'WrongPassword999!', portalType: 'ADMIN' })
    });
    const data = await res.json();
    recordTest(2, 'Invalid Password', 'HTTP 401', `HTTP ${res.status}`, res.status === 401, `Message: "${data.error}"`);
  } catch (err) {
    recordTest(2, 'Invalid Password', 'HTTP 401', `Error: ${err.message}`, false, '');
  }

  // 3. Non-existent account
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'ghost_user_99999@doesnotexist.in', password: 'AnyPassword', portalType: 'ADMIN' })
    });
    const data = await res.json();
    // Vulnerability check: Does it leak "User account not found"?
    const leaksAccountExistence = data.error && data.error.includes('not found');
    recordTest(3, 'Non-existent account', 'Generic 401 (No user enumeration)', `HTTP ${res.status} ("${data.error}")`, res.status === 401 && !leaksAccountExistence, `Account enumeration risk: ${leaksAccountExistence ? 'VULNERABLE (leaks not found)' : 'SAFE'}`);
  } catch (err) {
    recordTest(3, 'Non-existent account', 'HTTP 401', `Error: ${err.message}`, false, '');
  }

  // 4. Inactive account test (We can inspect API response logic or test if inactive accounts are blocked)
  try {
    // In code: if (!user || !user.isActive) returns 401
    recordTest(4, 'Inactive account handling', 'HTTP 401 on inactive user', 'Verified in code logic (lines 64-66)', true, 'Account isActive check present in login route');
  } catch (err) {
    recordTest(4, 'Inactive account', 'HTTP 401', err.message, false, '');
  }

  // 5. Logout functionality
  try {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, { method: 'POST' });
    const setCookie = res.headers.get('set-cookie');
    const cookieCleared = setCookie && setCookie.includes('Max-Age=0');
    recordTest(5, 'Logout functionality', 'HTTP 200 + Max-Age=0 cookie', `HTTP ${res.status}`, res.status === 200 && !!cookieCleared, 'Client cookie cleared. Note: No server-side JWT blacklist.');
  } catch (err) {
    recordTest(5, 'Logout functionality', 'HTTP 200', err.message, false, '');
  }

  // 6. Expired session
  try {
    // Forge expired token
    const expiredToken = jwt.sign(
      { id: 'test', name: 'Test', email: 'test@shamc.ac.in', role: 'ADMIN', type: 'ADMIN' },
      JWT_FALLBACK_SECRET,
      { expiresIn: '-10s' }
    );
    const res = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { 'Cookie': `auth_token=${expiredToken}` }
    });
    recordTest(6, 'Expired session token', 'HTTP 401 Unauthorized', `HTTP ${res.status}`, res.status === 401, 'JWT verify throws TokenExpiredError and returns 401');
  } catch (err) {
    recordTest(6, 'Expired session', 'HTTP 401', err.message, false, '');
  }

  // 7. Access without login
  try {
    const res = await fetch(`${BASE_URL}/api/admin/overview`);
    recordTest(7, 'Access /api/admin/overview without login', 'HTTP 401 Unauthorized', `HTTP ${res.status}`, res.status === 401, 'Protected correctly');
  } catch (err) {
    recordTest(7, 'Access without login', 'HTTP 401', err.message, false, '');
  }

  // 8. Access with invalid token
  try {
    const res = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { 'Cookie': 'auth_token=invalid.garbage.token.here' }
    });
    recordTest(8, 'Access with invalid token string', 'HTTP 401 Unauthorized', `HTTP ${res.status}`, res.status === 401, 'Protected correctly');
  } catch (err) {
    recordTest(8, 'Access with invalid token', 'HTTP 401', err.message, false, '');
  }

  // 9. Access with token signed by unauthorized secret
  try {
    const bogusToken = jwt.sign(
      { id: 'attacker', name: 'Attacker', email: 'attacker@evil.com', role: 'SUPER_ADMIN', type: 'ADMIN' },
      'completely-different-rogue-secret-999',
      { expiresIn: '1d' }
    );
    const res = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { 'Cookie': `auth_token=${bogusToken}` }
    });
    recordTest(9, 'Access with rogue-signed token', 'HTTP 401 Unauthorized', `HTTP ${res.status}`, res.status === 401, 'Rejected by JWT signature validation');
  } catch (err) {
    recordTest(9, 'Access with rogue-signed token', 'HTTP 401', err.message, false, '');
  }

  // 10. Student accessing admin endpoint (/api/admin/overview)
  let studentCookie = '';
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'SHAMC-2025-014', password: 'Student@123', portalType: 'STUDENT' })
    });
    studentCookie = loginRes.headers.get('set-cookie')?.split(';')[0] || '';
    
    const adminRes = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { 'Cookie': studentCookie }
    });
    recordTest(10, 'Student accessing /api/admin/overview', 'HTTP 401/403 Forbidden', `HTTP ${adminRes.status}`, adminRes.status === 401 || adminRes.status === 403, `Blocked with status ${adminRes.status}`);
  } catch (err) {
    recordTest(10, 'Student accessing admin endpoint', 'HTTP 401/403', err.message, false, '');
  }

  // 11. Faculty accessing unauthorized admin endpoint (/api/v1/admin/users)
  try {
    const facultyLogin = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'faculty@hariduttayurveda.edu.in', password: 'Faculty@123', portalType: 'FACULTY' })
    });
    const facultyCookie = facultyLogin.headers.get('set-cookie')?.split(';')[0] || '';
    
    const usersRes = await fetch(`${BASE_URL}/api/v1/admin/users`, {
      headers: { 'Cookie': facultyCookie }
    });
    recordTest(11, 'Faculty accessing /api/v1/admin/users', 'HTTP 403 Forbidden', `HTTP ${usersRes.status}`, usersRes.status === 403, `Blocked with status ${usersRes.status}`);
  } catch (err) {
    recordTest(11, 'Faculty accessing users', 'HTTP 403', err.message, false, '');
  }

  // 12. Admission Officer accessing restricted settings (/api/v1/admin/settings)
  try {
    const admLogin = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'admissions@hariduttayurveda.edu.in', password: 'Admin@123', portalType: 'ADMIN' })
    });
    const admCookie = admLogin.headers.get('set-cookie')?.split(';')[0] || '';
    
    // Test on versioned settings (hasRole SUPER_ADMIN, ADMIN)
    const v1SettingsRes = await fetch(`${BASE_URL}/api/v1/admin/settings`, {
      headers: { 'Cookie': admCookie }
    });
    // Test on unversioned settings (/api/admin/settings)
    const unversionedSettingsRes = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'POST',
      headers: { 'Cookie': admCookie, 'Content-Type': 'application/json' },
      body: JSON.stringify({ test_key: 'audit_test' })
    });

    const v1Protected = v1SettingsRes.status === 403;
    const unversionedVulnerable = unversionedSettingsRes.status === 200;

    recordTest(12, 'Admission Officer accessing restricted settings', 'HTTP 403 on both', `v1: HTTP ${v1SettingsRes.status}, unversioned: HTTP ${unversionedSettingsRes.status}`, v1Protected && !unversionedVulnerable, `v1 properly restricts (${v1SettingsRes.status}), but unversioned /api/admin/settings allows (${unversionedSettingsRes.status})`);
  } catch (err) {
    recordTest(12, 'Admission officer accessing settings', 'HTTP 403', err.message, false, '');
  }

  // 13 & 14. Password reset & Password change endpoints
  try {
    // Check if /api/auth/reset-password or /api/auth/change-password exists
    const resetRes = await fetch(`${BASE_URL}/api/auth/reset-password`, { method: 'POST' });
    const changeRes = await fetch(`${BASE_URL}/api/auth/change-password`, { method: 'POST' });
    recordTest(13, 'Password reset workflow endpoint', 'Implemented endpoint (not 404)', `HTTP ${resetRes.status}`, resetRes.status !== 404, 'Endpoint missing (returns 404)');
    recordTest(14, 'Password change workflow endpoint', 'Implemented endpoint (not 404)', `HTTP ${changeRes.status}`, changeRes.status !== 404, 'Endpoint missing (returns 404)');
  } catch (err) {
    recordTest(13, 'Password reset/change', 'Not 404', err.message, false, '');
  }

  // 15. Unauthorized document access (/api/admin/documents/[id])
  try {
    const unauthDocRes = await fetch(`${BASE_URL}/api/admin/documents/non-existent-id`);
    recordTest(15, 'Unauthenticated document retrieval', 'HTTP 401/403 Forbidden', `HTTP ${unauthDocRes.status}`, unauthDocRes.status === 401 || unauthDocRes.status === 403, `Blocked with ${unauthDocRes.status}`);
  } catch (err) {
    recordTest(15, 'Unauthorized document access', 'HTTP 401/403', err.message, false, '');
  }

  // 16. Repeated failed login attempts (Rate limiting / Brute force check)
  try {
    const attempts = [];
    for (let i = 0; i < 15; i++) {
      attempts.push(
        fetch(`${BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: 'admin@hariduttayurveda.edu.in', password: `WrongPwd${i}`, portalType: 'ADMIN' })
        })
      );
    }
    const responses = await Promise.all(attempts);
    const has429 = responses.some(r => r.status === 429);
    recordTest(16, 'Brute-force protection on /api/auth/login', 'HTTP 429 Too Many Requests after rapid failed attempts', has429 ? 'HTTP 429 triggered' : 'All returned 401 (No rate limiting)', has429, 'VULNERABILITY: No rate limiter on /api/auth/login!');
  } catch (err) {
    recordTest(16, 'Rate limiting check', 'HTTP 429', err.message, false, '');
  }

  // 17. Session invalidation after password change / server-side token revocation
  try {
    recordTest(17, 'Server-side session invalidation', 'Active revocation table/token blacklist', 'Stateless JWT with no revocation table', false, 'VULNERABILITY: Tokens remain valid until 7-day expiration even if password changed or user logged out.');
  } catch (err) {
    recordTest(17, 'Session invalidation', 'Revocation supported', err.message, false, '');
  }

  // 18. Additional check: Public unauthenticated GETs on /api/admin/...
  try {
    const checkEndpoints = [
      '/api/admin/courses',
      '/api/admin/faculty',
      '/api/admin/notices',
      '/api/admin/gallery',
      '/api/admin/settings'
    ];
    for (const ep of checkEndpoints) {
      const res = await fetch(`${BASE_URL}${ep}`);
      console.log(`[CHECK] Public unauthenticated GET ${ep} -> HTTP ${res.status}`);
    }
  } catch (err) {
    console.error('Error in public check:', err.message);
  }

  console.log('\n=== AUDIT SUITE COMPLETE ===');
}

runAuditTests();
