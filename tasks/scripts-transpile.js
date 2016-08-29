import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'

import handleError from '../lib/handle-error'

module.exports = () => gulp.src(['js/**/*.js'])
  .pipe(sourcemaps.init())
  .pipe(babel())
  .on('error', handleError('Babel failed'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js'))

//! Copyright AXA Versicherungen AG 2016
