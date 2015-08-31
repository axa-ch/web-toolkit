gulp = require 'gulp'
filter = require 'gulp-filter'
jshint = require 'gulp-jshint'
sourcemaps = require 'gulp-sourcemaps'
ngAnnotate = require 'gulp-ng-annotate'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

module.exports = ->

  gulp.src [ './ng/**/*' ]
    .pipe gulp.dest './dist/ng'
    .pipe filter [ './dist/ng/**/*.js' ]
    .pipe jshint()
    .pipe jshint.reporter()
    .pipe sourcemaps.init { loadMaps: true }
    .pipe ngAnnotate()
    .pipe uglify()
    .pipe rename { extname: '.min.js' }
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/ng'

#! Copyright AXA Versicherungen AG 2015
