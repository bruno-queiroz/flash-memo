/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1b4965",
        "primary-yellow": "#ff9f1c",
        "aqua-blue": "#2ec4b6",
        "light-blue": "#5fa8d3",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
