gulp = require 'gulp'
modernizr = require 'gulp-modernizr'

errorify = require '../lib/errorify'
readJson = require '../lib/readJSONFile'

module.exports = ->
  settings = readJson 'modernizr.json'
  gulp.src 'jquery/*.coffee'
    .pipe modernizr 'modernizr.js', settings
    .on 'error', errorify
    .pipe gulp.dest './dist/docs/js'

#! Copyright AXA Versicherungen AG 2015
