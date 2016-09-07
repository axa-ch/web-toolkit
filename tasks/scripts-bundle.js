import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import through2 from 'through2'
import concat from 'concat-stream'

import noParse from '../lib/scriptsNoParse'
import createBundler from '../lib/createBundler'
import handleError from '../lib/handle-error'

const transformBundler = (opts) => through2.obj(function (file, encoding, next) {
  const bundler = createBundler(file.path, opts)

  bundler.bundle()
    .on('error', handleError('Browserify failed'))
    .pipe(concat(data => {
      file.contents = data
      next(null, file)
    }))
})

module.exports = () =>
  gulp.src([
    'dist/js/jquery/index.js',
    'dist/js/react/index.js',
    'dist/js/index.js',
  ], { base: 'dist/js', read: false })
  .pipe(transformBundler({
    browserField: true,
    bundleExternal: false,
    detectGlobals: false,
    noParse,
  }))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write(''))
  .pipe(rename((path) => {
    if (path.dirname === '.') {
      path.basename = 'axa-web-style-guide-all.js'
    } else {
      path.basename = path.dirname + '.bundle'
    }
  }))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())
  .on('error', handleError('Uglify failed'))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('dist/js'))

//! Copyright AXA Versicherungen AG 2016
