import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'FACULTY' && user.type !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized faculty session.' }, { status: 401 });
    }

    const faculty = await prisma.faculty.findFirst({
      where: {
        OR: [{ email: user.email }, { name: user.name }],
      },
    });

    const defaultDoctor = faculty || {
      facultyId: 'SHAMC-FAC-003',
      name: user.name || 'Dr. Vaidya Kripashankar Vyas',
      designation: 'Medical Superintendent & HOD Panchakarma',
      qualification: 'BAMS, MD (Ayurveda - Panchakarma)',
      experienceYears: 19,
      specialization: 'Authentic Kerala Panchakarma, Neurological Rehabilitation',
      email: user.email,
    };

    const notices = await prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });

    return NextResponse.json({
      success: true,
      faculty: defaultDoctor,
      notices,
    });
  } catch (err: any) {
    console.error('Faculty profile error:', err);
    return NextResponse.json({ error: 'Failed to load faculty profile.' }, { status: 500 });
  }
}
