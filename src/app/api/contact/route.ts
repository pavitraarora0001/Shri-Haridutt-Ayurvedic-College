import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        phone: phone || '',
        subject: subject || 'General Institutional Enquiry',
        message,
        status: 'UNREAD',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your message has been delivered to our administrative office.',
    });
  } catch (error: any) {
    console.error('Contact submit error:', error);
    return NextResponse.json(
      { error: 'Failed to record message.' },
      { status: 500 }
    );
  }
}
