/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            sans: ['Poppins'],
            mono: ['Roboto'],
         },
      },
      keyframes: {
         showItem: {
            from: { opacity: '.1' },
            to: { opacity: '1' },
         },
         fadeOn: {
            from: { transform: 'translatex(-30px)', opacity: '.6' },
            to: { transform: 'initial', opacity: '1' },
         },
         showModal: {
            from: { opacity: '.6' },
            to: { opacity: '1' },
         },
         movingItem: {
            from: { opacity: '.6' },
            to: { opacity: '1' },
         },
      },

      animation: {
         showItem: 'showItem .5s forwards ease-in-out',
         fadeOn: 'fadeOn .3s forwards ease-in',
         showModal: 'showModal .2s forwards ease',
         movingItem: 'movingItem .8s infinite alternate-reverse ease-in-out',
      },
   },
   plugins: [],
};
