import prisma from '@/lib/prisma';

export class AuditService {
  static async logAction(data: {
    action: string;
    entity: string;
    entityId?: string;
    details?: string;
    performedBy?: string;
  }) {
    try {
      return await prisma.auditLog.create({
        data: {
          action: data.action,
          entity: data.entity,
          entityId: data.entityId || null,
          details: data.details || null,
          performedBy: data.performedBy || null,
        },
      });
    } catch (err) {
      console.error('Failed to persist audit log:', err);
      return null;
    }
  }

  static async listRecentLogs(limit: number = 20) {
    return prisma.auditLog.findMany({
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
