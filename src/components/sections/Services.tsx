import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Crosshair, Cpu } from 'lucide-react';
import { servicesData, ServiceItem } from '../../data/services';
import { SectionWatermark } from '../ui/SectionWatermark';

interface ServicesProps {
  onOpenBrief: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBrief }) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active card into view when tab is clicked
  const scrollToCard = (index: number) => {
    setActiveTab(index);
    if (scrollContainerRef.current) {
      const cardElements = scrollContainerRef.current.children;
      if (cardElements[index]) {
        (cardElements[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (activeTab + 1) % servicesData.length;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeTab - 1 + servicesData.length) % servicesData.length;
    scrollToCard(prevIdx);
  };

  // Sync active tab on manual user scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.children;
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    Array.from(cards).forEach((card, idx) => {
      const cardRect = (card as HTMLElement).getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeTab) {
      setActiveTab(closestIdx);
    }
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#08090B] py-20 sm:py-28 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      {/* Giant CRAFT watermark */}
      <SectionWatermark word="CRAFT" outline={true} speed={50} align="left" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-8 border-b border-[#1E2025]/60 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-3 flex items-center gap-2">
              <span className="text-[#F55B17]">02</span>
              <span>/</span>
              <span>ACT II: THE CRAFT</span>
              <span>/</span>
              <span className="text-[#F55B17]">CAPABILITIES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Engineered to Strike<span className="text-[#F55B17]">.</span>
            </h2>
          </div>

          {/* Navigation Controls: Prev/Next arrow buttons */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#888E99]">
              <span className="text-white font-bold">0{activeTab + 1}</span> / 0{servicesData.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous capability"
                className="btn-icon"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next capability"
                className="btn-icon"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Discipline Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {servicesData.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => scrollToCard(idx)}
              className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-[#F55B17] text-white font-semibold shadow-orange-sm'
                  : 'bg-[#101114] border border-[#1E2025] text-[#888E99] hover:border-[#C8CCD4]/40 hover:text-white'
              }`}
            >
              <span className={activeTab === idx ? 'text-white' : 'text-[#F55B17]'}>
                {service.number}
              </span>
              <span>{service.techPill}</span>
            </button>
          ))}
        </div>

        {/* Elevated Horizontal Card Track with Smooth Snap & Wheel Scroll */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="mt-10 flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-1"
        >
          {servicesData.map((service, index) => {
            const isActive = activeTab === index;

            return (
              <div
                key={service.id}
                onClick={() => setActiveTab(index)}
                className={`group relative w-[85vw] sm:w-[420px] lg:w-[440px] shrink-0 snap-center rounded-2xl border p-7 sm:p-9 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'border-[#F55B17] bg-[#101114] shadow-orange-md -translate-y-1'
                    : 'border-[#1E2025] bg-[#101114]/80 hover:border-[#C8CCD4]/40 hover:bg-[#101114]'
                }`}
              >
                {/* Tactical HUD Corner Crosshairs */}
                <div className="absolute top-3 left-3 text-[#1E2025] group-hover:text-[#F55B17] transition-colors pointer-events-none">
                  <Crosshair className="w-3.5 h-3.5" />
                </div>
                <div className="absolute top-3 right-3 text-[#1E2025] group-hover:text-[#F55B17] transition-colors pointer-events-none">
                  <Crosshair className="w-3.5 h-3.5" />
                </div>

                {/* Subtle Titanium Inner Glow */}
                <div className="absolute inset-0 rounded-2xl bg-titanium-gradient opacity-30 pointer-events-none" />

                <div>
                  {/* Top Bar: Number & Status Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-display font-black text-5xl transition-all duration-300 ${
                        isActive
                          ? 'text-[#F55B17] stroke-text-orange'
                          : 'stroke-text-silver group-hover:stroke-text-silver-bright'
                      }`}
                    >
                      {service.number}
                    </span>

                    <div className="flex items-center gap-2 rounded-full border border-[#1E2025] bg-[#08090B] px-3.5 py-1 font-mono text-xs text-[#C8CCD4]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F55B17] animate-pulse" />
                      <span>{service.accentMetric}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-[#F55B17] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-[#F55B17]">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm text-[#888E99] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 pt-5 border-t border-[#1E2025] space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-[#C8CCD4]">
                        <Check className="w-3.5 h-3.5 text-[#F55B17] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="mt-8 pt-5 border-t border-[#1E2025] flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#888E99]">
                    {service.techPill}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBrief();
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-[#F55B17] text-white shadow-orange-sm hover:bg-[#FF6E2E]'
                        : 'bg-[#08090B] text-[#C8CCD4] border border-[#1E2025] hover:border-[#F55B17] hover:text-white'
                    }`}
                  >
                    <span>Deploy</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Bar Indicator */}
        <div className="mt-8 flex items-center justify-between font-mono text-xs text-[#888E99]">
          <span className="hidden sm:inline">SWIPE OR USE CONTROLS TO EXPLORE</span>
          <div className="w-48 h-[2px] bg-[#1E2025] rounded-full overflow-hidden">
            <div
              style={{
                width: `${((activeTab + 1) / servicesData.length) * 100}%`,
              }}
              className="h-full bg-[#F55B17] transition-all duration-300"
            />
          </div>
          <span>6 ARCHITECTURAL DOMAINS</span>
        </div>
      </div>
    </section>
  );
};
