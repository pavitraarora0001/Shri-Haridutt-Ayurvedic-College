import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signAccessToken } from '@/lib/auth';
import { AuthService } from '@/modules/auth/auth.service';

export async function POST(req: Request) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || undefined;

    const body = await req.json();
    const identifier = (body.identifier || body.email || body.username || '').toString().trim();
    const password = (body.password || '').toString();
    const portalType = body.portalType || 'ADMIN';

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Please provide both username/email and password.' },
        { status: 400 }
      );
    }

    // Enforce database-backed atomic brute-force protection (5 attempts / 15 mins)
    const rateLimit = await AuthService.checkLoginRateLimit(identifier, clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. For institutional security, access is temporarily locked. Please try again in ${
            rateLimit.retryAfterSec || 900
          } seconds.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSec || 900) },
        }
      );
    }

    // 1. Student Portal Permanently Disabled
    if (portalType === 'STUDENT') {
      return NextResponse.json(
        { error: 'Student portal access has been permanently disabled.' },
        { status: 403 }
      );
    }

    // 2. Admin & Faculty Portal Login
    const normalizedIdentifier = identifier.toLowerCase().trim();
    const lookupEmail =
      normalizedIdentifier === 'admin'
        ? 'admin@hariduttayurveda.edu.in'
        : normalizedIdentifier;

    const user = await prisma.user.findUnique({
      where: { email: lookupEmail },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Account not found or deactivated.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    if (portalType === 'FACULTY' && user.role !== 'FACULTY' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Account does not have faculty privileges.' }, { status: 403 });
    }

    await AuthService.resetLoginRateLimit(identifier, clientIp);

    // Create persisted session & refresh token
    const session = await AuthService.createSession(user.id, 'USER', clientIp, userAgent);

    const token = signAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      type: user.role === 'FACULTY' ? 'FACULTY' : 'ADMIN',
      sessionId: session.sessionId,
    });

    const response = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });

    // Short-lived access token cookie (15 mins)
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 mins
      path: '/',
    });

    // Long-lived rotating refresh token cookie (7 days)
    response.cookies.set('refresh_token', session.rawToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Auth login error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Internal server authentication error.' },
      { status: 500 }
    );
  }
}
