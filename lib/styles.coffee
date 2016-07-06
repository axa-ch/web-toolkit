gulp = require 'gulp'

errorify = require '../lib/errorify'

sourcemaps = require 'gulp-sourcemaps'
less = require 'gulp-less'
postcss = require 'gulp-postcss'
filter = require 'gulp-filter'
rename = require 'gulp-rename'

pseudoelements = require 'postcss-pseudoelements'
autoprefixer = require 'autoprefixer'
cssmqpacker = require 'css-mqpacker'
csswring = require 'csswring'

module.exports = (glob, paths, dest) ->
  return gulp.src glob
    .pipe sourcemaps.init()
    .pipe less { paths: paths }
    .on 'error', errorify
    .pipe postcss [
      autoprefixer()
      pseudoelements()
    ]
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest dest
    .pipe filter [
      '*'
      '!**/*.map'
    ]
    .pipe postcss [
      csswring()
      cssmqpacker()
    ]
    .pipe rename { extname: '.min.css' }
    .pipe sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest dest

#! Copyright AXA Versicherungen AG 2015
