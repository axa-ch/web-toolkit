gulp = require 'gulp'

module.exports = ->

  gulp.src [ 'icons/**/*.svg' ]
    .pipe gulp.dest './dist/icons/'

#! Copyright AXA Versicherungen AG 2015
