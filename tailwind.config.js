/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        "open-menu": "url(https://i.postimg.cc/HsMywS9N/menu.png)",
        "close-menu": "url(https://i.postimg.cc/HWRM7GX5/cerrar.png)",
        "bbva-logo": "url(./cristhian/bbva.svg))",
        "search": "url(https://i.postimg.cc/Z5g4BfsZ/hr-3-search-desktop.png)",
       
      }
    },
  },
  plugins: [],
}