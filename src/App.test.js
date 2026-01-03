// Mock d3-scale before it's required
jest.mock('d3-scale');
jest.mock('d3-scale-chromatic');

const d3Scale = require('d3-scale');
const d3ScaleChromatic = require('d3-scale-chromatic');
const d3Shim = require('../d3-shim.cjs');

// Inject mocks into the shim
d3Shim.__setMocks(d3Scale, d3ScaleChromatic);

const React = require('react');
const { render, screen } = require('@testing-library/react');

const AppModule = require('./App');
const App = AppModule && AppModule.default ? AppModule.default : AppModule;

test('App renders without crashing', () => {
  render(React.createElement(App));
  expect(true).toBe(true);
});
