const appRootDir = require('app-root-dir');
const resolver = require('../resolver');

module.exports = {
  resolve: resolver({ rootDir: appRootDir.get() }),
};
