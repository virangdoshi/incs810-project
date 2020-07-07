const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = (_, {mode, }) => {
  const production = mode === 'production'
  return {
    entry: {
      main: [
        'babel-polyfill',
        './frontend/index.js',
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      compress: true,
      open: false,
      historyApiFallback: {
        index: '/'
      },
      port: 3000,
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, '../'),
      }
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, '../build'),
      publicPath: production ? '/assets/' : '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./frontend/index.html",
        filename: "./index.html"
      }),
      new webpack.DefinePlugin({
        __API__: JSON.stringify(production ? '' : 'http://127.0.0.1:7545'),
      })
    ].filter(Boolean)
  }
}