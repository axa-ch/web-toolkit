gulp = require 'gulp'

module.exports = ->
  gulp.src [ './images/**' ], { base: './images' }
    .pipe gulp.dest './dist/images'

# Copyright AXA Versicherungen AG 2015
