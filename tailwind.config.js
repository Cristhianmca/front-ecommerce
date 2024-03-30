/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        "open-menu": "url(./assets/menu.svg)",
        "close-menu": "url(./assets/close.svg)",
        "bbva-logo": "url(./cristhian/bbva.svg))",
        "img-fondo": "(./assets/photo_2023-11-06_16-34-47.jpg)",
        "img-fondo2": "(./assets/fondoanime.jpg);",
      }
    },
  },
  plugins: [],
}