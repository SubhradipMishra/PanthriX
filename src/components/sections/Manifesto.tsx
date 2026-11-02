import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWatermark } from '../ui/SectionWatermark';

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  isHighlight?: boolean;
}

const Word: React.FC<WordProps> = ({ children, progress, range, isHighlight }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollOpacity = useTransform(progress, range, [0.22, 1]);
  const scrollColor = useTransform(
    progress,
    range,
    [
      'rgba(200, 204, 212, 0.28)',
      isHighlight ? '#F55B17' : '#FFFFFF',
    ]
  );

  return (
    <motion.span
      style={{
        opacity: isHovered ? 1 : scrollOpacity,
        color: isHovered ? '#F55B17' : scrollColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.08,
        textShadow: '0 0 20px rgba(245, 91, 23, 0.75)',
        transition: { duration: 0.15 },
      }}
      className={`inline-block mr-[0.26em] transition-all duration-150 cursor-pointer select-none ${
        isHighlight ? 'font-semibold' : ''
      }`}
    >
      {children}
    </motion.span>
  );
};

export const Manifesto: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Tightened scroll distance (140vh) to eliminate the dead black gap between sections
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const manifestoText =
    "The world is suffocating under bloated, template-driven software. Teams waste quarters debating committees while groundbreaking ideas stay trapped in Figma. PanthriX exists for a single purpose: to hunt down the unbuilt and engineer it with surgical precision. We work in stealth. We write strict code. We benchmark relentlessly. When we ship, we strike with absolute accuracy—turning fragile ambition into unstoppable software dominance.";

  const words = manifestoText.split(' ');
  const highlightWords = ['unbuilt', 'precision', 'stealth', 'ship', 'strike', 'dominance'];

  return (
    <div
      ref={targetRef}
      id="manifesto"
      className="relative h-[140vh] w-full bg-[#08090B]"
    >
      {/* Pinned Viewport Container with ample top/bottom padding so first & last lines never clip */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 lg:px-14 overflow-hidden pt-20 pb-16">
        {/* Giant faded WHY watermark */}
        <SectionWatermark word="WHY" outline={true} speed={60} align="center" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col justify-center text-center my-auto">
          {/* Act 1 Header */}
          <div className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-6 sm:mb-8">
            <span className="text-[#F55B17]">01</span>
            <span>/</span>
            <span>ACT I: THE HUNT BEGINS</span>
            <span>/</span>
            <span className="text-[#F55B17]">THE MANIFESTO</span>
          </div>

          {/* 
            Word-by-word reveal with hover interaction:
            Sized to text-xl sm:text-3xl lg:text-[2.6rem] with leading-[1.35]
            guaranteeing first and last lines are completely visible on all viewports!
          */}
          <p className="font-display font-medium text-xl sm:text-3xl lg:text-[2.6rem] leading-[1.35] tracking-tight">
            {words.map((word, i) => {
              // Map reveals tightly between 0.05 and 0.85 of progress
              const start = 0.05 + (i / words.length) * 0.78;
              const end = start + (1 / words.length) * 0.78;
              const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
              const isHighlight = highlightWords.includes(cleanWord);

              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isHighlight={isHighlight}
                >
                  {word}
                </Word>
              );
            })}
          </p>

          {/* Bottom supporting quote */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]),
            }}
            className="mt-8 sm:mt-12 font-mono text-xs tracking-wider text-[#888E99] flex items-center justify-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F55B17]" />
            <span>Hover words to illuminate &middot; Software with predator precision</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
