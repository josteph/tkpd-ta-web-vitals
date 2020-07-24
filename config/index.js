const path = require('path');
const appRootDir = require('app-root-dir');
const dotenv = require('dotenv-safe');

const envConfig = envPath => {
  return dotenv.config({
    path: path.resolve(appRootDir.get(), envPath || '.env'),
    example: path.resolve(appRootDir.get(), '.env.example'),
  });
};

if (envConfig().error) {
  throw new Error(envConfig().error);
}

const transform = value => {
  let parsedValue;

  try {
    parsedValue = JSON.parse(value);
  } catch (e) {
    if (typeof value === 'string' && /^true|false$/i.test(value)) {
      parsedValue = Boolean(value);
    } else {
      parsedValue = value;
    }
  }

  return parsedValue;
};

const transformed = envPath => {
  const currentEnvConfig = envConfig(envPath);

  return Object.keys(currentEnvConfig.parsed).reduce((acc, key) => {
    acc[key] = transform(currentEnvConfig.parsed[key]);

    return acc;
  }, {});
};

const config = {
  get: path => {
    const currentEnv = transformed();

    if (typeof currentEnv[path] === 'undefined') {
      throw new Error(`'${path}' variable not defined in ENV`);
    }

    return currentEnv[path];
  },

  getObject: (envPath = '') => transformed(envPath),
};

module.exports = config;
