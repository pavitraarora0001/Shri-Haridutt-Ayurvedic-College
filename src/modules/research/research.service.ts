import prisma from '@/lib/prisma';

export class ResearchService {
  static async listPublications(category?: string) {
    const where: any = {};
    if (category) where.category = category;
    return prisma.researchPublication.findMany({
      where,
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });
  }

  static async getPublicationById(id: string) {
    return prisma.researchPublication.findUnique({
      where: { id },
    });
  }

  static async createPublication(data: {
    title: string;
    authors: string;
    journal: string;
    year: number;
    volume?: string;
    doi?: string;
    abstract: string;
    category: string;
  }) {
    return prisma.researchPublication.create({
      data: {
        title: data.title,
        authors: data.authors,
        journal: data.journal,
        year: Number(data.year),
        volume: data.volume || null,
        doi: data.doi || null,
        abstract: data.abstract,
        category: data.category,
      },
    });
  }

  static async updatePublication(id: string, data: Partial<{
    title: string;
    authors: string;
    journal: string;
    year: number;
    volume: string;
    doi: string;
    abstract: string;
    category: string;
  }>) {
    return prisma.researchPublication.update({
      where: { id },
      data,
    });
  }

  static async deletePublication(id: string) {
    return prisma.researchPublication.delete({ where: { id } });
  }
}
