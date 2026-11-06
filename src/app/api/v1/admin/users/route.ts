import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized administrative access.' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const search = searchParams.get('search') || undefined;
  const role = searchParams.get('role') || undefined;

  const result = await UsersService.listUsers({ page, limit, search, role });
  return NextResponse.json({ success: true, ...result });
}

export async function POST(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Only Super Administrators can provision user accounts.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ success: false, error: 'Name, email, and password are required.' }, { status: 400 });
    }

    const newUser = await UsersService.createUser(body);
    await AuditService.logAction({
      action: 'PROVISION_USER',
      entity: 'User',
      entityId: newUser.id,
      details: `Provisioned user ${newUser.email} with role ${newUser.role}`,
      performedBy: user.id,
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to create user.' }, { status: 400 });
  }
}
