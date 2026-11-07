import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'ADMISSION_ADMIN',
  'PRINCIPAL',
  'ACADEMIC_ADMIN',
  'CONTENT_MANAGER',
];

const JWT_ISSUER = 'hariduttayurveda.edu.in';
const JWT_AUDIENCE = 'shamc-portal';

async function verifyJwtEdge(token: string, secret: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signatureB64] = parts;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = enc.encode(`${headerB64}.${payloadB64}`);
    const sigBinary = Uint8Array.from(
      atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0)
    );

    const isValid = await crypto.subtle.verify('HMAC', key, sigBinary, data);
    if (!isValid) return null;

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    if (payload.iss && payload.iss !== JWT_ISSUER) return null;
    if (payload.aud && payload.aud !== JWT_AUDIENCE) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public authentication login pages & endpoints
  if (
    pathname === '/admin/login' ||
    pathname === '/faculty-portal/login' ||
    pathname.startsWith('/api/auth/')
  ) {
    return NextResponse.next();
  }

  // Check auth token from HTTP-only cookie or Authorization Bearer header
  const cookieToken = request.cookies.get('auth_token')?.value;
  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const token = cookieToken || bearerToken;

  const secret =
    process.env.JWT_SECRET ||
    (process.env.NODE_ENV === 'production' ? '' : 'dev-ephemeral-jwt-secret-shamc-secure-ayurveda-2026-key');

  const user = token ? await verifyJwtEdge(token, secret) : null;

  const isApi = pathname.startsWith('/api/');

  // 1. Unauthenticated Requests
  if (!user) {
    if (isApi) {
      return NextResponse.json(
        { success: false, error: 'Authentication required for administrative endpoint.' },
        { status: 401 }
      );
    }

    if (pathname.startsWith('/admin')) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith('/faculty-portal')) {
      const loginUrl = new URL('/faculty-portal/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Role-Based Authorization
  if (user) {
    // Admin zone
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin') || pathname.startsWith('/api/v1/admin')) {
      if (!ADMIN_ROLES.includes(user.role)) {
        if (isApi) {
          return NextResponse.json({ success: false, error: 'Forbidden. Insufficient administrative privileges.' }, { status: 403 });
        }
        return NextResponse.redirect(new URL('/admin/login?error=forbidden', request.url));
      }
    }

    // Faculty zone
    if (pathname.startsWith('/faculty-portal')) {
      if (user.role !== 'FACULTY' && user.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/faculty-portal/login?error=forbidden', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/faculty-portal/:path*',
    '/api/admin/:path*',
    '/api/v1/admin/:path*',
  ],
};
