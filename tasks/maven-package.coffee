gulp = require 'gulp'
zip = require 'gulp-zip'
readJSONFile = require '../lib/readJSONFile'

module.exports = ->
  packageJson = readJSONFile './package.json'

  gulp.src [
    './dist/**'
    './README.*'
    'LICENSE.*'
    '!./dist/docs/downloads/**/*'
    ]
    .pipe zip "axa-web-style-guide-#{packageJson.version}.jar"
    .pipe gulp.dest './tmp'

#! Copyright AXA Versicherungen AG 2015
