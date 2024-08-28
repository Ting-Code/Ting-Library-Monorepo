import { defineConfig } from '@rspack/cli'
import { rspack } from '@rspack/core'
// @ts-ignore
import RefreshPlugin from '@rspack/plugin-react-refresh'
import * as path from 'path'

const isDev = process.env.NODE_ENV === 'development'
const isProdMode = process.env.NODE_ENV === 'production'
// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14']

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.tsx'
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  output: {
    publicPath: isProdMode ? '/micro/react/' : '/', // history路由
    path: path.resolve(__dirname, 'dist'),
    // filename: 'file/[name]-[hash:6][ext]',
    chunkFilename: 'chunk/[name]-[hash:6][ext]',
    cssChunkFilename: 'css/[name]-[hash:6][ext]',
    assetModuleFilename: 'asset/[name]-[hash:6][ext]'
  },
  module: {
    parser: {
      'css/auto': {
        namedExports: false
      }
    },
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        type: 'asset'
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
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev
                  }
                }
              },
              env: { targets }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html'
    }),
    isDev ? new RefreshPlugin() : null
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets }
      })
    ]
  },
  experiments: {
    css: true
  }
})
