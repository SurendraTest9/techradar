// Mock d3-scale before it's required
jest.mock('d3-scale');
jest.mock('d3-scale-chromatic');

const React = require('react');
const { scaleOrdinal, d3Scales } = require('../d3-shim.cjs');
const { render, screen } = require('@testing-library/react');

const AppModule = require('./App');
const App = AppModule && AppModule.default ? AppModule.default : AppModule;

test('App renders without crashing', () => {
  render(React.createElement(App));
  expect(true).toBe(true);
});