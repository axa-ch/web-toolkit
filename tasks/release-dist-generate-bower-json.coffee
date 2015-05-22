gulp = require 'gulp'
generateBowerJson = require 'gulp-generate-bower-json'

module.exports = ->
  gulp.src [ './package.json' ]
    .pipe generateBowerJson()
    .pipe gulp.dest './dist'

# Copyright AXA Versicherungen AG 2015
