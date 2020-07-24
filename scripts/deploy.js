const fs = require('fs');
const { exec } = require('./utils');
const paths = require('../tools/client/paths');

const { ENV = 'production', STATIC_DEPLOYMENT } = process.env;

(async () => {
  if (!fs.existsSync(paths.dotenv)) {
    exec(`cp ${paths.appEnvironment}/.env.${ENV} .env`);
  }

  exec('env-cmd -e production bnr build:client');

  if (!STATIC_DEPLOYMENT) {
    exec('env-cmd -e production bnr build:server');
  }

  exec(`cp .env.backup .env && rm .env.backup`);
})();
