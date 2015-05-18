gulp = require 'gulp'
$ = require('gulp-load-plugins')()

module.exports = ->
  gulp.src 'icons/*.svg'
    .pipe $.svgmin()
    .pipe $.svgstore()
    .pipe gulp.dest './dist/images/'

# Copyright AXA Versicherungen AG 2015
