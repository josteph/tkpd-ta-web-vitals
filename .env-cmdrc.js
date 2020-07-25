const config = require('./config');
const env = currentEnv => `./environment/.env.${currentEnv}`;

module.exports = {
  development: config.getObject(env('development')),
  production: config.getObject(env('production')),
};
