module.exports = {
  content: ['_site/**/*.html'],
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
          gray: {
            dark: '#303841',
            vdark: '#1A1E23',
            light: '#DCE0E5'
          },
          offwhite: '#F5F5F5'
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
  plugins: [
    require('@tailwindcss/typography')
  ],
}
