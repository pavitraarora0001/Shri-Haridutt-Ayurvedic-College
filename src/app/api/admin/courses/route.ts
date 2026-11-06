import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ courses });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.code || !data.title || !data.duration || !data.intake) {
      return NextResponse.json({ error: 'Course code, title, duration, and intake are mandatory.' }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        code: data.code.toUpperCase().trim(),
        title: data.title.trim(),
        degree: data.degree || 'Undergraduate',
        duration: data.duration,
        intake: parseInt(data.intake) || 60,
        eligibility: data.eligibility || '10+2 with PCB & NEET Qualified',
        description: data.description || '',
        syllabusOverview: data.syllabusOverview || '',
        careerOpportunities: data.careerOpportunities || '',
        feePerYear: data.feePerYear || '₹2,25,000 / Year',
        isApproved: data.isApproved ?? true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_COURSE',
        entity: 'Course',
        entityId: course.id,
        details: `Created course ${course.code}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    console.error('Course create error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create course.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: 'Course ID is required.' }, { status: 400 });

    const course = await prisma.course.update({
      where: { id: data.id },
      data: {
        title: data.title,
        degree: data.degree,
        duration: data.duration,
        intake: parseInt(data.intake),
        eligibility: data.eligibility,
        description: data.description,
        syllabusOverview: data.syllabusOverview,
        careerOpportunities: data.careerOpportunities,
        feePerYear: data.feePerYear,
        isApproved: data.isApproved,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_COURSE',
        entity: 'Course',
        entityId: course.id,
        details: `Updated course ${course.code}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update course.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Course ID required.' }, { status: 400 });

    await prisma.course.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_COURSE',
        entity: 'Course',
        entityId: id,
        details: `Deleted course ID ${id}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete course.' }, { status: 500 });
  }
}
