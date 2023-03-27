/**
 * @type {import('@rspack/cli').Configuration}
 */
import { Configuration } from '@rspack/cli'

export const config: Configuration = {
  context: __dirname,
  entry: {
    main: './src/main.jsx'
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
        type: 'asset'
      }
    ]
  }
}
