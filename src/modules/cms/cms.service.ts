import prisma from '@/lib/prisma';

export class CmsService {
  // ==================== NOTICES ====================

  static async listNotices(options: { publishedOnly?: boolean; category?: string } = {}) {
    const where: any = {};
    if (options.publishedOnly) where.isPublished = true;
    if (options.category) where.category = options.category;

    return prisma.notice.findMany({
      where,
      orderBy: [{ isPinned: 'desc' }, { date: 'desc' }, { createdAt: 'desc' }],
    });
  }

  static async createNotice(data: {
    title: string;
    category: string;
    date?: string;
    fileUrl?: string;
    isPinned?: boolean;
    isPublished?: boolean;
  }) {
    return prisma.notice.create({
      data: {
        title: data.title,
        category: data.category,
        date: data.date || new Date().toISOString().split('T')[0],
        fileUrl: data.fileUrl || null,
        isPinned: Boolean(data.isPinned),
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      },
    });
  }

  static async updateNotice(id: string, data: Partial<{
    title: string;
    category: string;
    date: string;
    fileUrl: string | null;
    isPinned: boolean;
    isPublished: boolean;
  }>) {
    return prisma.notice.update({
      where: { id },
      data,
    });
  }

  static async deleteNotice(id: string) {
    return prisma.notice.delete({ where: { id } });
  }

  // ==================== NEWS & EVENTS ====================

  static async listNews(options: { publishedOnly?: boolean } = {}) {
    const where: any = {};
    if (options.publishedOnly) where.isPublished = true;
    return prisma.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });
  }

  static async getNewsBySlug(slug: string) {
    return prisma.news.findUnique({
      where: { slug },
    });
  }

  static async createNews(data: {
    title: string;
    slug?: string;
    summary: string;
    content: string;
    category: string;
    imageUrl: string;
    isFeatured?: boolean;
  }) {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return prisma.news.create({
      data: {
        title: data.title,
        slug,
        summary: data.summary,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl,
        isFeatured: Boolean(data.isFeatured),
        isPublished: true,
      },
    });
  }

  static async listEvents(options: { upcomingOnly?: boolean } = {}) {
    const where: any = { isPublished: true };
    if (options.upcomingOnly) where.isUpcoming = true;
    return prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
    });
  }

  // ==================== WEBSITE PAGES & CMS ====================

  static async getPageBySlug(slug: string) {
    return prisma.websitePage.findUnique({
      where: { slug },
    });
  }

  static async updatePageContent(slug: string, data: { title?: string; content: string; metaTitle?: string; metaDesc?: string }) {
    return prisma.websitePage.upsert({
      where: { slug },
      update: data,
      create: {
        slug,
        title: data.title || slug,
        content: data.content,
        metaTitle: data.metaTitle || null,
        metaDesc: data.metaDesc || null,
        isPublished: true,
      },
    });
  }

  // ==================== SETTINGS ====================

  static async getPublicSettings(): Promise<Record<string, string>> {
    const settings = await prisma.websiteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });
    return map;
  }

  static async getAllSettings() {
    return prisma.websiteSetting.findMany({
      orderBy: { key: 'asc' },
    });
  }

  static async updateSettings(keyValues: Record<string, string>) {
    const results = [];
    for (const [key, value] of Object.entries(keyValues)) {
      const updated = await prisma.websiteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
      results.push(updated);
    }
    return results;
  }

  // ==================== CONTACT ENQUIRIES ====================

  static async createContactMessage(data: {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    return prisma.contactMessage.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: 'UNREAD',
      },
    });
  }
}
