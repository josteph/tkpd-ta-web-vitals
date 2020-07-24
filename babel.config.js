/* eslint-disable no-template-curly-in-string */
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    ['@babel/plugin-transform-destructuring', { useBuiltIns: true }],
    ['@babel/plugin-transform-runtime', { helpers: false, regenerator: true }],
  ],
};
