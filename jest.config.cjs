module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },
  // allow Jest to transform ESM d3 packages (adjust the pattern to include other packages if needed)
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(d3-.*)/)'
  ],
  moduleFileExtensions: ['js','jsx','mjs','ts','tsx','json','node'],
  testEnvironment: 'jsdom'
};