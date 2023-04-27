const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const dotenv = require('dotenv')

const base = require('./webpack.base.js')

const src = path.resolve(__dirname, 'src')
const buildDate = Date.now()

module.exports = merge(base, {
  mode: 'development',
  entry: {
    amo: path.join(src, 'client.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: `[name].js?ver=${buildDate}`,
    chunkFilename: `[id].js?ver=${buildDate}`,
  },
  devtool: 'eval-source-map',
  plugins: [
    // Inject .env to the bundle
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
      'process.browser': JSON.stringify(true),
    }),
  ],

  // Setup dev server
  devServer: {
    allowedHosts: 'all',
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
    },
    compress: false,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8083,
    static: ['static'],
    watchFiles: {
      paths: ['src/**/*.js', 'src/**/*.css', 'src/**/*.scss'],
      options: {
        usePolling: true,
        awaitWriteFinish: {
          pollInterval: 20,
        },
      },
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  // Setup cache directory
  cache: process.env.CACHE
    ? {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, 'node_modules', '.cache', 'webpack'),
      }
    : false,
})
