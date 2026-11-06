import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signJwtToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { identifier, password, portalType } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Please provide both username/email and password.' },
        { status: 400 }
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
        return NextResponse.json({ error: 'Student record not found.' }, { status: 401 });
      }

      // Check password
      const isValid = await bcrypt.compare(password, student.password);
      if (!isValid && student.password !== password) {
        return NextResponse.json({ error: 'Invalid student credentials.' }, { status: 401 });
      }

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
      where: { email: identifier },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'User account not found or deactivated.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    // Role check if logging into faculty portal
    if (portalType === 'FACULTY' && user.role !== 'FACULTY' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Account does not have faculty privileges.' }, { status: 403 });
    }

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
