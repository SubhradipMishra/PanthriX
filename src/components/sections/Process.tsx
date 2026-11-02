import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps, ProcessStep } from '../../data/process';
import { SectionWatermark } from '../ui/SectionWatermark';
import { CheckCircle2, Zap, Crosshair } from 'lucide-react';

interface ProcessCardRowProps {
  step: ProcessStep;
  index: number;
  total: number;
  activeStep: number;
}

const ProcessCardRow: React.FC<ProcessCardRowProps> = ({
  step,
  index,
  total,
  activeStep,
}) => {
  const isPast = activeStep > index;
  const isCurrent = activeStep === index;
  const isActive = isCurrent || isPast;

  return (
    <div className="relative flex items-center gap-4 sm:gap-8 lg:gap-12 w-full my-6 sm:my-10">
      {/* 
        Parallel Route Waypoint Node on the Curvy Path:
        Directly horizontally aligned with the card!
      */}
      <div className="relative z-20 shrink-0 flex items-center justify-center w-14 sm:w-16">
        {/* Pulsing concentric radar ripple when active */}
        {isCurrent && (
          <span className="absolute h-12 w-12 rounded-full border-2 border-[#F55B17] opacity-75 animate-ping pointer-events-none" />
        )}

        {/* Node Outer Ring */}
        <div
          className={`relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 transition-all duration-500 bg-[#08090B] ${
            isCurrent
              ? 'border-[#F55B17] shadow-orange-md scale-110'
              : isPast
              ? 'border-[#F55B17]/80'
              : 'border-[#1E2025]'
          }`}
        >
          {/* Inner Core */}
          <div
            className={`h-4 w-4 rounded-full transition-colors duration-500 ${
              isCurrent
                ? 'bg-[#F55B17] shadow-orange-sm'
                : isPast
                ? 'bg-[#F55B17]/60'
                : 'bg-[#1E2025]'
            }`}
          />

          {/* Node Number Label */}
          <span
            className={`absolute -top-6 font-mono text-xs font-bold transition-colors ${
              isActive ? 'text-[#F55B17]' : 'text-[#5B616E]'
            }`}
          >
            {step.number}
          </span>
        </div>

        {/* 
          Horizontal Parallel Connector Branch:
          Visually hits from the curvy route directly into the card in parallel!
        */}
        <div className="hidden sm:block absolute left-full top-1/2 -translate-y-1/2 w-6 sm:w-10 lg:w-12 h-[2.5px] overflow-hidden pointer-events-none">
          <div
            className={`h-full w-full transition-all duration-500 ${
              isCurrent
                ? 'bg-gradient-to-r from-[#F55B17] via-[#F55B17] to-[#F55B17] shadow-orange-sm'
                : isPast
                ? 'bg-[#F55B17]/50'
                : 'bg-[#1E2025]'
            }`}
          />
        </div>
      </div>

      {/* The Step Card (01 to 06) */}
      <div
        className={`group relative flex-1 rounded-2xl border p-6 sm:p-9 md:p-11 shadow-2xl transition-all duration-500 overflow-hidden ${
          isCurrent
            ? 'border-[#F55B17] bg-[#101114] shadow-orange-md -translate-y-1'
            : isPast
            ? 'border-[#1E2025] bg-[#101114]/90'
            : 'border-[#1E2025] bg-[#101114]/60 opacity-80 hover:opacity-100 hover:border-[#2E313A]'
        }`}
      >
        {/* Tactical HUD Corner Crosshair */}
        <div className="absolute top-3.5 right-3.5 text-[#1E2025] group-hover:text-[#F55B17] transition-colors pointer-events-none">
          <Crosshair className="w-3.5 h-3.5" />
        </div>

        <div className="absolute inset-0 rounded-2xl bg-titanium-gradient opacity-30 pointer-events-none" />

        {/* Faded Giant Step Number */}
        <div className="absolute right-6 bottom-4 pointer-events-none select-none overflow-hidden opacity-[0.05] font-display font-black text-7xl sm:text-8xl text-white">
          {step.number}
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Number, Phase, Title */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#F55B17]">
                <span className="font-bold">{step.step}</span>
                <span className="text-[#1E2025]">/</span>
                <span className="text-[#888E99]">{step.duration}</span>
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {step.title}
              </h3>

              <p className="mt-1 font-mono text-xs tracking-wide text-[#888E99]">
                {step.subtitle}
              </p>
            </div>

            <div className="mt-6 lg:mt-10 inline-flex items-center gap-2 rounded-full border border-[#1E2025] bg-[#08090B] px-3.5 py-1.5 font-mono text-xs text-[#C8CCD4]">
              <Zap className="w-3.5 h-3.5 text-[#F55B17]" />
              <span className="text-[#888E99]">Metric Target:</span>
              <span className="text-white font-semibold">{step.weaponMetric}</span>
            </div>
          </div>

          {/* Right Column: Narrative Description & Execution checklist */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="text-sm sm:text-base text-[#C8CCD4] leading-relaxed">
              {step.description}
            </p>

            <div className="mt-6 pt-6 border-t border-[#1E2025] grid grid-cols-1 sm:grid-cols-2 gap-3">
              {step.executionList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#888E99]">
                  <CheckCircle2 className="w-4 h-4 text-[#F55B17] shrink-0 mt-0.5" />
                  <span className="leading-snug text-[#C8CCD4]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Sync active step (0 to 5) based on scroll progress through the 6 cards
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const stepIndex = Math.min(
        processSteps.length - 1,
        Math.max(0, Math.floor(progress * processSteps.length))
      );
      setActiveStep(stepIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full bg-[#08090B] py-20 sm:py-28 px-4 sm:px-6 lg:px-12 select-none"
    >
      {/* Giant PROCESS watermark */}
      <SectionWatermark word="PROCESS" outline={true} speed={80} align="right" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[#1E2025]/60">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-3 flex items-center gap-2">
              <span className="text-[#F55B17]">03</span>
              <span>/</span>
              <span>THE PROTOCOL</span>
              <span>/</span>
              <span className="text-[#F55B17]">6-PHASE EXECUTION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Build in the Dark<span className="text-[#F55B17]">.</span><br />
              Launch in the Light<span className="text-[#F55B17]">.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="font-mono text-xs text-[#888E99]">
              PROTOCOL STAGE: <span className="text-white font-bold">PHASE 0{activeStep + 1}</span> / 06
            </div>
            <p className="max-w-md text-sm text-[#888E99] leading-relaxed md:text-right">
              A continuous, curvy deployment circuit that strikes horizontally into each card as technical milestones are achieved.
            </p>
          </div>
        </div>

        {/* 
          Curvy Route Running from Card 1 to Card 6 in Parallel:
          The continuous curvy circuit connects down through all 6 cards,
          hitting each card with a parallel horizontal trace!
        */}
        <div className="relative w-full">
          {/* 
            Continuous Curvy Route SVG Track:
            Positions behind the waypoints from Card 1 through Card 6.
          */}
          <div className="absolute left-[27px] sm:left-[31px] top-8 bottom-8 w-8 pointer-events-none z-10 hidden sm:block">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 40 1000"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="curvy-route-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F55B17" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#F55B17" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F55B17" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Curvy circuit path weaving gracefully between X:10 and X:30 across 6 nodes */}
              <path
                d="M 20,0 C 35,100 5,160 20,200 C 35,260 5,320 20,400 C 35,460 5,520 20,600 C 35,660 5,720 20,800 C 35,860 5,920 20,1000"
                fill="none"
                stroke="#1E2025"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Animated glowing route that draws down as the user scrolls */}
              <motion.path
                ref={pathRef}
                d="M 20,0 C 35,100 5,160 20,200 C 35,260 5,320 20,400 C 35,460 5,520 20,600 C 35,660 5,720 20,800 C 35,860 5,920 20,1000"
                fill="none"
                stroke="url(#curvy-route-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Cards 1 to 6 with Horizontal Parallel Route Hits */}
          <div className="flex flex-col w-full">
            {processSteps.map((step, index) => (
              <ProcessCardRow
                key={step.id}
                step={step}
                index={index}
                total={processSteps.length}
                activeStep={activeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
