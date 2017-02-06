import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import * as utils from './utils'
import config from '../config'
import webpackBaseConfig from './webpack.base'

const webpackConfig = merge(webpackBaseConfig, {
  devtool: "none",
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {test: /\.scss$/i, use: ExtractTextPlugin.extract({use: ['css-loader', 'postcss-loader', 'sass-loader']})},
      {test: /\.css$/, use: ExtractTextPlugin.extract({use: ['css-loader', 'postcss-loader']})}
    ]
  },
  plugins: [
    new ExtractTextPlugin(utils.assetsPath('css/[name].[chunkhash].css')),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: true
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  }
})


export default webpackConfig