// tailwind.config.js - Configuration for Tailwind CSS
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of the template files
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Scans all JavaScript/TypeScript files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}" // Scans all JavaScript/TypeScript files in the components directory
  ],
  // Extend the default theme (currently no customizations)
  theme: {
    extend: {},
  },
  // No additional plugins are used
  plugins: [],
};
