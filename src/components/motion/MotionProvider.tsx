'use client';

import React from 'react';
import Preloader from '@/components/motion/Preloader';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Preloader />
      <motion.div
        key={pathname}
        initial={{ opacity: 0.9, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="flex-grow flex flex-col w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
