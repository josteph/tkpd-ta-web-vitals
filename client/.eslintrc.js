const appRootDir = require('app-root-dir');
const path = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
      webpack: {
        config: {
          modules: [path.resolve(appRootDir.get(), './node_modules')],
          alias: path.resolve(appRootDir.get(), 'src/resolver/import.resolver.js'),
        },
      },
      react: {
        version: '16.8.6',
      },
    },
  },
};
