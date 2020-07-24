import appRootDir from 'app-root-dir';
import debug from 'debug';
import fs from 'fs-extra';
import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import WebpackBar from 'webpackbar';
import nodeExternals from 'webpack-node-externals';
import config from '../../config';

import { isCircleCI, isDev, isProd, ifDev, ifProd } from '../../utils';

const log = debug(`build:app`);

const rootDir = appRootDir.get();
const publicPath = config.get('PUBLIC_PATH') || '/';

const entryPath = `./server/${isDev ? 'start' : 'index'}.js`;
const buildPath = `./api`;

log(`> Cleaning output folder ${buildPath} ...`);
fs.emptyDirSync(buildPath);

log(`> Building Server App, entry: ${entryPath}, output: ${path.join(buildPath, 'index.js')}`);

const alias = require(`${rootDir}/client/resolver`)({ rootDir });

const developmentPlugins = () => {
  if (isDev && !isCircleCI) {
    // need to lazy load this plugin
    const StartServerPlugin = require('start-server-webpack-plugin');

    return [new StartServerPlugin('index.js'), new webpack.HotModuleReplacementPlugin()];
  }

  return [];
};

const webpackConfig = {
  /**
   * Output target to NodeJS
   */
  target: 'node',

  /**
   * Fail out if there is a single error in production mode
   */
  bail: isProd,

  /**
   * The base directory
   * for resolving entry point
   */
  context: path.resolve(rootDir, 'server'),

  /**
   * Define mode to let webpack
   * determine what plugin should be activated
   */
  mode: ifProd('production', 'development'),

  /**
   * Source map setting
   */
  devtool: ifProd('(none)', 'source-map'),

  /**
   * Define perfomance hints for assets
   * and entrypoints that exceed file limit
   */
  performance: false,

  stats: 'errors-only',

  /**
   * Entry files
   */
  entry: {
    index: [
      '@babel/polyfill',
      'make-promises-safe',
      'regenerator-runtime/runtime',
      'node-fetch',
      ifDev('webpack/hot/poll?1000'),
      path.resolve(rootDir, entryPath),
    ].filter(Boolean),
  },

  /** Need this to support recompile with HMR */
  watch: isDev && !isCircleCI,

  /**
   * Output config
   * Buildpath and output name
   */
  output: {
    path: path.resolve(rootDir, buildPath),
    filename: '[name].js',
    chunkFilename: ifDev('chunk.[name].js', 'chunk.[name].[chunkhash:8].js'),
    publicPath,
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
    alias,
    symlinks: false,
    cacheWithContext: false,
  },

  module: {
    // Makes missing export becomes compile error
    strictExportPresence: true,
    noParse: /lodash/,
    rules: [
      {
        oneOf: [
          {
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              cacheCompression: isProd,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: true,
                    },
                    useBuiltIns: 'entry',
                    corejs: 3,
                  },
                ],
                ['@babel/preset-react', { development: isDev, useBuiltIns: true }],
              ],
              plugins: [
                '@loadable/babel-plugin',
                'babel-plugin-macros',
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-export-namespace-from',
                ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-syntax-async-generators',
                '@babel/plugin-syntax-dynamic-import',
                ['@babel/plugin-transform-destructuring', { useBuiltIns: true }],
                [
                  '@babel/plugin-transform-runtime',
                  {
                    // corejs: 3,  this is not supported yet for node!!
                    helpers: false,
                  },
                ],
                'lodash',
                ifDev('console'),
              ].filter(Boolean),
              env: {
                production: {
                  plugins: [
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements',
                  ],
                },
              },
            },
          },
          {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1024,
                  emitFile: false,
                },
              },
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg|bmp)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  publicPath,
                  name: ifDev('static/media/[name].[ext]', 'static/media/[name].[hash:8].[ext]'),
                },
              },
            ],
          },
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          },
          // fallback loader, any file that doesn't need specific loader use file-loader
          {
            exclude: [/\.(t|j)sx?$/, /\.html$/, /\.json$/],
            use: [
              {
                loader: 'file-loader',
                options: {
                  limit: 1024,
                  name: ifDev('[name].[ext]', '[hash:8].[ext]'),
                  publicPath,
                  emitFile: false,
                },
              },
            ],
          },
          {
            test: /\.(css|scss|sass)$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  publicPath,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  publicPath,
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }),
                    require('postcss-normalize')(),
                  ],
                },
              },
              'sass-loader',
            ],
            sideEffects: true,
          },
        ],
      },
    ],
  },

  externals: [
    /^\.\/assets\.json$/,
    /**
     * Ignore node_modules being bundled
     * on server build
     */
    nodeExternals({
      whitelist: [
        ...ifDev(['webpack/hot/poll?1000'], []),
        'source-map-support/register',
        /\.(svg|png|jpg|jpeg|gif|ico)$/,
        /\.(css|scss|sass|sss|less)$/,
      ],
    }),
  ],

  optimization: {
    minimize: false,
  },

  plugins: [
    /**
     * Development webpack plugin
     * Won't be enabled in production
     */
    ...developmentPlugins(),

    /**
     * Define environment variable from process.env
     */
    new webpack.EnvironmentPlugin({
      // use 'development' unless process.env.NODE_ENV is defined
      NODE_ENV: 'development',
    }),

    /**
     * Define variable on build time
     */
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DEV__: isDev,
      __PROD__: isProd,
      __BUILDVER__: Math.floor(Math.random() * 1e16),
      __SERVER__: true,
    }),

    /**
     * Elegant ProgressBar and Profiler
     */
    new WebpackBar({
      name: 'Server',
      color: '#83cd29',
    }),

    /**
     * Error formatter
     */
    new FriendlyErrorsWebpackPlugin(),

    /**
     * Enable source map on server
     */
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install({ environment: "node" });',
      raw: true,
      entryOnly: false,
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(rootDir, '.env.example'),
        to: path.resolve(rootDir, 'build'),
      },
    ]),
  ],

  node: false,
};

export default webpackConfig;
