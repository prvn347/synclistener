/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkie: "#00091D",
      },
      fontFamily: {
        manrope: ["Manrope", "sans"],
      },
    },
  },
  plugins: [],
};
