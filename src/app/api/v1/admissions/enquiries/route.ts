import { NextResponse } from 'next/server';
import { AdmissionsService } from '@/modules/admissions/admissions.service';
import { AuthService } from '@/modules/auth/auth.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = AuthService.checkRateLimit(`enquiry_${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many enquiry submissions. Please wait one minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    if (!body.studentName || !body.mobile || !body.email || !body.programme) {
      return NextResponse.json(
        { success: false, error: 'Please provide studentName, mobile, email, and programme.' },
        { status: 400 }
      );
    }

    const enquiry = await AdmissionsService.createEnquiry(body);
    return NextResponse.json({
      success: true,
      message: 'Admission enquiry registered successfully. An acknowledgment email has been dispatched.',
      data: enquiry,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error registering enquiry:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
