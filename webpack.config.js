const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: {
    main: [
      './js/prestashop-ui-kit.js',
      './scss/application.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'prestashop-ui-kit.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false,
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [ path.resolve(__dirname, './node_modules') ]
              }
            }
          ]
        })
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../fonts/[hash].[ext]'
            }
          }
        ]
      },
      {
        test : /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  externals: {
    $: '$',
    jquery: 'jQuery'
  },
  plugins: [
    new ExtractTextPlugin(path.join('..', 'css', 'bootstrap-prestashop-ui-kit.css'))
  ]
};

config.plugins.push(
  // new webpack.optimize.UglifyJsPlugin({
  //   sourceMap: false,
  //   compress: {
  //     sequences: true,
  //     conditionals: true,
  //     booleans: true,
  //     if_return: true,
  //     join_vars: true,
  //     drop_console: true
  //   },
  //   output: {
  //     comments: false
  //   },
  //   minimize: true
  // })
);

module.exports = config;
