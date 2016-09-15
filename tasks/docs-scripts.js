import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import babelify from 'babelify'
import shim from 'browserify-shim'

import noParse from '../lib/scriptsNoParse'
import browserify from '../lib/gulp-browserify'

module.exports = () =>
  gulp.src([
    'docs/js/index.js',
  ], { base: 'docs/js', read: false })
    .pipe(browserify({
      browserField: true,
      extensions: ['.js', '.jsx'],
      // bundleExternal: false,
      // detectGlobals: false,
      transform: [babelify, shim],
      noParse,
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write(''))
    .pipe(rename({ basename: 'style-guide-docs' }))
    .pipe(gulp.dest('dist/docs/js'))

//! Copyright AXA Versicherungen AG 2015
