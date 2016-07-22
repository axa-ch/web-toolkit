import browserify from 'browserify'
import shim from 'browserify-shim'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'

import handleError from '../lib/handle-error'

export default () =>
  browserify()
    .transform(shim)
    .add('js/index.js')
    .bundle()
    .on('error', handleError('Browserify failed'))
    .pipe(source('style-guide.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/jquery'))
    .pipe(uglify())
    .on('error', handleError('Uglify failed'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist/jquery'))

//! Copyright AXA Versicherungen AG 2016
