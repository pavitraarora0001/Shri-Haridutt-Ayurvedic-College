import prisma from '@/lib/prisma';
import { AuthService } from '../auth/auth.service';
import { revokeAllUserSessions } from '@/lib/auth';

export class UsersService {
  static async listUsers(options: { page?: number; limit?: number; search?: string; role?: string } = {}) {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options.role) {
      where.role = options.role;
    }
    if (options.search) {
      where.OR = [
        { name: { contains: options.search } },
        { email: { contains: options.search } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async createUser(data: { name: string; email: string; password: string; role?: string; phone?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new Error('A user account with this email address already exists.');
    }

    const passwordHash = await AuthService.hashPassword(data.password);
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase().trim(),
        password: passwordHash,
        role: data.role || 'STAFF',
        phone: data.phone || null,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  static async updateUser(id: string, data: { name?: string; role?: string; phone?: string; isActive?: boolean; password?: string }) {
    const updatePayload: any = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.role !== undefined) updatePayload.role = data.role;
    if (data.phone !== undefined) updatePayload.phone = data.phone;
    if (data.isActive !== undefined) updatePayload.isActive = data.isActive;
    if (data.password) {
      updatePayload.password = await AuthService.hashPassword(data.password);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updatePayload,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    // Invalidate active sessions if password is changed or account is deactivated
    if (data.password || data.isActive === false) {
      await revokeAllUserSessions(id);
    }

    return updated;
  }

  static async deleteUser(id: string) {
    // Soft deactivate and immediately invalidate all sessions
    await revokeAllUserSessions(id);
    return prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
