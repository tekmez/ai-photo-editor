/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
          light: '#818CF8'
        },
        background: {
          DEFAULT: '#0A0A0B',
          secondary: '#18181B'
        },
        surface: {
          DEFAULT: '#27272A',
          secondary: '#3F3F46'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          tertiary: '#71717A'
        },
        accent: {
          DEFAULT: '#8B5CF6',
          secondary: '#A78BFA'
        },
        success: {
          DEFAULT: '#22C55E',
          dark: '#16A34A'
        },
        error: {
          DEFAULT: '#EF4444',
          dark: '#DC2626'
        }
      },
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        "Ubuntu-Medium": ["Ubuntu-Medium", "sans-serif"],
        "Ubuntu-Bold": ["Ubuntu-Bold", "sans-serif"],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      }
    },
  },
  plugins: [],
}

