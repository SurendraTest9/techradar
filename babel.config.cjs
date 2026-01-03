module.exports = {
  // ensure Babel will handle both project files and node_modules we opt into
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react'
    // add '@babel/preset-typescript' if you use TypeScript
  ],
  // let Babel choose module type when ambiguous
  sourceType: 'unambiguous'
};