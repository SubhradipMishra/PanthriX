import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Shield,
  Zap,
  Globe,
  Database,
  Crosshair,
  ExternalLink,
} from 'lucide-react';
import { projectsData, ProjectItem } from '../../data/work';
import { SectionWatermark } from '../ui/SectionWatermark';

interface SelectedWorkProps {
  onSelectProject: (project: ProjectItem) => void;
}

// 3D Tilt Wrapper for Project Mockup Card
const ProjectMockup: React.FC<{
  children: React.ReactNode;
  category: string;
  url: string;
  statusBadge: string;
}> = ({ children, category, url, statusBadge }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
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
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative rounded-2xl border border-[#1E2025] bg-[#101114] p-4 sm:p-6 shadow-2xl transition-all duration-500 hover:border-[#F55B17]/60 hover:shadow-orange-md overflow-hidden group/mockup"
    >
      {/* Top Browser Chrome Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E2025]/80">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#1E2025] group-hover/mockup:bg-[#F55B17] transition-colors" />
          <span className="h-3 w-3 rounded-full bg-[#1E2025]" />
          <span className="h-3 w-3 rounded-full bg-[#1E2025]" />
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#888E99] px-3.5 py-1 rounded-full bg-[#08090B] border border-[#1E2025]">
          <span className="text-[#5B616E]">https://</span>
          <span className="text-white">{url}</span>
        </div>
        <div className="font-mono text-xs text-[#F55B17] flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#F55B17] animate-pulse" />
          <span>{statusBadge}</span>
        </div>
      </div>

      {/* Internal High-Fidelity Tactical Telemetry Canvas */}
      <div className="relative mt-4 h-72 sm:h-96 w-full rounded-xl bg-[#08090B] border border-[#1E2025] p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
        {/* Subtle internal grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E2025_1px,transparent_1px),linear-gradient(to_bottom,#1E2025_1px,transparent_1px)] bg-[size:1.75rem_1.75rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        {children}
      </div>
    </motion.div>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cloud' | 'fintech' | 'ai'>('all');

  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'cloud') return p.id === 'vortex-os';
    if (activeCategory === 'fintech') return p.id === 'cypher-capital';
    if (activeCategory === 'ai') return p.id === 'aether-health';
    return true;
  });

  return (
    <section id="work" className="relative w-full bg-[#08090B] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 select-none">
      {/* Giant WORK watermark */}
      <SectionWatermark word="WORK" outline={true} speed={70} align="center" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[#1E2025]/60">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-3 flex items-center gap-2">
              <span className="text-[#F55B17]">04</span>
              <span>/</span>
              <span>ACT III: THE PROOF</span>
              <span>/</span>
              <span className="text-[#F55B17]">SELECTED STRIKES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Prey Captured<span className="text-[#F55B17]">.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-xs text-[#888E99]">
              DOSSIER RECON: <span className="text-white font-bold">0{filteredProjects.length}</span> ACTIVE FLAGSHIPS
            </span>
            <p className="max-w-md text-sm text-[#888E99] leading-relaxed md:text-right">
              Production systems engineered under non-disclosure, battle-tested for relentless concurrency and zero latency tolerance.
            </p>
          </div>
        </div>

        {/* Tactical Category Filter Pills */}
        <div className="mb-14 flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'all', label: 'All Flagships', count: '03' },
            { id: 'cloud', label: 'Cloud Infrastructure', count: '01' },
            { id: 'fintech', label: 'Algorithmic FinTech', count: '01' },
            { id: 'ai', label: 'Biomedical AI', count: '01' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#F55B17] text-white font-bold shadow-orange-sm'
                  : 'bg-[#101114] border border-[#1E2025] text-[#888E99] hover:border-[#C8CCD4]/40 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id
                    ? 'bg-black/30 text-white'
                    : 'bg-[#08090B] text-[#5B616E]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Project Showcases */}
        <div className="space-y-24 sm:space-y-36">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View case study: ${project.title}`}
                  onClick={() => onSelectProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  data-cursor="view"
                  className="group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F55B17]/50 rounded-2xl"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Visual Interactive Mockup (7 Cols) */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <ProjectMockup
                        category={project.category}
                        url={`panthrix.io/strike/${project.id}`}
                        statusBadge={project.year}
                      >
                        {/* Top Header inside mockup */}
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-2 font-mono text-xs text-white">
                            <Terminal className="w-4 h-4 text-[#F55B17]" />
                            <span className="font-semibold">{project.title}</span>
                          </div>
                          <span className="font-mono text-xs text-[#888E99]">
                            {project.category}
                          </span>
                        </div>

                        {/* Interactive Dynamic Telemetry Displays for each Project */}
                        <div className="relative z-10 my-auto py-3">
                          {project.id === 'vortex-os' && (
                            /* VORTEX OS: Distributed Node Cluster Visualizer */
                            <div className="space-y-4">
                              <div className="flex items-center justify-between font-mono text-xs">
                                <span className="text-[#888E99] flex items-center gap-1.5">
                                  <Cpu className="w-3.5 h-3.5 text-[#F55B17]" />
                                  KUBERNETES DISTRIBUTED CLUSTERS
                                </span>
                                <span className="text-[#F55B17] font-semibold">250,491 NODES ACTIVE</span>
                              </div>

                              {/* Node Grid with Pulsing Status */}
                              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {[
                                  { name: 'US-EAST-1', lat: '12ms', active: true },
                                  { name: 'EU-CENT-1', lat: '18ms', active: true },
                                  { name: 'AP-SE-1', lat: '34ms', active: true },
                                  { name: 'SA-EAST-1', lat: '42ms', active: true },
                                  { name: 'US-WEST-2', lat: '14ms', active: true },
                                  { name: 'AF-SOUTH-1', lat: '38ms', active: false },
                                ].map((node, i) => (
                                  <div
                                    key={i}
                                    className={`rounded-lg border p-2 flex flex-col justify-between transition-colors ${
                                      node.active
                                        ? 'border-[#F55B17]/40 bg-[#101114] text-white'
                                        : 'border-[#1E2025] bg-[#08090B] text-[#5B616E]'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between font-mono text-[10px]">
                                      <span>{node.name}</span>
                                      <span className="h-1.5 w-1.5 rounded-full bg-[#F55B17] animate-pulse" />
                                    </div>
                                    <span className="font-mono text-xs font-bold text-[#F55B17] mt-1">
                                      {node.lat}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Terminal live stream log */}
                              <div className="rounded-lg border border-[#1E2025] bg-[#08090B]/90 p-2.5 font-mono text-xs text-[#888E99] space-y-1">
                                <div className="text-white flex items-center gap-2">
                                  <span className="text-[#F55B17]">&gt;</span>
                                  <span>Topology sync: 0 packet loss across 6 continental VPCs</span>
                                </div>
                                <div className="text-[#5B616E]">
                                  &gt; Reconciled 250,491 worker pods in 38.4ms (Protobuf v3 binary)
                                </div>
                              </div>
                            </div>
                          )}

                          {project.id === 'cypher-capital' && (
                            /* CYPHER TERMINAL: High-Frequency Orderbook Depth Visualizer */
                            <div className="space-y-4">
                              <div className="flex items-center justify-between font-mono text-xs">
                                <span className="text-[#888E99] flex items-center gap-1.5">
                                  <Activity className="w-3.5 h-3.5 text-[#F55B17]" />
                                  ORDERBOOK DEPTH & ARBITRAGE LIQUIDITY
                                </span>
                                <span className="text-white font-bold font-mono">$1,842,910,240</span>
                              </div>

                              {/* Depth Bars Visualizer */}
                              <div className="h-28 w-full flex items-end gap-1.5 pt-2">
                                {[25, 45, 35, 70, 55, 90, 80, 110, 85, 140, 105, 160, 125, 180, 150, 195].map(
                                  (h, i) => (
                                    <div
                                      key={i}
                                      style={{ height: `${h * 0.48}%` }}
                                      className={`flex-1 rounded-t transition-all duration-300 ${
                                        i >= 11
                                          ? 'bg-[#F55B17] shadow-orange-sm'
                                          : i >= 6
                                          ? 'bg-[#C8CCD4]/60'
                                          : 'bg-[#1E2025]'
                                      }`}
                                    />
                                  )
                                )}
                              </div>

                              {/* Realtime latency readout pill */}
                              <div className="flex items-center justify-between rounded-lg border border-[#1E2025] bg-[#08090B]/90 p-2.5 font-mono text-xs">
                                <div className="flex items-center gap-2 text-white">
                                  <Zap className="w-3.5 h-3.5 text-[#F55B17]" />
                                  <span>E2E Tick-to-Trade:</span>
                                  <span className="text-[#F55B17] font-bold">1.4ms</span>
                                </div>
                                <span className="text-[#888E99]">Solid 120 FPS WebAssembly Canvas</span>
                              </div>
                            </div>
                          )}

                          {project.id === 'aether-health' && (
                            /* AETHER BIO-CORE: Genomic Neural Diagnostics Stream */
                            <div className="space-y-4">
                              <div className="flex items-center justify-between font-mono text-xs">
                                <span className="text-[#888E99] flex items-center gap-1.5">
                                  <Layers className="w-3.5 h-3.5 text-[#F55B17]" />
                                  NEURAL CHROMOSOME INFERENCE CLUSTERS
                                </span>
                                <span className="text-[#F55B17] font-semibold">48 HOSPITALS LIVE</span>
                              </div>

                              {/* Genetic sequence stream */}
                              <div className="rounded-lg border border-[#1E2025] bg-[#101114] p-3 font-mono text-xs space-y-1.5">
                                <div className="flex items-center justify-between text-[#888E99]">
                                  <span>CHROMOSOME 7 INFERENCE RUN:</span>
                                  <span className="text-[#F55B17] font-bold">99.982% CONFIDENCE</span>
                                </div>
                                <div className="text-white bg-[#08090B] p-2 rounded border border-[#1E2025] truncate">
                                  &gt; ATCG_MATCH: [chr7:117480025] &middot; Pathogenic Variant Neutralized
                                </div>
                              </div>

                              {/* Turnaround speedup benchmark bar */}
                              <div className="rounded-lg border border-[#1E2025] bg-[#08090B]/90 p-2.5 font-mono text-xs flex items-center justify-between">
                                <span className="text-[#888E99]">Turnaround Speed:</span>
                                <div className="flex items-center gap-2 font-bold">
                                  <span className="line-through text-[#5B616E]">72 Hours</span>
                                  <span className="text-[#F55B17]">&rarr; 8.4 Minutes (94% Faster)</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom Bar inside mockup */}
                        <div className="relative z-10 pt-3 border-t border-[#1E2025] flex items-center justify-between font-mono text-xs">
                          <span className="text-[#888E99]">CLIENT: {project.client}</span>
                          <span className="text-white flex items-center gap-1.5 group-hover:text-[#F55B17] transition-colors">
                            <span>Inspect Architecture</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>
                      </ProjectMockup>
                    </div>

                    {/* Narrative Info Column (5 Cols) */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="font-mono text-xs uppercase tracking-wider text-[#F55B17] mb-2 flex items-center gap-2">
                        <span className="font-bold">FLAGSHIP 0{idx + 1}</span>
                        <span className="text-[#1E2025]">/</span>
                        <span className="text-[#888E99]">{project.year}</span>
                      </div>

                      <h3 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight group-hover:text-[#F55B17] transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-2 font-mono text-xs text-[#888E99] tracking-wide">
                        {project.tagline}
                      </p>

                      <p className="mt-4 text-sm sm:text-base text-[#C8CCD4] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tactical Metric Chips */}
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {project.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="rounded-xl border border-[#1E2025] bg-[#101114] p-3 text-left transition-colors group-hover:border-[#F55B17]/30"
                          >
                            <div className="font-display text-xl font-bold text-white">
                              {m.value}
                            </div>
                            <div className="font-mono text-xs tracking-wider text-[#888E99] mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#1E2025] bg-[#101114] px-3.5 py-1 font-mono text-xs text-[#888E99]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Direct CTA */}
                      <div className="mt-8 pt-6 border-t border-[#1E2025]/60 flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className="btn-primary"
                        >
                          <span>Case Study Recon</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
