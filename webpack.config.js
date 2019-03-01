// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

// WTF
//
// webpack has multiple options for production and development modes:
// -p and -d, see https://webpack.js.org/api/cli/#shortcuts
// --mode=production and --mode=development, see https://webpack.js.org/concepts/mode/
// Of course -p is not identical to --mode=production => that would be too easy
// -p seems to be a superset of --mode=production
// With -p you get minified CSS, with --mode=production you don't
//
// This guide https://webpack.js.org/guides/production/ explains another way
// to generate a production build using webpack-merge with TWO webpack.config.js
//
// To complexify things, mini-css-extract-plugin documentation (https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production)
// explains that: "While webpack 5 is likely to come with a CSS minimizer built-in, with webpack 4 you need to bring your own."
// so what is -p with --optimize-minimize?
// I've compared the Bootstrap .css output with -p and the official bootstrap.min.css => same sizes: 140 kB

// webpack-dev-server output is bigger than a regular build because it includes a lot of things

module.exports = {
  entry: {
    App: './src/App.tsx'
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],

  module: {
    rules: [
      { test: /\.(js|tsx?)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(html|css|png)$/, loader: 'file-loader', options: { name: '[name].[ext]' } },
      {
        // FIXME Don't know how to make source maps work
        // See SourceMap not working with Webpack 4.8.1 https://github.com/webpack-contrib/mini-css-extract-plugin/issues/141
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [require('autoprefixer')]
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  }
};
