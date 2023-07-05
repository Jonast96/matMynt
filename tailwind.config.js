/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#101119",
      secondary: "#656d9a",
      accent: "#5b628b",
      white: "#FAF9F6",
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".hide-scrollbar": {
          "@apply overflow-auto": {},
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
