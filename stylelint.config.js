// @ts-check

/** @type {import('stylelint').Config} */
const config = {
  extends: [
    // /!\ Order matters: the next one overrides rules from the previous one

    // Extends stylelint-config-standard-scss which extends stylelint-config-recommended-scss
    'stylelint-config-twbs-bootstrap',

    'stylelint-prettier/recommended'
  ],

  rules: {
    // FIXME Already defined in prettier.config.js, why is it not working?
    'stylistic/string-quotes': 'single'
  }
};

module.exports = config;
