import { NextResponse } from 'next/server';
import { AcademicsService } from '@/modules/academics/academics.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const departments = await AcademicsService.listDepartments();
  return NextResponse.json({
    success: true,
    count: departments.length,
    data: departments,
  });
}
