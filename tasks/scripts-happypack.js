import webpack from 'webpack-stream'
import HappyPack from 'happypack'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import named from 'vinyl-named'
import through from 'through2'

import handleError from '../lib/handle-error'

const skipSourcemaps = through.obj(function (file, enc, cb) {
  // Dont pipe through any source map files as it will be handled
  // by gulp-sourcemaps
  const isSourceMap = /\.map$/.test(file.path)
  if (!isSourceMap) this.push(file)
  cb()
})

module.exports = () =>
  gulp.src([
    'dist/js/jquery/index.js',
    'dist/js/react/index.js',
    'dist/js/index.js',
  ], { base: 'dist/js/' })
    .pipe(named(getSourceName))
    .pipe(webpack({
      cache: false,
      devtool: 'source-map',
      plugins: [
        new HappyPack({
          cache: true,
          loaders: [
            require.resolve('../lib/identity-loader'),
          ],
          threads: 2,
        }),
      ],
      module: {
        loaders: [
          {
            test: /.js$/,
            loaders: ['happypack/loader'],
          },
        ],
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
    }))
    .on('error', handleError('Webpack failed'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('tmp/happy'))
    .pipe(skipSourcemaps)
    .pipe(uglify())
    .on('error', handleError('Uglify failed'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('tmp/happy'))

function getSourceName(file) {
  const path = file.relative
  switch (path) {
    case 'index.js':
      return 'axa-web-style-guide-all'

    default:
      return path.replace('/index.js', `/${path.split('/')[0]}.bundle`)
  }
}

//! Copyright AXA Versicherungen AG 2016
