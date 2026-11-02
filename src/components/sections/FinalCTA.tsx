import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWatermark } from '../ui/SectionWatermark';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenBrief: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBrief }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBrief();
  };

  return (
    <section id="strike" className="relative min-h-screen w-full bg-[#08090B] flex flex-col justify-center items-center py-28 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
      {/* Giant faded LET'S BUILD watermark filling the width */}
      <SectionWatermark word="LET'S BUILD" outline={true} speed={110} align="center" />

      {/* Large predator orange glow following cursor */}
      <motion.div
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 100 }}
        className="fixed top-0 left-0 w-96 h-96 rounded-full bg-[#F55B17] opacity-[0.16] blur-[130px] pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Act 4 Header */}
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-6">
          <span className="text-[#F55B17]">10</span>
          <span>/</span>
          <span>ACT IV: THE STRIKE</span>
          <span>/</span>
          <span className="text-[#F55B17]">INITIATE MISSION</span>
        </div>

        {/* Headline with standardized font scale */}
        <h2 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95]">
          Your unbuilt idea <br />
          <span className="text-[#F55B17] stroke-text-orange font-bold">is waiting.</span>
        </h2>

        <p className="mt-6 max-w-xl mx-auto text-base sm:text-xl text-[#C8CCD4] leading-relaxed">
          Stop compromising with slow roadmaps. Deploy an elite software squad with predator precision and take the market.
        </p>

        {/* Quick Email Launcher Form */}
        <form onSubmit={handleQuickSubmit} className="mt-10 max-w-md mx-auto">
          <div className="relative flex items-center rounded-full border border-[#1E2025] bg-[#101114] p-1.5 shadow-2xl focus-within:border-[#F55B17] transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your executive email..."
              aria-label="Executive email"
              className="w-full bg-transparent px-5 py-3 font-mono text-xs sm:text-sm text-white placeholder-[#5B616E] focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary shrink-0 py-2.5 px-6"
            >
              <span>Strike</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Or open comprehensive brief */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-[#888E99]">
          <span>Prefer a detailed RFP specification?</span>
          <button
            onClick={onOpenBrief}
            className="text-[#F55B17] hover:text-white underline underline-offset-4 transition-colors"
          >
            Launch Confidential Brief Form &rarr;
          </button>
        </div>

        {/* Guarantees row with standardized 12px text */}
        <div className="mt-16 pt-8 border-t border-[#1E2025]/60 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-[#888E99]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F55B17]" />
            Strict 4-Client Limit
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F55B17]" />
            Guaranteed Response &lt; 24h
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F55B17]" />
            100% IP & Code Ownership
          </span>
        </div>
      </div>
    </section>
  );
};
