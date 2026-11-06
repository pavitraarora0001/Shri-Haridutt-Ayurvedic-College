import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { COURSES } from '@/lib/data';
import { ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

export default function FeeStructurePage() {
  return (
    <div>
      <PageHeader
        title="Approved Institutional Fee Structure"
        subtitle="Transparent Academic & Residential Dues"
        crumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Fee Structure' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              State Regulatory Committee Compliant
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#173D32]">
              Annual Academic Tuition Fee Schedule (2026–27)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#173D32] text-white">
                    <th className="p-3 font-serif text-sm">Course Discipline</th>
                    <th className="p-3 font-serif text-sm">Duration</th>
                    <th className="p-3 font-serif text-sm">Intake</th>
                    <th className="p-3 font-serif text-sm">Tuition (Per Annum)</th>
                    <th className="p-3 font-serif text-sm">Caution Money (Refundable)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5A46D]/20">
                  <tr className="hover:bg-[#F6F2E9]/60">
                    <td className="p-3 font-semibold text-[#173D32]">B.A.M.S. (Undergraduate)</td>
                    <td className="p-3">4.5 Yrs + 1 Yr Int.</td>
                    <td className="p-3 font-bold text-[#173D32]">100</td>
                    <td className="p-3 font-bold text-[#C5A46D]">₹2,25,000 / Year</td>
                    <td className="p-3">₹20,000 (One-Time)</td>
                  </tr>
                  <tr className="hover:bg-[#F6F2E9]/60">
                    <td className="p-3 font-semibold text-[#173D32]">M.D. (Kayachikitsa)</td>
                    <td className="p-3">3 Years Residency</td>
                    <td className="p-3 font-bold text-[#173D32]">12</td>
                    <td className="p-3 font-bold text-[#C5A46D]">₹3,50,000 / Year</td>
                    <td className="p-3">₹25,000 (One-Time)</td>
                  </tr>
                  <tr className="hover:bg-[#F6F2E9]/60">
                    <td className="p-3 font-semibold text-[#173D32]">Certificate in Panchakarma</td>
                    <td className="p-3">1 Year Clinical</td>
                    <td className="p-3 font-bold text-[#173D32]">30</td>
                    <td className="p-3 font-bold text-[#C5A46D]">₹65,000 Total</td>
                    <td className="p-3">₹5,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hostel and Mess Dues */}
            <div className="pt-6 border-t border-[#C5A46D]/20 space-y-3 text-xs text-[#342B25]/85">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Residential Hostel & Dining Dues (Optional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                  <span className="font-semibold text-[#173D32] block">Twin Sharing (Air-Cooled):</span>
                  <span>₹75,000 / Year (Includes Satvik Vegetarian Dining 3 Meals + Tea)</span>
                </div>
                <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                  <span className="font-semibold text-[#173D32] block">Triple Sharing:</span>
                  <span>₹60,000 / Year (Includes Satvik Vegetarian Dining 3 Meals + Tea)</span>
                </div>
              </div>
            </div>

            {/* Government Scholarships */}
            <div className="pt-6 border-t border-[#C5A46D]/20 space-y-3 text-xs text-[#342B25]/85">
              <h3 className="font-serif text-xl font-bold text-[#173D32]">
                Post-Matric Government Scholarships
              </h3>
              <p className="font-light leading-relaxed">
                Eligible students belonging to SC / ST / Special Backward Classes / OBC / EWS / Minority groups can avail 100% fee reimbursement schemes as per social justice department norms. The college scholarship cell provides complete assistance with document submission.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <span>Submit Admission Application Online</span>
              <ArrowRight className="w-4 h-4 ml-2 text-[#C5A46D]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
