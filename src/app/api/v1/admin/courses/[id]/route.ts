import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { AcademicsService } from '@/modules/academics/academics.service';
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
    const updated = await AcademicsService.updateCourse(id, body);

    await AuditService.logAction({
      action: 'UPDATE_COURSE',
      entity: 'Course',
      entityId: id,
      details: `Updated course details for ${updated.code}`,
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
  await AcademicsService.deleteCourse(id);

  await AuditService.logAction({
    action: 'DELETE_COURSE',
    entity: 'Course',
    entityId: id,
    details: `Deleted course ${id}`,
    performedBy: user.id,
  });

  return NextResponse.json({ success: true, message: 'Course deleted successfully.' });
}
