const config = {
  plugins: [
    '@tailwindcss/postcss',
    [
      'postcss-pxtorem',
      {
        rootValue: 75,
        unitPrecision: 5,
        propList: ['*'],
        selectorBlackList: ['html'],
        replace: true,
        mediaQuery: false,
        minPixelValue: 1
      }
    ],
    'autoprefixer'
  ]
}

export default config
