const _ = require('lodash')
const colorsDefinition = require('./src/@core/scss/app/colors')
const breakpointsDefinition = require('./src/@core/scss/app/breakpoints')

const REM = 14
const colors = _.reduce(
  colorsDefinition,
  (memo, color, name) => {
    memo[name.replace('$', '')] = color
    return memo
  },
  {},
)

module.exports = {
  prefix: 't-',
  content: [
    `./src/@builder/**/*.js`,
    `./src/@domains/**/*.js`,
    `./src/components/**/*.js`,
    `./src/forms/**/*.js`,
    `./src/pages/**/*.js`,
  ],
  theme: {
    extend: {
      borderRadius: {
        '1/2': '50%',
      },
      boxShadow: _.reduce(
        colors,
        (memo, colorValue, colorName) => {
          memo[colorName] = `0 0 0 1px ${colorValue}`
          return memo
        },
        {},
      ),
    },
    screens: {
      xs: breakpointsDefinition.xs,
      sm: breakpointsDefinition.sm,
      md: breakpointsDefinition.md,
      lg: breakpointsDefinition.lg,
      xl: breakpointsDefinition.xl,
      xxl: breakpointsDefinition.xxl,
    },
    colors: _.reduce(
      colors,
      (memo, color, name) => {
        memo[name.replace('$', '')] = color
        return memo
      },
      { transparent: 'transparent' },
    ),
    spacing: _.reduce(
      new Array(100),
      (memo, value, index) => {
        memo[index] = `${(index / REM).toFixed(3)}rem`
        memo[`-${index}`] = `-${(index / REM).toFixed(3)}rem`
        return memo
      },
      {},
    ),
    inset: (theme) => theme('spacing'),
    width: (theme) => ({
      ..._.reduce(
        new Array(24),
        (memo, item, index) => {
          const newIndex = index + 1
          const percent = (newIndex * 100) / 24
          memo[`${newIndex}/24`] = `${percent.toFixed(2)}%`
          return memo
        },
        {},
      ),
      0: '0',
      auto: 'auto',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      ...theme('spacing'),
    }),
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
