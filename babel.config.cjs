module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react'
    // add '@babel/preset-typescript' if you use TypeScript
  ]
};