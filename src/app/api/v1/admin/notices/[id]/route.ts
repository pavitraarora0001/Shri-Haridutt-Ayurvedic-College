import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { CmsService } from '@/modules/cms/cms.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await CmsService.updateNotice(id, body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  await CmsService.deleteNotice(id);

  await AuditService.logAction({
    action: 'DELETE_NOTICE',
    entity: 'Notice',
    entityId: id,
    performedBy: user.id,
  });

  return NextResponse.json({ success: true, message: 'Notice deleted successfully.' });
}
