/*global __dirname*/

const
  {resolve} = require('path'),
  webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    vendor: ['react', 'react-dom'],
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
  context: resolve(__dirname, 'public'),
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
      { test: /\.(scss|sass)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ],
        exclude: /node_modules/ },
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
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
