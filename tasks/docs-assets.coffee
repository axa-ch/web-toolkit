gulp = require 'gulp'

module.exports = ->
  return gulp.src [
      './node_modules/zeroclipboard/dist/ZeroClipboard.swf'
      './docs/images/**/*'
    ]
    .pipe gulp.dest './dist/docs/'
