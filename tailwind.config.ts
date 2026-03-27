import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Arcane Digital Shield Brand Colors
        arcane: {
          // Primary - Deep dark backgrounds
          dark: '#0a0f1a',
          darker: '#060a12',
          // Cyan accent - brand highlight
          cyan: '#22d3ee',
          'cyan-bright': '#67e8f9',
          'cyan-dim': '#0891b2',
          // Green - Systems secure
          secure: '#34d399',
          'secure-bright': '#6ee7b7',
          // Red - Threat detected
          threat: '#ef4444',
          'threat-bright': '#f87171',
          // Amber - Warning
          warning: '#f59e0b',
          // Purple - Premium/advanced
          premium: '#8b5cf6',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
