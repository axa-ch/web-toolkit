gulp = require 'gulp'
coffeelint = require 'gulp-coffeelint'
coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'

errorify = require '../lib/errorify'

module.exports = ->
  gulp.src [ './jquery/**/*.coffee' ]
    .pipe coffeelint()
    .pipe coffeelint.reporter 'default'
    .pipe sourcemaps.init()
    .pipe coffee()
    .on 'error', errorify
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

#! Copyright AXA Versicherungen AG 2015
