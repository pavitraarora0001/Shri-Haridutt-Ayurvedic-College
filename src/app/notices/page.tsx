import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { NOTICES } from '@/lib/data';
import { prisma } from '@/lib/prisma';
import { Bell, FileText, Pin, Download, Calendar } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NoticesPage() {
  let displayNotices = NOTICES;

  try {
    const dbNotices = await prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    });
    if (dbNotices && dbNotices.length > 0) {
      displayNotices = dbNotices.map((n) => ({
        id: n.id,
        title: n.title,
        category: n.category,
        date: n.date,
        fileUrl: n.fileUrl || undefined,
        isPinned: n.isPinned,
      }));
    }
  } catch (err) {
    console.error('Error fetching notices from DB:', err);
  }

  return (
    <div>
      <PageHeader
        title="Official Circulars & Academic Notices"
        subtitle="Notifications Directorate • Examinations & Counseling"
        crumbs={[{ label: 'Notices' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-[#173D32]" />
              <div>
                <h2 className="font-serif text-lg font-bold text-[#173D32]">Academic Notice Board</h2>
                <p className="text-xs text-[#81917A]">Official circulars authenticated by the Office of the Principal.</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded bg-[#173D32] text-[#C5A46D]">
              Live Board 2026
            </span>
          </div>

          <div className="space-y-4">
            {displayNotices.map((notice) => (
              <div
                key={notice.id}
                className={`p-6 rounded-lg border transition-all bg-white shadow-card ${
                  notice.isPinned ? 'border-[#C5A46D] ring-1 ring-[#C5A46D]/30' : 'border-[#C5A46D]/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    {notice.isPinned && (
                      <span className="flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#173D32] text-[#C5A46D]">
                        <Pin className="w-3 h-3 mr-1" /> Pinned Notice
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-[#F6F2E9] text-[#173D32] border border-[#C5A46D]/30">
                      {notice.category}
                    </span>
                  </div>

                  <span className="text-xs text-[#81917A] flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" /> {notice.date}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#173D32] leading-snug">
                  {notice.title}
                </h3>

                {notice.fileUrl && (
                  <div className="mt-4 pt-3 border-t border-[#C5A46D]/20 flex items-center justify-between text-xs">
                    <span className="text-[#81917A] flex items-center">
                      <FileText className="w-4 h-4 mr-1 text-[#C5A46D]" /> PDF Document Attached
                    </span>
                    <a
                      href={notice.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#173D32] hover:text-[#C5A46D] flex items-center"
                    >
                      <Download className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" /> View / Download PDF
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
