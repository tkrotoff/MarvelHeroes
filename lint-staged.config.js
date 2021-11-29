// @ts-check

module.exports = {
  '*': 'prettier --write',
  '*.{js,ts,tsx}': 'eslint --cache',

  '*.{ts,tsx}': [
    // FIXME https://github.com/microsoft/TypeScript/issues/27379
    () => 'tsc',
    'jest --bail --findRelatedTests'
  ],

  '*.scss': 'stylelint --cache'
};
