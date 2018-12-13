// @ts-check

module.exports = {
  // See https://github.com/facebook/create-react-app/blob/v2.1.0/packages/babel-preset-react-app/dependencies.js#L64
  // See [Add Babel config sourceType: 'unambiguous' for dependencies](https://github.com/facebook/create-react-app/pull/5052)
  sourceType: 'unambiguous',

  presets: [
    [
      '@babel/preset-env',
      {
        // Cannot use 'usage' otherwise IE 10 fails with "'Set' is undefined"
        useBuiltIns: 'entry',
        debug: false

        // See https://github.com/facebook/create-react-app/pull/3776/files#diff-e4eb38a3161bed144100754a3e97763dR43
        //modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread']
};
