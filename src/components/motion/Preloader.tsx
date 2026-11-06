'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    try {
      const hasLoaded = sessionStorage.getItem('shamc_intro_seen');
      if (!hasLoaded) {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('shamc_intro_seen', 'true');
        }, 1400);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if storage is inaccessible
    }
  }, [shouldReduceMotion]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#173D32] text-white"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* Background Subtle Jaali Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C5A46D_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Central Vedic Emblem & Self-Drawing Botanical SVG */}
        <div className="relative flex flex-col items-center justify-center text-center p-8 max-w-md w-full">
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
            {/* Outer Gold Rotating Halo Circle */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 120 120"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="60"
                cy="60"
                r="56"
                stroke="#C5A46D"
                strokeWidth="1.2"
                strokeDasharray="4 8"
                fill="none"
                opacity="0.6"
              />
            </motion.svg>

            {/* Inner Sacred Botanical & Om Crest */}
            <svg
              className="w-24 h-24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Inner Circle Drawing */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                stroke="#C5A46D"
                strokeWidth="2"
                fill="#0F2821"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />

              {/* Botanical Leaf Arc 1 */}
              <motion.path
                d="M50 20 C65 30, 72 45, 50 78 C28 45, 35 30, 50 20 Z"
                stroke="#C5A46D"
                strokeWidth="1.5"
                fill="#C5A46D"
                fillOpacity="0.15"
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
              />

              {/* Sacred Sanskrit Om Glyphic Center */}
              <motion.text
                x="50"
                y="56"
                textAnchor="middle"
                fill="#C5A46D"
                fontSize="20"
                fontFamily="Georgia, serif"
                fontWeight="bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                ॐ
              </motion.text>
            </svg>
          </div>

          {/* College Name Staggered Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-1"
          >
            <p className="font-devanagari text-xs text-[#C5A46D]/90 tracking-widest uppercase">
              ॥ श्रीहरिदत्त आयुर्वेद महाविद्यालय ॥
            </p>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Shri Haridutt Ayurvedic
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C5A46D] font-medium">
              Medical College & Hospital
            </p>
          </motion.div>

          {/* Minimal Luxury Progress Bar */}
          <div className="w-48 h-0.5 bg-[#0F2821] rounded-full overflow-hidden mt-8 border border-[#C5A46D]/30">
            <motion.div
              className="h-full bg-gradient-to-r from-[#DFCA9E] via-[#C5A46D] to-[#9A7E4F]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setLoading(false);
              sessionStorage.setItem('shamc_intro_seen', 'true');
            }}
            className="mt-6 text-[11px] text-[#81917A] hover:text-[#C5A46D] transition-colors uppercase tracking-widest"
          >
            Skip Intro →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
