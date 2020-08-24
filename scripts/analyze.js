process.env.NODE_ENV = 'production';
process.env.GENERATE_SOURCEMAP = false;
process.env.STATIC_DEPLOYMENT = true;
process.env.SKIP_GENERATE_STATS = true;

(function analyzerLocal() {
  const webpack = require('webpack');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const webpackConfigProd = require('../tools/client/webpack.config.babel')('production');

  webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

  // actually running compilation and waiting for plugin to start explorer
  webpack(webpackConfigProd, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err);
    }
  });
})();

