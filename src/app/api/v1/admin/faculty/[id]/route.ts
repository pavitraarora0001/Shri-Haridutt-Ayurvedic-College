import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { FacultyService } from '@/modules/faculty/faculty.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await FacultyService.updateFaculty(id, body);

    await AuditService.logAction({
      action: 'UPDATE_FACULTY',
      entity: 'Faculty',
      entityId: id,
      details: `Updated faculty ${updated.name}`,
      performedBy: user.id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  await FacultyService.deleteFaculty(id);

  await AuditService.logAction({
    action: 'DELETE_FACULTY',
    entity: 'Faculty',
    entityId: id,
    details: `Deleted faculty record ${id}`,
    performedBy: user.id,
  });

  return NextResponse.json({ success: true, message: 'Faculty record deleted.' });
}
