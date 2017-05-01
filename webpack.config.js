/*global __dirname process*/

const
  {resolve} = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_EMV === 'production';

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    vendor: [
      'redux',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-hot-loader'
    ],
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './main.js'
    ]
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  context: resolve(__dirname, 'src'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/ },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            },
            {loader: 'sass-loader'}
          ]
        }) },
      { test: /\.(jpg|png|svg)$/,
        use: ['url-loader'] },
      { test: /\.(ttf|eot|woff|woff2)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './fonts/[name].[ext]',
              publicPath: '../'
            }
          }
        ]}
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    })
  ]
};
