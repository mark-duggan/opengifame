/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  important: true,
  theme: ['dracula'],
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    themes: true,
  },
};
