const path = require('path');

function resolver({ rootDir }) {
  const appSrc = `${rootDir}/client`;

  return {
    '@': path.resolve(appSrc),
    '@assets': path.resolve(appSrc, './assets/'),
    '@components': path.resolve(appSrc, './components/'),
    '@context': path.resolve(appSrc, './context/'),
    '@constants': path.resolve(appSrc, './constants/'),
    '@helpers': path.resolve(appSrc, './helpers/'),
    '@route-gateway': path.resolve(appSrc, './routes/index.js'),
    '@routes': path.resolve(appSrc, './routes/'),
    '@services': path.resolve(appSrc, './services/'),
    '@styles': path.resolve(appSrc, './styles/'),
    '@stores': path.resolve(appSrc, './stores/'),
    '@worker': path.resolve(appSrc, './serviceWorker/index.js'),
    '@config': path.resolve(rootDir, './config/'),
    '@utils': path.resolve(rootDir, './utils/'),
  };
}

module.exports = resolver;
