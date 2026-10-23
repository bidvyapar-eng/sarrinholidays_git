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
          DEFAULT: '#D4AF37', // Subtle muted luxury gold
          foreground: '#0B0F19',
          50: '#FDFBF7',
          100: '#FAF5E8',
          200: '#F3E7C5',
          300: '#EBD89F',
          400: '#E0C774',
          500: '#D4AF37',
          600: '#B89326',
          700: '#91711A',
          800: '#6E5414',
          900: '#4D390E',
        },
        charcoal: {
          950: '#0B0F19', // Rich deep slate/charcoal
          900: '#111827',
          800: '#1F2937',
        },
        offwhite: {
          50: '#F8FAFC', // Slate-50 off-white
          100: '#F1F5F9',
        },
        gold: {
          DEFAULT: '#D4AF37',
          muted: '#C5A059',
          subtle: '#E2CE8F',
          dark: '#997B24',
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
