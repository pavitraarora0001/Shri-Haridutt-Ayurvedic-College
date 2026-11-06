import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { FacultyService } from '@/modules/faculty/faculty.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const faculty = await FacultyService.createFaculty(body);

    await AuditService.logAction({
      action: 'ADD_FACULTY',
      entity: 'Faculty',
      entityId: faculty.id,
      details: `Added faculty ${faculty.name} (${faculty.facultyId})`,
      performedBy: user.id,
    });

    return NextResponse.json({ success: true, data: faculty }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
