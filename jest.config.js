// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');

/** @type Partial<import('@jest/types').Config.InitialOptions> */
const config = {
  setupFiles: ['./jest.setup.ts'],
  coveragePathIgnorePatterns: [...defaults.coveragePathIgnorePatterns, './jest.setup.ts'],

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
