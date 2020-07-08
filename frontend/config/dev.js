const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')
const fs = require('fs')
const { networks: { 
  development: { 
    host: gnacheHost, 
    port: gnachePort, 
    contractAddress,
  } } } = require('../../truffle-config')
const buildPath = path.resolve(__dirname, '../../build')

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
      path: buildPath,
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
        // __API__: JSON.stringify(production ? '' : 'http://127.0.0.1:7545'),
        __API__: JSON.stringify(production ? '' : `http://${gnacheHost}:${gnachePort}`),
        // contract destination address
        __CONTRACT__: JSON.stringify(production ? '' : contractAddress),
        // contract requires owner
        __CONTRACT_OWNER__: JSON.stringify(production ? '' : '0x2acD2082e74706cEd0c147fEAD73649498Ff61B9'),
        // binary interface
        __ABI__: fs.readFileSync(`${buildPath}/contracts/FileRegistry.json`, 'utf8'),
      })
    ].filter(Boolean)
  }
}