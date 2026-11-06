import React from 'react';

export default function Loading() {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#F6F2E9] select-none">
      {/* Top Gold Progress Bar Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] overflow-hidden bg-[#173D32]">
        <div className="w-full h-full bg-gradient-to-r from-[#9A7E4F] via-[#DFCA9E] to-[#C5A46D] animate-pulse" />
      </div>

      {/* Gentle Institutional Watermark Pulsing Badge */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#C5A46D]/60 bg-[#0F2821] flex items-center justify-center p-1.5 shadow-gold animate-pulse">
          <div className="w-full h-full rounded-full border border-[#C5A46D]/40 flex flex-col items-center justify-center text-center">
            <span className="text-[#C5A46D] text-sm font-serif font-bold">ॐ</span>
            <span className="text-[8px] font-serif text-[#C5A46D]/90 uppercase tracking-widest leading-none">SHAMC</span>
          </div>
        </div>

        <div className="space-y-1 text-center">
          <p className="font-serif text-sm font-bold text-[#173D32] tracking-wide">
            Shri Haridutt Ayurvedic Medical College
          </p>
          <p className="text-[11px] font-sans text-[#C5A46D] uppercase tracking-widest font-medium">
            Loading Academic Content...
          </p>
        </div>
      </div>
    </div>
  );
}
