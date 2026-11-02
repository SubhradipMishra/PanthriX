/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "var(--obsidian, #08090B)",
        surface: "var(--surface, #101114)",
        "surface-light": "#17181D",
        line: "var(--line, #1E2025)",
        "line-bright": "#2E313A",
        orange: {
          DEFAULT: "var(--orange, #F55B17)",
          glow: "var(--orange-glow, rgba(245, 91, 23, 0.35))",
          hover: "#FF6E2E",
          dim: "#C2430C",
        },
        silver: {
          DEFAULT: "var(--silver, #C8CCD4)",
          dim: "#888E99",
          muted: "#5B616E",
        },
      },
      fontFamily: {
        display: ["'Clash Display'", "'Space Grotesk'", "sans-serif"],
        grotesk: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee-left": "marqueeLeft 28s linear infinite",
        "marquee-right": "marqueeRight 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, var(--orange-glow) 0%, transparent 70%)",
        "titanium-gradient": "linear-gradient(135deg, rgba(200, 204, 212, 0.15) 0%, rgba(200, 204, 212, 0.02) 100%)",
        "titanium-border": "linear-gradient(135deg, rgba(200, 204, 212, 0.3) 0%, rgba(30, 32, 37, 0.4) 100%)",
        "orange-border": "linear-gradient(135deg, #F55B17 0%, rgba(245, 91, 23, 0.1) 100%)",
      },
      boxShadow: {
        "orange-sm": "0 0 15px rgba(245, 91, 23, 0.25)",
        "orange-md": "0 0 30px rgba(245, 91, 23, 0.35)",
        "orange-lg": "0 0 60px rgba(245, 91, 23, 0.45)",
        "titanium": "0 10px 30px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
}

