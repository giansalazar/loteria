import flowbitePlugin from 'flowbite/plugin'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'dancing-script': ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [
    flowbitePlugin
  ]
}