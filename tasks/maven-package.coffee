gulp = require 'gulp'
zip = require 'gulp-zip'

module.exports = ->
  gulp.src [
    './dist/**'
    './README.*'
    'LICENSE.*'
    '!./dist/docs/downloads/**/*'
    ]
    .pipe zip 'axa-web-style-guide.jar'
    .pipe gulp.dest './tmp'

#! Copyright AXA Versicherungen AG 2015
