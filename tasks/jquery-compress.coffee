gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

errorify = require '../lib/errorify'

module.exports = ->
  gulp.src [ './dist/jquery/*.js' ]
    .pipe sourcemaps.init { loadMaps: true }
    .pipe uglify()
    .on 'error', errorify
    .pipe rename { extname: '.min.js' }
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

# Copyright AXA Versicherungen AG 2015
