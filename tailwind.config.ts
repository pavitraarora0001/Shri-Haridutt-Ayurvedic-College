import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ayurveda: {
          green: "#173D32",       // Deep Ayurvedic Green
          "green-dark": "#0F2821",
          "green-light": "#215344",
          gold: "#C5A46D",        // Antique Gold
          "gold-light": "#E0C99E",
          "gold-dark": "#9A7E4F",
          ivory: "#F6F2E9",       // Ivory Cream
          "ivory-dark": "#ECE5D8",
          brown: "#342B25",       // Heritage Brown
          "brown-light": "#54463C",
          sage: "#81917A",        // Sage Green
          "sage-light": "#A2B09C",
          "sage-dark": "#63735D",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(197, 164, 109, 0.25)",
        luxury: "0 10px 30px -5px rgba(23, 61, 50, 0.15)",
        card: "0 2px 12px 0 rgba(52, 43, 37, 0.06)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C5A46D 0%, #E0C99E 50%, #9A7E4F 100%)",
        "green-gradient": "linear-gradient(135deg, #173D32 0%, #0F2821 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
