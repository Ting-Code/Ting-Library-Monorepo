import { Configuration } from '@rspack/cli'
import * as path from 'path'

const config = (env, argv): Configuration => {
  console.log('env配置项', env, argv)
  return {
    context: __dirname,
    entry: {
      main: './index.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: 'js/[name]-[hash].js',
      cssChunkFilename: 'css/[name]-[hash].css',
      assetModuleFilename: '[ext]/[name]-[ext]'
    },
    optimization: {
      splitChunks: {
        chunks: 'all' // import('./xxx') 会被分包
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
          test: /\.svg$/,
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
    }
  }
}

export = config
