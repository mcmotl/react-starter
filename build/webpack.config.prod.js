import webpack from 'webpack'
import webpackBaseConfig from './webpack.base'
import merge from 'webpack-merge'
import config from '../config'
import * as utils from './utils'
export default merge(webpackBaseConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
  },
})