gulp = require 'gulp'
template = require 'gulp-template'
rename = require 'gulp-rename'

readJSONFile = require '../lib/readJSONFile'

module.exports = ->

  gulp.src [ './less/style/variables.less.lodash' ], { base: './less/' }
    .pipe template { colors: readJSONFile('./less/colors.json') }
    .pipe rename { extname: '' }
    .pipe gulp.dest './dist/less'

#! Copyright AXA Versicherungen AG 2015
