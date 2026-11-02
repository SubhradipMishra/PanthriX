# PanthriX — Landing Page

> **"Unleash the Unbuilt."**  
> Premium, cinematic, story-driven, scroll-based landing page for **PanthriX**, a high-precision software engineering agency.

---

## Architecture & Tech Stack

- **React 18 + TypeScript + Vite 6**
- **Tailwind CSS** with design tokens for Obsidian, Surface, Predator Orange, and Titanium Silver
- **Framer Motion** for kinetic spring physics, word-by-word reveal, and modals
- **GSAP + ScrollTrigger** and **Lenis** for 60 FPS inertia smooth scrolling
- **Lucide Icons** for clean, minimal instrumentation iconography

---

## Quick Start Instructions

1. **Navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm run preview
   ```

---

## Customization Guide

### 1. Where to Change Color Palette
All color tokens are centralized as CSS custom properties and mapped directly into Tailwind.
- **CSS Variables**: `src/styles/index.css`
  ```css
  :root {
    --obsidian: #08090B;   /* dominant dark background */
    --surface: #101114;    /* card backgrounds */
    --line: #1E2025;       /* hairline borders */
    --orange: #F55B17;     /* Predator Orange accent */
    --orange-glow: rgba(245, 91, 23, 0.35);
    --silver: #C8CCD4;     /* Titanium Silver secondary */
    --white: #FFFFFF;      /* headlines & inverted section */
  }
  ```
- **Tailwind Config**: `tailwind.config.js` extends these tokens (`obsidian`, `surface`, `line`, `orange`, `silver`).

### 2. Where to Change Typography
- **Google Fonts & Fontshare imports**: `index.html`
  - Display: **Clash Display** & **Space Grotesk**
  - Body: **Inter**
  - Labels & Code: **JetBrains Mono**
- **Font mappings in Tailwind**: `tailwind.config.js` under `theme.extend.fontFamily`.

### 3. Where to Update Copy & Content
All structured section data is componentized and isolated in `src/data/`:
- **Services (01-06)**: `src/data/services.ts`
- **Process (Discover to Evolve)**: `src/data/process.ts`
- **Selected Work**: `src/data/work.ts`
- **Tech Arsenal**: `src/data/tech.ts`
- **Verified Metrics (Inverted Section)**: `src/data/stats.ts`
- **Testimonials**: `src/data/testimonials.ts`
- **FAQ & Engagement Models**: `src/data/faq.ts`
- **Hero & Manifesto text**: `src/components/sections/Hero.tsx` & `src/components/sections/Manifesto.tsx`
- **Final CTA**: `src/components/sections/FinalCTA.tsx`

---

## Storytelling Arc & Sections

- **00. Preloader**: Obsidian screen with SVG drawing the silver X, single orange flash like an eye opening, and physical split reveal.
- **01. Hero (Act I: The Hunt Begins)**: Giant faded PANTHRIX watermark, masked line reveal of *"Unleash the Unbuilt."*, glowing orange panther-eye orbs tracking mouse, magnetic hover buttons, and live availability pill.
- **02. Manifesto**: Pinned scroll section where paragraph words reveal from 10% to 100% opacity, with predator keywords highlighted in orange, and faded giant *WHY* watermark.
- **03. Services (Act II: The Craft)**: Pinned horizontal scroll section with outlined silver giant numerals (01-06), varying card heights for rhythm, titanium-to-orange borders, and *CRAFT* watermark.
- **04. Process**: 5 sticky stacking cards with vertical drawing orange progress line, giant faded step numbers, and *PROCESS* watermark.
- **05. Selected Work (Act III: The Proof)**: Alternating full-bleed showcases with dark browser frames, live telemetry visualizations, metric chips, custom cursor orange "STRIKE" view bubble, and case study detail modal.
- **06. Tech Stack**: Opposing infinite marquees in silver turning orange on hover with *STACK* watermark.
- **07. Numbers (Inverted Section)**: Pure white background with obsidian text for a hard contrast cut, diagonal claw slash clip-paths, animated count-up numbers, and *PROOF* watermark.
- **08. Why PanthriX**: Bento grid with 3D card tilt on hover, typing TypeScript code engine, SVG architecture diagram, 48h response clock, and radar network.
- **09. Testimonials**: Oversized orange quote marks, crossfading quotes, and client carousel with *TRUST* watermark.
- **10. FAQ & Engagement Models**: Minimal accordion + 3 deployment tier cards (Tactical Strike, Predator Retainer with glow, Architecture Recon) with *MODELS* watermark.
- **11. Final CTA (Act IV: The Strike)**: Full-screen obsidian, giant *LET'S BUILD* watermark, cursor-following orange glow, fast project brief trigger, and *"Your unbuilt idea is waiting."*
- **12. Footer**: Huge full-width PanthriX wordmark in silver-to-obsidian gradient, live UTC system clock, and smooth scroll to top.

---

&copy; PanthriX Engineering. Engineered to strike.

