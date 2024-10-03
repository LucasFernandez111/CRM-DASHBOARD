/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        customSteelblue: "#094B81", // Agrega tu color personalizado aquí
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
