import { NextResponse } from 'next/server';
import { GalleryService } from '@/modules/gallery/gallery.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;

  const items = await GalleryService.listItems({ category });
  return NextResponse.json({
    success: true,
    count: items.length,
    data: items,
  });
}
