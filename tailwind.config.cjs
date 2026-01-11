/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          text: '#c9d1d9',
          muted: '#8b949e',
          accent: '#58a6ff',
          success: '#238636',
          successHover: '#2ea043',
          warning: '#d29922',
          danger: '#f85149',
          trash: '#6e7681'
        }
      }
    },
  },
  plugins: [],
}

