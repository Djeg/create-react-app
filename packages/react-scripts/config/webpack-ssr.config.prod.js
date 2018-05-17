const config = require('./webpack.config.prod')
const path = require('path')
const paths = require('./paths')

module.exports = {
  ...config,
  target: 'node',
  devtool: 'source-map',
  entry: path.resolve(paths.appSrc, 'ssr', 'index.js'),
  output: {
    ...config.output,
    path: path.resolve(paths.appSsr),
    filename: 'index.js',
  },
}
