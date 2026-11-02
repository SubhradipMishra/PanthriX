import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWatermark } from '../ui/SectionWatermark';
import { ShieldCheck, Clock, GitBranch, Terminal, Globe } from 'lucide-react';

const BentoCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`rounded-2xl border border-[#1E2025] bg-[#101114] p-6 sm:p-8 transition-all duration-300 hover:border-[#F55B17]/50 hover:shadow-orange-sm relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-titanium-gradient opacity-30 pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const WhyPanthrix: React.FC = () => {
  const codeLines = [
    '// PanthriX High-Throughput Engine',
    'export async function executeStrike(target: UnbuiltSpec) {',
    '  const predator = await allocateEliteSquad({ cap: 4 });',
    '  const release = await predator.compile(target, {',
    '    precision: "zero-tolerance",',
    '    latency: "< 40ms",',
    '    security: "military-grade",',
    '  });',
    '  return release.deployToProduction();',
    '}',
  ];

  const [displayedLineIndex, setDisplayedLineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedLineIndex((prev) => (prev + 1) % (codeLines.length + 1));
    }, 600);
    return () => clearInterval(timer);
  }, [codeLines.length]);

  return (
    <section id="why" className="relative w-full bg-[#08090B] py-28 sm:py-36 px-4 sm:px-6 lg:px-12">
      {/* Giant PRECISION watermark */}
      <SectionWatermark word="PRECISION" outline={true} speed={100} align="left" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-3 flex items-center gap-2">
              <span className="text-[#F55B17]">07</span>
              <span>/</span>
              <span>WHY PANTHRIX</span>
              <span>/</span>
              <span className="text-[#F55B17]">THE ANATOMY</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Anatomy of the Predator<span className="text-[#F55B17]">.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#888E99] leading-relaxed">
            Standard agencies operate like sluggish corporate utilities. PanthriX is engineered like a tactical strike unit.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tile 1: Animated Typing Code (Span 7) */}
          <BentoCard className="md:col-span-7 min-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1E2025]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#F55B17]" />
                  <span className="font-mono text-xs text-white font-semibold">strike.engine.ts</span>
                </div>
                {/* Fix for Issue 6: Standardized to text-xs (12px) */}
                <span className="font-mono text-xs text-[#888E99]">TypeScript 5.7 Strict</span>
              </div>

              {/* Code window with standardized font sizes */}
              <div className="mt-4 font-mono text-xs sm:text-sm leading-relaxed space-y-1 overflow-x-auto text-[#C8CCD4]">
                {codeLines.slice(0, Math.max(1, displayedLineIndex)).map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-8 text-[#5B616E] select-none text-right mr-3 font-mono text-xs">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        line.startsWith('//')
                          ? 'text-[#888E99]'
                          : line.includes('executeStrike') || line.includes('deployToProduction')
                          ? 'text-[#F55B17] font-semibold'
                          : line.includes('const') || line.includes('export') || line.includes('return')
                          ? 'text-white'
                          : line.includes('"')
                          ? 'text-[#F55B17]'
                          : 'text-[#C8CCD4]'
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
                {displayedLineIndex < codeLines.length && (
                  <span className="inline-block w-2 h-4 bg-[#F55B17] animate-pulse ml-11" />
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E2025] flex items-center justify-between font-mono text-xs text-[#888E99]">
              <span>Zero bloated dependencies</span>
              <span className="text-white">Strict Type Safety 100%</span>
            </div>
          </BentoCard>

          {/* Tile 2: Mini Architecture Diagram (Span 5) */}
          <BentoCard className="md:col-span-5 min-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1E2025]">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#C8CCD4]" />
                  <span className="font-mono text-xs text-white font-semibold">Fault-Tolerant Mesh</span>
                </div>
                <span className="font-mono text-xs text-[#F55B17]">Sub-40ms P99</span>
              </div>

              {/* SVG Architecture Diagram */}
              <div className="mt-6 flex items-center justify-center py-4">
                <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto">
                  <line x1="50" y1="80" x2="150" y2="40" stroke="#C8CCD4" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="50" y1="80" x2="150" y2="120" stroke="#C8CCD4" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="150" y1="40" x2="250" y2="80" stroke="#F55B17" strokeWidth="2" />
                  <line x1="150" y1="120" x2="250" y2="80" stroke="#F55B17" strokeWidth="2" />

                  <circle cx="50" cy="80" r="16" fill="#08090B" stroke="#1E2025" strokeWidth="2" />
                  <circle cx="50" cy="80" r="6" fill="#C8CCD4" />
                  <text x="50" y="112" fill="#888E99" fontSize="10" fontFamily="monospace" textAnchor="middle">Edge Ingest</text>

                  <circle cx="150" cy="40" r="16" fill="#08090B" stroke="#1E2025" strokeWidth="2" />
                  <circle cx="150" cy="40" r="6" fill="#F55B17" />
                  <text x="150" y="20" fill="#888E99" fontSize="10" fontFamily="monospace" textAnchor="middle">Kafka Event</text>

                  <circle cx="150" cy="120" r="16" fill="#08090B" stroke="#1E2025" strokeWidth="2" />
                  <circle cx="150" cy="120" r="6" fill="#C8CCD4" />
                  <text x="150" y="152" fill="#888E99" fontSize="10" fontFamily="monospace" textAnchor="middle">Sharded DB</text>

                  <circle cx="250" cy="80" r="18" fill="#F55B17" fillOpacity="0.15" stroke="#F55B17" strokeWidth="2" />
                  <circle cx="250" cy="80" r="7" fill="#FFFFFF" />
                  <text x="250" y="112" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle">Global UI</text>
                </svg>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1E2025] flex items-center justify-between font-mono text-xs text-[#888E99]">
              <span>Distributed consensus</span>
              <span className="text-[#F55B17]">Active Multi-Region</span>
            </div>
          </BentoCard>

          {/* Tile 3: 48h Response Clock (Span 4) */}
          <BentoCard className="md:col-span-4 min-h-[300px]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#F55B17] uppercase tracking-wider mb-4">
                <Clock className="w-4 h-4" />
                <span>Zero Latency Communication</span>
              </div>
              <h3 className="font-display text-4xl sm:text-6xl font-black text-white">
                &lt; 48<span className="text-[#F55B17]">h</span>
              </h3>
              <p className="mt-2 font-mono text-xs text-[#888E99] uppercase tracking-wide">
                From Contract to First Code Commit
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#C8CCD4] leading-relaxed">
                Direct engineer-to-founder Slack channels. We do not employ account managers, sales reps, or bureaucratic intermediaries.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E2025] flex items-center gap-2 font-mono text-xs text-white">
              <span className="h-2 w-2 rounded-full bg-[#F55B17] animate-pulse" />
              <span>Direct Senior Access</span>
            </div>
          </BentoCard>

          {/* Tile 4: Glowing Orange Global Radar (Span 4) */}
          <BentoCard className="md:col-span-4 min-h-[300px]">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#C8CCD4] mb-3">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#F55B17]" />
                  Global Deployment Mesh
                </span>
                <span className="text-[#F55B17]">18 Jurisdictions</span>
              </div>

              <div className="relative my-4 h-28 flex items-center justify-center">
                <div className="absolute h-24 w-24 rounded-full border border-[#1E2025]" />
                <div className="absolute h-16 w-16 rounded-full border border-[#F55B17]/40 animate-ping opacity-40" />
                <div className="absolute h-8 w-8 rounded-full bg-[#F55B17]/20 border border-[#F55B17] flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white shadow-orange-sm" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E2025] font-mono text-xs text-[#888E99] flex items-center justify-between">
              <span>Edge DNS routing</span>
              <span className="text-white">Cloudflare Enterprise</span>
            </div>
          </BentoCard>

          {/* Tile 5: Elite 4-Client Cap (Span 4) */}
          <BentoCard className="md:col-span-4 min-h-[300px]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#F55B17] uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Predator Focus Guarantee</span>
              </div>
              <h3 className="font-display text-4xl sm:text-6xl font-black text-white">
                4 <span className="text-[#888E99] text-2xl font-light">Squads</span>
              </h3>
              <p className="mt-2 font-mono text-xs text-[#888E99] uppercase tracking-wide">
                Strict Max Active Engagements
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#C8CCD4] leading-relaxed">
                We reject 85% of inbound inquiries to keep our squads dedicated exclusively to market-defining software missions.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E2025] flex items-center justify-between font-mono text-xs text-[#F55B17]">
              <span>Quality &gt; Volume</span>
              <span className="text-white font-semibold">100% Dedicated</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};
