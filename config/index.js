import path from 'path'
export default {
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    env: 'production',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: 'development',
    port: 8080,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    productionSourceMap: true,
    cssSourceMap: true

  }
}