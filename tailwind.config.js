/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif']
    },
     colors: {
        dark: '#1C2434',
        light: '#F9FAFB',
        primary: '#FFD700',
        secondary: '#252e40fc',

      },
  },
  plugins: [],
}