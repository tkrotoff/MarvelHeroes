// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');

module.exports = {
  preset: 'jest-puppeteer',

  setupFiles: ['./jest-e2e.setup.ts'],

  transform: {
    '^.+\\.ts$': 'babel-jest'
  },

  // See How to use with create-react-app https://github.com/smooth-code/jest-puppeteer/issues/61
  // See Using Jest with Puppeteer and create-react-app https://github.com/facebook/create-react-app/issues/4023
  testRegex: '\\.test\\.e2e\\.ts$',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts']
};
