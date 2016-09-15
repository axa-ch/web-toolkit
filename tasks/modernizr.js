import gulp from 'gulp'
import modernizr from 'gulp-modernizr'

import errorify from '../lib/errorify'
import readJson from '../lib/readJSONFile'

module.exports = () => {
  const settings = readJson('modernizr.json')
  return gulp.src('js/**/*.js')
    .pipe(modernizr('modernizr.js', settings))
    .on('error', errorify)
    .pipe(gulp.dest('./dist/docs/js'))
}

//! Copyright AXA Versicherungen AG 2015
