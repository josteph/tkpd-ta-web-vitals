const base = require('./babel-options');

const babelOptions = {
  ...base,
  presets: [...base.presets, '@babel/preset-react'],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
