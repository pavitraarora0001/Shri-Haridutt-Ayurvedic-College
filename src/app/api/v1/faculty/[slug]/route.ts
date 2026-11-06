import { NextResponse } from 'next/server';
import { FacultyService } from '@/modules/faculty/faculty.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const member = await FacultyService.getFacultyById(slug);

  if (!member) {
    return NextResponse.json({ success: false, error: 'Faculty member not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: member,
  });
}
