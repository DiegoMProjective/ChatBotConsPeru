/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", "serif"], // O cualquier otra fuente elegante
      },
      colors: {
        primary: "#0f172a", // Azul oscuro más elegante
      },
    },
  },
  plugins: [],
}
