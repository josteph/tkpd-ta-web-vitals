/* eslint-disable no-template-curly-in-string */
const { isEnvProduction, isEnvDevelopment } = require('./utils');

export default {
  babelrc: false,
  cacheDirectory: true,
  cacheCompression: isEnvProduction,
  compact: isEnvProduction,
  configFiles: false,
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'entry' }],
    ['@babel/preset-react', { development: isEnvDevelopment, useBuiltIns: true }],
  ],
  plugins: [
    'lodash',
    '@loadable/babel-plugin',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    ['@babel/plugin-transform-destructuring', { useBuiltIns: true }],
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    [
      'babel-plugin-named-asset-import',
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
          },
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            mode: 'remove',
            removeImport: true,
            additionalLibraries: ['prop-types-extra'],
            ignoreFilenames: ['node_modules'],
          },
        ],
      ],
    },
  },
};
