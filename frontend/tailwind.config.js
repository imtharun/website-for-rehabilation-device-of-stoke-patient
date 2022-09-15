/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      forCard: { raw: "(max-width: 970px) and (min-width:550px)" },
      forTimer: "970px",
      xxxs: "350px",
      xs: "550px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      970: "970px",

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      fontFamily: {
        workSans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
