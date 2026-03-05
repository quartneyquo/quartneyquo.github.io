import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sp: {
          bg: '#121212',
          dark: '#181818',
          hover: '#282828',
          sidebar: '#000000',
          accent: '#a855f7',
          'accent-light': '#c084fc',
          pink: '#f472b6',
          muted: '#a3a3a3',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
