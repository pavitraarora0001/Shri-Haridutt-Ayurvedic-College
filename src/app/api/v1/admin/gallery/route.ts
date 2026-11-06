import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { GalleryService } from '@/modules/gallery/gallery.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const item = await GalleryService.createItem(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
