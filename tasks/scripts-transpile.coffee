gulp = require 'gulp'
babel = require 'gulp-babel'
coffee = require 'gulp-coffee'
merge = require 'merge-stream'
sourcemaps = require 'gulp-sourcemaps'
handleError = require '../lib/handle-error'

module.exports = () ->
  coffey = gulp.src('jquery/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({ bare: true }))
    .on('error', handleError('Coffee failed'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'))

  es6 = gulp.src('jquery/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', handleError('Babel failed'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'))

  return merge(coffey, es6)

#! Copyright AXA Versicherungen AG 2016
