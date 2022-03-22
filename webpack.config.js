const path = require('path')
const pkg = require('./package.json')

const defaultConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /index\.ts$/,
        loader: 'string-replace-loader',
        options: {
          search: '__WEBPACK_VERSION_STUB__',
          replace: pkg.version,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}

module.exports = [
  Object.assign({}, defaultConfig, {
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
    },
  }),
  Object.assign({}, defaultConfig, {
    entry: './src/worker.ts',
    output: {
      filename: 'download.worker.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'workers'),
    },
  }),
]
