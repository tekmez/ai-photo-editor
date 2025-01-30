/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        "Ubuntu-Medium": ["Ubuntu-Medium", "sans-serif"],
        "Ubuntu-Bold": ["Ubuntu-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

