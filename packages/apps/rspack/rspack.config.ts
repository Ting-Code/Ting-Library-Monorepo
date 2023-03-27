/**
 * @type {import('@rspack/cli').Configuration}
 */
import { Configuration } from '@rspack/cli'
import * as path from 'path'

const config = (env, argv): Configuration => {
  console.log('env配置项', env, argv)
  return {
    context: __dirname,
    entry: {
      main: './src/main.jsx'
    },
    output: {
      publicPath: '/assets/',
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      chunkFilename: 'js/[name]-[hash].js',
      cssChunkFilename: 'css/[name]-[hash].css',
      assetModuleFilename: '[ext]/[name][ext]'
    },
    builtins: {
      html: [
        {
          template: './index.html'
        }
      ]
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          type: 'asset/resource'
        }
      ]
    }
  }
}

export = config
