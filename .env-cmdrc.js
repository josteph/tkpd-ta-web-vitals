const config = require('./config');
const env = currentEnv => `./environment/.env.${currentEnv}`;

module.exports = {
  development: config.getObject(env('development')),
  staging: config.getObject(env('staging')),
  production: config.getObject(env('production')),
};
