/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        'primary-dull': '#3e9441',
      },
      borderRadius: {
        full: '9999px',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
