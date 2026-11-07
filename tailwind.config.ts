import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: 'rgb(var(--void-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--void) / <alpha-value>)',
          900: 'rgb(var(--void-900) / <alpha-value>)',
          800: 'rgb(var(--void-800) / <alpha-value>)',
          700: 'rgb(var(--void-700) / <alpha-value>)',
        },
        brass: {
          light: 'rgb(var(--brass-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--brass) / <alpha-value>)',
          muted: 'rgb(var(--brass-muted) / <alpha-value>)',
          dark: 'rgb(var(--brass-dark) / <alpha-value>)',
          faint: 'var(--brass-faint)',
        },
        parchment: {
          DEFAULT: 'rgb(var(--parchment) / <alpha-value>)',
          dim: 'rgb(var(--parchment-dim) / <alpha-value>)',
          dark: 'rgb(var(--parchment-dark) / <alpha-value>)',
        },
        footer: 'rgb(var(--footer-bg) / <alpha-value>)',
        heresy: {
          DEFAULT: '#A62B2B',
          glow: 'rgba(166, 43, 43, 0.35)',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        japanese: ['var(--font-cinzel)', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-reverse': 'spin-reverse 45s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
      boxShadow: {
        'brass-glow': '0 0 25px -5px rgb(var(--brass) / 0.3)',
        'heresy-glow': '0 0 25px -5px rgba(166, 43, 43, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
