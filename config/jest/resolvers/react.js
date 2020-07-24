function react(result = {}) {
  return {
    ...result,
    '^@/(.*)$': '<rootDir>/client/$1',
    '^@assets(.*)$': '<rootDir>/client/assets$1',
    '^@components(.*)$': '<rootDir>/client/components$1',
    '^@constants(.*)$': '<rootDir>/client/constants$1',
    '^@context(.*)$': '<rootDir>/client/context$1',
    '^@helpers(.*)$': '<rootDir>/client/helpers$1',
    '^@hooks(.*)$': '<rootDir>/client/hooks$1',
    '^@styles(.*)$': '<rootDir>/client/styles$1',
    '^@route-gateway(.*)$': '<rootDir>/client/routes/index.js',
    '^@routes(.*)$': '<rootDir>/client/routes$1',
    '^@config(.*)$': '<rootDir>/config$1',
    '^@stores(.*)$': '<rootDir>/client/stores$1',
    '^@worker(.*)$': '<rootDir>/client/serviceWorker/index.js',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  };
}

module.exports = react;
