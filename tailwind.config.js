// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        green: {
          100: 'var(--color-green-100)',
          300: 'var(--color-green-300)',
          500: 'var(--color-green-500)',
          600: 'var(--color-green-600)',
          900: 'var(--color-green-900)',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  content: ['./src/**/*.{html,php,js,jsx,ts,tsx}'],
};
