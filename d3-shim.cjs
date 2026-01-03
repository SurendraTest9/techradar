// src/d3-shim.cjs
// CommonJS shim so Jest (CRA) doesn't try to parse ESM in d3 packages.
const d3Scale = require('d3-scale');
const d3ScaleChromatic = require('d3-scale-chromatic');

module.exports = {
  scaleOrdinal: d3Scale.scaleOrdinal,
  d3Scales: d3ScaleChromatic
};