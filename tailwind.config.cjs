/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Legacy template tokens (kept so existing files don't break during the rebuild)
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        // New life-portfolio palette
        "bg-dark": "#0b0d0c",
        "text-dark": "#e8e6e1",
        "bg-cream": "#faf7f0",
        "light-text": "#1a1a1a",
        "light-muted": "#6b6b6b",
        "light-border": "#e6e1d3",
        "accent-green": "#3a6b3a",
        "accent-gold": "#c9a227",
        "accent-indigo": "#5b3aa0",
        "cat-life": "#8b8b8b",
        "cat-career": "#1e3a5f",
        "cat-coaching": "#c9a227",
        "cat-farm": "#3a6b3a",
        "cat-arts": "#c44d6e",
        "cat-music": "#7a4dc4",
        "cat-photography": "#2a8a8a",
        "cat-event": "#d97706",
        "cat-certification": "#555555",
        "cat-spiritual": "#5b3aa0",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
