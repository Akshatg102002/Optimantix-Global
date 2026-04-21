
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
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 flex items-center justify-center"
                >
                  <img 
                    src="https://i.ibb.co/p65V8CGV/OG.png" 
                    alt="Optimantix Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </MotionDiv>
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
