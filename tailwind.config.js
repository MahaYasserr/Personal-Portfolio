/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Fraunces"', '"DM Serif Display"', "ui-serif", "serif"],
      },
      colors: {
        cream: {
          50: "#fdf6ee",
          100: "#fbeede",
        },
      },
      boxShadow: {
        cozy: "0 20px 60px -15px rgba(251,113,133,0.25)",
      },
    },
  },
  plugins: [],
};
