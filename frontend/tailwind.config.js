/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          50: "#ececff", // Very light version of #6d6fff
          100: "#dedeff",
          200: "#c0c0ff",
          300: "#a3a3ff",
          400: "#8686ff",
          500: "#6d6fff", // Base color
          600: "#5a5ae6",
          700: "#4a4ac2",
          800: "#3b3b99",
          900: "#2d2d73",
        },
      },
    },
  },
  plugins: [],
}