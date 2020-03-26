// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  extends: [
    // /!\ Order matters: the next one overrides rules from the previous one
    'plugin:jest/recommended',
    'airbnb',
    // Already done by Airbnb
    //'plugin:react/recommended'
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  plugins: ['react-hooks'],
  env: {
    browser: true
  },
  globals: {
    // Jest Puppeteer, see https://github.com/smooth-code/jest-puppeteer/blob/v4.0.0/README.md#configure-eslint
    page: true
  },

  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
    'spaced-comment': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    // [Avoid Export Default](https://basarat.gitbook.io/typescript/main-1/defaultisbad)
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',

    'react/no-unescaped-entities': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/state-in-constructor': 'off',
    'react/prop-types': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    'jest/no-expect-resolves': 'error',
    'jest/expect-expect': 'off'
  },

  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-boolean-value': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        // FIXME Fix "TypeError: Cannot read property 'body' of null"
        // https://github.com/typescript-eslint/typescript-eslint/issues/420
        // https://github.com/eslint/eslint/issues/11464
        // https://github.com/eslint/eslint/issues/11440
        'no-useless-constructor': 'off'
      }
    }
  ]
};

module.exports = config;
