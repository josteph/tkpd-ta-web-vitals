const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  isDev,
  isProd,
};
