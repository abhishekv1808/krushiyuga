/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,js}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#166534',
        sage: '#84cc16'
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
