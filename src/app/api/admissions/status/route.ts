import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
      return NextResponse.json(
        { error: 'Please enter an Application Number, Mobile Number, or Registered Email.' },
        { status: 400 }
      );
    }

    const application = await prisma.admissionApplication.findFirst({
      where: {
        OR: [
          { applicationNumber: { equals: query } },
          { email: { equals: query.toLowerCase() } },
          { phone: { equals: query } },
        ],
      },
      include: {
        documents: {
          select: {
            id: true,
            documentType: true,
            originalName: true,
            fileSize: true,
            createdAt: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'No matching application dossier found for the provided details.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application: {
        applicationNumber: application.applicationNumber,
        fullName: application.fullName,
        courseCode: application.courseCode,
        category: application.category,
        neetScore: application.neetScore,
        neetRank: application.neetRank,
        marksPercentage: application.marksPercentage,
        status: application.status,
        submittedAt: application.createdAt,
        adminNotes: application.adminNotes,
        documents: application.documents,
      },
    });
  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'An error occurred while retrieving application status.' },
      { status: 500 }
    );
  }
}
