import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import baseWebpackConfig from './webpack.base'
import * as utils from './utils'

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
const styleLoaders = utils.styleLoaders({extract: true})
export default merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  module: {
    ...styleLoaders
  },
  plugins: [
    new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
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