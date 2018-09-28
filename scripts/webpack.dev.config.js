var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const extractCommon = new MiniCssExtractPlugin({
  filename: 'common.css',
  allChunks: true
})
var plugins = [
  extractCommon,
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
    inject: true,
    favicon: path.resolve(__dirname, '..', 'src/favicon.ico')
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    APP: path.resolve(__dirname, '../src/utils/app')
  }),
  new webpack.HotModuleReplacementPlugin()
]
module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/app')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: [/node_modules/],
        use: [
          'source-map-loader',
          'eslint-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx$/,
        include: path.resolve(__dirname, '../src'),
        exclude: [/node_modules/],
        use: [
          'tslint-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          useBabel: true,
          babelCore: '@babel/core'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, '../src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap=true',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]',
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|git)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp3|mp4|xlsx)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: plugins,
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src')
    ],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.min.js', '.json', '.styl', '.css'],
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
    'ali-oss': 'OSS'
  },
  devtool: 'source-map'
  // eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL
  // cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl
  // cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
  // eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能
  // cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用
  // cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射
  // source-map： 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
}
