module.exports = {
  // Transform JS/TS and .mjs with babel-jest so ESM syntax is handled
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },
  // By default Jest ignores node_modules. Allow it to transform d3 packages
  // (adjust the list if you want only specific packages)
  transformIgnorePatterns: [
    '/node_modules/(?!(d3-.*)/)'
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'mjs', 'json', 'node']
};