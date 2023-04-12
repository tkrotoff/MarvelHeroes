// @ts-check

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',

  // Run once per test file
  // Executed before executing setupFilesAfterEnv and before the test code itself
  setupFiles: ['./jest.setup.ts'],

  // Run before each test file in the suite is executed
  // Meant for code which is repeating in each test file
  setupFilesAfterEnv: ['./jest.setup-after-env.ts'],

  // By default Jest allows for __tests__/*.js, *.spec.js and *.test.js
  // https://jestjs.io/docs/en/configuration#testregex-string-array-string
  // Let's be strict and use *.test.js only
  testRegex: '\\.test\\.tsx?$',

  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
};

module.exports = config;
