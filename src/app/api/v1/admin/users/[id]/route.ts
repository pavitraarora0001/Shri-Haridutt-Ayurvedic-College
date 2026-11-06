import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  const targetUser = await UsersService.getUserById(id);
  if (!targetUser) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: targetUser });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await UsersService.updateUser(id, body);

    await AuditService.logAction({
      action: 'UPDATE_USER',
      entity: 'User',
      entityId: id,
      details: `Updated user profile/role for ${updated.email}`,
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
  if (user.id === id) {
    return NextResponse.json({ success: false, error: 'Cannot deactivate your own active session.' }, { status: 400 });
  }

  await UsersService.deleteUser(id);
  await AuditService.logAction({
    action: 'DEACTIVATE_USER',
    entity: 'User',
    entityId: id,
    details: `User ${id} deactivated`,
    performedBy: user.id,
  });

  return NextResponse.json({ success: true, message: 'User account deactivated successfully.' });
}
