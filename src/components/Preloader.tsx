import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'drawing' | 'flash' | 'splitting' | 'done'>('drawing');

  useEffect(() => {
    // Stage 1: Silver stroke draws (0 - 1000ms)
    const flashTimer = setTimeout(() => {
      setStage('flash');
    }, 1100);

    // Stage 2: Orange flash / eye opens (1100 - 1800ms)
    const splitTimer = setTimeout(() => {
      setStage('splitting');
    }, 1900);

    // Stage 3: Split open to reveal the page (2300ms)
    const doneTimer = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 2450);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(splitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08090B] overflow-hidden select-none"
        >
          {/* Top Half shutter that pulls upward */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#08090B] border-b border-[#1E2025]/60 z-10"
            animate={stage === 'splitting' ? { y: '-100%' } : { y: '0%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Bottom Half shutter that pulls downward */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#08090B] border-t border-[#1E2025]/60 z-10"
            animate={stage === 'splitting' ? { y: '100%' } : { y: '0%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Center Graphic: The Signature X Mark with Silver & Predator Orange Flash */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="relative h-28 w-28 md:h-36 md:w-36">
              {/* Radial panther eye glow behind the X */}
              <motion.div
                className="absolute inset-0 -m-6 rounded-full bg-radial-glow blur-xl pointer-events-none"
                animate={
                  stage === 'flash'
                    ? { opacity: 0.9, scale: 1.4 }
                    : { opacity: 0.15, scale: 1 }
                }
                transition={{ duration: 0.4 }}
              />

              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                {/* Crosshairs & Target ticks */}
                <line x1="50" y1="5" x2="50" y2="18" stroke="#C8CCD4" strokeOpacity="0.3" strokeWidth="1.5" />
                <line x1="50" y1="82" x2="50" y2="95" stroke="#C8CCD4" strokeOpacity="0.3" strokeWidth="1.5" />
                <line x1="5" y1="50" x2="18" y2="50" stroke="#C8CCD4" strokeOpacity="0.3" strokeWidth="1.5" />
                <line x1="82" y1="50" x2="95" y2="50" stroke="#C8CCD4" strokeOpacity="0.3" strokeWidth="1.5" />

                {/* Titanium Silver Base Stroke of X (draws first) */}
                <motion.line
                  x1="22"
                  y1="22"
                  x2="78"
                  y2="78"
                  stroke="#C8CCD4"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.line
                  x1="78"
                  y1="22"
                  x2="22"
                  y2="78"
                  stroke="#C8CCD4"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Predator Orange Flash along the stroke like an eye opening */}
                <motion.line
                  x1="22"
                  y1="22"
                  x2="78"
                  y2="78"
                  stroke="#F55B17"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    stage === 'flash' || stage === 'splitting'
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
                <motion.line
                  x1="78"
                  y1="22"
                  x2="22"
                  y2="78"
                  stroke="#F55B17"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    stage === 'flash' || stage === 'splitting'
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
                />

                {/* Central white target core */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="3.5"
                  fill="#FFFFFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                />
              </svg>
            </div>

            {/* Wordmark beneath X */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 flex flex-col items-center tracking-widest"
            >
              <div className="font-display text-lg font-bold text-white tracking-[0.3em]">
                PANTHRI<span className="text-[#F55B17]">X</span>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase text-[#888E99] tracking-[0.25em]">
                Predator Precision
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

