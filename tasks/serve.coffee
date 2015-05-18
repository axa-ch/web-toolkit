gulp = require 'gulp'
$ = require('gulp-load-plugins')()

module.exports = ->
  gulp.src [ './dist/docs' ]
    .pipe $.webserver
      port: process.env.PORT or 3000
      livereload: true
      open: false

# Copyright AXA Versicherungen AG 2015
