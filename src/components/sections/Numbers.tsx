import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { statsData } from '../../data/stats';

const Counter: React.FC<{ value: number; suffix: string; isInView: boolean }> = ({
  value,
  suffix,
  isInView,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const isFloat = !Number.isInteger(end);
    const steps = 60;
    const increment = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(2)) : Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    // Alignment: number + suffix share one baseline, never wrap, and use
    // fixed-width digits so the layout doesn't jitter while counting.
    <span className="inline-flex items-baseline whitespace-nowrap font-display font-black leading-none tracking-tight tabular-nums text-[#08090B] text-6xl sm:text-7xl lg:text-[length:5.2cqw]">
      <span>{count}</span>
      <span className="text-[#F55B17] ml-1">{suffix}</span>
    </span>
  );
};

export const Numbers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      id="proof"
      className="relative w-full bg-white text-[#08090B] py-28 sm:py-36 px-4 sm:px-6 lg:px-12 clip-claw-both my-16 overflow-hidden select-none"
    >
      {/* Giant Faded PROOF Watermark (Inverted dark style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex select-none overflow-hidden justify-center opacity-[0.05]"
      >
        <span className="font-display font-black text-[clamp(14vw,25vw,30rem)] tracking-tighter text-[#08090B] leading-none">
          PROOF
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-16 border-b border-[#08090B]/10 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#08090B]/60 mb-2 flex items-center gap-2">
              <span className="text-[#F55B17]">06</span>
              <span>/</span>
              <span>THE RECORD</span>
              <span>/</span>
              <span className="text-[#F55B17]">VERIFIED METRICS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#08090B] tracking-tight">
              Apex Track Record<span className="text-[#F55B17]">.</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm text-[#08090B]/70 leading-relaxed md:text-right">
            In software engineering, promises are meaningless. Throughput, uptime, and retention are the only currency that matters.
          </p>
        </div>

        {/* 4 Stats Grid */}
        {/* [container-type:inline-size] lets the numbers scale with the grid width (cqw) so the widest value, e.g. 99.99%, always fits its column */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-8 md:gap-12 [container-type:inline-size]">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex h-full flex-col items-start border-l-2 border-[#08090B]/10 pl-6 py-2 transition-all hover:border-[#F55B17]"
            >
              {/* Fixed-height number row keeps every label on the same line across cards */}
              <div className="flex min-h-[3.75rem] sm:min-h-[4.5rem] lg:min-h-0 items-end">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>

              <h3 className="mt-4 font-display text-xl font-bold leading-tight text-[#08090B]">
                {stat.label}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-[#08090B]/65 leading-relaxed font-sans">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};