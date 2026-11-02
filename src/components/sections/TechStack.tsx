import React, { useState, useMemo } from 'react';
import { techMarqueeRow1, techMarqueeRow2 } from '../../data/tech';
import { SectionWatermark } from '../ui/SectionWatermark';
import { Cpu, Server, Database, Cloud, Terminal } from 'lucide-react';

type Tech = { name: string; category: string };

const CATEGORY_META: Record<
  string,
  { icon: React.ElementType; blurb: string; hot: boolean }
> = {
  Frontend: {
    icon: Terminal,
    blurb: 'Interfaces engineered for speed, accessibility and feel.',
    hot: true,
  },
  Backend: {
    icon: Server,
    blurb: 'Hardened services built for concurrency and clean contracts.',
    hot: false,
  },
  Data: {
    icon: Database,
    blurb: 'Durable, indexed, replicated storage that survives load.',
    hot: true,
  },
  Infra: {
    icon: Cloud,
    blurb: 'Automated, observable infrastructure that scales on demand.',
    hot: false,
  },
};

const getMeta = (category: string) =>
  CATEGORY_META[category] ?? {
    icon: Cpu,
    blurb: 'A core part of our production arsenal.',
    hot: true,
  };

interface TechCardProps {
  tech: Tech;
  onEnter: (t: Tech) => void;
  onLeave: () => void;
  decorative?: boolean;
}

const TechCard: React.FC<TechCardProps> = ({
  tech,
  onEnter,
  onLeave,
  decorative,
}) => {
  const meta = getMeta(tech.category);
  const Icon = meta.icon;

  return (
    <div
      aria-hidden={decorative || undefined}
      onMouseEnter={() => onEnter(tech)}
      onMouseLeave={onLeave}
      className="group/card relative shrink-0 cursor-pointer rounded-2xl p-px bg-gradient-to-b from-white/[0.10] to-white/[0.02] transition-all duration-500 hover:from-[#F55B17] hover:via-[#F55B17]/30 hover:to-transparent hover:-translate-y-1"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-[#F55B17]/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

      <div className="relative flex items-center gap-4 rounded-[15px] bg-gradient-to-b from-[#15171C] to-[#0C0D10] px-5 py-4 sm:px-6 sm:py-[18px] overflow-hidden">
        {/* Top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent" />

        <span
          className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 ${meta.hot
            ? 'border-[#F55B17]/30 bg-[#F55B17]/10 group-hover/card:bg-[#F55B17]/20'
            : 'border-white/10 bg-white/[0.04] group-hover/card:border-[#F55B17]/40'
            }`}
        >
          <Icon
            className={`h-[18px] w-[18px] ${meta.hot ? 'text-[#F55B17]' : 'text-[#C8CCD4]'
              } group-hover/card:text-[#FF8A4C] transition-colors`}
          />
        </span>

        <div className="relative flex flex-col gap-1">
          <span className="font-display text-base sm:text-xl font-bold leading-none tracking-tight text-[#C8CCD4] transition-colors duration-300 group-hover/card:text-white whitespace-nowrap">
            {tech.name}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6E7480] group-hover/card:text-[#F55B17] transition-colors">
            {tech.category}
          </span>
        </div>
      </div>
    </div>
  );
};

interface MarqueeRowProps {
  items: Tech[];
  direction: 'left' | 'right';
  onEnter: (t: Tech) => void;
  onLeave: () => void;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  items,
  direction,
  onEnter,
  onLeave,
}) => {
  // Three copies for a seamless loop; only the first copy is exposed to screen readers
  const copies = [0, 1, 2];

  return (
    <div className="group relative w-full overflow-hidden py-3">
      <div
        className={`flex w-max gap-4 pr-4 motion-reduce:animate-none group-hover:[animation-play-state:paused] ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
          }`}
      >
        {copies.map((c) =>
          items.map((tech, i) => (
            <TechCard
              key={`${c}-${tech.name}-${i}`}
              tech={tech}
              onEnter={onEnter}
              onLeave={onLeave}
              decorative={c > 0}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const TechStack: React.FC = () => {
  const [activeTech, setActiveTech] = useState<Tech | null>(null);

  const row1 = techMarqueeRow1 as Tech[];
  const row2 = techMarqueeRow2 as Tech[];

  const stats = useMemo(() => {
    const all = [...row1, ...row2];
    return {
      technologies: new Set(all.map((t) => t.name)).size,
      categories: new Set(all.map((t) => t.category)).size,
    };
  }, [row1, row2]);

  const activeMeta = activeTech ? getMeta(activeTech.category) : null;

  return (
    <section
      id="stack"
      className="relative w-full overflow-hidden bg-[#08090B] py-28 sm:py-40"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F55B17]/[0.07] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)',
          }}
        />
      </div>

      {/* Giant STACK watermark */}
      <SectionWatermark word="STACK" outline={true} speed={90} align="center" />

      {/* Heading */}
      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-4 text-center sm:px-6 lg:px-12">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] backdrop-blur">
          <span className="text-[#F55B17]">05</span>
          <span className="h-3 w-px bg-white/15" />
          <span>Technical Arsenal</span>
          <span className="h-3 w-px bg-white/15" />
          <span className="text-[#F55B17]">Battle-Tested</span>
        </div>

        <h2 className="mt-6 font-display text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Tools of the{' '}
          <span className="bg-gradient-to-br from-white via-[#FFB48A] to-[#F55B17] bg-clip-text text-transparent">
            Apex Predator
          </span>
          <span className="text-[#F55B17]">.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm text-[#888E99] sm:text-base">
          We don't chase fragile hype. We deploy hardened, low-latency
          architectures tested to sustain millions of requests under extreme
          load.
        </p>

        {/* Stat strip */}
        <div className="mx-auto mt-10 flex max-w-md items-center justify-center divide-x divide-white/10 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur">
          {[
            { v: `${stats.technologies}+`, l: 'Technologies' },
            { v: `${stats.categories}`, l: 'Disciplines' },
            { v: '24/7', l: 'Production-grade' },
          ].map((s) => (
            <div key={s.l} className="flex-1 px-4 py-4">
              <div className="font-display text-2xl font-black text-white">
                {s.v}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#888E99]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquees with faded edges */}
      <div
        className="relative z-10"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
        }}
      >
        <MarqueeRow
          items={row1}
          direction="left"
          onEnter={setActiveTech}
          onLeave={() => setActiveTech(null)}
        />
        <div className="mt-2">
          <MarqueeRow
            items={row2}
            direction="right"
            onEnter={setActiveTech}
            onLeave={() => setActiveTech(null)}
          />
        </div>
      </div>

      {/* Live inspector */}
      <div className="relative z-10 mt-12 flex justify-center px-4">
        <div
          aria-live="polite"
          className="flex min-h-[56px] w-full max-w-xl items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-center font-mono text-xs text-[#888E99] backdrop-blur transition-colors duration-300"
        >
          {activeTech && activeMeta ? (
            <>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F55B17] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F55B17]" />
              </span>
              <span className="text-left">
                <span className="font-bold text-white">{activeTech.name}</span>
                <span className="text-[#F55B17]"> · {activeTech.category}</span>
                <span className="block sm:inline sm:before:content-['_—_']">
                  {activeMeta.blurb}
                </span>
              </span>
            </>
          ) : (
            <span>Hover any framework to freeze &amp; inspect arsenal specifications</span>
          )}
        </div>
      </div>
    </section>
  );
};