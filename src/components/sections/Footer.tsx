import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#08090B] pt-20 pb-8 px-4 sm:px-6 lg:px-12 border-t border-[#1E2025] overflow-hidden select-none">
      {/* Hidden landmark heading to satisfy accessibility hierarchy (H2 inside footer) */}
      <h2 className="sr-only">Footer Directory & Operations</h2>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Grid of Links & Info */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-16 border-b border-[#1E2025]/60">
          {/* Brand info (Col 4) */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-[#101114] border border-[#1E2025] flex items-center justify-center">
                <img src="/logo.png" alt="PanthriX" className="h-5 w-5 object-contain" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                PANTHRI<span className="text-[#F55B17]">X</span>
              </span>
            </div>
            <p className="mt-4 text-xs text-[#888E99] leading-relaxed max-w-sm">
              We hunt down unbuilt software concepts and ship them with predator precision. Engineering bespoke web apps, mobile systems, SaaS platforms, and distributed cloud infrastructure.
            </p>

            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-[#C8CCD4]">
              <span className="h-2 w-2 rounded-full bg-[#F55B17] animate-pulse" />
              <span>SYSTEM CLOCK: {time || '00:00:00 UTC'}</span>
            </div>
          </div>

          {/* Navigation (Col 2) */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#F55B17] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 font-mono text-xs text-[#888E99]">
              <li>
                <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">Process</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Work</a>
              </li>
              <li>
                <a href="#why" className="hover:text-white transition-colors">Why PanthriX</a>
              </li>
            </ul>
          </div>

          {/* Disciplines (Col 3) */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#F55B17] mb-4">
              Disciplines
            </h3>
            <ul className="space-y-2.5 font-mono text-xs text-[#888E99]">
              <li>Custom Web Applications</li>
              <li>Mobile Native & Hybrid</li>
              <li>SaaS Cloud Platforms</li>
              <li>Applied AI Systems</li>
              <li>Distributed Backends & DevOps</li>
            </ul>
          </div>

          {/* Socials & Dispatch (Col 3) */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#F55B17] mb-4">
              Transmissions
            </h3>
            <ul className="space-y-2.5 font-mono text-xs text-[#888E99]">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub &rarr;
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  X / Twitter &rarr;
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn &rarr;
                </a>
              </li>
              <li className="pt-2 text-[#C8CCD4]">
                deploy@panthrix.io
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#888E99]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} PanthriX Engineering Inc.</span>
            <span>&middot;</span>
            <span className="text-white">Unleash the Unbuilt.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#C8CCD4] hover:text-[#F55B17] transition-colors group focus:outline-none"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 
        Full-width, 100% visible PANTHRIX wordmark:
        Uses an SVG viewBox so the entire word 'PANTHRIX' (including the signature X)
        mathematically fits within the viewport on every screen size without horizontal truncation.
      */}
      <div
        aria-hidden="true"
        className="relative mt-8 sm:mt-12 w-full select-none pointer-events-none flex justify-center items-center px-2 sm:px-6"
      >
        <svg
          viewBox="0 0 1200 210"
          className="w-full max-w-7xl h-auto overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Silver-to-transparent vertical gradient */}
            <linearGradient id="footer-panthrix-silver" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8CCD4" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#C8CCD4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#C8CCD4" stopOpacity="0" />
            </linearGradient>
            {/* Predator Orange gradient for the signature X */}
            <linearGradient id="footer-panthrix-orange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F55B17" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#F55B17" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F55B17" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <text
            x="600"
            y="175"
            textAnchor="middle"
            fontFamily="'Clash Display', 'Space Grotesk', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="215"
            letterSpacing="-6"
          >
            <tspan fill="url(#footer-panthrix-silver)">PANTHRI</tspan>
            <tspan fill="url(#footer-panthrix-orange)">X</tspan>
          </text>
        </svg>
      </div>
    </footer>
  );
};
