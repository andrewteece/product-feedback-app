import { type Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
      colors: {
        primary: '#AD1FEA',
        'primary-hover': '#C75AF6',
        accent: '#F49F85',
        planned: '#F49F85',
        inprogress: '#AD1FEA',
        live: '#62BCFA',
        'text-primary': '#3A4374',
        'text-muted': '#647196',
        'bg-page': '#F7F8FD',
        'bg-card': '#FFFFFF',
        'border-card': '#CDD2EE',
      },
    },
  },
  plugins: [],
};

export default config;
