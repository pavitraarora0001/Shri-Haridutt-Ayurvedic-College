'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g. "18+", "48+", "100+", "350+", "45,000+", "1,250+"
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  // Parse raw number and suffix
  // e.g. "45,000+" -> numeric: 45000, suffix: "+", hasComma: true
  const numericMatch = value.replace(/,/g, '').match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/[\d,]/g, '');
  const hasComma = value.includes(',');

  const [displayNumber, setDisplayNumber] = useState(shouldReduceMotion ? targetNumber : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || targetNumber === 0) {
      if (shouldReduceMotion) setDisplayNumber(targetNumber);
      return;
    }

    let start = 0;
    const end = targetNumber;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Smooth easeOutCubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * end);

      setDisplayNumber(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayNumber(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  const formattedNumber = hasComma
    ? displayNumber.toLocaleString('en-IN')
    : displayNumber.toString();

  return (
    <span ref={ref} className={className}>
      {formattedNumber}
      {suffix}
    </span>
  );
}
