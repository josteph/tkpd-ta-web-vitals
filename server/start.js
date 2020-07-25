import app from './index';

const debug = require('debug')('app');

let currentApp = app;
const HOST = process.env.HOST;
const PORT = process.env.PORT || 3000;

const startDevServer = () => {
  currentApp.listen(PORT, HOST, (err, address) => {
    if (err) {
      debug(err);
      process.exit(1);
    } else {
      debug(`The server-side renderer, listening on ${address} env:${process.env.NODE_ENV}`);
    }
  });
};

startDevServer();

if (module.hot) {
  module.hot.accept('./index', () => {
    currentApp.close();
    currentApp = app;
    startDevServer();
  });
}
