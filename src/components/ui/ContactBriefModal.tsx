import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface ContactBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactBriefModal: React.FC<ContactBriefModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$30k - $60k',
    timeline: '1-2 Months',
    idea: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const budgets = ['$15k - $30k', '$30k - $60k', '$60k - $120k', '$120k+'];
  const timelines = ['ASAP (< 1 mo)', '1-2 Months', '3-4 Months', 'Flexible'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '$30k - $60k',
      timeline: '1-2 Months',
      idea: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#101114] border border-[#1E2025] shadow-2xl p-6 sm:p-8 md:p-10 overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-radial-glow blur-3xl pointer-events-none opacity-20" />

          {/* Close button with standardized btn-icon */}
          <button
            onClick={onClose}
            aria-label="Close form"
            className="btn-icon absolute top-6 right-6"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F55B17]/20 border border-[#F55B17] text-[#F55B17] mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Recon Signal Received.
              </h3>
              <p className="mt-3 text-sm text-[#C8CCD4] max-w-md mx-auto leading-relaxed">
                Our principal engineer has logged your project specs. Expect a surgical breakdown and NDA within 24 hours to <span className="text-white font-mono">{formData.email || 'your email'}</span>.
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F55B17]">
                <span className="h-2 w-2 rounded-full bg-[#F55B17] animate-pulse" />
                <span>Confidential Project Brief</span>
              </div>

              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Hunt Down Your Unbuilt Idea.
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#888E99]">
                Fill out the parameters below. We respond with architectural estimates in &lt; 24h.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs tracking-wider text-[#888E99] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-[#1E2025] bg-[#08090B] px-4 py-2.5 text-sm text-white placeholder-[#5B616E] focus:border-[#F55B17] focus:outline-none focus:ring-1 focus:ring-[#F55B17]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs tracking-wider text-[#888E99] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-[#1E2025] bg-[#08090B] px-4 py-2.5 text-sm text-white placeholder-[#5B616E] focus:border-[#F55B17] focus:outline-none focus:ring-1 focus:ring-[#F55B17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-wider text-[#888E99] mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Vortex Autonomous Networks"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-[#1E2025] bg-[#08090B] px-4 py-2.5 text-sm text-white placeholder-[#5B616E] focus:border-[#F55B17] focus:outline-none focus:ring-1 focus:ring-[#F55B17]"
                  />
                </div>

                {/* Budget selection pills using unified btn-pill / btn-pill-active */}
                <div>
                  <label className="block font-mono text-xs tracking-wider text-[#888E99] mb-1.5">
                    Target Budget Scope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={formData.budget === b ? 'btn-pill-active text-center' : 'btn-pill text-center'}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline selection pills using unified btn-pill / btn-pill-active */}
                <div>
                  <label className="block font-mono text-xs tracking-wider text-[#888E99] mb-1.5">
                    Launch Urgency
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timelines.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, timeline: t })}
                        className={formData.timeline === t ? 'btn-pill-active text-center' : 'btn-pill text-center'}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Idea textarea */}
                <div>
                  <label className="block font-mono text-xs tracking-wider text-[#888E99] mb-1.5">
                    Describe the Unbuilt Concept *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief summary of what you are hunting to build, key architecture goals, or current scaling bottlenecks..."
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    className="w-full rounded-lg border border-[#1E2025] bg-[#08090B] px-4 py-2.5 text-sm text-white placeholder-[#5B616E] focus:border-[#F55B17] focus:outline-none focus:ring-1 focus:ring-[#F55B17]"
                  />
                </div>

                {/* Guarantees */}
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#888E99] pt-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#F55B17]" />
                    Mutual NDA Guaranteed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F55B17]" />
                    Response in &lt; 24h
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-3 py-3.5 shadow-orange-md disabled:opacity-50"
                >
                  {loading ? (
                    <span>Encrypting Transmission...</span>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
