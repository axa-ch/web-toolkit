import path from 'path'
import pseudoelements from 'postcss-pseudoelements'
import autoprefixer from 'autoprefixer'
import cssmqpacker from 'css-mqpacker'
import csswring from 'csswring'

export default {
  cache: true,
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  progress: true,
  entry: {
    docs: './docs/js/index.js',
    all: ['./js/index-with-styles.js'],
    jquery: ['./js/jquery/index.js'],
    react: ['./js/react/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  resolve: {
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
  postcss: () => [
    pseudoelements,
    autoprefixer,
    cssmqpacker({ sort: true }),
    csswring,
  ],
}
