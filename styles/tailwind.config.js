module.exports = {
  purge: {
    content: ['_site/**/*.html'],
    options: {
      safelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sharetech': ['"Share Tech Mono"', 'monospace'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        neon: {
          base: '#fadf0f',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
