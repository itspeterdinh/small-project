/**
 * cloned from 'https://github.com/probablyup/link-media-html-webpack-plugin/blob/master/__tests__/index.js'
 * with some modification
 */

import _forEach from 'lodash/forEach'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// local
const LinkMediaHTMLWebpackPlugin = require('../index')
const generateBase64String = require('../generateBase64String')

const FIXTURE_DIR = path.join(__dirname, '../test-fixtures')
const OUTPUT_DIR = path.join(__dirname, 'dist')

/**
 * Helper function to read file or return empty
 */
const readFileOrEmpty = (path) => {
  try {
    return fs.readFileSync(path, 'utf-8')
  } catch (e) {
    return ''
  }
}

describe('generateBase64String', () => {
  it('should generate correct base64 string', () => {
    // strings and their base64 string value
    const strings = ['(min-width: 700px), handheld and (orientation: landscape)', 'screen']
    const base64Strings = ['KG1pbi13aWR0aDogNzAwcHgpLCBoYW5kaGVsZCBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUp', 'c2NyZWVu']

    _forEach(strings, (stringValue, index) => {
      expect(generateBase64String(stringValue)).toBe(base64Strings[index])
    })
  })
})

describe('LinkMediaHTMLPlugin', () => {
  it('should add `media` attributes to stylesheet links with filename has pattern `media_{base64MediaString}`', (done) => {
    webpack(
      {
        entry: {
          test: path.join(FIXTURE_DIR, 'entry.js'),
        },
        module: {
          rules: [
            // css
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
          ],
        },
        output: {
          path: OUTPUT_DIR,
        },
        plugins: [
          // Extract css to files with name pattern has `{name}.media_{base64MediaString}.css`
          new MiniCssExtractPlugin({
            filename: `[name].media_${generateBase64String('screen')}.css`, // css file for media = "screen"
          }),
          // App Html template
          new HtmlWebpackPlugin(),
          // Automatically adds the `media` attribute to generated <link> HTML elements
          new LinkMediaHTMLWebpackPlugin(),
        ],
      },
      (err, result) => {
        expect(err).toBeFalsy()

        const outputFile = readFileOrEmpty(path.resolve(OUTPUT_DIR, 'index.html'))
        const expectedFile = readFileOrEmpty(path.resolve(FIXTURE_DIR, 'expected_has_media.html'))

        // check output file must match expected file
        expect(outputFile).toEqual(expectedFile)

        // delete webpack output directory `dist`
        try {
          fs.rmdirSync(OUTPUT_DIR, { recursive: true })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error while deleting output directory')
        }

        done()
      },
    )
  })

  it('should NOT add `media` attributes to stylesheet links with filename NOT has pattern `media_{base64MediaString}`', (done) => {
    webpack(
      {
        entry: {
          test: path.join(FIXTURE_DIR, 'entry.js'),
        },
        module: {
          rules: [
            // css
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
          ],
        },
        output: {
          path: OUTPUT_DIR,
        },
        plugins: [
          // Extract css to files with name NOT has pattern `{name}.media_{base64MediaString}.css`
          new MiniCssExtractPlugin({
            filename: `[name].css`,
          }),
          // App Html template
          new HtmlWebpackPlugin(),
          // Automatically adds the `media` attribute to generated <link> HTML elements
          new LinkMediaHTMLWebpackPlugin(),
        ],
      },
      (err, result) => {
        expect(err).toBeFalsy()

        const outputFile = readFileOrEmpty(path.resolve(OUTPUT_DIR, 'index.html'))
        const expectedFile = readFileOrEmpty(path.resolve(FIXTURE_DIR, 'expected_not_has_media.html'))

        // check output file must match expected file
        expect(outputFile).toEqual(expectedFile)

        // delete webpack output directory `dist`
        try {
          fs.rmdirSync(OUTPUT_DIR, { recursive: true })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error while deleting output directory')
        }

        done()
      },
    )
  })
})
