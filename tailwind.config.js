/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aurora: {
          black: '#0a0a0c',
          charcoal: '#121216',
          deepBlue: '#0f172a',
          cyan: '#06b6d4',
          cyanGlow: '#22d3ee',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}