/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        garamond: ["var(--font-garamond)", "Georgia", "serif"],
      },
      colors: {
        primary: "#4F46E5",
        secondary: "#06B6D4",
        danger: "#EF4444",
        accent: "#E8521A",
        dark: "#0d0d0d",
      },
    },
  },
  plugins: [],
};
