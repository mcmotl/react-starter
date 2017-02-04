import path from 'path'
import config from '../config'
import * as utils from './utils'
const env = process.env.NODE_ENV
const projectRoot = path.resolve(__dirname, '../')
export default {
  entry: {
    app: path.resolve(__dirname, '../src')
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: env === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath,
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: ['babel-loader'],
      include: [path.join(projectRoot, 'src')],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  }
}