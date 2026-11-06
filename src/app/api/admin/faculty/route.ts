import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const faculty = await prisma.faculty.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json({ faculty });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.name || !data.designation || !data.qualification || !data.email) {
      return NextResponse.json({ error: 'Name, designation, qualification, and email are mandatory.' }, { status: 400 });
    }

    const count = await prisma.faculty.count();
    const facultyId = `SHAMC-FAC-${String(count + 101).padStart(3, '0')}`;

    const member = await prisma.faculty.create({
      data: {
        facultyId,
        name: data.name.trim(),
        designation: data.designation.trim(),
        qualification: data.qualification.trim(),
        experienceYears: parseInt(data.experienceYears) || 5,
        specialization: data.specialization || 'Classical Ayurveda',
        email: data.email.trim().toLowerCase(),
        phone: data.phone || null,
        bio: data.bio || '',
        image: data.image || 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
        isHOD: Boolean(data.isHOD),
        isLeadership: Boolean(data.isLeadership),
        order: parseInt(data.order) || count + 1,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_FACULTY',
        entity: 'Faculty',
        entityId: member.id,
        details: `Created faculty member ${member.name}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, faculty: member });
  } catch (error: any) {
    console.error('Faculty create error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create faculty member.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: 'Faculty ID required.' }, { status: 400 });

    const member = await prisma.faculty.update({
      where: { id: data.id },
      data: {
        name: data.name,
        designation: data.designation,
        qualification: data.qualification,
        experienceYears: parseInt(data.experienceYears),
        specialization: data.specialization,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        image: data.image,
        isHOD: data.isHOD,
        isLeadership: data.isLeadership,
        order: parseInt(data.order),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_FACULTY',
        entity: 'Faculty',
        entityId: member.id,
        details: `Updated faculty ${member.name}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, faculty: member });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update faculty profile.' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Faculty ID required.' }, { status: 400 });

    await prisma.faculty.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_FACULTY',
        entity: 'Faculty',
        entityId: id,
        details: `Deleted faculty ID ${id}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete faculty member.' }, { status: 500 });
  }
}
