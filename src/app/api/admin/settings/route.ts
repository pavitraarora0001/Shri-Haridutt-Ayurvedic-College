import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const settings = await prisma.websiteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return NextResponse.json({ settings: settingsMap });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data: Record<string, string> = await req.json();

    // Synchronize synonymous keys for consistent cross-system hydration
    if (data.contact_phone && !data.admissions_helpline) {
      data.admissions_helpline = data.contact_phone;
    }
    if (data.contact_email && !data.admissions_email) {
      data.admissions_email = data.contact_email;
    }

    for (const [key, value] of Object.entries(data)) {
      await prisma.websiteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_WEBSITE_SETTINGS',
        entity: 'WebsiteSetting',
        details: `Updated ${Object.keys(data).length} settings keys`,
        performedBy: user.id,
      },
    });

    // Instant cache purge across all public layouts & pages
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/contact');
      revalidatePath('/about');
      revalidatePath('/hospital');
      revalidatePath('/infrastructure/hospital');
      revalidatePath('/mandatory-disclosures');
      revalidatePath('/admissions');
      revalidatePath('/admissions/apply');
      revalidatePath('/miscellaneous');
      revalidatePath('/news-events');
      revalidatePath('/notices');
      revalidatePath('/gallery');
      revalidatePath('/academics');
    } catch (revalidateErr) {
      console.warn('Cache revalidation notice:', revalidateErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update settings.' }, { status: 500 });
  }
}
