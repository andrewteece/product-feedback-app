// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#AD1FEA',
        accent: '#4661E6',
        muted: '#647196',
        'text-primary': '#3A4374',
        'bg-light': '#F7F8FD',
        'bg-card': '#FFFFFF',
        status: {
          planned: '#F49F85',
          inProgress: '#AD1FEA',
          live: '#62BCFA',
        },
      },
    },
  },
  plugins: [],
};

export default config;
