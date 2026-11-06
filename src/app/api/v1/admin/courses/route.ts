import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { AcademicsService } from '@/modules/academics/academics.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const course = await AcademicsService.createCourse(body);

    await AuditService.logAction({
      action: 'CREATE_COURSE',
      entity: 'Course',
      entityId: course.id,
      details: `Created course ${course.code}: ${course.title}`,
      performedBy: user.id,
    });

    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
