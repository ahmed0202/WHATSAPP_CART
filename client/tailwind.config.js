/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        142: 500,
        170: 600,
      },
      colors: {
        hix: {
          DEFAULT: "#E9EBF0",
        },
        bluish: {
          DEFAULT: "#3050B8",
          800: "#193DB0",
          900: "#183AA7",
        },
        GRAISH: {
          DEFAULT: "#525F7F",
        },
      },
    },
  },
  plugins: [],
};
