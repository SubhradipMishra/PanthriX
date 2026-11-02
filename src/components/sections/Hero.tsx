import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Crosshair, ChevronDown } from 'lucide-react';
import { MagnetButton } from '../ui/MagnetButton';
import { SectionWatermark } from '../ui/SectionWatermark';

interface HeroProps {
  onOpenBrief: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBrief }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseCoord({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.96]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Giant faded PANTHRIX watermark behind */}
      <SectionWatermark word="PANTHRIX" outline={true} speed={120} align="center" />

      {/* Subtle Dark Mesh Gradient with Orange Panther-Eye Orbs following mouse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: mouseCoord.x * 35 - 120,
            y: mouseCoord.y * 35 - 40,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 120 }}
          className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F55B17] opacity-[0.14] blur-[110px]"
        />

        <motion.div
          animate={{
            x: mouseCoord.x * 35 + 120,
            y: mouseCoord.y * 35 - 40,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 120 }}
          className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F55B17] opacity-[0.14] blur-[110px]"
        />

        <div className="absolute top-1/4 left-10 text-[#C8CCD4]/10 hidden lg:block">
          <Crosshair className="w-8 h-8" />
        </div>
        <div className="absolute top-1/4 right-10 text-[#C8CCD4]/10 hidden lg:block">
          <Crosshair className="w-8 h-8" />
        </div>
      </div>

      {/* Status Pill on top of hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mx-auto"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#1E2025] bg-[#101114]/90 px-4 py-1.5 shadow-titanium backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F55B17] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F55B17]" />
          </span>
          <span className="font-mono text-xs text-[#C8CCD4] tracking-wide">
            Accepting Q1 & Q2 Missions
          </span>
          <span className="text-[#1E2025]">|</span>
          <span className="font-mono text-xs text-[#F55B17]">Strict 4-Client Cap</span>
        </div>
      </motion.div>

      {/* Main Headline Content */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 max-w-5xl mx-auto text-center my-auto py-8"
      >
        {/* Category Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-mono text-xs tracking-[0.25em] uppercase text-[#888E99] mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-[1px] w-8 bg-[#1E2025]" />
          <span>Predator Precision Software Engineering</span>
          <span className="h-[1px] w-8 bg-[#1E2025]" />
        </motion.div>

        {/* The single, authoritative H1 for the entire document */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[0.95]"
          >
            Unleash the{' '}
            <span className="relative inline-block text-[#F55B17] stroke-text-orange font-bold">
              Unbuilt<span className="text-[#F55B17]">.</span>
            </span>
          </motion.h1>
        </div>

        {/* Supporting subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-xl text-[#C8CCD4] leading-relaxed font-light"
        >
          Silent, precise, powerful. We hunt down the boldest architectural concepts nobody has dared to ship yet—and deploy them with predator precision.
        </motion.p>

        {/* CTA Buttons with standardized MagnetButton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <MagnetButton
            variant="orange"
            onClick={onOpenBrief}
            className="px-8 py-3.5 text-xs tracking-widest shadow-orange-md"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagnetButton>

          <MagnetButton
            variant="silver-outline"
            href="#work"
            className="px-8 py-3.5 text-xs tracking-widest"
          >
            <span>See Our Work</span>
            <ArrowDown className="w-4 h-4 ml-1" />
          </MagnetButton>
        </motion.div>
      </motion.div>

      {/* Hero Bottom Bar: Fixed Issue 4 (size >= 12px & sentence case) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#1E2025]/60 gap-4"
      >
        <div className="font-mono text-xs text-[#888E99] flex items-center gap-2">
          <span className="text-[#F55B17]">■</span>
          <span>Engineered to strike. Build in the dark. Launch in the light.</span>
        </div>

        {/* Scroll down indicator with standardized 12px text */}
        <a
          href="#manifesto"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C8CCD4] hover:text-[#F55B17] transition-colors group"
        >
          <span>Scroll to uncover</span>
          <ChevronDown className="w-4 h-4 text-[#F55B17] group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
