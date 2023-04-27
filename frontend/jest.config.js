const config = {
  testTimeout: 10000, // 10 seconds
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '\\.js$': ['babel-jest', { configFile: './babel-jest.config.js' }],
  },
}

module.exports = config
