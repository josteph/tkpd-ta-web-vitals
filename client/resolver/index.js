const path = require('path');

function resolver({ rootDir }) {
  const appSrc = `${rootDir}/client`;

  return {
    '@': path.resolve(appSrc),
    '@config': path.resolve(rootDir, './config/'),
    '@utils': path.resolve(rootDir, './utils/'),
    '@route-gateway': path.resolve(appSrc, './routes/index.js'),
  };
}

module.exports = resolver;
