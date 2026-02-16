
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  const MotionDiv = motion.div as any;
  const MotionP = motion.p as any;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        <MotionDiv
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full"
        />
        <MotionP
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="mt-4 text-sm font-semibold text-primary uppercase tracking-widest"
        >
          Loading...
        </MotionP>
      </div>
    </div>
  );
};
