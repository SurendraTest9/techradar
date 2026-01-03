jest.mock('d3-scale');
jest.mock('d3-scale-chromatic');

const React = require('react');
const d3Shim = require('../d3-shim.cjs'); // this will use the mocks
const { render } = require('@testing-library/react');

const AppModule = require('./App');
const App = AppModule && AppModule.default ? AppModule.default : AppModule;

test('App renders without crashing', () => {
  render(React.createElement(App));
  expect(true).toBe(true);
});
