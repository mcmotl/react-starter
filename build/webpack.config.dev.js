import webpack from 'webpack'
import path from 'path'
import baseWebpackConfig from './webpack.base'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'
import config from '../config'
import * as utils from './utils'

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

export default merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  devtool: '#eval-source-map',
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