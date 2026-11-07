import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
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

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters long.' }, { status: 400 });
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

    // Hash new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        action: 'CHANGE_PASSWORD',
        entity: 'User',
        entityId: user.id,
        details: 'Admin user updated password credentials',
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, message: 'Password updated successfully.' });
  } catch (error: any) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Failed to update password.' }, { status: 500 });
  }
}
