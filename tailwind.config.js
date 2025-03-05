export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF385C',
        'airbnb-dark': '#222222',
        'airbnb-light': '#717171',
      },
    },
  },
  plugins: [],
}