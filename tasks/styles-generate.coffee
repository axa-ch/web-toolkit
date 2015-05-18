gulp = require 'gulp'
$ = require('gulp-load-plugins')()

readJSONFile = require '../lib/readJSONFile'

module.exports = ->
  gulp.src [
    './less/**/*.less.lodash'
    '!./less/style/blocks/icon.less.lodash'
  ]
    .pipe $.template { colors: readJSONFile('./less/colors.json') }
    .pipe $.rename { extname: '' }
    .pipe gulp.dest './dist/less/'

# Copyright AXA Versicherungen AG 2015
