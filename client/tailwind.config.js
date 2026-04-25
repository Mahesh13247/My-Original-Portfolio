/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#39FF14", // Neon Green / Alien Green
        secondary: "#BF00FF", // Neon Purple
        "neon-blue": "#7DF9FF",
        "neon-red": "#E60000",
        "neon-green": "#2CFF05",
        "neon-purple": "#BF00FF",
        "neon-pink": "#FF00FF",
        "neon-yellow": "#FFFF00",
        background: "#020617",
        surface: "#0f172a",
        "on-background": "#f8fafc",
        "on-surface": "#f8fafc",
        "surface-variant": "#1e293b",
        "on-surface-variant": "#94a3b8",
        outline: "#334155",
        "outline-variant": "#1e293b",
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
