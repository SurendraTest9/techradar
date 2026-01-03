module.exports = {
  presets: [
    // transpile to Node current (used when running tests)
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // if your project uses React (it appears you do), enable this:
    '@babel/preset-react'
    // If you use TypeScript, add '@babel/preset-typescript' (and install it)
  ],
};