import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enquiries = await prisma.admissionEnquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ enquiries });
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'ID and status required.' }, { status: 400 });

    const updated = await prisma.admissionEnquiry.update({
      where: { id },
      data: { status },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_ENQUIRY_STATUS',
        entity: 'AdmissionEnquiry',
        entityId: id,
        details: `Updated enquiry status to ${status}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update enquiry status.' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Enquiry ID required.' }, { status: 400 });

    await prisma.admissionEnquiry.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_ENQUIRY',
        entity: 'AdmissionEnquiry',
        entityId: id,
        details: `Deleted enquiry ID ${id}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete enquiry.' }, { status: 500 });
  }
}
