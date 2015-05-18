gulp = require 'gulp'
$ = require('gulp-load-plugins')()

errorify = require '../lib/errorify'

module.exports = ->
  gulp.src [ './jquery/**/*.coffee' ]
    .pipe $.coffeelint()
    .pipe $.coffeelint.reporter 'default'
    .pipe $.sourcemaps.init()
    .pipe $.coffee()
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .on 'error', errorify
    .pipe gulp.dest './dist/jquery'
    .pipe $.filter [
      '*'
      '!**/*.map'
    ]
    .pipe $.concat 'axa-wsg.jquery.all.js'
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

# Copyright AXA Versicherungen AG 2015
