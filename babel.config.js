// @ts-check

module.exports = {
  // https://github.com/babel/babel/issues/12731#issuecomment-819158117
  sourceType: 'unambiguous',

  presets: [
    [
      // https://babeljs.io/docs/en/babel-preset-env
      '@babel/preset-env',
      {
        // It's safe to use 'usage' instead of 'entry' if Babel transpiles node_modules (check webpack.config.ts 'babel-loader' rule)
        // https://github.com/babel/babel/issues/9419
        useBuiltIns: 'usage',

        corejs: '3.30',

        debug: false
      }
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ]
};
