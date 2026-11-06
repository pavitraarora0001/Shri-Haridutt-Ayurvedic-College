import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEnquiryNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, parentName, mobile, email, programme, previousQualification, message } = body;

    if (!studentName || !mobile || !email) {
      return NextResponse.json(
        { error: 'Student name, mobile number and email are required fields.' },
        { status: 400 }
      );
    }

    // Generate unique Enquiry Number
    const count = await prisma.admissionEnquiry.count();
    const enquiryNumber = `ENQ-2026-${String(count + 101).padStart(4, '0')}`;

    const enquiry = await prisma.admissionEnquiry.create({
      data: {
        enquiryNumber,
        studentName,
        parentName: parentName || 'N/A',
        mobile,
        email,
        programme: programme || 'BAMS (100 Seats)',
        previousQualification: previousQualification || '10+2 (PCB)',
        message: message || '',
        status: 'NEW',
      },
    });

    try {
      await sendEnquiryNotification(enquiry);
    } catch (e) {
      console.error('Non-blocking enquiry email alert error:', e);
    }

    return NextResponse.json({
      success: true,
      enquiryNumber: enquiry.enquiryNumber,
      message: 'Admission enquiry registered successfully.',
    });
  } catch (error: any) {
    console.error('Enquiry error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while saving enquiry.' },
      { status: 500 }
    );
  }
}
