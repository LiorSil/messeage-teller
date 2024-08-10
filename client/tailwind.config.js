/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import lineClamp from "@tailwindcss/line-clamp";
import filters from "tailwindcss-filters"; //
import daisyui from "daisyui";

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
    },
  },
  plugins: [
    forms, // Tailwind CSS forms plugin
    typography, // Tailwind CSS typography plugin
    lineClamp, // Tailwind CSS line-clamp plugin
    filters, // Tailwind CSS filters plugin for backdrop filters
    daisyui,
  ],
  daisyui: {
    themes: ["dark", "light", "emerald"],
  },
};
