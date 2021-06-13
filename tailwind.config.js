module.exports = {
  purge: {
    content: ['_site/**/*.html'],
  },
  theme: {
    extend: {
      fontFamily: {
        'sharetech': ['"Share Tech Mono"', 'monospace'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        my: {
          yellow: '#fadf0f',
          blue: '#0a7cff',
          green: '#1fffdc',
          orange: '#f45d01',
        },
      },
      lineHeight: {
        'default': 'normal',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
