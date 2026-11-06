import { NextResponse } from 'next/server';
import { FacultyService } from '@/modules/faculty/faculty.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const leadership = await FacultyService.listFaculty({ isLeadership: true });
  return NextResponse.json({
    success: true,
    data: leadership,
  });
}
