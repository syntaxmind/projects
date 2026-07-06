import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink:    '#0A0C10',
        ink2:   '#12161C',
        ink3:   '#1B212A',
        bone:   '#F2EEE4',
        boneDim:'#9A9EA6',
        flame:  '#00F0FF', // Neon Cyan
        ember:  '#0066FF', // Deep Blue
        azure:  '#2E6BFF',
        moss:   '#274A32',
        steel:  '#767C88',
        // keep legacy colors just in case
        "gag-black": "#0a0a0a",
        "gag-dark": "#111111",
        "gag-card": "#161616",
        "gag-border": "#222222",
        "gag-white": "#f5f5f0",
        "gag-yellow": "#f5c518",
        "gag-blue": "#0047bb",
        "gag-concrete": "#888888",
      },
      fontFamily: {
        anton:  ['var(--font-anton)', 'sans-serif'],
        arch:   ['var(--font-archivo)', 'sans-serif'],
        grotesk:['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono:   ['var(--font-space-mono)', 'monospace'],
        display: ["var(--font-anton)", "sans-serif"],
        bangers: ["var(--font-bangers)", "cursive"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      maxWidth: { site: '1480px' },
      keyframes: {
        marquee:   { '0%':{transform:'translateX(0)'}, '100%':{transform:'translateX(-50%)'} },
        floatA:    { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-14px)'} },
        floatB:    { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(12px)'} },
        spinSlow:  { to:{transform:'rotate(360deg)'} },
        shimmer:   { '100%':{transform:'translateX(100%)'} },
        pop:       { '0%':{transform:'scale(.7)',opacity:'0'}, '100%':{transform:'scale(1)',opacity:'1'} },
        portalIn:  { '0%':{transform:'scale(.55)',opacity:'0',filter:'blur(8px)'}, '100%':{transform:'scale(1)',opacity:'1',filter:'blur(0)'} },
        riseIn:    { '0%':{transform:'translateY(24px)',opacity:'0'}, '100%':{transform:'translateY(0)',opacity:'1'} },
      },
      animation: {
        marquee:  'marquee 26s linear infinite',
        marqFast: 'marquee 16s linear infinite',
        floatA:   'floatA 5s ease-in-out infinite',
        floatB:   'floatB 6s ease-in-out infinite',
        spinSlow: 'spinSlow 26s linear infinite',
        portalIn: 'portalIn 1.1s cubic-bezier(.16,1,.3,1) both',
      },
    },
  },
  plugins: [forms, aspectRatio],
};
export default config;
