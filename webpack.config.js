const { Configuration, ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const rules = require('./config/rules');

/**
 * @type {Configuration}
 */

const getConfig = ({
  isEnvDevelopment,
  mode,
  isEnvProduction,
}) => {
  const config = {
    entry: path.resolve(__dirname, 'src/index.js'),
    mode,
    output: {
      filename: '[name].min.js',
      chunkFilename: 'skc.[name].js'
    },
    optimization: {
      minimize: true, // 自定义loader 设置注释需要将此处置为 false，因为默认压缩会去除所有注释
      minimizer: [
        isEnvProduction &&
          new TerserPlugin({
            minify: (file, sourceMap) => {
              const uglifyJsOptions = {
                sourceMap: false,
              };
              return require('uglify-js').minify(file, uglifyJsOptions);
            },
          }),
      ].filter(Boolean),
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },

    resolveLoader: {
      alias: {
        //创建 loader 别名，自定义 loader
        'custom-loader': path.resolve(
          __dirname,
          './scripts/loader/index.js'
        )
      },
    },

    module: {
      rules: rules({ isEnvDevelopment }),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    cache: {
      type: 'filesystem',
    },
    plugins: [
      
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'xxxx.html', // 设置模板名称
      }),
      new ProgressPlugin({
        activeModules: true,
        modules: true,
      }),
      // 压缩css
      isEnvProduction && new CssMinimizerPlugin(),
      new BundleAnalyzerPlugin({
        defaultSizes: 'stat',
        analyzerMode: 'disabled'
      }),
      isEnvDevelopment && new ReactRefreshPlugin(),
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      compress: true,
      host: 'localhost',
      port: '8081',
      open: true,
      hot: true,
      client: {
        progress: true,
      },
    },
    stats: 'normal',
    devtool: isEnvDevelopment ? 'eval-source-map' : false,
  };
  return config;
};

module.exports = (env, args) => {
  const mode = args.mode;
  const isEnvDevelopment = mode === 'development';
  const isEnvProduction = mode === 'production';
  const webpackConfig = getConfig({
    isEnvDevelopment,
    mode,
    isEnvProduction,
  });
  const config = webpackConfig;
  config.plugins.push(
    // 提取单独的CSS
    new MiniCssExtractPlugin({
      filename: isEnvDevelopment
        ? 'assets/main.css'
        : 'assets/main.[contenthash:10].css',
    })
  );
  return config;
};
