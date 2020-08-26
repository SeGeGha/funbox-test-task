const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = (env = {}) => {
  const isProd = env === 'production';

  const getLoader = () => (isProd ? MiniCssExtractPlugin.loader : 'style-loader');

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: './index.html',
      }),
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        filename: '[name]-[hash:8].css',
      }));
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
            {
              loader: 'awesome-typescript-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg|ico|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img',
              esModule: false,
            },
          }],
        },
        {
          test: /\.(wav|mp3)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/audio',
              esModule: false,
            },
          }],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: getLoader() },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            { loader: getLoader() },
            { loader: 'css-loader' },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
      open: true,
      historyApiFallback: true,
      watchContentBase: true,
      contentBase: path.join(__dirname, 'dist'),
    },
    plugins: getPlugins(),
  };
};

module.exports = config;
