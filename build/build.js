require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var shell = require('shelljs')

var spinner = ora('building for production...')
spinner.start()



rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    //自行处理 将生成的文件复制进入widget，处理apicloud 打包问题
    var bb = ora('正在复制处理到widget文件夹...').start()
    var cppath = path.resolve(__dirname, '../widget')
    rm(path.join(cppath, 'static'), err => {
      if (err) throw console.warn(err)
      shell.cp('-Rf', path.join(config.build.assetsRoot, '/*'), cppath);
      console.log(chalk.cyan('复制完成'))
      bb.stop()
    })

  })
})
