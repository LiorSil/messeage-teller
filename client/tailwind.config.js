/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

import colors from "./src/assets/colors.json"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [
    forms, // Tailwind CSS forms plugin
    typography, // Tailwind CSS typography plugin
  ],
};
