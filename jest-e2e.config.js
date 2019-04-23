// @ts-check

module.exports = {
  preset: 'jest-puppeteer',

  setupFiles: ['./jest-e2e.setup.ts'],

  testRegex: '\\.test\\.e2e\\.ts$'
};
