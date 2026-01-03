module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  // Allow Jest to transform ES modules from d3 packages
  transformIgnorePatterns: [
    '/node_modules/(?!(d3-.*)/)'
  ],
  testEnvironment: 'jsdom'
};