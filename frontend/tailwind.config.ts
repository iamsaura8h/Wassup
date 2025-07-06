// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lilac: {
          DEFAULT: "#F5EFFF",
          soft: "#E5D9F2",
          accent: "#CDC1FF",
          deep: "#A594F9"
        },
        darkbg: "#0f0f11", // pastel black
      },
    },
  },
  plugins: [],
};
export default config;
