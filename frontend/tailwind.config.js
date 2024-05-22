/** @type {import('tailwindcss').Config} */
import { withUt } from 'uploadthing/tw';

export default withUt({
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'dark-green': '#6A7349',
      'light-green': '#D9D3B8',
      yellow: '#F2B66D',
      'bright-orange': '#F48437',
      'dark-orange': '#F25922',
      black: '#282828',
      white: '#F8F7F4',
      'about-green': '#3D453B',
      'light-yellow': '#f0cca5',
      'comment-orange': '#ede1df',
    },
    fontFamily: {
      ubuntu: ['Ubuntu', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'custom-shape': "url('/parallax/shape.svg')",
      },
      keyframes: {
        'bounce-back': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'bounce-back': 'bounce-back 0.5s ease-out',
      },
    },
  },
  plugins: [],
});
