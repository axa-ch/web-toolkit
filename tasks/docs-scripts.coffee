gulp = require 'gulp'
$ = require('gulp-load-plugins')()

errorify = require '../lib/errorify'

module.exports = ->
  return gulp.src [
      './docs/js/**/*.coffee'
    ]
    .pipe $.sourcemaps.init()
    .on 'error', errorify
    .pipe $.sourcemaps.init()
    .pipe $.coffee()
    .pipe $.addSrc.prepend [
      './node_modules/jquery/dist/jquery.js'
      './node_modules/moment/min/moment-with-locales.js'
      './node_modules/localforage/dist/localforage.js'
      './node_modules/knockout/build/output/knockout-latest.js'
      './node_modules/URIjs/src/URI.js'
      './node_modules/zeroclipboard/dist/ZeroClipboard.js'
      './dist/jquery/**/*.js'
      '!./dist/jquery/**/*.min.js'
    ]
    .pipe $.concat 'docs.all.min.js'
    .pipe $.uglify()
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/docs'
