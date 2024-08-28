import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: "#001219",
        },
        yellow: {
          300: "#ee9b00",
          500: "#ca6702",
        },
        pink: {
          200: "#e9d8a6",
        },
        purple: {
          100: "#e0aaff",
          200: "#c77dff",
          300: "#9d4edd",
          400: "#7b2cbf",
          500: "#5a189a",
          600: "#3c096c",
          700: "#240046",
          800: "#10002b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
