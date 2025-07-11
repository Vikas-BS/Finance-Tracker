module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeInModal: 'fadeInModal 0.25s ease-out forwards',
      },
      keyframes: {
        fadeInModal: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      colors: {
        primary: {
          light: '#f87171',
          DEFAULT: '#ef4444',
          dark: '#b91c1c',
        },
        slate:{
           '950-custom': '#343541',
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
