process.env.NODE_ENV = 'production';
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const webpackConfigProd = require('../config/webpack.config.prod');

webpackConfigProd.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'analyzer-report.html'
  })
);

require('../scripts/build');
