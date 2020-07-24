const { ifElse } = require('./logic');

const isCircleCI = process.env.CIRCLECI === 'true' || process.env.CIRCLE_CI === 'true';
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const ifCircleCI = ifElse(isCircleCI);
const ifDev = ifElse(isDev);
const ifProd = ifElse(isProd);

module.exports = {
  ifCircleCI,
  ifDev,
  ifProd,
  isCircleCI,
  isDev,
  isProd,
};
