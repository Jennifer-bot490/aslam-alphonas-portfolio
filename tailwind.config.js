/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#050d1a', 900: '#081428', 800: '#0c1d3a', 700: '#13284d' },
        teal: { DEFAULT: '#14b8a6', glow: '#2dd4bf' },
        turq: '#40e0d0',
        gold: { DEFAULT: '#d4af37', soft: '#e8c765' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
