/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'typing': 'typing 3s steps(20, end) forwards, blink-caret 0.5s step-end infinite',
          'twinkle': 'twinkle 2s ease-in-out infinite', 
        },
        keyframes: {
          typing: {
            '0%': { width: '0%' },
            '100%': { width: '100%' },
          },
          'blink-caret': {
            '0%, 100%': { borderColor: 'transparent' },
            '50%': { borderColor: 'white' },
          },
          twinkle: {
            '0%': { opacity: '0.2', transform: 'scale(0.5)' },
            '50%': { opacity: '1', transform: 'scale(1)' },
            '100%': { opacity: '0.2', transform: 'scale(0.5)' },
          },
        },
      },
    },
    plugins: [],
  };