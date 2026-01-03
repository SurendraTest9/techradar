// src/d3-shim.cjs

module.exports = {
  scaleOrdinal: null,
  d3Scales: null,
  __setMocks(scale, chromatic) {
    module.exports.scaleOrdinal = scale.scaleOrdinal;
    module.exports.d3Scales = chromatic;
  }
};
