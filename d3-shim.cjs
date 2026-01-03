// src/d3-shim.cjs
// CommonJS shim so Jest (CRA) doesn't try to parse ESM in d3 packages.

let d3Scale;
let d3ScaleChromatic;

try {
  d3Scale = require('d3-scale');
  d3ScaleChromatic = require('d3-scale-chromatic');
} catch (e) {
  // Fallback for Jest: use mocks if real modules can't be loaded
  d3Scale = require('d3-scale'); // this will resolve to the mock
  d3ScaleChromatic = require('d3-scale-chromatic');
}

module.exports = {
  scaleOrdinal: d3Scale.scaleOrdinal,
  d3Scales: d3ScaleChromatic,
};
