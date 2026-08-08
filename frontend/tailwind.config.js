/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C41E1E',
          light: '#E84545',
          dark: '#8B0000',
        },
        gold: {
          DEFAULT: '#D4A017',
          light: '#F0C94E',
          dark: '#B8860B',
        },
        dark: '#1A1A1A',
        cream: '#FFF8F0',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}