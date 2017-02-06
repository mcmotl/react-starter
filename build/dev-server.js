import path from 'path'
import webpack from 'webpack'
import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackApiFallback from 'connect-history-api-fallback'
import opn from 'opn'

import webpackConfig from './webpack.config.dev'
import config from '../config'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const port = process.env.PORT || config.dev.port
const app = express()
const compiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {
  }
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})
app.use(webpackApiFallback())
app.use(devMiddleware)
app.use(hotMiddleware)
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})