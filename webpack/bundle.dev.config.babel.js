import path from 'path'
import webpack from 'webpack'
import pseudoelements from 'postcss-pseudoelements'
import autoprefixer from 'autoprefixer'
import SvgStore from 'webpack-svgstore-plugin'

export default {
  cache: true,
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  progress: true,
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './docs/js/index-with-styles.js',
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
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
      loaders: [
        'react-hot',
        'babel?cacheDirectory=true',
        'webpack-module-hot-accept',
      ],
    }, {
      test: /\.less/,
      loaders: [
        'style',
        'css?importLoaders=2&sourceMap',
        'postcss-loader',
        'less?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
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
      // 'iframe-resizer',
      'lunr',
      'slick-carousel',
    ].map((module) => new RegExp(require.resolve(module))),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new SvgStore({
      svgoOptions: {
        plugins: [{ removeTitle: true }],
      },
      name: 'dist/icons.svg',
      prefix: '',
    }),
  ],
  postcss: () => [
    pseudoelements,
    autoprefixer,
  ],
}
