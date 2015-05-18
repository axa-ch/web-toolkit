gulp = require 'gulp'
$ = require('gulp-load-plugins')()

errorify = require '../lib/errorify'

module.exports = ->
  gulp.src [ './dist/less/{style,normalize}.less' ]
    .pipe $.sourcemaps.init()
    .pipe $.less { paths: [ './dist/less' ] }
    .on 'error', errorify
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/css'

# Copyright AXA Versicherungen AG 2015
