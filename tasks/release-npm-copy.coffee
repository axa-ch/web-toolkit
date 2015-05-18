gulp = require 'gulp'

module.exports = [
  [ 'release-npm-pack' ],
  ->
    gulp.src [ './axa-web-style-guide-*.tgz' ]
      .pipe gulp.dest './dist/docs/downloads/'
]

# Copyright AXA Versicherungen AG 2015
