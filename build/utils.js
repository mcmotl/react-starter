import path from 'path'
import config from '../config'

const env = process.env.NODE_ENV

export const assetsPath = _path => {
  const assetsSubDirectory = (env === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory)
  return path.posix.join(assetsSubDirectory, _path)
}