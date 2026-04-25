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
        primary: "#39FF14",       // Neon Alien Green
        secondary: "#BF00FF",     // Neon Purple
        "neon-blue": "#7DF9FF",   // Electric Blue
        "neon-red": "#E60000",    // Electric Red
        "neon-green": "#39FF14",  // Neon Green (same as primary)
        "neon-purple": "#BF00FF", // Neon Purple
        "neon-pink": "#FF00FF",   // Neon Pink
        "neon-yellow": "#FFFF00", // Neon Yellow
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
        '4xl': '2rem',
      },
      animation: {
        'gradient': 'gradient 6s linear infinite',
        'fade-in': 'fade-in 0.4s ease forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(57,255,20,0.2)' },
          '50%':       { boxShadow: '0 0 25px rgba(57,255,20,0.5)' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
}
