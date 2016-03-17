babelify = require 'babelify'
browserify = require 'browserify'
shim = require 'browserify-shim'
coffeeify = require 'coffeeify'
gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
handleError = require '../lib/handle-error'
buffer = require 'vinyl-buffer'
source = require 'vinyl-source-stream'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

module.exports = () ->
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
    .pipe uglify()
    .on 'error', handleError('Uglify failed')
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest 'dist/jquery')

#! Copyright AXA Versicherungen AG 2016
