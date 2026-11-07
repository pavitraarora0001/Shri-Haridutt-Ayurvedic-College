import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';
import { AuthService } from '@/modules/auth/auth.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = await AuthService.checkRateLimit(`contact_${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many messages sent. Please wait one minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    if (!body.fullName || !body.email || !body.phone || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: 'All fields (fullName, email, phone, subject, message) are required.' },
        { status: 400 }
      );
    }

    const message = await CmsService.createContactMessage(body);
    return NextResponse.json({
      success: true,
      message: 'Your message has been received by the Institutional Directorate. We will respond promptly.',
      data: { id: message.id, createdAt: message.createdAt },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
