gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
coffee = require 'gulp-coffee'
addSrc = require 'gulp-add-src'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'

errorify = require '../lib/errorify'

module.exports = ->
  return gulp.src [
      './docs/js/**/*.coffee'
    ]
    .pipe sourcemaps.init()
    .on 'error', errorify
    .pipe coffee()
    .pipe concat 'docs.all.min.js'
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/docs/js'
