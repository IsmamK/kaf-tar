const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        alf: '#e6b800', // Add your custom color here
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pause: {
          '0%, 25%': { transform: 'translateX(0)' },  // Pause for a while
          '100%': { transform: 'translateX(-100%)' }, // Then continue
        },
        'fade-slide-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'pause-marquee': 'pause 40s linear infinite', // Animation with a pause
        'fade-slide-up': 'fade-slide-up 0.8s ease-out',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('daisyui'),
    ],
}