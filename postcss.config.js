module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyParams: true,
          minifySelectors: true,
        }]
      }
    } : {})
  },
}
