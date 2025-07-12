/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./**/*.html', './js/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // Layout containers
    'container-custom',
    'container-custom-wide',

    // Services section
    /^card-services$/,
    /^card-services-/,

    // Team section
    /^team-card$/,
    /^team-card-/,
    /^team-meta$/,
    /^team-meta-text$/,

    // Achievements section
    /^counter-box$/,
    /^counter-number$/,
    /^counter-meta$/,
    /^counter-label$/,
    'achievements-item',

    // Projects section
    /^project-card$/,
    /^project-card-/,

    // Testimonials section
    /^testimonial-card$/,
    /^testimonial-quote$/,
    /^testimonial-meta$/,
    /^testimonial-divider$/,
    /^testimonial-meta-text$/,
    /^testimonial-author$/,
    /^testimonial-quote-icon$/,

    // Blog section
    /^article-card$/,
    /^article-card-/,

    // Utilities
    'font-roboto',
    'font-playfair',
    /^rotate-x-/,
    /^rotate-y-/,
    /^opacity-/,

    // Swiper plugin classes
    'swiper',
    'swiper-slide',
    'swiper-button-prev',
    'swiper-button-next',
  ],
  theme: {
    extend: {
      colors: {
        'everpine-100': '#e1f4f2',
        'everpine-300': '#a4d6cf',
        'everpine-500': '#23786d',
        'everpine-600': '#177165',
        'everpine-900': '#0a312c',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
