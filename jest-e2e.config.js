// @ts-check

/** @type jest.InitialOptions */
const config = {
  preset: 'jest-puppeteer',

  setupFiles: ['./jest-e2e.setup.ts'],

  testRegex: '\\.test\\.e2e\\.ts$'
};

module.exports = config;
