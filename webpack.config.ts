import CopyWebpackPlugin from 'copy-webpack-plugin';
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { execSync } from 'node:child_process';
import path from 'node:path';
import PurgecssPlugin from 'purgecss-webpack-plugin';
import webpack from 'webpack';

import { getPackageNameFromPath } from './src/utils/getPackageNameFromPath';
import myPackage from './package.json';

export default (_webpackEnv: any, argv: any) => {
  // https://github.com/webpack/webpack/issues/6460#issuecomment-364286147
  const isProd = argv.mode === 'production';

  const output = `[name].${isProd ? 'production.min' : 'development'}`;

  const config: webpack.Configuration = {
    entry: './src/index.tsx',

    output: {
      path: path.join(__dirname, 'build'),
      filename: `${output}.js`,
      publicPath: '/'
    },

    // https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js#L175-L179
    // https://github.com/reactjs/reactjs.org/blob/ea6e34f8f07dd9f06dfeda9aabf0b6d2d949c6d0/content/docs/cross-origin-errors.md#source-maps-source-maps
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',

    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },

    module: {
      rules: [
        {
          test: /\.(js|tsx?)$/,

          // [Babel should not transpile core-js](https://github.com/zloirock/core-js/issues/514#issuecomment-476533317)
          exclude: /\/core-js/,

          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: { plugins: [['postcss-preset-env']] }
              }
            },
            'sass-loader'
          ]
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin({ patterns: [{ from: './src/assets/favicons', to: 'favicons' }] }),

      isProd && new MiniCssExtractPlugin({ filename: `${output}.css` }),

      isProd &&
        new PurgecssPlugin({
          paths: glob.sync('src/**/*', { nodir: true }),
          // https://purgecss.com/safelisting.html
          safelist: []
        }),

      new HtmlWebpackPlugin({
        description: myPackage.description,
        version: myPackage.version,
        buildMode: isProd ? 'production' : 'development',
        date: new Date().toISOString(),

        // [Get hash of most recent git commit in Node](https://stackoverflow.com/a/35778030/990356)
        rev: execSync('git rev-parse HEAD').toString().trim(),

        template: './src/index.html',
        hash: isProd
      }),

      new HtmlWebpackTagsPlugin({
        // Generates:
        //
        // <link rel="apple-touch-icon" sizes="180x180" href="${publicPath}/favicons/apple-touch-icon.png?e9e79af8c2643426d1a8" />
        // <link rel="icon" type="image/png" sizes="32x32" href="${publicPath}/favicons/favicon-32x32.png?e9e79af8c2643426d1a8" />
        // <link rel="icon" type="image/png" sizes="16x16" href="${publicPath}/favicons/favicon-16x16.png?e9e79af8c2643426d1a8" />
        // <link rel="manifest" href="${publicPath}/favicons/site.webmanifest?e9e79af8c2643426d1a8" />
        // <link rel="mask-icon" href="${publicPath}/favicons/safari-pinned-tab.svg?e9e79af8c2643426d1a8" color="#ed1d24" />
        // <link rel="shortcut icon" href="${publicPath}/favicons/favicon.ico?e9e79af8c2643426d1a8" />
        //
        // FYI The icons have been generated by RealFaviconGenerator v0.16 using Marvel-favicon.svg
        links: [
          {
            path: 'favicons/apple-touch-icon.png',
            attributes: { rel: 'apple-touch-icon', sizes: '180x180' }
          },
          {
            path: 'favicons/favicon-32x32.png',
            attributes: { rel: 'icon', type: 'image/png', sizes: '32x32' }
          },
          {
            path: 'favicons/favicon-16x16.png',
            attributes: { rel: 'icon', type: 'image/png', sizes: '16x16' }
          },
          {
            path: 'favicons/site.webmanifest',
            attributes: { rel: 'manifest' }
          },
          {
            path: 'favicons/safari-pinned-tab.svg',
            attributes: { rel: 'mask-icon', color: '#ed1d24' }
          },
          {
            path: 'favicons/favicon.ico',
            attributes: { rel: 'shortcut icon' }
          }
        ],

        // Generates:
        //
        // <meta name="msapplication-TileColor" content="#ed1d24" />
        // <meta name="msapplication-config" content="${publicPath}/favicons/browserconfig.xml?e9e79af8c2643426d1a8" />
        // <meta name="theme-color" content="#ffffff" />
        metas: [
          { attributes: { name: 'msapplication-TileColor', content: '#ed1d24' } },
          { path: 'favicons/browserconfig.xml', attributes: { name: 'msapplication-config' } },
          { attributes: { name: 'theme-color', content: '#ffffff' } }
        ],

        append: false, // We want the favicons to be before main.css

        hash: true
      })
    ] as webpack.WebpackPluginInstance[],

    devServer: {
      // [How to tell webpack dev server to serve index.html for any route](https://stackoverflow.com/q/31945763)
      historyApiFallback: true
    },

    // [The 100% correct way to split your chunks with Webpack](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)
    // [Webpack v4 chunk splitting deep dive](https://www.chrisclaxton.me.uk/chris-claxtons-blog/webpack-chunksplitting-deepdive)
    optimization: {
      // ["creates a runtime file to be shared for all generated chunks"](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)
      runtimeChunk: 'single',

      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxInitialRequests: Number.POSITIVE_INFINITY,
        cacheGroups: {
          vendors: {
            test: /\/node_modules\//,
            name(module: { context: string }, chunks: { name: string }[]) {
              const packageName = getPackageNameFromPath(module.context).replace('/', '-');
              return `${packageName}~${chunks.map(chunk => chunk.name).join('~')}`;
            }
          }
        }
      }
    }
  };

  // Hack to remove false plugins due to short-circuit evaluation "isProd &&"
  //
  // FYI with Rollup (rollup.config.js) no need for this hack
  // "Falsy plugins will be ignored, which can be used to easily activate or deactivate plugins"
  // https://github.com/rollup/rollup/blob/v2.33.3/docs/999-big-list-of-options.md#outputplugins
  config.plugins = config.plugins!.filter(plugin => plugin);

  return config;
};
