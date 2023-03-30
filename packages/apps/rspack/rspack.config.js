/** @type {import('@rspack/cli').Configuration} */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = function (env, argv) {
  console.log('env配置项', env, argv)
  return {
    context: __dirname,
    devServer: {
      historyApiFallback: true
    },
    entry: {
      main: './src/main.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      chunkFilename: 'js/[name]-[hash:6].js',
      cssChunkFilename: 'css/[name]-[hash:6].css',
      assetModuleFilename: '[ext]/[name][ext]'
    },
    optimization: {
      splitChunks: {
        chunks: 'async', //all 所有 ； async  import('./xxx') 会被分包
        minSize: 300 * 1024,
        cacheGroups: {
          lodash: {
            name: 'lodash',
            test: /lodash/,
            chunks: 'all'
          }
        }
      }
    },
    builtins: {
      html: [
        {
          template: './index.html'
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.', 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
          type: 'asset/resource'
        },
        {
          test: /\.less$/i,
          use: [
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: {
                    tailwindcss: {},
                    autoprefixer: {}
                  }
                }
              }
            },
            {
              loader: 'less-loader'
            }
          ],
          type: 'css'
        }
      ]
    },
    plugins: [new CleanWebpackPlugin()]
  }
}
