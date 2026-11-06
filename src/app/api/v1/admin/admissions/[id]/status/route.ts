import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { AdmissionsService } from '@/modules/admissions/admissions.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_ADMIN', 'PRINCIPAL'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    if (!body.status) {
      return NextResponse.json({ success: false, error: 'Target status is required.' }, { status: 400 });
    }

    const updated = await AdmissionsService.updateApplicationStatus(
      id,
      body.status,
      user.name || user.email,
      body.remarks
    );

    await AuditService.logAction({
      action: 'UPDATE_ADMISSION_STATUS',
      entity: 'AdmissionApplication',
      entityId: id,
      details: `Status changed to ${body.status} by ${user.name}`,
      performedBy: user.id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
