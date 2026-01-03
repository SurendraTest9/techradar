const React = require('react');
const { scaleOrdinal, d3Scales } = require('../d3-shim.cjs');

exports.colorScales = [
  { name: 'schemeCategory10' },
  { name: 'schemeAccent' },
  { name: 'schemeDark2' },
  { name: 'schemePaired' },
  { name: 'schemeSet1' },
  { name: 'schemeSet2' },
  { name: 'schemeSet3' }
];

// set color scheme by index
// choose from 0 to 6
const DEFAULT_COLOR_SCHEME_INDEX = 5;
const DEFAULT_FONT_SIZE = 12;
const DEFAULT_COLOR_SCALE = getColorScale(5);
const DEFAULT_FONT_FAMILY = 'Arial, Helvetica, sans-serif';

function getColorScale(colorScaleIndex) {
  if (colorScaleIndex < 0 || colorScaleIndex >= exports.colorScales.length) {
    console.warn(
      'Unsupported color scheme. Please choose between 0 and ' +
        (exports.colorScales.length - 1)
    );
    return DEFAULT_COLOR_SCHEME_INDEX;
  }

  return scaleOrdinal(
    d3Scales[exports.colorScales[colorScaleIndex].name]
  );
}

exports.getColorScale = getColorScale;

exports.ThemeContext = React.createContext({
  colorScale: DEFAULT_COLOR_SCALE,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  itemFontSize: DEFAULT_FONT_SIZE,
  quadrantsConfig: {}
});