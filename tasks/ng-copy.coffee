gulp = require 'gulp'

module.exports = ->
  gulp.src [ './ng/**/*' ]
    .pipe gulp.dest './dist/ng'

# Copyright AXA Versicherungen AG 2015
