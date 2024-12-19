/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        mac: {
          beige: '#F9F9F9',
          'beige-light': '#FFFFFF',
          'beige-dark': '#F0F0F0',
          black: '#1A1A1A',
        }
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
};