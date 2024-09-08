/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: "#76ca6f",
      "blue-dark": "#1b3747",
      "blue-dark-opacity": "#1b374799",
      yellow: "#ffc600",
      grey: "#A6A5A5",
      "grey-stroke": "#D2D2D2",
      "grey-dark": "#717171",
      "grey-opacity": "#EDEDED",
      white: "#ffffff",
      black: "#000000",
      error: "#DC0303",
      warning: "#DC7603",
      success: "#76ca6f",
    },

    container: {
      center: true,
      padding: "2rem",
    },
    important: true,
    extend: {
      dropShadow: {
        custom: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
