const React = require('react');
const { scaleOrdinal, d3Scales } = require('./d3-shim.cjs');
const { render, screen } = require('@testing-library/react');

const AppModule = require('./App');
const App = AppModule && AppModule.default ? AppModule.default : AppModule;

test('App renders without crashing', () => {
  render(React.createElement(App));
  // Basic assertion to ensure render succeeded (adjust to a real assertion for your app)
  expect(true).toBe(true);
});