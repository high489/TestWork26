module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
    autoprefixer: {
      grid: true,
      flexbox: 'no-2009',
    },
  },
}