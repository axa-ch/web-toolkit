gulp = require 'gulp'
$ = require('gulp-load-plugins')()

errorify = require '../lib/errorify'

pseudoelements = require 'postcss-pseudoelements'
autoprefixer = require 'autoprefixer-core'
csswring = require 'csswring'

module.exports = ->

  return (glob, dest, paths) ->
    return gulp.src glob
    .pipe $.sourcemaps.init()
    .pipe $.less { paths: paths }
    .on 'error', errorify
    .pipe $.postcss [
      autoprefixer()
      pseudoelements()
    ]
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest dest
    .pipe $.filter [
      '*'
      '!**/*.map'
    ]
    .pipe $.postcss [ csswring() ]
    .pipe $.rename { extname: '.min.css' }
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest dest
