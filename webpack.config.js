const path = require('path')
const pkg = require('./package.json')

const getConfig = ({ rules = [], ...config }) => ({
  ...config,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      ...rules,
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
})

module.exports = [
  getConfig({
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
    },
    rules: [
      {
        test: /index\.ts$/,
        loader: 'string-replace-loader',
        options: {
          search: '__WEBPACK_VERSION_STUB__',
          replace: pkg.version,
        },
      },
    ],
  }),
  getConfig({
    entry: './src/worker.ts',
    output: {
      filename: 'download.worker.js',
      path: path.resolve(__dirname, 'workers'),
    },
    rules: [
      {
        test: /\worker\.js$/,
        use: { loader: 'worker-loader' },
      },
    ],
  }),
]
