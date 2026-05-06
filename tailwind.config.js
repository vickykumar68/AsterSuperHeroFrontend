/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        goldman: ['GoldmanSans', 'sans-serif'],
        gtwalsheim: ['GTWalsheimPro', 'sans-serif'],
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0,0,0,0.45)',
        DEFAULT: '2px 2px 4px rgba(0,0,0,0.65)',
        lg: '3px 3px 6px rgba(0,0,0,0.8)',
        black: '2px 2px 4px rgba(0,0,0,0.9)',
        red: '2px 2px 4px rgba(255,0,0,0.7)',
        blue: '2px 2px 4px rgba(0,0,255,0.7)',
        green: '2px 2px 4px rgba(0,255,0,0.7)',
        neon: '0px 0px 8px rgba(0,255,174,0.9), 0px 0px 16px rgba(0,255,174,0.7)', 
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const shadows = theme('textShadow');
      const newUtilities = Object.entries(shadows).map(([key, value]) => {
        return {
          [`.text-shadow${key === 'DEFAULT' ? '' : '-' + key}`]: {
            textShadow: value,
          },
        };
      });
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
