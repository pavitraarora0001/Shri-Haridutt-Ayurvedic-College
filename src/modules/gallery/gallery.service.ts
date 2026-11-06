import prisma from '@/lib/prisma';

export class GalleryService {
  static async listCategories() {
    return prisma.galleryCategory.findMany({
      include: {
        _count: {
          select: { items: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  static async listItems(options: { category?: string; publishedOnly?: boolean } = {}) {
    const where: any = {};
    if (options.publishedOnly !== false) where.isPublished = true;
    if (options.category && options.category !== 'All') {
      where.category = options.category;
    }

    return prisma.galleryItem.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  static async createItem(data: {
    title: string;
    category: string;
    imageUrl: string;
    caption?: string;
    order?: number;
  }) {
    return prisma.galleryItem.create({
      data: {
        title: data.title,
        category: data.category,
        imageUrl: data.imageUrl,
        caption: data.caption || null,
        order: data.order ? Number(data.order) : 0,
        isPublished: true,
      },
    });
  }

  static async deleteItem(id: string) {
    return prisma.galleryItem.delete({ where: { id } });
  }
}
