/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#EDEDED',
          text: '#0E1514',
          accent: '#03FA6E',
        },
        dark: {
          background: '#242424',
          text: '#f5f5f5',
          accent: '#03FA6E',
        },
        darked: '#242424',
        lighted: '#f5f5f5',
        product: '#E1F0EF',
        dark1: '#303030',
        light1: '#f5f5f5'
      },
    },
  },
  plugins: [],
}