gulp = require 'gulp'
$ = require('gulp-load-plugins')()

module.exports = ->
  gulp.src [ './package.json' ]
    .pipe $.generateBowerJson()
    .pipe gulp.dest './dist'

# Copyright AXA Versicherungen AG 2015
