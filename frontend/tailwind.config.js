/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dark-green': '#6A7349',
      'light-green': '#D9D3B8',
      'yellow': '#F2B66D',
      'bright-orange': '#F48437',
      'dark-orange': '#F25922',
      'black': '#282828',
      'white': '#F8F7F4',
    },
    // boxShadow: {
    //   'inner-white': 'inset 0 0 10px 0 white', // Adjust the values to your needs
    // },
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

