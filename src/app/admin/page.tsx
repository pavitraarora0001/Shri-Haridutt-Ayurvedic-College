'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  FileText,
  Bell,
  Settings,
  LogOut,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Send,
  Eye,
  Edit,
  Trash2,
  Building,
  GraduationCap,
  Image as ImageIcon,
  BookOpen,
  Mail,
  Download,
  UploadCloud,
  FileCheck,
  ExternalLink,
  Filter,
  RefreshCw
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'admissions'
  | 'enquiries'
  | 'courses'
  | 'faculty'
  | 'notices'
  | 'gallery'
  | 'research'
  | 'disclosures'
  | 'settings';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState<any>({
    totalApplications: 0,
    submittedApps: 0,
    underReviewApps: 0,
    approvedApps: 0,
    totalEnquiries: 0,
    totalFaculty: 0,
    totalCourses: 0,
    totalNotices: 0,
    totalGallery: 0,
  });
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const [applications, setApplications] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [research, setResearch] = useState<any[]>([]);
  const [disclosures, setDisclosures] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Filter & Search
  const [searchApp, setSearchApp] = useState('');
  const [filterAppStatus, setFilterAppStatus] = useState('ALL');

  // Status update modal for admissions
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [appStatus, setAppStatus] = useState('UNDER_REVIEW');
  const [adminNotes, setAdminNotes] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Forms
  const [newNotice, setNewNotice] = useState({ title: '', category: 'Admissions', date: '' });
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    degree: 'Undergraduate',
    duration: '5.5 Years',
    intake: '100',
    eligibility: '10+2 with PCB (min 50%) & NEET-UG Qualified',
    feePerYear: '₹2,25,000 / Year',
    description: '',
  });
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    designation: 'Lecturer',
    qualification: 'BAMS, MD (Ayurveda)',
    experienceYears: '5',
    specialization: 'Kayachikitsa',
    email: '',
    phone: '',
    image: '',
    bio: '',
  });
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Campus',
    imageUrl: '',
    caption: '',
  });
  const [newResearch, setNewResearch] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '2026',
    doi: '',
    abstract: '',
    category: 'Clinical Trial',
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. Overview & Stats
      const overRes = await fetch('/api/admin/overview');
      if (overRes.ok) {
        const overData = await overRes.json();
        if (overData.stats) setStats(overData.stats);
        if (overData.recentAuditLogs) setAuditLogs(overData.recentAuditLogs);
      }

      // 2. Applications
      const appRes = await fetch('/api/admin/applications');
      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData.applications || []);
      }

      // 3. Enquiries
      const enqRes = await fetch('/api/admin/enquiries');
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }

      // 4. Courses
      const crsRes = await fetch('/api/admin/courses');
      if (crsRes.ok) {
        const crsData = await crsRes.json();
        setCourses(crsData.courses || []);
      }

      // 5. Faculty
      const facRes = await fetch('/api/admin/faculty');
      if (facRes.ok) {
        const facData = await facRes.json();
        setFaculty(facData.faculty || []);
      }

      // 6. Notices
      const notRes = await fetch('/api/admin/notices');
      if (notRes.ok) {
        const notData = await notRes.json();
        setNotices(notData.notices || []);
      }

      // 7. Gallery
      const galRes = await fetch('/api/admin/gallery');
      if (galRes.ok) {
        const galData = await galRes.json();
        setGallery(galData.items || []);
      }

      // 8. Research
      const resRes = await fetch('/api/admin/research');
      if (resRes.ok) {
        const resData = await resRes.json();
        setResearch(resData.publications || []);
      }

      // 9. Settings
      const setRes = await fetch('/api/admin/settings');
      if (setRes.ok) {
        const setData = await setRes.json();
        setSettings(setData.settings || {});
      }

      // 10. NCISM Disclosures
      const discRes = await fetch('/api/disclosures');
      if (discRes.ok) {
        const discData = await discRes.json();
        setDisclosures(discData.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Status update
  const handleUpdateAppStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedApp.id,
          status: appStatus,
          adminNotes,
        }),
      });

      if (res.ok) {
        showToast(`Application #${selectedApp.applicationNumber} updated to ${appStatus}.`);
        setSelectedApp(null);
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Enquiries update
  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast('Enquiry status updated.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Enquiry removed.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Course create & delete
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      if (res.ok) {
        showToast(`Course ${newCourse.code} created successfully.`);
        setNewCourse({
          code: '',
          title: '',
          degree: 'Undergraduate',
          duration: '5.5 Years',
          intake: '100',
          eligibility: '10+2 with PCB (min 50%) & NEET-UG Qualified',
          feePerYear: '₹2,25,000 / Year',
          description: '',
        });
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`/api/admin/courses?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Course removed.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Faculty create & delete
  const handleCreateFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaculty),
      });
      if (res.ok) {
        showToast(`Faculty member ${newFaculty.name} added successfully.`);
        setNewFaculty({
          name: '',
          designation: 'Lecturer',
          qualification: 'BAMS, MD (Ayurveda)',
          experienceYears: '5',
          specialization: 'Kayachikitsa',
          email: '',
          phone: '',
          image: '',
          bio: '',
        });
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!confirm('Are you sure you want to remove this faculty profile?')) return;
    try {
      const res = await fetch(`/api/admin/faculty?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Faculty profile deleted.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Notice create & delete
  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice),
      });
      if (res.ok) {
        showToast('Circular published to public board.');
        setNewNotice({ title: '', category: 'Admissions', date: '' });
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`/api/admin/notices?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Circular removed.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Gallery create & delete
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGallery),
      });
      if (res.ok) {
        showToast('Gallery item published.');
        setNewGallery({ title: '', category: 'Campus', imageUrl: '', caption: '' });
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Delete this gallery item?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Gallery photo deleted.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Research create & delete
  const handleCreateResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResearch),
      });
      if (res.ok) {
        showToast('Research publication registered.');
        setNewResearch({
          title: '',
          authors: '',
          journal: '',
          year: '2026',
          doi: '',
          abstract: '',
          category: 'Clinical Trial',
        });
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteResearch = async (id: string) => {
    if (!confirm('Delete this research publication?')) return;
    try {
      const res = await fetch(`/api/admin/research?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Research publication removed.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Settings update
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showToast('Website institutional settings updated.');
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // CSV Export for applications
  const exportApplicationsCSV = () => {
    const headers = ['Application Number', 'Candidate Name', 'Course', 'Email', 'Phone', 'NEET Score', 'NEET Rank', '10+2 %', 'Category', 'Status', 'Date'];
    const rows = applications.map((a) => [
      a.applicationNumber,
      `"${a.fullName}"`,
      a.courseCode,
      a.email,
      a.phone,
      a.neetScore || '',
      a.neetRank || '',
      a.marksPercentage,
      a.category,
      a.status,
      new Date(a.createdAt).toLocaleDateString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SHAMC_Applications_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName?.toLowerCase().includes(searchApp.toLowerCase()) ||
      app.applicationNumber?.toLowerCase().includes(searchApp.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchApp.toLowerCase()) ||
      app.phone?.includes(searchApp);
    const matchesStatus = filterAppStatus === 'ALL' || app.status === filterAppStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F6F2E9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Toast Notification */}
        {toastMsg && (
          <div className="fixed top-6 right-6 z-50 p-4 rounded-lg bg-[#173D32] text-[#DFCA9E] border border-[#C5A46D] shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="bg-[#173D32] text-white p-6 rounded-lg border-2 border-[#C5A46D] shadow-luxury flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-[#0F2821] border border-[#C5A46D] flex items-center justify-center text-[#C5A46D] shadow-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A46D] block">
                Ayurvedic College Management Directorate
              </span>
              <h1 className="font-serif text-2xl font-bold">Institutional Control Center</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadAllData}
              className="px-3 py-1.5 text-xs rounded border border-[#C5A46D]/40 text-[#F6F2E9] hover:bg-[#0F2821] transition-colors flex items-center"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 text-xs rounded border border-[#C5A46D]/40 text-[#F6F2E9] hover:bg-[#0F2821] transition-colors flex items-center"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs rounded bg-rose-900/80 hover:bg-rose-900 text-rose-200 border border-rose-700 transition-colors flex items-center"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#C5A46D]/30 pb-2 text-xs">
          {[
            { id: 'overview', label: 'Overview & Metrics', icon: ShieldCheck },
            { id: 'admissions', label: `Admissions (${applications.length})`, icon: GraduationCap },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Mail },
            { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
            { id: 'faculty', label: `Faculty (${faculty.length})`, icon: Users },
            { id: 'notices', label: `Notices (${notices.length})`, icon: Bell },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
            { id: 'research', label: `Research (${research.length})`, icon: FileText },
            { id: 'disclosures', label: `NCISM Disclosures (${disclosures.length || 16})`, icon: ShieldCheck },
            { id: 'settings', label: 'Settings & CMS', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3.5 py-2 rounded font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#173D32] text-white border border-[#C5A46D] shadow-sm'
                    : 'bg-white text-[#342B25] hover:bg-[#173D32] hover:text-white border border-gray-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A46D]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ==================== TAB 1: OVERVIEW ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
                <span className="text-[11px] text-[#81917A] uppercase tracking-wider block">Total Applications</span>
                <span className="font-serif text-3xl font-bold text-[#173D32] mt-1 block">
                  {stats.totalApplications}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-1">
                  {stats.underReviewApps} Under Scrutiny • {stats.approvedApps} Approved
                </span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
                <span className="text-[11px] text-[#81917A] uppercase tracking-wider block">Candidate Enquiries</span>
                <span className="font-serif text-3xl font-bold text-[#173D32] mt-1 block">
                  {stats.totalEnquiries}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-1">Pre-Counseling Guidance</span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
                <span className="text-[11px] text-[#81917A] uppercase tracking-wider block">Academic Faculty</span>
                <span className="font-serif text-3xl font-bold text-[#173D32] mt-1 block">
                  {stats.totalFaculty}
                </span>
                <span className="text-[10px] text-[#81917A] block mt-1">Active Vaidyas & Scholars</span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
                <span className="text-[11px] text-[#81917A] uppercase tracking-wider block">Published Circulars</span>
                <span className="font-serif text-3xl font-bold text-[#173D32] mt-1 block">
                  {stats.totalNotices}
                </span>
                <span className="text-[10px] text-[#81917A] block mt-1">Live on Institutional Board</span>
              </div>
            </div>

            {/* Recent Audit Logs & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A46D]/20">
                  <h3 className="font-serif text-lg font-bold text-[#173D32]">
                    Recent Candidate Dossiers
                  </h3>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="text-xs font-semibold text-[#173D32] hover:text-[#C5A46D]"
                  >
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#173D32] text-white">
                        <th className="p-2.5">Ref #</th>
                        <th className="p-2.5">Candidate</th>
                        <th className="p-2.5">NEET Score</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {applications.slice(0, 5).map((a) => (
                        <tr key={a.id} className="hover:bg-[#F6F2E9]/60">
                          <td className="p-2.5 font-mono font-bold text-[#173D32]">{a.applicationNumber}</td>
                          <td className="p-2.5 font-medium">{a.fullName}</td>
                          <td className="p-2.5">{a.neetScore || 'N/A'}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Administrative Audit Trails */}
              <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A46D]/20">
                  <h3 className="font-serif text-lg font-bold text-[#173D32]">
                    System Audit Trail
                  </h3>
                  <span className="text-[10px] text-[#81917A] uppercase">Security Logs</span>
                </div>

                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-2.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#173D32]">{log.action}</span>
                        <span className="text-[10px] text-[#81917A]">
                          {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[#342B25]/80 mt-0.5 leading-snug">{log.details}</p>
                    </div>
                  ))}
                  {auditLogs.length === 0 && (
                    <p className="text-xs text-[#81917A] text-center py-6">No recent actions recorded.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: ADMISSIONS CRM ==================== */}
        {activeTab === 'admissions' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#173D32]">
                    Candidate Admissions CRM
                  </h3>
                  <p className="text-xs text-[#342B25]/75 font-light">
                    Scrutinize academic qualifications, encrypted documents, and update official counseling status.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={exportApplicationsCSV}
                    className="px-3 py-1.5 rounded bg-[#173D32] text-[#DFCA9E] hover:bg-[#0F2821] text-xs font-semibold uppercase tracking-wider flex items-center border border-[#C5A46D]/40 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                <div className="sm:col-span-8 relative">
                  <Search className="w-4 h-4 text-[#81917A] absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchApp}
                    onChange={(e) => setSearchApp(e.target.value)}
                    placeholder="Search candidate name, application number, email, mobile..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C5A46D]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <select
                    value={filterAppStatus}
                    onChange={(e) => setFilterAppStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                  >
                    <option value="ALL">All Statuses ({applications.length})</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                    <option value="APPROVED">APPROVED (Verified)</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#173D32] text-white">
                      <th className="p-3">Application #</th>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">NEET Score / Rank</th>
                      <th className="p-3">Attached Docs</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-[#F6F2E9]/60">
                        <td className="p-3 font-mono font-bold text-[#173D32]">{app.applicationNumber}</td>
                        <td className="p-3">
                          <strong className="block">{app.fullName}</strong>
                          <span className="text-[10px] text-[#81917A]">
                            {app.qualification} ({app.marksPercentage}%) • {app.category}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="block">{app.phone}</span>
                          <span className="text-[10px] text-[#81917A]">{app.email}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold block">{app.neetScore ? `${app.neetScore} / 720` : 'N/A'}</span>
                          <span className="text-[10px] text-[#81917A]">AIR: {app.neetRank || 'N/A'}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#173D32] text-[#DFCA9E] font-medium">
                            {app.documents?.length || 0} Files
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              app.status === 'APPROVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'UNDER_REVIEW'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setAppStatus(app.status);
                              setAdminNotes(app.adminNotes || '');
                            }}
                            className="px-2.5 py-1 text-xs rounded bg-[#173D32] text-white hover:bg-[#0F2821] font-medium"
                          >
                            Review Dossier
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredApps.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-xs text-[#81917A]">
                          No candidate dossiers match the active filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dossier Review Modal */}
            {selectedApp && (
              <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg border-2 border-[#C5A46D] max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5A46D]/30">
                    <div>
                      <span className="text-[10px] text-[#81917A] uppercase font-bold tracking-widest">
                        Admissions Committee Review
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#173D32]">
                        Dossier: {selectedApp.applicationNumber}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-xs font-bold uppercase bg-amber-100 text-amber-800">
                      {selectedApp.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs bg-[#F6F2E9] p-4 rounded border border-[#C5A46D]/20">
                    <div>
                      <span className="text-[#81917A] block">Full Name:</span>
                      <strong className="text-sm font-serif text-[#173D32]">{selectedApp.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-[#81917A] block">Parentage:</span>
                      <span>{selectedApp.fatherName} / {selectedApp.motherName}</span>
                    </div>
                    <div>
                      <span className="text-[#81917A] block">Contact:</span>
                      <span>{selectedApp.phone} • {selectedApp.email}</span>
                    </div>
                    <div>
                      <span className="text-[#81917A] block">DOB / Gender:</span>
                      <span>{selectedApp.dob} ({selectedApp.gender})</span>
                    </div>
                    <div>
                      <span className="text-[#81917A] block">NEET Roll / Score / Rank:</span>
                      <strong>{selectedApp.neetRollNo || 'N/A'} — {selectedApp.neetScore || 'N/A'} (AIR: {selectedApp.neetRank || 'N/A'})</strong>
                    </div>
                    <div>
                      <span className="text-[#81917A] block">10+2 PCB Aggregate:</span>
                      <strong>{selectedApp.marksPercentage}% ({selectedApp.qualification})</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#81917A] block">Residential Address:</span>
                      <span>{selectedApp.address}, {selectedApp.city}, {selectedApp.state} - {selectedApp.pincode}</span>
                    </div>
                  </div>

                  {/* Uploaded Documents List */}
                  <div className="space-y-2">
                    <h4 className="font-serif text-sm font-bold text-[#173D32]">
                      Attached Verification Documents ({selectedApp.documents?.length || 0})
                    </h4>
                    {selectedApp.documents && selectedApp.documents.length > 0 ? (
                      <div className="space-y-2">
                        {selectedApp.documents.map((doc: any) => (
                          <div key={doc.id} className="flex items-center justify-between p-2.5 rounded bg-gray-50 border border-gray-200 text-xs">
                            <div className="flex items-center space-x-2">
                              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <div>
                                <strong className="block">{doc.documentType}</strong>
                                <span className="text-[11px] text-[#81917A]">{doc.originalName} ({(doc.fileSize / 1024).toFixed(0)} KB)</span>
                              </div>
                            </div>
                            <a
                              href={`/api/admin/documents/${doc.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-[11px] font-semibold flex items-center"
                            >
                              <span>View Secure Document</span>
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#81917A] italic">No document files attached.</p>
                    )}
                  </div>

                  <form onSubmit={handleUpdateAppStatus} className="space-y-4 pt-2 border-t border-[#C5A46D]/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#173D32] mb-1">
                          Update Statutory Status
                        </label>
                        <select
                          value={appStatus}
                          onChange={(e) => setAppStatus(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                        >
                          <option value="SUBMITTED">SUBMITTED</option>
                          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                          <option value="APPROVED">APPROVED (Verified for Counseling)</option>
                          <option value="REJECTED">REJECTED (Ineligible)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#173D32] mb-1">
                          Committee Scrutiny Notes (Dispatched via email)
                        </label>
                        <textarea
                          rows={2}
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="e.g. Scrutinized against State AYUSH quota merit list."
                          className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#C5A46D]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(null)}
                        className="px-4 py-2 text-xs rounded border border-gray-300 hover:bg-gray-100"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs rounded bg-[#173D32] text-white hover:bg-[#0F2821] font-semibold"
                      >
                        Update & Dispatch Email
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: ENQUIRIES ==================== */}
        {activeTab === 'enquiries' && (
          <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#173D32]">
              Admission Enquiries ({enquiries.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#173D32] text-white">
                    <th className="p-3">Ref #</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Parent</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Programme</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#F6F2E9]/60">
                      <td className="p-3 font-mono font-bold text-[#173D32]">{enq.enquiryNumber}</td>
                      <td className="p-3 font-semibold">{enq.studentName}</td>
                      <td className="p-3">{enq.parentName}</td>
                      <td className="p-3">
                        <span className="block">{enq.mobile}</span>
                        <span className="text-[10px] text-[#81917A]">{enq.email}</span>
                      </td>
                      <td className="p-3">{enq.programme}</td>
                      <td className="p-3 max-w-xs truncate">{enq.message || '—'}</td>
                      <td className="p-3">
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-[11px] font-semibold"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="text-rose-600 hover:text-rose-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-xs text-[#81917A]">
                        No prospective enquiries registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: COURSES CMS ==================== */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Add Approved Academic Course
              </h3>
              <form onSubmit={handleCreateCourse} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    placeholder="e.g. MD-PANCHA"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="e.g. MD (Ayurveda - Panchakarma)"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Degree Type</label>
                  <select
                    value={newCourse.degree}
                    onChange={(e) => setNewCourse({ ...newCourse, degree: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Intake Seats *</label>
                  <input
                    type="number"
                    required
                    value={newCourse.intake}
                    onChange={(e) => setNewCourse({ ...newCourse, intake: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Annual Fee</label>
                  <input
                    type="text"
                    value={newCourse.feePerYear}
                    onChange={(e) => setNewCourse({ ...newCourse, feePerYear: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] uppercase tracking-wider font-semibold"
                  >
                    Save & Publish Course
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#173D32]">
                Active Catalog Courses ({courses.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((c) => (
                  <div key={c.id} className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] bg-[#173D32] px-2 py-0.5 rounded">
                        {c.code}
                      </span>
                      <h5 className="font-serif text-base font-bold text-[#173D32] mt-1.5">{c.title}</h5>
                      <p className="text-xs text-[#81917A]">{c.degree} • {c.duration} • {c.intake} Seats</p>
                      <p className="text-xs font-semibold text-[#173D32] mt-1">{c.feePerYear}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: FACULTY CMS ==================== */}
        {activeTab === 'faculty' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Register Faculty Member
              </h3>
              <form onSubmit={handleCreateFaculty} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    placeholder="e.g. Dr. Vaidya Shrikant Upadhyay"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={newFaculty.designation}
                    onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                    placeholder="e.g. Professor & HOD"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Qualifications *</label>
                  <input
                    type="text"
                    required
                    value={newFaculty.qualification}
                    onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                    placeholder="BAMS, MD (Ayur)"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={newFaculty.email}
                    onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    placeholder="faculty@hariduttayurveda.edu.in"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={newFaculty.experienceYears}
                    onChange={(e) => setNewFaculty({ ...newFaculty, experienceYears: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Specialization</label>
                  <input
                    type="text"
                    value={newFaculty.specialization}
                    onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] uppercase tracking-wider font-semibold"
                  >
                    Add Faculty Member
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#173D32]">
                Active Faculty Directory ({faculty.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faculty.map((f) => (
                  <div key={f.id} className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 flex justify-between items-center">
                    <div>
                      <h5 className="font-serif text-base font-bold text-[#173D32]">{f.name}</h5>
                      <p className="text-xs text-[#C5A46D] font-medium">{f.designation}</p>
                      <p className="text-[11px] text-[#81917A] mt-0.5">{f.qualification} • {f.experienceYears}+ Yrs</p>
                      <p className="text-[11px] text-[#342B25]">{f.email}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteFaculty(f.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: NOTICES CMS ==================== */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Publish Official Academic Circular
              </h3>
              <form onSubmit={handleCreateNotice} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#173D32] mb-1">Circular Title *</label>
                  <input
                    type="text"
                    required
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="e.g. NEET-UG 2026 Counseling Schedule & Verification Venue"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Category *</label>
                  <select
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Examination">Examination</option>
                    <option value="NCISM">NCISM / Statutory</option>
                    <option value="Hospital">Hospital / Clinical</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] uppercase tracking-wider font-semibold"
                  >
                    Publish Circular
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#173D32]">
                Published Circulars ({notices.length})
              </h4>
              <div className="space-y-2">
                {notices.map((n) => (
                  <div key={n.id} className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-[#173D32] block">{n.title}</strong>
                      <span className="text-[10px] text-[#81917A]">{n.category} • {n.date}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 7: GALLERY CMS ==================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Upload Gallery Photo
              </h3>
              <form onSubmit={handleCreateGallery} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Image Title *</label>
                  <input
                    type="text"
                    required
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    placeholder="e.g. Charak Vatika Herbal Conservatory"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Category</label>
                  <select
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Campus">Campus & Heritage</option>
                    <option value="Hospital">Hospital & Clinical</option>
                    <option value="Herbal Garden">Herbal Garden</option>
                    <option value="Events">Symposiums & Events</option>
                    <option value="Academics">Academic Laboratories</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#173D32] mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={newGallery.imageUrl}
                    onChange={(e) => setNewGallery({ ...newGallery, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] uppercase tracking-wider font-semibold"
                  >
                    Publish to Gallery
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#173D32]">
                Live Gallery Images ({gallery.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="rounded border border-[#C5A46D]/30 overflow-hidden relative group">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-32 object-cover" />
                    <div className="p-2 text-[11px] bg-[#F6F2E9]">
                      <span className="font-bold text-[#173D32] block truncate">{g.title}</span>
                      <span className="text-[10px] text-[#81917A]">{g.category}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteGallery(g.id)}
                      className="absolute top-2 right-2 bg-rose-900/90 text-white p-1 rounded hover:bg-rose-900"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 8: RESEARCH CMS ==================== */}
        {activeTab === 'research' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Register Research Publication
              </h3>
              <form onSubmit={handleCreateResearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#173D32] mb-1">Paper Title *</label>
                  <input
                    type="text"
                    required
                    value={newResearch.title}
                    onChange={(e) => setNewResearch({ ...newResearch, title: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Authors *</label>
                  <input
                    type="text"
                    required
                    value={newResearch.authors}
                    onChange={(e) => setNewResearch({ ...newResearch, authors: e.target.value })}
                    placeholder="e.g. Tripathi D.N., Vyas K.S."
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#173D32] mb-1">Journal & Year *</label>
                  <input
                    type="text"
                    required
                    value={newResearch.journal}
                    onChange={(e) => setNewResearch({ ...newResearch, journal: e.target.value })}
                    placeholder="International Journal of Ayurvedic Medicine (2026)"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#173D32] mb-1">Scientific Abstract</label>
                  <textarea
                    rows={3}
                    value={newResearch.abstract}
                    onChange={(e) => setNewResearch({ ...newResearch, abstract: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] uppercase tracking-wider font-semibold"
                  >
                    Add Publication
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#173D32]">
                Registered Publications ({research.length})
              </h4>
              <div className="space-y-3">
                {research.map((r) => (
                  <div key={r.id} className="p-3.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 flex justify-between items-start text-xs">
                    <div>
                      <strong className="text-[#173D32] block text-sm font-serif">{r.title}</strong>
                      <span className="text-[#81917A] text-[11px] block">{r.authors} • {r.journal} ({r.year})</span>
                      <p className="text-[#342B25]/80 text-[11px] mt-1 italic">{r.abstract}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteResearch(r.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 9: NCISM DISCLOSURES ==================== */}
        {activeTab === 'disclosures' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A46D] block">
                  Section 28 NCISM Act Statutory Compliance
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#173D32] mt-0.5">
                  NCISM Mandatory Disclosures Manager
                </h3>
                <p className="text-xs text-[#81917A] mt-1">
                  Manage 16 statutory disclosure modules, upload updated regulatory certificates, and audit public documents.
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <Link
                  href="/mandatory-disclosures"
                  target="_blank"
                  className="px-4 py-2 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-[#C5A46D]/40"
                >
                  <span>Open Public Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A46D]" />
                </Link>
              </div>
            </div>

            {/* Disclosure Categories List */}
            <div className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card overflow-hidden">
              <div className="p-4 bg-[#173D32] text-white flex items-center justify-between text-xs font-semibold">
                <span>16 Mandatory Statutory Modules</span>
                <span className="text-[#DFCA9E]">All 16 Modules Verified &amp; Compliant</span>
              </div>

              <div className="divide-y divide-[#C5A46D]/20">
                {(disclosures.length > 0 ? disclosures : [
                  { categoryNumber: 1, title: 'Details of Principal & Medical Superintendent', documents: [{}, {}] },
                  { categoryNumber: 2, title: 'Registrations, Approvals, Affiliations & Permission Status', documents: [{}, {}, {}] },
                  { categoryNumber: 3, title: 'Details of Teaching Staff', documents: [{}] },
                  { categoryNumber: 4, title: 'Hospital Specialities, Consultants & Staff', documents: [{}] },
                  { categoryNumber: 5, title: 'Details of Students Admitted', documents: [{}] },
                  { categoryNumber: 6, title: 'University Examination Results', documents: [{}] },
                  { categoryNumber: 7, title: 'Research Publications', documents: [{}] },
                  { categoryNumber: 8, title: 'CME, Conferences, Workshops & FDPs', documents: [{}] },
                  { categoryNumber: 9, title: 'Educational Programmes & Sanctioned Intake Capacity', documents: [{}] },
                  { categoryNumber: 10, title: 'Accreditations, Awards & Achievements', documents: [{}] },
                  { categoryNumber: 11, title: 'Hospital Statistics & Comparative Data', documents: [{}] },
                  { categoryNumber: 12, title: 'Upcoming Events & Announcements', documents: [{}] },
                  { categoryNumber: 13, title: 'Recognition Status of All Courses', documents: [{}] },
                  { categoryNumber: 14, title: 'NCISM & AYUSH Official Links', documents: [{}] },
                  { categoryNumber: 15, title: 'Month-wise Attendance Analysis', documents: [{}] },
                  { categoryNumber: 16, title: 'Transitional Curriculum', documents: [{}] }
                ]).map((cat: any) => (
                  <div key={cat.categoryNumber} className="p-4 hover:bg-[#F6F2E9]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded bg-[#173D32] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {String(cat.categoryNumber).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#173D32]">{cat.title}</h4>
                        <span className="text-[11px] text-[#81917A]">
                          {cat.documents?.length || 1} Registered Statutory Document(s) · Current Academic Session 2026–27
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                      <Link
                        href={`/mandatory-disclosures?cat=${cat.categoryNumber}`}
                        target="_blank"
                        className="px-3 py-1 rounded bg-[#F6F2E9] text-[#173D32] hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/30 transition-colors font-medium flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3 text-[#C5A46D]" />
                        <span>View</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 10: SETTINGS CMS ==================== */}
        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#173D32]">
              Institutional Web Settings & CMS Configuration
            </h3>
            <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#173D32] mb-1">Admissions Helpline</label>
                <input
                  type="text"
                  value={settings.admissionsHelpline || '+91 98290 44120'}
                  onChange={(e) => setSettings({ ...settings, admissionsHelpline: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#173D32] mb-1">Hospital Emergency Casualty</label>
                <input
                  type="text"
                  value={settings.hospitalEmergency || '+91 94140 33815'}
                  onChange={(e) => setSettings({ ...settings, hospitalEmergency: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#173D32] mb-1">Official Admissions Email</label>
                <input
                  type="email"
                  value={settings.admissionsEmail || 'admissions@hariduttayurveda.edu.in'}
                  onChange={(e) => setSettings({ ...settings, admissionsEmail: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#173D32] mb-1">Top Announcement Bar Text</label>
                <input
                  type="text"
                  value={settings.announcementText || 'Admissions Open for B.A.M.S. Session 2026–27 | NCISM & Ministry of AYUSH Approved'}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] uppercase tracking-wider font-semibold"
                >
                  Save Settings to Database
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
