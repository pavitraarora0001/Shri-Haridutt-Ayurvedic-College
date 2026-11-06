import React from 'react';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}: SectionTitleProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {/* Subtitle with Antique Gold Badge */}
      <div className={`inline-flex items-center space-x-2 mb-3 ${isCenter ? 'justify-center' : ''}`}>
        <span className="w-6 h-[1px] bg-[#C5A46D]"></span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A46D]">
          {subtitle}
        </span>
        <span className="w-6 h-[1px] bg-[#C5A46D]"></span>
      </div>

      {/* Main Serif Title */}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? 'text-[#F6F2E9]' : 'text-[#173D32]'
        }`}
      >
        {title}
      </h2>

      {/* Supporting Description */}
      {description && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            light ? 'text-[#F6F2E9]/80' : 'text-[#342B25]/80'
          }`}
        >
          {description}
        </p>
      )}

      {/* Subtle Botanical Motif Line */}
      <div className={`flex items-center mt-4 ${isCenter ? 'justify-center' : ''}`}>
        <div className="w-12 h-[1px] bg-[#C5A46D]/40"></div>
        <span className="mx-2 text-[#C5A46D] text-xs">✤</span>
        <div className="w-12 h-[1px] bg-[#C5A46D]/40"></div>
      </div>
    </div>
  );
}
