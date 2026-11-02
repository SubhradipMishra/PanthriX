import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqList, engagementModels } from '../../data/faq';
import { SectionWatermark } from '../ui/SectionWatermark';
import { ChevronDown, Check, ArrowRight, Shield } from 'lucide-react';

interface EngagementFaqProps {
  onOpenBrief: () => void;
}

export const EngagementFaq: React.FC<EngagementFaqProps> = ({ onOpenBrief }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-[#08090B] py-28 sm:py-36 px-4 sm:px-6 lg:px-12">
      {/* Giant MODELS watermark */}
      <SectionWatermark word="MODELS" outline={true} speed={100} align="center" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#888E99] mb-3 flex items-center gap-2">
              <span className="text-[#F55B17]">09</span>
              <span>/</span>
              <span>TERMS OF ENGAGEMENT</span>
              <span>/</span>
              <span className="text-[#F55B17]">TRANSPARENCY</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Engagement Protocols<span className="text-[#F55B17]">.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#888E99] leading-relaxed">
            Clear scopes, transparent pricing models, and direct access to senior technical architects with zero bureaucracy.
          </p>
        </div>

        {/* Dual Layout: FAQ Accordion Left & Engagement Models Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-mono text-xs tracking-wider text-[#F55B17] mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Operational Questions</span>
            </h3>

            {faqList.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-[#1E2025] bg-[#101114] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-medium text-base text-white hover:text-[#F55B17] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#888E99] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#F55B17]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#888E99] leading-relaxed border-t border-[#1E2025]/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Engagement Cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fix for Issue 7: Removed uppercase on long heading text */}
            <h3 className="font-mono text-xs tracking-wider text-[#888E99] mb-6">
              Select Deployment Model
            </h3>

            <div className="space-y-6">
              {engagementModels.map((model) => (
                <div
                  key={model.id}
                  className={`relative rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                    model.isRecommended
                      ? 'border-[#F55B17] bg-[#101114] shadow-orange-md'
                      : 'border-[#1E2025] bg-[#101114]/70 hover:border-[#2E313A]'
                  }`}
                >
                  {/* Recommended Badge */}
                  {model.badge && (
                    <div className="absolute top-6 right-6">
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider ${
                          model.isRecommended
                            ? 'bg-[#F55B17] text-white shadow-orange-sm'
                            : 'bg-[#1E2025] text-[#C8CCD4]'
                        }`}
                      >
                        {model.badge}
                      </span>
                    </div>
                  )}

                  <div className="max-w-md">
                    <h4 className="font-display text-2xl font-bold text-white tracking-tight">
                      {model.name}
                    </h4>
                    <p className="font-mono text-xs text-[#F55B17] mt-0.5">
                      {model.cadence}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-[#888E99] leading-relaxed">
                      {model.idealFor}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#1E2025] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {model.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#C8CCD4]">
                        <Check className="w-3.5 h-3.5 text-[#F55B17] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Standardized button styles */}
                  <div className="mt-6 pt-5 border-t border-[#1E2025] flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#888E99]">
                      {model.commitment}
                    </span>
                    <button
                      onClick={onOpenBrief}
                      className={model.isRecommended ? 'btn-primary' : 'btn-secondary'}
                    >
                      <span>Inquire Model</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
