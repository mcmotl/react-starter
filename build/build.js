import path from 'path'
import 'shelljs/global'
import webpack from 'webpack'
import ora from 'ora'
import config from '../config'
import webpackConfig from './webpack.config.prod'

const spinner = ora('building for production...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  if (err) {
    console.error(err)
    return
  }
  spinner.stop()


  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})