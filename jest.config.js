const baseConfig = require('./config/jest/base/react');
const resolvers = require('./config/jest/resolvers/react')();
const transformers = require('./config/jest/transformers/react')();

module.exports = {
  ...baseConfig,
  collectCoverageFrom: [...baseConfig.collectCoverageFrom, '!<rootDir>/externals/**'],
  projects: [
    {
      displayName: 'Client',
      testMatch: ['<rootDir>/client/**/__tests__/**/*.js'],
      testEnvironment: 'jsdom',
      moduleNameMapper: resolvers,
      transform: transformers,
      setupFilesAfterEnv: ['./config/jest/setup/react/afterEnv'],
    },
  ],
};
