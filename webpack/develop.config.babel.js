import path from 'path'
import webpack from 'webpack'
import pseudoelements from 'postcss-pseudoelements'
import autoprefixer from 'autoprefixer'

export default {
  cache: true,
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  progress: true,
  entry: [
    'webpack-hot-middleware/client?path=http://0.0.0.0:3001/__webpack_hmr',
    './docs/js/index-with-styles.js',
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://0.0.0.0:3001/dist/',
  },
  resolve: {
    modulesDirectories: [
      'less',
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
      },
    }, {
      test: /\.less/,
      loaders: [
        'style',
        'css',
        'postcss-loader',
        'less',
      ],
    }],
    noParse: [
      'jquery',
      // 'react',
      // 'react-dom',
      'baconjs',
      'moment',
      'classnames',
      // 'svg4everybody',
      'zeroclipboard',
      'iframe-resizer',
      'lunr',
      'slick-carousel',
    ].map((module) => new RegExp(require.resolve(module))),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  postcss: () => [
    pseudoelements,
    autoprefixer,
  ],
}
