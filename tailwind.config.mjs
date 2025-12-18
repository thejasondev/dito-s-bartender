/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5A2B",
          light: "#A67C52",
          dark: "#704A23",
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          light: "#333333",
          dark: "#000000",
        },
        accent: {
          DEFAULT: "#D4AF37",
          light: "#E5C158",
          dark: "#B3922E",
        },
        // ============ CHRISTMAS COLORS (Remove after season) ============
        christmas: {
          red: "#B22222",
          green: "#1B4332",
          gold: "#D4AF37",
          snow: "#FFFAFA",
          ice: "#A8D8EA",
        },
        // =================================================================
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero-bg.jpg')",
        texture: "url('/images/texture.png')",
      },
    },
  },
  plugins: [],
};
