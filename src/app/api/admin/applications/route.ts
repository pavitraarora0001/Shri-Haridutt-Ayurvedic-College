import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { sendStatusUpdateEmail } from '@/lib/email';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
  }

  const applications = await prisma.admissionApplication.findMany({
    include: {
      documents: {
        select: {
          id: true,
          documentType: true,
          originalName: true,
          mimeType: true,
          fileSize: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ applications });
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, adminNotes } = await req.json();

    const updated = await prisma.admissionApplication.update({
      where: { id },
      data: {
        status,
        adminNotes,
      },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_APPLICATION_STATUS',
        entity: 'AdmissionApplication',
        entityId: id,
        details: `Updated status to ${status}. Notes: ${adminNotes || 'None'}`,
        performedBy: user.id,
      },
    });

    // Dispatch status update email to candidate
    try {
      await sendStatusUpdateEmail(
        updated.email,
        updated.fullName,
        updated.applicationNumber,
        updated.status,
        updated.adminNotes || undefined
      );
    } catch (e) {
      console.error('Non-blocking status update email error:', e);
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (err: any) {
    console.error('Update application error:', err);
    return NextResponse.json({ error: 'Failed to update application.' }, { status: 500 });
  }
}
