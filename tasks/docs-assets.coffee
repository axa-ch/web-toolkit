gulp = require 'gulp'

module.exports = ->
  return gulp.src [
      './node_modules/zeroclipboard/dist/ZeroClipboard.swf'
      # use an [i] to set the gulp base path to ./images/
      './docs/[i]mages/**/*'
      # use an [i] to set the gulp base path to ./images/
      './dist/[i]mages/**/*'
      # use an [f] to set the gulp base path to ./fonts/
      './dist/[f]onts/**/*'
      # use a [c] to set the gulp base path to ./css/
      './dist/[c]ss/{style,normalize}.min.css{,.map}'
      # use an [c] to set the gulp base path to ./images/
      './docs/[c]ontent/**/*'
    ]
    .pipe gulp.dest './dist/docs/'
