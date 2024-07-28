/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['src/**/*.tsx'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  prefix: '',
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        400: '400ms',
        450: '450ms',
        550: '550ms',
        600: '600ms',
        650: '650ms',
        750: '750ms',
        800: '800ms',
        850: '850ms',
        900: '900ms',
        950: '950ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
