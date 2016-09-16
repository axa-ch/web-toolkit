import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import shim from 'browserify-shim'

import noParse from '../lib/scriptsNoParse'
import browserify from '../lib/gulp-browserify'
import handleError from '../lib/handle-error'

module.exports = () =>
  gulp.src([
    'dist/js/jquery/index.js',
    'dist/js/react/index.js',
    'dist/js/index.js',
  ], { base: 'dist/js', read: false })
  .pipe(browserify({
    browserField: true,
    extensions: ['.js', '.jsx'],
    // bundleExternal: false,
    // detectGlobals: false,
    transform: [shim],
    noParse,
  }))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write(''))
  .pipe(rename((path) => {
    if (path.dirname === '.') {
      path.basename = 'axa-web-style-guide-all'
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
