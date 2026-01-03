module.exports = {
  presets: [
    // transpile to Node current when running tests
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // if you use JSX
    '@babel/preset-react'
    // add '@babel/preset-typescript' here if you use TypeScript
  ],
};