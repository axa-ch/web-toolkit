import path from 'path'
import pseudoelements from 'postcss-pseudoelements'
import autoprefixer from 'autoprefixer'
import cssmqpacker from 'css-mqpacker'
import csswring from 'csswring'
import CleanPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import SvgStore from 'webpack-svgstore-plugin'

import createHappyPlugin, { getEnvId } from '../lib/create-happy-plugin'

export default {
  cache: true,
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  progress: true,
  entry: {
    docs: './docs/js/index-with-styles.js',
    all: ['./js/index-with-styles.js'],
    jquery: ['./js/jquery/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist/bundles'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: `happypack/loader?id=${getEnvId('jsx')}`,
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', [
        'css?importLoaders=2&sourceMap',
        'postcss-loader',
        'sass',
      ]),
      // @todo: enable HappyPack for sass as soon as https://github.com/amireh/happypack/issues/14#issuecomment-208254692 is fixed
      // loader: ExtractTextPlugin.extract('style', `happypack/loader?id=${getEnvId('sass')}`),
    }],
  },
  plugins: [
    createHappyPlugin('jsx', ['babel?cacheDirectory=true']),
    // @todo: enable HappyPack for sass as soon as https://github.com/amireh/happypack/issues/14#issuecomment-208254692 is fixed
    // createHappyPlugin('scss', [
    //   'css?importLoaders=2&sourceMap',
    //   'postcss-loader',
    //   'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
    // ]),
    new CleanPlugin([
      path.resolve(__dirname, '../dist/bundles'),
    ], {
      root: path.resolve(__dirname, '..'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
    new SvgStore({
      svgoOptions: {
        plugins: [{ removeTitle: true }],
      },
      prefix: '',
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true,
    }),
  ],
  postcss: () => [
    pseudoelements,
    autoprefixer,
    cssmqpacker({ sort: true }),
    csswring,
  ],
}
