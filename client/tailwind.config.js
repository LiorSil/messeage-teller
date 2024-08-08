/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

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
  ],
};
