const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const _ = require('lodash')

// local
const LinkMediaHTMLWebpackPlugin = require('./src/plugins/link-media-html-webpack-plugin')
const generateBase64String = require('./src/plugins/link-media-html-webpack-plugin/generateBase64String')
const colors = require('./src/@core/scss/app/colors')

module.exports = {
  module: {
    rules: [
      // font
      { test: /\.(woff|woff2|ttf|eot)$/, type: 'asset/resource' },
      // images
      { test: /\.(svg|png|PNG|jpg|JPG|jpeg|JPEG|webp|WEBP)$/, type: 'asset/resource' },
      // css
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
              modules: {
                mode: 'global',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line prefer-template
              additionalData: _.map(colors, (color, name) => `${name}: ${color}`).join('; ') + ';',
            },
          },
        ],
      },
      // js
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       // cacheDirectory: process.env.CACHE ? path.resolve(process.env.HOME, '.cache', 'babel') : false,
      //     },
      //   },
      // },
      {
        test: /\.m?js$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    // Inject theme variables to the bundle
    new webpack.DefinePlugin({
      $theme: JSON.stringify(colors),
    }),
    // Extract css to files with name pattern `{name}.media_{base64MediaString}.css`
    new MiniCssExtractPlugin({
      filename: `[name].media_${generateBase64String('screen')}.css`, // css file for media = "screen"
    }),
    // App Html template
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body', // inject scripts into body
    }),
    // Automatically adds the `media` attribute to generated <link> HTML elements
    new LinkMediaHTMLWebpackPlugin(),
    // Generate public folder: /static and /static/assets
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static/robots.txt', to: '' },
        { from: 'static', to: 'static' },
        { from: 'src/assets', to: 'static/assets' },
      ],
    }),
  ],
}
