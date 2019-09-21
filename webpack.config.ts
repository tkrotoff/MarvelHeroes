import path from 'path';
import glob from 'glob';
// @ts-ignore FIXME No @types/postcss-preset-env
import postcssPresetEnv from 'postcss-preset-env';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PurgecssPlugin from 'purgecss-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { execSync } from 'child_process';

import myPackage from './package.json';

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
// To complexify things, [mini-css-extract-plugin documentation](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production)
// explains that: "While webpack 5 is likely to come with a CSS minimizer built-in, with webpack 4 you need to bring your own."
// so what is -p with --optimize-minimize?
// I've compared the Bootstrap .css output with -p and the official bootstrap.min.css => same sizes: 140 kB

// webpack-dev-server output is bigger than a regular build because it includes more things

export default (_env: any, argv: any) => {
  // See https://github.com/webpack/webpack/issues/6460#issuecomment-364286147
  const isProd = argv.mode === 'production';

  const output = `[name].${isProd ? 'production.min' : 'development'}`;

  const config: webpack.Configuration = {
    entry: {
      index: './src/index.tsx'
    },

    output: {
      path: path.join(__dirname, 'build'),
      filename: `${output}.js`
    },

    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },

    module: {
      rules: [
        { test: /\.(js|tsx?)$/, exclude: /node_modules/, loader: 'babel-loader' },
        {
          // FIXME Don't know how to make source maps work
          // See [SourceMap not working with Webpack 4.8.1](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/141)
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: !isProd } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [postcssPresetEnv],
                sourceMap: !isProd
              }
            },
            { loader: 'sass-loader', options: { sourceMap: !isProd } }
          ]
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin([{ from: './src/assets/favicon', to: 'favicon' }]),

      isProd && new MiniCssExtractPlugin({ filename: `${output}.css` }),

      isProd && new PurgecssPlugin({ paths: glob.sync('src/**/*', { nodir: true }) }),

      new HtmlWebpackPlugin({
        description: myPackage.description,
        version: isProd ? `${myPackage.version}-production` : `${myPackage.version}-development`,
        date: new Date().toISOString(),

        // See [Get hash of most recent git commit in Node](https://stackoverflow.com/a/35778030/990356)
        rev: execSync('git rev-parse HEAD')
          .toString()
          .trim(),

        template: './src/index.html',
        hash: isProd
      })
    ] as webpack.Plugin[],

    devServer: {
      // See [How to tell webpack dev server to serve index.html for any route](https://stackoverflow.com/q/31945763)
      historyApiFallback: true
    }
  };

  // Hack to remove false plugins due to short-circuit evaluation "isProd &&"
  // FYI with Rollup (rollup.config.js) no need for this hack
  config.plugins = config.plugins!.filter(plugin => plugin);

  return config;
};
