import babelify from 'babelify'
import browserify from 'browserify'
import shim from 'browserify-shim'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import notifier from 'node-notifier'
import through2 from 'through2'
import concat from 'concat-stream'

import createBundler from '../lib/createBundler'
import handleError from '../lib/handle-error'

const transformBundler = (opts) => through2.obj(function(file, encoding, next) {
  const bundler = createBundler(file.path, opts)

  bundler.transform(babelify)
    .bundle()
    .on('error', handleError('Browserify failed'))
    .pipe(concat(data => {
      file.contents = data
      next(null, file)
    }))
})

module.exports = () =>
  gulp.src([
    'docs/js/index.js',
  ], { base: 'docs/js', read: false })
    .pipe(transformBundler())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write(''))
    .pipe(rename({ basename: 'style-guide-docs' }))
    .pipe(gulp.dest('dist/docs/js'))
    .pipe(uglify())
    .on('error', handleError('Uglify failed'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/docs/js'))

//! Copyright AXA Versicherungen AG 2015
