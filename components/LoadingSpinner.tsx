
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

interface Props {
  isGlobal?: boolean;
}

export const LoadingSpinner: React.FC<Props> = ({ isGlobal = false }) => {
  const { globalLoading } = useData();
  const MotionDiv = motion.div as any;
  const MotionP = motion.p as any;

  // If used as a component (Suspense fallback) it always shows.
  // If used globally, it respects the context state.
  const shouldShow = isGlobal ? globalLoading : true;

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/90 dark:bg-dark/95 backdrop-blur-md transition-all`}>
          <div className="relative flex flex-col items-center">
            <div className="relative">
                <MotionDiv
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-8 h-8 bg-white dark:bg-dark rounded-full"></div>
                </div>
            </div>
            
            <MotionP
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="mt-6 text-sm font-bold text-primary uppercase tracking-[0.2em]"
            >
              Optimantix
            </MotionP>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
