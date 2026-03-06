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
        blush: {
          50: '#F9F6F7',
          100: '#F1E9EB',
          200: '#E2D2D5',
          300: '#C8AAAF',
          400: '#AD8690',
          500: '#926070',
          600: '#774050',
        },
        lavender: {
          50: '#F7F3FF',
          100: '#EDE8FF',
          200: '#DDD5FF',
          300: '#C9BCFF',
          400: '#B9A6FF',
          500: '#9F8AFF',
          600: '#8066FF',
        },
        plum: {
          50: '#F8F5F9',
          100: '#EDE5EF',
          200: '#D4C4D8',
          300: '#B9A0BE',
          400: '#9B7AA2',
          500: '#7A5680',
          600: '#614064',
          700: '#4F3052',
          800: '#3D2540',
          900: '#2B1B2E',
        },
      },
      fontFamily: {
        sans: [
          'Avenir Next',
          'Avenir',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 2px 20px rgba(43,27,46,0.06)',
        'soft-lg': '0 6px 40px rgba(43,27,46,0.11)',
        card: '0 1px 8px rgba(43,27,46,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
