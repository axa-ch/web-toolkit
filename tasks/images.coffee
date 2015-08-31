gulp = require 'gulp'

module.exports = [
  [
    'images-clean'
  ]
  ->
    return gulp.src [ './images/**/*' ], { base: './images' }
      .pipe gulp.dest './dist/images'
]

#! Copyright AXA Versicherungen AG 2015
