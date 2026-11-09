import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, revokeAllUserSessions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Please provide both current and new password.' }, { status: 400 });
    }

    if (newPassword.length < 10) {
      return NextResponse.json({ error: 'New password must be at least 10 characters long with uppercase, lowercase, numbers, and symbols.' }, { status: 400 });
    }

    if (currentPassword === newPassword) {
      return NextResponse.json({ error: 'New password must be different from current password.' }, { status: 400 });
    }

    // Verify current user from database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'Admin account not located.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, dbUser.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Current password does not match.' }, { status: 400 });
    }

    // Hash new password securely with 12 salt rounds
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Invalidate all active sessions across all devices for this user
    await revokeAllUserSessions(user.id);

    // Record audit log
    await prisma.auditLog.create({
      data: {
        action: 'CHANGE_PASSWORD',
        entity: 'User',
        entityId: user.id,
        details: 'Admin user updated password credentials and revoked all active sessions',
        performedBy: user.id,
      },
    });

    const response = NextResponse.json({
      success: true,
      message: 'Password rotated successfully. All previous sessions have been revoked. Please re-login with your new credentials.'
    });

    // Expire cookies immediately
    response.cookies.set('auth_token', '', { httpOnly: true, maxAge: 0, path: '/' });
    response.cookies.set('refresh_token', '', { httpOnly: true, maxAge: 0, path: '/' });

    return response;
  } catch (error: any) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Failed to update password.' }, { status: 500 });
  }
}
