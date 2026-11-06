import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { GalleryService } from '@/modules/gallery/gallery.service';

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  await GalleryService.deleteItem(id);
  return NextResponse.json({ success: true, message: 'Gallery item removed.' });
}
