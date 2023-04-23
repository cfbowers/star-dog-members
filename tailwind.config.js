/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "",
          hover: "",
        },
        secondary: {
          DEFAULT: "",
          hover: "",
        },
        tertiary: {
          DEFAULT: "",
          hover: "",
        },
        link: {
          DEFAULT: "",
          hover: "",
        },
        text: "",
        symantec: {
          info: "",
          success: "",
          warning: "",
          danger: "",
        },
      },
    },
  },
};
