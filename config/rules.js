const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const cssRegex = /\.css$/;
const lessRegex = /\.less$/;
const postcssLoader = {
  loader: 'postcss-loader',
};

const rules = ({ isEnvDevelopment }) => [
  {
    oneOf: [
      // css
      {
        test: cssRegex,
        use: isEnvDevelopment
          ? ['style-loader', 'css-loader', postcssLoader]
          : [MiniCssExtractPlugin.loader, 'css-loader', postcssLoader],
      },
      {
        test: lessRegex,
        use: isEnvDevelopment
          ? ['style-loader', 'css-loader', postcssLoader, 'less-loader']
          : [
              MiniCssExtractPlugin.loader,
              'css-loader',
              postcssLoader,
              'less-loader',
            ],
      },
      // Process images.
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: '[name].[ext]',
              esModule: false,
              outputPath: 'static/assets/images',
            },
          },
        ],
      },
      // Static resources in HTML
      {
        test: /\.html$ /,
        include: path.resolve(__dirname, '../src'),
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.js|jsx$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'custom-loader',
            options: {
              author: 'xxxx',
            },
          },
          {
            loader: 'thread-loader',
            options: {
              worker: 3,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [isEnvDevelopment ? 'react-refresh/babel' : ''].filter(
                Boolean
              ),
            },
          },
        ],
      },
      // Other resources
      {
        test: /\.(pdf|doc|node|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
];

module.exports = rules;
