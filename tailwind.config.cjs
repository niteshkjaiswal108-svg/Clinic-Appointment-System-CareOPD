/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      primary: "#2563EB",
      primaryLight: "#60A5FA",
      navy: "#0F172A",
      success: "#22C55E",
      error: "#EF4444",
      bg: "#F8FAFC",
      card: "#FFFFFF",
      border: "#E5E7EB",
      textMuted: "#64748B"
      }
    },
  },
  plugins: [],
};
