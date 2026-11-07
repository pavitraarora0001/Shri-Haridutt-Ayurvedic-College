import { NextResponse } from 'next/server';
import { AdmissionsService } from '@/modules/admissions/admissions.service';
import { AuthService } from '@/modules/auth/auth.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  // Anti-enumeration Rate Limiter (Max 10 requests per minute per IP)
  const rateLimit = AuthService.checkRateLimit(`v1_admissions_status:${clientIp}`, 10, 60000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many lookup attempts. Please wait ${rateLimit.retryAfterSec || 60} seconds before retrying.`,
      },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const applicationNumber = searchParams.get('appNo') || searchParams.get('applicationNumber');
  const verifier = searchParams.get('verify') || searchParams.get('phone') || searchParams.get('email');

  if (!applicationNumber) {
    return NextResponse.json(
      { success: false, error: 'Application number (appNo) parameter is required.' },
      { status: 400 }
    );
  }

  if (!verifier) {
    return NextResponse.json(
      {
        success: false,
        error: 'For student data privacy, application verification requires registered Mobile or Email (verify=...).',
        requiresVerification: true,
      },
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

  // Validate ownership match
  const cleanVerifier = verifier.trim().toLowerCase();
  const phoneMatch = app.phone && app.phone.trim() === verifier.trim();
  const emailMatch = app.email && app.email.trim().toLowerCase() === cleanVerifier;
  const dobMatch = app.dob && app.dob.trim() === verifier.trim();

  if (!phoneMatch && !emailMatch && !dobMatch) {
    return NextResponse.json(
      { success: false, error: 'Verification failed. The provided contact detail does not match the application record.' },
      { status: 403 }
    );
  }

  // Return sanitized dossier strictly omitting internal staff notes and storage keys
  return NextResponse.json({
    success: true,
    data: {
      applicationNumber: app.applicationNumber,
      fullName: app.fullName,
      courseCode: app.courseCode,
      status: app.status,
      category: app.category,
      documentsCount: app.documents?.length || 0,
      verifiedDocuments: app.documents?.filter((d: any) => d.isVerified).length || 0,
      submittedAt: app.createdAt,
      statusHistory: app.statusHistory,
    },
  });
}
