import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendAdmissionConfirmationEmail, sendAdminAdmissionAlert } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      fatherName,
      motherName,
      dob,
      gender,
      email,
      phone,
      category,
      neetRollNo,
      neetScore,
      neetRank,
      previousSchool,
      qualification,
      marksPercentage,
      courseCode,
      address,
      city,
      state,
      pincode,
      documents = [],
    } = body;

    // Strict Server-Side Validation
    if (!fullName || !email || !phone || !qualification || !marksPercentage) {
      return NextResponse.json(
        { error: 'Please provide all mandatory personal, academic, and contact fields.' },
        { status: 400 }
      );
    }

    // Duplicate submission protection
    const existingApplication = await prisma.admissionApplication.findFirst({
      where: {
        OR: [
          { email: email.trim().toLowerCase() },
          { phone: phone.trim() },
          ...(neetRollNo ? [{ neetRollNo: neetRollNo.trim() }] : []),
        ],
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          error: `An admission application with this email, phone, or NEET Roll No already exists (Ref #${existingApplication.applicationNumber}). Please check your application status on the tracking portal.`,
          existingRef: existingApplication.applicationNumber,
        },
        { status: 409 }
      );
    }

    // Generate Application Reference Number
    const count = await prisma.admissionApplication.count();
    const applicationNumber = `HC-AYUR-2026-${String(count + 201).padStart(4, '0')}`;

    // Execute application creation with uploaded documents relation
    const application = await prisma.admissionApplication.create({
      data: {
        applicationNumber,
        fullName: fullName.trim(),
        fatherName: fatherName || '',
        motherName: motherName || '',
        dob: dob || '',
        gender: gender || 'Other',
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        category: category || 'GENERAL',
        neetRollNo: neetRollNo ? neetRollNo.trim() : null,
        neetScore: neetScore ? parseInt(neetScore) : null,
        neetRank: neetRank ? parseInt(neetRank) : null,
        previousSchool: previousSchool || '',
        qualification: qualification || '10+2 (PCB)',
        marksPercentage: parseFloat(marksPercentage),
        courseCode: courseCode || 'BAMS',
        address: address || '',
        city: city || '',
        state: state || 'Rajasthan',
        pincode: pincode || '',
        status: 'SUBMITTED',
        documents: {
          create: documents.map((doc: any) => ({
            documentType: doc.documentType || 'GENERAL_DOCUMENT',
            fileName: doc.fileName,
            originalName: doc.originalName || 'document.pdf',
            mimeType: doc.mimeType || 'application/pdf',
            fileSize: doc.fileSize || 0,
            storagePath: doc.storagePath,
          })),
        },
      },
      include: {
        documents: true,
      },
    });

    // Asynchronously dispatch luxury branded emails
    try {
      await sendAdmissionConfirmationEmail(
        application.email,
        application.fullName,
        application.applicationNumber,
        application.courseCode === 'BAMS' ? 'Bachelor of Ayurvedic Medicine & Surgery (BAMS)' : application.courseCode
      );
      await sendAdminAdmissionAlert(application);
    } catch (emailErr) {
      console.error('Email dispatch non-blocking error:', emailErr);
    }

    return NextResponse.json({
      success: true,
      applicationNumber: application.applicationNumber,
      message: 'Application dossier submitted successfully.',
    });
  } catch (error: any) {
    console.error('Application submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please ensure all values are valid.' },
      { status: 500 }
    );
  }
}
