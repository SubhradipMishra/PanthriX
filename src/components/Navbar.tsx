import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagnetButton } from './ui/MagnetButton';

interface NavbarProps {
  onOpenBrief: () => void;
}

const NAV_LINKS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Why Us', href: '#why' },
];

/**
 * Brand mark.
 * 1. Tries /logo.png (put your file in /public/logo.png).
 * 2. If the file is missing or fails to load, renders a crisp inline SVG
 *    monogram instead, so the navbar never shows a broken/empty logo.
 */
const BrandMark: React.FC<{ compact: boolean }> = ({ compact }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${compact ? 'h-9 w-9' : 'h-11 w-11'
        }`}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-1.5 rounded-2xl bg-[#F55B17]/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Gradient ring */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#F55B17] via-[#F55B17]/30 to-transparent p-px">
        <div className="relative h-full w-full rounded-[11px] bg-gradient-to-b from-[#16181D] to-[#0B0C0F] flex items-center justify-center overflow-hidden">
          {/* Inner top highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />

          {!failed ? (
            <img
              src="/logo.png"
              alt="PanthriX logo"
              width={44}
              height={44}
              draggable={false}
              onError={() => setFailed(true)}
              className="relative h-[72%] w-[72%] object-contain select-none transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <svg
              viewBox="0 0 48 48"
              className="relative h-[68%] w-[68%] transition-transform duration-500 group-hover:scale-110"
              role="img"
              aria-label="PanthriX logo"
            >
              <defs>
                <linearGradient id="px-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF8A4C" />
                  <stop offset="100%" stopColor="#F55B17" />
                </linearGradient>
              </defs>
              {/* Angular panther-head silhouette with ears */}
              <path
                d="M6 8 L18 14 H30 L42 8 L40 24 C40 34 32 41 24 44 C16 41 8 34 8 24 Z"
                fill="url(#px-grad)"
                opacity="0.14"
                stroke="url(#px-grad)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* X monogram forming the eyes / claw marks */}
              <path
                d="M16 20 L32 36 M32 20 L16 36"
                stroke="url(#px-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrief }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string>('');

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Scrolled state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll + Escape to close when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center pointer-events-none">
        <div
          className={`pointer-events-auto relative w-full transition-all duration-500 ease-out ${scrolled
            ? 'max-w-6xl mt-3 mx-3 sm:mx-4 rounded-2xl lg:rounded-full py-2.5 bg-[#0B0C0F]/70 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,91,23,0.05),inset_0_1px_0_0_rgba(255,255,255,0.06)]'
            : 'max-w-7xl mt-0 py-6 bg-transparent border border-transparent'
            }`}
        >
          {/* Top light-streak accent (only when floating) */}
          <div
            className={`absolute inset-x-12 -top-px h-px bg-gradient-to-r from-transparent via-[#F55B17]/70 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'
              }`}
          />

          <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
            {/* Brand */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F55B17]/60 rounded-xl"
              aria-label="PanthriX Home"
            >
              <BrandMark compact={scrolled} />

              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-extrabold tracking-tight text-white flex items-center">
                  PANTHRI
                  <span className="bg-gradient-to-br from-[#FF8A4C] to-[#F55B17] bg-clip-text text-transparent">
                    X
                  </span>
                </span>
                <span
                  className={`font-mono text-[11px] tracking-[0.22em] uppercase text-[#888E99] hidden sm:block transition-all duration-500 overflow-hidden ${scrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-4 opacity-100 mt-1'
                    }`}
                >
                  Software Predator
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1 text-xs font-mono tracking-wider uppercase"
              aria-label="Main Navigation"
              onMouseLeave={() => setHovered(null)}
            >
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href;
                const isHovered = hovered === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative px-4 py-2 rounded-full transition-colors duration-300 ${isActive || isHovered
                      ? 'text-white'
                      : 'text-[#9BA1AD]'
                      }`}
                  >
                    {isHovered && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.08]"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-[#F55B17] shadow-[0_0_10px_2px_rgba(245,91,23,0.8)]"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Status + CTA */}
            <div className="hidden sm:flex items-center gap-4">
              <div
                className={`hidden xl:flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-[#C8CCD4] transition-all duration-500 ${scrolled ? 'opacity-0 w-0 px-0 border-transparent overflow-hidden' : 'opacity-100'
                  }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F55B17] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F55B17]" />
                </span>
                <span className="whitespace-nowrap text-[#9BA1AD]">
                  Available Q1/Q2
                </span>
              </div>

              <div className="relative group/cta">
                <div className="absolute -inset-1 rounded-full bg-[#F55B17]/30 blur-lg opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                <MagnetButton
                  variant="orange"
                  onClick={onOpenBrief}
                  className="relative py-2.5 px-5 text-xs"
                >
                  <span>Start Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </MagnetButton>
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="btn-icon lg:hidden relative z-50"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Scroll progress line */}
          <motion.div
            style={{ scaleX: progress }}
            className={`absolute left-6 right-6 -bottom-px h-[2px] origin-left rounded-full bg-gradient-to-r from-[#F55B17] via-[#FF8A4C] to-[#F55B17] shadow-[0_0_12px_rgba(245,91,23,0.7)] transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 lg:hidden bg-[#08090B]/95 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Ambient orange glow */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#F55B17]/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-[#F55B17]/10 blur-[100px]" />

            <div className="relative flex min-h-full flex-col justify-between px-6 pt-28 pb-10">
              <nav className="flex flex-col" aria-label="Mobile Navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="group flex items-baseline gap-4 py-4 border-b border-white/[0.06]"
                  >
                    <span className="font-mono text-xs text-[#F55B17]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-4xl font-bold tracking-tight transition-colors ${active === link.href
                        ? 'text-white'
                        : 'text-[#C8CCD4] group-hover:text-white'
                        }`}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight className="ml-auto h-5 w-5 self-center text-[#888E99] transition-all group-hover:text-[#F55B17] group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[#9BA1AD]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F55B17] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F55B17]" />
                  </span>
                  <span>Available for high-stakes projects · Q1/Q2</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBrief();
                  }}
                  className="btn-primary w-full py-4"
                >
                  <span>Start A Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};