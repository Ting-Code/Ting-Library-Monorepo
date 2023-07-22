/** @type {import('@rspack/cli').Configuration} */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = function (env, argv) {
  console.log('env配置项', env, argv)
  return {
    context: __dirname,
    devServer: {
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    entry: {
      main: './src/main.tsx'
    },
    devtool: false, // 关闭sourceMap
    output: {
      publicPath: '/', // history路由
      path: path.resolve(__dirname, 'dist'),
      filename: 'file/[name]-[hash:6][ext]',
      chunkFilename: 'chunk/[name]-[hash:6][ext]',
      cssChunkFilename: 'css/[name]-[hash:6][ext]',
      assetModuleFilename: 'asset/[name]-[hash:6][ext]'
    },
    optimization: {
      splitChunks: {
        chunks: 'async', //all 所有 ； async  import('./xxx') 会被分包
        // minSize: 30 * 1024,
        // maxSize: 500 * 1024,
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
      ],
      css: {
        modules: {
          localsConvention: 'camelCaseOnly'
        }
      }
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
