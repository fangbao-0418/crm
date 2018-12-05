'use strict'
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config.js')
const options = {
  inline: true,
  hot: true,
  overlay: true,
  stats: {
    colors: true,
    errors: true
  },
  proxy: {
    '/sys/crm-manage': {
      target: 'http://192.168.170.30:9008',
      pathRewrite: {
        '^/sys/crm-manage/v1': '/v1'
      }
    },
    '/sys': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    '/json': {
      target: 'https://x-b.i-counting.cn',
      changeOrigin: true,
      secure: false
    }
  },
  // 启用gzip压缩一切服务:
  compress: true,
  host: '0.0.0.0',
  port: '3001'
}
WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)
server.listen(options.port, options.host, () => {
  console.log('Starting server on http://' + options.host + ':' + options.port)
})
