import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../../data/work';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenBrief: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenBrief }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl rounded-2xl bg-[#101114] border border-[#1E2025] shadow-2xl p-6 md:p-10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial-glow blur-3xl pointer-events-none opacity-20" />

          {/* Close button with standardized btn-icon */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="btn-icon absolute top-6 right-6"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#F55B17]">
            <span className="uppercase tracking-wider">{project.client}</span>
            <span className="text-[#1E2025]">/</span>
            <span className="text-[#888E99]">{project.year}</span>
            <span className="text-[#1E2025]">/</span>
            <span className="text-[#C8CCD4]">{project.category}</span>
          </div>

          <h2 className="mt-4 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {project.title}
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#F55B17] font-medium">
            {project.tagline}
          </p>

          <p className="mt-4 text-[#C8CCD4] leading-relaxed text-sm md:text-base">
            {project.description}
          </p>

          {/* Metrics Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="rounded-xl border border-[#1E2025] bg-[#08090B]/60 p-4">
                <div className="font-display text-2xl font-bold text-white">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[#888E99]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Highlights */}
          <div className="mt-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#888E99]">
              Engineering Specifications
            </h3>
            <div className="mt-3 space-y-2">
              {project.summaryDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-[#C8CCD4]">
                  <CheckCircle2 className="w-4 h-4 text-[#F55B17] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#1E2025] bg-[#08090B] px-3 py-1 font-mono text-xs text-[#C8CCD4]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Modal Actions */}
          <div className="mt-8 pt-6 border-t border-[#1E2025] flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-xs text-[#888E99]">
              Need a system engineered like {project.title}?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBrief();
              }}
              className="btn-primary"
            >
              <span>Build this with PanthriX</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
