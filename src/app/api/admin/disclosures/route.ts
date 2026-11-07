import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const categories = await prisma.disclosureCategory.findMany({
      orderBy: { categoryNumber: 'asc' },
      include: {
        records: {
          orderBy: { order: 'asc' },
          include: {
            documents: true
          }
        },
        documents: true
      }
    });

    const totalCategories = categories.length;
    const totalRecords = categories.reduce((sum, c) => sum + c.records.length, 0);
    const totalDocuments = categories.reduce((sum, c) => sum + c.documents.length, 0);

    return NextResponse.json({
      success: true,
      data: categories,
      stats: {
        totalCategories,
        totalRecords,
        totalDocuments,
        verifiedRate: '100%'
      }
    });
  } catch (error: any) {
    console.error('Admin disclosures GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    if (action === 'CREATE_RECORD') {
      const { categoryId, title, referenceCode, academicYear, status, summary } = body;
      const record = await prisma.disclosureRecord.create({
        data: {
          categoryId,
          title,
          referenceCode,
          academicYear: academicYear || '2026-27',
          status: status || 'VERIFIED',
          summary: summary || ''
        }
      });

      await prisma.auditLog.create({
        data: {
          action: 'CREATE_DISCLOSURE_RECORD',
          entity: 'DisclosureRecord',
          entityId: record.id,
          details: `Created record ${title} in category ${categoryId}`,
          performedBy: user.id
        }
      });

      return NextResponse.json({ success: true, data: record });
    }

    if (action === 'CREATE_DOCUMENT') {
      const { categoryId, recordId, title, documentCode, academicYear, fileUrl, fileType, fileSize } = body;
      const document = await prisma.disclosureDocument.create({
        data: {
          categoryId,
          recordId: recordId || null,
          title,
          documentCode,
          academicYear: academicYear || '2026-27',
          fileUrl,
          fileType: fileType || 'PDF',
          fileSize: fileSize || '1.5 MB',
          isVerified: true,
          isPublic: true
        }
      });

      await prisma.auditLog.create({
        data: {
          action: 'UPLOAD_DISCLOSURE_DOCUMENT',
          entity: 'DisclosureDocument',
          entityId: document.id,
          details: `Uploaded document ${title}`,
          performedBy: user.id
        }
      });

      return NextResponse.json({ success: true, data: document });
    }

    if (action === 'UPDATE_RECORD_STATUS') {
      const { recordId, status } = body;
      const updated = await prisma.disclosureRecord.update({
        where: { id: recordId },
        data: { status }
      });

      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (error: any) {
    console.error('Admin disclosures POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('documentId');
    const recordId = searchParams.get('recordId');

    if (documentId) {
      await prisma.disclosureDocument.delete({ where: { id: documentId } });
      await prisma.auditLog.create({
        data: {
          action: 'DELETE_DISCLOSURE_DOCUMENT',
          entity: 'DisclosureDocument',
          entityId: documentId,
          details: `Deleted disclosure document ${documentId}`,
          performedBy: user.id,
        },
      });
      return NextResponse.json({ success: true });
    }

    if (recordId) {
      await prisma.disclosureRecord.delete({ where: { id: recordId } });
      await prisma.auditLog.create({
        data: {
          action: 'DELETE_DISCLOSURE_RECORD',
          entity: 'DisclosureRecord',
          entityId: recordId,
          details: `Deleted disclosure record ${recordId}`,
          performedBy: user.id,
        },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'documentId or recordId required' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete disclosure item.' }, { status: 500 });
  }
}
