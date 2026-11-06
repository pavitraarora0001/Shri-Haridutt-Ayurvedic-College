'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  BookOpen,
  FileText,
  LogOut,
  Clock,
  Award,
  Bell,
  Download
} from 'lucide-react';

export default function StudentDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>({
    name: 'Pooja Verma',
    studentId: 'SHAMC-2025-014',
    courseCode: 'BAMS',
    batch: '2025-2030 (Phase II)',
    attendancePercentage: 89.2,
    bloodGroup: 'O+',
    feesPaid: true,
  });
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch('/api/student/profile');
        if (!res.ok) {
          router.push('/student/login');
          return;
        }
        const data = await res.json();
        if (data.student) setStudent(data.student);
        if (data.notices) setNotices(data.notices);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/student/login');
  };

  const initials = student.name
    ? student.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SH';

  return (
    <div className="py-12 bg-[#F6F2E9] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="bg-[#173D32] text-white p-6 sm:p-8 rounded-lg border-2 border-[#C5A46D] shadow-luxury flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#0F2821] border-2 border-[#C5A46D] flex items-center justify-center text-[#C5A46D] text-xl font-serif font-bold shadow-gold">
              {initials}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Scholar Dossier
              </span>
              <h1 className="font-serif text-2xl font-bold">{student.name}</h1>
              <p className="text-xs text-[#81917A]">{student.studentId} • {student.courseCode} ({student.batch})</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-rose-900/80 hover:bg-rose-900 text-rose-200 border border-rose-700 transition-colors flex items-center"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Overall Attendance</span>
            <span className="font-serif text-2xl font-bold text-emerald-800">{student.attendancePercentage}%</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">Compliant (&gt;75% MSR)</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Tuition Fee</span>
            <span className="font-serif text-lg font-bold text-[#173D32]">{student.feesPaid ? 'Cleared' : 'Due'}</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">Annual Academic 2026–27</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Clinical Postings</span>
            <span className="font-serif text-lg font-bold text-[#173D32]">Kayachikitsa OPD</span>
            <span className="text-[10px] text-[#81917A] block mt-0.5">Chamber 4 (Hospital)</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Blood Group</span>
            <span className="font-serif text-lg font-bold text-[#173D32]">{student.bloodGroup}</span>
            <span className="text-[10px] text-[#81917A] block mt-0.5">Verified Medical Card</span>
          </div>
        </div>

        {/* Current Subjects & Study Repository */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#173D32] border-b border-[#C5A46D]/20 pb-3 flex items-center">
              <BookOpen className="w-5 h-5 text-[#C5A46D] mr-2" />
              Phase II Enrolled Subjects & Lecture Notes
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#173D32]">
                    Dravyaguna Vijnana (Materia Medica)
                  </h4>
                  <p className="text-xs text-[#81917A]">Prof. (Dr.) Ramakant Dwivedi • 92% Attendance</p>
                </div>
                <button
                  onClick={() => alert('Downloading Dravyaguna Classical Lecture Notes PDF...')}
                  className="px-3 py-1.5 rounded text-xs bg-[#173D32] text-[#C5A46D] font-medium flex items-center self-start sm:self-auto hover:bg-[#0F2821]"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Notes PDF
                </button>
              </div>

              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#173D32]">
                    Rasa Shastra & Bhaishajya Kalpana
                  </h4>
                  <p className="text-xs text-[#81917A]">Dr. Shrikant Upadhyay • 88% Attendance</p>
                </div>
                <button
                  onClick={() => alert('Downloading Rasa Shastra Laboratory Manual PDF...')}
                  className="px-3 py-1.5 rounded text-xs bg-[#173D32] text-[#C5A46D] font-medium flex items-center self-start sm:self-auto hover:bg-[#0F2821]"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Practical Manual
                </button>
              </div>

              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#173D32]">
                    Roga Nidan & Vikriti Vijnana
                  </h4>
                  <p className="text-xs text-[#81917A]">Dr. Rajeshwar Prasad Joshi • 87% Attendance</p>
                </div>
                <button
                  onClick={() => alert('Downloading Roga Nidan Ashta-Vidha Pariksha Guide...')}
                  className="px-3 py-1.5 rounded text-xs bg-[#173D32] text-[#C5A46D] font-medium flex items-center self-start sm:self-auto hover:bg-[#0F2821]"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Clinical Log
                </button>
              </div>

              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#173D32]">
                    Charaka Samhita Purvardha
                  </h4>
                  <p className="text-xs text-[#81917A]">Prof. (Dr.) Acharya Vachaspati Shastri • 91% Attendance</p>
                </div>
                <button
                  onClick={() => alert('Downloading Charaka Samhita Chikitsa Sthana Commentary...')}
                  className="px-3 py-1.5 rounded text-xs bg-[#173D32] text-[#C5A46D] font-medium flex items-center self-start sm:self-auto hover:bg-[#0F2821]"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Sanskrit Shlokas
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Internal Sessional Calendar */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#173D32] flex items-center">
              <Calendar className="w-4 h-4 text-[#C5A46D] mr-2" />
              Sessional Exam Calendar
            </h3>

            <div className="space-y-3 text-xs text-[#342B25]">
              <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block">Mid-Term Sessional Theory:</span>
                <span className="text-[#81917A]">Nov 18 – Nov 24, 2026</span>
              </div>
              <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block">Bedside Clinical Vivas:</span>
                <span className="text-[#81917A]">Dec 02 – Dec 06, 2026</span>
              </div>
              <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block">Charak Vatika Herb Herbarium Submission:</span>
                <span className="text-[#81917A]">Dec 15, 2026</span>
              </div>
            </div>

            {notices.length > 0 && (
              <div className="pt-4 border-t border-[#C5A46D]/20 space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#173D32] flex items-center">
                  <Bell className="w-3.5 h-3.5 text-[#C5A46D] mr-1.5" />
                  Official Campus Circulars
                </h4>
                {notices.map((n) => (
                  <div key={n.id} className="p-2.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 text-[11px]">
                    <span className="font-semibold text-[#173D32] block leading-snug">{n.title}</span>
                    <span className="text-[10px] text-[#81917A] mt-0.5 block">{n.date} • {n.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
