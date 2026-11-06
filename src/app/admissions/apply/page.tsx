'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { Send, CheckCircle2, AlertCircle, FileText, Sparkles, ShieldCheck, UploadCloud, FileCheck, XCircle, Paperclip } from 'lucide-react';

interface UploadedDoc {
  documentType: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  storagePath: string;
}

export default function ApplyOnlinePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: 'Male',
    email: '',
    phone: '',
    category: 'GENERAL',
    neetRollNo: '',
    neetScore: '',
    neetRank: '',
    previousSchool: '',
    qualification: '10+2 (PCB)',
    marksPercentage: '',
    courseCode: 'BAMS',
    address: '',
    city: '',
    state: 'Rajasthan',
    pincode: '',
  });

  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDoc>>({});
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ appNumber: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (documentType: string, file: File) => {
    setUploadingDoc(documentType);
    setUploadError(null);

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('documentType', documentType);

      const res = await fetch('/api/admissions/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to upload document');

      setUploadedDocs((prev) => ({
        ...prev,
        [documentType]: json.document,
      }));
    } catch (err: any) {
      setUploadError(err.message || 'Upload error');
    } finally {
      setUploadingDoc(null);
    }
  };

  const removeDoc = (documentType: string) => {
    setUploadedDocs((prev) => {
      const copy = { ...prev };
      delete copy[documentType];
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admissions/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          documents: Object.values(uploadedDocs),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSuccessData({ appNumber: data.applicationNumber });
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Online Admission Application (2026–27)"
        subtitle="Institutional Candidate Registration Dossier"
        crumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Online Application' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {successData ? (
            <div className="bg-white p-10 rounded-lg border-2 border-[#C5A46D] shadow-luxury text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Application Dossier Received
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#173D32] mt-1">
                  Registration Successful!
                </h2>
                <p className="text-sm text-[#342B25]/80 mt-2 max-w-lg mx-auto font-light">
                  Your formal registration has been cataloged in our institutional admissions database.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#173D32] text-white max-w-md mx-auto border border-[#C5A46D]/50 shadow-gold">
                <span className="text-xs text-[#C5A46D] uppercase tracking-wider block">
                  Official Application Reference Number:
                </span>
                <span className="font-serif text-3xl font-bold text-white tracking-widest block mt-1">
                  {successData.appNumber}
                </span>
                <span className="text-[11px] text-[#81917A] block mt-2">
                  Please save this reference number for all future counseling and document verification inquiries.
                </span>
              </div>

              <div className="p-4 rounded bg-amber-50 border border-amber-300 text-amber-900 text-xs text-left max-w-xl mx-auto">
                <strong>Statutory Note:</strong> This application dossier records your formal expression of interest for the 2026-27 academic session. Final admission to BAMS is subject to NEET-UG qualification, verification of original certificates, and state/central AYUSH counseling seat allocation.
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link
                  href={`/admissions/status?q=${successData.appNumber}`}
                  className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold"
                >
                  Track Application Status Live →
                </Link>
                <button
                  onClick={() => setSuccessData(null)}
                  className="px-6 py-3 text-xs uppercase tracking-wider font-medium text-[#173D32] border border-[#C5A46D]/40 rounded hover:bg-[#F6F2E9]"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 sm:p-12 rounded-lg border-2 border-[#C5A46D]/60 shadow-luxury space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Official Registration Portal
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
                  Candidate Information & Academic Record
                </h2>
                <p className="text-xs text-[#342B25]/75 mt-1 font-light">
                  Please enter your personal, NEET entrance, and academic marks accurately as recorded on your official 10th and 12th certificates.
                </p>
              </div>

              {error && (
                <div className="p-4 rounded bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Candidate Personal Dossier */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#173D32] border-b border-[#C5A46D]/30 pb-2">
                    1. Personal Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="As on Class 10th marksheet"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Father's / Guardian's Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        placeholder="Father's full name"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Mother's Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.motherName}
                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                        placeholder="Mother's name"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      >
                        <option value="GENERAL">General / Unreserved (UR)</option>
                        <option value="OBC">OBC (Non-Creamy Layer)</option>
                        <option value="EWS">Economically Weaker Section (EWS)</option>
                        <option value="SC">Scheduled Caste (SC)</option>
                        <option value="ST">Scheduled Tribe (ST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="candidate@example.com"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Programme & NEET-UG Entrance Credentials */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-serif text-lg font-bold text-[#173D32] border-b border-[#C5A46D]/30 pb-2">
                    2. Programme Selection & NEET Examination Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        Applying For Discipline *
                      </label>
                      <select
                        value={formData.courseCode}
                        onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      >
                        <option value="BAMS">B.A.M.S. (100 Seats — 5.5 Years)</option>
                        <option value="MD-KAYACHIKITSA">M.D. (Ayurveda - Kayachikitsa)</option>
                        <option value="CERT-PANCHAKARMA">Certificate in Panchakarma (1 Year)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        NEET-UG 2026 Roll Number (if applicable)
                      </label>
                      <input
                        type="text"
                        value={formData.neetRollNo}
                        onChange={(e) => setFormData({ ...formData, neetRollNo: e.target.value })}
                        placeholder="e.g. 2601149201"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        NEET Total Score (out of 720)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="720"
                        value={formData.neetScore}
                        onChange={(e) => setFormData({ ...formData, neetScore: e.target.value })}
                        placeholder="e.g. 520"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        NEET All India Rank (AIR)
                      </label>
                      <input
                        type="number"
                        value={formData.neetRank}
                        onChange={(e) => setFormData({ ...formData, neetRank: e.target.value })}
                        placeholder="e.g. 45000"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        10+2 PCB Aggregate Percentage *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.marksPercentage}
                        onChange={(e) => setFormData({ ...formData, marksPercentage: e.target.value })}
                        placeholder="e.g. 84.5"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Address & Residence */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-serif text-lg font-bold text-[#173D32] border-b border-[#C5A46D]/30 pb-2">
                    3. Postal Address for Correspondence
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#173D32] mb-1">
                      Full Residential Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House / Street / Village / Tehsil"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        City / District *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Jaipur"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173D32] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="6 digits"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Document Verification Dossier */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-[#C5A46D]/30 pb-2">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#173D32]">
                        4. Mandatory Document Verification Uploads
                      </h3>
                      <p className="text-[11px] text-[#81917A]">
                        Formats accepted: PDF, JPG, PNG (Max 5 MB each). Encrypted in private institutional repository.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#C5A46D] bg-[#173D32] px-2.5 py-1 rounded">
                      NCISM Requirement
                    </span>
                  </div>

                  {uploadError && (
                    <div className="p-3 rounded bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { type: 'NEET_SCORECARD', label: 'NEET-UG 2026 Rank & Score Card *', desc: 'Official NTA scorecard' },
                      { type: '12TH_MARKSHEET', label: '12th Class (10+2 PCB) Marksheet *', desc: 'Board marks statement' },
                      { type: '10TH_MARKSHEET', label: '10th Class Secondary Certificate *', desc: 'Date of birth proof' },
                      { type: 'AADHAR_CARD', label: 'Aadhar Card / Identity Proof *', desc: 'Government issued photo ID' },
                    ].map((docItem) => {
                      const isUploaded = !!uploadedDocs[docItem.type];
                      const isUploading = uploadingDoc === docItem.type;

                      return (
                        <div
                          key={docItem.type}
                          className={`p-4 rounded-lg border transition-all ${
                            isUploaded
                              ? 'bg-emerald-50/70 border-emerald-300'
                              : 'bg-[#F6F2E9]/70 border-[#C5A46D]/40'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-semibold text-xs text-[#173D32] block">
                                {docItem.label}
                              </span>
                              <span className="text-[10px] text-[#81917A] block">
                                {docItem.desc}
                              </span>
                            </div>

                            {isUploaded ? (
                              <button
                                type="button"
                                onClick={() => removeDoc(docItem.type)}
                                className="text-rose-600 hover:text-rose-800 text-[11px] font-semibold flex items-center"
                              >
                                <XCircle className="w-3.5 h-3.5 mr-0.5" /> Remove
                              </button>
                            ) : null}
                          </div>

                          {isUploaded ? (
                            <div className="mt-3 flex items-center space-x-2 text-emerald-800 text-xs bg-white p-2 rounded border border-emerald-200">
                              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="truncate flex-1 font-mono text-[11px]">
                                {uploadedDocs[docItem.type].originalName}
                              </span>
                              <span className="text-[10px] text-emerald-700 shrink-0 font-medium">
                                ({(uploadedDocs[docItem.type].fileSize / 1024).toFixed(0)} KB)
                              </span>
                            </div>
                          ) : (
                            <label className="mt-3 flex items-center justify-center p-3 border-2 border-dashed border-[#C5A46D]/60 hover:border-[#C5A46D] rounded bg-white cursor-pointer group transition-colors">
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                disabled={isUploading}
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleFileUpload(docItem.type, e.target.files[0]);
                                  }
                                }}
                              />
                              <div className="flex items-center space-x-2 text-xs text-[#173D32]">
                                <UploadCloud className="w-4 h-4 text-[#C5A46D] group-hover:scale-110 transition-transform" />
                                <span className="font-medium">
                                  {isUploading ? 'Securing & Encrypting File...' : 'Select Document to Attach'}
                                </span>
                              </div>
                            </label>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] via-[#C5A46D] to-[#9A7E4F] rounded shadow-gold hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Verifying and Registering Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Official Application Dossier</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
