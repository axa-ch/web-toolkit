import babelify from 'babelify'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
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
    'docs/js/index.js',
  ], { base: 'docs/js', read: false })
    .pipe(transformBundler({
      browserField: true,
      bundleExternal: false,
      detectGlobals: false,
      transform: [babelify],
      noParse,
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write(''))
    .pipe(rename({ basename: 'style-guide-docs' }))
    .pipe(gulp.dest('dist/docs/js'))

//! Copyright AXA Versicherungen AG 2015
