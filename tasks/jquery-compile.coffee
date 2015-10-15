gulp = require 'gulp'
coffeelint = require 'gulp-coffeelint'
coffee = require 'gulp-coffee'
babel = require 'gulp-babel'
sourcemaps = require 'gulp-sourcemaps'
merge = require 'merge-stream'

errorify = require '../lib/errorify'

module.exports = ->
  cophee = gulp.src ['./jquery/**/*.coffee']
    .pipe coffeelint()
    .pipe coffeelint.reporter 'default'
    .pipe sourcemaps.init()
    .pipe coffee()
    .on 'error', errorify
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

  es6 = gulp.src ['./jquery/**/*.js']
    .pipe sourcemaps.init()
    .pipe babel()
    .on 'error', errorify
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

  merge cophee, es6

#! Copyright AXA Versicherungen AG 2015
