/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C853',
        surface: '#fcf9f8',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#3c4a3c',
      },
    },
  },
  plugins: [],
}