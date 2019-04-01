// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');

module.exports = {
  preset: 'jest-puppeteer',

  setupFiles: ['./jest-e2e.setup.ts'],

  testRegex: '\\.test\\.e2e\\.ts$'
};
