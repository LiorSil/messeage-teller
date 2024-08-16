/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

import filters from "tailwindcss-filters"; //


import colors from "./src/assets/colors.json";

const gradients = {
  "chat-background": colors.gradients.chatBackground,
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
      backgroundImage: {
        ...gradients,
      },
      fontFamily: {
        assistant: ["Assistant", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    forms, // Tailwind CSS forms plugin
    typography, // Tailwind CSS typography plugin

    filters, // Tailwind CSS filters plugin for backdrop filters
  ],
};
