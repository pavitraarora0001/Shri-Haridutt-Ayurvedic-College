import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Quote } from 'lucide-react';

export default function ChairmansMessagePage() {
  return (
    <div>
      <PageHeader
        title="Chairman's Message"
        subtitle="Foundational Inspiration"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: "Chairman's Message" }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-[#C5A46D]/40 shadow-luxury overflow-hidden">
            <div className="p-8 sm:p-12 border-b border-[#C5A46D]/20 bg-[#173D32] text-white">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Shri Haridutt Educational Trust
              </span>
              <h2 className="font-serif text-3xl font-bold mt-2">
                "Our sacred aspiration is to nurture Vaidyas who personify knowledge, compassion, and institutional integrity."
              </h2>
            </div>

            <div className="p-8 sm:p-12 space-y-6 text-sm text-[#342B25]/90 font-light leading-relaxed">
              <p>
                <strong>Greetings and Blessings to all students, parents, and well-wishers,</strong>
              </p>
              <p>
                India’s rich tradition of medicine has contributed timeless wisdom to humanity. When we established Shri Haridutt Ayurvedic Medical College, our fundamental purpose was not merely to construct another academic institution, but to revive the sanctity of the classical Vaidya tradition in an environment of modern academic dignity.
              </p>
              <p>
                We have spared no effort in creating a campus infrastructure that rivals leading national universities: from extensive digital libraries and sophisticated laboratories to our sprawling 5-acre herbal sanctuary, Charak Vatika, and our dedicated 100-bed hospital that treats thousands of underprivileged citizens each month.
              </p>
              <p>
                As Chairman, I assure parents that their children will receive not only superior medical training under esteemed professors, but also character development, discipline, and moral grounding that will make them exemplary healthcare leaders of tomorrow.
              </p>

              <div className="pt-8 border-t border-[#C5A46D]/30">
                <p className="font-serif text-base font-bold text-[#173D32]">
                  Chairman & Managing Trustee
                </p>
                <p className="text-xs text-[#81917A]">
                  Shri Haridutt Educational & Charitable Trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
