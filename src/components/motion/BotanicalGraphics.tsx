'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// 1. Floating Ayurvedic Leaf (Gentle organic floating & rotation)
export function FloatingLeaf({
  className = '',
  size = 32,
  duration = 6,
  delay = 0,
  rotateRange = 15,
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  rotateRange?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none opacity-20 ${className}`}
      >
        <path
          d="M50 10 C75 25, 90 60, 50 90 C10 60, 25 25, 50 10 Z"
          stroke="#C5A46D"
          strokeWidth="2"
          fill="#C5A46D"
          fillOpacity="0.1"
        />
        <path d="M50 10 Q50 50 50 90" stroke="#C5A46D" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <motion.div
      className={`pointer-events-none absolute select-none ${className}`}
      animate={{
        y: [-8, 8, -8],
        x: [-4, 4, -4],
        rotate: [-rotateRange, rotateRange, -rotateRange],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Organic Medicinal Leaf Contour (e.g. Tulsi / Ashoka) */}
        <path
          d="M50 10 C75 25, 88 58, 50 92 C12 58, 25 25, 50 10 Z"
          stroke="#C5A46D"
          strokeWidth="2.5"
          fill="#C5A46D"
          fillOpacity="0.12"
        />
        {/* Leaf Central Vein (Madhyashira) */}
        <path d="M50 10 Q50 50 50 92" stroke="#C5A46D" strokeWidth="1.5" />
        {/* Lateral Veins */}
        <path d="M50 35 Q65 42 72 38" stroke="#C5A46D" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M50 48 Q35 55 28 50" stroke="#C5A46D" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M50 62 Q65 68 70 65" stroke="#C5A46D" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M50 74 Q38 80 34 76" stroke="#C5A46D" strokeWidth="1" strokeOpacity="0.7" />
      </svg>
    </motion.div>
  );
}

// 2. Botanical Sprig / Branch with Fine Gold Drawing Line
export function BotanicalSprig({
  className = '',
  width = 120,
  height = 80,
  flip = false,
}: {
  className?: string;
  width?: number;
  height?: number;
  flip?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none select-none ${flip ? 'scale-x-[-1]' : ''} ${className}`}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curving Branch */}
        <motion.path
          d="M10 110 Q80 80, 130 50 T190 10"
          stroke="#C5A46D"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
        {/* Leaf 1 */}
        <motion.path
          d="M70 76 C85 60, 95 62, 85 80 C75 90, 68 85, 70 76 Z"
          stroke="#C5A46D"
          strokeWidth="1"
          fill="#C5A46D"
          fillOpacity="0.1"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        {/* Leaf 2 */}
        <motion.path
          d="M110 52 C100 35, 110 32, 125 45 C132 55, 122 62, 110 52 Z"
          stroke="#C5A46D"
          strokeWidth="1"
          fill="#C5A46D"
          fillOpacity="0.1"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        {/* Leaf 3 */}
        <motion.path
          d="M150 32 C168 18, 175 22, 165 38 C155 48, 146 42, 150 32 Z"
          stroke="#C5A46D"
          strokeWidth="1"
          fill="#C5A46D"
          fillOpacity="0.1"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
      </svg>
    </div>
  );
}

// 3. Sacred Vedic Mandala Ambient Watermark
export function VedicMandalaWatermark({
  className = '',
  size = 360,
  opacity = 0.04,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Outer Ring */}
        <circle cx="200" cy="200" r="190" stroke="#C5A46D" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="175" stroke="#C5A46D" strokeWidth="1.5" />
        
        {/* 8-Petal Lotus Symmetry */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 200 200)`}>
            <path
              d="M200 30 C220 90, 220 130, 200 170 C180 130, 180 90, 200 30 Z"
              stroke="#C5A46D"
              strokeWidth="1.2"
              fill="#C5A46D"
              fillOpacity="0.03"
            />
            <circle cx="200" cy="180" r="4" fill="#C5A46D" />
          </g>
        ))}

        {/* Inner Yantra Concentric Rings */}
        <circle cx="200" cy="200" r="95" stroke="#C5A46D" strokeWidth="1" />
        <polygon
          points="200,110 278,245 122,245"
          stroke="#C5A46D"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="200,290 122,155 278,155"
          stroke="#C5A46D"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="200" cy="200" r="28" stroke="#C5A46D" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="4" fill="#C5A46D" />
      </motion.svg>
    </div>
  );
}
