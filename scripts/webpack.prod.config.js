var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var Visualizer = require('webpack-visualizer-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const extractCommon = new MiniCssExtractPlugin({
  filename: 'css/[name].[contenthash:8].css'
})
const publicPath = '/permission'
var plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
    inject: true,
    filename: path.resolve(__dirname, '../deploy/dist/index.html'),
    favicon: path.resolve(__dirname, '..', 'src/favicon.ico'),
    // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
    // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency'
    // hash:true
  }),
  new webpack.DefinePlugin({
    PUBLIC_PATH: JSON.stringify(publicPath)
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    APP: path.resolve(__dirname, '../src/utils/app')
  }),
  new UglifyJsPlugin({
    sourceMap: false,
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  extractCommon,
  new Visualizer()
]
module.exports = {
  mode: 'production',
  entry: {
    app: [path.resolve(__dirname, '../src/app')]
  },
  output: {
    path: path.resolve(__dirname, '../deploy/dist'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: publicPath + '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }, {
            loader: 'ts-loader'
          }
        ]
      }, {
        test: /\.js|jsx$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  env: 'production'
                }
              }
            }
          }
        ]
      }, {
        test: /\.styl$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  env: 'production'
                }
              }
            }
          },
          'stylus-loader'
        ]
      }, {
        test: /\.(png|jpe?g|git)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(mp3|xlsx)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      // minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        default: false
      }
    }
  },
  plugins: plugins,
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src')
    ],
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.min.js',
      '.json',
      '.styl',
      '.css'
    ],
    alias: {
      '@': path.join(__dirname, '../src/')
    }
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    imutable: 'Immutable',
    moment: 'moment',
    antd: 'antd',
    'ali-oss': 'OSS',
    echarts: 'echarts'
  },
  devtool: ''
}
