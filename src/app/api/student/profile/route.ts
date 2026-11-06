import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized student session.' }, { status: 401 });
    }

    const student = await prisma.student.findFirst({
      where: {
        OR: [{ id: user.id }, { email: user.email }],
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student record not found.' }, { status: 404 });
    }

    const notices = await prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });

    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        mobile: student.mobile,
        dob: student.dob,
        gender: student.gender,
        bloodGroup: student.bloodGroup,
        courseCode: student.courseCode,
        batch: student.batch,
        address: student.address,
        attendancePercentage: student.attendancePercentage,
        feesPaid: student.feesPaid,
      },
      notices,
    });
  } catch (err: any) {
    console.error('Student profile error:', err);
    return NextResponse.json({ error: 'Failed to load student profile.' }, { status: 500 });
  }
}
