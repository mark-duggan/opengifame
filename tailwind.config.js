/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tofu: '#e8e3d9',
        putty: '#d6ceb1',
        oatmeal: '#ccc5b5',
        almond: '#ab784e',
        harvestwheat: '#dec5a5',
        buff: '#edc594',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
