'use strict'
var rm = require('rimraf')
const webpack = require('webpack')
const chalk = require('chalk')
var webpackConfig = require('./webpack.prod.config')
function callback (err, stats) {
  process.stdout.write(stats.toJson({
    cached: true,
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  const info = stats.toJson()
  if (stats.hasWarnings()) {
    console.warn(chalk.yellow(info.warnings))
  }
  if (err || stats.hasErrors()) {
    console.error(chalk.red(info.errors))
  } else {
    console.log(stats.toString({
      chunks: false, // 使构建过程更静默无输出
      colors: true // 在控制台展示颜色
    }))
    console.log(chalk.green('[ok] Builded with successful'))
  }
}
rm('deploy/dist/*', function (err) {
  if (err) throw err
  const compiler = webpack(webpackConfig)
  compiler.run(callback)
})
