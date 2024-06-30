/** @type {import('tailwindcss').Config} */

const colors = {
  bgPrimary: '#1e1a1d',
  textLight: '#f4b29f',
};

module.exports = {
  content: ['./src/**/*.{js,ts}', './src/**/*'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        ...colors,
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        'gradientRadial': 'radial-gradient(red, blue))',
      },
      boxShadow: {
        card: '-5px 5px 10px 5px rgba(0, 0, 0, 0.3)',
        button: '0px 0px 10px 1px rgba(0,0,0,0.5);',
      },
      transitionTimingFunction: {
        openToast: 'cubic-bezier(0.68, -0.55, 0.265, 1.35)',
      },
      content: {
        empty: '\'\'',
      },
      animation: {
        progress: 'progress 5s linear forwards',
        loader: 'loader 1s ease infinite',
        spinnerOne: 'spinnerOne 1.2s linear infinite',
        spinnerTwo: 'spinnerTwo 1.2s linear infinite',
      },
      keyframes: {
        progress: {
          '100%': {right: '100%'},
        },
        loader: {
          '100%': {
            transform: 'rotate(360deg) translate(30px)',
          },
        },
        spinnerOne: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
            borderWidth: '1px',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        spinnerTwo: {
          '0%': {
            transform: 'rotate(0deg)',
            borderWidth: '5px',
          },
          '50%': {
            transform: 'rotate(180deg)',
            borderWidth: '10px',
          },
          '100%': {
            transform: 'rotate(360deg)',
            borderWidth: '5px',
          },
        },
      },
      animationDelay: {
        500: '0.5s',
      },
    },
    screens: {
      lg: '1280px',
      laptops: {max: '1025px'},
      md: {max: '768px'},
      tablet: {max: '640px'},
      sm: {max: '440px'},
      min: '120px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
