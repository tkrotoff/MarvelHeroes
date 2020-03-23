// @ts-check

module.exports = {
  '*': 'prettier --write',
  '*.{js,ts,tsx}': 'eslint --cache',

  // FIXME https://github.com/microsoft/TypeScript/issues/27379
  '*.{ts,tsx}':
    'tsc --noEmit --jsx preserve --esModuleInterop --resolveJsonModule --isolatedModules --strict --noUnusedLocals --noUnusedParameters --noImplicitReturns --noFallthroughCasesInSwitch --forceConsistentCasingInFileNames',

  '*.scss': 'stylelint --cache'
};
