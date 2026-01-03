module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  // transform d3 ESM packages so Jest won't choke on `export`
  transformIgnorePatterns: [
    '/node_modules/(?!(d3-.*)/)'
  ],
  testEnvironment: 'jsdom'
};