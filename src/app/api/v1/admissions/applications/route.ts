import { NextResponse } from 'next/server';
import { AdmissionsService } from '@/modules/admissions/admissions.service';
import { AuthService } from '@/modules/auth/auth.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = await AuthService.checkRateLimit(`apply_${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many application submissions from this IP. Please wait.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Required fields validation
    const required = [
      'fullName',
      'fatherName',
      'motherName',
      'dob',
      'gender',
      'email',
      'phone',
      'category',
      'previousSchool',
      'qualification',
      'marksPercentage',
      'address',
      'city',
      'state',
      'pincode',
    ];

    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const application = await AdmissionsService.createApplication(body);

    return NextResponse.json({
      success: true,
      message: 'Admission application successfully submitted to the Directorate.',
      data: {
        applicationNumber: application.applicationNumber,
        fullName: application.fullName,
        courseCode: application.courseCode,
        status: application.status,
        createdAt: application.createdAt,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit admission application.' },
      { status: 400 }
    );
  }
}
