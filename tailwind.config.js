/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#06141B",
        greeyBlue: "#253745",
        lightGraay: "#4A5C6A",
        darkBlue2: "#11212D",
        gray: "#9BABAB",
      },
      backgroundImage: {
        "hero-pattern": "url('/montanha.jpg')",
      },
    },
  },
  plugins: [],
};
