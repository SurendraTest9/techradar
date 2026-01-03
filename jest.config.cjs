module.exports = {
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.cjs' }],
    '^.+\\.mjs$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.js'],
  globals: {
    'babel-jest': {
      useESM: true
    }
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(d3-.*)/)'
  ],
  testEnvironment: 'jsdom'
};