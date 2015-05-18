gulp = require 'gulp'
$ = require('gulp-load-plugins')()

errorify = require '../lib/errorify'

pseudoelements = require 'postcss-pseudoelements'
autoprefixer = require 'autoprefixer-core'
csswring = require 'csswring'

module.exports = ->
  gulp.src [ './dist/css/*.css' ]
    .pipe $.sourcemaps.init { loadMaps: true }
    .pipe $.postcss [
      autoprefixer()
      pseudoelements()
    ]
    .on 'error', errorify
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/css'
    .pipe $.filter [
      '*'
      '!**/*.map'
    ]
    .pipe $.postcss [ csswring() ]
    .pipe $.rename { extname: '.min.css' }
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/css'

# Copyright AXA Versicherungen AG 2015
