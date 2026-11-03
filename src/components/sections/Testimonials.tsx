import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { testimonialsData } from '../../data/testimonials';
import { SectionWatermark } from '../ui/SectionWatermark';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const AUTOPLAY_MS = 6000;

const pad = (n: number) => String(n).padStart(2, '0');

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const total = testimonialsData.length;
  const current = testimonialsData[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  // Automatic carousel: advances every few seconds, pauses while the user
  // hovers or focuses the card, and is disabled for reduced-motion users.
  useEffect(() => {
    if (paused || reduceMotion || total < 2) return;
    const id = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [activeIndex, paused, reduceMotion, total]);

  if (!current) return null;

  const autoplaying = !paused && !reduceMotion && total > 1;

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#08090B] py-28 sm:py-36 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      {/* Giant TRUST watermark */}
      <SectionWatermark word="TRUST" outline={true} speed={80} align="center" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-3">
            <span className="text-[#F55B17]">08</span>
            <span>/</span>
            <span>TESTIMONY</span>
            <span>/</span>
            <span className="text-[#F55B17]">FOUNDER VOICES</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
            Voices from the Field<span className="text-[#F55B17]">.</span>
          </h2>
        </div>

        {/* Oversized Orange Quote & Active Quote Box */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative rounded-3xl border border-[#1E2025] bg-[#101114] p-8 sm:p-14 md:p-16 shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-titanium-gradient opacity-30 pointer-events-none" />

          {/* Giant Orange Quote Icon in background */}
          <div className="absolute top-6 right-8 text-[#F55B17] opacity-20 pointer-events-none select-none">
            <Quote className="w-24 h-24 sm:w-36 sm:h-36" />
          </div>

          {/* Crossfading Quote Content */}
          <div className="relative z-10" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1E2025] bg-[#08090B] px-3.5 py-1 font-mono text-xs text-[#F55B17] mb-6">
                  <span>Strike Outcome:</span>
                  <span className="text-white font-semibold">{current.metric}</span>
                </div>

                <p className="font-display text-xl sm:text-2xl text-white font-light leading-relaxed tracking-tight">
                  "{current.quote}"
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="h-14 w-14 rounded-full border-2 border-[#1E2025] object-cover shadow-sm"
                  />
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {current.author}
                    </h3>
                    <p className="font-mono text-xs text-[#888E99]">
                      {current.role} &middot;{' '}
                      <span className="text-[#F55B17]">{current.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="relative z-10 pt-8 mt-8 border-t border-[#1E2025]">
            {/* Autoplay progress line */}
            <div className="absolute -top-px left-0 right-0 h-px overflow-hidden">
              {autoplaying && (
                <motion.div
                  key={`progress-${activeIndex}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                  className="h-full w-full bg-[#F55B17]"
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="font-mono text-xs text-[#888E99]">
                {pad(activeIndex + 1)} <span className="text-[#1E2025]">/</span>{' '}
                {pad(total)}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous quote"
                  className="btn-icon"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next quote"
                  className="btn-icon"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};