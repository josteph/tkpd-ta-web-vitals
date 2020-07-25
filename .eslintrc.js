module.exports = {
  extends: ['react-app'],
  parser: 'babel-eslint',
  env: {
    amd: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    __DEV__: true,
    __PROD__: true,
    __TEST__: true,
    expect: true,
  },
  plugins: [
    'import',
    'jsx-a11y',
    'prettier',
    'react',
    'react-hooks',
    'flowtype',
    'jest',
    'jest-dom',
    'testing-library',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
