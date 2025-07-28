// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
        },
        bg: {
          page: 'var(--bg-page)',
          card: 'var(--bg-card)',
        },
        border: {
          header: 'var(--border-header)',
          card: 'var(--border-card)',
        },
        button: {
          primary: 'var(--btn-primary)',
          hover: 'var(--btn-primary-hover)',
        },
        status: {
          planned: 'var(--status-planned)',
          inprogress: 'var(--status-inprogress)',
          live: 'var(--status-live)',
        },
        badge: {
          bg: 'var(--badge-bg)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
