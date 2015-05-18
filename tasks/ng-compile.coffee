gulp = require 'gulp'
$ = require('gulp-load-plugins')()

module.exports = ->

  gulp.src [ './ng/**/*' ]
    .pipe gulp.dest './dist/ng'
    .pipe $.filter [ './dist/ng/**/*.js' ]
    .pipe $.jshint()
    .pipe $.jshint.reporter { 'jshint-stylish' }
    .pipe $.sourcemaps.init { loadMaps: true }
    .pipe $.ngAnnotate()
    .pipe $.uglify()
    .pipe $.rename { extname: '.min.js' }
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/ng'

# Copyright AXA Versicherungen AG 2015
