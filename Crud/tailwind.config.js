module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust to your project
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
      colors: {
        primary: "#4D007D", // custom name and value
      },
    },
  },
  plugins: [],
};