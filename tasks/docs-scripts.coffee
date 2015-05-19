gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
coffee = require 'gulp-coffee'
addSrc = require 'gulp-add-src'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'

errorify = require '../lib/errorify'

module.exports = [
  [
    'docs-scripts-coffee'
  ],
  ->
    return gulp.src [
        './dsit/docs/js/docs.all.min.js'
        './node_modules/jquery/dist/jquery.js'
        './node_modules/moment/min/moment-with-locales.js'
        './node_modules/localforage/dist/localforage.js'
        './node_modules/knockout/build/output/knockout-latest.js'
        './node_modules/URIjs/src/URI.js'
        './node_modules/zeroclipboard/dist/ZeroClipboard.js'
        './dist/jquery/**/*.js'
        '!./dist/jquery/**/*.min.js'
      ]
      .pipe sourcemaps.init { loadMaps: true }
      .on 'error', errorify
      .pipe concat 'docs.all.min.js'
      .pipe sourcemaps.write('.', sourceRoot: './')
      .pipe gulp.dest './dist/docs/js'
]
