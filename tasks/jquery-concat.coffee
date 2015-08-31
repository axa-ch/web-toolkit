gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
concat = require 'gulp-concat'

errorify = require '../lib/errorify'

module.exports = ->
  gulp.src [ './dist/jquery/*.js' ]
    .pipe sourcemaps.init { loadMaps: true }
    .pipe concat 'axa-wsg.jquery.all.js'
    .on 'error', errorify
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

#! Copyright AXA Versicherungen AG 2015
