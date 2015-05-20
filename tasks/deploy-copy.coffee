gulp = require 'gulp'

module.exports = ->
  gulp.src [ './dist/docs/**' ]
    .pipe gulp.dest './out'

# Copyright AXA Versicherungen AG 2015
