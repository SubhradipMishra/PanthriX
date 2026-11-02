import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionWatermarkProps {
  word: string;
  outline?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
  speed?: number; // Parallax translation multiplier
}

export const SectionWatermark: React.FC<SectionWatermarkProps> = ({
  word,
  outline = true,
  align = 'center',
  className = '',
  speed = 80,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  const alignmentClass = {
    left: 'left-0 justify-start',
    center: 'left-1/2 -translate-x-1/2 justify-center',
    right: 'right-0 justify-end',
  }[align];

  // Proportionally scale font size so words are completely visible without overflowing
  const getFontSize = () => {
    if (word.length >= 8) return 'text-[clamp(3rem,11.5vw,12.5rem)]';
    if (word.length >= 5) return 'text-[clamp(4rem,15vw,16rem)]';
    return 'text-[clamp(5.5rem,19vw,20rem)]';
  };

  const renderWordContent = () => {
    if (word === 'PANTHRIX') {
      return (
        <>
          <span>PANTHRI</span>
          <span className={outline ? 'stroke-text-orange text-[#F55B17]/20' : 'text-[#F55B17]/40'}>
            X
          </span>
        </>
      );
    }
    return word;
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex select-none overflow-hidden ${alignmentClass} ${className}`}
    >
      <motion.span
        style={{ y }}
        className={`whitespace-nowrap font-display font-black leading-none tracking-tight uppercase ${
          outline
            ? 'stroke-text-silver opacity-[0.06]'
            : 'text-white opacity-[0.035]'
        }`}
      >
        <span className={getFontSize()}>
          {renderWordContent()}
        </span>
      </motion.span>
    </div>
  );
};
