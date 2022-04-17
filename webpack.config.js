const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
  entry: {
    'js/main.js': './src/js/index.js',
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Translate new CSS to old CSS
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|webp|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  devServer: {
    port: 9000,
    open: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['js/main.js'],
    }),

    new HtmlWebpackPlugin({
      template: './src/student-1.html',
      filename: 'student-1.html',
      chunks: ['js/main.js'],
    }),

    new HtmlWebpackPlugin({
      template: './src/signup.html',
      filename: 'signup.html',
      chunks: ['js/main.js'],
    }),

    new HtmlWebpackPlugin({
      template: './src/login.html',
      filename: 'login.html',
      chunks: ['js/main.js'],
    }),

    new MiniCssExtractPlugin({ filename: 'css/style.css' }),

    new CssMinimizerPlugin(),
  ],
};
