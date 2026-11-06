import { NextResponse } from 'next/server';
import { AdmissionsService } from '@/modules/admissions/admissions.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const applicationNumber = searchParams.get('appNo') || searchParams.get('applicationNumber');

  if (!applicationNumber) {
    return NextResponse.json(
      { success: false, error: 'Application number (appNo) parameter is required.' },
      { status: 400 }
    );
  }

  const app = await AdmissionsService.getApplicationByNumber(applicationNumber.trim());

  if (!app) {
    return NextResponse.json(
      { success: false, error: 'Application record not found. Please check your reference number.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      applicationNumber: app.applicationNumber,
      fullName: app.fullName,
      courseCode: app.courseCode,
      status: app.status,
      category: app.category,
      neetScore: app.neetScore,
      documentsCount: app.documents?.length || 0,
      verifiedDocuments: app.documents?.filter((d: any) => d.isVerified).length || 0,
      adminNotes: app.adminNotes || null,
      submittedAt: app.createdAt,
      statusHistory: app.statusHistory,
    },
  });
}
