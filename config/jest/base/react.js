module.exports = {
  collectCoverageFrom: [
    '<rootDir>/client/**/*.js',

    // Third party codes
    '!**/node_modules/**',
    '!<rootDir>/client/polyfills/**',
    '!<rootDir>/client/serviceWorker/**',
    '!<rootDir>/client/resolver/**',

    // Generated files (built files)
    '!<rootDir>/**/build/**',
    '!<rootDir>/**/dist/**',

    // Jest files
    '!<rootDir>/**/coverage/**',
    '!<rootDir>/**/jest.config.js',

    // Test.
    '!**/__tests__/**',
    '!**/__risky_tests__/**',
    '!**/__buggy_tests__/**',
    '!**/__test_utils__/**',
    '!**/__data_mocks__/**',
  ],
  // coverageThreshold: {
  //   global: {
  //     statements: 100,
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //   },
  // },
};
