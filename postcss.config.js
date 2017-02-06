module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  from: ctx.from,
  to: ctx.to,
  plugins: [
    require('postcss-smart-import')(),
    require('precss')(),
    require('autoprefixer')()
  ]
})

