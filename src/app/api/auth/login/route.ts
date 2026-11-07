import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signJwtToken } from '@/lib/auth';
import { AuthService } from '@/modules/auth/auth.service';

export async function POST(req: Request) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const { identifier, password, portalType } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Please provide both username/email and password.' },
        { status: 400 }
      );
    }

    // Enforce brute-force attack prevention (5 attempts / 15 mins)
    const rateLimit = AuthService.checkLoginRateLimit(identifier, clientIp);
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

    // 1. If logging into Student portal
    if (portalType === 'STUDENT') {
      const student = await prisma.student.findFirst({
        where: {
          OR: [{ studentId: identifier }, { email: identifier }],
        },
      });

      if (!student) {
        return NextResponse.json({ error: 'Invalid student credentials.' }, { status: 401 });
      }

      // Secure hashed password comparison
      const isValid = await bcrypt.compare(password, student.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid student credentials.' }, { status: 401 });
      }

      // Reset login rate limiter on successful authentication
      AuthService.resetLoginRateLimit(identifier, clientIp);

      const token = signJwtToken({
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'STUDENT',
        type: 'STUDENT',
      });

      const response = NextResponse.json({
        success: true,
        user: { name: student.name, role: 'STUDENT', studentId: student.studentId },
      });

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return response;
    }

    // 2. Admin & Faculty Portal Login
    const user = await prisma.user.findUnique({
      where: { email: identifier.toLowerCase().trim() },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Account not found or deactivated.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    // Role check if logging into faculty portal
    if (portalType === 'FACULTY' && user.role !== 'FACULTY' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Account does not have faculty privileges.' }, { status: 403 });
    }

    // Reset login rate limiter on successful authentication
    AuthService.resetLoginRateLimit(identifier, clientIp);

    const token = signJwtToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      type: user.role === 'FACULTY' ? 'FACULTY' : 'ADMIN',
    });

    const response = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Auth login error:', error);
    return NextResponse.json({ error: 'Internal server authentication error.' }, { status: 500 });
  }
}
