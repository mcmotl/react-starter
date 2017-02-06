import path from 'path'
import config from '../config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const env = process.env.NODE_ENV

export const assetsPath = _path => {
  const assetsSubDirectory = (env === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory)
  return path.posix.join(assetsSubDirectory, _path)
}

export const styleLoaders = options => {
  if (options.extract) {
    const extractCss = new ExtractTextPlugin('/css/bundle.css')
    return {
      rules: [
        {
          test: /\.scss$/i,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader?sourceMap", 'postcss-loader?sourceMap']
          })
        }
      ]
    }
  }
  return {
    rules: [
      {test: /\.scss$/i, use: ['css-loader?sourceMap', 'sass-loader?sourceMap']},
      {test: /\.css$/i, use: ['css-loader?sourceMap', 'postcss-loader?sourceMap']},
    ]
  }
}