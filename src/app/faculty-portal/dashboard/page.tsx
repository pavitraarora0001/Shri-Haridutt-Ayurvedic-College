'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCheck, Stethoscope, BookOpen, Calendar, LogOut, CheckCircle2, Bell } from 'lucide-react';

export default function FacultyDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [faculty, setFaculty] = useState<any>({
    name: 'Dr. Vaidya Kripashankar Vyas',
    designation: 'Medical Superintendent & HOD Panchakarma',
    qualification: 'BAMS, MD (Ayurveda - Panchakarma)',
    experienceYears: 19,
    specialization: 'Authentic Kerala Panchakarma, Neurological Rehabilitation',
  });
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const loadFacultyProfile = async () => {
      try {
        const res = await fetch('/api/faculty/profile');
        if (!res.ok) {
          router.push('/faculty-portal/login');
          return;
        }
        const data = await res.json();
        if (data.faculty) setFaculty(data.faculty);
        if (data.notices) setNotices(data.notices);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadFacultyProfile();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/faculty-portal/login');
  };

  const initials = faculty.name
    ? faculty.name.replace(/^(Dr\.|Prof\.|Vaidya|\(Dr\.\))\s*/gi, '').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'KV';

  return (
    <div className="py-12 bg-[#F6F2E9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#173D32] text-white p-6 sm:p-8 rounded-lg border-2 border-[#C5A46D] shadow-luxury flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#0F2821] border-2 border-[#C5A46D] flex items-center justify-center text-[#C5A46D] text-xl font-serif font-bold shadow-gold">
              {initials}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Clinical Faculty Profile
              </span>
              <h1 className="font-serif text-2xl font-bold">{faculty.name}</h1>
              <p className="text-xs text-[#81917A]">{faculty.designation} • {faculty.qualification}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-rose-900/80 hover:bg-rose-900 text-rose-200 border border-rose-700 transition-colors flex items-center self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Clinical Roster & Teaching Timetable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#173D32] flex items-center">
              <Stethoscope className="w-5 h-5 text-[#C5A46D] mr-2" />
              Daily Hospital OPD & IPD Rounds
            </h3>
            <div className="space-y-3 text-xs text-[#342B25]">
              <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block">Panchakarma OPD Chamber 1:</span>
                <span className="text-[#81917A]">Mon–Fri: 9:00 AM – 1:00 PM (Avg. 45 patients/day)</span>
              </div>
              <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block">Inpatient Bedside Rounds (IPD):</span>
                <span className="text-[#81917A]">Daily: 2:00 PM – 3:30 PM with Final Year BAMS Interns</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#173D32] flex items-center">
              <BookOpen className="w-5 h-5 text-[#C5A46D] mr-2" />
              Academic Lecture Plan (This Week)
            </h3>
            <div className="space-y-3 text-xs text-[#342B25]">
              <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block">BAMS Final Year:</span>
                <span className="text-[#81917A]">Classical Basti Vyapad and Management (Tue, 10:00 AM)</span>
              </div>
              <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block">PG Kayachikitsa Residency Seminar:</span>
                <span className="text-[#81917A]">Neuro-rehabilitation Protocols in Vatavyadhi (Thu, 3:30 PM)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
