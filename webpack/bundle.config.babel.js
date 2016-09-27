import path from 'path'
import webpack from 'webpack'
import HappyPack from 'happypack'
import pseudoelements from 'postcss-pseudoelements'
import autoprefixer from 'autoprefixer'
import cssmqpacker from 'css-mqpacker'
import csswring from 'csswring'
import CleanPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import SvgStore from 'webpack-svgstore-plugin'

import createHappyPlugin, { getEnvId } from '../lib/createHappyPlugin'

export default {
  cache: true,
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  progress: true,
  entry: {
    docs: './docs/js/index-with-styles.js',
    all: ['./js/index-with-styles.js'],
    jquery: ['./js/jquery/index.js'],
    react: ['./js/react/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist/bundles'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  resolve: {
    modulesDirectories: [
      'scss',
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
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
    new SvgStore({
      svgoOptions: {
        plugins: [{ removeTitle: true }],
      },
      prefix: '',
    }),
  ],
  postcss: () => [
    pseudoelements,
    autoprefixer,
    cssmqpacker({ sort: true }),
    csswring,
  ],
}
