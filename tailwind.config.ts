import type { Config } from 'tailwindcss'

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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#C5A059', // Antique Champagne Gold
          foreground: '#0C0B09',
          50: '#FAF7F0',
          100: '#F4ECE0',
          200: '#E8D9BD',
          300: '#DCC59A',
          400: '#D4B475',
          500: '#C5A059',
          600: '#A8833E',
          700: '#85642B',
          800: '#5C441C',
          900: '#3D2C11',
        },
        obsidian: {
          950: '#0C0B09', // Primary dark surface
          900: '#141310', // Elevated card surface
          800: '#1E1D19', // Elevated interactive surface
        },
        stone: {
          warm: '#B8B4AA', // Warm stone body text
        },
        offwhite: {
          50: '#F4F2EC', // Refined warm off-white
          100: '#EAE6DC',
        },
        gold: {
          DEFAULT: '#C5A059',
          hover: '#D4B475',
          muted: '#A8833E',
          subtle: '#E8D9BD',
          dark: '#5C441C',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        editorial: '0.25em',
      },
      lineHeight: {
        relaxed: '1.75',
        editorial: '1.85',
      },
    },
  },
  plugins: [],
}

export default config
