import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'

import baseWebpackConfig from './webpack.base'

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
export default merge(baseWebpackConfig, {
  devtool: '#source-map',
  module: {
    rules: [
      {test: /\.css$/i, use: ['style-loader', 'css-loader', 'postcss-loader']},
      {test: /\.scss$/i, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']},
    ]
  },
  plugins: [
    new webpack.DefinePlugin({}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrors()
  ]
})