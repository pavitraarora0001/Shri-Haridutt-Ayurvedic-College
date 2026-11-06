import { NextResponse } from 'next/server';
import { GalleryService } from '@/modules/gallery/gallery.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = await GalleryService.listCategories();
  return NextResponse.json({
    success: true,
    count: categories.length,
    data: categories,
  });
}
