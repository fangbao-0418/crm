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
    '/sys': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    '/work': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    // 120.24:9016
    // '/user': {
    //   target: 'http://192.168.120.24:9016',
    //   changeOrigin: true,
    //   secure: false
    // },
    '/user': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    '/config': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    '/shop-order': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    // '/config': {
    //   target: 'http://192.168.160.45:9001/',
    //   changeOrigin: true,
    //   secure: false,
    //   pathRewrite: {
    //     '^/config/v1': '/v1'
    //   }
    // },
    // '/crm-manage': {
    //   target: 'http://192.168.120.24:9016/',
    //   changeOrigin: true,
    //   secure: false
    //   // pathRewrite: {
    //   //   '^/crm-manage/v1': '/v1'
    //   // }
    // },
    '/crm-manage': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    '/oss': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/crm-manage/v1': '/v1'
      }
    },
    '/outside': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    '/notification': {
      target: 'https://x-sys.i-counting.cn',
      changeOrigin: true,
      secure: false
    },
    '/log': {
      target: 'https://x-sys.i-counting.cn',
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
