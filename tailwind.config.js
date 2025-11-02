/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}",
    "./public/**/*.html",
    // Add all file paths where you use Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}